/**
 * Portfolio chat assistant — Cloudflare Worker.
 *
 * POST /chat   { conversation_id, message, history[], page }  -> SSE stream
 * GET  /health
 *
 * The Anthropic key lives only in Worker secrets. Conversations are written to
 * D1 so they can be read back with `wrangler d1 execute`. No IP is stored —
 * only a salted hash, used for rate limiting, and a coarse country code.
 */
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from './knowledge';

export interface Env {
  ANTHROPIC_API_KEY: string;
  DB: D1Database;
  ALLOWED_ORIGINS: string;   // comma-separated, set in wrangler.jsonc
  RATE_SALT?: string;        // optional secret; falls back to a constant
}

/** Answers are short by design — see the persona prompt. */
const MODEL = 'claude-opus-5';
const MAX_TOKENS = 800;

const MAX_MESSAGE_CHARS = 1500;   // one visitor message
const MAX_HISTORY_TURNS = 12;     // conversation length cap
const PER_IP_PER_MIN = 6;
const GLOBAL_PER_DAY = 600;       // backstop; the API spend cap is the real one

function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  const allowed = env.ALLOWED_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean);
  const ok = origin && allowed.includes(origin);
  return {
    'Access-Control-Allow-Origin': ok ? origin! : allowed[0] ?? '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(body: unknown, status: number, extra: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extra },
  });
}

async function hashIp(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(salt + ip);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].slice(0, 8)
    .map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Increments a counter bucket and reports whether it is now over `limit`. */
async function overLimit(db: D1Database, bucket: string, limit: number, ttl: number) {
  const now = Math.floor(Date.now() / 1000);
  await db.prepare(
    `INSERT INTO counters (bucket, hits, expires) VALUES (?1, 1, ?2)
     ON CONFLICT(bucket) DO UPDATE SET
       hits    = CASE WHEN counters.expires < ?3 THEN 1 ELSE counters.hits + 1 END,
       expires = CASE WHEN counters.expires < ?3 THEN ?2 ELSE counters.expires END`
  ).bind(bucket, now + ttl, now).run();

  const row = await db.prepare(
    'SELECT hits FROM counters WHERE bucket = ?1 AND expires >= ?2'
  ).bind(bucket, now).first<{ hits: number }>();
  return (row?.hits ?? 0) > limit;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get('Origin');
    const cors = corsHeaders(origin, env);
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (url.pathname === '/health') return json({ ok: true }, 200, cors);
    if (url.pathname !== '/chat') return json({ error: 'Not found' }, 404, cors);
    if (request.method !== 'POST') return json({ error: 'Use POST' }, 405, cors);

    const allowed = env.ALLOWED_ORIGINS.split(',').map((s) => s.trim());
    if (!origin || !allowed.includes(origin)) {
      return json({ error: 'Origin not allowed' }, 403, cors);
    }

    let body: {
      conversation_id?: string;
      message?: string;
      history?: { role: 'user' | 'assistant'; content: string }[];
      page?: string;
    };
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400, cors);
    }

    const message = (body.message ?? '').trim();
    const conversationId = (body.conversation_id ?? '').slice(0, 64);
    const history = Array.isArray(body.history) ? body.history : [];

    if (!message) return json({ error: 'Empty message' }, 400, cors);
    if (message.length > MAX_MESSAGE_CHARS) {
      return json({ error: `Please keep messages under ${MAX_MESSAGE_CHARS} characters.` }, 400, cors);
    }
    if (!conversationId) return json({ error: 'Missing conversation_id' }, 400, cors);
    if (history.length > MAX_HISTORY_TURNS * 2) {
      return json({ error: 'This conversation has reached its limit. Please start a new one.' }, 400, cors);
    }

    // --- caps ---------------------------------------------------------------
    const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
    const ipHash = await hashIp(ip, env.RATE_SALT ?? 'portfolio-chat');
    const minute = Math.floor(Date.now() / 60000);
    const today = new Date().toISOString().slice(0, 10);

    if (await overLimit(env.DB, `ip:${ipHash}:${minute}`, PER_IP_PER_MIN, 120)) {
      return json({ error: 'Too many messages in a short time. Give it a moment.' }, 429, cors);
    }
    if (await overLimit(env.DB, `global:${today}`, GLOBAL_PER_DAY, 86400 * 2)) {
      return json({ error: 'The assistant is taking a break for today. Email priyalshri1@gmail.com.' }, 429, cors);
    }

    // --- model call ---------------------------------------------------------
    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

    const messages: Anthropic.MessageParam[] = [
      ...history
        .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS * 2) })),
      { role: 'user', content: message },
    ];

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const send = (event: string, data: unknown) =>
          controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));

        let answer = '';
        let usage = { input: 0, output: 0 };

        try {
          const run = client.messages.stream({
            model: MODEL,
            max_tokens: MAX_TOKENS,
            // The persona + site content is identical on every request, so cache
            // it. A 1h TTL suits sporadic portfolio traffic far better than 5m.
            system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral', ttl: '1h' } }],
            messages,
          });

          for await (const event of run) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              answer += event.delta.text;
              send('delta', { text: event.delta.text });
            }
          }

          const final = await run.finalMessage();
          usage = {
            input: (final.usage.input_tokens ?? 0)
              + (final.usage.cache_read_input_tokens ?? 0)
              + (final.usage.cache_creation_input_tokens ?? 0),
            output: final.usage.output_tokens ?? 0,
          };

          if (final.stop_reason === 'refusal') {
            send('error', { error: 'I can’t help with that one. Try another question.' });
          }
          send('done', { stop_reason: final.stop_reason });
        } catch (err) {
          const msg = err instanceof Anthropic.RateLimitError
            ? 'Busy right now — try again in a moment.'
            : 'Something went wrong. Email priyalshri1@gmail.com if it keeps happening.';
          send('error', { error: msg });
          console.error('chat failure', err);
        } finally {
          controller.close();
        }

        // Log after the response has been delivered.
        ctx.waitUntil(
          env.DB.prepare(
            `INSERT INTO turns
               (conversation_id, turn_index, question, answer, page, country, input_tokens, output_tokens)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`
          ).bind(
            conversationId,
            Math.floor(history.length / 2),
            message,
            answer || null,
            (body.page ?? '').slice(0, 200) || null,
            (request as { cf?: { country?: string } }).cf?.country ?? null,
            usage.input,
            usage.output
          ).run().catch((e) => console.error('log failure', e))
        );
      },
    });

    return new Response(stream, {
      headers: {
        ...cors,
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  },
};

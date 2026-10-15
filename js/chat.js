/**
 * Portfolio chat assistant — front end.
 *
 * Talks to the Cloudflare Worker in chat/worker. Set CHAT_ENDPOINT to the
 * deployed worker URL; while it is empty the launcher does not render, so the
 * site is unaffected until the backend exists.
 */
(function () {
  const CHAT_ENDPOINT = ''; // e.g. 'https://priyal-chat.<subdomain>.workers.dev/chat'

  if (!CHAT_ENDPOINT) return;

  const MAX_CHARS = 1500;
  const OPENERS = [
    'What has Priyal worked on with AI?',
    'What research methods does she use?',
    'Tell me about the Razorpay onboarding study',
  ];

  const conversationId = (crypto.randomUUID && crypto.randomUUID())
    || String(Date.now()) + Math.random().toString(16).slice(2);
  const history = [];
  let busy = false;

  // --- markup --------------------------------------------------------------
  const root = document.createElement('div');
  root.className = 'pc';
  root.innerHTML = `
    <button class="pc__launch" type="button" aria-expanded="false" aria-controls="pc-panel">
      <span class="pc__launch-dot" aria-hidden="true"></span>
      <span>Ask about Priyal&rsquo;s work</span>
    </button>
    <section class="pc__panel" id="pc-panel" hidden aria-label="Ask about Priyal's work">
      <header class="pc__head">
        <div>
          <p class="pc__title">Ask about Priyal&rsquo;s work</p>
          <p class="pc__sub">Answers come from this site. Not Priyal herself.</p>
        </div>
        <button class="pc__close" type="button" aria-label="Close">&times;</button>
      </header>
      <div class="pc__log" role="log" aria-live="polite"></div>
      <div class="pc__openers">
        ${OPENERS.map((q) => `<button class="pc__opener" type="button">${q}</button>`).join('')}
      </div>
      <form class="pc__form">
        <label class="u-sr-only" for="pc-input">Your question</label>
        <textarea id="pc-input" class="pc__input" rows="1" maxlength="${MAX_CHARS}"
          placeholder="Ask a question&hellip;" autocomplete="off"></textarea>
        <button class="pc__send" type="submit" aria-label="Send">&uarr;</button>
      </form>
      <p class="pc__note">Conversations are saved so Priyal can see what people ask. Don&rsquo;t share anything sensitive.</p>
    </section>`;
  document.body.appendChild(root);

  const launch = root.querySelector('.pc__launch');
  const panel = root.querySelector('.pc__panel');
  const log = root.querySelector('.pc__log');
  const form = root.querySelector('.pc__form');
  const input = root.querySelector('.pc__input');
  const openers = root.querySelector('.pc__openers');

  // --- helpers -------------------------------------------------------------
  function bubble(role, text) {
    const el = document.createElement('div');
    el.className = `pc__msg pc__msg--${role}`;
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  function setOpen(open) {
    panel.hidden = !open;
    launch.setAttribute('aria-expanded', String(open));
    root.classList.toggle('is-open', open);
    if (open) {
      input.focus();
      if (!log.childElementCount) {
        bubble('bot', 'Ask me about Priyal’s research, her case studies, or how she works. If it isn’t on the site, I’ll say so.');
      }
    }
  }

  async function send(text) {
    if (busy || !text.trim()) return;
    busy = true;
    openers.hidden = true;
    input.value = '';
    input.style.height = 'auto';
    bubble('user', text);

    const out = bubble('bot', '');
    out.classList.add('is-waiting');

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation_id: conversationId,
          message: text,
          history: history.slice(-24),
          page: location.pathname,
        }),
      });

      if (!res.ok) {
        let msg = 'Something went wrong. Try again in a moment.';
        try { msg = (await res.json()).error || msg; } catch (_) {}
        out.classList.remove('is-waiting');
        out.classList.add('pc__msg--error');
        out.textContent = msg;
        return;
      }

      // Server-sent events, newline-delimited.
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let answer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const frames = buffer.split('\n\n');
        buffer = frames.pop() || '';
        for (const frame of frames) {
          const ev = /event: (\w+)/.exec(frame);
          const dt = /data: (.*)/.exec(frame);
          if (!ev || !dt) continue;
          let payload = {};
          try { payload = JSON.parse(dt[1]); } catch (_) { continue; }

          if (ev[1] === 'delta' && payload.text) {
            answer += payload.text;
            out.classList.remove('is-waiting');
            out.textContent = answer;
            log.scrollTop = log.scrollHeight;
          } else if (ev[1] === 'error') {
            out.classList.remove('is-waiting');
            out.classList.add('pc__msg--error');
            out.textContent = payload.error || 'Something went wrong.';
          }
        }
      }

      if (answer) {
        history.push({ role: 'user', content: text });
        history.push({ role: 'assistant', content: answer });
      } else if (!out.classList.contains('pc__msg--error')) {
        out.classList.remove('is-waiting');
        out.textContent = 'No answer came back. Try rephrasing?';
      }
    } catch (err) {
      out.classList.remove('is-waiting');
      out.classList.add('pc__msg--error');
      out.textContent = 'Could not reach the assistant. Check your connection.';
    } finally {
      busy = false;
      input.focus();
    }
  }

  // --- events --------------------------------------------------------------
  launch.addEventListener('click', () => setOpen(panel.hidden));
  root.querySelector('.pc__close').addEventListener('click', () => { setOpen(false); launch.focus(); });

  form.addEventListener('submit', (e) => { e.preventDefault(); send(input.value); });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input.value); }
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  openers.addEventListener('click', (e) => {
    const btn = e.target.closest('.pc__opener');
    if (btn) send(btn.textContent);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) { setOpen(false); launch.focus(); }
  });
})();

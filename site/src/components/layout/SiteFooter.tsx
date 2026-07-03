import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function SiteFooter({ flush = false }: { flush?: boolean }) {
  return (
    <footer className={flush ? "mt-0" : "mt-auto border-t border-border"}>
      <Container className="py-14 sm:py-16">
        <Reveal>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-muted">
            Get in touch
          </p>
          <a
            href={`mailto:${site.email}`}
            className="block text-[clamp(1.5rem,4vw,2.4rem)] font-extrabold tracking-tight text-accent transition-opacity hover:opacity-75"
          >
            {site.email}
          </a>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © 2026 · Made with <span aria-label="love">♥</span> by Priyal Shrivastava
          </span>
          <div className="flex gap-5">
            <a href={`mailto:${site.email}`} className="font-semibold hover:text-accent">
              Email
            </a>
            <Link
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-accent"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

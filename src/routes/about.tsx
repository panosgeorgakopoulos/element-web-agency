import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { AvailabilityBadge } from "@/components/nocturne/AvailabilityBadge";
import { Magnetic } from "@/components/nocturne/Magnetic";
import { AGENCY } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${AGENCY.name}` },
      {
        name: "description",
        content:
          "Panos Georgakopoulos — elite solo web engineer building high-performance web apps and booking systems from Athens, Greece.",
      },
      { property: "og:title", content: `About — ${AGENCY.name}` },
      {
        property: "og:description",
        content: "One engineer. Full ownership. Zero overhead. This is Element Web.",
      },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    n: "01",
    title: "Full ownership, zero handoffs",
    body: "Every decision — from database schema to pixel spacing — comes from a single mind. No briefings lost in translation, no design-engineering mismatch, no account manager in the middle.",
  },
  {
    n: "02",
    title: "Speed through focus",
    body: "Agencies staff projects reactively. I scope, architect, and ship with a single coherent vision from day one. What takes a team six weeks takes me two — without the coordination tax.",
  },
  {
    n: "03",
    title: "Performance is non-negotiable",
    body: "Sub-second load times, 99+ Lighthouse scores, and type-safe codebases aren't stretch goals. They're the baseline. Every line of code is written as if it runs at scale — because it will.",
  },
  {
    n: "04",
    title: "Business outcomes over deliverables",
    body: "I think in conversion rates, checkout abandonment, and TTFB — not story points. The interface is the product, and the product has to pay for itself.",
  },
];

const STACK_GROUPS = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
  },
  {
    label: "Backend & Data",
    items: ["Node.js", "PostgreSQL", "Prisma", "Supabase", "REST / GraphQL"],
  },
  {
    label: "Payments & Infra",
    items: ["Stripe", "Vercel Edge", "Cloudflare", "AWS S3", "Webhooks"],
  },
  {
    label: "Tooling",
    items: ["GSAP", "Lenis", "WebGL / GLSL", "Figma", "Git"],
  },
];

const NUMBERS = [
  { v: "1", l: "Engineer" },
  { v: "< 1.2s", l: "Target load time" },
  { v: "99", l: "Lighthouse baseline" },
  { v: "100%", l: "Project ownership" },
];

function AboutPage() {
  const kineticRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  /* Scroll-driven kinetic manifesto */
  useEffect(() => {
    const el = kineticRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lines = Array.from(el.querySelectorAll<HTMLElement>(".manifesto-line"));
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const progress = 1 - r.top / window.innerHeight;
      lines.forEach((l, i) => {
        const skew = (Math.sin(progress * Math.PI + i) * 3).toFixed(2);
        const x = (Math.cos(progress * Math.PI + i * 0.6) * 10).toFixed(2);
        l.style.transform = `translate3d(${x}px, 0, 0) skewX(${skew}deg)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Principles reveal on scroll */
  useEffect(() => {
    const container = principlesRef.current;
    if (!container) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>(".principle-item"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(28px)";
      item.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pb-24 pt-32 md:pt-44">
      {/* ── Header ── */}
      <header className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              About — Element Web
            </p>
            <h1 className="mt-6 font-display text-[13vw] font-semibold leading-[0.9] tracking-[-0.04em] md:text-[7.5vw]">
              One engineer.<br />
              <span className="text-silver">Total clarity.</span>
            </h1>
          </div>
          <div className="md:pt-4">
            <AvailabilityBadge />
          </div>
        </div>

        {/* Intro paragraph */}
        <div className="mt-16 grid gap-8 border-t border-border pt-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              00 — Introduction
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-5">
            <p className="text-xl leading-relaxed text-foreground">
              I'm <strong className="font-semibold text-foreground">Panos Georgakopoulos</strong> — a CS undergraduate student with skills of a full-stack web engineer based in Athens, Greece. I founded Element Web to offer something the market rarely provides: a single, senior technical mind with full accountability for the product's design, architecture, performance, and delivery.
            </p>
            <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
              I work with founders and product teams who value speed without sloppiness, interfaces that convert, and codebases they can actually maintain. No bloat. No bureaucracy. Just precise engineering in service of real business goals.
            </p>
            <Link
              to="/contact"
              data-cursor="magnetic"
              className="mt-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-primary hover:text-foreground"
            >
              Start a conversation <span>→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Kinetic manifesto ── */}
      <section
        ref={kineticRef}
        className="mx-auto mt-28 max-w-[1600px] overflow-hidden px-5 md:mt-40 md:px-10"
      >
        <div className="space-y-2 font-display text-[clamp(2.2rem,6vw,5.5rem)] font-semibold leading-[0.93] tracking-tight">
          <div className="manifesto-line text-foreground">I design with restraint.</div>
          <div className="manifesto-line text-silver">I engineer with conviction.</div>
          <div className="manifesto-line text-primary">I ship with care.</div>
          <div className="manifesto-line text-muted-foreground">— and I never repeat myself.</div>
        </div>
      </section>

      {/* ── Numbers ── */}
      <section className="mx-auto mt-28 grid max-w-[1600px] grid-cols-2 gap-6 border-t border-border px-5 pt-12 md:mt-40 md:grid-cols-4 md:px-10">
        {NUMBERS.map((s) => (
          <div key={s.l}>
            <div className="font-display text-5xl font-semibold tracking-tight text-silver md:text-6xl">
              {s.v}
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {s.l}
            </div>
          </div>
        ))}
      </section>

      {/* ── Why solo ── */}
      <section className="mx-auto mt-28 max-w-[1600px] px-5 md:mt-40 md:px-10">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              01 — Philosophy
            </p>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Why one engineer outperforms<br />
              <span className="text-silver">a room full of them.</span>
            </h2>
          </div>
        </div>

        <div
          ref={principlesRef}
          className="mt-14 grid gap-8 md:grid-cols-2 md:gap-6"
        >
          {PRINCIPLES.map((p) => (
            <div
              key={p.n}
              className="principle-item rounded-2xl border border-border bg-card/40 p-8 backdrop-blur-sm"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                {p.n}
              </p>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight md:text-2xl">
                {p.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stack ── */}
      <section className="mx-auto mt-28 max-w-[1600px] px-5 md:mt-40 md:px-10">
        <div className="grid gap-8 border-t border-border pt-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              02 — Technical Stack
            </p>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <div className="grid gap-10 sm:grid-cols-2">
              {STACK_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    {group.label}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 font-display text-lg font-medium text-foreground"
                      >
                        <span
                          className="inline-block h-1 w-1 rounded-full bg-primary"
                          style={{ boxShadow: "0 0 6px oklch(0.88 0.16 192 / 0.8)" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder card ── */}
      <section className="mx-auto mt-28 max-w-[1600px] px-5 md:mt-40 md:px-10">
        <div className="grid gap-8 border-t border-border pt-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              03 — The Engineer
            </p>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
              {/* Portrait placeholder with initials */}
              <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-border bg-charcoal">
                <div className="flex h-full w-full items-center justify-center font-display text-3xl font-semibold text-silver">
                  PG
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-4">
                  <h2 className="font-display text-3xl font-semibold tracking-tight">
                    Panos Georgakopoulos
                  </h2>
                  <AvailabilityBadge />
                </div>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  Founder · Lead Engineer · Athens, Greece
                </p>
                <p className="mt-6 leading-relaxed text-muted-foreground">
                  I've spent years building production systems at the intersection of performance and design — from real-time fleet management platforms to full payment orchestrations. My background spans the entire delivery lifecycle: discovery, architecture, UI engineering, backend development, and deployment.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  I take on a small number of projects each year, so every client gets my full attention — not a junior developer shadowing a senior who's already on to the next brief.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Magnetic strength={0.3}>
                    <Link
                      to="/contact"
                      data-cursor-label="Write"
                      className="inline-flex items-center gap-3 rounded-full border border-primary/60 bg-primary/10 px-6 py-3 font-mono text-xs uppercase tracking-[0.28em] text-primary transition-colors hover:bg-primary/20"
                    >
                      Work with me →
                    </Link>
                  </Magnetic>
                  <a
                    href="https://www.linkedin.com/in/panagiotis-sergios-georgakopoulos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="magnetic"
                    className="inline-flex items-center gap-3 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto mt-28 max-w-[1600px] px-5 md:mt-40 md:px-10">
        <div className="flex flex-col items-start gap-8 border-t border-border pt-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              04 — Let's Build
            </p>
            <h3 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Have a product that needs to<br />
              <span className="text-silver">perform under pressure?</span>
            </h3>
          </div>
          <Magnetic strength={0.4}>
            <Link
              to="/contact"
              data-cursor-label="Write"
              className="pulse-glow inline-flex items-center gap-4 rounded-full border border-primary/60 bg-primary/10 px-7 py-4 font-mono text-xs uppercase tracking-[0.28em] text-primary hover:bg-primary/20"
            >
              Start a Project →
            </Link>
          </Magnetic>
        </div>
      </section>
    </div>
  );
}

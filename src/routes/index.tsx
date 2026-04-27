import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { RoutingGrid } from "@/components/webgl/RoutingGrid";
import { Magnetic } from "@/components/elementweb/Magnetic";
import { useLocalTime } from "@/hooks/useLocalTime";
import { AGENCY, PROJECTS, STUDIOS } from "@/data/site";
import { WorkList } from "@/components/elementweb/WorkList";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${AGENCY.name} — ${AGENCY.tagline}` },
      {
        name: "description",
        content: AGENCY.description,
      },
      { property: "og:title", content: `${AGENCY.name} — ${AGENCY.tagline}` },
      {
        property: "og:description",
        content: AGENCY.description,
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <PhilosophyStrip />
      <FeaturedWork />
      <CtaStrip />
    </>
  );
}

function Hero() {
  const studio = STUDIOS[0];
  const time = useLocalTime(studio?.tz ?? "Europe/Athens");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const lines = headingRef.current?.querySelectorAll<HTMLElement>(".reveal-line");
    if (!lines) return;
    lines.forEach((l, i) => {
      window.setTimeout(() => l.classList.add("in"), 200 + i * 140);
    });
  }, []);

  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <RoutingGrid className="h-full w-full" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col justify-between px-5 pb-10 pt-32 md:px-10 md:pt-40">
        <div className="flex items-start justify-between">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <div className="mt-1 text-foreground">EST · 2026</div>
          </div>
          <div className="text-right font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <div className="mt-1 text-primary">ATH — {time}</div>
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            ◐ Now booking
          </p>
          <h1
            ref={headingRef}
            className="mt-6 font-display text-[14vw] font-semibold leading-[0.9] tracking-[-0.04em] md:text-[10vw]"
          >
            <span className="reveal-line"><span>We Build</span></span>
            <span className="reveal-line"><span className="text-silver">The Future</span></span>
            <span className="reveal-line"><span>Of <em className="not-italic text-primary">The Web.</em></span></span>
          </h1>

          <div className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-md text-base text-muted-foreground md:text-lg">
              {AGENCY.description}
            </p>

            <Magnetic strength={0.4}>
              <Link
                to="/contact"
                data-cursor-label="Begin"
                className="pulse-glow group inline-flex items-center gap-4 rounded-full border border-primary/60 bg-primary/10 px-7 py-4 font-mono text-xs uppercase tracking-[0.28em] text-primary transition-colors hover:bg-primary/20"
              >
                Start a Project
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-45">
                  ↗
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>Scroll ↓</span>
          <span>v1.0 · Edge-rendered</span>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["React", "Next.js", "Stripe", "PostgreSQL", "UI/UX", "Full-Stack", "E-commerce", "APIs"];
  const row = (
    <div className="flex shrink-0 items-center gap-12 px-6">
      {words.map((w) => (
        <span key={w} className="flex items-center gap-12">
          <span className="font-display text-5xl font-semibold tracking-tight text-silver md:text-7xl">
            {w}
          </span>
          <span className="text-primary">●</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-y border-border bg-background py-10">
      <div className="marquee whitespace-nowrap">
        {row}
        {row}
      </div>
    </div>
  );
}

function PhilosophyStrip() {
  return (
    <section className="relative mx-auto max-w-[1600px] px-5 py-32 md:px-10 md:py-48">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            01 — Philosophy
          </p>
        </div>
        <div className="md:col-span-9">
          <p className="font-display text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">
            I treat every project as <em className="not-italic text-primary">production-grade engineering</em> —
            pixel-perfect interfaces, bulletproof backends, and infrastructure tuned for <span className="text-silver">peak performance</span>.
            No templates. No shortcuts. Only craft.
          </p>
          <Link
            to="/about"
            data-cursor="magnetic"
            className="mt-10 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-foreground hover:text-primary"
          >
            About Me <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedWork() {
  return (
    <section className="relative pt-12">
      <div className="mx-auto max-w-[1600px] px-5 pb-12 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              02 — Featured Case Study
            </p>
            <h2 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-7xl">
              Built to <span className="text-silver">perform.</span>
            </h2>
          </div>
          <Link
            to="/work"
            data-cursor="magnetic"
            className="hidden font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-primary md:inline"
          >
            View Case Study →
          </Link>
        </div>
      </div>
      <WorkList />
    </section>
  );
}

function CtaStrip() {
  return (
    <section className="relative mx-auto max-w-[1600px] px-5 py-32 md:px-10 md:py-48">
      <div className="flex flex-col items-start gap-8 border-t border-border pt-16 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            03 — Open
          </p>
          <h3 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Have an ambition that scares you a little?
          </h3>
        </div>
        <Magnetic strength={0.4}>
          <Link
            to="/contact"
            data-cursor-label="Write"
            className="inline-flex items-center gap-4 rounded-full border border-primary/60 bg-primary/10 px-7 py-4 font-mono text-xs uppercase tracking-[0.28em] text-primary hover:bg-primary/20"
          >
            Begin a Project →
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}

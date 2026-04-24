import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { FluidHero } from "@/components/webgl/FluidHero";
import { Magnetic } from "@/components/nocturne/Magnetic";
import { useLocalTime } from "@/hooks/useLocalTime";
import { AGENCY, PROJECTS } from "@/data/site";
import { WorkList } from "@/components/nocturne/WorkList";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOCTURNE — We build the future of the web." },
      {
        name: "description",
        content:
          "NOCTURNE designs and engineers realtime, sculptural digital experiences for ambitious brands.",
      },
      { property: "og:title", content: "NOCTURNE — We build the future of the web." },
      {
        property: "og:description",
        content: "Realtime, sculptural design and engineering. Independent studio, three cities.",
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
  const time = useLocalTime("Europe/Paris");
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
        <FluidHero className="h-full w-full" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col justify-between px-5 pb-10 pt-32 md:px-10 md:pt-40">
        <div className="flex items-start justify-between">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <div>(Independent Studio)</div>
            <div className="mt-1 text-foreground">EST · 2018</div>
          </div>
          <div className="text-right font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <div>48.85°N · 2.35°E</div>
            <div className="mt-1 text-primary">PAR — {time}</div>
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            ◐ Now booking · Q3 2026
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
          <span>v1.0 · Realtime · Edge-rendered</span>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["WebGL", "Three.js", "E-commerce", "Branding", "Motion", "UI/UX", "Realtime 3D", "Edge"];
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
            01 — Manifesto
          </p>
        </div>
        <div className="md:col-span-9">
          <p className="font-display text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">
            We treat every site as a piece of <em className="not-italic text-primary">interactive architecture</em> —
            sculpted in realtime, lit by code, and tuned for <span className="text-silver">60 frames per second</span>.
            No templates. No filler. No two projects that look the same.
          </p>
          <Link
            to="/about"
            data-cursor="magnetic"
            className="mt-10 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-foreground hover:text-primary"
          >
            Read Our Philosophy <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedWork() {
  const featured = PROJECTS.slice(0, 4);
  void featured;
  return (
    <section className="relative pt-12">
      <div className="mx-auto max-w-[1600px] px-5 pb-12 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              02 — Selected Work
            </p>
            <h2 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-7xl">
              Recent <span className="text-silver">obsessions.</span>
            </h2>
          </div>
          <Link
            to="/work"
            data-cursor="magnetic"
            className="hidden font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-primary md:inline"
          >
            All Work →
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

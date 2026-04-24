import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NOCTURNE" },
      {
        name: "description",
        content: "Independent design studio with three studios, one obsession: realtime craft.",
      },
      { property: "og:title", content: "About — NOCTURNE" },
      {
        property: "og:description",
        content: "Independent studio across Paris, Tokyo, and New York. Realtime craft, no templates.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const kineticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = kineticRef.current;
    if (!el) return;
    const lines = Array.from(el.querySelectorAll<HTMLElement>("[data-kinetic]"));
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const progress = 1 - r.top / window.innerHeight;
      lines.forEach((l, i) => {
        const skew = (Math.sin(progress * Math.PI + i) * 4).toFixed(2);
        const x = (Math.cos(progress * Math.PI + i * 0.7) * 12).toFixed(2);
        l.style.transform = `translate3d(${x}px, 0, 0) skewX(${skew}deg)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pb-24 pt-32 md:pt-44">
      <header className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
          Index — Studio
        </p>
        <h1 className="mt-6 font-display text-[14vw] font-semibold leading-[0.9] tracking-[-0.04em] md:text-[8vw]">
          A studio, not <span className="text-silver">an agency.</span>
        </h1>
      </header>

      {/* Kinetic manifesto */}
      <section
        ref={kineticRef}
        className="mx-auto mt-24 max-w-[1600px] px-5 md:px-10"
      >
        <div className="space-y-3 font-display text-5xl font-medium leading-[0.95] tracking-tight md:text-8xl">
          <div data-kinetic className="text-foreground transition-transform duration-300">We design with restraint.</div>
          <div data-kinetic className="text-silver transition-transform duration-300">We engineer with conviction.</div>
          <div data-kinetic className="text-primary transition-transform duration-300">We ship with care.</div>
          <div data-kinetic className="text-muted-foreground transition-transform duration-300">— and we never repeat ourselves.</div>
        </div>
      </section>

      {/* Numbers */}
      <section className="mx-auto mt-32 grid max-w-[1600px] grid-cols-2 gap-6 border-t border-border px-5 pt-12 md:grid-cols-4 md:px-10">
        {[
          { v: "12", l: "Humans" },
          { v: "3", l: "Studios" },
          { v: "47", l: "Projects shipped" },
          { v: "9", l: "Industry awards" },
        ].map((s) => (
          <div key={s.l}>
            <div className="font-display text-6xl font-semibold tracking-tight text-silver md:text-7xl">
              {s.v}
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {s.l}
            </div>
          </div>
        ))}
      </section>

      {/* Team */}
      <section className="mx-auto mt-32 max-w-[1600px] px-5 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">02 — People</p>
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-4">
          {TEAM.map((m) => (
            <div key={m.name} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="font-display text-xl font-medium">{m.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {m.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const TEAM = [
  {
    name: "Iris Moreau",
    role: "Founder",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Kenji Aoki",
    role: "Direction",
    photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Léa Bauer",
    role: "Design",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Adam Reyes",
    role: "Engineering",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
];

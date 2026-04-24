import { Link } from "@tanstack/react-router";
import { useRef, useState, useMemo } from "react";
import { PROJECTS, type Project } from "@/data/site";
import { DistortedImage } from "@/components/webgl/DistortedImage";

type Filter = "All" | Project["category"];

const FILTERS: Filter[] = ["All", "3D", "E-com", "Brand", "UI/UX"];

export function WorkList() {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  const onMove = (e: React.PointerEvent) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    });
  };

  const active = activeIdx != null ? filtered[activeIdx] : null;

  return (
    <section className="relative">
      {/* Filters */}
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 px-5 pb-10 md:px-10">
        {FILTERS.map((f) => (
          <button
            key={f}
            data-cursor="magnetic"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
              filter === f
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Desktop list with WebGL hover reveal */}
      <div
        ref={containerRef}
        onPointerMove={onMove}
        className="relative hidden md:block"
      >
        {/* Floating distorted image — fixed-ish to viewport area */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden
        >
          {filtered.map((p, i) => (
            <div
              key={p.slug}
              className="absolute left-1/2 top-1/2 h-[50vh] w-[40vw] -translate-x-1/2 -translate-y-1/2"
              style={{
                opacity: activeIdx === i ? 1 : 0,
                transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <DistortedImage
                src={p.cover}
                active={activeIdx === i}
                mouse={mouse}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>

        <ul className="relative z-10 mx-auto max-w-[1600px] divide-y divide-border border-y border-border px-5 md:px-10">
          {filtered.map((p, i) => (
            <li
              key={p.slug}
              onPointerEnter={() => setActiveIdx(i)}
              onPointerLeave={() => setActiveIdx(null)}
            >
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                data-cursor-label="View"
                className="group grid grid-cols-[auto_1fr_auto_auto] items-baseline gap-6 py-8 transition-colors"
              >
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  0{i + 1}
                </span>
                <span
                  className="font-display text-5xl font-semibold tracking-tight transition-colors lg:text-7xl"
                  style={{
                    color:
                      activeIdx === null || activeIdx === i ? "var(--foreground)" : "oklch(0.45 0.01 250)",
                  }}
                >
                  {p.title}
                </span>
                <span className="hidden font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground lg:inline">
                  {p.category}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {p.year}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-6 flex max-w-[1600px] items-center justify-between px-5 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:px-10">
          <span>{filtered.length} projects</span>
          <span>{active ? `${active.client} · ${active.role}` : "Hover a row"}</span>
        </div>
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden">
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6">
          {filtered.map((p, i) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              className="relative aspect-[3/4] w-[78vw] flex-shrink-0 snap-center overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={p.cover}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                    0{i + 1} · {p.category}
                  </div>
                  <div className="mt-1 font-display text-2xl font-semibold tracking-tight">
                    {p.title}
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {p.year}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/site";

/**
 * Cinematic Featured Case Study — a single, full-bleed hero treatment
 * for the primary project. Replaces the old multi-project grid/list.
 */
export function WorkList() {
  const project = PROJECTS[0];
  if (!project) return null;

  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  /* ── Parallax & scroll-driven animations ── */
  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const meta = metaRef.current;
    const metrics = metricsRef.current;
    if (!section || !image || !overlay || !title || !meta || !metrics) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Entrance animation
    const tl = setTimeout(() => {
      title.style.opacity = "1";
      title.style.transform = "translateY(0)";
      meta.style.opacity = "1";
      meta.style.transform = "translateY(0)";
    }, 400);

    // Scroll handler
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;

        // Parallax on cover image — image moves at 0.35x scroll rate
        if (rect.top < vh && rect.bottom > 0) {
          const progress = -rect.top / (rect.height + vh);
          if (!reduced) {
            image.style.transform = `translate3d(0, ${progress * 180}px, 0) scale(1.08)`;
          }

          // Darken overlay as user scrolls past
          const opacity = Math.min(1, Math.max(0, -rect.top / (vh * 0.6)));
          overlay.style.opacity = String(0.35 + opacity * 0.35);

          // Fade out title as it scrolls up
          const titleFade = Math.min(1, Math.max(0, -rect.top / (vh * 0.35)));
          title.style.opacity = String(1 - titleFade);
          if (!reduced) {
            title.style.transform = `translateY(${titleFade * -40}px)`;
          }
        }

        // Metrics bar reveal
        const metricsRect = metrics.getBoundingClientRect();
        if (metricsRect.top < vh * 0.85) {
          metrics.style.opacity = "1";
          metrics.style.transform = "translateY(0)";
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      clearTimeout(tl);
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      {/* ── Cinematic Cover Hero ── */}
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        data-cursor-label="Explore"
        className="group relative block h-[90vh] w-full overflow-hidden"
      >
        {/* Cover image with parallax */}
        <div
          ref={imageRef}
          className="absolute inset-[-8%] transition-none will-change-transform"
          style={{ transform: "translate3d(0, 0, 0) scale(1.08)" }}
        >
          <img
            src={project.cover}
            alt={project.title}
            onLoad={() => setImgLoaded(true)}
            className="h-full w-full object-cover"
            style={{
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>

        {/* Gradient overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20"
          style={{ opacity: 0.35 }}
        />

        {/* Edge vignette for drama */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, oklch(0.12 0.01 250 / 0.6) 100%)",
          }}
        />

        {/* Massive typography layer */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-10">
          <div
            ref={metaRef}
            className="mb-4 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-primary/90"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition:
                "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
            }}
          >
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                style={{ boxShadow: "0 0 8px oklch(0.88 0.16 192 / 0.7)" }}
              />
              Featured Case Study
            </span>
            <span className="hidden text-muted-foreground md:inline">—</span>
            <span className="hidden text-muted-foreground md:inline">{project.category}</span>
            <span className="hidden text-muted-foreground md:inline">·</span>
            <span className="hidden text-muted-foreground md:inline">{project.year}</span>
          </div>

          <h2
            ref={titleRef}
            className="cinematic-title font-display font-semibold tracking-[-0.04em] text-foreground"
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              transition:
                "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
              fontSize: "clamp(3rem, 12vw, 10rem)",
              lineHeight: 0.9,
            }}
          >
            {project.title}
            <span className="text-primary">.</span>
          </h2>

          <p
            className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/70 md:mt-6 md:text-base"
            style={{
              opacity: imgLoaded ? 0.85 : 0,
              transition: "opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
            }}
          >
            {project.summary}
          </p>

          {/* Stack pills */}
          <div
            className="mt-5 flex flex-wrap gap-2 md:mt-6"
            style={{
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1s",
            }}
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Scroll indicator */}
          <div
            className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:mt-10"
            style={{
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1) 1.2s",
            }}
          >
            <span className="scroll-indicator-line inline-block h-[1px] w-8 bg-primary/60" />
            Scroll to explore
          </div>
        </div>
      </Link>

      {/* ── Glassmorphism Metrics Bar ── */}
      <div
        ref={metricsRef}
        className="metrics-bar relative z-10 -mt-12 mx-auto max-w-[1200px] px-5 md:-mt-16 md:px-10"
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          transition:
            "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="metrics-glass flex flex-col items-stretch gap-0 overflow-hidden rounded-2xl border border-white/[0.08] md:flex-row md:gap-0 md:rounded-2xl">
          {project.outcome.map((metric, i) => (
            <div
              key={metric.label}
              className={`metrics-cell group relative flex flex-1 flex-col items-center justify-center px-6 py-7 md:py-9 ${
                i < project.outcome.length - 1
                  ? "border-b border-white/[0.06] md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-primary/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <span
                className="relative font-display text-3xl font-semibold tracking-tight text-silver md:text-4xl"
                style={{
                  textShadow: "0 0 40px oklch(0.88 0.16 192 / 0.15)",
                }}
              >
                {metric.value}
              </span>
              <span className="relative mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

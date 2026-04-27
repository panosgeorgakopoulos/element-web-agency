import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AGENCY, SOCIALS, STUDIOS } from "@/data/site";
import { useLocalTime } from "@/hooks/useLocalTime";
import { Magnetic } from "./Magnetic";

const LINKS = [
  { to: "/", label: "Index" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const time = useLocalTime("Europe/Athens");

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="glass fixed inset-x-0 top-0 z-[60]">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Link
            to="/"
            data-cursor="magnetic"
            className="font-display text-lg font-semibold tracking-[0.18em] text-foreground"
          >
            {AGENCY.name}
            <span className="ml-2 text-primary">●</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.slice(1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-cursor="magnetic"
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="font-mono text-xs uppercase tracking-[0.22em] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground md:inline">
              ATH · {time}
            </span>
            <Magnetic strength={0.3}>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                data-cursor="magnetic"
                className="group relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card/40 backdrop-blur transition-colors hover:border-primary/60"
              >
                <span
                  className="absolute h-px w-4 bg-foreground transition-all duration-300"
                  style={{
                    transform: open ? "translateY(0) rotate(45deg)" : "translateY(-4px)",
                  }}
                />
                <span
                  className="absolute h-px w-4 bg-foreground transition-all duration-300"
                  style={{
                    transform: open ? "translateY(0) rotate(-45deg)" : "translateY(4px)",
                  }}
                />
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      <FullscreenMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function FullscreenMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      aria-hidden={!open}
      className="fixed inset-0 z-[55] transition-[clip-path] duration-[900ms]"
      style={{
        clipPath: open ? "circle(150% at calc(100% - 36px) 36px)" : "circle(0% at calc(100% - 36px) 36px)",
        backgroundColor: "oklch(0.1 0.012 250)",
        pointerEvents: open ? "auto" : "none",
        transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <div className="grid h-full grid-rows-[1fr_auto] px-5 pt-24 md:px-12">
        <ul className="flex flex-col justify-center gap-2">
          {LINKS.map((l, i) => (
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={onClose}
                data-cursor-label="Go"
                className="group relative block py-1 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground transition-transform duration-700 md:text-7xl lg:text-8xl"
                style={{
                  transform: open ? "translateY(0)" : "translateY(120%)",
                  opacity: open ? 1 : 0,
                  transitionDelay: open ? `${120 + i * 80}ms` : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                  transitionProperty: "transform, opacity, color",
                }}
              >
                <span className="mr-4 align-middle font-mono text-xs uppercase tracking-[0.3em] text-primary">
                  0{i + 1}
                </span>
                <span className="group-hover:text-primary">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col justify-between gap-6 border-t border-border py-6 md:flex-row md:items-end">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="magnetic"
                className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-primary"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {STUDIOS.map((s) => (
              <span key={s.city}>
                {s.city} · <ClockTz tz={s.tz} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClockTz({ tz }: { tz: string }) {
  const t = useLocalTime(tz);
  return <span className="text-foreground">{t}</span>;
}

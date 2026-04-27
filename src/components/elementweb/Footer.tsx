import { Link } from "@tanstack/react-router";
import { AGENCY, SOCIALS, STUDIOS } from "@/data/site";
import { useLocalTime } from "@/hooks/useLocalTime";
import { Magnetic } from "./Magnetic";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-24 md:px-10 md:pt-32">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            (Let's Talk)
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Available · 2026
          </span>
        </div>

        <Magnetic strength={0.15}>
          <Link
            to="/contact"
            data-cursor-label="Write"
            className="mt-8 block font-display text-[18vw] font-semibold leading-[0.85] tracking-[-0.04em] text-silver md:text-[14vw]"
          >
            Let's Talk
            <span className="text-primary">.</span>
          </Link>
        </Magnetic>

        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4">
          <Col label="Email">
            <a
              href={`mailto:${AGENCY.email}`}
              data-cursor="magnetic"
              className="text-foreground hover:text-primary"
            >
              {AGENCY.email}
            </a>
          </Col>

          <Col label="Studios">
            <div className="space-y-1">
              {STUDIOS.map((s) => (
                <StudioRow key={s.city} city={s.city} tz={s.tz} />
              ))}
            </div>
          </Col>

          <Col label="Social">
            <div className="space-y-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="magnetic"
                  className="block text-foreground hover:text-primary"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </Col>

          <Col label="Index">
            <div className="space-y-1">
              <Link to="/work" className="block hover:text-primary">Work</Link>
              <Link to="/services" className="block hover:text-primary">Services</Link>
              <Link to="/about" className="block hover:text-primary">About</Link>
              <Link to="/contact" className="block hover:text-primary">Contact</Link>
            </div>
          </Col>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} {AGENCY.name} — Independent Studio</span>
          <span>Crafted with intent · v1.0 · Edge-rendered</span>
        </div>
      </div>
    </footer>
  );
}

function Col({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </div>
      <div className="font-sans text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function StudioRow({ city, tz }: { city: string; tz: string }) {
  const t = useLocalTime(tz);
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-foreground">{city}</span>
      <span className="font-mono text-xs text-muted-foreground">{t}</span>
    </div>
  );
}

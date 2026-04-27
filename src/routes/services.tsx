import { createFileRoute } from "@tanstack/react-router";
import { SERVICES } from "@/data/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Element Web" },
      {
        name: "description",
        content:
          "Brand systems, UI/UX, 3D & WebGL, e-commerce, motion, and engineering — delivered by a small team.",
      },
      { property: "og:title", content: "Services — Element Web" },
      {
        property: "og:description",
        content: "What we make: brand systems, UI/UX, 3D & WebGL, e-commerce, motion, engineering.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="pb-24 pt-32 md:pt-44">
      <header className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
          Index — Capabilities
        </p>
        <h1 className="mt-6 font-display text-[14vw] font-semibold leading-[0.9] tracking-[-0.04em] md:text-[8vw]">
          Six things we do <span className="text-silver">very</span> well.
        </h1>
        <p className="mt-8 max-w-xl text-muted-foreground">
          We don't outsource — every pixel and every shader is shipped by the people who designed it.
        </p>
      </header>

      <section className="mx-auto mt-24 max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {SERVICES.map((s) => (
            <article
              key={s.n}
              className="group relative bg-background p-8 transition-colors hover:bg-card md:p-12"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                  {s.n}
                </span>
                <span className="h-2 w-2 rounded-full bg-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <h2 className="mt-8 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                {s.title}
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">{s.body}</p>
              <ul className="mt-10 flex flex-wrap gap-2">
                {s.deliverables.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

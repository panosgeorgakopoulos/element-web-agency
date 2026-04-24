import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PROJECTS } from "@/data/site";
import { Magnetic } from "@/components/nocturne/Magnetic";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — NOCTURNE` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: `${loaderData.title} — NOCTURNE` },
          { property: "og:description", content: loaderData.summary },
          { property: "og:image", content: loaderData.cover },
          { name: "twitter:image", content: loaderData.cover },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">404</p>
        <h1 className="mt-4 font-display text-5xl">Project not found</h1>
        <Link to="/work" className="mt-6 inline-block text-primary">← Back to Work</Link>
      </div>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const p = Route.useLoaderData();
  const all = PROJECTS;
  const idx = all.findIndex((x) => x.slug === p.slug);
  const next = all[(idx + 1) % all.length];

  return (
    <article className="pb-24 pt-28 md:pt-36">
      {/* Hero */}
      <header className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>{p.category}</span>
          <span>{p.year}</span>
        </div>
        <h1 className="mt-6 font-display text-[14vw] font-semibold leading-[0.9] tracking-[-0.04em] md:text-[10vw]">
          {p.title}<span className="text-primary">.</span>
        </h1>
        <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-4">
          <Meta label="Client" value={p.client} />
          <Meta label="Role" value={p.role} />
          <Meta label="Year" value={p.year} />
          <Meta label="Stack" value={p.stack.join(" · ")} />
        </div>
      </header>

      <div className="relative mt-16 aspect-[16/9] w-full overflow-hidden md:mt-24">
        <img
          src={p.cover}
          alt={p.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Body */}
      <div className="mx-auto mt-24 grid max-w-[1600px] gap-16 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">Summary</p>
          <p className="mt-6 text-xl leading-relaxed text-foreground">{p.summary}</p>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <Section n="01" title="Challenge" body={p.challenge} />
          <Section n="02" title="Approach" body={p.approach} />
        </div>
      </div>

      {/* Outcomes */}
      <div className="mx-auto mt-24 max-w-[1600px] px-5 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">03 — Outcome</p>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {p.outcome.map((o) => (
            <div key={o.label} className="border-t border-border pt-6">
              <div className="font-display text-5xl font-semibold tracking-tight text-silver md:text-6xl">
                {o.value}
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {o.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="mx-auto mt-32 grid max-w-[1600px] gap-6 px-5 md:px-10">
        {p.gallery.map((g, i) => (
          <div
            key={g}
            className={`relative overflow-hidden rounded-xl border border-border ${
              i % 2 === 0 ? "aspect-[16/9]" : "aspect-[21/10]"
            }`}
          >
            <img src={g} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>

      {/* Next project */}
      <div className="mx-auto mt-32 max-w-[1600px] border-t border-border px-5 pt-12 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">Next</p>
            <Magnetic strength={0.2}>
              <Link
                to="/work/$slug"
                params={{ slug: next.slug }}
                data-cursor-label="Next"
                className="mt-4 block font-display text-6xl font-semibold tracking-tight text-foreground hover:text-primary md:text-8xl"
              >
                {next.title} →
              </Link>
            </Magnetic>
          </div>
          <Link
            to="/work"
            data-cursor="magnetic"
            className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-primary"
          >
            ← All Work
          </Link>
        </div>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-foreground">{value}</div>
    </div>
  );
}

function Section({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="mb-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
        {n} — {title}
      </p>
      <p className="mt-4 text-xl leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

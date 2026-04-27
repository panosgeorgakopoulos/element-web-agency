import { createFileRoute, Link } from "@tanstack/react-router";
import { PROJECTS } from "@/data/site";
import { WorkList } from "@/components/elementweb/WorkList";
import { Magnetic } from "@/components/elementweb/Magnetic";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Element Web" },
      {
        name: "description",
        content: "Featured case study — high-performance web engineering by Panos Georgakopoulos.",
      },
      { property: "og:title", content: "Work — Element Web" },
      {
        property: "og:description",
        content: "Featured case study from Element Web — high-performance web apps and booking systems.",
      },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const project = PROJECTS[0];

  return (
    <div className="pb-24 pt-28 md:pt-36">
      {/* Section intro */}
      <div className="mx-auto max-w-[1600px] px-5 pb-16 md:px-10 md:pb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
          Featured Case Study
        </p>
        <h1 className="mt-6 font-display text-[12vw] font-semibold leading-[0.9] tracking-[-0.04em] md:text-[7vw]">
          Precision-engineered <span className="text-silver">for impact.</span>
        </h1>
        <p className="mt-8 max-w-xl text-muted-foreground">
          Every project receives undivided focus. Below is the work that defines the standard.
        </p>
      </div>

      {/* Cinematic case study */}
      <WorkList />

      {/* CTA after the case study */}
      {project && (
        <div className="mx-auto mt-24 max-w-[1600px] px-5 md:mt-32 md:px-10">
          <div className="flex flex-col items-start gap-8 border-t border-border pt-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                Interested?
              </p>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
                Let's build something <span className="text-silver">remarkable.</span>
              </h3>
            </div>
            <Magnetic strength={0.4}>
              <Link
                to="/contact"
                data-cursor-label="Write"
                className="inline-flex items-center gap-4 rounded-full border border-primary/60 bg-primary/10 px-7 py-4 font-mono text-xs uppercase tracking-[0.28em] text-primary hover:bg-primary/20"
              >
                Start a Project →
              </Link>
            </Magnetic>
          </div>
        </div>
      )}
    </div>
  );
}

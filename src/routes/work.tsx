import { createFileRoute } from "@tanstack/react-router";
import { WorkList } from "@/components/nocturne/WorkList";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — NOCTURNE" },
      {
        name: "description",
        content: "Selected case studies in realtime 3D, e-commerce, brand systems, and product design.",
      },
      { property: "og:title", content: "Work — NOCTURNE" },
      {
        property: "og:description",
        content: "Selected case studies from NOCTURNE — realtime 3D, e-commerce, and brand systems.",
      },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="pb-24 pt-32 md:pt-44">
      <div className="mx-auto max-w-[1600px] px-5 pb-16 md:px-10 md:pb-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
          Index — All Work
        </p>
        <h1 className="mt-6 font-display text-[14vw] font-semibold leading-[0.9] tracking-[-0.04em] md:text-[8vw]">
          A small body of <span className="text-silver">large</span> work.
        </h1>
        <p className="mt-8 max-w-xl text-muted-foreground">
          We take on a handful of partners each year. Below: the ones we can talk about.
        </p>
      </div>

      <WorkList />
    </div>
  );
}

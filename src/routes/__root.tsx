import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SmoothScroll } from "@/components/elementweb/SmoothScroll";
import { CustomCursor } from "@/components/elementweb/CustomCursor";
import { Nav } from "@/components/elementweb/Nav";
import { Footer } from "@/components/elementweb/Footer";
import { PageTransition } from "@/components/elementweb/PageTransition";

function NotFoundComponent() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">404 — Off-grid</p>
        <h1 className="mt-6 font-display text-7xl font-semibold tracking-tight text-silver">
          Lost in the void.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          The page you're looking for has drifted somewhere between coordinates.
        </p>
        <Link
          to="/"
          data-cursor="magnetic"
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-primary hover:bg-primary/20"
        >
          ↺ Return Home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NOCTURNE — Independent Design Studio" },
      {
        name: "description",
        content:
          "NOCTURNE is an independent design studio crafting realtime, sculptural experiences for brands that refuse to look like everyone else.",
      },
      { name: "author", content: "NOCTURNE" },
      { name: "theme-color", content: "#0B0C10" },
      { property: "og:title", content: "NOCTURNE — Independent Design Studio" },
      {
        property: "og:description",
        content: "Realtime, sculptural design and engineering for ambitious brands.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="grain bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Nav />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
      <PageTransition />
    </>
  );
}

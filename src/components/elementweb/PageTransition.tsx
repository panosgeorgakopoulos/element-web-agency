import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/**
 * Liquid wipe page transition. Plays a curtain across the viewport on
 * route change, then retracts. Pure CSS clip-path — no JS animation lib needed.
 */
export function PageTransition() {
  const loc = useLocation();
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const [key, setKey] = useState(loc.pathname);

  useEffect(() => {
    if (loc.pathname === key) return;
    setPhase("in");
    const t1 = window.setTimeout(() => {
      setKey(loc.pathname);
      setPhase("out");
    }, 600);
    const t2 = window.setTimeout(() => setPhase("idle"), 1300);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [loc.pathname, key]);

  const clip =
    phase === "in"
      ? "polygon(0 100%, 100% 100%, 100% 0, 0 0)"
      : phase === "out"
        ? "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
        : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200]"
      style={{
        clipPath: clip,
        transition: "clip-path 700ms cubic-bezier(0.76, 0, 0.24, 1)",
        background:
          "linear-gradient(180deg, oklch(0.1 0.012 250) 0%, oklch(0.16 0.05 220) 60%, oklch(0.1 0.012 250) 100%)",
      }}
    >
      <div
        className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.88 0.16 192 / 0.9) 50%, transparent 100%)",
          opacity: phase === "idle" ? 0 : 1,
          transition: "opacity 400ms",
        }}
      />
    </div>
  );
}

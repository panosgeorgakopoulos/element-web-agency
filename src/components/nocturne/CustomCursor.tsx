import { useEffect, useRef, useState } from "react";

/**
 * Magnetic, morphing custom cursor.
 * - Two layers: dot + ring
 * - Snaps to elements with [data-cursor="magnetic"]
 * - Expands and shows label for [data-cursor-label]
 * - Inverts via mix-blend-mode: difference
 * - Disabled on touch / coarse pointer
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [variant, setVariant] = useState<"default" | "hover">("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    const dot = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-cursor="magnetic"], a, button, [role="button"], [data-cursor-label]'
      );
      if (el) {
        setVariant("hover");
        const lbl = el.getAttribute("data-cursor-label");
        setLabel(lbl);
        if (el.getAttribute("data-cursor") === "magnetic") {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          target.x = cx + (e.clientX - cx) * 0.35;
          target.y = cy + (e.clientY - cy) * 0.35;
        }
      } else {
        setVariant("default");
        setLabel(null);
      }
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      dot.x += (target.x - dot.x) * 0.42;
      dot.y += (target.y - dot.y) * 0.42;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-300 ease-out"
        style={{
          width: variant === "hover" ? (label ? 88 : 56) : 32,
          height: variant === "hover" ? (label ? 88 : 56) : 32,
          border: "1px solid oklch(0.88 0.16 192 / 0.7)",
          backgroundColor:
            variant === "hover"
              ? "oklch(0.88 0.16 192 / 0.18)"
              : "oklch(0.88 0.16 192 / 0)",
          mixBlendMode: "difference",
          backdropFilter: variant === "hover" ? "blur(2px)" : undefined,
        }}
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white">
            {label}
          </span>
        )}
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] h-[6px] w-[6px] rounded-full"
        style={{
          backgroundColor: "oklch(0.88 0.16 192)",
          boxShadow: "0 0 12px oklch(0.88 0.16 192 / 0.8)",
          opacity: variant === "hover" ? 0 : 1,
          transition: "opacity 200ms ease",
        }}
      />
    </>
  );
}

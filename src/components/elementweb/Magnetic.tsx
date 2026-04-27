import { useRef, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "span";
};

export function Magnetic({ children, strength = 0.35, className, style, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
  };

  const Tag = as as "div";
  return (
    <Tag
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ display: "inline-block", transition: "transform 500ms cubic-bezier(0.16,1,0.3,1)", ...style }}
      className={className}
    >
      <div ref={ref} style={{ display: "inline-block", willChange: "transform" }}>
        {children}
      </div>
    </Tag>
  );
}

import { useEffect, useRef } from "react";

/** Pulsing green availability badge. */
export function AvailabilityBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`availability-badge inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-400 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="ping-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      Available for new projects
    </span>
  );
}

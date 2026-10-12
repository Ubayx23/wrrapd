import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Seeded PRNG (mulberry32) so server and client render the same tear.
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function tear(seed: number, depth: number) {
  const r = rng(seed);
  const top: string[] = [];
  const bottom: string[] = [];
  for (let x = 0; x <= 100; x += 2.5) top.push(`${x}% ${(r() * depth).toFixed(1)}px`);
  for (let x = 100; x >= 0; x -= 2.5) bottom.push(`${x}% calc(100% - ${(r() * depth).toFixed(1)}px)`);
  return `polygon(${top.join(",")},${bottom.join(",")})`;
}

type Props = {
  children: ReactNode;
  seed?: number;
  depth?: number;
  className?: string;
};

/** A sheet with torn top and bottom edges. The wrapper carries the shadow so the clip does not cut it off. */
export default function TornEdge({ children, seed = 11, depth = 7, className }: Props) {
  return (
    <div className={cn("[filter:drop-shadow(0_6px_10px_rgba(29,27,38,.12))]", className)}>
      <div style={{ clipPath: tear(seed, depth) }}>{children}</div>
    </div>
  );
}

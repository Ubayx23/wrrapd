import type { ReactNode } from "react";
import { rng } from "@/lib/random";
import { cn } from "@/lib/utils";

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
    <div className={cn("[filter:drop-shadow(0_6px_10px_rgba(30,42,63,.12))]", className)}>
      <div style={{ clipPath: tear(seed, depth) }}>{children}</div>
    </div>
  );
}

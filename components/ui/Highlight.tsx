import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type HighlightColor = "blue" | "purple" | "orange" | "green" | "pink";

type Props = {
  children: ReactNode;
  color?: HighlightColor;
  /** load: swipes in once. hover: swipes in when a parent .group is hovered. static: always on. */
  mode?: "load" | "hover" | "static";
  className?: string;
};

export default function Highlight({ children, color = "orange", mode = "static", className }: Props) {
  return (
    <span
      className={cn("hl", mode === "load" && "hl-draw", mode === "hover" && "hl-hover", className)}
      style={{ "--hl": `var(--hl-${color})` } as CSSProperties}
    >
      {children}
    </span>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  heading: string;
  id: string;
  intro?: ReactNode;
  /**
   * split: Trainza style, eyebrow on the left, heading on the right, over a hairline.
   * stacked: eyebrow over heading, for a header that sits in a side column.
   * center: centered heading and intro, for the closing band.
   */
  layout?: "split" | "stacked" | "center";
  className?: string;
};

const EYEBROW = "text-[14px] font-medium text-lavender";
const HEADING = "font-display text-[clamp(32px,4.4vw,48px)] font-normal leading-[1.05] tracking-[-0.01em]";

/** Every section header on the page. Same eyebrow, heading size and gaps everywhere: 12px under the eyebrow, 24px before the intro. */
export default function SectionHeader({ eyebrow, heading, id, intro, layout = "split", className }: Props) {
  const introEl = intro ? (
    <p className={cn("body-text mt-6", layout === "center" ? "mx-auto max-w-[34em]" : "max-w-[34em]")}>{intro}</p>
  ) : null;

  if (layout === "split") {
    return (
      <div className={className}>
        <div className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8 md:pb-6">
          {eyebrow && <p className={EYEBROW}>{eyebrow}</p>}
          <h2 id={id} className={cn(HEADING, "sm:text-right")}>
            {heading}
          </h2>
        </div>
        {introEl}
      </div>
    );
  }

  return (
    <div className={cn(layout === "center" && "text-center", className)}>
      {eyebrow && <p className={cn(EYEBROW, "mb-3")}>{eyebrow}</p>}
      <h2 id={id} className={HEADING}>
        {heading}
      </h2>
      {introEl}
    </div>
  );
}

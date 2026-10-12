import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  heading: string;
  id: string;
  className?: string;
};

/** Trainza style header: small lavender eyebrow on the left, serif heading on the right, hairline underneath. */
export default function SectionHeader({ eyebrow, heading, id, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8 md:pb-6",
        className
      )}
    >
      <p className="text-[14px] font-medium text-lavender">{eyebrow}</p>
      <h2
        id={id}
        className="font-display text-[clamp(32px,4.4vw,48px)] font-normal leading-[1.05] tracking-[-0.01em] sm:text-right"
      >
        {heading}
      </h2>
    </div>
  );
}

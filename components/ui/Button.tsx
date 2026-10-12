import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "group/button inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-ink px-5 text-[15px] font-medium text-surface no-underline transition-[transform,background-color] duration-150 hover:-translate-y-px hover:bg-ink/90 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; arrow?: boolean };
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; arrow?: boolean };

function Arrow() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden="true"
      className="transition-transform duration-150 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5 motion-reduce:transition-none"
    >
      <path
        d="M3 9 9 3M4.5 3H9v4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Ink pill with a small up-right arrow. Renders an anchor when given an href. */
export default function Button(props: ButtonProps | LinkProps) {
  if (typeof props.href === "string") {
    const { className, children, arrow = true, ...rest } = props as LinkProps;
    return (
      <a className={cn(base, className)} {...rest}>
        {children}
        {arrow && <Arrow />}
      </a>
    );
  }
  const { className, children, arrow = true, type = "button", ...rest } = props as ButtonProps;
  return (
    <button type={type} className={cn(base, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

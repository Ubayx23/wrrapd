import { cn } from "@/lib/utils";

/**
 * The knot mark from public/images/landing/logo.svg, without its background card,
 * so it sits on whatever surface it is placed on. Decorative: give the parent an accessible name.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="36 54 248 126" aria-hidden="true" focusable="false" className={cn("h-[26px] w-auto", className)}>
      <path
        d="M44 120 C44 76 97 63 127 94 C158 126 131 170 94 157 C60 146 68 98 108 88 C148 78 168 119 196 120 C218 121 238 120 276 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

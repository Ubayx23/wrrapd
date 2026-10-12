import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-[6px] bg-ink px-5 text-[15px] font-semibold text-paper-hi no-underline transition-transform duration-150 hover:-translate-y-px active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function Button(props: ButtonProps | LinkProps) {
  if (typeof props.href === "string") {
    const { className, ...rest } = props as LinkProps;
    return <a className={cn(base, className)} {...rest} />;
  }
  const { className, type = "button", ...rest } = props as ButtonProps;
  return <button type={type} className={cn(base, className)} {...rest} />;
}

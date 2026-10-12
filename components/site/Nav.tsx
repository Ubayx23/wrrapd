"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { nav } from "@/content/site";

const pill = "rounded-full border border-line bg-surface";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const focusables = () =>
      Array.from(sheet?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header className="mx-auto flex w-full max-w-[1100px] items-center px-5 pt-5 md:pt-7">
      <a href="#top" className={`${pill} inline-flex min-h-[44px] items-center px-4 font-display text-[22px] leading-none no-underline`}>
        {nav.logo}
      </a>

      {/* desktop: pills joined by hairlines */}
      <span aria-hidden="true" className="mx-3 hidden h-px flex-1 bg-line md:block" />
      <nav aria-label={nav.menuLabel} className={`${pill} hidden items-center px-2 md:flex`}>
        <ul className="flex items-center">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-[44px] items-center rounded-full px-4 text-[15px] text-ink-2 no-underline transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span aria-hidden="true" className="mx-3 hidden h-px flex-1 bg-line md:block" />
      <Button href={nav.cta.href} className="hidden md:inline-flex">
        {nav.cta.label}
      </Button>

      {/* mobile */}
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className={`${pill} ml-auto inline-flex min-h-[44px] items-center px-5 text-[15px] text-ink md:hidden`}
      >
        {nav.menuOpen}
      </button>

      {open && (
        <div
          ref={sheetRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={nav.menuLabel}
          className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg px-5 pb-8 pt-5 shadow-[0_12px_40px_rgba(29,27,38,0.08)] md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className={`${pill} inline-flex min-h-[44px] items-center px-4 font-display text-[22px] leading-none`}>
              {nav.logo}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={`${pill} inline-flex min-h-[44px] items-center px-5 text-[15px] text-ink`}
            >
              {nav.menuClose}
            </button>
          </div>
          <ul className="mt-6 flex flex-col">
            {nav.links.map((link) => (
              <li key={link.href} className="border-b border-line">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[56px] items-center font-display text-[30px] leading-none no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href={nav.cta.href} onClick={() => setOpen(false)} className="mt-6 w-full">
            {nav.cta.label}
          </Button>
        </div>
      )}
      {open && (
        <div aria-hidden="true" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-ink/20 md:hidden" />
      )}
    </header>
  );
}

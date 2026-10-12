"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";

const pill = "rounded-full border border-line bg-surface";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Pin the bar once the hero has scrolled out of view.
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
      rootMargin: "-88px 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const focusables = () => Array.from(sheet?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
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
    // The outer box keeps the bar's height in the flow, so pinning it does not shift the page.
    <div className="h-[76px] md:h-[88px]">
      <header
        className={
          stuck
            ? "fixed inset-x-0 top-0 z-40 animate-nav-in border-b border-line bg-bg/85 backdrop-blur-md motion-reduce:animate-none"
            : "relative z-40"
        }
      >
        {/* desktop: logo pill, then links centered on the page, hairlines filling both sides */}
        <div className="mx-auto flex h-[76px] w-full max-w-[1100px] items-center px-5 md:grid md:h-[88px] md:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center">
            <a
              href="#top"
              className={`${pill} inline-flex min-h-[44px] items-center px-4 font-display text-[22px] leading-none no-underline transition-colors duration-150 hover:border-ink-3`}
            >
              {nav.logo}
            </a>
            <span aria-hidden="true" className="mx-3 hidden h-px flex-1 bg-line md:block" />
          </div>
          <nav aria-label={nav.menuLabel} className={`${pill} hidden items-center px-2 md:flex`}>
            <ul className="flex items-center">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center rounded-full px-4 text-[15px] text-ink-2 no-underline transition-colors duration-150 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <span aria-hidden="true" className="ml-3 hidden h-px bg-line md:block" />

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
                <span
                  className={`${pill} inline-flex min-h-[44px] items-center px-4 font-display text-[22px] leading-none`}
                >
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
            </div>
          )}
          {open && (
            <div aria-hidden="true" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-ink/20 md:hidden" />
          )}
        </div>
      </header>
    </div>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { knots, type Knot } from "@/content/site";

const STORAGE_KEY = "wrrapd.knot";

function KnotCard({ knot }: { knot: Knot }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(knot.ask);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const label = "text-[13px] font-medium text-ink-3";
  return (
    <div>
      <h3 className="font-display text-[clamp(30px,3.4vw,40px)] font-normal leading-[1.05]">{knot.name}</h3>
      {knot.picture && (
        <p className="mt-3 font-display text-[22px] italic leading-[1.3] text-ink-2">{knot.picture}</p>
      )}

      <p className={`${label} mt-7`}>{knots.labels.happening}</p>
      <p className="mt-2 text-[16.5px] leading-[1.65] text-ink-2">{knot.happening}</p>

      <p className={`${label} mt-7`}>{knots.labels.ask}</p>
      <p className="mt-2 text-balance font-display text-[clamp(24px,2.6vw,30px)] italic leading-[1.2] text-ink">
        {knot.ask}
      </p>

      <p className={`${label} mt-7`}>{knots.labels.doNow}</p>
      <p className="mt-2 text-[16.5px] leading-[1.65] text-ink-2">{knot.doNow}</p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line pt-5">
        <p className="max-w-[26em] text-[14px] leading-[1.55] text-ink-3">{knots.footer}</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-[44px] items-center text-[14px] font-medium text-ink underline decoration-line decoration-[1.5px] underline-offset-[5px] transition-colors duration-150 hover:decoration-ink"
          >
            {knots.copy}
          </button>
          <span aria-live="polite" className="text-[13.5px] text-ink-3">
            {copied ? knots.copied : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Knots() {
  const [selected, setSelected] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const userPicked = useRef(false);

  // Preselect the knot from the last visit.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && knots.items.some((k) => k.slug === saved)) setSelected(saved);
    } catch {}
  }, []);

  const pick = (slug: string) => {
    const next = selected === slug ? null : slug;
    userPicked.current = true;
    setSelected(next);
    try {
      if (next) localStorage.setItem(STORAGE_KEY, next);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  // Mobile: once the inline card has opened, make sure it is on screen.
  const revealInline = (index: number) => {
    if (!userPicked.current) return;
    const item = itemRefs.current[index];
    if (!item) return;
    const rect = item.getBoundingClientRect();
    const overflow = rect.bottom - window.innerHeight + 16;
    if (overflow > 0) {
      window.scrollBy({ top: Math.min(overflow, rect.top - 96), behavior: reduce ? "auto" : "smooth" });
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = knots.items.length - 1;
    const target =
      e.key === "ArrowDown"
        ? Math.min(index + 1, last)
        : e.key === "ArrowUp"
          ? Math.max(index - 1, 0)
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (target === null) return;
    e.preventDefault();
    rowRefs.current[target]?.focus();
  };

  const current = knots.items.find((k) => k.slug === selected) ?? null;
  const fade = {
    initial: { opacity: 0, y: reduce ? 0 : 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduce ? 0 : -8 },
    transition: { duration: reduce ? 0 : 0.25, ease: "easeOut" as const },
  };
  const card = "rounded-2xl border border-line bg-surface";

  return (
    <section id="knots" aria-labelledby="knots-title" className="scroll-mt-24 pt-[72px] md:pt-[120px]">
      <Container>
        <Reveal>
          <SectionHeader id="knots-title" eyebrow={knots.eyebrow} heading={knots.heading} />
          <p className="mt-6 max-w-[34em] text-[17px] leading-[1.6] text-ink-2">{knots.intro}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-14">
          <ul className="flex flex-col">
            {knots.items.map((knot, i) => {
              const isOn = selected === knot.slug;
              const dim = selected !== null && !isOn;
              return (
                <li
                  key={knot.slug}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="border-b border-line last:border-b-0"
                >
                  <button
                    ref={(el) => {
                      rowRefs.current[i] = el;
                    }}
                    type="button"
                    aria-pressed={isOn}
                    onClick={() => pick(knot.slug)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={`group relative block w-full py-6 pl-5 pr-2 text-left transition-colors duration-150 md:py-7 ${
                      dim ? "text-ink-3 hover:text-ink-2" : "text-ink"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-6 left-0 top-6 w-[2px] rounded-full bg-lavender transition-opacity duration-200 md:bottom-7 md:top-7 ${
                        isOn ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span className="flex items-baseline gap-2.5 text-[13px] font-medium">
                      <span className="font-display text-[15px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-lavender">{knot.name}</span>
                    </span>
                    <span className="mt-2 block font-display text-[clamp(26px,3vw,36px)] italic leading-[1.12]">
                      &ldquo;{knot.soundsLike}&rdquo;
                    </span>
                  </button>

                  {/* mobile: the card opens right under its row */}
                  <div className="md:hidden">
                    <AnimatePresence initial={false}>
                      {isOn && (
                        <motion.div
                          key={knot.slug}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
                          onAnimationComplete={(def) => {
                            if (typeof def === "object" && "height" in def && def.height === "auto") revealInline(i);
                          }}
                          className="overflow-hidden"
                        >
                          <div aria-live="polite" className={`${card} mb-6 p-6`}>
                            <KnotCard knot={knot} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* desktop: one sticky card beside the list */}
          <div className="hidden md:block">
            <div aria-live="polite" className={`${card} sticky top-28 min-h-[420px] p-8 lg:p-10`}>
              <AnimatePresence mode="wait" initial={false}>
                {current ? (
                  <motion.div key={current.slug} {...fade}>
                    <KnotCard knot={current} />
                  </motion.div>
                ) : (
                  <motion.p
                    key="prompt"
                    {...fade}
                    className="flex min-h-[340px] items-center justify-center text-center font-display text-[26px] italic text-ink-3"
                  >
                    {knots.prompt}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* mobile: the prompt sits under the list until something is picked */}
        {!current && <p className="mt-6 font-display text-[22px] italic text-ink-3 md:hidden">{knots.prompt}</p>}
      </Container>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { today } from "@/content/site";

type Pick = { date: string; text: string; source: string };

function dayOfYear(d: Date) {
  return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(d.getFullYear(), 0, 0)) / 86400000);
}

/** Same thought for everyone on the same local day. Changes at midnight. */
function pickFor(d: Date): Pick {
  const thought = today.thoughts[dayOfYear(d) % today.thoughts.length];
  const date = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  return { date, ...thought };
}

export default function Today() {
  // Client only: the date depends on the reader's clock, so the server renders a placeholder.
  const [pick, setPick] = useState<Pick | null>(null);

  useEffect(() => {
    let timer: number;
    const update = () => {
      const now = new Date();
      setPick(pickFor(now));
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      timer = window.setTimeout(update, midnight.getTime() - now.getTime() + 1000);
    };
    update();
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      id="today"
      aria-labelledby="today-title"
      className="mt-[72px] scroll-mt-24 border-y border-line py-[96px] md:mt-[120px] md:py-[150px]"
    >
      <Container className="flex flex-col items-center text-center">
        <h2 id="today-title" className="text-[14px] font-medium text-lavender">
          {today.eyebrow}
        </h2>

        <div className="mt-5 flex min-h-[180px] w-full flex-col items-center" aria-live="polite">
          {pick ? (
            <div className="flex animate-fade-in flex-col items-center motion-reduce:animate-none">
              <p className="text-[15px] tracking-[0.06em] text-ink-3 [font-variant-caps:all-small-caps]">{pick.date}</p>
              <blockquote className="mt-6">
                <p className="max-w-[22em] text-balance font-display text-[clamp(28px,4.2vw,52px)] leading-[1.12] tracking-[-0.01em]">
                  &ldquo;{pick.text}&rdquo;
                </p>
                <footer className="mt-5 text-[15px] text-ink-3">{pick.source}</footer>
              </blockquote>
            </div>
          ) : (
            <div aria-hidden="true" className="flex w-full flex-col items-center gap-4 pt-10">
              <span className="h-3 w-40 rounded-full bg-line/70" />
              <span className="mt-4 h-8 w-full max-w-[520px] rounded-full bg-line/60" />
              <span className="h-8 w-full max-w-[380px] rounded-full bg-line/60" />
            </div>
          )}
        </div>

        <p className="mt-10 text-[16px] text-ink-2">{today.instruction}</p>
      </Container>
    </section>
  );
}

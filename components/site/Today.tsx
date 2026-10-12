"use client";

import { useEffect, useState, type ReactNode } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
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

/**
 * The night sky band. The background is rendered on the server (it needs fs to check the file)
 * and passed in, so this component only owns the date and the thought.
 */
export default function Today({ background }: { background: ReactNode }) {
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
      // The bottom padding keeps the text above the hills, which fill roughly the lower 28% of the band.
      className="relative isolate mt-[72px] flex min-h-[480px] scroll-mt-24 flex-col justify-center pb-[190px] pt-16 md:mt-[120px] md:min-h-[max(560px,32vw)] md:pb-[200px] md:pt-20"
    >
      <div className="absolute inset-0 -z-10">{background}</div>

      <Container className="text-center text-bg">
        <Reveal className="flex flex-col items-center">
          <h2 id="today-title" className="text-[14px] font-medium text-lavender-light">
            {today.eyebrow}
          </h2>

          <div className="mt-4 flex w-full flex-col items-center" aria-live="polite">
            {pick ? (
              <div className="flex animate-fade-in flex-col items-center motion-reduce:animate-none">
                <p className="text-[15px] tracking-[0.06em] text-bg/70 [font-variant-caps:all-small-caps]">
                  {pick.date}
                </p>
                <blockquote className="mt-5">
                  <p className="max-w-[22em] text-balance font-display text-[clamp(28px,4.2vw,52px)] leading-[1.12] tracking-[-0.01em]">
                    &ldquo;{pick.text}&rdquo;
                  </p>
                  <footer className="mt-5 text-[15px] text-bg/70">{pick.source}</footer>
                </blockquote>
              </div>
            ) : (
              <div aria-hidden="true" className="flex w-full flex-col items-center gap-4 pt-3">
                <span className="h-3 w-40 rounded-full bg-bg/15" />
                <span className="mt-4 h-8 w-full max-w-[520px] rounded-full bg-bg/10" />
                <span className="h-8 w-full max-w-[380px] rounded-full bg-bg/10" />
              </div>
            )}
          </div>

          <p className="mt-8 text-[16px] text-bg">{today.instruction}</p>
        </Reveal>
      </Container>
    </section>
  );
}

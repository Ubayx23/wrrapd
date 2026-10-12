"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { practice } from "@/content/site";

export default function PaperMethod() {
  const cardRef = useRef<HTMLOListElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const selectCard = () => {
    const card = cardRef.current;
    const selection = window.getSelection();
    if (!card || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(card);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(practice.lines.map((line) => `${line}:`).join("\n"));
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      selectCard();
    }
  };

  return (
    <section aria-labelledby="practice-title" className="pt-[72px] md:pt-[120px]">
      <Container>
        <Reveal>
          <SectionHeader id="practice-title" eyebrow={practice.eyebrow} heading={practice.heading} />
          <div className="mt-10 grid grid-cols-1 items-center gap-12 md:mt-14 md:grid-cols-2 md:gap-16">
            <div className="-rotate-1 rounded-xl border border-line bg-surface px-6 pb-4 pt-2 sm:px-8">
              <ol ref={cardRef}>
                {practice.lines.map((line) => (
                  <li
                    key={line}
                    className="flex min-h-[64px] items-end border-b border-line pb-2 font-display text-[clamp(21px,2.4vw,25px)] leading-none last:border-b-0"
                  >
                    {line}
                  </li>
                ))}
              </ol>
            </div>

            <div className="min-w-0">
              <p className="max-w-[30em] text-[17px] leading-[1.6] text-ink-2">{practice.body}</p>
              <p className="mt-5 text-[17px] font-medium leading-[1.6] text-ink">{practice.note}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button onClick={copy}>{practice.copy}</Button>
                <span aria-live="polite" className="text-[14px] text-ink-3">
                  {copied ? practice.copied : ""}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

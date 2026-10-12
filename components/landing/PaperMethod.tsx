"use client";

import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import TornEdge from "@/components/ui/TornEdge";

const LINES = ["what happened:", "what I thought:", "what I felt:", "what I did:", "what the observer notices:"];

export default function PaperMethod() {
  const listRef = useRef<HTMLUListElement>(null);
  const [message, setMessage] = useState("");

  const selectTemplate = () => {
    const list = listRef.current;
    const selection = window.getSelection();
    if (!list || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(list);
    selection.removeAllRanges();
    selection.addRange(range);
    setMessage("selected. copy it from here.");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINES.join("\n"));
      setMessage("copied. go write.");
      window.setTimeout(() => setMessage(""), 2600);
    } catch {
      selectTemplate();
    }
  };

  return (
    <section aria-labelledby="method-title" className="pt-24 md:pt-32">
      <h2
        id="method-title"
        className="font-display text-[clamp(40px,5.6vw,64px)] font-normal leading-none tracking-[-0.01em]"
      >
        The paper method
      </h2>

      <div className="mt-10 grid grid-cols-1 items-start gap-10 md:mt-14 md:grid-cols-2 md:gap-16">
        <TornEdge seed={11} className="-rotate-1">
          <div
            className="bg-paper-hi px-7 pb-[30px] pt-[34px]"
            style={{
              backgroundImage: "linear-gradient(transparent 31px, rgba(80,110,160,.22) 32px)",
              backgroundSize: "100% 32px",
            }}
          >
            <ul ref={listRef} className="font-hand text-[25px] leading-[32px]">
              {LINES.map((line) => (
                <li key={line} className="min-h-[64px] font-bold">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </TornEdge>

        <div className="min-w-0 md:pt-4">
          <p className="max-w-[32em] text-[17px] leading-[1.6] text-ink-2">
            When something hits you during the day, write these five lines. The last one matters most. It is you,
            looking at yourself from the outside.
          </p>
          <p className="mt-5 text-[17px] font-medium leading-[1.6] text-ink">
            Free. No ads. No AI. Your journal stays yours.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button onClick={copy}>Copy the template</Button>
            <span aria-live="polite" className="min-h-[1em] font-hand text-[22px] leading-none text-ink-2">
              {message}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

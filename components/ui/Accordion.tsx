"use client";

import { useId, useState } from "react";

type Item = { question: string; answer: string };

/** One open at a time. Height animates with a grid row transition so no measuring is needed. */
export default function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <li key={item.question} className="rounded-2xl border border-line bg-surface">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-[56px] w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-[16px] font-medium text-ink"
              >
                {item.question}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  aria-hidden="true"
                  className={`shrink-0 text-ink-2 transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`}
                >
                  <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[15.5px] leading-[1.6] text-ink-2">{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

/** A handwritten-looking sign off: italic serif name with an underline that draws in once. */
export default function Signature({ name }: { name: string }) {
  const reduce = useReducedMotion();
  return (
    <p className="inline-block -rotate-2 font-display text-[clamp(48px,6vw,64px)] italic leading-none">
      {name}
      <svg viewBox="0 0 160 16" width="132" height="14" aria-hidden="true" className="mt-1 block overflow-visible">
        <motion.path
          d="M3 10c18-4 38-7 62-6 20 1 34 4 52 3 14-1 26-4 40-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.3, 0.7, 0.2, 1], delay: 0.2 }}
        />
      </svg>
    </p>
  );
}

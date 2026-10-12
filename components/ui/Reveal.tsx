"use client";

import { motion, useAnimationControls, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fades its children up 12px the first time they scroll into view.
 * Server HTML is fully visible; only content below the fold is hidden once JS runs,
 * so nothing disappears if JS fails. Off under prefers-reduced-motion.
 */
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const armed = useRef(false);
  const controls = useAnimationControls();
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (reduce || !el) return;
    if (el.getBoundingClientRect().top > window.innerHeight) {
      controls.set({ opacity: 0, y: 12 });
      armed.current = true;
    }
  }, [controls, reduce]);

  useEffect(() => {
    if (inView && armed.current) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } });
    }
  }, [inView, controls]);

  return (
    <motion.div ref={ref} initial={false} animate={controls} className={className}>
      {children}
    </motion.div>
  );
}

"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

/** Moves its children down as the page scrolls, so they travel at (1 - lag) of the scroll speed. */
export default function Parallax({
  children,
  className,
  lag = 0.15,
}: {
  children: ReactNode;
  className?: string;
  lag?: number;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => (reduce ? 0 : v * lag));
  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

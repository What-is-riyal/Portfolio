"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

type ProgressBarProps = {
  color?: string;
};

export function ProgressBar({ color = "var(--accent)" }: ProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[1000] h-[3px] w-full origin-left"
      style={{ scaleX, backgroundColor: color }}
      aria-hidden="true"
    />
  );
}

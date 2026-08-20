import { useReducedMotion, type Transition, type Variants } from "framer-motion";

export const spring: Transition = { type: "spring", stiffness: 260, damping: 26, mass: 0.8 };
export const smooth: Transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

/**
 * Returns motion variants that collapse to opacity-only (or nothing)
 * when the user prefers reduced motion.
 */
export function useAppMotion() {
  const reduced = useReducedMotion();

  const screen: Variants = {
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.985 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduced ? { duration: 0.2 } : { ...smooth, staggerChildren: 0.07 },
    },
    exit: reduced
      ? { opacity: 0, transition: { duration: 0.15 } }
      : { opacity: 0, y: -12, scale: 0.99, transition: { duration: 0.28, ease: "easeOut" } },
  };

  const item: Variants = {
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: reduced ? { duration: 0.2 } : smooth },
  };

  const list: Variants = {
    initial: {},
    animate: { transition: { staggerChildren: reduced ? 0 : 0.06, delayChildren: 0.05 } },
  };

  return { reduced, screen, item, list };
}

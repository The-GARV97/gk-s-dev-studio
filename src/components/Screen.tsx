import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { useAppMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Wraps each route so it feels like a separate app screen. */
export function Screen({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const { screen } = useAppMotion();

  return (
    <motion.section
      id={id}
      variants={screen}
      initial="initial"
      animate="animate"
      className={cn(
        "mx-auto w-full max-w-6xl px-4 pb-40 pt-24 sm:px-6 sm:pt-28 lg:px-8",
        className,
      )}
    >
      {children}
    </motion.section>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { item } = useAppMotion();
  return (
    <motion.div variants={item} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

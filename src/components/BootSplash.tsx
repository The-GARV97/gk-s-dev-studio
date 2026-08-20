import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { profile } from "@/data/portfolio";

/** Short, refined loading experience shown once per session. */
export function BootSplash() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("gk-portfolio-booted")) return;
    setVisible(true);
    const id = window.setTimeout(() => {
      window.sessionStorage.setItem("gk-portfolio-booted", "1");
      setVisible(false);
    }, 1250);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="boot"
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduced ? 0.1 : 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="neu flex size-20 items-center justify-center rounded-3xl"
            >
              <span className="font-mono text-2xl font-semibold text-primary">GK</span>
            </motion.div>
            <div className="space-y-3 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {profile.role}
              </p>
              <div className="neu-inset mx-auto h-2 w-44 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: "8%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: reduced ? 0.2 : 1.1, ease: "easeInOut" }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

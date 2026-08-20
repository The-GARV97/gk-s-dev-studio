import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { NeuButton } from "@/components/neu/Neu";

type Theme = "light" | "dark";
const STORAGE_KEY = "gk-portfolio-theme";

function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial: Theme =
      stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    apply(initial);
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, next);
      apply(next);
      return next;
    });
  }, []);

  const isDark = theme === "dark";

  return (
    <NeuButton
      type="button"
      variant="soft"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className="rounded-full"
    >
      <motion.span
        key={mounted ? theme : "init"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="size-5 text-primary" aria-hidden />
        ) : (
          <Sun className="size-5 text-primary" aria-hidden />
        )}
      </motion.span>
    </NeuButton>
  );
}

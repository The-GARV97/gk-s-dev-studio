import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Home, Layers, Mail, TerminalSquare, User, type LucideIcon } from "lucide-react";

import { navItems } from "@/data/portfolio";
import { useAppMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  home: Home,
  user: User,
  layers: Layers,
  terminal: TerminalSquare,
  mail: Mail,
};

export function Dock() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { reduced } = useAppMotion();

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-4 sm:pb-6"
    >
      <motion.ul
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.15 }}
        className="neu pointer-events-auto flex w-full max-w-md items-center justify-between gap-1 rounded-3xl p-2 backdrop-blur-xl sm:w-auto sm:gap-2 sm:p-2.5"
      >
        {navItems.map((item) => {
          const Icon = icons[item.icon] ?? Home;
          const active = pathname === item.to;
          return (
            <li key={item.to} className="flex-1 sm:flex-none">
              <Link
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition-colors sm:min-w-[76px] sm:px-3",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="dock-active"
                    transition={
                      reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 30 }
                    }
                    className="neu-inset absolute inset-0 rounded-2xl"
                    aria-hidden
                  />
                ) : null}
                <motion.span
                  whileHover={reduced ? undefined : { y: -3, scale: 1.06 }}
                  whileTap={reduced ? undefined : { scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                  className="relative z-10 flex items-center justify-center"
                >
                  <Icon className="size-5" aria-hidden />
                </motion.span>
                <span className="relative z-10 tracking-tight">{item.label}</span>
                <motion.span
                  className={cn(
                    "relative z-10 h-1 w-1 rounded-full bg-primary transition-opacity",
                    active ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </motion.ul>
    </nav>
  );
}

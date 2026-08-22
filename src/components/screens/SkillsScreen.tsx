import { motion } from "framer-motion";
import {
  Compass,
  Database,
  LayoutDashboard,
  Rocket,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { NeuChip, NeuSurface, SectionHeading } from "@/components/neu/Neu";
import { Reveal, Screen } from "@/components/Screen";
import { skillGroups, terminalLines } from "@/data/portfolio";
import { useAppMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  layout: LayoutDashboard,
  server: Server,
  database: Database,
  wrench: Wrench,
  compass: Compass,
  rocket: Rocket,
};

function Terminal() {
  const { reduced } = useAppMotion();
  const [visible, setVisible] = useState(reduced ? terminalLines.length : 0);

  useEffect(() => {
    if (reduced) {
      setVisible(terminalLines.length);
      return;
    }
    setVisible(0);
    const id = window.setInterval(() => {
      setVisible((v) => {
        if (v >= terminalLines.length) {
          window.clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, 420);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <NeuSurface padded="none" className="overflow-hidden rounded-[2rem] p-3">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-primary/60" />
          <span className="size-2.5 rounded-full bg-signal/80" />
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">zsh — portfolio</span>
      </div>
      <div
        className="neu-inset min-h-[260px] rounded-[1.5rem] bg-terminal p-5 font-mono text-[12.5px] leading-7 text-terminal-foreground"
        role="log"
        aria-live="polite"
      >
        {terminalLines.slice(0, visible).map((line, i) => (
          <motion.p
            key={i}
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="whitespace-pre-wrap break-words"
          >
            {"prompt" in line ? (
              <>
                <span className="text-signal">{line.prompt}</span>
                <span className="text-muted-foreground"> ~ </span>
                <span className="text-primary">$ </span>
                <span>{line.cmd}</span>
              </>
            ) : (
              <span className="text-muted-foreground">{line.out}</span>
            )}
          </motion.p>
        ))}
        {visible < terminalLines.length ? (
          <motion.span
            className="inline-block h-4 w-2 translate-y-0.5 bg-signal"
            animate={reduced ? undefined : { opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            aria-hidden
          />
        ) : null}
      </div>
    </NeuSurface>
  );
}

export function SkillsScreen() {
  const { reduced } = useAppMotion();
  const [activeGroup, setActiveGroup] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === activeGroup) ?? skillGroups[0];

  return (
    <Screen>
      <Reveal>
        <SectionHeading
          eyebrow="Skills"
          title="Capabilities across the whole stack."
          description="Grouped by where they live in a product, not ranked by an arbitrary percentage."
        />
      </Reveal>

      <Reveal className="mt-9">
        <NeuSurface padded="sm" className="rounded-3xl">
          <div
            role="tablist"
            aria-label="Skill categories"
            className="flex gap-1.5 overflow-x-auto pb-1"
          >
            {skillGroups.map((item) => {
              const Icon = icons[item.icon] ?? LayoutDashboard;
              const active = item.id === activeGroup;
              return (
                <button
                  key={item.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls={`skills-panel-${item.id}`}
                  id={`skills-tab-${item.id}`}
                  onClick={() => setActiveGroup(item.id)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="skills-active"
                      transition={
                        reduced ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 28 }
                      }
                      className="neu-inset absolute inset-0 rounded-2xl"
                      aria-hidden
                    />
                  ) : null}
                  <Icon className="relative z-10 size-4" aria-hidden />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>
        </NeuSurface>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <NeuSurface
            padded="lg"
            id={`skills-panel-${group.id}`}
            role="tabpanel"
            aria-labelledby={`skills-tab-${group.id}`}
            className="h-full"
          >
            <motion.div
              key={group.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-xl font-semibold tracking-tight">{group.label}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{group.summary}</p>

              <ul className="mt-6 space-y-2.5">
                {group.items.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduced ? 0 : index * 0.06, duration: 0.35 }}
                  >
                    <div className="neu-inset flex items-center justify-between gap-4 rounded-2xl px-4 py-3">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {item.note}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </NeuSurface>
        </Reveal>

        <Reveal>
          <div className="flex h-full flex-col gap-4">
            <Terminal />
            <NeuSurface padded="sm" className="rounded-3xl">
              <div className="flex flex-wrap gap-2">
                {skillGroups.map((item) => (
                  <NeuChip key={item.id}>{item.label.toLowerCase()}</NeuChip>
                ))}
              </div>
            </NeuSurface>
          </div>
        </Reveal>
      </div>
    </Screen>
  );
}

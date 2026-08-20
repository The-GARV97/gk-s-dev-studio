import { motion } from "framer-motion";
import { Code2, Compass, Puzzle, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { NeuChip, NeuSurface, SectionHeading } from "@/components/neu/Neu";
import { Reveal, Screen } from "@/components/Screen";
import { about } from "@/data/portfolio";
import { useAppMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = { code: Code2, compass: Compass, puzzle: Puzzle };

export function AboutScreen() {
  const { reduced } = useAppMotion();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Screen>
      <Reveal>
        <SectionHeading
          eyebrow="About"
          title="Developer, product thinker, problem solver."
          description={about.intro}
        />
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {about.identities.map((identity) => {
          const Icon = icons[identity.icon] ?? Code2;
          return (
            <Reveal key={identity.title}>
              <NeuSurface
                variant="interactive"
                whileHover={reduced ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="h-full"
                tabIndex={0}
              >
                <span className="neu-inset flex size-11 items-center justify-center rounded-2xl">
                  <Icon className="size-5 text-primary" aria-hidden />
                </span>
                <h2 className="mt-5 text-lg font-semibold tracking-tight">{identity.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {identity.body}
                </p>
              </NeuSurface>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">How I work</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          A loop, not a line. Every step feeds the next one and the whole thing repeats.
        </p>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
        <Reveal>
          <NeuSurface padded="sm" className="rounded-3xl">
            <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {about.process.map((step, index) => {
                const active = index === activeStep;
                return (
                  <li key={step.step} className="shrink-0 lg:w-full">
                    <button
                      type="button"
                      onClick={() => setActiveStep(index)}
                      aria-pressed={active}
                      className={cn(
                        "relative flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors",
                        active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {active ? (
                        <motion.span
                          layoutId="process-active"
                          transition={
                            reduced
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 360, damping: 28 }
                          }
                          className="neu-inset absolute inset-0 rounded-2xl"
                          aria-hidden
                        />
                      ) : null}
                      <span className="relative z-10 font-mono text-xs">{step.step}</span>
                      <span className="relative z-10">{step.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </NeuSurface>
        </Reveal>

        <Reveal>
          <NeuSurface variant="inset" padded="lg" className="h-full">
            <motion.div
              key={activeStep}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Step {about.process[activeStep].step}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                {about.process[activeStep].title}
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                {about.process[activeStep].body}
              </p>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-2">
              {about.principles.map((principle) => (
                <NeuChip key={principle} mono={false}>
                  {principle}
                </NeuChip>
              ))}
            </div>
          </NeuSurface>
        </Reveal>
      </div>
    </Screen>
  );
}

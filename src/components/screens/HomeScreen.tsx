import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Braces, Cloud, Database, GitBranch, MessageSquare, Zap } from "lucide-react";

import { NeuButton, NeuChip, NeuSurface } from "@/components/neu/Neu";
import { Reveal, Screen } from "@/components/Screen";
import { heroSignals, profile } from "@/data/portfolio";
import { useAppMotion } from "@/lib/motion";

const codeLines = [
  [
    { text: "const", cls: "text-primary" },
    { text: " engineer", cls: "text-foreground" },
    { text: " = ", cls: "text-muted-foreground" },
    { text: "{", cls: "text-accent" },
  ],
  [
    { text: "  name:", cls: "text-muted-foreground" },
    { text: ' "Gaurav Khetwal"', cls: "text-accent" },
    { text: ",", cls: "text-muted-foreground" },
  ],
  [
    { text: "  stack:", cls: "text-muted-foreground" },
    { text: " [", cls: "text-accent" },
    { text: '"ts"', cls: "text-primary" },
    { text: ", ", cls: "text-muted-foreground" },
    { text: '"react"', cls: "text-primary" },
    { text: ", ", cls: "text-muted-foreground" },
    { text: '"node"', cls: "text-primary" },
    { text: "],", cls: "text-accent" },
  ],
  [
    { text: "  solve:", cls: "text-muted-foreground" },
    { text: " (problem) ", cls: "text-foreground" },
    { text: "=>", cls: "text-primary" },
    { text: " clarity", cls: "text-foreground" },
    { text: ",", cls: "text-muted-foreground" },
  ],
  [{ text: "};", cls: "text-accent" }],
];

const floaters = [
  { icon: Braces, label: "typed", x: "-6%", y: "8%", delay: 0 },
  { icon: Database, label: "postgres", x: "88%", y: "18%", delay: 0.6 },
  { icon: GitBranch, label: "main", x: "-4%", y: "72%", delay: 1.1 },
  { icon: Cloud, label: "edge", x: "86%", y: "78%", delay: 1.6 },
];

export function HomeScreen() {
  const { reduced } = useAppMotion();

  return (
    <Screen>
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <Reveal>
            <NeuChip className="text-signal-foreground dark:text-signal">
              <motion.span
                className="size-2 rounded-full bg-signal"
                animate={reduced ? undefined : { opacity: [1, 0.35, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              {profile.status}
            </NeuChip>
          </Reveal>

          <Reveal>
            <p className="mt-7 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {profile.role}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-5 max-w-xl text-xl font-medium leading-snug text-gradient sm:text-2xl">
              {profile.headline}
            </p>
          </Reveal>

          <Reveal>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {profile.subheadline}
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/work">
                <NeuButton variant="primary" size="lg" type="button">
                  View my work
                  <ArrowRight className="size-4" aria-hidden />
                </NeuButton>
              </Link>
              <Link to="/contact">
                <NeuButton variant="soft" size="lg" type="button">
                  <MessageSquare className="size-4 text-primary" aria-hidden />
                  Start a conversation
                </NeuButton>
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <dl className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroSignals.map((signal) => (
                <NeuSurface
                  key={signal.label}
                  variant="inset"
                  padded="sm"
                  className="rounded-2xl"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {signal.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{signal.value}</dd>
                </NeuSurface>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Hero composition: a neumorphic editor pane with floating dev artifacts */}
        <Reveal className="relative">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {floaters.map(({ icon: Icon, label, x, y, delay }) => (
              <motion.div
                key={label}
                className="absolute hidden lg:flex"
                style={{ left: x, top: y }}
                animate={reduced ? undefined : { y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
                aria-hidden
              >
                <NeuChip>
                  <Icon className="size-3.5 text-primary" />
                  {label}
                </NeuChip>
              </motion.div>
            ))}

            <NeuSurface padded="none" className="overflow-hidden rounded-[2rem] p-3">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-destructive/70" />
                  <span className="size-2.5 rounded-full bg-primary/60" />
                  <span className="size-2.5 rounded-full bg-signal/80" />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">engineer.ts</span>
              </div>

              <div className="neu-inset rounded-[1.5rem] p-5 font-mono text-[13px] leading-7 sm:text-sm">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
                    className="flex gap-4"
                  >
                    <span className="w-4 shrink-0 select-none text-right text-muted-foreground/60">
                      {i + 1}
                    </span>
                    <span className="whitespace-pre">
                      {line.map((token, j) => (
                        <span key={j} className={token.cls}>
                          {token.text}
                        </span>
                      ))}
                    </span>
                  </motion.div>
                ))}
                <motion.span
                  className="ml-8 inline-block h-4 w-2 translate-y-0.5 bg-primary"
                  animate={reduced ? undefined : { opacity: [1, 0, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                  aria-hidden
                />
              </div>

              <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-4">
                <span className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                  <Zap className="size-3 text-signal" aria-hidden />
                  build passing · placeholder
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">tsc --strict</span>
              </div>
            </NeuSurface>
          </div>
        </Reveal>
      </div>
    </Screen>
  );
}

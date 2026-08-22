import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink, Github, Image as ImageIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { NeuButton, NeuChip, NeuSurface, SectionHeading } from "@/components/neu/Neu";
import { Reveal, Screen } from "@/components/Screen";
import { projects, type Project } from "@/data/portfolio";
import { useAppMotion } from "@/lib/motion";

const accentRing: Record<Project["accent"], string> = {
  primary: "bg-primary",
  accent: "bg-accent",
  signal: "bg-signal",
};

function ScreenshotPlaceholder({ caption }: { caption: string }) {
  return (
    <figure className="neu-inset flex aspect-video flex-col items-center justify-center gap-2 rounded-2xl p-4 text-center">
      <ImageIcon className="size-6 text-muted-foreground" aria-hidden />
      <figcaption className="font-mono text-[11px] text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const { reduced } = useAppMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const facts = [
    { label: "Role", value: project.role },
    { label: "Challenge", value: project.challenge },
    { label: "Solution", value: project.solution },
    { label: "Outcome", value: project.outcome },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        aria-hidden
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="neu relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] p-6 sm:rounded-[2rem] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {project.tagline}
            </p>
            <h2 id="project-detail-title" className="mt-2 text-2xl font-semibold tracking-tight">
              {project.title}
            </h2>
          </div>
          <NeuButton
            ref={closeRef}
            type="button"
            variant="soft"
            size="icon"
            onClick={onClose}
            aria-label="Close project details"
            className="rounded-full"
          >
            <X className="size-5" aria-hidden />
          </NeuButton>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <NeuChip key={tech}>{tech}</NeuChip>
          ))}
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {facts.map((fact) => (
            <NeuSurface key={fact.label} variant="inset" padded="sm" className="rounded-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {fact.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed">{fact.value}</p>
            </NeuSurface>
          ))}
        </div>

        <div className="mt-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Screenshots
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {project.screenshots.map((shot) => (
              <ScreenshotPlaceholder key={shot.caption} caption={shot.caption} />
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3 pb-2">
          <a href={project.demoUrl} target="_blank" rel="noreferrer noopener">
            <NeuButton type="button" variant="primary">
              <ExternalLink className="size-4" aria-hidden />
              Live demo
            </NeuButton>
          </a>
          <a href={project.sourceUrl} target="_blank" rel="noreferrer noopener">
            <NeuButton type="button" variant="soft">
              <Github className="size-4 text-primary" aria-hidden />
              Source code
            </NeuButton>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export function WorkScreen() {
  const { reduced } = useAppMotion();
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Screen>
      <Reveal>
        <SectionHeading
          eyebrow="Work"
          title="Selected projects and case studies."
          description="Each card opens a full case study. Content below is placeholder — replace it with real projects, links, and screenshots."
        />
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <Reveal key={project.id}>
            <NeuSurface
              variant="interactive"
              padded="lg"
              whileHover={reduced ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group h-full"
            >
              <button
                type="button"
                onClick={() => setActive(project)}
                aria-haspopup="dialog"
                className="flex h-full w-full flex-col items-start text-left"
              >
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span
                      className={`size-2 rounded-full ${accentRing[project.accent]}`}
                      aria-hidden
                    />
                    {project.tagline}
                  </span>
                  <span className="neu-sm flex size-9 items-center justify-center rounded-full">
                    <ArrowUpRight
                      className="size-4 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </div>

                <h2 className="mt-5 text-xl font-semibold tracking-tight">{project.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.slice(0, 4).map((tech) => (
                    <NeuChip key={tech}>{tech}</NeuChip>
                  ))}
                  {project.stack.length > 4 ? (
                    <NeuChip>+{project.stack.length - 4}</NeuChip>
                  ) : null}
                </div>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <Code2 className="size-4" aria-hidden />
                  Open case study
                </span>
              </button>
            </NeuSurface>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active ? (
          <ProjectDetail key={active.id} project={active} onClose={() => setActive(null)} />
        ) : null}
      </AnimatePresence>
    </Screen>
  );
}

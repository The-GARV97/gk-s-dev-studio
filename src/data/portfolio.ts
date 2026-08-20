/**
 * Centralized content for the portfolio.
 * Edit everything about the site from this single file.
 */

export const profile = {
  name: "Gaurav Khetwal",
  role: "Full-Stack Developer",
  headline: "I turn complex problems into clear, useful software.",
  subheadline:
    "Full-stack developer working across product thinking, interface design, and the systems underneath. I care about clarity, correctness, and interfaces that feel obvious.",
  status: "Available for new projects",
  // Editable placeholders — replace with real details.
  email: "hello@example.com",
  location: "Placeholder City, Country",
  socials: [
    { label: "GitHub", handle: "@placeholder-github", url: "https://github.com/" },
    { label: "LinkedIn", handle: "in/placeholder-linkedin", url: "https://linkedin.com/" },
    { label: "X", handle: "@placeholder-x", url: "https://x.com/" },
  ],
} as const;

export const heroSignals = [
  { label: "uptime", value: "placeholder" },
  { label: "focus", value: "product + platform" },
  { label: "stack", value: "TypeScript end-to-end" },
] as const;

export const heroCode = [
  { t: "const", k: "keyword" },
  { t: " engineer ", k: "name" },
  { t: "=", k: "op" },
  { t: " {", k: "plain" },
] as const;

export const about = {
  intro:
    "I build software end to end — from the first sketch of a flow to the queries that make it fast. I think like a developer, a product person, and the user all at once.",
  identities: [
    {
      title: "Developer",
      body: "Typed, tested, readable code. I optimize for the person who maintains it next, including future me.",
      icon: "code",
    },
    {
      title: "Product thinker",
      body: "Scope is a design tool. I push for the smallest version that actually answers the user's question.",
      icon: "compass",
    },
    {
      title: "Problem solver",
      body: "I start from constraints and evidence, not assumptions — then reduce the problem until the solution is obvious.",
      icon: "puzzle",
    },
  ],
  process: [
    {
      step: "01",
      title: "Understand",
      body: "Map the real problem, the users, the constraints, and what success would actually look like.",
    },
    {
      step: "02",
      title: "Design",
      body: "Shape flows, data models, and interfaces together so the product and the system agree.",
    },
    {
      step: "03",
      title: "Build",
      body: "Ship in thin vertical slices — each one usable, typed, and observable.",
    },
    {
      step: "04",
      title: "Validate",
      body: "Test behaviour, watch real usage, and check the thing solves the problem it was built for.",
    },
    {
      step: "05",
      title: "Improve",
      body: "Refine performance, accessibility, and clarity. Delete what the product no longer needs.",
    },
  ],
  principles: [
    "Clarity beats cleverness",
    "Small, reversible steps",
    "Accessible by default",
    "Measure before optimizing",
  ],
} as const;

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  stack: string[];
  challenge: string;
  solution: string;
  outcome: string;
  screenshots: { caption: string }[];
  demoUrl: string;
  sourceUrl: string;
  accent: "primary" | "accent" | "signal";
};

/**
 * Projects use clearly marked placeholder content.
 * Replace the placeholder text, links, and screenshot captions with real details.
 */
export const projects: Project[] = [
  {
    id: "project-one",
    title: "Project One — Placeholder",
    tagline: "Placeholder full-stack web application",
    description:
      "Placeholder description: a short summary of what this product does and who it is for.",
    role: "Placeholder role — e.g. design, frontend, API, and database.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    challenge: "Placeholder challenge: the core constraint or problem this project had to solve.",
    solution: "Placeholder solution: the approach, architecture, and key decisions taken.",
    outcome: "Placeholder outcome: describe the result here. No metrics are claimed yet.",
    screenshots: [
      { caption: "Placeholder screenshot — main screen" },
      { caption: "Placeholder screenshot — detail view" },
    ],
    demoUrl: "#",
    sourceUrl: "#",
    accent: "primary",
  },
  {
    id: "project-two",
    title: "Project Two — Placeholder",
    tagline: "Placeholder realtime dashboard",
    description: "Placeholder description: what data this surfaces and why it matters.",
    role: "Placeholder role — e.g. full-stack implementation and data modelling.",
    stack: ["Next.js", "tRPC", "Prisma", "Redis", "Docker"],
    challenge: "Placeholder challenge: performance, scale, or data-consistency constraint.",
    solution: "Placeholder solution: caching strategy, streaming approach, or schema design.",
    outcome: "Placeholder outcome: replace with the real result.",
    screenshots: [
      { caption: "Placeholder screenshot — dashboard" },
      { caption: "Placeholder screenshot — filters" },
    ],
    demoUrl: "#",
    sourceUrl: "#",
    accent: "accent",
  },
  {
    id: "project-three",
    title: "Project Three — Placeholder",
    tagline: "Placeholder developer tooling",
    description: "Placeholder description: the workflow this tool removes friction from.",
    role: "Placeholder role — e.g. CLI, API, and documentation.",
    stack: ["TypeScript", "Fastify", "SQLite", "Vitest", "GitHub Actions"],
    challenge: "Placeholder challenge: the manual process or failure mode being replaced.",
    solution: "Placeholder solution: the design of the tool and its integration points.",
    outcome: "Placeholder outcome: replace with the real result.",
    screenshots: [{ caption: "Placeholder screenshot — CLI output" }],
    demoUrl: "#",
    sourceUrl: "#",
    accent: "signal",
  },
  {
    id: "project-four",
    title: "Project Four — Placeholder",
    tagline: "Placeholder mobile-first web app",
    description: "Placeholder description: the offline-friendly experience this delivers.",
    role: "Placeholder role — e.g. architecture, UI, and sync layer.",
    stack: ["React", "Vite", "IndexedDB", "Supabase", "Playwright"],
    challenge: "Placeholder challenge: unreliable connectivity and conflict resolution.",
    solution: "Placeholder solution: local-first data flow and merge strategy.",
    outcome: "Placeholder outcome: replace with the real result.",
    screenshots: [
      { caption: "Placeholder screenshot — mobile home" },
      { caption: "Placeholder screenshot — sync state" },
    ],
    demoUrl: "#",
    sourceUrl: "#",
    accent: "primary",
  },
];

export type SkillGroup = {
  id: string;
  label: string;
  icon: string;
  summary: string;
  items: { name: string; note: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "layout",
    summary: "Interfaces that stay fast, accessible, and predictable as they grow.",
    items: [
      { name: "React", note: "components, hooks, suspense" },
      { name: "TypeScript", note: "strict types, generics" },
      { name: "Tailwind CSS", note: "design systems, tokens" },
      { name: "Framer Motion", note: "purposeful motion" },
      { name: "Accessibility", note: "keyboard, ARIA, contrast" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "server",
    summary: "APIs and server logic with clear contracts and honest error states.",
    items: [
      { name: "Node.js", note: "REST + RPC services" },
      { name: "Server functions", note: "typed end-to-end calls" },
      { name: "Auth", note: "sessions, roles, policies" },
      { name: "Validation", note: "Zod schemas both sides" },
      { name: "Queues & jobs", note: "scheduled work" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "database",
    summary: "Schemas designed for the questions the product needs to ask.",
    items: [
      { name: "PostgreSQL", note: "modelling, indexes" },
      { name: "SQL", note: "joins, windows, CTEs" },
      { name: "Row-level security", note: "policy-first access" },
      { name: "Migrations", note: "versioned, reversible" },
      { name: "Redis", note: "caching, rate limits" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "wrench",
    summary: "A tight loop between writing code and knowing it works.",
    items: [
      { name: "Git", note: "small reviewable commits" },
      { name: "Vite", note: "fast dev + builds" },
      { name: "Vitest / Playwright", note: "unit to end-to-end" },
      { name: "ESLint / Prettier", note: "consistent codebases" },
      { name: "Figma", note: "design handoff" },
    ],
  },
  {
    id: "product",
    label: "Product Thinking",
    icon: "compass",
    summary: "Deciding what not to build is most of the work.",
    items: [
      { name: "Scoping", note: "thin vertical slices" },
      { name: "User flows", note: "states before screens" },
      { name: "Trade-offs", note: "cost vs. clarity" },
      { name: "Copywriting", note: "interface language" },
      { name: "Analytics", note: "evidence over opinion" },
    ],
  },
  {
    id: "deployment",
    label: "Deployment",
    icon: "rocket",
    summary: "Shipping should be boring, observable, and reversible.",
    items: [
      { name: "CI/CD", note: "GitHub Actions pipelines" },
      { name: "Docker", note: "reproducible environments" },
      { name: "Edge runtimes", note: "serverless deploys" },
      { name: "Observability", note: "logs, traces, alerts" },
      { name: "Performance", note: "budgets and profiling" },
    ],
  },
];

export const terminalLines = [
  { prompt: "gaurav@portfolio", cmd: "whoami" },
  { out: "full-stack developer · product thinker · problem solver" },
  { prompt: "gaurav@portfolio", cmd: "stack --list --short" },
  { out: "typescript react node postgres tailwind docker" },
  { prompt: "gaurav@portfolio", cmd: "process --describe" },
  { out: "understand → design → build → validate → improve" },
  { prompt: "gaurav@portfolio", cmd: "status" },
  { out: "ready. open to interesting problems." },
] as const;

export const navItems = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/about", label: "About", icon: "user" },
  { to: "/work", label: "Work", icon: "layers" },
  { to: "/skills", label: "Skills", icon: "terminal" },
  { to: "/contact", label: "Contact", icon: "mail" },
] as const;

import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useAppMotion } from "@/lib/motion";

const surfaceVariants = cva("rounded-3xl", {
  variants: {
    variant: {
      raised: "neu",
      inset: "neu-inset-lg",
      interactive: "neu-interactive",
      flat: "bg-card",
    },
    padded: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-6 sm:p-8",
    },
  },
  defaultVariants: { variant: "raised", padded: "md" },
});

export type NeuSurfaceProps = HTMLMotionProps<"div"> & VariantProps<typeof surfaceVariants>;

export const NeuSurface = forwardRef<HTMLDivElement, NeuSurfaceProps>(
  ({ className, variant, padded, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(surfaceVariants({ variant, padded }), className)}
      {...props}
    />
  ),
);
NeuSurface.displayName = "NeuSurface";

const buttonVariants = cva(
  "relative inline-flex select-none items-center justify-center gap-2 rounded-2xl font-medium tracking-tight transition-shadow disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "neu-interactive text-primary-foreground [background-image:linear-gradient(135deg,var(--color-primary),color-mix(in_oklab,var(--color-primary)_60%,var(--color-accent)))]",
        soft: "neu-interactive text-foreground",
        ghost: "text-muted-foreground hover:text-foreground",
        inset: "neu-inset text-foreground",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-sm",
        lg: "h-14 px-7 text-base",
        icon: "size-12",
      },
    },
    defaultVariants: { variant: "soft", size: "md" },
  },
);

export type NeuButtonProps = HTMLMotionProps<"button"> & VariantProps<typeof buttonVariants>;

export const NeuButton = forwardRef<HTMLButtonElement, NeuButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const { reduced } = useAppMotion();
    return (
      <motion.button
        ref={ref}
        whileHover={reduced ? undefined : { y: -2 }}
        whileTap={reduced ? undefined : { scale: 0.96, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
NeuButton.displayName = "NeuButton";

export function NeuChip({
  children,
  className,
  mono = true,
}: {
  children: ReactNode;
  className?: string;
  mono?: boolean;
}) {
  return (
    <span
      className={cn(
        "neu-sm inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted-foreground",
        mono && "font-mono",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

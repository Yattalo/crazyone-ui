import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center px-3 py-1 text-xs font-medium tracking-wider transition-all duration-300 backdrop-blur-sm rounded-full",
  {
    variants: {
      variant: {
        default: "bg-teal-950/60 text-teal-200 border border-teal-500/40 shadow-[0_0_15px_rgba(20,184,166,0.5)] hover:shadow-[0_0_25px_rgba(20,184,166,0.7)]",
        secondary: "bg-cyan-950/60 text-cyan-200 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)]",
        destructive: "bg-red-950/60 text-red-200 border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.5)]",
        outline: "border border-teal-500/50 bg-transparent text-teal-300 shadow-[0_0_10px_rgba(20,184,166,0.3)] hover:shadow-[0_0_20px_rgba(20,184,166,0.5)]",
        warning: "bg-magenta-950/60 text-magenta-200 border border-magenta-500/40 shadow-[0_0_15px_rgba(217,70,239,0.5)] hover:shadow-[0_0_25px_rgba(217,70,239,0.7)]",
        success: "bg-teal-950/60 text-teal-200 border border-teal-500/40 shadow-[0_0_15px_rgba(20,184,166,0.5)] hover:shadow-[0_0_25px_rgba(20,184,166,0.7)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      style={{ textShadow: "0 0 8px currentColor" }}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-all backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary/80 via-secondary/80 to-accent/80 text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]",
        secondary: "bg-secondary/20 text-secondary border border-secondary/30",
        destructive: "bg-destructive/20 text-destructive border border-destructive/30",
        outline: "border border-primary/30 bg-transparent text-primary hover:bg-primary/10",
        warning: "bg-gradient-to-r from-amber-500/80 to-orange-500/80 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]",
        success: "bg-gradient-to-r from-emerald-500/80 to-teal-500/80 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]",
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
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-mono uppercase tracking-[0.15em] transition-all",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary/10 text-primary shadow-[0_0_10px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)]",
        secondary: "border-secondary bg-secondary/10 text-secondary-foreground",
        destructive: "border-destructive bg-destructive/10 text-destructive shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse",
        outline: "border-primary/50 bg-transparent text-primary",
        warning: "border-yellow-500 bg-yellow-500/10 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]",
        success: "border-primary bg-primary/20 text-primary shadow-[0_0_10px_hsl(var(--primary)/0.4)]",
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

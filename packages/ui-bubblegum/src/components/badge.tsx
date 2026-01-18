import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-primary/30 hover:shadow-lg hover:shadow-primary/40",
        secondary: "bg-secondary text-secondary-foreground shadow-secondary/30 hover:shadow-lg hover:shadow-secondary/40",
        destructive: "bg-red-400 text-white shadow-red-300/50 hover:shadow-lg hover:shadow-red-400/50",
        outline: "border-2 border-primary bg-white text-primary hover:bg-primary/5",
        warning: "bg-amber-400 text-amber-900 shadow-amber-300/50 hover:shadow-lg hover:shadow-amber-400/50",
        success: "bg-emerald-400 text-emerald-900 shadow-emerald-300/50 hover:shadow-lg hover:shadow-emerald-400/50",
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

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border text-xs font-medium transition-colors px-2 py-1 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1",
  {
    variants: {
      variant: {
        default:
          "border-foreground/20 bg-muted text-foreground hover:bg-muted/80",
        primary:
          "border-foreground/40 bg-foreground text-background hover:bg-foreground/90",
        secondary:
          "border-muted bg-muted text-muted-foreground hover:bg-muted/80",
        destructive:
          "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20",
        outline: "border-foreground/20 text-foreground hover:bg-foreground/5",
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

// Maia Badge: Minimal badge variants
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

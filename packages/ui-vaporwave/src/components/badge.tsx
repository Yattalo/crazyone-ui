import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center px-3 py-1 text-xs font-medium tracking-wider transition-all backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-primary/80 text-primary-foreground shadow-[0_0_15px_rgba(255,106,213,0.4)] hover:shadow-[0_0_25px_rgba(255,106,213,0.6)]",
        secondary: "bg-secondary/80 text-secondary-foreground shadow-[0_0_15px_rgba(1,205,254,0.4)] hover:shadow-[0_0_25px_rgba(1,205,254,0.6)]",
        destructive: "bg-destructive/80 text-destructive-foreground",
        outline: "border border-primary/50 bg-transparent text-primary shadow-[0_0_10px_rgba(255,106,213,0.2)]",
        warning: "bg-[#FF6AD5]/80 text-white shadow-[0_0_15px_rgba(255,106,213,0.4)]",
        success: "bg-[#01CDFE]/80 text-white shadow-[0_0_15px_rgba(1,205,254,0.4)]",
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

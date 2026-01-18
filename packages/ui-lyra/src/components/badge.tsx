import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-all backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-purple-500/80 via-pink-500/80 to-purple-600/80 text-white shadow-[0_0_15px_hsl(270_81%_56%/0.4)] hover:shadow-[0_0_25px_hsl(270_81%_56%/0.6)]",
        secondary: "bg-purple-500/20 text-purple-600 border border-purple-500/30 hover:bg-purple-500/30",
        destructive: "bg-destructive/20 text-destructive border border-destructive/30",
        outline: "border border-purple-500/50 bg-transparent text-purple-600 hover:bg-purple-500/10",
        warning: "bg-gradient-to-r from-amber-500/80 to-orange-500/80 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]",
        success: "bg-gradient-to-r from-emerald-500/80 to-teal-500/80 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]",
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

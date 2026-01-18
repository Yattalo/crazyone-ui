import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-amber-400 text-white shadow-[0_0_12px_rgba(245,158,11,0.4)] hover:shadow-[0_0_16px_rgba(245,158,11,0.6)]",
        secondary: "bg-amber-100 text-amber-900 shadow-[0_0_8px_rgba(245,158,11,0.2)] hover:shadow-[0_0_12px_rgba(245,158,11,0.3)]",
        destructive: "bg-red-500 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)] hover:shadow-[0_0_16px_rgba(220,38,38,0.6)]",
        outline: "border-2 border-amber-400 bg-white text-amber-600 hover:bg-amber-50 shadow-[0_0_8px_rgba(245,158,11,0.15)]",
        warning: "bg-orange-500 text-white shadow-[0_0_12px_rgba(234,88,12,0.4)] hover:shadow-[0_0_16px_rgba(234,88,12,0.6)]",
        success: "bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)] hover:shadow-[0_0_16px_rgba(16,185,129,0.6)]",
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

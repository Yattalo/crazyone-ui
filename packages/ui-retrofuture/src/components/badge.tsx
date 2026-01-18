import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

// Retrofuture Badge: Atomic pill shapes with space age colors
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-[3px_3px_0_rgba(20,184,166,0.4)] hover:shadow-[5px_5px_0_rgba(20,184,166,0.6)] ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-teal-400 text-white shadow-teal-200/70 hover:shadow-teal-300/80",
        secondary:
          "bg-teal-100 text-teal-700 shadow-teal-200/50 hover:shadow-teal-300/60 border border-teal-300",
        destructive:
          "bg-red-500 text-white shadow-red-300/70 hover:shadow-red-400/80",
        outline:
          "border-2 border-teal-400 bg-white text-teal-600 hover:bg-teal-50 shadow-none hover:shadow-[3px_3px_0_rgba(20,184,166,0.4)]",
        warning:
          "bg-orange-500 text-white shadow-orange-300/70 hover:shadow-orange-400/80",
        success:
          "bg-emerald-500 text-white shadow-emerald-300/70 hover:shadow-emerald-400/80",
        accent:
          "bg-gradient-to-r from-teal-400 to-cyan-400 text-white shadow-cyan-300/70 hover:shadow-cyan-400/80",
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

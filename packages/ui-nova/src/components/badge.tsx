import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-orange-400 text-white shadow-orange-200 hover:shadow-md hover:shadow-orange-300",
        secondary: "bg-orange-100 text-orange-900 shadow-orange-100 hover:shadow-md hover:shadow-orange-200",
        destructive: "bg-red-400 text-white shadow-red-200 hover:shadow-md hover:shadow-red-300",
        outline: "border-2 border-orange-400 bg-white text-orange-600 hover:bg-orange-50",
        warning: "bg-amber-400 text-amber-900 shadow-amber-200 hover:shadow-md hover:shadow-amber-300",
        success: "bg-emerald-400 text-white shadow-emerald-200 hover:shadow-md hover:shadow-emerald-300",
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

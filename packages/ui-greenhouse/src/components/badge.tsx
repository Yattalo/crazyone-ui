import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-green-500 text-white shadow-green-200 hover:shadow-md hover:shadow-green-300",
        secondary: "bg-green-100 text-green-900 shadow-green-100 hover:shadow-md hover:shadow-green-200",
        destructive: "bg-red-500 text-white shadow-red-200 hover:shadow-md hover:shadow-red-300",
        outline: "border-2 border-green-500 bg-white text-green-600 hover:bg-green-50",
        leaf: "bg-emerald-600 text-white shadow-emerald-300 hover:shadow-md hover:shadow-emerald-400",
        sage: "bg-green-600 text-white shadow-green-300 hover:shadow-md hover:shadow-green-400",
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

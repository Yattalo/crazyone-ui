import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white",
        secondary: "bg-gray-200 text-gray-900",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-blue-500 bg-transparent text-blue-500",
        warning: "bg-yellow-500 text-white",
        success: "bg-green-600 text-white",
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

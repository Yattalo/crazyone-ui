import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center border-4 border-current px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white border-blue-600",
        secondary: "bg-yellow-500 text-black border-yellow-500",
        destructive: "bg-red-600 text-white border-red-600",
        outline: "bg-transparent text-foreground border-foreground",
        primary: "bg-blue-600 text-white border-blue-600",
        warning: "bg-yellow-500 text-black border-yellow-500",
        success: "bg-blue-600 text-white border-blue-600",
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

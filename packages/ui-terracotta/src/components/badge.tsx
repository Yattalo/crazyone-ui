import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-[#c2410c] text-white shadow-amber-200 hover:shadow-md hover:shadow-amber-300",
        secondary: "bg-[#a16207] text-white shadow-amber-100 hover:shadow-md hover:shadow-amber-200",
        clay: "bg-amber-600 text-white shadow-amber-200 hover:shadow-md hover:shadow-amber-300",
        earth: "bg-[#78350f] text-white shadow-amber-900/30 hover:shadow-md hover:shadow-amber-900/40",
        outline: "border-2 border-[#c2410c] bg-[#fffbeb] text-[#c2410c] hover:bg-amber-100",
        cream: "bg-[#fffbeb] text-[#a16207] border border-amber-200 shadow-sm",
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

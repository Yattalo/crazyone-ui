import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-md",
  {
    variants: {
      variant: {
        pink: "bg-gradient-to-r from-[#fce7f3] to-[#fbcfe8] text-[#be185d] border border-[#fbcfe8] shadow-[#f472b6]/20 hover:shadow-lg hover:shadow-[#f472b6]/30",
        mint: "bg-gradient-to-r from-[#d1fae5] to-[#a7f3d0] text-[#065f46] border border-[#a7f3d0] shadow-[#6ee7b7]/20 hover:shadow-lg hover:shadow-[#6ee7b7]/30",
        lavender:
          "bg-gradient-to-r from-[#ede9fe] to-[#ddd6fe] text-[#6b21a8] border border-[#ddd6fe] shadow-[#c084fc]/20 hover:shadow-lg hover:shadow-[#c084fc]/30",
        peach: "bg-gradient-to-r from-[#fed7aa] to-[#fdba74] text-[#92400e] border border-[#fdba74] shadow-[#fb923c]/20 hover:shadow-lg hover:shadow-[#fb923c]/30",
        default:
          "bg-gradient-to-r from-[#fce7f3] to-[#fbcfe8] text-[#be185d] border border-[#fbcfe8] shadow-[#f472b6]/20 hover:shadow-lg hover:shadow-[#f472b6]/30",
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

// Gelato Badge: Soft pastel badges with sweet colors
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

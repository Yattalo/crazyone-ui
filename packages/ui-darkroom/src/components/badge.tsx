import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-serif font-semibold uppercase tracking-widest transition-all",
  {
    variants: {
      variant: {
        default: "border-[#b91c1c] bg-[#7f1d1d] text-[#fca5a5] shadow-[0_0_12px_rgba(185,28,28,0.5)] hover:shadow-[0_0_20px_rgba(185,28,28,0.8)]",
        secondary: "border-[hsl(0,0%,40%)] bg-[hsl(0,0%,15%)] text-[hsl(0,0%,75%)]",
        destructive: "border-[#ff4444] bg-[#b91c1c]/20 text-[#ff4444] shadow-[0_0_15px_rgba(255,68,68,0.4)] animate-pulse",
        outline: "border-[#b91c1c]/60 bg-transparent text-[#fca5a5]",
        warning: "border-[#b91c1c] bg-[#7f1d1d]/50 text-[#fecaca] shadow-[0_0_10px_rgba(185,28,28,0.3)]",
        success: "border-[#b91c1c] bg-[#7f1d1d]/30 text-[#fca5a5] shadow-[0_0_10px_rgba(185,28,28,0.25)]",
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

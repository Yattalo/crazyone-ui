import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center px-3 py-1.5 text-xs font-black uppercase tracking-widest transition-all backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-[#ec4899]/90 text-white shadow-[0_0_20px_rgba(236,72,153,0.6),0_0_40px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8),0_0_60px_rgba(236,72,153,0.5)]",
        secondary: "bg-[#3b82f6]/90 text-white shadow-[0_0_20px_rgba(59,130,246,0.6),0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8),0_0_60px_rgba(59,130,246,0.5)]",
        destructive: "bg-red-600/90 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:shadow-[0_0_30px_rgba(239,68,68,0.8)]",
        outline: "border-2 border-[#ec4899]/80 bg-transparent text-[#ec4899] shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]",
        purple: "bg-[#a855f7]/90 text-white shadow-[0_0_20px_rgba(168,85,247,0.6),0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8),0_0_60px_rgba(168,85,247,0.5)]",
        accent: "bg-gradient-to-r from-[#ec4899] to-[#3b82f6] text-white shadow-[0_0_25px_rgba(236,72,153,0.5),0_0_25px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(236,72,153,0.7),0_0_35px_rgba(59,130,246,0.7)]",
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
    <div
      className={cn(badgeVariants({ variant }), className)}
      style={{ textShadow: "0 0 12px currentColor" }}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 border",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[hsl(195,95%,60%)] to-[hsl(210,90%,70%)] text-white border-white/30 shadow-[0_0_12px_rgba(100,200,255,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(100,200,255,0.6),0_0_40px_rgba(139,92,246,0.2)]",
        secondary:
          "bg-gradient-to-r from-[hsl(210,90%,70%)] to-[hsl(280,90%,55%)] text-white border-white/30 shadow-[0_0_12px_rgba(139,92,246,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(139,92,246,0.6),0_0_40px_rgba(100,200,255,0.2)]",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-500 text-white border-red-400/30 shadow-[0_0_12px_rgba(239,68,68,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]",
        outline:
          "border-2 border-primary/50 text-primary bg-transparent shadow-[0_0_8px_rgba(100,200,255,0.2)] hover:shadow-[0_0_16px_rgba(100,200,255,0.4)] hover:border-primary/80",
        success:
          "bg-gradient-to-r from-green-600 to-emerald-500 text-white border-green-400/30 shadow-[0_0_12px_rgba(34,197,94,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]",
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

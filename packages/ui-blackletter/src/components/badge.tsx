import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-xs font-serif font-bold uppercase tracking-[0.2em] transition-all duration-200 rounded-none border-2 border-double relative px-3 py-1.5",
  {
    variants: {
      variant: {
        default:
          "bg-[#1a1a1a] border-[#d4af37] text-[#d4af37] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_4px_12px_rgba(212,175,55,0.2)] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_6px_16px_rgba(212,175,55,0.3)]",
        secondary:
          "bg-[#0d0d0d] border-[#6b7280] text-[#d1d5db] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_4px_12px_rgba(107,114,128,0.1)]",
        destructive:
          "bg-[#1a1a1a] border-[#dc2626] text-[#fca5a5] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_4px_12px_rgba(220,38,38,0.2)]",
        outline:
          "border-[#d4af37] bg-transparent text-[#d4af37] shadow-[0_2px_8px_rgba(212,175,55,0.1)]",
        success:
          "bg-[#1a1a1a] border-[#10b981] text-[#6ee7b7] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_4px_12px_rgba(16,185,129,0.2)]",
      },
      size: {
        sm: "text-[0.65rem] px-2 py-0.5",
        default: "text-xs px-3 py-1.5",
        lg: "text-sm px-4 py-2",
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

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };

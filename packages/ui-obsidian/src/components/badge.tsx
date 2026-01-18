import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-none border px-2.5 py-0.5 text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-[hsl(0,0%,20%)] bg-gradient-to-b from-[hsl(0,0%,10%)] to-[hsl(0,0%,6%)] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_2px_8px_rgba(0,0,0,0.4)]",
        secondary:
          "border-[hsl(270,50%,30%,0.3)] bg-gradient-to-b from-[hsl(270,40%,12%)] to-[hsl(270,40%,8%)] text-[hsl(270,80%,70%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_2px_8px_rgba(106,90,205,0.15)]",
        destructive:
          "border-[hsl(0,84%,60%,0.3)] bg-gradient-to-b from-[hsl(0,60%,12%)] to-[hsl(0,60%,8%)] text-destructive shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_2px_8px_rgba(239,68,68,0.15)]",
        outline:
          "border-[hsl(0,0%,25%)] bg-transparent text-foreground hover:bg-[hsl(0,0%,8%)]",
        success:
          "border-[hsl(142,76%,36%,0.3)] bg-gradient-to-b from-[hsl(142,70%,12%)] to-[hsl(142,70%,8%)] text-green-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_2px_8px_rgba(34,197,94,0.15)]",
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

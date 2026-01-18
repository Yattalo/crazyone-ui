import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-[hsl(280,100%,60%)] relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(transparent_49%,rgba(190,100,255,0.08)_50%)] before:bg-[length:100%_2px] before:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-[hsl(280,100%,70%,0.3)] after:to-transparent after:animate-[synthwave-shine_3s_ease-in-out_infinite]",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(280,60%,15%)] text-[hsl(280,100%,70%)] shadow-[0_0_10px_hsl(280,100%,60%,0.4)] hover:shadow-[0_0_20px_hsl(280,100%,60%,0.6),0_0_30px_hsl(190,100%,50%,0.2)]",
        secondary:
          "bg-[hsl(190,100%,15%)] text-[hsl(190,100%,70%)] border-[hsl(190,100%,60%)] shadow-[0_0_10px_hsl(190,100%,60%,0.4)] hover:shadow-[0_0_20px_hsl(190,100%,60%,0.6)]",
        destructive:
          "bg-[hsl(0,60%,15%)] text-[hsl(0,100%,70%)] border-[hsl(0,100%,60%)] shadow-[0_0_10px_hsl(0,100%,60%,0.4)] hover:shadow-[0_0_20px_hsl(0,100%,60%,0.6)]",
        outline:
          "text-[hsl(280,100%,70%)] border-[hsl(280,100%,60%)] hover:bg-[hsl(280,100%,60%,0.1)]",
        success:
          "bg-[hsl(120,60%,15%)] text-[hsl(120,100%,70%)] border-[hsl(120,100%,60%)] shadow-[0_0_10px_hsl(120,100%,60%,0.4)] hover:shadow-[0_0_20px_hsl(120,100%,60%,0.6)]",
      },
      size: {
        default: "text-xs",
        sm: "text-[10px] px-2 py-1",
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
      className={cn(badgeVariants({ variant, size }), "relative z-10", className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };

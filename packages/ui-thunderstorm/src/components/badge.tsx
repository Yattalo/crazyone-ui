import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_0_10px_hsl(55,95%,60%,0.4)] hover:shadow-[0_0_15px_hsl(55,95%,60%,0.6)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_0_10px_hsl(0,84%,50%,0.3)]",
        success:
          "bg-[hsl(120,60%,40%)] text-white shadow-[0_0_10px_hsl(120,60%,50%,0.4)] hover:shadow-[0_0_15px_hsl(120,60%,50%,0.6)]",
        outline:
          "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        electric:
          "bg-gradient-to-r from-[hsl(185,100%,50%)] to-[hsl(270,100%,50%)] text-white font-bold tracking-wider shadow-[0_0_15px_hsl(185,100%,50%,0.5),0_0_20px_hsl(270,100%,50%,0.3)] hover:shadow-[0_0_20px_hsl(185,100%,50%,0.8),0_0_30px_hsl(270,100%,50%,0.5)] animate-pulse",
        storm:
          "bg-[hsl(220,30%,25%)] text-[hsl(185,100%,65%)] border border-[hsl(185,100%,50%,0.4)] shadow-[0_0_12px_hsl(185,100%,50%,0.3)] hover:shadow-[0_0_20px_hsl(185,100%,50%,0.5)]",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-xs px-3 py-1",
        lg: "text-sm px-4 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
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
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };

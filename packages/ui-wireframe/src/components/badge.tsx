import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium rounded-none border border-dashed border-foreground bg-transparent transition-all duration-200 animate-[wireframe-wobble_4s_ease-in-out_infinite] hover:border-solid hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-foreground text-foreground bg-transparent",
        secondary: "border-secondary text-secondary bg-transparent",
        destructive: "border-destructive text-destructive bg-transparent",
        outline: "border-foreground text-foreground bg-transparent",
        filled: "border-foreground bg-foreground text-background",
        warning: "border-yellow-600 text-yellow-700 bg-transparent",
        success: "border-green-600 text-green-700 bg-transparent",
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2 py-0.5 text-[0.7rem]",
        lg: "px-4 py-2 text-sm",
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
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };

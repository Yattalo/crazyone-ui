import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden rounded-sm bg-gradient-to-b from-[hsl(0,0%,8%)] to-[hsl(0,0%,4%)] text-foreground border border-[hsl(0,0%,15%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_3px_rgba(0,0,0,0.5),0_4px_12px_rgba(0,0,0,0.4)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.07] before:to-transparent before:opacity-100 after:absolute after:top-0 after:left-[-100%] after:w-[50%] after:h-full after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:skew-x-[-20deg] hover:border-[hsl(348,83%,58%,0.3)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_20px_rgba(233,69,96,0.2),0_4px_20px_rgba(0,0,0,0.5)] hover:after:animate-[obsidian-glass-sweep_1.5s_ease-out] active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_0_15px_rgba(233,69,96,0.1)]",
  {
    variants: {
      variant: {
        default: "",
        destructive: "!bg-destructive !text-destructive-foreground",
        outline: "!bg-transparent !border-2",
        secondary: "!bg-secondary !text-secondary-foreground",
        ghost: "!bg-transparent !shadow-none !border-0 hover:!bg-accent/20",
        link: "!bg-transparent !shadow-none !border-0 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative border-2 border-dashed border-foreground bg-transparent rounded-none font-mono animate-[wireframe-wobble_4s_ease-in-out_infinite] shadow-[2px_2px_0_-1px_hsl(var(--background)),3px_3px_0_-1px_currentColor] before:absolute before:-top-4 before:left-0 before:text-[0.6em] before:text-muted-foreground before:content-['BTN'] hover:border-solid hover:bg-foreground hover:text-background hover:shadow-[3px_3px_0_-1px_hsl(var(--background)),4px_4px_0_-1px_currentColor] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_-1px_currentColor]",
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

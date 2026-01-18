import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-3xl bg-[hsl(170,100%,60%,0.15)] text-[hsl(170,100%,70%)] border border-[hsl(170,100%,60%,0.3)] backdrop-blur-sm shadow-[0_0_20px_hsl(170,100%,60%,0.3),inset_0_0_15px_hsl(170,100%,60%,0.1)] animate-[bioluminescent-pulse_4s_ease-in-out_infinite] hover:bg-[hsl(170,100%,60%,0.25)] hover:shadow-[0_0_40px_hsl(170,100%,60%,0.5),0_0_60px_hsl(170,100%,60%,0.3),inset_0_0_25px_hsl(170,100%,60%,0.15)] hover:animate-[bioluminescent-intensify_2s_ease-in-out_infinite] active:scale-[0.98] active:brightness-120",
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

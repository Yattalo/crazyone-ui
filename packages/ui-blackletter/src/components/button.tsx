import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-serif font-bold uppercase tracking-[0.4em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative rounded-none bg-[hsl(0,0%,4%)] text-[hsl(45,80%,90%)] border-4 border-[hsl(350,72%,47%)] shadow-[4px_4px_0_hsl(350,72%,47%)] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22paper%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.04%22%20numOctaves=%225%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23paper)%22%20opacity=%220.03%22/%3E%3C/svg%3E')] before:pointer-events-none hover:shadow-[6px_6px_0_hsl(350,72%,47%)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:animate-[blackletter-illuminate_2s_ease-in-out_infinite] active:shadow-[2px_2px_0_hsl(350,72%,47%)] active:translate-x-0.5 active:translate-y-0.5",
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

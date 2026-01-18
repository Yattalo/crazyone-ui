import type { ThemeConfig } from "../schema";

const DEFAULT_BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const DEFAULT_VARIANTS = {
  default:
    "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg",
  destructive:
    "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90",
  outline:
    "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

export function generateButton(config: ThemeConfig): string {
  const buttonConfig = config.componentStyles.button;
  const baseClasses = buttonConfig?.baseClasses
    ? `${DEFAULT_BASE_CLASSES} ${buttonConfig.baseClasses}`
    : DEFAULT_BASE_CLASSES;

  const variants = { ...DEFAULT_VARIANTS };
  if (buttonConfig?.variantOverrides) {
    for (const [key, value] of Object.entries(buttonConfig.variantOverrides)) {
      variants[key as keyof typeof variants] = value;
    }
  }

  return `import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const buttonVariants = cva(
  "${baseClasses}",
  {
    variants: {
      variant: {
        default: "${variants.default}",
        destructive: "${variants.destructive}",
        outline: "${variants.outline}",
        secondary: "${variants.secondary}",
        ghost: "${variants.ghost}",
        link: "${variants.link}",
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
`;
}

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const alertVariants = cva(
  "relative w-full border p-4 font-mono text-sm [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 before:absolute before:top-0 before:left-0 before:w-1 before:h-full",
  {
    variants: {
      variant: {
        default: "bg-background/95 border-primary/30 text-foreground shadow-[0_0_15px_hsl(var(--primary)/0.1)] before:bg-primary",
        destructive:
          "bg-destructive/5 border-destructive/50 text-destructive shadow-[0_0_15px_rgba(239,68,68,0.1)] [&>svg]:text-destructive before:bg-destructive before:animate-pulse",
        warning:
          "bg-yellow-500/5 border-yellow-500/50 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)] [&>svg]:text-yellow-500 before:bg-yellow-500",
        success:
          "bg-primary/5 border-primary/50 text-primary shadow-[0_0_15px_hsl(var(--primary)/0.2)] [&>svg]:text-primary before:bg-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 font-bold leading-none tracking-[0.15em] uppercase",
      "before:content-['>_'] before:text-primary",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xs leading-relaxed opacity-80", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

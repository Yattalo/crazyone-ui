import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 backdrop-blur-sm [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/5 before:via-pink-500/5 before:to-purple-600/5 before:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-card/70 border-purple-500/30 text-foreground shadow-[0_0_20px_hsl(270_81%_56%/0.1)]",
        destructive:
          "bg-destructive/10 border-destructive/30 text-destructive shadow-[0_0_20px_rgba(239,68,68,0.15)] [&>svg]:text-destructive",
        warning:
          "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)] [&>svg]:text-amber-400",
        success:
          "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] [&>svg]:text-emerald-400",
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
      "relative z-10 mb-1 font-semibold leading-none tracking-tight bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent",
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
    className={cn("relative z-10 text-sm leading-relaxed opacity-85", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

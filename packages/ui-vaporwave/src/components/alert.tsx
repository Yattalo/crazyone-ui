import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const alertVariants = cva(
  "relative w-full border p-4 backdrop-blur-sm [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#FF6AD5]/5 before:to-[#01CDFE]/5 before:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-card/80 border-primary/30 text-foreground shadow-[0_0_20px_rgba(255,106,213,0.1)]",
        destructive:
          "bg-destructive/10 border-destructive/50 text-destructive shadow-[0_0_20px_rgba(239,68,68,0.2)] [&>svg]:text-destructive",
        warning:
          "bg-[#FF6AD5]/10 border-[#FF6AD5]/50 text-[#FF6AD5] shadow-[0_0_20px_rgba(255,106,213,0.2)] [&>svg]:text-[#FF6AD5]",
        success:
          "bg-[#01CDFE]/10 border-[#01CDFE]/50 text-[#01CDFE] shadow-[0_0_20px_rgba(1,205,254,0.2)] [&>svg]:text-[#01CDFE]",
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
      "relative z-10 mb-1 font-semibold leading-none tracking-wide",
      "text-shadow-[0_0_10px_currentColor]",
      className
    )}
    style={{ textShadow: "0 0 10px currentColor" }}
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
    className={cn("relative z-10 text-sm leading-relaxed opacity-80", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

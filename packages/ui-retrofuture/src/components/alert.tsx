import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

// Retrofuture Alert: Atomic age styling with teal, orange, and cream accents
const alertVariants = cva(
  "relative w-full rounded-lg border-2 p-4 [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 transition-all duration-300 shadow-[4px_4px_0_rgba(20,184,166,0.3)] hover:shadow-[6px_6px_0_rgba(20,184,166,0.5)] hover:-translate-x-0.5 hover:-translate-y-0.5 before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-gradient-to-b before:rounded-l",
  {
    variants: {
      variant: {
        default:
          "bg-cyan-50 border-teal-400 text-teal-900 before:from-teal-400 before:to-cyan-300 shadow-teal-200/60",
        destructive:
          "bg-red-50 border-red-400 text-red-700 before:from-red-400 before:to-red-300 shadow-red-200/60 [&>svg]:text-red-500",
        warning:
          "bg-amber-50 border-amber-400 text-amber-800 before:from-amber-400 before:to-orange-300 shadow-amber-200/60 [&>svg]:text-amber-500",
        success:
          "bg-emerald-50 border-emerald-400 text-emerald-800 before:from-emerald-400 before:to-green-300 shadow-emerald-200/60 [&>svg]:text-emerald-500",
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
      "mb-1 font-bold leading-none tracking-[0.05em] text-base uppercase",
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
    className={cn("text-sm leading-relaxed opacity-90", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };

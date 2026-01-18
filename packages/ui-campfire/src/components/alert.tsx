import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const alertVariants = cva(
  "relative w-full rounded-xl border-2 p-4 [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]",
  {
    variants: {
      variant: {
        default: "bg-amber-50 border-amber-300 text-amber-900 shadow-[0_0_8px_rgba(245,158,11,0.2)]",
        destructive:
          "bg-red-50 border-red-300 text-red-700 shadow-[0_0_8px_rgba(220,38,38,0.2)] [&>svg]:text-red-500",
        warning:
          "bg-orange-50 border-orange-300 text-orange-700 shadow-[0_0_8px_rgba(234,88,12,0.2)] [&>svg]:text-orange-500",
        success:
          "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-[0_0_8px_rgba(16,185,129,0.2)] [&>svg]:text-emerald-500",
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
    className={cn("mb-1 font-bold leading-none tracking-tight", className)}
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
    className={cn("text-sm leading-relaxed opacity-85", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

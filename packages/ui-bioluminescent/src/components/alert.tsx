import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const alertVariants = cva(
  "relative w-full border p-4 backdrop-blur-sm [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#14b8a6]/5 before:to-[#d946ef]/5 before:pointer-events-none rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-slate-900/80 border-cyan-500/30 text-cyan-100 shadow-[0_0_25px_rgba(20,184,166,0.2),inset_0_0_15px_rgba(20,184,166,0.05)]",
        destructive:
          "bg-slate-900/80 border-red-500/50 text-red-300 shadow-[0_0_25px_rgba(239,68,68,0.2),inset_0_0_15px_rgba(239,68,68,0.05)] [&>svg]:text-red-400",
        warning:
          "bg-slate-900/80 border-magenta-500/50 text-magenta-200 shadow-[0_0_25px_rgba(217,70,239,0.2),inset_0_0_15px_rgba(217,70,239,0.05)] [&>svg]:text-magenta-400",
        success:
          "bg-slate-900/80 border-teal-500/50 text-teal-200 shadow-[0_0_25px_rgba(20,184,166,0.2),inset_0_0_15px_rgba(20,184,166,0.05)] [&>svg]:text-teal-400",
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
      className
    )}
    style={{ textShadow: "0 0 12px currentColor" }}
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

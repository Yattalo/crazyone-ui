import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const alertVariants = cva(
  "relative w-full border p-4 backdrop-blur-sm [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#b91c1c]/5 before:to-transparent before:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-[hsl(0,0%,3%)]/80 border-[#b91c1c]/40 text-[hsl(0,0%,95%)] shadow-[0_0_30px_#b91c1c,inset_0_0_60px_rgba(185,28,28,0.05)]",
        destructive:
          "bg-[#b91c1c]/10 border-[#b91c1c]/60 text-[#ff4444] shadow-[0_0_30px_rgba(185,28,28,0.4)] [&>svg]:text-[#ff4444]",
        warning:
          "bg-[#7f1d1d]/5 border-[#b91c1c]/50 text-[#fca5a5] shadow-[0_0_20px_rgba(185,28,28,0.2)] [&>svg]:text-[#fca5a5]",
        success:
          "bg-[#b91c1c]/5 border-[#b91c1c]/40 text-[#fecaca] shadow-[0_0_20px_rgba(185,28,28,0.15)] [&>svg]:text-[#fecaca]",
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
    style={{ textShadow: "0 0 8px rgba(185, 28, 28, 0.4)" }}
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

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const alertVariants = cva(
  "relative w-full border p-4 backdrop-blur-sm [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ec4899]/10 before:to-[#3b82f6]/10 before:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-[#0a0a0a]/95 border-[#ec4899]/40 text-foreground shadow-[0_0_30px_rgba(236,72,153,0.3),0_0_60px_rgba(59,130,246,0.15)]",
        destructive:
          "bg-[#1a0a0a]/95 border-destructive/60 text-destructive shadow-[0_0_30px_rgba(239,68,68,0.3)] [&>svg]:text-destructive",
        warning:
          "bg-[#1a0a0a]/95 border-[#ec4899]/60 text-[#ec4899] shadow-[0_0_30px_rgba(236,72,153,0.4)] [&>svg]:text-[#ec4899]",
        success:
          "bg-[#0a1a0a]/95 border-[#3b82f6]/60 text-[#3b82f6] shadow-[0_0_30px_rgba(59,130,246,0.4)] [&>svg]:text-[#3b82f6]",
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
      "relative z-10 mb-1 font-black uppercase tracking-widest",
      className
    )}
    style={{ textShadow: "0 0 15px currentColor" }}
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
    className={cn("relative z-10 text-sm leading-relaxed opacity-90", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

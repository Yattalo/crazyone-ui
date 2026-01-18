import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const alertVariants = cva(
  "relative w-full rounded-sm border-2 border-[hsl(280,100%,60%)] bg-gradient-to-b from-[hsl(280,60%,15%)] to-[hsl(280,50%,8%)] p-4 text-sm text-[hsl(280,100%,70%)] shadow-[0_0_15px_hsl(280,100%,60%,0.3),inset_0_0_20px_hsl(280,100%,60%,0.05)] overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(transparent_49%,rgba(190,100,255,0.1)_50%)] before:bg-[length:100%_4px] before:pointer-events-none transition-all duration-300 hover:shadow-[0_0_25px_hsl(280,100%,60%,0.5),inset_0_0_30px_hsl(280,100%,60%,0.1)]",
  {
    variants: {
      variant: {
        default: "border-[hsl(280,100%,60%)] text-[hsl(280,100%,70%)]",
        destructive: "border-[hsl(0,100%,60%)] text-[hsl(0,100%,70%)] shadow-[0_0_15px_hsl(0,100%,60%,0.3),inset_0_0_20px_hsl(0,100%,60%,0.05)] before:bg-[linear-gradient(transparent_49%,rgba(255,100,100,0.1)_50%)]",
        success: "border-[hsl(120,100%,60%)] text-[hsl(120,100%,70%)] shadow-[0_0_15px_hsl(120,100%,60%,0.3),inset_0_0_20px_hsl(120,100%,60%,0.05)] before:bg-[linear-gradient(transparent_49%,rgba(100,255,100,0.1)_50%)]",
        info: "border-[hsl(200,100%,60%)] text-[hsl(200,100%,70%)] shadow-[0_0_15px_hsl(200,100%,60%,0.3),inset_0_0_20px_hsl(200,100%,60%,0.05)] before:bg-[linear-gradient(transparent_49%,rgba(100,200,255,0.1)_50%)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant, className }))}
      {...props}
    />
  )
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("relative z-10 mb-1 font-bold tracking-wide uppercase", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative z-10 text-sm opacity-90", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };

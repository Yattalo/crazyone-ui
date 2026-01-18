import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const alertVariants = cva(
  "relative w-full px-4 py-3 text-sm rounded-none border transition-all duration-300 bg-gradient-to-b from-[hsl(0,0%,7%)] to-[hsl(0,0%,5%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_4px_15px_rgba(0,0,0,0.4)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.02] before:to-transparent before:pointer-events-none [&>svg~*]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-current [&>svg+div]:ml-7",
  {
    variants: {
      variant: {
        default: "border-[hsl(0,0%,18%)] text-foreground",
        destructive:
          "border-[hsl(0,84%,60%,0.3)] bg-gradient-to-b from-[hsl(0,50%,8%)] to-[hsl(0,50%,5%)] text-destructive shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_4px_15px_rgba(239,68,68,0.15)]",
        warning:
          "border-[hsl(38,92%,50%,0.3)] bg-gradient-to-b from-[hsl(38,80%,8%)] to-[hsl(38,80%,5%)] text-yellow-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_4px_15px_rgba(217,119,6,0.15)]",
        success:
          "border-[hsl(142,76%,36%,0.3)] bg-gradient-to-b from-[hsl(142,70%,8%)] to-[hsl(142,70%,5%)] text-green-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_4px_15px_rgba(34,197,94,0.15)]",
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
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-tight tracking-tight", className)}
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
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };

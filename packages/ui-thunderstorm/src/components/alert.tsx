import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";
import { AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";

const alertVariants = cva(
  "relative w-full px-4 py-3 rounded-sm border transition-all duration-200 flex gap-3 items-start [&>svg]:mt-0.5 [&>svg]:size-5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(220,30%,15%)] border-[hsl(55,95%,60%,0.4)] text-foreground shadow-[0_0_15px_hsl(55,95%,60%,0.2)] hover:shadow-[0_0_25px_hsl(55,95%,60%,0.3)] hover:border-[hsl(55,95%,60%,0.6)]",
        destructive:
          "bg-gradient-to-r from-[hsl(0,84%,40%,0.15)] to-[hsl(0,84%,40%,0.05)] border-[hsl(0,84%,50%,0.5)] text-[hsl(0,84%,60%)] shadow-[0_0_15px_hsl(0,84%,50%,0.2)] hover:shadow-[0_0_25px_hsl(0,84%,50%,0.3)]",
        success:
          "bg-gradient-to-r from-[hsl(120,60%,40%,0.15)] to-[hsl(120,60%,40%,0.05)] border-[hsl(120,60%,50%,0.5)] text-[hsl(120,60%,60%)] shadow-[0_0_15px_hsl(120,60%,50%,0.2)] hover:shadow-[0_0_25px_hsl(120,60%,50%,0.3)]",
        warning:
          "bg-gradient-to-r from-[hsl(38,92%,50%,0.15)] to-[hsl(38,92%,50%,0.05)] border-[hsl(38,92%,60%,0.5)] text-[hsl(38,92%,70%)] shadow-[0_0_15px_hsl(38,92%,60%,0.2)] hover:shadow-[0_0_25px_hsl(38,92%,60%,0.3)]",
        electric:
          "bg-gradient-to-r from-[hsl(185,100%,50%,0.15)] to-[hsl(270,100%,50%,0.05)] border-[hsl(185,100%,50%,0.6)] text-[hsl(185,100%,65%)] shadow-[0_0_15px_hsl(185,100%,50%,0.4),0_0_30px_hsl(270,100%,50%,0.2)] hover:shadow-[0_0_25px_hsl(185,100%,50%,0.6),0_0_40px_hsl(270,100%,50%,0.3)]",
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

export {
  Alert,
  AlertTitle,
  AlertDescription,
  alertVariants,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
};

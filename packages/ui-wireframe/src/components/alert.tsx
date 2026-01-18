import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const alertVariants = cva(
  "relative w-full px-6 py-4 text-sm rounded-none border-2 border-dashed border-foreground bg-transparent font-mono transition-all duration-200 animate-[wireframe-wobble_4s_ease-in-out_infinite] shadow-[2px_2px_0_-1px_hsl(var(--background)),3px_3px_0_-1px_currentColor] before:absolute before:-top-5 before:left-2 before:text-[0.65em] before:text-muted-foreground before:tracking-wider hover:border-solid hover:shadow-[3px_3px_0_-1px_hsl(var(--background)),4px_4px_0_-1px_currentColor]",
  {
    variants: {
      variant: {
        default: "border-foreground text-foreground",
        destructive: "border-destructive text-destructive before:content-['ERROR']",
        warning: "border-yellow-600 text-yellow-900 before:content-['WARN']",
        success: "border-green-600 text-green-900 before:content-['OK']",
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
  ({ className, variant, ...props }, ref) => {
    const variantLabelMap = {
      default: "ALERT",
      destructive: "ERROR",
      warning: "WARN",
      success: "OK",
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, className }))}
        style={{
          "--alert-label": `"${variantLabelMap[variant || "default"]}"`,
        } as React.CSSProperties}
        {...props}
      />
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-1 font-bold leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };

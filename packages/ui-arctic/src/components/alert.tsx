import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default:
          "bg-white/5 border-white/20 backdrop-blur-md text-foreground shadow-[0_0_20px_rgba(100,200,255,0.2),0_4px_12px_rgba(0,0,0,0.15)] before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-[hsl(195,95%,60%)] before:via-transparent before:to-transparent before:opacity-0 before:pointer-events-none hover:before:opacity-5",
        destructive:
          "bg-red-900/10 border-red-500/30 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.2)] before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-red-500 before:to-transparent before:opacity-0 before:pointer-events-none hover:before:opacity-5",
        success:
          "bg-green-900/10 border-green-500/30 text-green-100 shadow-[0_0_20px_rgba(34,197,94,0.2)] before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-green-500 before:to-transparent before:opacity-0 before:pointer-events-none hover:before:opacity-5",
        warning:
          "bg-yellow-900/10 border-yellow-500/30 text-yellow-100 shadow-[0_0_20px_rgba(234,179,8,0.2)] before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-yellow-500 before:to-transparent before:opacity-0 before:pointer-events-none hover:before:opacity-5",
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
    className={cn("relative mb-1 font-medium leading-tight tracking-tight", className)}
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
    className={cn("relative text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const alertVariants = cva(
  "relative w-full border-2 border-current p-4 font-mono uppercase tracking-wider shadow-[4px_4px_0_0_currentColor] [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive bg-destructive/10 text-destructive shadow-[4px_4px_0_0_hsl(var(--destructive))] [&>svg]:text-destructive",
        warning:
          "border-[#ff6600] bg-[#ff6600]/10 text-[#ff6600] shadow-[4px_4px_0_0_#ff6600] [&>svg]:text-[#ff6600]",
        success:
          "border-green-600 bg-green-600/10 text-green-600 shadow-[4px_4px_0_0_#16a34a] [&>svg]:text-green-600",
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
    className={cn("mb-1 text-sm font-bold leading-none tracking-[0.2em]", className)}
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
    className={cn("text-xs leading-relaxed opacity-80 normal-case tracking-normal", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

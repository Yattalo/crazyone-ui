import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const alertVariants = cva(
  "relative w-full rounded-none border-double border-4 p-4 text-sm transition-all duration-200 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-[#0d0d0d] border-[#d4af37] text-[#e8d5b7] shadow-[0_8px_24px_rgba(212,175,55,0.15),inset_0_1px_1px_rgba(212,175,55,0.1)]",
        destructive: "bg-[#1a1a1a] border-[#dc2626] text-[#fecaca] shadow-[0_8px_24px_rgba(220,38,38,0.15),inset_0_1px_1px_rgba(220,38,38,0.1)]",
        warning: "bg-[#0d0d0d] border-[#f59e0b] text-[#fbbf24] shadow-[0_8px_24px_rgba(245,158,11,0.15),inset_0_1px_1px_rgba(245,158,11,0.1)]",
        success: "bg-[#0d0d0d] border-[#10b981] text-[#86efac] shadow-[0_8px_24px_rgba(16,185,129,0.15),inset_0_1px_1px_rgba(16,185,129,0.1)]",
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
      className={cn(alertVariants({ variant }), className)}
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
    className={cn("mb-1 font-semibold leading-tight tracking-wide uppercase", className)}
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

export { Alert, AlertTitle, AlertDescription };

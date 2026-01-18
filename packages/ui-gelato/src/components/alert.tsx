import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const alertVariants = cva(
  "relative w-full rounded-2xl border p-4 [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-[#fce7f3] to-[#fdf2f8] border-[#fbcfe8] text-[#be185d] shadow-lg shadow-[#f3e8ff]/20 [&>svg]:text-[#f472b6]",
        success:
          "bg-gradient-to-br from-[#d1fae5] to-[#ecfdf5] border-[#a7f3d0] text-[#065f46] shadow-lg shadow-[#d1fae5]/20 [&>svg]:text-[#6ee7b7]",
        warning:
          "bg-gradient-to-br from-[#fed7aa] to-[#fef3c7] border-[#fdba74] text-[#92400e] shadow-lg shadow-[#fed7aa]/20 [&>svg]:text-[#fb923c]",
        info: "bg-gradient-to-br from-[#ede9fe] to-[#f5f3ff] border-[#ddd6fe] text-[#6b21a8] shadow-lg shadow-[#ede9fe]/20 [&>svg]:text-[#c084fc]",
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

// Gelato Alert: Soft pastel alert with rounded corners
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
    className={cn("text-sm leading-relaxed opacity-90", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

import * as React from "react";
import { cn } from "@crazyone/ui-core";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Maia Input: Minimal input with subtle gray focus
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded border border-foreground/20 bg-background px-3 py-1 text-sm placeholder:text-muted-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:border-foreground/40 focus-visible:ring-1 focus-visible:ring-foreground/10 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };

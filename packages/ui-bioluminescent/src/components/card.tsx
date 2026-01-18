import * as React from "react";
import { cn } from "@crazyone/ui-core";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative text-card-foreground transition-all duration-300 rounded-3xl bg-[hsl(210,80%,5%,0.9)] backdrop-blur-md border border-[hsl(170,100%,60%,0.2)] shadow-[0_0_30px_hsl(170,100%,60%,0.2),inset_0_0_40px_hsl(170,100%,60%,0.05)] overflow-hidden animate-[bioluminescent-pulse_4s_ease-in-out_infinite] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_30%,hsl(170,100%,60%,0.1)_1px,transparent_1px),radial-gradient(circle_at_80%_20%,hsl(170,100%,70%,0.08)_1px,transparent_1px),radial-gradient(circle_at_40%_70%,hsl(180,100%,60%,0.1)_1px,transparent_1px)] before:bg-[length:100px_100px] before:pointer-events-none hover:shadow-[0_0_50px_hsl(170,100%,60%,0.35),0_0_80px_hsl(170,100%,60%,0.2),inset_0_0_50px_hsl(170,100%,60%,0.1)] hover:border-[hsl(170,100%,60%,0.4)] hover:animate-[bioluminescent-intensify_2s_ease-in-out_infinite]",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };

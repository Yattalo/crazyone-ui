import * as React from "react";
import { cn } from "@crazyone/ui-core";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative text-card-foreground transition-all duration-300 rounded-sm bg-gradient-to-b from-[hsl(340,50%,8%)] to-[hsl(340,40%,5%)] backdrop-blur border border-[hsl(330,100%,54%,0.2)] shadow-[0_0_30px_hsl(330,100%,54%,0.15),inset_0_0_60px_rgba(0,0,0,0.5)] overflow-hidden before:absolute before:top-0 before:left-[-100%] before:w-[200%] before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[hsl(330,100%,60%)] before:to-transparent before:animate-[nightclub-laser_3s_linear_infinite] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/[0.02] after:to-transparent after:pointer-events-none hover:shadow-[0_0_50px_hsl(330,100%,54%,0.25),0_0_80px_hsl(45,100%,50%,0.15),inset_0_0_60px_rgba(0,0,0,0.4)] hover:border-[hsl(330,100%,54%,0.4)]",
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

import * as React from "react";
import { cn } from "@crazyone/ui-core";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative text-card-foreground transition-all duration-300 rounded-2xl bg-[hsl(140,35%,20%,0.9)] backdrop-blur-sm border border-[hsl(140,40%,35%,0.3)] shadow-[0_0_20px_hsl(140,40%,35%,0.15),0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22100%22%20height=%22100%22%3E%3Cpath%20d=%22M50,0%20L50,100%22%20stroke=%22rgba(255,255,255,0.03)%22%20stroke-width=%221%22%20fill=%22none%22/%3E%3Cpath%20d=%22M50,20%20L20,40%22%20stroke=%22rgba(255,255,255,0.02)%22%20stroke-width=%220.5%22%20fill=%22none%22/%3E%3Cpath%20d=%22M50,20%20L80,40%22%20stroke=%22rgba(255,255,255,0.02)%22%20stroke-width=%220.5%22%20fill=%22none%22/%3E%3C/svg%3E')] before:bg-[length:50px_50px] before:pointer-events-none hover:shadow-[0_0_35px_hsl(140,45%,40%,0.25),0_12px_40px_rgba(0,0,0,0.35)] hover:border-[hsl(140,40%,40%,0.4)] hover:animate-[greenhouse-sway_4s_ease-in-out_infinite]",
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

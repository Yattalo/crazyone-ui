import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@crazyone/ui-core";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-sm bg-gradient-to-b from-[hsl(280,60%,15%)] to-[hsl(280,50%,8%)] p-1 border border-[hsl(280,100%,60%,0.3)] shadow-[0_0_15px_hsl(280,100%,60%,0.2),inset_0_0_15px_hsl(280,100%,60%,0.05)] relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(transparent_49%,rgba(190,100,255,0.05)_50%)] before:bg-[length:100%_2px] before:pointer-events-none",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 relative z-10 text-[hsl(280,100%,60%)] hover:text-[hsl(280,100%,70%)] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-[hsl(280,100%,70%)] data-[state=active]:shadow-[0_0_15px_hsl(280,100%,60%,0.5),inset_0_0_10px_hsl(280,100%,60%,0.2)] data-[state=active]:bg-[hsl(280,100%,60%,0.1)] data-[state=active]:border-b-2 data-[state=active]:border-[hsl(280,100%,60%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(190,100,255,0.2),transparent)] before:animate-[synthwave-scan_2s_linear_infinite] before:opacity-0 data-[state=active]:before:opacity-100 data-[state=active]:hover:shadow-[0_0_25px_hsl(280,100%,60%,0.7),0_0_40px_hsl(190,100%,50%,0.2),inset_0_0_15px_hsl(280,100%,60%,0.3)]",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "relative z-10 mt-2 rounded-sm border border-[hsl(280,100%,60%,0.3)] bg-gradient-to-b from-[hsl(280,60%,15%)] to-[hsl(280,50%,8%)] p-4 shadow-[0_0_15px_hsl(280,100%,60%,0.2),inset_0_0_20px_hsl(280,100%,60%,0.05)] overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(transparent_49%,rgba(190,100,255,0.05)_50%)] before:bg-[length:100%_2px] before:pointer-events-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-in fade-in-50 zoom-in-95",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

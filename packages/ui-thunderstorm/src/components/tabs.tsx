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
      "inline-flex h-10 items-center justify-center rounded-sm bg-[hsl(220,30%,18%)] p-1 text-muted-foreground border border-[hsl(55,95%,60%,0.2)] shadow-[0_0_10px_hsl(55,95%,60%,0.1)]",
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
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "text-foreground/70 hover:text-foreground hover:shadow-[0_0_8px_hsl(55,95%,60%,0.2)]",
      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(185,100%,50%,0.2)] data-[state=active]:to-[hsl(270,100%,50%,0.2)] data-[state=active]:text-[hsl(185,100%,65%)] data-[state=active]:shadow-[0_0_15px_hsl(185,100%,50%,0.4),inset_0_0_10px_hsl(185,100%,50%,0.1)] data-[state=active]:font-bold data-[state=active]:tracking-wider",
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
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm p-4 bg-[hsl(220,30%,16%,0.5)] border border-[hsl(55,95%,60%,0.1)] shadow-[0_0_15px_hsl(55,95%,60%,0.05),inset_0_0_20px_hsl(185,100%,50%,0.03)] animate-in fade-in-50 zoom-in-95",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

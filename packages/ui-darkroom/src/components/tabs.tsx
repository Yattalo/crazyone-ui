import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@crazyone/ui-core";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center gap-px bg-[hsl(0,0%,5%)] border-2 border-[#b91c1c]/40 font-serif shadow-[0_0_20px_rgba(185,28,28,0.1)]",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-widest ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b91c1c] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-x border-[#b91c1c]/20 first:border-l-0 last:border-r-0 text-[hsl(0,0%,60%)] hover:text-[#fca5a5] hover:bg-[#7f1d1d]/10 data-[state=active]:bg-[#7f1d1d]/30 data-[state=active]:text-[#fca5a5] data-[state=active]:shadow-[0_0_20px_rgba(185,28,28,0.4),inset_0_0_15px_rgba(185,28,28,0.1)]",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 p-4 bg-[hsl(0,0%,3%)]/95 border-2 border-[#b91c1c]/40 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b91c1c] focus-visible:ring-offset-2 font-serif text-sm text-[hsl(0,0%,85%)] shadow-[0_0_30px_rgba(185,28,28,0.15),inset_0_0_50px_rgba(185,28,28,0.02)]",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

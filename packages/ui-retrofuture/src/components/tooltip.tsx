import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@crazyone/ui-core";

// Retrofuture Tooltip: Space age styling with atomic-age design
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-lg bg-gradient-to-b from-teal-400 to-cyan-400 px-3 py-2 text-sm font-bold text-white border-2 border-teal-500 uppercase tracking-wide shadow-[4px_4px_0_rgba(20,184,166,0.4)] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 before:absolute before:w-2 before:h-2 before:bg-teal-300 before:rounded-full before:-top-1 before:left-1/2 before:-translate-x-1/2 after:absolute after:w-2 after:h-2 after:bg-teal-300 after:rounded-full after:-bottom-1 after:left-1/2 after:-translate-x-1/2",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

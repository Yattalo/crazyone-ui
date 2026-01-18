import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@crazyone/ui-core";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 rounded-none border-2 border-double border-[#d4af37] bg-[#1a1a1a] px-3 py-1.5 text-xs text-[#d4af37] font-serif uppercase tracking-[0.15em] shadow-[0_12px_32px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(212,175,55,0.15)] animate-in fade-in-0 zoom-in-95 data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 before:absolute before:h-2 before:w-2 before:rotate-45 before:rounded-none before:border-b-2 before:border-l-2 before:border-[#d4af37] before:bg-[#1a1a1a] data-[side=bottom]:before:-top-1 data-[side=bottom]:before:left-1/2 data-[side=bottom]:before:-translate-x-1/2 data-[side=top]:before:-bottom-1 data-[side=top]:before:left-1/2 data-[side=top]:before:-translate-x-1/2 data-[side=left]:before:-right-1 data-[side=left]:before:top-1/2 data-[side=left]:before:-translate-y-1/2 data-[side=right]:before:-left-1 data-[side=right]:before:top-1/2 data-[side=right]:before:-translate-y-1/2",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

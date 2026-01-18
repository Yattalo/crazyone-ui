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
      "z-50 overflow-hidden rounded-sm bg-gradient-to-b from-[hsl(220,30%,25%)] to-[hsl(230,25%,15%)] px-3 py-1.5 text-xs font-semibold text-[hsl(185,100%,65%)] border border-[hsl(185,100%,50%,0.5)] shadow-[0_0_20px_hsl(185,100%,50%,0.4),0_0_40px_hsl(270,100%,50%,0.1),0_10px_30px_rgba(0,0,0,0.5)] animate-in fade-in-0 zoom-in-95 data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2220%22%20height=%2220%22%3E%3Cline%20x1=%220%22%20y1=%220%22%20x2=%2220%22%20y2=%2220%22%20stroke=%22rgba(56,189,248,0.1)%22%20stroke-width=%220.5%22/%3E%3C/svg%3E')] before:opacity-50 before:pointer-events-none",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

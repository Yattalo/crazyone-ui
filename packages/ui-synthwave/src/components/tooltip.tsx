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
      "z-50 overflow-hidden rounded-sm border border-[hsl(280,100%,60%)] bg-gradient-to-b from-[hsl(280,60%,15%)] to-[hsl(280,50%,8%)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[hsl(280,100%,70%)] shadow-[0_0_20px_hsl(280,100%,60%,0.4),inset_0_0_15px_hsl(280,100%,60%,0.1)] animate-in fade-in-0 zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(transparent_49%,rgba(190,100,255,0.08)_50%)] before:bg-[length:100%_2px] before:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-[hsl(280,100%,70%,0.2)] after:to-transparent after:animate-[synthwave-shine_2s_ease-in-out_infinite]",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

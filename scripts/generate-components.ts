#!/usr/bin/env bun

/**
 * Component Generator for @crazyone Design System
 * Generates all form components with theme-specific styling
 */

import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

interface ThemeStyles {
  id: string;
  buttonBase: string;
  buttonHover: string;
  inputBase: string;
  inputFocus: string;
  checkboxBase: string;
  switchBase: string;
  sliderTrack: string;
  sliderThumb: string;
  selectTrigger: string;
  cardBase: string;
  specialEffects: string;
}

// Theme-specific styling overrides
const themeStyles: Record<string, Partial<ThemeStyles>> = {
  brutalist: {
    buttonBase: "uppercase tracking-widest font-mono border-2 border-current shadow-[4px_4px_0_0_currentColor]",
    buttonHover: "hover:shadow-[6px_6px_0_0_currentColor] hover:-translate-x-0.5 hover:-translate-y-0.5",
    inputBase: "border-2 border-foreground font-mono uppercase tracking-wide shadow-[3px_3px_0_0_hsl(var(--foreground))]",
    inputFocus: "focus:shadow-[5px_5px_0_0_hsl(var(--primary))] focus:border-primary",
    checkboxBase: "border-2 border-foreground data-[state=checked]:shadow-[2px_2px_0_0_hsl(var(--primary))]",
    cardBase: "border-2 border-foreground shadow-[8px_8px_0_0_hsl(var(--foreground))]",
    specialEffects: "before:content-['['] after:content-[']'] before:text-muted-foreground after:text-muted-foreground",
  },
  vaporwave: {
    buttonBase: "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#FF6AD5] before:to-[#01CDFE] before:opacity-0 before:transition-opacity",
    buttonHover: "hover:before:opacity-20 hover:shadow-[0_0_20px_rgba(255,106,213,0.5),0_0_40px_rgba(1,205,254,0.3)]",
    inputBase: "bg-background/50 backdrop-blur border border-primary/30",
    inputFocus: "focus:border-primary focus:shadow-[0_0_15px_rgba(255,106,213,0.4),-2px_0_0_rgba(255,106,213,0.5),2px_0_0_rgba(1,205,254,0.5)]",
    checkboxBase: "border-primary/50 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-[#FF6AD5] data-[state=checked]:to-[#01CDFE]",
    cardBase: "bg-card/80 backdrop-blur-sm border border-primary/20 shadow-[0_0_30px_rgba(255,106,213,0.1)]",
    specialEffects: "animate-vhs-flicker",
  },
  obsidian: {
    buttonBase: "relative bg-gradient-to-b from-card to-background border-0 after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/10 after:to-transparent after:opacity-50",
    buttonHover: "hover:after:opacity-80 hover:shadow-[0_4px_20px_rgba(233,69,96,0.3)]",
    inputBase: "bg-background/50 border border-border/50 backdrop-blur-sm",
    inputFocus: "focus:border-primary focus:shadow-[0_0_0_1px_hsl(var(--primary)),0_4px_15px_rgba(233,69,96,0.2)]",
    checkboxBase: "border-border/50 bg-background/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary",
    cardBase: "bg-gradient-to-b from-card to-background border-border/30 before:absolute before:top-0 before:left-8 before:right-8 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/50 before:to-transparent",
    specialEffects: "after:absolute after:inset-0 after:bg-[linear-gradient(135deg,transparent_40%,hsl(var(--primary)/0.03)_50%,transparent_60%)]",
  },
  bubblegum: {
    buttonBase: "rounded-full font-bold transition-all duration-300 active:scale-95 shadow-lg",
    buttonHover: "hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30",
    inputBase: "rounded-2xl border-2 border-primary/20 bg-background shadow-inner",
    inputFocus: "focus:border-primary focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_0_0_3px_hsl(var(--primary)/0.2)]",
    checkboxBase: "rounded-lg border-2 data-[state=checked]:animate-bounce-once data-[state=checked]:bg-primary",
    switchBase: "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary",
    cardBase: "rounded-3xl border-2 border-primary/10 shadow-lg shadow-primary/5 hover:shadow-xl transition-shadow",
    specialEffects: "active:scale-[0.98] transition-transform",
  },
  wireframe: {
    buttonBase: "border-2 border-dashed border-foreground bg-transparent relative",
    buttonHover: "hover:border-solid hover:bg-foreground hover:text-background",
    inputBase: "border-2 border-dashed border-foreground bg-transparent rounded-none",
    inputFocus: "focus:border-solid focus:border-accent",
    checkboxBase: "border-2 border-dashed border-foreground rounded-none data-[state=checked]:border-solid",
    cardBase: "border-2 border-dashed border-foreground bg-transparent rounded-sm",
    specialEffects: "[&]:font-sketch",
  },
  terracotta: {
    buttonBase: "bg-gradient-to-b from-primary to-primary/90 rounded-lg shadow-md shadow-primary/20",
    buttonHover: "hover:shadow-lg hover:shadow-primary/30 hover:from-primary/95",
    inputBase: "rounded-lg border border-border bg-card shadow-inner shadow-primary/5",
    inputFocus: "focus:border-primary focus:ring-2 focus:ring-primary/20",
    checkboxBase: "rounded-md border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary",
    cardBase: "rounded-xl border border-border/50 bg-gradient-to-b from-card to-background shadow-lg shadow-primary/5",
    specialEffects: "decoration-wavy",
  },
  cyberdeck: {
    buttonBase: "font-mono uppercase tracking-[0.2em] border border-primary bg-transparent text-primary relative overflow-hidden",
    buttonHover: "hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--primary)/0.5),inset_0_0_20px_hsl(var(--primary)/0.1)]",
    inputBase: "font-mono bg-background border border-primary/50 text-primary caret-primary",
    inputFocus: "focus:border-primary focus:shadow-[0_0_10px_hsl(var(--primary)/0.3),inset_0_0_5px_hsl(var(--primary)/0.1)]",
    checkboxBase: "border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_0_8px_hsl(var(--primary))]",
    cardBase: "border border-primary/30 bg-background/95 shadow-[0_0_15px_hsl(var(--primary)/0.1)]",
    specialEffects: "after:content-['█'] after:animate-cursor-blink after:ml-1 after:text-primary",
  },
  gelato: {
    buttonBase: "rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground shadow-md",
    buttonHover: "hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
    inputBase: "rounded-xl border-2 border-transparent bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10",
    inputFocus: "focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]",
    checkboxBase: "rounded-lg border-2 border-primary/30 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-primary data-[state=checked]:to-secondary",
    cardBase: "rounded-2xl border-2 border-transparent bg-gradient-to-br from-primary/5 via-background to-secondary/5 shadow-lg",
    specialEffects: "bg-clip-padding",
  },
  retrofuture: {
    buttonBase: "font-bold uppercase tracking-wide rounded-md shadow-[4px_4px_0_hsl(var(--foreground))]",
    buttonHover: "hover:shadow-[6px_6px_0_hsl(var(--foreground))] hover:-translate-x-0.5 hover:-translate-y-0.5",
    inputBase: "rounded-md border-2 border-foreground shadow-[2px_2px_0_hsl(var(--foreground))]",
    inputFocus: "focus:shadow-[4px_4px_0_hsl(var(--primary))] focus:border-primary",
    checkboxBase: "rounded-sm border-2 border-foreground data-[state=checked]:bg-secondary data-[state=checked]:border-secondary",
    cardBase: "rounded-lg border-2 border-foreground shadow-[6px_6px_0_hsl(var(--foreground))]",
    specialEffects: "before:content-['✦'] before:mr-2 before:text-secondary",
  },
  nightclub: {
    buttonBase: "font-black uppercase tracking-widest border-0 bg-gradient-to-r from-primary to-secondary text-white shadow-lg",
    buttonHover: "hover:shadow-[0_0_30px_hsl(var(--primary)/0.6),0_0_60px_hsl(var(--secondary)/0.4)] hover:scale-105 transition-all",
    inputBase: "bg-background/80 border border-primary/30 backdrop-blur",
    inputFocus: "focus:border-primary focus:shadow-[0_0_20px_hsl(var(--primary)/0.4)]",
    checkboxBase: "border-primary/50 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-primary data-[state=checked]:to-secondary data-[state=checked]:shadow-[0_0_10px_hsl(var(--primary))]",
    cardBase: "bg-card/90 backdrop-blur border border-primary/20 shadow-[0_0_40px_hsl(var(--primary)/0.1)]",
    specialEffects: "animate-pulse-subtle",
  },
  synthwave: {
    buttonBase: "font-bold uppercase border-2 border-primary bg-transparent text-primary",
    buttonHover: "hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--primary)),0_0_60px_hsl(var(--secondary)/0.5)]",
    inputBase: "bg-background/80 border-2 border-primary/40 backdrop-blur",
    inputFocus: "focus:border-primary focus:shadow-[0_0_20px_hsl(var(--primary)/0.3),0_4px_30px_hsl(var(--secondary)/0.2)]",
    checkboxBase: "border-2 border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_0_15px_hsl(var(--primary))]",
    cardBase: "bg-gradient-to-b from-card to-background border border-primary/20",
    specialEffects: "before:absolute before:bottom-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-primary before:via-secondary before:to-accent",
  },
  greenhouse: {
    buttonBase: "rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/20",
    buttonHover: "hover:shadow-lg hover:shadow-primary/30 hover:bg-primary/90",
    inputBase: "rounded-2xl bg-card/50 backdrop-blur border border-primary/20 shadow-inner",
    inputFocus: "focus:border-primary focus:bg-card focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]",
    checkboxBase: "rounded-lg border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary",
    cardBase: "rounded-3xl bg-card/70 backdrop-blur-sm border border-primary/10 shadow-lg",
    specialEffects: "backdrop-filter backdrop-blur-sm",
  },
  blackletter: {
    buttonBase: "uppercase tracking-[0.3em] font-bold border-2 border-current",
    buttonHover: "hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_8px_30px_hsl(var(--primary)/0.3)]",
    inputBase: "border-2 border-foreground bg-transparent uppercase tracking-wide",
    inputFocus: "focus:border-primary focus:shadow-[0_4px_20px_hsl(var(--primary)/0.2)]",
    checkboxBase: "border-2 border-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary",
    cardBase: "border-2 border-foreground bg-card shadow-[0_10px_40px_rgba(0,0,0,0.5)]",
    specialEffects: "first-letter:text-primary first-letter:text-2xl first-letter:font-black",
  },
  bioluminescent: {
    buttonBase: "rounded-3xl bg-primary/90 text-primary-foreground border-0 shadow-[0_0_20px_hsl(var(--primary)/0.4)]",
    buttonHover: "hover:shadow-[0_0_40px_hsl(var(--primary)/0.6),0_0_60px_hsl(var(--secondary)/0.3)] hover:bg-primary",
    inputBase: "rounded-2xl bg-background/50 border border-primary/30 backdrop-blur shadow-[inset_0_0_10px_hsl(var(--primary)/0.1)]",
    inputFocus: "focus:border-primary focus:shadow-[0_0_20px_hsl(var(--primary)/0.3),inset_0_0_15px_hsl(var(--primary)/0.2)]",
    checkboxBase: "rounded-xl border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_0_15px_hsl(var(--primary))]",
    cardBase: "rounded-3xl bg-card/80 backdrop-blur border border-primary/20 shadow-[0_0_30px_hsl(var(--primary)/0.1)]",
    specialEffects: "animate-glow-pulse",
  },
  bauhaus: {
    buttonBase: "font-bold uppercase tracking-wider border-2 border-foreground",
    buttonHover: "hover:bg-foreground hover:text-background",
    inputBase: "border-2 border-foreground bg-transparent",
    inputFocus: "focus:border-primary focus:ring-2 focus:ring-primary",
    checkboxBase: "rounded-none border-2 border-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary",
    cardBase: "border-2 border-foreground bg-card",
    specialEffects: "decoration-4",
  },
  campfire: {
    buttonBase: "rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/30",
    buttonHover: "hover:shadow-lg hover:shadow-primary/40 hover:bg-primary/90",
    inputBase: "rounded-lg bg-card/50 border border-primary/30 shadow-inner shadow-primary/10",
    inputFocus: "focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.2)]",
    checkboxBase: "rounded-md border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_0_8px_hsl(var(--primary)/0.5)]",
    cardBase: "rounded-xl bg-card/80 border border-primary/20 shadow-lg shadow-primary/10",
    specialEffects: "animate-flicker",
  },
  arctic: {
    buttonBase: "rounded-md bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20",
    buttonHover: "hover:shadow-lg hover:shadow-primary/30",
    inputBase: "rounded-md bg-card/80 border border-primary/20 shadow-inner",
    inputFocus: "focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]",
    checkboxBase: "rounded-sm border-primary/30 data-[state=checked]:bg-primary",
    cardBase: "rounded-lg bg-card/90 border border-primary/10 shadow-lg shadow-primary/5",
    specialEffects: "before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,...')] before:opacity-5",
  },
  darkroom: {
    buttonBase: "font-serif tracking-wide border border-primary bg-transparent text-primary",
    buttonHover: "hover:bg-primary hover:text-primary-foreground",
    inputBase: "bg-background/80 border border-primary/50 font-serif",
    inputFocus: "focus:border-primary focus:shadow-[inset_0_0_10px_hsl(var(--primary)/0.1)]",
    checkboxBase: "border-primary/50 data-[state=checked]:bg-primary",
    cardBase: "bg-card border border-primary/30 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]",
    specialEffects: "filter grayscale-[0.2] contrast-[1.1]",
  },
  thunderstorm: {
    buttonBase: "font-bold uppercase tracking-wider bg-primary text-primary-foreground shadow-[4px_4px_0_hsl(var(--foreground)/0.3)]",
    buttonHover: "hover:shadow-[6px_6px_0_hsl(var(--foreground)/0.4)] hover:-translate-x-0.5 hover:-translate-y-0.5",
    inputBase: "bg-background/80 border-2 border-foreground/30 shadow-[2px_2px_0_hsl(var(--foreground)/0.2)]",
    inputFocus: "focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.3)]",
    checkboxBase: "border-2 border-foreground/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary",
    cardBase: "bg-card/90 border border-foreground/20 shadow-lg",
    specialEffects: "animate-flash-occasional",
  },
  hologram: {
    buttonBase: "rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground border-0 shadow-lg",
    buttonHover: "hover:shadow-[0_0_30px_hsl(var(--primary)/0.5),0_0_60px_hsl(var(--secondary)/0.3)] hover:scale-105",
    inputBase: "rounded-xl bg-background/50 border border-primary/30 backdrop-blur",
    inputFocus: "focus:border-primary focus:shadow-[0_0_20px_hsl(var(--primary)/0.2),0_0_40px_hsl(var(--secondary)/0.1)]",
    checkboxBase: "rounded-lg border-primary/40 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-primary data-[state=checked]:via-secondary data-[state=checked]:to-accent",
    cardBase: "rounded-2xl bg-card/70 backdrop-blur border border-primary/20 shadow-[0_0_40px_hsl(var(--primary)/0.05)]",
    specialEffects: "animate-iridescent",
  },
};

// Default fallback styles
const defaultStyles: ThemeStyles = {
  id: "default",
  buttonBase: "font-medium transition-all duration-200",
  buttonHover: "hover:opacity-90",
  inputBase: "rounded-md border border-input bg-background",
  inputFocus: "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  checkboxBase: "rounded border border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  switchBase: "data-[state=checked]:bg-primary",
  sliderTrack: "bg-secondary",
  sliderThumb: "bg-primary shadow-lg",
  selectTrigger: "rounded-md border border-input bg-background",
  cardBase: "rounded-lg border border-border bg-card",
  specialEffects: "",
};

function getThemeStyles(themeId: string): ThemeStyles {
  const overrides = themeStyles[themeId] || {};
  return { ...defaultStyles, id: themeId, ...overrides };
}

// Component templates
function generateButtonComponent(theme: ThemeStyles): string {
  return `import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${theme.buttonBase} ${theme.buttonHover}",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
`;
}

function generateInputComponent(theme: ThemeStyles): string {
  return `import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const inputVariants = cva(
  "flex w-full px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${theme.inputBase} ${theme.inputFocus}",
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive focus:ring-destructive/50",
        success: "border-green-500 focus:ring-green-500/50",
      },
      inputSize: {
        default: "h-10",
        sm: "h-9 text-xs",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, leftIcon, rightIcon, ...props }, ref) => {
    if (leftIcon || rightIcon) {
      return (
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, inputSize, className }),
              leftIcon && "pl-10",
              rightIcon && "pr-10"
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
`;
}

function generateCheckboxComponent(theme: ThemeStyles): string {
  return `import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@crazyone/ui-core";

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${theme.checkboxBase}",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      {props.checked === "indeterminate" ? (
        <Minus className="h-3.5 w-3.5" />
      ) : (
        <Check className="h-3.5 w-3.5" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
`;
}

function generateSwitchComponent(theme: ThemeStyles): string {
  return `import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@crazyone/ui-core";

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input ${theme.switchBase || "data-[state=checked]:bg-primary"}",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
`;
}

function generateSliderComponent(theme: ThemeStyles): string {
  return `import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@crazyone/ui-core";

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full ${theme.sliderTrack || "bg-secondary"}">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary ${theme.sliderThumb || "bg-background shadow-lg"} ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
`;
}

function generateSelectComponent(theme: ThemeStyles): string {
  return `import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@crazyone/ui-core";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all duration-200 ${theme.selectTrigger || theme.inputBase}",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
`;
}

function generateCardComponent(theme: ThemeStyles): string {
  return `import * as React from "react";
import { cn } from "@crazyone/ui-core";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-card-foreground shadow-sm transition-all duration-200 ${theme.cardBase}",
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
`;
}

const themeIds = [
  "brutalist", "vaporwave", "obsidian", "bubblegum", "wireframe",
  "terracotta", "cyberdeck", "gelato", "retrofuture", "nightclub",
  "synthwave", "greenhouse", "blackletter", "bioluminescent", "bauhaus",
  "campfire", "arctic", "darkroom", "thunderstorm", "hologram"
];

async function generateComponentsForTheme(themeId: string, packagesDir: string) {
  const styles = getThemeStyles(themeId);
  const themeName = `ui-${themeId}`;
  const componentsDir = join(packagesDir, themeName, "src", "components");

  await mkdir(componentsDir, { recursive: true });

  // Generate all components
  await writeFile(join(componentsDir, "button.tsx"), generateButtonComponent(styles));
  await writeFile(join(componentsDir, "input.tsx"), generateInputComponent(styles));
  await writeFile(join(componentsDir, "checkbox.tsx"), generateCheckboxComponent(styles));
  await writeFile(join(componentsDir, "switch.tsx"), generateSwitchComponent(styles));
  await writeFile(join(componentsDir, "slider.tsx"), generateSliderComponent(styles));
  await writeFile(join(componentsDir, "select.tsx"), generateSelectComponent(styles));
  await writeFile(join(componentsDir, "card.tsx"), generateCardComponent(styles));

  console.log(`  ✓ ${themeId}`);
}

async function main() {
  const packagesDir = join(process.cwd(), "packages");

  console.log("🧩 Generating components for all themes...\n");

  for (const themeId of themeIds) {
    await generateComponentsForTheme(themeId, packagesDir);
  }

  console.log(`\n✅ Generated components for ${themeIds.length} themes!`);
}

main().catch(console.error);

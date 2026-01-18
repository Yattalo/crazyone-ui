import type { ThemeConfig } from "../schema";

const config: ThemeConfig = {
  themeName: "Cyberdeck",
  themeSlug: "cyberdeck",
  description: "Neon-lit hacker aesthetic with terminal black and matrix green",
  cssStructure: "split-files",
  cssVariables: {
    light: {
      background: "0 0% 5%",
      foreground: "120 100% 62%",
      card: "0 0% 8%",
      "card-foreground": "120 100% 62%",
      popover: "0 0% 8%",
      "popover-foreground": "120 100% 62%",
      primary: "120 100% 50%",
      "primary-foreground": "0 0% 5%",
      secondary: "0 0% 15%",
      "secondary-foreground": "120 100% 62%",
      muted: "0 0% 12%",
      "muted-foreground": "120 40% 45%",
      accent: "180 100% 50%",
      "accent-foreground": "0 0% 5%",
      destructive: "0 84% 60%",
      "destructive-foreground": "0 0% 100%",
      border: "120 60% 25%",
      input: "0 0% 10%",
      ring: "120 100% 50%",
      radius: "0rem",
    },
    customProperties: {
      "--font-family": "'JetBrains Mono', 'Fira Code', monospace",
    },
  },
  animations: [
    {
      name: "cyberdeck-cursor-blink",
      keyframes: `@keyframes cyberdeck-cursor-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}`,
      utilityClass: {
        className: "cyberdeck-cursor",
        cssRule:
          "border-right: 2px solid hsl(var(--primary)); animation: cyberdeck-cursor-blink 1s step-end infinite; padding-right: 4px;",
      },
    },
    {
      name: "cyberdeck-glow-pulse",
      keyframes: `@keyframes cyberdeck-glow-pulse {
  0%, 100% {
    box-shadow:
      0 0 5px hsl(var(--primary)),
      0 0 10px hsl(var(--primary)),
      inset 0 0 5px hsl(var(--primary) / 0.1);
  }
  50% {
    box-shadow:
      0 0 10px hsl(var(--primary)),
      0 0 20px hsl(var(--primary)),
      0 0 30px hsl(var(--primary)),
      inset 0 0 10px hsl(var(--primary) / 0.2);
  }
}`,
      utilityClass: {
        className: "cyberdeck-glow",
        cssRule: "animation: cyberdeck-glow-pulse 2s ease-in-out infinite;",
      },
    },
    {
      name: "cyberdeck-scanline",
      keyframes: `@keyframes cyberdeck-scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}`,
    },
    {
      name: "cyberdeck-flicker",
      keyframes: `@keyframes cyberdeck-flicker {
  0%, 100% { opacity: 1; }
  41% { opacity: 1; }
  42% { opacity: 0.8; }
  43% { opacity: 1; }
  45% { opacity: 0.3; }
  46% { opacity: 1; }
}`,
      utilityClass: {
        className: "cyberdeck-flicker",
        cssRule: "animation: cyberdeck-flicker 4s infinite;",
      },
    },
    {
      name: "cyberdeck-glitch-text",
      keyframes: `@keyframes cyberdeck-glitch-text {
  0%, 100% {
    text-shadow: none;
    transform: translate(0);
  }
  10% {
    text-shadow: -2px 0 #00ff00, 2px 0 #00ffff;
    transform: translate(1px, 0);
  }
  20% {
    text-shadow: 2px 0 #00ff00, -2px 0 #00ffff;
    transform: translate(-1px, 0);
  }
  30% {
    text-shadow: none;
    transform: translate(0);
  }
}`,
      utilityClass: {
        className: "cyberdeck-glitch",
        cssRule: "animation: cyberdeck-glitch-text 0.5s ease-in-out;",
      },
    },
  ],
  componentStyles: {
    button: {
      baseClasses:
        "font-mono uppercase tracking-[0.2em] border border-primary bg-transparent text-primary relative overflow-hidden",
      variantOverrides: {
        default:
          "hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--primary)/0.5),inset_0_0_20px_hsl(var(--primary)/0.1)]",
        destructive: "!bg-destructive !text-destructive-foreground",
        outline: "!bg-transparent !border-2",
        secondary: "!bg-secondary !text-secondary-foreground",
        ghost: "!bg-transparent !shadow-none !border-0 hover:!bg-accent/20",
        link: "!bg-transparent !shadow-none !border-0 underline-offset-4 hover:underline",
      },
      additionalFeatures: [
        "after:absolute after:right-1 after:content-['|'] after:animate-[cyberdeck-cursor-blink_1s_step-end_infinite]",
        "hover:animate-[cyberdeck-glow-pulse_2s_ease-in-out_infinite]",
      ],
    },
    card: {
      baseClasses:
        "border border-primary/30 bg-card text-card-foreground shadow-[0_0_10px_hsl(var(--primary)/0.2)] transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] relative overflow-hidden",
    },
    input: {
      baseClasses:
        "font-mono bg-input border border-primary/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_10px_hsl(var(--primary)/0.3)]",
    },
  },
  themeSignature: "cursor-blink neon-glow matrix-green",
};

export default config;

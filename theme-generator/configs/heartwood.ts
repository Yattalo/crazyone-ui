import type { ThemeConfig } from "../schema";

/**
 * HEARTWOOD THEME
 *
 * Design Direction: Premium Crafted Home & Garden
 * Palette: Earthy-Grounded (terracotta, warm wood, sand) + Deep Teal Accent
 * Signature: Kinetic typography with bold serif personality
 * Motion: Scroll storytelling, cinematic reveals
 *
 * Anti-slop decisions:
 * - NO purple gradients, NO Inter/Roboto
 * - Texture communicates "natural craftsmanship"
 * - Asymmetric spacing, organic shapes
 * - Bold serif typography with variable weight feel
 * - Teal accent used strategically, not everywhere
 */

const config: ThemeConfig = {
  themeName: "Heartwood",
  themeSlug: "heartwood",
  description:
    "Premium crafted home & garden aesthetic - earthy warmth meets deep teal sophistication",
  cssStructure: "split-files", // Needed for scroll storytelling animations

  cssVariables: {
    light: {
      // EARTHY BASE - warm, grounded, tangible
      background: "30 25% 96%", // Warm off-white, like aged linen
      foreground: "25 30% 15%", // Deep warm brown, not black
      card: "35 30% 94%", // Slightly warmer than background
      "card-foreground": "25 30% 15%",
      popover: "30 25% 98%",
      "popover-foreground": "25 30% 15%",

      // PRIMARY: Terracotta - the earthy hero
      primary: "18 65% 45%", // Rich terracotta, not orange
      "primary-foreground": "35 40% 96%", // Warm cream

      // SECONDARY: Warm sand
      secondary: "35 25% 88%", // Sand/linen tone
      "secondary-foreground": "25 30% 20%",

      // MUTED: Soft earth
      muted: "30 15% 90%",
      "muted-foreground": "25 15% 45%",

      // ACCENT: Deep Teal - the sophisticated contrast
      accent: "180 45% 30%", // Deep teal, like aged copper patina
      "accent-foreground": "35 40% 96%",

      // DESTRUCTIVE: Burnt sienna (earthy red, not neon)
      destructive: "10 55% 40%",
      "destructive-foreground": "35 40% 96%",

      // FORM ELEMENTS
      border: "30 20% 82%", // Soft, not harsh
      input: "30 20% 88%",
      ring: "180 45% 30%", // Teal focus ring

      // GENEROUS RADIUS - organic, not sharp
      radius: "0.75rem",
    },

    dark: {
      // DARK MODE: Deep wood tones, not pure black
      background: "25 25% 8%", // Dark walnut
      foreground: "35 20% 90%", // Warm cream text
      card: "25 20% 12%",
      "card-foreground": "35 20% 90%",
      popover: "25 20% 10%",
      "popover-foreground": "35 20% 90%",

      primary: "18 55% 55%", // Lighter terracotta for dark mode
      "primary-foreground": "25 25% 10%",

      secondary: "25 15% 18%",
      "secondary-foreground": "35 20% 85%",

      muted: "25 15% 15%",
      "muted-foreground": "30 10% 55%",

      accent: "180 40% 45%", // Brighter teal for dark
      "accent-foreground": "25 25% 10%",

      destructive: "10 50% 50%",
      "destructive-foreground": "35 40% 96%",

      border: "25 15% 20%",
      input: "25 15% 15%",
      ring: "180 40% 45%",

      radius: "0.75rem",
    },

    customProperties: {
      // Typography: Serif with personality, not generic sans
      "--font-family-display": "'Fraunces', 'Playfair Display', Georgia, serif",
      "--font-family-body": "'Source Serif 4', 'Crimson Pro', Georgia, serif",
      // Texture overlay for premium feel
      "--texture-grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
    },
  },

  animations: [
    // SCROLL STORYTELLING: Cinematic reveal from below
    {
      name: "heartwood-reveal-up",
      keyframes: `@keyframes heartwood-reveal-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
      utilityClass: {
        className: "heartwood-reveal",
        cssRule:
          "animation: heartwood-reveal-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;",
      },
    },

    // STAGGERED CHILDREN: For orchestrated reveals
    {
      name: "heartwood-stagger",
      keyframes: `@keyframes heartwood-stagger {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
      utilityClass: {
        className: "heartwood-stagger",
        cssRule:
          "animation: heartwood-stagger 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; animation-delay: calc(var(--stagger-index, 0) * 100ms);",
      },
    },

    // PREMIUM HOVER: Subtle lift with shadow depth
    {
      name: "heartwood-lift",
      keyframes: `@keyframes heartwood-lift {
  from {
    transform: translateY(0);
    box-shadow: 0 2px 8px hsl(25 30% 15% / 0.08);
  }
  to {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px hsl(25 30% 15% / 0.12), 0 2px 8px hsl(25 30% 15% / 0.08);
  }
}`,
    },

    // KINETIC TEXT: Subtle character spacing animation
    {
      name: "heartwood-text-breathe",
      keyframes: `@keyframes heartwood-text-breathe {
  0%, 100% {
    letter-spacing: 0em;
  }
  50% {
    letter-spacing: 0.02em;
  }
}`,
      utilityClass: {
        className: "heartwood-breathe",
        cssRule: "animation: heartwood-text-breathe 4s ease-in-out infinite;",
      },
    },

    // TEAL ACCENT GLOW: For accent interactions
    {
      name: "heartwood-teal-pulse",
      keyframes: `@keyframes heartwood-teal-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 hsl(180 45% 30% / 0.2);
  }
  50% {
    box-shadow: 0 0 0 8px hsl(180 45% 30% / 0);
  }
}`,
      utilityClass: {
        className: "heartwood-pulse",
        cssRule: "animation: heartwood-teal-pulse 2s ease-in-out infinite;",
      },
    },
  ],

  componentStyles: {
    button: {
      // Premium crafted: substantial weight, not flat
      baseClasses:
        "font-serif font-medium tracking-wide relative overflow-hidden transition-all duration-300 ease-out",
      variantOverrides: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:shadow-md",
        outline:
          "border-2 border-primary/30 bg-transparent text-primary hover:bg-primary/5 hover:border-primary/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-muted/60",
        link: "text-accent underline-offset-4 hover:underline decoration-2",
      },
      additionalFeatures: [
        // Subtle texture overlay for premium feel
        "before:absolute before:inset-0 before:opacity-[0.03] before:bg-[var(--texture-grain)] before:pointer-events-none",
      ],
    },

    card: {
      // Organic shape, tactile shadow
      baseClasses:
        "bg-card text-card-foreground rounded-xl border border-border/50 shadow-[0_2px_8px_hsl(25_30%_15%/0.06)] transition-all duration-300 hover:shadow-[0_8px_24px_hsl(25_30%_15%/0.1)] hover:-translate-y-1",
    },

    input: {
      // Warm, inviting input fields
      baseClasses:
        "bg-input border border-border/60 text-foreground placeholder:text-muted-foreground rounded-lg transition-colors duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20",
    },

    badge: {
      baseClasses:
        "font-serif text-xs font-medium tracking-wide rounded-full px-3 py-1",
      variantOverrides: {
        default: "bg-primary/10 text-primary border border-primary/20",
        secondary: "bg-secondary text-secondary-foreground",
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20",
        outline: "border border-border text-foreground",
      },
    },

    alert: {
      baseClasses:
        "rounded-xl border-l-4 bg-card p-4 shadow-sm [&>svg]:text-current",
      variantOverrides: {
        default: "border-l-accent text-foreground [&>svg]:text-accent",
        destructive:
          "border-l-destructive text-destructive [&>svg]:text-destructive bg-destructive/5",
      },
    },

    dialog: {
      baseClasses:
        "bg-card rounded-2xl shadow-2xl border border-border/30 animate-[heartwood-reveal-up_0.4s_cubic-bezier(0.22,1,0.36,1)]",
    },

    tabs: {
      baseClasses:
        "font-serif border-b border-border/50 data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent transition-colors duration-200",
    },
  },

  themeSignature: "premium-crafted earthy-teal scroll-storytelling serif-kinetic",
};

export default config;

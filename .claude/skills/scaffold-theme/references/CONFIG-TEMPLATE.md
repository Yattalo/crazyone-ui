# Theme Config Template

Copy to `theme-generator/configs/{slug}.ts`:

```typescript
import type { ThemeConfig } from "../schema";

const config: ThemeConfig = {
  themeName: "Theme Name",
  themeSlug: "theme-slug",
  description: "Brief aesthetic description",
  cssStructure: "single-file", // or "split-files" for animations

  cssVariables: {
    light: {
      // All values in HSL format without hsl() wrapper: "H S% L%"
      background: "0 0% 100%",
      foreground: "222.2 47.4% 11.2%",
      card: "0 0% 100%",
      "card-foreground": "222.2 47.4% 11.2%",
      popover: "0 0% 100%",
      "popover-foreground": "222.2 47.4% 11.2%",
      primary: "222.2 47.4% 11.2%",
      "primary-foreground": "210 40% 98%",
      secondary: "210 40% 96.1%",
      "secondary-foreground": "222.2 47.4% 11.2%",
      muted: "210 40% 96.1%",
      "muted-foreground": "215.4 16.3% 46.9%",
      accent: "210 40% 96.1%",
      "accent-foreground": "222.2 47.4% 11.2%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "210 40% 98%",
      border: "214.3 31.8% 91.4%",
      input: "214.3 31.8% 91.4%",
      ring: "222.2 47.4% 11.2%",
      radius: "0.5rem",
    },
    // Optional
    dark: { /* same structure */ },
    customProperties: {
      "--font-family": "'Inter', sans-serif",
    },
  },

  // Optional - requires cssStructure: "split-files"
  animations: [
    {
      name: "fade-in",
      keyframes: `@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }`,
      utilityClass: {
        className: "animate-fade-in",
        cssRule: "animation: fade-in 0.3s ease-in-out;",
      },
    },
  ],

  // Optional - override default component styles
  componentStyles: {
    button: {
      baseClasses: "font-medium transition-colors",
      variantOverrides: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      additionalFeatures: [], // Pseudo-elements, etc.
    },
    card: {
      baseClasses: "rounded-lg border bg-card shadow-sm",
    },
  },

  themeSignature: "descriptive keywords",
};

export default config;
```

## Supported Components

`alert`, `badge`, `button`, `card`, `checkbox`, `dialog`, `input`, `select`, `slider`, `switch`, `tabs`, `tooltip`

## CSS Variable Reference

All tokens are **required** in `cssVariables.light`:

| Token | Purpose |
|-------|---------|
| `background` / `foreground` | Page background and text |
| `card` / `card-foreground` | Card surfaces |
| `primary` / `primary-foreground` | Primary actions |
| `secondary` / `secondary-foreground` | Secondary actions |
| `muted` / `muted-foreground` | Subtle elements |
| `accent` / `accent-foreground` | Highlights |
| `destructive` / `destructive-foreground` | Error states |
| `border`, `input`, `ring` | Form elements |
| `radius` | Border radius (e.g., "0.5rem") |

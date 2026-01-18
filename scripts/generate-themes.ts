#!/usr/bin/env bun

/**
 * Theme Generator for @crazyone Design System
 * Generates the 20 audacious theme packages with their unique styles
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

interface ThemeConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
  };
  radius: string;
  fontFamily: string;
  signature: string;
}

const themes: ThemeConfig[] = [
  {
    id: "brutalist",
    name: "Brutalist",
    tagline: "Raw concrete, zero pretense",
    description: "Exposed structure, harsh shadows, monospace typography",
    colors: {
      background: "0 0% 96%",
      foreground: "0 0% 10%",
      card: "0 0% 100%",
      cardForeground: "0 0% 10%",
      primary: "20 100% 50%",
      primaryForeground: "0 0% 100%",
      secondary: "0 0% 85%",
      secondaryForeground: "0 0% 10%",
      muted: "0 0% 92%",
      mutedForeground: "0 0% 40%",
      accent: "20 100% 50%",
      accentForeground: "0 0% 100%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "0 0% 10%",
      input: "0 0% 10%",
      ring: "20 100% 50%",
    },
    radius: "0rem",
    fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
    signature: "harsh-shadows grid-coords",
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    tagline: "Dead malls, eternal sunset",
    description: "Hot pink and cyan, VHS aesthetic, chromatic aberration",
    colors: {
      background: "270 50% 8%",
      foreground: "180 100% 95%",
      card: "270 50% 12%",
      cardForeground: "180 100% 95%",
      primary: "320 100% 70%",
      primaryForeground: "270 50% 8%",
      secondary: "180 100% 50%",
      secondaryForeground: "270 50% 8%",
      muted: "270 30% 20%",
      mutedForeground: "270 20% 60%",
      accent: "180 100% 50%",
      accentForeground: "270 50% 8%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "320 60% 40%",
      input: "270 30% 25%",
      ring: "320 100% 70%",
    },
    radius: "0rem",
    fontFamily: "'Russo One', 'Impact', sans-serif",
    signature: "vhs-scanlines chromatic-text",
  },
  {
    id: "obsidian",
    name: "Obsidian",
    tagline: "Volcanic glass precision",
    description: "Void black with molten accents, surgical precision",
    colors: {
      background: "0 0% 4%",
      foreground: "0 0% 95%",
      card: "0 0% 6%",
      cardForeground: "0 0% 95%",
      primary: "348 83% 58%",
      primaryForeground: "0 0% 100%",
      secondary: "0 0% 12%",
      secondaryForeground: "0 0% 90%",
      muted: "0 0% 10%",
      mutedForeground: "0 0% 55%",
      accent: "348 83% 58%",
      accentForeground: "0 0% 100%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "0 0% 15%",
      input: "0 0% 12%",
      ring: "348 83% 58%",
    },
    radius: "0.125rem",
    fontFamily: "'Inter', 'SF Pro Display', sans-serif",
    signature: "diagonal-crack glass-depth",
  },
  {
    id: "bubblegum",
    name: "Bubblegum",
    tagline: "Dopamine hits, zero regrets",
    description: "Bouncy pink and yellow, playful squish effects",
    colors: {
      background: "340 100% 97%",
      foreground: "340 60% 20%",
      card: "0 0% 100%",
      cardForeground: "340 60% 20%",
      primary: "340 82% 72%",
      primaryForeground: "340 60% 15%",
      secondary: "45 100% 68%",
      secondaryForeground: "45 60% 15%",
      muted: "340 40% 92%",
      mutedForeground: "340 20% 50%",
      accent: "45 100% 68%",
      accentForeground: "45 60% 15%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "340 40% 85%",
      input: "340 40% 90%",
      ring: "340 82% 72%",
    },
    radius: "1rem",
    fontFamily: "'Nunito', 'Quicksand', sans-serif",
    signature: "squish-hover bounce-animations",
  },
  {
    id: "wireframe",
    name: "Wireframe",
    tagline: "Sketched, never finished",
    description: "Hand-drawn borders, paper texture, red markup",
    colors: {
      background: "0 0% 100%",
      foreground: "0 0% 20%",
      card: "0 0% 100%",
      cardForeground: "0 0% 20%",
      primary: "0 0% 20%",
      primaryForeground: "0 0% 100%",
      secondary: "0 0% 95%",
      secondaryForeground: "0 0% 20%",
      muted: "0 0% 96%",
      mutedForeground: "0 0% 45%",
      accent: "0 72% 65%",
      accentForeground: "0 0% 100%",
      destructive: "0 72% 65%",
      destructiveForeground: "0 0% 100%",
      border: "0 0% 20%",
      input: "0 0% 90%",
      ring: "0 0% 20%",
    },
    radius: "0.25rem",
    fontFamily: "'Architects Daughter', 'Comic Neue', cursive",
    signature: "sketchy-borders hand-drawn",
  },
  {
    id: "terracotta",
    name: "Terracotta",
    tagline: "Sunbaked earth, timeless warmth",
    description: "Mediterranean warmth, organic curves, sage accents",
    colors: {
      background: "35 35% 95%",
      foreground: "20 40% 20%",
      card: "35 30% 98%",
      cardForeground: "20 40% 20%",
      primary: "15 60% 55%",
      primaryForeground: "0 0% 100%",
      secondary: "100 30% 45%",
      secondaryForeground: "0 0% 100%",
      muted: "35 25% 90%",
      mutedForeground: "20 20% 45%",
      accent: "100 30% 45%",
      accentForeground: "0 0% 100%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "20 25% 80%",
      input: "35 20% 92%",
      ring: "15 60% 55%",
    },
    radius: "0.5rem",
    fontFamily: "'Lora', 'Georgia', serif",
    signature: "tile-patterns warm-shadows",
  },
  {
    id: "cyberdeck",
    name: "Cyberdeck",
    tagline: "Neon-lit hacker aesthetic",
    description: "Terminal black with matrix green, blinking cursors",
    colors: {
      background: "0 0% 5%",
      foreground: "120 100% 62%",
      card: "0 0% 8%",
      cardForeground: "120 100% 62%",
      primary: "120 100% 50%",
      primaryForeground: "0 0% 5%",
      secondary: "0 0% 15%",
      secondaryForeground: "120 100% 62%",
      muted: "0 0% 12%",
      mutedForeground: "120 40% 45%",
      accent: "180 100% 50%",
      accentForeground: "0 0% 5%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "120 60% 25%",
      input: "0 0% 10%",
      ring: "120 100% 50%",
    },
    radius: "0rem",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    signature: "cursor-blink neon-glow",
  },
  {
    id: "gelato",
    name: "Gelato",
    tagline: "Italian summer afternoon",
    description: "Pastel layers, scooped edges, elegant playfulness",
    colors: {
      background: "40 60% 96%",
      foreground: "20 30% 25%",
      card: "0 0% 100%",
      cardForeground: "20 30% 25%",
      primary: "0 45% 72%",
      primaryForeground: "0 0% 100%",
      secondary: "150 45% 75%",
      secondaryForeground: "150 40% 20%",
      muted: "40 30% 92%",
      mutedForeground: "20 15% 50%",
      accent: "150 45% 75%",
      accentForeground: "150 40% 20%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "40 30% 85%",
      input: "40 25% 94%",
      ring: "0 45% 72%",
    },
    radius: "0.75rem",
    fontFamily: "'Playfair Display', 'Didot', serif",
    signature: "gradient-borders layered-colors",
  },
  {
    id: "retrofuture",
    name: "Retrofuture",
    tagline: "Tomorrow as imagined yesterday",
    description: "Atomic age optimism, starbursts, long shadows",
    colors: {
      background: "45 50% 94%",
      foreground: "210 50% 25%",
      card: "45 45% 97%",
      cardForeground: "210 50% 25%",
      primary: "210 55% 35%",
      primaryForeground: "0 0% 100%",
      secondary: "30 95% 52%",
      secondaryForeground: "210 50% 15%",
      muted: "45 30% 88%",
      mutedForeground: "210 20% 45%",
      accent: "30 95% 52%",
      accentForeground: "210 50% 15%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "210 25% 75%",
      input: "45 35% 92%",
      ring: "210 55% 35%",
    },
    radius: "0.5rem",
    fontFamily: "'Futura', 'Avenir', sans-serif",
    signature: "starburst-shapes long-shadows",
  },
  {
    id: "nightclub",
    name: "Nightclub",
    tagline: "3AM, bass drops heavy",
    description: "Blackout with laser pink and strobe gold, pulsing text",
    colors: {
      background: "0 0% 6%",
      foreground: "0 0% 95%",
      card: "0 0% 8%",
      cardForeground: "0 0% 95%",
      primary: "330 100% 54%",
      primaryForeground: "0 0% 100%",
      secondary: "45 100% 50%",
      secondaryForeground: "0 0% 5%",
      muted: "0 0% 12%",
      mutedForeground: "0 0% 55%",
      accent: "45 100% 50%",
      accentForeground: "0 0% 5%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "330 50% 30%",
      input: "0 0% 10%",
      ring: "330 100% 54%",
    },
    radius: "0.25rem",
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    signature: "pulse-animation club-lights",
  },
  {
    id: "synthwave",
    name: "Synthwave",
    tagline: "Chrome dreams, electric highways",
    description: "Purple night sky with neon magenta and cyan",
    colors: {
      background: "270 60% 8%",
      foreground: "180 100% 95%",
      card: "270 50% 12%",
      cardForeground: "180 100% 95%",
      primary: "340 100% 58%",
      primaryForeground: "0 0% 100%",
      secondary: "190 100% 50%",
      secondaryForeground: "270 50% 10%",
      muted: "270 30% 18%",
      mutedForeground: "270 20% 55%",
      accent: "190 100% 50%",
      accentForeground: "270 50% 10%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "340 50% 35%",
      input: "270 35% 15%",
      ring: "340 100% 58%",
    },
    radius: "0rem",
    fontFamily: "'Orbitron', 'Audiowide', sans-serif",
    signature: "horizon-grid neon-halos",
  },
  {
    id: "greenhouse",
    name: "Greenhouse",
    tagline: "Glass walls, growing things",
    description: "Morning mist with forest green and sunlight yellow",
    colors: {
      background: "150 30% 97%",
      foreground: "140 35% 20%",
      card: "150 20% 99%",
      cardForeground: "140 35% 20%",
      primary: "140 40% 35%",
      primaryForeground: "0 0% 100%",
      secondary: "45 90% 60%",
      secondaryForeground: "45 60% 15%",
      muted: "150 20% 92%",
      mutedForeground: "140 15% 45%",
      accent: "45 90% 60%",
      accentForeground: "45 60% 15%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "140 20% 85%",
      input: "150 15% 94%",
      ring: "140 40% 35%",
    },
    radius: "1rem",
    fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif",
    signature: "frosted-glass organic-shapes",
  },
  {
    id: "blackletter",
    name: "Blackletter",
    tagline: "Gothic power, modern edge",
    description: "Ink black with cardinal red, gothic arch frames",
    colors: {
      background: "0 0% 4%",
      foreground: "0 0% 95%",
      card: "0 0% 6%",
      cardForeground: "0 0% 95%",
      primary: "350 72% 47%",
      primaryForeground: "0 0% 100%",
      secondary: "0 0% 15%",
      secondaryForeground: "0 0% 90%",
      muted: "0 0% 12%",
      mutedForeground: "0 0% 55%",
      accent: "350 72% 47%",
      accentForeground: "0 0% 100%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "350 40% 25%",
      input: "0 0% 10%",
      ring: "350 72% 47%",
    },
    radius: "0rem",
    fontFamily: "'UnifrakturMaguntia', 'Fraktur', serif",
    signature: "gothic-arches dramatic-shadows",
  },
  {
    id: "bioluminescent",
    name: "Bioluminescent",
    tagline: "Deep ocean, living light",
    description: "Abyss black with cyan and jellyfish purple glow",
    colors: {
      background: "195 80% 5%",
      foreground: "170 100% 85%",
      card: "195 70% 8%",
      cardForeground: "170 100% 85%",
      primary: "170 100% 60%",
      primaryForeground: "195 80% 5%",
      secondary: "280 80% 65%",
      secondaryForeground: "0 0% 100%",
      muted: "195 50% 15%",
      mutedForeground: "170 40% 50%",
      accent: "280 80% 65%",
      accentForeground: "0 0% 100%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "195 50% 20%",
      input: "195 60% 12%",
      ring: "170 100% 60%",
    },
    radius: "1.5rem",
    fontFamily: "'Outfit', 'Sora', sans-serif",
    signature: "glow-pulse organic-flow",
  },
  {
    id: "bauhaus",
    name: "Bauhaus",
    tagline: "Form follows function, beautifully",
    description: "Pure primary colors, geometric shapes, clean lines",
    colors: {
      background: "0 0% 100%",
      foreground: "0 0% 5%",
      card: "0 0% 100%",
      cardForeground: "0 0% 5%",
      primary: "0 100% 50%",
      primaryForeground: "0 0% 100%",
      secondary: "60 100% 50%",
      secondaryForeground: "0 0% 5%",
      muted: "0 0% 96%",
      mutedForeground: "0 0% 40%",
      accent: "220 100% 50%",
      accentForeground: "0 0% 100%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "0 0% 5%",
      input: "0 0% 95%",
      ring: "0 100% 50%",
    },
    radius: "0rem",
    fontFamily: "'Futura', 'Century Gothic', sans-serif",
    signature: "geometric-overlays primary-blocks",
  },
  {
    id: "campfire",
    name: "Campfire",
    tagline: "Stories under the stars",
    description: "Night sky with ember orange and firelight warmth",
    colors: {
      background: "240 35% 12%",
      foreground: "35 60% 92%",
      card: "240 30% 16%",
      cardForeground: "35 60% 92%",
      primary: "20 90% 52%",
      primaryForeground: "0 0% 100%",
      secondary: "35 70% 75%",
      secondaryForeground: "240 30% 12%",
      muted: "240 20% 22%",
      mutedForeground: "35 30% 60%",
      accent: "35 70% 75%",
      accentForeground: "240 30% 12%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "20 40% 30%",
      input: "240 25% 18%",
      ring: "20 90% 52%",
    },
    radius: "0.5rem",
    fontFamily: "'Crimson Pro', 'Georgia', serif",
    signature: "flicker-animation warm-glow",
  },
  {
    id: "arctic",
    name: "Arctic",
    tagline: "Crystal clarity, frozen precision",
    description: "Ice white with glacier blue and aurora purple",
    colors: {
      background: "210 30% 98%",
      foreground: "220 40% 20%",
      card: "0 0% 100%",
      cardForeground: "220 40% 20%",
      primary: "195 95% 60%",
      primaryForeground: "220 40% 10%",
      secondary: "280 90% 55%",
      secondaryForeground: "0 0% 100%",
      muted: "210 20% 94%",
      mutedForeground: "220 20% 50%",
      accent: "280 90% 55%",
      accentForeground: "0 0% 100%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "210 25% 88%",
      input: "210 20% 96%",
      ring: "195 95% 60%",
    },
    radius: "0.25rem",
    fontFamily: "'Exo 2', 'Rajdhani', sans-serif",
    signature: "hexagonal-patterns ice-crystals",
  },
  {
    id: "darkroom",
    name: "Darkroom",
    tagline: "Analog process, patient craft",
    description: "Safe light black with darkroom red and paper cream",
    colors: {
      background: "0 0% 11%",
      foreground: "45 40% 92%",
      card: "0 0% 14%",
      cardForeground: "45 40% 92%",
      primary: "0 100% 27%",
      primaryForeground: "45 40% 92%",
      secondary: "45 30% 88%",
      secondaryForeground: "0 0% 11%",
      muted: "0 0% 18%",
      mutedForeground: "45 15% 55%",
      accent: "45 30% 88%",
      accentForeground: "0 0% 11%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "0 30% 22%",
      input: "0 0% 16%",
      ring: "0 100% 27%",
    },
    radius: "0rem",
    fontFamily: "'Libre Baskerville', 'Palatino', serif",
    signature: "film-grain vignette",
  },
  {
    id: "thunderstorm",
    name: "Thunderstorm",
    tagline: "Electric tension, dramatic release",
    description: "Storm cloud gray with lightning yellow and rain silver",
    colors: {
      background: "240 30% 12%",
      foreground: "210 15% 85%",
      card: "240 25% 16%",
      cardForeground: "210 15% 85%",
      primary: "55 95% 60%",
      primaryForeground: "240 30% 10%",
      secondary: "210 10% 60%",
      secondaryForeground: "240 30% 12%",
      muted: "240 20% 22%",
      mutedForeground: "210 10% 55%",
      accent: "210 10% 60%",
      accentForeground: "240 30% 12%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "240 15% 30%",
      input: "240 20% 18%",
      ring: "55 95% 60%",
    },
    radius: "0.125rem",
    fontFamily: "'Oswald', 'Bebas Neue', sans-serif",
    signature: "flash-animation tension-shadows",
  },
  {
    id: "hologram",
    name: "Hologram",
    tagline: "Tomorrow rendered today",
    description: "Void black with iridescent spectrum gradients",
    colors: {
      background: "240 40% 6%",
      foreground: "270 100% 95%",
      card: "240 35% 10%",
      cardForeground: "270 100% 95%",
      primary: "280 100% 70%",
      primaryForeground: "240 40% 6%",
      secondary: "180 100% 60%",
      secondaryForeground: "240 40% 6%",
      muted: "240 25% 18%",
      mutedForeground: "270 30% 55%",
      accent: "320 100% 65%",
      accentForeground: "240 40% 6%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "280 40% 30%",
      input: "240 30% 14%",
      ring: "280 100% 70%",
    },
    radius: "0.75rem",
    fontFamily: "'Space Grotesk', 'Space Mono', sans-serif",
    signature: "iridescent-borders prismatic-glow",
  },
];

async function generateThemePackage(theme: ThemeConfig, packagesDir: string) {
  const themeName = `ui-${theme.id}`;
  const themeDir = join(packagesDir, themeName);

  // Create directory structure
  await mkdir(join(themeDir, "src", "components"), { recursive: true });
  await mkdir(join(themeDir, "src", "styles"), { recursive: true });

  // Generate package.json
  const packageJson = {
    name: `@crazyone/${themeName}`,
    version: "0.1.0",
    type: "module",
    main: "./dist/index.cjs",
    module: "./dist/index.js",
    types: "./dist/index.d.ts",
    exports: {
      ".": {
        types: "./dist/index.d.ts",
        import: "./dist/index.js",
        require: "./dist/index.cjs",
      },
      "./styles.css": "./dist/styles.css",
    },
    scripts: {
      build: "tsup src/index.ts --format cjs,esm --dts --external react",
      dev: "tsup src/index.ts --format cjs,esm --dts --external react --watch",
    },
    dependencies: {
      "@crazyone/ui-core": "workspace:*",
      "@radix-ui/react-slot": "^1.1.0",
      "@radix-ui/react-checkbox": "^1.1.0",
      "@radix-ui/react-switch": "^1.1.0",
      "@radix-ui/react-slider": "^1.2.0",
      "@radix-ui/react-select": "^2.1.0",
      "class-variance-authority": "^0.7.0",
    },
    devDependencies: {
      "@types/react": "^18.3.0",
      tsup: "^8.0.0",
      typescript: "^5.7.0",
    },
    peerDependencies: {
      react: "^18.0.0 || ^19.0.0",
      "react-dom": "^18.0.0 || ^19.0.0",
      tailwindcss: "^3.4.0 || ^4.0.0",
    },
  };

  await writeFile(
    join(themeDir, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );

  // Generate tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      lib: ["ES2020", "DOM", "DOM.Iterable"],
      module: "ESNext",
      skipLibCheck: true,
      moduleResolution: "bundler",
      allowImportingTsExtensions: true,
      isolatedModules: true,
      moduleDetection: "force",
      noEmit: true,
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true,
      jsx: "react-jsx",
      declaration: true,
      declarationMap: true,
    },
    include: ["src"],
  };

  await writeFile(
    join(themeDir, "tsconfig.json"),
    JSON.stringify(tsconfig, null, 2)
  );

  // Generate CSS variables
  const cssVars = `/* ${theme.name} Theme - ${theme.tagline} */
/* ${theme.description} */

@layer base {
  :root, [data-theme="${theme.id}"] {
    --background: ${theme.colors.background};
    --foreground: ${theme.colors.foreground};
    --card: ${theme.colors.card};
    --card-foreground: ${theme.colors.cardForeground};
    --primary: ${theme.colors.primary};
    --primary-foreground: ${theme.colors.primaryForeground};
    --secondary: ${theme.colors.secondary};
    --secondary-foreground: ${theme.colors.secondaryForeground};
    --muted: ${theme.colors.muted};
    --muted-foreground: ${theme.colors.mutedForeground};
    --accent: ${theme.colors.accent};
    --accent-foreground: ${theme.colors.accentForeground};
    --destructive: ${theme.colors.destructive};
    --destructive-foreground: ${theme.colors.destructiveForeground};
    --border: ${theme.colors.border};
    --input: ${theme.colors.input};
    --ring: ${theme.colors.ring};
    --radius: ${theme.radius};

    /* Theme-specific custom properties */
    --font-family: ${theme.fontFamily};
  }
}

/* Theme Signature: ${theme.signature} */
`;

  await writeFile(join(themeDir, "src", "styles", "variables.css"), cssVars);

  // Generate index.ts with re-exports
  const indexTs = `// @crazyone/${themeName}
// ${theme.name} Theme - ${theme.tagline}

export * from "./components/button";
export * from "./components/card";
export * from "./components/input";
export * from "./components/checkbox";
export * from "./components/switch";
export * from "./components/slider";
export * from "./components/select";
`;

  await writeFile(join(themeDir, "src", "index.ts"), indexTs);

  console.log(`✓ Generated ${theme.name} theme package`);
}

async function main() {
  const packagesDir = join(process.cwd(), "packages");

  console.log("🎨 Generating @crazyone theme packages...\n");

  for (const theme of themes) {
    await generateThemePackage(theme, packagesDir);
  }

  console.log(`\n✅ Generated ${themes.length} theme packages!`);
  console.log("\nNext steps:");
  console.log("1. Run 'bun install' to link workspace packages");
  console.log("2. Add components to each theme");
  console.log("3. Run 'bun run build' to build all packages");
}

main().catch(console.error);

# @crazyone/ui

Monorepo containing 27 themed UI component libraries built on shadcn/ui.

## Themes

### Flagship Themes
- **brutalist** - Raw concrete, harsh shadows, anti-design
- **vaporwave** - 80s nostalgia, gradients, retro terminals
- **cyberdeck** - Terminal aesthetic, green phosphor
- **hologram** - Translucent layers, prismatic effects
- **bubblegum** - Playful Y2K, bouncy, candy colors

### Elemental Themes
- **obsidian** - Glass morphism, volcanic glow
- **campfire** - Flickering flames, ember warmth
- **arctic** - Ice crystals, aurora gradients
- **thunderstorm** - Lightning flashes, electric crackle

### Retro Themes
- **synthwave** - Intense neon, grid perspective, chrome
- **darkroom** - Film grain, red safelight, vignette
- **retrofuture** - Atomic age, orbit animations, starbursts

### Organic Themes
- **terracotta** - Clay textures, Mediterranean warmth
- **gelato** - Soft scoops, creamy Italian pastels
- **greenhouse** - Leaf patterns, organic growth
- **bioluminescent** - Deep sea glow, jellyfish pulses

### Typography Themes
- **blackletter** - Gothic illuminated manuscripts
- **wireframe** - Blueprint overlays, hand-drawn

### Other Themes
- **nightclub** - Strobe effects, bass pulse, VIP
- **bauhaus** - Strict geometry, primary colors
- **vega** - Sharp modern, enterprise blue
- **nova** - Soft rounded, warm orange
- **maia** - Minimal monochrome, gray
- **lyra** - Vibrant purple, marketing
- **mira** - Corporate navy, business

## Quick Start

```bash
# Install dependencies
bun install

# Build all packages
bun run build

# Start dev mode (watch)
bun run dev
```

## Publishing

```bash
# Create changeset
bun run changeset

# Version packages
bun run version

# Publish to npm
bun run release
```

## Directory Structure

```
packages/
├── ui-core/           # Shared utilities (cn, hooks, types)
├── ui-brutalist/      # Theme package
├── ui-vaporwave/      # Theme package
└── ... (25 more theme packages)

registry/              # shadcn registry JSON files
scripts/               # Build and generation scripts
docs/                  # Theme documentation
```

## Adding a New Theme

1. Use the theme generator:
   ```bash
   bun run scripts/generate-themes.ts
   ```

2. Or manually:
   - Create `packages/ui-{theme}/`
   - Add `src/index.ts`, `src/styles/globals.css`
   - Create `package.json` with proper exports

3. Build and verify:
   ```bash
   bun run build
   ```

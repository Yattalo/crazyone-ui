---
name: sync-registry
description: This skill should be used when updating the shadcn-compatible registry from theme packages. Triggers include "update the registry", "sync registry", "rebuild registry JSON", "refresh component index", or after adding/modifying components in theme packages. Generates registry items for distribution via `npx shadcn@latest add @crazyone/component`.
---

# Sync Registry

Synchronize the shadcn-compatible registry from theme packages.

## Command

```bash
bun run build:registry
```

## What It Does

1. Scans `packages/ui-{theme}/src/components/*.tsx` for registered themes
2. Extracts dependencies from imports
3. Generates `registry/components/{theme}/{component}.json`
4. Updates `registry/index.json` with component index

## Adding Themes to Registry

Edit `scripts/build-registry.ts` line 17:

```typescript
const THEMES = ["vega", "nova", "maia", "lyra", "mira"] as const;
```

Add the new theme slug, then run `bun run build:registry`.

## Output Structure

```
registry/
├── index.json                    # Main registry metadata
└── components/
    └── {theme}/
        ├── button.json
        ├── card.json
        └── ...
```

## Registry Item Schema

Each component JSON follows [shadcn registry-item schema](https://ui.shadcn.com/schema/registry-item.json):

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "dependencies": ["@radix-ui/react-slot", "class-variance-authority", "@crazyone/ui-core"],
  "files": [{ "path": "ui/button.tsx", "type": "registry:ui", "content": "..." }]
}
```

## Distribution

After syncing, components are installable via:

```bash
npx shadcn@latest add @crazyone/button --registry https://ui.crazyone.dev/r
```

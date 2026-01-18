---
name: generate-component
description: Generates a shadcn component in a specific theme, adapting the style (e.g., from default to cyberdeck).
---

# Generate Component

**Trigger**: "Add the component Button to theme Cyberdeck"

## Steps
1.  **Identify**: Theme package (`packages/ui-cyberdeck`) and Component (`button`).
2.  **Source**: specific shadcn primitive or `ui-core` reference.
3.  **Adapt**: Apply theme-specific specific styles (border, shadow, animation) to the component code.
4.  **Output**: Write to `packages/ui-cyberdeck/src/ui/button.tsx`.
5.  **Export**: Export from `index.ts`.

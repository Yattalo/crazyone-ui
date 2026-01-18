---
name: scaffold-theme
description: Creates the scaffolding for a new theme package (e.g., ui-neobrutalism) by copying the base structure and configuring tailwind.config.
---

# Scaffold New Theme

**Trigger**: "Create a new theme called X"

## Steps
1.  **Input**: Theme name (e.g., `neobrutalism`).
2.  **Copy**: Duplicate `packages/ui-neutral` (or template) to `packages/ui-[name]`.
3.  **Rename**: Update `package.json` to `@crazyone/ui-[name]`.
4.  **Config**: Update `tailwind.config.js` with theme-specific colors/tokens.
5.  **Register**: Add to `scripts/build-registry.ts` themes list.

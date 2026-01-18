---
name: sync-registry
description: Scans packages and updates registry/index.json and components.json for the CLI.
---

# Sync Registry

**Trigger**: "Update the registry"

## Steps
1.  **Run Script**: Execute `bun run build:registry` (or `scripts/build-registry.ts`).
2.  **Validate**: Ensure `registry/index.json` matches the schema.
3.  **Commit**: (Optional) Stage changes.

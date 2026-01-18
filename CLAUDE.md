# Project Rules (SBCE)

## Build Commands
- **Dev**: `bun run dev` (starts Turbo dev)
- **Build**: `bun run build` (builds all packages)
- **Lint**: `bun run lint`
- **Registry**: `bun run build:registry`

## Architecture
- **Monorepo**: Turborepo + Bun
- **Apps**: `apps/showcase`, `apps/storybook`
- **Packages**: `packages/ui-core`, `packages/ui-<theme>`
- **Registry**: `registry/` (Shadcn standard)

## Conventions
- **Commits**: Use `changeset` for versioning.
- **Naming**: PascalCase for components, @crazyone scope for packages.
- **Styling**: TailwindCSS (v4 or compatible).

## SBCE
- **Skills**: Located in `.claude/skills/`
- **Rules**: Located in `.claude/rules/`

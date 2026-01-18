# GEMINI Context File

## Project Overview
This project is a sophisticated design system "CrazyOne UI" featuring multiple themes (Arctic, Bauhaus, Brutalist, etc.).
Structure: Monorepo with `packages/` containing `ui-*` theme packages.
Goal: Create a "Registry Hub" web application to showcase these themes, allow searching, and provide installation via `shadcn`-like CLI.

## Current Status
- Multiple `ui-*` packages exist.
- `registry` folder generation script exists (`scripts/build-registry.ts`).
- **MISSING**: The Registry Hub web application (Hero, Search, Gallery) described by the user.
- **PRESENT**: Minimal "lame theme switching" (location TBD).

## User Objectives
- Implement the Registry Hub on port 5175.
- Features: Hero with stats, Category filters, Search bar, Theme cards with preview, "View Demo" for ready themes.
- Follow "Context Engineering" framework: INITIAL.md -> PRP -> Execution.

## Tech Stack
- Frontend: React, TypeScript, likely Vite (inferred from port 5175).
- Styling: TailwindCSS.
- Monorepo: Turbo.

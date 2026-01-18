# FEATURE: Phase 1 - SBCE Infrastructure Consolidation

## Description
Implement the Skill-Based Context Engineering (SBCE) architecture to transform the repository into a Design System Factory. This infrastructure ensures AI agents have the correct context and tools to generate themes and components consistently.

## Requirements
1.  **Structure**:
    *   Create `.claude/skills/` directory.
    *   Create `.claude/rules/` directory.
    *   Create `.claude/assets/` directory (implied by PRD).
2.  **Configuration**:
    *   Create Project-Level `CLAUDE.md` with:
        *   Turborepo build commands.
        *   Changeset conventions.
        *   Directory map.
    *   Create Local-Level `packages/ui-*/CLAUDE.md` template.
3.  **Skills (Scaffolding)**:
    *   Create folders for: `scaffold-theme`, `generate-component`, `sync-registry`, `visual-regression`.
    *   Create `SKILL.md` template in each.
4.  **Rules**:
    *   Create `naming-convention.md`.
    *   Create `registry-schema.md`.
    *   Create `accessibility.md`.

## Documentation
- Reference the "Product Requirement Document: CrazyOne Design System Hub & SBCE Factory".

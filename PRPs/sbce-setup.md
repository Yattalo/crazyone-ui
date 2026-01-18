# PRP: Phase 1 - SBCE Infrastructure Setup

## Context
The goal is to transform the repository into a "Design System Factory" by implementing the Skill-Based Context Engineering (SBCE) architecture. This involves creating a specific folder structure for AI context rules and skills.

## Goal
Establish the `.claude` directory structure, project-level `CLAUDE.md`, and initial Skill/Rule definitions.

## Proposed Changes

### 1. Directory Structure
Create the following hierarchy:
- `.claude/`
    - `skills/`
        - `scaffold-theme/`
        - `generate-component/`
        - `sync-registry/`
        - `visual-regression/`
    - `rules/`
    - `assets/`

### 2. Configuration Files
- **Root `CLAUDE.md`**: Define global/project rules (Build commands, Commit conventions, Directory structure).
- **Rule Files**:
    - `.claude/rules/naming-convention.md`: PascalCase rules.
    - `.claude/rules/registry-schema.md`: JSON schema validation context.
    - `.claude/rules/accessibility.md`: ARIA standards.

### 3. Skill Definitions
Create `SKILL.md` in each skill folder with the frontmatter and description provided in the PRD.

## Step-by-Step Implementation

1.  **Create Directories**: Run `mkdir -p` commands for the structure.
2.  **Create `CLAUDE.md`**: Write the project-level context file.
3.  **Create Rules**: Write the markdown files in `.claude/rules/`.
4.  **Create Skills**: Write `SKILL.md` for the 4 priority skills.
5.  **Verify**: Check file existence.

## Verification Plan
- Run `ls -R .claude` to verify structure.
- Review `CLAUDE.md` content.

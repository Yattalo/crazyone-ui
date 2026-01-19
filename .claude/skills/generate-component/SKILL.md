---
name: generate-component
description: This skill should be used when adding or modifying components in CrazyOne theme packages. Triggers include "add component X to theme Y", "generate Button for Cyberdeck", "create new component in theme", or "implement Dialog for Vega theme". Handles style adaptation using CVA (class-variance-authority) with theme-specific tokens.
---

# Generate Component

Add or update components in existing CrazyOne theme packages.

## Design Thinking

Components are not just styled HTML—they embody the theme's personality in every interaction. A button in Cyberdeck should feel different from a button in Brutalist, not just look different.

### Phase 1: Context Understanding

Use `AskUserQuestion` to understand WHY this component is needed. Adapt based on request specificity.

**If user specified component + theme** (e.g., "add Dialog to Cyberdeck"):

First, read the theme config to understand its personality, then ask:

```yaml
header: "Use case"
question: "What will this Dialog primarily be used for in the Cyberdeck context?"
options:
  - label: "Critical alerts"
    description: "System warnings, destructive confirmations - needs urgency"
  - label: "Content display"
    description: "Media lightboxes, detail views - immersive experience"
  - label: "Forms & input"
    description: "Multi-step flows, settings panels - functional focus"
  - label: "Just exploring"
    description: "Generate a versatile default that showcases the theme"
```

**If user only specified component** (e.g., "I need a better Select"):

```yaml
header: "Theme"
question: "Which theme's personality should this Select embody?"
options:
  - label: "Cyberdeck"
    description: "Neon glows, terminal aesthetics, hacker energy"
  - label: "Brutalist"
    description: "Raw borders, no decoration, confrontational honesty"
  - label: "Vega"
    description: "High contrast, sharp precision, modern editorial"
  - label: "Other existing theme"
    description: "I'll specify which one"
```

**If user wants to improve existing component:**

```yaml
header: "Problem"
question: "What's not working with the current component?"
options:
  - label: "Doesn't match theme"
    description: "Feels generic, not distinctive enough"
  - label: "Interaction issues"
    description: "Hover states, focus, animations feel wrong"
  - label: "Accessibility gaps"
    description: "Needs better contrast, focus indicators, ARIA"
  - label: "Missing variants"
    description: "Need sizes/states that don't exist yet"
```

### Phase 2: Behavior & Interaction

For interactive components (button, dialog, select, tabs), dig into the experience:

**For action components (button, checkbox, switch):**
```yaml
header: "Feedback"
question: "How should interaction feedback feel for this theme?"
options:
  - label: "Instant & snappy"
    description: "Immediate state changes, crisp transitions (0-100ms)"
  - label: "Smooth & fluid"
    description: "Eased transitions, graceful state morphing (150-300ms)"
  - label: "Dramatic & deliberate"
    description: "Pronounced animations, theatrical (300ms+)"
  - label: "Silent & subtle"
    description: "Minimal feedback, content takes priority"
```

**For container components (dialog, card, tooltip):**
```yaml
header: "Presence"
question: "How should this component enter/exit the viewport?"
options:
  - label: "Fade & scale"
    description: "Classic modal feel, gentle appearance"
  - label: "Slide from edge"
    description: "Directional movement, spatial relationship"
  - label: "Glitch/flicker"
    description: "Digital artifact, fits cyberpunk themes"
  - label: "Instant cut"
    description: "No animation, maximum performance"
```

### Phase 3: Variant Strategy

Only ask if generating multiple variants or the request is ambiguous:

```yaml
header: "Variants"
question: "Which variant strategy fits the use case?"
multiSelect: true
options:
  - label: "Full variant set"
    description: "default, destructive, outline, secondary, ghost, link"
  - label: "Size variations"
    description: "sm, default, lg, icon"
  - label: "State-focused"
    description: "Emphasize loading, disabled, active states"
  - label: "Theme-specific variants"
    description: "Add variants unique to this theme's personality"
```

## Implementation

### Option A: Regenerate Entire Theme (Recommended)

When modifying component styles in the theme config:

1. Update `theme-generator/configs/{theme}.ts` → `componentStyles.{component}`
2. Run `bun run generate:theme {theme-slug}`

This ensures all 12 components stay cohesive.

### Option B: Manual Component Creation

For surgical changes or experimental variants:

1. Read theme config for `componentStyles` guidance
2. Read existing component at `packages/ui-{theme}/src/components/{component}.tsx`
3. Apply modifications following CVA pattern
4. Ensure export in `packages/ui-{theme}/src/index.ts`

## Component Structure (CVA Pattern)

```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@crazyone/ui-core";

const buttonVariants = cva(
  // Base: Theme signature classes
  "font-mono uppercase tracking-[0.2em] border border-primary relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        // ... theme-specific variant expressions
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);
```

## Supported Components

| Component | Radix Primitive | Key Styling Areas |
|-----------|-----------------|-------------------|
| `alert` | - | Container, icon, title, description |
| `badge` | - | Inline element, variant colors |
| `button` | react-slot | Base, variants, sizes, states |
| `card` | - | Container, header, content, footer |
| `checkbox` | react-checkbox | Box, indicator, label alignment |
| `dialog` | react-dialog | Overlay, content, header, footer |
| `input` | - | Field, placeholder, focus ring |
| `select` | react-select | Trigger, content, items, scroll |
| `slider` | react-slider | Track, range, thumb |
| `switch` | react-switch | Track, thumb, label |
| `tabs` | react-tabs | List, trigger, content |
| `tooltip` | react-tooltip | Trigger, content, arrow |

## Verification

```bash
cd packages/ui-{theme} && bun run build
bun run build:registry
```

## Anti-Patterns

NEVER generate:
- Components that ignore the theme's established personality
- Generic hover states (opacity changes without character)
- Animations that clash with theme's motion language
- Accessibility shortcuts (missing focus states, poor contrast)

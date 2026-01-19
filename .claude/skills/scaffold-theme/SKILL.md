---
name: scaffold-theme
description: This skill should be used when creating new theme packages for the CrazyOne Design System. Triggers include "create new theme", "scaffold theme X", "add design system theme", "generate theme package", or "initialize theme called Z". Generates complete package with 12 components, CSS variables, and registry integration using the theme-generator infrastructure.
---

# Scaffold Theme

Generate complete theme packages in the CrazyOne Design System monorepo.

## Design Thinking

Before generating code, understand the context and commit to a BOLD aesthetic direction. Generic themes are forgettable. Every theme in CrazyOne should have a distinct personality and reason to exist.

### Phase 1: Discovery

Use `AskUserQuestion` to understand the user's vision. Adapt questions based on how much context they've already provided.

**If user gave only a name** (e.g., "create theme called Aurora"):

```yaml
header: "Vision"
question: "What feeling should 'Aurora' evoke when someone uses these components?"
options:
  - label: "Ethereal & Mystical"
    description: "Northern lights, cosmic gradients, soft glows, dreamy transitions"
  - label: "Fresh & Energetic"
    description: "Dawn breaking, vibrant warmth, optimistic, clean"
  - label: "Scientific & Precise"
    description: "Data visualization, observatory, technical elegance"
  - label: "Other direction"
    description: "I have a different interpretation in mind"
```

**If user described an aesthetic** (e.g., "brutalist theme with heavy shadows"):

```yaml
header: "Intensity"
question: "How extreme should the brutalist aesthetic be?"
options:
  - label: "Uncompromising"
    description: "Raw concrete textures, harsh borders, zero decoration, confrontational"
  - label: "Refined brutal"
    description: "Strong geometry but polished, industrial luxury"
  - label: "Playful brutal"
    description: "Bold shapes with unexpected color pops, irreverent"
```

**If user mentioned a use case** (e.g., "theme for a music app"):

```yaml
header: "Audience"
question: "Who is the primary audience for this music interface?"
options:
  - label: "Professional producers"
    description: "Dense information, dark mode essential, precision controls"
  - label: "Casual listeners"
    description: "Playful, album art focus, discovery-oriented"
  - label: "Audiophiles"
    description: "Minimal distractions, waveform visualization, technical specs"
  - label: "Gen-Z social"
    description: "Bold colors, shareable, personality-driven"
```

### Phase 2: Refinement

Based on Phase 1 answers, ask ONE follow-up that sharpens the vision:

**For visual themes:**
```yaml
header: "Signature"
question: "What single visual element should make this theme instantly recognizable?"
options:
  - label: "Typography treatment"
    description: "Distinctive font pairing, custom letter-spacing, text effects"
  - label: "Border/shadow system"
    description: "Unique border weights, shadow depths, or outline styles"
  - label: "Color transitions"
    description: "Signature gradients, color shifts on interaction"
  - label: "Motion language"
    description: "Distinctive animations, easing curves, micro-interactions"
```

**For functional themes:**
```yaml
header: "Priority"
question: "If you had to optimize for ONE thing, what would it be?"
options:
  - label: "Information density"
    description: "Pack maximum data without feeling cluttered"
  - label: "Emotional impact"
    description: "Every interaction should feel delightful"
  - label: "Accessibility"
    description: "WCAG AAA, high contrast, clear focus states"
  - label: "Performance"
    description: "Minimal CSS, no animations, instant rendering"
```

### Phase 3: Technical Decisions

Only ask technical questions if they impact the aesthetic:

```yaml
header: "Animations"
question: "This aesthetic suggests [inferred animation style]. Include custom keyframes?"
options:
  - label: "Yes - essential to the vision"
    description: "Theme needs motion to feel complete (uses split-files CSS)"
  - label: "No - stillness is intentional"
    description: "Static elegance, faster load (uses single-file CSS)"
```

## Implementation

After gathering context, create the theme config:

1. **Translate vision to tokens**: Map aesthetic choices to CSS variables
   - "Ethereal" → low contrast ratios, translucent backgrounds, soft borders
   - "Brutalist" → high contrast, solid colors, sharp 0rem radius
   - "Playful" → vibrant primaries, rounded corners, bouncy animations

2. **Create config** at `theme-generator/configs/{slug}.ts` using [CONFIG-TEMPLATE.md](references/CONFIG-TEMPLATE.md)

3. **Generate**: `bun run generate:theme {slug}`

4. **Register**: Add to `scripts/build-registry.ts` line 17

5. **Finalize**: `bun run build:registry && bun install`

## Anti-Patterns

NEVER generate:
- Themes without a clear point of view
- Generic "light/dark" variations without personality
- Copied aesthetics from existing themes (vega, cyberdeck, etc.)
- Safe, forgettable color schemes

Every theme should answer: "Why would someone choose THIS over the others?"

## Key Files

| Purpose | Location |
|---------|----------|
| Generator | `theme-generator/generate.ts` |
| Schema | `theme-generator/schema.ts` |
| Templates | `theme-generator/templates/` |
| Existing configs | `theme-generator/configs/` |

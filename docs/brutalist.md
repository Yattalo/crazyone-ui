# Brutalist Integration Guide

> Raw concrete. Zero pretense. Components that refuse to apologize.

## Quick Start

```bash
bun add @crazyone/ui-brutalist
```

```tsx
import { Button, Card } from "@crazyone/ui-brutalist";
```

---

## CSS Variables

Copy these into your `globals.css`:

```css
[data-theme="brutalist"] {
  /* Core palette */
  --background: 0 0% 95%;
  --foreground: 0 0% 5%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 5%;
  --primary: 0 0% 5%;
  --primary-foreground: 0 0% 95%;
  --secondary: 0 0% 85%;
  --secondary-foreground: 0 0% 5%;
  --muted: 0 0% 90%;
  --muted-foreground: 0 0% 40%;
  --accent: 0 0% 90%;
  --accent-foreground: 0 0% 5%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 0 0% 5%;
  --input: 0 0% 5%;
  --ring: 0 0% 5%;
  --radius: 0px;

  /* Brutalist-specific */
  --brutalist-offset: 4px;
  --brutalist-border: 3px;
}
```

---

## Google Fonts

Add to your `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

Tailwind config:

```js
fontFamily: {
  mono: ["Space Mono", "monospace"],
}
```

---

## Utility Classes

```css
/* Offset shadow - signature brutalist effect */
.brutalist-shadow {
  box-shadow: 4px 4px 0 0 hsl(var(--foreground));
}

.brutalist-shadow-hover:hover {
  box-shadow: 6px 6px 0 0 hsl(var(--foreground));
  transform: translate(-2px, -2px);
}

/* Grid coordinates */
.brutalist-coord::before {
  content: "[" attr(data-coord) "]";
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
}
```

---

## Component Examples

### Button

```tsx
import { Button } from "@crazyone/ui-brutalist";

// Primary - solid black, offset shadow
<Button>SUBMIT</Button>

// Secondary - white with border
<Button variant="secondary">CANCEL</Button>

// Destructive - red, shake on hover
<Button variant="destructive">DELETE</Button>
```

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@crazyone/ui-brutalist";

<Card data-coord="01.02">
  <CardHeader>
    <CardTitle>SECTION TITLE</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here. No rounded corners. No apologies.
  </CardContent>
</Card>
```

### Dialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@crazyone/ui-brutalist";

<Dialog>
  <DialogTrigger asChild>
    <Button>OPEN MODAL</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>CONFIRMATION</DialogTitle>
      <DialogDescription>
        Are you sure? This action is permanent.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

---

## Layout Templates

### Dashboard Header

```tsx
<header className="border-b-4 border-foreground p-6">
  <div className="flex items-center justify-between">
    <h1 className="font-mono text-2xl font-bold uppercase tracking-tight">
      [DASHBOARD]
    </h1>
    <nav className="flex gap-4">
      <Button variant="ghost">[HOME]</Button>
      <Button variant="ghost">[REPORTS]</Button>
      <Button variant="ghost">[SETTINGS]</Button>
    </nav>
  </div>
</header>
```

### Grid Layout

```tsx
<div className="grid grid-cols-12 gap-6 p-6">
  <Card className="col-span-4" data-coord="01.01">
    <CardContent>Panel 1</CardContent>
  </Card>
  <Card className="col-span-8" data-coord="01.02">
    <CardContent>Panel 2</CardContent>
  </Card>
</div>
```

---

## Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        mono: ["Space Mono", "monospace"],
      },
      boxShadow: {
        brutalist: "4px 4px 0 0 hsl(var(--foreground))",
        "brutalist-lg": "6px 6px 0 0 hsl(var(--foreground))",
      },
      borderRadius: {
        none: "0",
      },
      animation: {
        shake: "brutalist-shake 0.3s ease-in-out",
        slam: "brutalist-slam 0.2s ease-out",
      },
      keyframes: {
        "brutalist-shake": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-2px, 0)" },
          "75%": { transform: "translate(2px, 0)" },
        },
        "brutalist-slam": {
          "0%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
};
```

---

## Color Reference

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--background` | 0 0% 95% | #f2f2f2 | Page background |
| `--foreground` | 0 0% 5% | #0d0d0d | Text, borders |
| `--primary` | 0 0% 5% | #0d0d0d | Buttons, accents |
| `--secondary` | 0 0% 85% | #d9d9d9 | Secondary elements |
| `--destructive` | 0 84% 60% | #ef4444 | Danger actions |

---

## Best Practices

### DO

- Use uppercase text for headings and buttons
- Keep borders thick (3-4px)
- Embrace hard edges (border-radius: 0)
- Add grid coordinates for navigation
- Let content breathe with generous padding

### DON'T

- Add gradients or shadows with blur
- Use rounded corners
- Soften the aesthetic with pastels
- Over-animate elements
- Apologize for the rawness

---

## Animation Reference

```css
/* Shake - for destructive actions */
@keyframes brutalist-shake {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-2px, 0); }
  75% { transform: translate(2px, 0); }
}

/* Slam - for button press */
@keyframes brutalist-slam {
  0% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Glitch - for error states */
@keyframes brutalist-glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-2px, -2px); }
  80% { transform: translate(2px, 2px); }
}
```

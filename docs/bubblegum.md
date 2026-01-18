# Bubblegum Integration Guide

> Dopamine hits. Zero regrets. UI that sparks joy.

## Quick Start

```bash
bun add @crazyone/ui-bubblegum
```

```tsx
import { Button, Card } from "@crazyone/ui-bubblegum";
```

---

## CSS Variables

Copy these into your `globals.css`:

```css
[data-theme="bubblegum"] {
  /* Core palette */
  --background: 330 100% 98%;
  --foreground: 330 50% 20%;
  --card: 0 0% 100%;
  --card-foreground: 330 50% 20%;
  --primary: 330 100% 65%;
  --primary-foreground: 0 0% 100%;
  --secondary: 180 80% 60%;
  --secondary-foreground: 180 80% 10%;
  --muted: 330 50% 95%;
  --muted-foreground: 330 30% 50%;
  --accent: 45 100% 60%;
  --accent-foreground: 45 100% 15%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 330 50% 85%;
  --input: 330 50% 90%;
  --ring: 330 100% 65%;
  --radius: 24px;

  /* Bubblegum-specific */
  --bubble-pink: #FF69B4;
  --bubble-mint: #40E0D0;
  --bubble-lemon: #FFE135;
}
```

---

## Google Fonts

Add to your `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
```

Tailwind config:

```js
fontFamily: {
  display: ["Nunito", "sans-serif"],
}
```

---

## Utility Classes

```css
/* Bounce animation */
.bubble-bounce {
  animation: bubble-bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bubble-bounce {
  0% { transform: scale(0.8); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Squish on hover */
.bubble-squish:hover {
  animation: bubble-squish 0.3s ease;
}

@keyframes bubble-squish {
  0%, 100% { transform: scale(1); }
  50% { transform: scaleX(1.1) scaleY(0.9); }
}

/* Wobble effect */
.bubble-wobble:hover {
  animation: bubble-wobble 0.5s ease;
}

@keyframes bubble-wobble {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
}

/* Pill shape */
.bubble-pill {
  border-radius: 9999px;
  padding: 0.75rem 1.5rem;
}

/* Candy shadow */
.bubble-shadow {
  box-shadow:
    0 4px 0 0 hsl(var(--primary) / 0.3),
    0 8px 20px -4px hsl(var(--primary) / 0.2);
}
```

---

## Component Examples

### Button

```tsx
import { Button } from "@crazyone/ui-bubblegum";

// Primary - hot pink, bouncy
<Button className="bubble-squish">Click me!</Button>

// Secondary - mint fresh
<Button variant="secondary" className="bubble-wobble">
  Refresh
</Button>

// Pill shaped
<Button className="bubble-pill">
  Subscribe
</Button>
```

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@crazyone/ui-bubblegum";

<Card className="bubble-shadow hover:scale-[1.02] transition-transform">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <span className="text-2xl">🍬</span>
      Sweet Deal!
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p>Get 50% off your first order!</p>
    <Button className="mt-4 bubble-bounce">
      Grab it now
    </Button>
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
} from "@crazyone/ui-bubblegum";

<Dialog>
  <DialogTrigger asChild>
    <Button className="bubble-squish">Open surprise!</Button>
  </DialogTrigger>
  <DialogContent className="bubble-bounce">
    <DialogHeader>
      <DialogTitle className="text-2xl flex items-center gap-2">
        <span>🎉</span> Yay!
      </DialogTitle>
    </DialogHeader>
    <p>You found the secret popup!</p>
    <div className="flex gap-2 mt-4">
      <Button>Awesome!</Button>
      <Button variant="secondary">Cool!</Button>
    </div>
  </DialogContent>
</Dialog>
```

---

## Layout Templates

### Candy Shop Header

```tsx
<header className="bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 p-6">
  <div className="max-w-6xl mx-auto">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-2xl bubble-wobble">
          🍭
        </div>
        <h1 className="text-2xl font-extrabold text-foreground">
          Candy Co.
        </h1>
      </div>
      <nav className="flex gap-2">
        <Button variant="ghost" className="bubble-squish">Shop</Button>
        <Button variant="ghost" className="bubble-squish">About</Button>
        <Button className="bubble-pill">Cart (3)</Button>
      </nav>
    </div>
  </div>
</header>
```

### Fun Grid Layout

```tsx
<div className="p-8 bg-muted/30">
  <div className="grid grid-cols-3 gap-6">
    {["🍬", "🍭", "🍫"].map((emoji, i) => (
      <Card
        key={i}
        className="bubble-shadow hover:scale-105 transition-transform cursor-pointer"
        style={{ animationDelay: `${i * 0.1}s` }}
      >
        <CardContent className="p-8 text-center">
          <span className="text-6xl block mb-4 bubble-wobble inline-block">
            {emoji}
          </span>
          <h3 className="font-bold text-lg">Category {i + 1}</h3>
          <p className="text-muted-foreground text-sm">
            Delicious treats await!
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
</div>
```

### Floating Decorations

```tsx
<div className="relative overflow-hidden min-h-screen">
  {/* Floating candy shapes */}
  <div className="absolute top-10 left-10 w-16 h-16 bg-pink-300 rounded-full opacity-60 bubble-float" />
  <div className="absolute top-20 right-20 w-12 h-12 bg-cyan-300 rounded-full opacity-50 bubble-float" style={{ animationDelay: "-2s" }} />
  <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-yellow-300 rounded-full opacity-40 bubble-float" style={{ animationDelay: "-4s" }} />

  {/* Sparkles */}
  <div className="absolute top-1/4 right-1/4">
    <span className="text-4xl animate-pulse">✨</span>
  </div>

  {/* Content */}
  <div className="relative z-10 p-8">
    <Card>...</Card>
  </div>
</div>

<style>
@keyframes bubble-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}
.bubble-float { animation: bubble-float 4s ease-in-out infinite; }
</style>
```

---

## Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        bubble: {
          pink: "#FF69B4",
          mint: "#40E0D0",
          lemon: "#FFE135",
        },
      },
      fontFamily: {
        display: ["Nunito", "sans-serif"],
      },
      borderRadius: {
        bubble: "24px",
        pill: "9999px",
      },
      boxShadow: {
        candy: "0 4px 0 0 rgba(255, 105, 180, 0.3), 0 8px 20px -4px rgba(255, 105, 180, 0.2)",
      },
      animation: {
        bounce: "bubble-bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        squish: "bubble-squish 0.3s ease",
        wobble: "bubble-wobble 0.5s ease",
        float: "bubble-float 4s ease-in-out infinite",
      },
      keyframes: {
        "bubble-bounce": {
          "0%": { transform: "scale(0.8)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "bubble-squish": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scaleX(1.1) scaleY(0.9)" },
        },
        "bubble-wobble": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
        "bubble-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(10deg)" },
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
| `--background` | 330 100% 98% | #fff5f9 | Cotton candy pink |
| `--primary` | 330 100% 65% | #FF69B4 | Hot pink |
| `--secondary` | 180 80% 60% | #40E0D0 | Mint turquoise |
| `--accent` | 45 100% 60% | #FFE135 | Lemon yellow |
| `--foreground` | 330 50% 20% | #4a1a32 | Deep plum text |

---

## Best Practices

### DO

- Use emoji liberally 🍬🎉✨
- Apply squish/bounce on interactions
- Round ALL the corners (24px+)
- Add playful shadows with color
- Use gradients for backgrounds

### DON'T

- Use sharp corners or hard edges
- Skip the animations
- Choose muted, boring colors
- Forget the pill-shaped buttons
- Take yourself too seriously

---

## Animation Reference

```css
/* Bounce - for entries and clicks */
@keyframes bubble-bounce {
  0% { transform: scale(0.8); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Squish - for hover states */
@keyframes bubble-squish {
  0%, 100% { transform: scale(1); }
  50% { transform: scaleX(1.1) scaleY(0.9); }
}

/* Wobble - for playful interactions */
@keyframes bubble-wobble {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
}

/* Float - for decorative elements */
@keyframes bubble-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

/* Pop - for notifications */
@keyframes bubble-pop {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}
```

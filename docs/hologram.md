# Hologram Integration Guide

> Tomorrow rendered today. Iridescent interfaces from the future.

## Quick Start

```bash
bun add @crazyone/ui-hologram
```

```tsx
import { Button, Card } from "@crazyone/ui-hologram";
```

---

## CSS Variables

Copy these into your `globals.css`:

```css
[data-theme="hologram"] {
  /* Core palette */
  --background: 260 20% 5%;
  --foreground: 0 0% 95%;
  --card: 260 30% 10%;
  --card-foreground: 0 0% 95%;
  --primary: 280 100% 70%;
  --primary-foreground: 260 20% 5%;
  --secondary: 200 100% 60%;
  --secondary-foreground: 260 20% 5%;
  --muted: 260 20% 20%;
  --muted-foreground: 0 0% 60%;
  --accent: 320 100% 65%;
  --accent-foreground: 260 20% 5%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 280 50% 40%;
  --input: 260 30% 15%;
  --ring: 280 100% 70%;
  --radius: 16px;

  /* Hologram-specific */
  --holo-spectrum: linear-gradient(
    135deg,
    #a855f7,
    #ec4899,
    #06b6d4,
    #a855f7
  );
}
```

---

## Google Fonts

Add to your `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;700&display=swap" rel="stylesheet">
```

Tailwind config:

```js
fontFamily: {
  display: ["Exo 2", "sans-serif"],
}
```

---

## Utility Classes

```css
/* Prismatic gradient border */
.holo-border {
  position: relative;
  background: hsl(var(--card));
  border-radius: var(--radius);
}

.holo-border::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: calc(var(--radius) + 2px);
  background: linear-gradient(
    135deg,
    #a855f7,
    #ec4899,
    #06b6d4,
    #a855f7
  );
  background-size: 300% 300%;
  animation: holo-prismatic 4s ease infinite;
  z-index: -1;
}

@keyframes holo-prismatic {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Iridescent shimmer */
.holo-shimmer {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  background-size: 200% 100%;
  animation: holo-shimmer 2s linear infinite;
}

@keyframes holo-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Floating orb */
.holo-orb {
  background: radial-gradient(
    circle,
    rgba(168, 85, 247, 0.6),
    rgba(236, 72, 153, 0.4),
    transparent
  );
  filter: blur(40px);
  animation: holo-float 6s ease-in-out infinite;
}

@keyframes holo-float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.1); }
}
```

---

## Component Examples

### Button

```tsx
import { Button } from "@crazyone/ui-hologram";

// Primary - prismatic gradient
<Button>Activate</Button>

// Secondary - glass effect
<Button variant="secondary">Configure</Button>

// With shimmer
<Button className="holo-shimmer overflow-hidden relative">
  Initialize
</Button>
```

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@crazyone/ui-hologram";

<div className="holo-border p-[1px]">
  <Card className="bg-card/90 backdrop-blur-xl">
    <CardHeader>
      <CardTitle className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
        Holographic Interface
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">
        Tomorrow's UI, rendered today.
      </p>
    </CardContent>
  </Card>
</div>
```

### Dialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@crazyone/ui-hologram";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Portal</Button>
  </DialogTrigger>
  <DialogContent className="border-0 holo-border p-[1px]">
    <div className="bg-card/95 backdrop-blur-xl rounded-[15px] p-6">
      <DialogHeader>
        <DialogTitle className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Dimensional Gateway
        </DialogTitle>
      </DialogHeader>
      <p className="text-muted-foreground">
        Step into the future.
      </p>
    </div>
  </DialogContent>
</Dialog>
```

---

## Layout Templates

### Holographic Header

```tsx
<header className="relative overflow-hidden border-b border-border/50 backdrop-blur-xl">
  {/* Background orbs */}
  <div className="absolute -top-20 -left-20 w-40 h-40 holo-orb" />
  <div className="absolute -top-10 right-10 w-32 h-32 holo-orb" style={{ animationDelay: "-2s" }} />

  <div className="relative z-10 p-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-light tracking-wide bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          HOLOGRAM
        </h1>
        <p className="text-sm text-muted-foreground">v2.0.4</p>
      </div>
      <nav className="flex gap-2">
        <Button variant="ghost" size="sm">Dashboard</Button>
        <Button variant="ghost" size="sm">Settings</Button>
      </nav>
    </div>
  </div>
</header>
```

### Prismatic Grid

```tsx
<div className="relative min-h-screen p-8">
  {/* Ambient orbs */}
  <div className="fixed top-1/4 left-1/4 w-64 h-64 holo-orb opacity-50" />
  <div className="fixed bottom-1/4 right-1/4 w-48 h-48 holo-orb opacity-40" style={{ animationDelay: "-3s" }} />

  <div className="relative z-10 grid grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="holo-border p-[1px]">
        <Card className="bg-card/80 backdrop-blur-xl h-full">
          <CardHeader>
            <CardTitle className="text-lg font-light">
              Module {i}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="holo-shimmer h-24 rounded-lg bg-muted/30" />
          </CardContent>
        </Card>
      </div>
    ))}
  </div>
</div>
```

---

## Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        holo: {
          purple: "#a855f7",
          pink: "#ec4899",
          cyan: "#06b6d4",
        },
      },
      fontFamily: {
        display: ["Exo 2", "sans-serif"],
      },
      backgroundImage: {
        "holo-gradient": "linear-gradient(135deg, #a855f7, #ec4899, #06b6d4, #a855f7)",
      },
      boxShadow: {
        "holo-glow": "0 0 40px rgba(168, 85, 247, 0.3)",
        "holo-pink": "0 0 40px rgba(236, 72, 153, 0.3)",
        "holo-cyan": "0 0 40px rgba(6, 182, 212, 0.3)",
      },
      animation: {
        prismatic: "holo-prismatic 4s ease infinite",
        shimmer: "holo-shimmer 2s linear infinite",
        float: "holo-float 6s ease-in-out infinite",
      },
      keyframes: {
        "holo-prismatic": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "holo-shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "holo-float": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.1)" },
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
| `--background` | 260 20% 5% | #0d0a14 | Dark void |
| `--primary` | 280 100% 70% | #a855f7 | Purple spectrum |
| `--secondary` | 200 100% 60% | #38bdf8 | Cyan accent |
| `--accent` | 320 100% 65% | #ec4899 | Pink highlight |
| `--border` | 280 50% 40% | #8b5cf6 | Muted purple |

---

## Best Practices

### DO

- Use backdrop-blur for glass effects
- Layer gradient borders with ::before
- Add floating orb ambience
- Apply light font weights (300-400)
- Animate background-position for prismatic effects

### DON'T

- Use solid, opaque backgrounds
- Skip the blur effects
- Use heavy font weights
- Ignore the color cycling
- Flatten the depth with no layering

---

## Animation Reference

```css
/* Prismatic color cycle */
@keyframes holo-prismatic {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Iridescent shimmer */
@keyframes holo-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Floating orbs */
@keyframes holo-float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.1); }
}

/* Pulse glow */
@keyframes holo-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
  50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.6); }
}
```

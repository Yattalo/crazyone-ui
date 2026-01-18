# Vaporwave Integration Guide

> Dead malls. Eternal sunset. Nostalgia for a future that never was.

## Quick Start

```bash
bun add @crazyone/ui-vaporwave
```

```tsx
import { Button, Card } from "@crazyone/ui-vaporwave";
```

---

## CSS Variables

Copy these into your `globals.css`:

```css
[data-theme="vaporwave"] {
  /* Core palette */
  --background: 280 60% 8%;
  --foreground: 180 100% 95%;
  --card: 280 50% 12%;
  --card-foreground: 180 100% 95%;
  --primary: 320 100% 70%;
  --primary-foreground: 280 60% 8%;
  --secondary: 180 100% 50%;
  --secondary-foreground: 280 60% 8%;
  --muted: 280 40% 20%;
  --muted-foreground: 180 50% 70%;
  --accent: 320 100% 70%;
  --accent-foreground: 280 60% 8%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 320 100% 70%;
  --input: 280 50% 15%;
  --ring: 320 100% 70%;
  --radius: 0px;

  /* Vaporwave-specific */
  --vaporwave-pink: #FF6AD5;
  --vaporwave-cyan: #01CDFE;
  --vaporwave-purple: #1a0a2e;
}
```

---

## Google Fonts

Add to your `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
```

Tailwind config:

```js
fontFamily: {
  display: ["Noto Sans JP", "sans-serif"],
}
```

---

## Utility Classes

```css
/* VHS scanline overlay */
.vaporwave-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.1) 2px,
    rgba(0, 0, 0, 0.1) 4px
  );
  pointer-events: none;
}

/* Chromatic aberration text effect */
.vaporwave-chromatic {
  animation: vaporwave-chromatic 3s ease-in-out infinite;
}

@keyframes vaporwave-chromatic {
  0%, 100% { text-shadow: -2px 0 #FF6AD5, 2px 0 #01CDFE; }
  50% { text-shadow: 2px 0 #FF6AD5, -2px 0 #01CDFE; }
}

/* Gradient text */
.vaporwave-gradient-text {
  background: linear-gradient(135deg, #FF6AD5, #01CDFE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Component Examples

### Button

```tsx
import { Button } from "@crazyone/ui-vaporwave";

// Primary - neon pink glow
<Button>アクセス</Button>

// Secondary - cyan variant
<Button variant="secondary">リセット</Button>

// With VHS timestamp
<Button className="relative">
  PLAY
  <span className="absolute -top-2 -right-2 text-xs opacity-60">
    12:34:56
  </span>
</Button>
```

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@crazyone/ui-vaporwave";

<Card className="vaporwave-scanlines relative overflow-hidden">
  <CardHeader>
    <CardTitle className="vaporwave-chromatic">
      ビデオショップ
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p>Welcome to the eternal mall.</p>
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
} from "@crazyone/ui-vaporwave";

<Dialog>
  <DialogTrigger asChild>
    <Button>開く</Button>
  </DialogTrigger>
  <DialogContent className="border-primary/50">
    <DialogHeader>
      <DialogTitle className="vaporwave-gradient-text">
        メッセージ
      </DialogTitle>
    </DialogHeader>
    <p>It's always 1989 here.</p>
  </DialogContent>
</Dialog>
```

---

## Layout Templates

### Mall Directory Header

```tsx
<header className="relative border-b border-primary/30 p-8 overflow-hidden">
  {/* Horizon grid background */}
  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />

  <div className="relative z-10 text-center">
    <p className="text-xs tracking-[0.5em] text-muted-foreground mb-2">
      EST. 1989
    </p>
    <h1 className="text-4xl font-bold vaporwave-chromatic">
      M A L L W A V E
    </h1>
    <p className="mt-2 text-muted-foreground">
      永遠のショッピング
    </p>
  </div>
</header>
```

### Grid with Palm Trees

```tsx
<div className="relative min-h-screen">
  {/* Sunset gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 via-purple-900/40 to-background" />

  {/* Grid floor */}
  <div
    className="absolute bottom-0 left-0 right-0 h-1/2"
    style={{
      background: `
        linear-gradient(transparent 0%, rgba(255,106,213,0.3) 100%),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 50px,
          rgba(1,205,254,0.1) 50px,
          rgba(1,205,254,0.1) 51px
        ),
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 50px,
          rgba(255,106,213,0.1) 50px,
          rgba(255,106,213,0.1) 51px
        )
      `,
      transform: "perspective(200px) rotateX(60deg)",
      transformOrigin: "bottom",
    }}
  />

  {/* Content */}
  <div className="relative z-10 p-8">
    <Card>...</Card>
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
        vaporwave: {
          pink: "#FF6AD5",
          cyan: "#01CDFE",
          purple: "#1a0a2e",
        },
      },
      fontFamily: {
        display: ["Noto Sans JP", "sans-serif"],
      },
      boxShadow: {
        "vaporwave-glow": "0 0 30px rgba(255,106,213,0.5)",
        "vaporwave-cyan": "0 0 30px rgba(1,205,254,0.5)",
      },
      animation: {
        scanline: "vaporwave-scanline 8s linear infinite",
        chromatic: "vaporwave-chromatic 3s ease-in-out infinite",
      },
      keyframes: {
        "vaporwave-scanline": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "vaporwave-chromatic": {
          "0%, 100%": { textShadow: "-2px 0 #FF6AD5, 2px 0 #01CDFE" },
          "50%": { textShadow: "2px 0 #FF6AD5, -2px 0 #01CDFE" },
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
| `--background` | 280 60% 8% | #1a0a2e | Deep purple void |
| `--primary` | 320 100% 70% | #FF6AD5 | Hot pink accents |
| `--secondary` | 180 100% 50% | #01CDFE | Cyan highlights |
| `--foreground` | 180 100% 95% | #e0ffff | Light cyan text |
| `--muted` | 280 40% 20% | #3d1a4d | Subtle purple |

---

## Best Practices

### DO

- Mix English and Japanese text (日本語)
- Add VHS timestamps to corners (12:34:56)
- Use chromatic aberration on headings
- Layer transparent gradients
- Include scanline overlays on images/cards

### DON'T

- Use harsh white backgrounds
- Forget the eternal sunset palette
- Skip the grid perspective floors
- Use modern, minimalist typography
- Let the mall die

---

## Animation Reference

```css
/* VHS tracking effect */
@keyframes vaporwave-tracking {
  0%, 100% { transform: translateX(0); }
  10% { transform: translateX(-2px); }
  20% { transform: translateX(2px); }
}

/* Neon flicker */
@keyframes vaporwave-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
  52% { opacity: 1; }
  54% { opacity: 0.9; }
}

/* Horizon pulse */
@keyframes vaporwave-horizon {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
```

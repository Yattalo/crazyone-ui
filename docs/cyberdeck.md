# Cyberdeck Integration Guide

> Terminal aesthetic. Neon-lit hacker vibes. Components for those who speak in code.

## Quick Start

```bash
bun add @crazyone/ui-cyberdeck
```

```tsx
import { Button, Card } from "@crazyone/ui-cyberdeck";
```

---

## CSS Variables

Copy these into your `globals.css`:

```css
[data-theme="cyberdeck"] {
  /* Core palette */
  --background: 120 10% 5%;
  --foreground: 120 100% 60%;
  --card: 120 10% 8%;
  --card-foreground: 120 100% 60%;
  --primary: 120 100% 50%;
  --primary-foreground: 120 10% 5%;
  --secondary: 120 50% 20%;
  --secondary-foreground: 120 100% 60%;
  --muted: 120 10% 15%;
  --muted-foreground: 120 50% 40%;
  --accent: 120 100% 50%;
  --accent-foreground: 120 10% 5%;
  --destructive: 0 100% 50%;
  --destructive-foreground: 0 0% 100%;
  --border: 120 100% 30%;
  --input: 120 10% 10%;
  --ring: 120 100% 50%;
  --radius: 0px;

  /* Cyberdeck-specific */
  --cyber-green: #00ff00;
  --cyber-dark: #0a0f0a;
  --cyber-glow: 0 0 20px rgba(0, 255, 0, 0.5);
}
```

---

## Google Fonts

Add to your `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
```

Tailwind config:

```js
fontFamily: {
  mono: ["JetBrains Mono", "monospace"],
}
```

---

## Utility Classes

```css
/* Terminal cursor blink */
.cyber-cursor::after {
  content: "_";
  animation: cyber-cursor-blink 1s step-end infinite;
}

@keyframes cyber-cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Matrix glow effect */
.cyber-glow {
  text-shadow: 0 0 10px hsl(var(--primary));
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
}

/* Scanline overlay */
.cyber-scanlines::before {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    transparent,
    transparent 2px,
    rgba(0, 255, 0, 0.03) 2px,
    rgba(0, 255, 0, 0.03) 4px
  );
  pointer-events: none;
}

/* Boot sequence animation */
.cyber-boot {
  animation: cyber-boot 0.1s steps(1) forwards;
}

@keyframes cyber-boot {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

---

## Component Examples

### Button

```tsx
import { Button } from "@crazyone/ui-cyberdeck";

// Primary - matrix green
<Button>EXECUTE</Button>

// Secondary - dimmed terminal
<Button variant="secondary">CANCEL</Button>

// With terminal prefix
<Button>
  <span className="opacity-60 mr-2">$</span>
  RUN PROGRAM
</Button>
```

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@crazyone/ui-cyberdeck";

<Card className="cyber-scanlines relative">
  <CardHeader>
    <CardTitle className="font-mono text-sm">
      <span className="opacity-60">&gt;</span> SYSTEM_STATUS
      <span className="cyber-cursor" />
    </CardTitle>
  </CardHeader>
  <CardContent className="font-mono text-xs space-y-1">
    <p>CPU: <span className="text-primary">OK</span></p>
    <p>MEM: <span className="text-primary">8.2GB FREE</span></p>
    <p>NET: <span className="text-primary">CONNECTED</span></p>
  </CardContent>
</Card>
```

### Dialog (Terminal Modal)

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@crazyone/ui-cyberdeck";

<Dialog>
  <DialogTrigger asChild>
    <Button>$ sudo modal</Button>
  </DialogTrigger>
  <DialogContent className="font-mono">
    <DialogHeader>
      <DialogTitle className="text-sm">
        <span className="opacity-60">[root@deck]#</span> CONFIRM
      </DialogTitle>
    </DialogHeader>
    <div className="text-xs space-y-2">
      <p>&gt; Operation requires elevated privileges</p>
      <p>&gt; Continue? [Y/n]<span className="cyber-cursor" /></p>
    </div>
  </DialogContent>
</Dialog>
```

---

## Layout Templates

### Boot Sequence Header

```tsx
<header className="border-b border-primary/30 p-4 font-mono">
  <div className="flex items-center justify-between text-xs">
    <div className="space-y-1">
      <p className="cyber-boot" style={{ animationDelay: "0s" }}>
        <span className="text-primary">&gt;</span> LOADING CYBERDECK_UI v0.1.0
      </p>
      <p className="cyber-boot" style={{ animationDelay: "0.1s" }}>
        <span className="text-primary">&gt;</span> MODULES: [OK]
      </p>
      <p className="cyber-boot" style={{ animationDelay: "0.2s" }}>
        <span className="text-primary">&gt;</span> STATUS: ONLINE
        <span className="cyber-cursor" />
      </p>
    </div>
    <div className="text-right text-muted-foreground">
      <p>USER: guest</p>
      <p>UPTIME: 00:42:17</p>
    </div>
  </div>
</header>
```

### Terminal Grid

```tsx
<div className="grid grid-cols-12 gap-2 p-4 font-mono text-xs">
  <Card className="col-span-8 p-4">
    <div className="flex items-center gap-2 mb-4 text-muted-foreground">
      <span className="w-3 h-3 rounded-full bg-destructive" />
      <span className="w-3 h-3 rounded-full bg-yellow-500" />
      <span className="w-3 h-3 rounded-full bg-primary" />
      <span className="ml-2">~/projects/deck</span>
    </div>
    <pre className="text-primary">
{`$ ls -la
drwxr-xr-x  user  4096  components/
drwxr-xr-x  user  4096  styles/
-rw-r--r--  user  2048  config.ts
$ _`}
    </pre>
  </Card>

  <Card className="col-span-4 p-4">
    <p className="text-muted-foreground mb-2">[SYSTEM MONITOR]</p>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>CPU</span>
        <span className="text-primary">23%</span>
      </div>
      <div className="h-2 bg-muted">
        <div className="h-full bg-primary w-[23%]" />
      </div>
    </div>
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
      colors: {
        cyber: {
          green: "#00ff00",
          dark: "#0a0f0a",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "cyber-glow": "0 0 20px rgba(0, 255, 0, 0.3)",
        "cyber-glow-lg": "0 0 40px rgba(0, 255, 0, 0.4)",
      },
      animation: {
        "cursor-blink": "cyber-cursor-blink 1s step-end infinite",
        "matrix-rain": "cyber-matrix 2s linear infinite",
        boot: "cyber-boot 0.1s steps(1) forwards",
      },
      keyframes: {
        "cyber-cursor-blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        "cyber-matrix": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "cyber-boot": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
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
| `--background` | 120 10% 5% | #0a0f0a | Terminal black |
| `--foreground` | 120 100% 60% | #33ff33 | Matrix green |
| `--primary` | 120 100% 50% | #00ff00 | Bright green |
| `--muted` | 120 10% 15% | #1a261a | Dim areas |
| `--destructive` | 0 100% 50% | #ff0000 | Error red |

---

## Best Practices

### DO

- Use monospace fonts everywhere
- Add blinking cursor effects
- Prefix actions with `$` or `>`
- Include system metrics (CPU, MEM, NET)
- Stagger boot animations with delays

### DON'T

- Use colors outside green/red spectrum
- Add rounded corners
- Skip the terminal aesthetic
- Use non-technical language
- Forget the scanline overlays

---

## Animation Reference

```css
/* Cursor blink */
@keyframes cyber-cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Matrix rain */
@keyframes cyber-matrix {
  0% { transform: translateY(-100%); opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0.3; }
}

/* Glitch effect */
@keyframes cyber-glitch {
  0%, 100% { clip-path: inset(0 0 0 0); }
  10% { clip-path: inset(10% 0 60% 0); }
  20% { clip-path: inset(40% 0 20% 0); }
  30% { clip-path: inset(80% 0 5% 0); }
}

/* Flicker */
@keyframes cyber-flicker {
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.8; }
  94% { opacity: 1; }
  95% { opacity: 0.9; }
}
```

# Theme Generator

Sistema di generazione automatica per i theme packages di CrazyOne UI.

## Struttura

```
theme-generator/
├── schema.ts           # TypeScript types per la configurazione
├── generate.ts         # Script principale di generazione
├── configs/            # Configurazioni dei temi
│   ├── vega.ts
│   ├── cyberdeck.ts
│   └── ...
└── templates/          # Template dei componenti
    ├── button.ts
    ├── card.ts
    └── all-components.ts
```

## Uso

### Generare un singolo tema

```bash
bun run generate:theme vega
```

### Generare tutti i temi

```bash
bun run generate:theme
```

## Creare un nuovo tema

1. Crea un file `theme-generator/configs/NOME-TEMA.ts`
2. Esporta un oggetto `ThemeConfig` come default
3. Esegui `bun run generate:theme NOME-TEMA`

### Esempio configurazione base

```typescript
import type { ThemeConfig } from "../schema";

const config: ThemeConfig = {
  themeName: "MyTheme",
  themeSlug: "mytheme",
  description: "Description of the theme",
  cssStructure: "single-file", // or "split-files" for animations
  cssVariables: {
    light: {
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      // ... altre variabili CSS (formato HSL senza hsl())
    },
    dark: {
      // ... variabili per dark mode (opzionale)
    },
  },
  componentStyles: {
    button: {
      baseClasses: "font-semibold", // classi aggiuntive
    },
  },
};

export default config;
```

### Configurazione con animazioni

Per temi con animazioni, usa `cssStructure: "split-files"` e aggiungi `animations`:

```typescript
const config: ThemeConfig = {
  // ...
  cssStructure: "split-files",
  animations: [
    {
      name: "my-animation",
      keyframes: `@keyframes my-animation {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }`,
      utilityClass: {
        className: "my-animate",
        cssRule: "animation: my-animation 1s ease-in-out;",
      },
    },
  ],
};
```

## Vantaggi

- **Single Source of Truth**: Le configurazioni sono centralizzate
- **Manutenzione semplificata**: Modifica un template → rigenera tutti i temi
- **Consistenza**: Tutti i packages seguono la stessa struttura
- **Estensibilità**: Facile aggiungere nuovi componenti o proprietà

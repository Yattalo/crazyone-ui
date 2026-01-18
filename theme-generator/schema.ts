/**
 * Theme Generator Schema
 * Defines the structure for theme configuration files
 */

export interface CSSColorVars {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover?: string;
  "popover-foreground"?: string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  border: string;
  input: string;
  ring: string;
  radius: string;
  // Chart colors (optional)
  "chart-1"?: string;
  "chart-2"?: string;
  "chart-3"?: string;
  "chart-4"?: string;
  "chart-5"?: string;
}

export interface Animation {
  name: string;
  keyframes: string;
  utilityClass?: {
    className: string;
    cssRule: string;
  };
}

export interface ComponentStyle {
  /** Base classes for cva() first argument */
  baseClasses: string;
  /** Variant overrides (key = variant name, value = classes) */
  variantOverrides?: Record<string, string>;
  /** Additional features like pseudo-elements */
  additionalFeatures?: string[];
}

export interface ThemeConfig {
  /** Display name (e.g., "Cyberdeck") */
  themeName: string;
  /** Package slug (e.g., "cyberdeck") */
  themeSlug: string;
  /** Short description */
  description: string;
  /** CSS file structure: single-file or split-files */
  cssStructure: "single-file" | "split-files";
  /** CSS custom properties */
  cssVariables: {
    light: CSSColorVars;
    dark?: CSSColorVars;
    customProperties?: Record<string, string>;
  };
  /** Custom animations */
  animations?: Animation[];
  /** Component style overrides */
  componentStyles: {
    button?: ComponentStyle;
    card?: ComponentStyle;
    input?: ComponentStyle;
    badge?: ComponentStyle;
    alert?: ComponentStyle;
    checkbox?: ComponentStyle;
    dialog?: ComponentStyle;
    select?: ComponentStyle;
    slider?: ComponentStyle;
    switch?: ComponentStyle;
    tabs?: ComponentStyle;
    tooltip?: ComponentStyle;
  };
  /** Theme signature tokens */
  themeSignature?: string;
}

/** List of all components that can be generated */
export const COMPONENT_NAMES = [
  "alert",
  "badge",
  "button",
  "card",
  "checkbox",
  "dialog",
  "input",
  "select",
  "slider",
  "switch",
  "tabs",
  "tooltip",
] as const;

export type ComponentName = (typeof COMPONENT_NAMES)[number];

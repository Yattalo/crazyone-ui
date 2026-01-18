#!/usr/bin/env bun
/**
 * Theme Package Generator
 *
 * Generates or updates theme packages from configuration files.
 * Usage: bun run theme-generator/generate.ts [theme-slug]
 *
 * If no theme-slug is provided, generates all themes.
 */

import { mkdir, writeFile, readdir, exists } from "node:fs/promises";
import { join } from "node:path";
import type { ThemeConfig, CSSColorVars } from "./schema";
import { generateButton } from "./templates/button";
import { generateCard } from "./templates/card";
import {
  generateInput,
  generateBadge,
  generateAlert,
  generateCheckbox,
  generateSwitch,
  generateSlider,
  generateTabs,
  generateTooltip,
  generateSelect,
  generateDialog,
} from "./templates/all-components";

const ROOT_DIR = import.meta.dir.replace("/theme-generator", "");
const PACKAGES_DIR = join(ROOT_DIR, "packages");
const CONFIGS_DIR = join(ROOT_DIR, "theme-generator/configs");

// ============================================
// CSS GENERATORS
// ============================================

function generateCSSVariables(vars: CSSColorVars, indent = "    "): string {
  const entries = Object.entries(vars);
  return entries.map(([key, value]) => `${indent}--${key}: ${value};`).join("\n");
}

function generateVariablesCSS(config: ThemeConfig): string {
  const { cssVariables, themeName, themeSlug, description } = config;

  let css = `/* ${themeName} Theme - ${description} */\n\n`;

  css += `@layer base {\n`;
  css += `  :root, [data-theme="${themeSlug}"] {\n`;
  css += generateCSSVariables(cssVariables.light);
  css += "\n";

  if (cssVariables.customProperties) {
    css += "\n    /* Theme-specific custom properties */\n";
    for (const [key, value] of Object.entries(cssVariables.customProperties)) {
      css += `    ${key}: ${value};\n`;
    }
  }

  css += `  }\n`;

  if (cssVariables.dark) {
    css += `\n  .dark {\n`;
    css += generateCSSVariables(cssVariables.dark);
    css += `\n  }\n`;
  }

  css += `}\n`;

  if (config.themeSignature) {
    css += `\n/* Theme Signature: ${config.themeSignature} */\n`;
  }

  return css;
}

function generateAnimationsCSS(config: ThemeConfig): string {
  if (!config.animations || config.animations.length === 0) {
    return "";
  }

  let css = `/* ${config.themeName} Theme Animations */\n`;
  css += `/* ${config.description} */\n\n`;

  // Keyframes
  for (const animation of config.animations) {
    css += `${animation.keyframes}\n\n`;
  }

  // Utility classes
  const utilitiesWithClasses = config.animations.filter((a) => a.utilityClass);
  if (utilitiesWithClasses.length > 0) {
    css += `/* Utility classes */\n`;
    for (const animation of utilitiesWithClasses) {
      if (animation.utilityClass) {
        css += `.${animation.utilityClass.className} {\n`;
        css += `  ${animation.utilityClass.cssRule}\n`;
        css += `}\n\n`;
      }
    }
  }

  return css;
}

function generateSingleStylesCSS(config: ThemeConfig): string {
  let css = `/* ${config.themeName} Theme - ${config.description} */\n`;
  css += `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n`;

  css += `@layer base {\n`;
  css += `  :root {\n`;
  css += generateCSSVariables(config.cssVariables.light);
  css += `\n  }\n`;

  if (config.cssVariables.dark) {
    css += `\n  .dark {\n`;
    css += generateCSSVariables(config.cssVariables.dark);
    css += `\n  }\n`;
  }

  css += `}\n\n`;

  css += `@layer base {\n`;
  css += `  * {\n    @apply border-border;\n  }\n`;
  css += `  body {\n    @apply bg-background text-foreground;\n  }\n`;
  css += `}\n`;

  return css;
}

// ============================================
// PACKAGE.JSON & TSCONFIG GENERATORS
// ============================================

function generatePackageJson(config: ThemeConfig): string {
  return JSON.stringify(
    {
      name: `@crazyone/ui-${config.themeSlug}`,
      version: "0.1.0",
      type: "module",
      main: "./dist/index.js",
      module: "./dist/index.js",
      types: "./dist/index.d.ts",
      exports: {
        ".": {
          import: "./dist/index.js",
          types: "./dist/index.d.ts",
        },
        "./styles.css":
          config.cssStructure === "single-file"
            ? "./src/styles.css"
            : "./src/styles/variables.css",
      },
      scripts: {
        build:
          "tsup src/index.ts --format esm --dts --external react --external lucide-react",
        dev: "tsup src/index.ts --format esm --dts --external react --external lucide-react --watch",
      },
      dependencies: {
        "@crazyone/ui-core": "workspace:*",
        "@radix-ui/react-checkbox": "^1.1.0",
        "@radix-ui/react-dialog": "^1.1.0",
        "@radix-ui/react-select": "^2.1.0",
        "@radix-ui/react-slider": "^1.2.0",
        "@radix-ui/react-slot": "^1.1.0",
        "@radix-ui/react-switch": "^1.1.0",
        "@radix-ui/react-tabs": "^1.1.0",
        "@radix-ui/react-tooltip": "^1.1.0",
        "class-variance-authority": "^0.7.0",
      },
      devDependencies: {
        "@types/react": "^18.3.0",
        tsup: "^8.0.0",
        typescript: "^5.7.0",
      },
      peerDependencies: {
        react: "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0",
      },
    },
    null,
    2
  );
}

function generateTsConfig(): string {
  return JSON.stringify(
    {
      extends: "../../tsconfig.base.json",
      compilerOptions: {
        outDir: "./dist",
        rootDir: "./src",
        noEmit: false,
      },
      include: ["src/**/*"],
      exclude: ["node_modules", "dist"],
    },
    null,
    2
  );
}

// ============================================
// INDEX.TS GENERATOR
// ============================================

function generateIndexTs(): string {
  return `export * from "./components/alert";
export * from "./components/badge";
export * from "./components/button";
export * from "./components/card";
export * from "./components/checkbox";
export * from "./components/dialog";
export * from "./components/input";
export * from "./components/select";
export * from "./components/slider";
export * from "./components/switch";
export * from "./components/tabs";
export * from "./components/tooltip";
`;
}

// ============================================
// MAIN GENERATOR
// ============================================

async function generateThemePackage(config: ThemeConfig): Promise<void> {
  const packageDir = join(PACKAGES_DIR, `ui-${config.themeSlug}`);
  const srcDir = join(packageDir, "src");
  const componentsDir = join(srcDir, "components");

  console.log(`\n📦 Generating package: @crazyone/ui-${config.themeSlug}`);

  // Create directories
  await mkdir(componentsDir, { recursive: true });

  if (config.cssStructure === "split-files") {
    await mkdir(join(srcDir, "styles"), { recursive: true });
  }

  // Generate package.json and tsconfig.json
  await writeFile(
    join(packageDir, "package.json"),
    generatePackageJson(config)
  );
  await writeFile(join(packageDir, "tsconfig.json"), generateTsConfig());

  // Generate CSS
  if (config.cssStructure === "single-file") {
    await writeFile(
      join(srcDir, "styles.css"),
      generateSingleStylesCSS(config)
    );
  } else {
    await writeFile(
      join(srcDir, "styles", "variables.css"),
      generateVariablesCSS(config)
    );
    const animationsCSS = generateAnimationsCSS(config);
    if (animationsCSS) {
      await writeFile(join(srcDir, "styles", "animations.css"), animationsCSS);
    }
  }

  // Generate components
  const components = [
    { name: "alert", generate: generateAlert },
    { name: "badge", generate: generateBadge },
    { name: "button", generate: generateButton },
    { name: "card", generate: generateCard },
    { name: "checkbox", generate: generateCheckbox },
    { name: "dialog", generate: generateDialog },
    { name: "input", generate: generateInput },
    { name: "select", generate: generateSelect },
    { name: "slider", generate: generateSlider },
    { name: "switch", generate: generateSwitch },
    { name: "tabs", generate: generateTabs },
    { name: "tooltip", generate: generateTooltip },
  ];

  for (const { name, generate } of components) {
    await writeFile(join(componentsDir, `${name}.tsx`), generate(config));
  }

  // Generate index.ts
  await writeFile(join(srcDir, "index.ts"), generateIndexTs());

  console.log(`   ✅ Generated ${components.length} components`);
  console.log(
    `   ✅ Generated CSS (${config.cssStructure === "single-file" ? "single file" : "split files"})`
  );
}

async function loadThemeConfig(slug: string): Promise<ThemeConfig> {
  const configPath = join(CONFIGS_DIR, `${slug}.ts`);
  if (!(await exists(configPath))) {
    throw new Error(`Config not found: ${configPath}`);
  }

  const module = await import(configPath);
  return module.default as ThemeConfig;
}

async function getAllThemeSlugs(): Promise<string[]> {
  const files = await readdir(CONFIGS_DIR);
  return files
    .filter((f) => f.endsWith(".ts") && !f.startsWith("_"))
    .map((f) => f.replace(".ts", ""));
}

async function main() {
  const args = process.argv.slice(2);
  const specificTheme = args[0];

  console.log("🎨 CrazyOne UI Theme Generator\n");

  if (specificTheme) {
    // Generate single theme
    const config = await loadThemeConfig(specificTheme);
    await generateThemePackage(config);
  } else {
    // Generate all themes
    const slugs = await getAllThemeSlugs();
    console.log(`Found ${slugs.length} theme configs\n`);

    for (const slug of slugs) {
      try {
        const config = await loadThemeConfig(slug);
        await generateThemePackage(config);
      } catch (error) {
        console.error(`❌ Failed to generate ${slug}:`, error);
      }
    }
  }

  console.log("\n✨ Generation complete!");
}

main().catch(console.error);

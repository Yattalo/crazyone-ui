/**
 * Build Registry Script
 *
 * Generates shadcn-compatible registry JSON files from the theme packages.
 * This script reads component source files and outputs registry-item.json
 * files that can be consumed by `bunx shadcn@latest add @crazyone/<component>`.
 *
 * Usage: bun run scripts/build-registry.ts
 */

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, basename } from "node:path";
import { existsSync } from "node:fs";

const PACKAGES_DIR = join(import.meta.dir, "..", "packages");
const REGISTRY_DIR = join(import.meta.dir, "..", "registry");
const THEMES = ["vega", "nova", "maia", "lyra", "mira"] as const;

interface RegistryItem {
  $schema: string;
  name: string;
  type: "registry:ui" | "registry:block" | "registry:style";
  title: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: Array<{
    path: string;
    type: string;
    content: string;
  }>;
}

interface ComponentInfo {
  name: string;
  path: string;
  theme: string;
}

async function findComponents(theme: string): Promise<ComponentInfo[]> {
  const componentsDir = join(PACKAGES_DIR, `ui-${theme}`, "src", "components");

  if (!existsSync(componentsDir)) {
    console.log(`  No components directory for ui-${theme}`);
    return [];
  }

  const files = await readdir(componentsDir);
  const components: ComponentInfo[] = [];

  for (const file of files) {
    if (file.endsWith(".tsx")) {
      components.push({
        name: basename(file, ".tsx"),
        path: join(componentsDir, file),
        theme,
      });
    }
  }

  return components;
}

async function buildComponentRegistry(
  component: ComponentInfo
): Promise<RegistryItem> {
  const content = await readFile(component.path, "utf-8");

  // Extract dependencies from imports
  const dependencies: string[] = [];
  const radixImports = content.match(/@radix-ui\/[a-z-]+/g);
  if (radixImports) {
    dependencies.push(...new Set(radixImports));
  }
  if (content.includes("class-variance-authority")) {
    dependencies.push("class-variance-authority");
  }

  // Always include core dependency
  dependencies.push("@crazyone/ui-core");

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: component.name,
    type: "registry:ui",
    title: component.name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    description: `${component.name} component with ${component.theme} theme styling`,
    dependencies: [...new Set(dependencies)],
    registryDependencies: [],
    files: [
      {
        path: `ui/${component.name}.tsx`,
        type: "registry:ui",
        content,
      },
    ],
  };
}

async function buildThemeRegistry(theme: string): Promise<void> {
  console.log(`Building registry for theme: ${theme}`);

  const components = await findComponents(theme);
  console.log(`  Found ${components.length} components`);

  // Ensure theme registry directory exists
  const themeRegistryDir = join(REGISTRY_DIR, "components", theme);
  await mkdir(themeRegistryDir, { recursive: true });

  for (const component of components) {
    const registryItem = await buildComponentRegistry(component);
    const outputPath = join(themeRegistryDir, `${component.name}.json`);

    await writeFile(outputPath, JSON.stringify(registryItem, null, 2));
    console.log(`  Generated: ${component.name}.json`);
  }
}

async function updateMainIndex(): Promise<void> {
  console.log("Updating main registry index...");

  const indexPath = join(REGISTRY_DIR, "index.json");
  const existingIndex = existsSync(indexPath)
    ? JSON.parse(await readFile(indexPath, "utf-8"))
    : {
        $schema: "https://ui.shadcn.com/schema/registry.json",
        name: "@crazyone",
        homepage: "https://design.acme.dev",
        items: [],
        themes: [],
      };

  // Collect all unique component names across themes
  const allComponents = new Set<string>();

  for (const theme of THEMES) {
    const components = await findComponents(theme);
    for (const component of components) {
      allComponents.add(component.name);
    }
  }

  // Update items list
  existingIndex.items = Array.from(allComponents).map((name) => ({
    name,
    type: "registry:ui",
    registryDependencies: [],
  }));

  // Ensure themes are listed
  existingIndex.themes = THEMES.map((theme) => ({
    name: theme,
    label: theme.charAt(0).toUpperCase() + theme.slice(1),
    description: getThemeDescription(theme),
  }));

  await writeFile(indexPath, JSON.stringify(existingIndex, null, 2));
  console.log("  Updated index.json");
}

function getThemeDescription(theme: string): string {
  const descriptions: Record<string, string> = {
    vega: "Modern, high-contrast theme with sharp edges",
    nova: "Soft, warm theme with rounded corners",
    maia: "Minimal, monochrome theme with clean lines",
    lyra: "Vibrant, colorful theme with purple accents",
    mira: "Classic, corporate theme with navy tones",
  };
  return descriptions[theme] ?? "";
}

async function main(): Promise<void> {
  console.log("=== Building Design System Registry ===\n");

  // Build registry for each theme
  for (const theme of THEMES) {
    await buildThemeRegistry(theme);
  }

  // Update main index
  await updateMainIndex();

  console.log("\n=== Registry build complete ===");
}

main().catch(console.error);

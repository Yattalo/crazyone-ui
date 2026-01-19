---
name: visual-regression
description: This skill should be used when running snapshot tests on components to detect visual changes. Triggers include "verify visual regressions", "run snapshot tests", "check component screenshots", "compare visual changes", "test theme appearance", or before releasing theme changes. Uses Playwright to capture and compare screenshots.
---

# Visual Regression Testing

Capture and compare component screenshots to detect unintended visual changes.

## Commands

```bash
bun run test:visual                    # Run tests
bun run test:visual --update-snapshots # Update baselines
```

## First-Time Setup

### 1. Install Dependencies

```bash
bun add -D @playwright/test
bunx playwright install chromium
```

### 2. Create Config

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  snapshotDir: "./tests/visual/__snapshots__",
  outputDir: "./tests/visual/results",
  fullyParallel: true,
  use: { baseURL: "http://localhost:5173" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "bun run dev --filter=showcase",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
```

### 3. Add Scripts to package.json

```json
{
  "test:visual": "playwright test",
  "test:visual:update": "playwright test --update-snapshots"
}
```

### 4. Create Test Directory

```bash
mkdir -p tests/visual
```

## Writing Tests

Create `tests/visual/themes.spec.ts`:

```typescript
import { test, expect } from "@playwright/test";

const THEMES = ["brutalist", "vaporwave", "cyberdeck"] as const;

test.describe("Theme Visual Regression", () => {
  for (const theme of THEMES) {
    test(`${theme} renders correctly`, async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${theme}-full.png`, {
        fullPage: true,
        animations: "disabled",
      });
    });
  }
});
```

## Workflow

1. Run `bun run test:visual` before changes (baseline)
2. Make component/theme changes
3. Run `bun run test:visual` to detect diffs
4. Review `tests/visual/results/` for failed comparisons
5. If changes are intentional: `bun run test:visual --update-snapshots`
6. Commit updated snapshots

## Best Practices

- Use `animations: "disabled"` to avoid flaky tests
- Use `waitForLoadState("networkidle")` before capturing
- Use `data-testid` attributes for element selection
- Capture component containers, not full pages, for unit tests

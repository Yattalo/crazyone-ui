---
name: visual-regression
description: Runs snapshot tests on Storybook for a set of components.
---

# Visual Regression

**Trigger**: "Verify visual regressions on X"

## Steps
1.  **Build**: Build Storybook `apps/storybook`.
2.  **Test**: Run Chromatic or Playwright snapshot tests against the build.
3.  **Report**: Output diffs or link to report.

#!/bin/bash

# Add missing radix-ui dependencies to all theme packages

THEMES=(
  "ui-vega"
  "ui-lyra"
  "ui-maia"
  "ui-nova"
  "ui-mira"
  "ui-arctic"
  "ui-bauhaus"
  "ui-bioluminescent"
  "ui-blackletter"
  "ui-campfire"
  "ui-darkroom"
  "ui-gelato"
  "ui-greenhouse"
  "ui-nightclub"
  "ui-obsidian"
  "ui-retrofuture"
  "ui-synthwave"
  "ui-terracotta"
  "ui-thunderstorm"
  "ui-wireframe"
)

PACKAGES_DIR="/Users/luckyluke/Desktop/01_Active_Projects/testshad/design-system-hub/packages"

for theme in "${THEMES[@]}"; do
  pkgjson="$PACKAGES_DIR/$theme/package.json"

  if [ -f "$pkgjson" ]; then
    # Use node to safely add deps
    node -e "
      const fs = require('fs');
      const pkg = JSON.parse(fs.readFileSync('$pkgjson', 'utf8'));

      // Add missing deps
      pkg.dependencies = pkg.dependencies || {};
      pkg.dependencies['@radix-ui/react-dialog'] = '^1.1.0';
      pkg.dependencies['@radix-ui/react-tabs'] = '^1.1.0';
      pkg.dependencies['@radix-ui/react-tooltip'] = '^1.1.0';

      // Sort dependencies
      const sorted = {};
      Object.keys(pkg.dependencies).sort().forEach(key => {
        sorted[key] = pkg.dependencies[key];
      });
      pkg.dependencies = sorted;

      fs.writeFileSync('$pkgjson', JSON.stringify(pkg, null, 2) + '\n');
      console.log('Updated: $theme');
    "
  fi
done

echo "All package.json files updated!"

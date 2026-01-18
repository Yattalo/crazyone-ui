#!/bin/bash

# Script to update all theme index.ts files with complete exports

THEMES=(
  "ui-vega:Vega Theme - Modern, high-contrast blue"
  "ui-lyra:Lyra Theme - Vibrant purple/pink gradients"
  "ui-maia:Maia Theme - Minimal monochrome grayscale"
  "ui-nova:Nova Theme - Soft, warm orange rounded"
  "ui-mira:Mira Theme - Classic corporate navy"
  "ui-arctic:Arctic Theme - Aurora borealis ice"
  "ui-bauhaus:Bauhaus Theme - Geometric primary colors"
  "ui-bioluminescent:Bioluminescent Theme - Deep sea glows"
  "ui-blackletter:Blackletter Theme - Gothic medieval"
  "ui-campfire:Campfire Theme - Warm amber flames"
  "ui-darkroom:Darkroom Theme - Photography noir"
  "ui-gelato:Gelato Theme - Sweet pastel colors"
  "ui-greenhouse:Greenhouse Theme - Botanical greens"
  "ui-nightclub:Nightclub Theme - Neon party vibes"
  "ui-obsidian:Obsidian Theme - Volcanic glass dark"
  "ui-retrofuture:Retrofuture Theme - 50s space age"
  "ui-synthwave:Synthwave Theme - 80s neon chrome"
  "ui-terracotta:Terracotta Theme - Mediterranean earth"
  "ui-thunderstorm:Thunderstorm Theme - Electric storm"
  "ui-wireframe:Wireframe Theme - Blueprint sketch"
)

PACKAGES_DIR="/Users/luckyluke/Desktop/01_Active_Projects/testshad/design-system-hub/packages"

for entry in "${THEMES[@]}"; do
  THEME="${entry%%:*}"
  DESC="${entry#*:}"

  INDEX_FILE="$PACKAGES_DIR/$THEME/src/index.ts"

  if [ -d "$PACKAGES_DIR/$THEME" ]; then
    cat > "$INDEX_FILE" << EOF
// @crazyone/$THEME
// $DESC

export * from "./components/button";
export * from "./components/card";
export * from "./components/input";
export * from "./components/checkbox";
export * from "./components/switch";
export * from "./components/slider";
export * from "./components/select";
export * from "./components/alert";
export * from "./components/badge";
export * from "./components/dialog";
export * from "./components/tabs";
export * from "./components/tooltip";
EOF
    echo "Updated: $INDEX_FILE"
  else
    echo "Skipped (not found): $PACKAGES_DIR/$THEME"
  fi
done

echo "All theme index.ts files updated!"

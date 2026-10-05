# Ein UI Custom Themes from OKLCH Palettes

Create custom Ein UI color themes using OKLCH palettes. Every project gets a unique palette derived from the user's anchor color.

## Quick Start

### 1. Get the Anchor Color

Ask the user for their brand/primary color and convert to OKLCH format.
Use [oklch.com](https://oklch.com) or [OKLCH Color Palette Generator](https://gloss-modern-smile.figma.site/) to find OKLCH values.

### 2. Create Palette JSON

```json
{
  "name": "brand",
  "anchor": { "oklch": { "l": 0.60, "c": 0.15, "h": 280 } }
}
```

### 3. Generate Theme CSS

```bash
npx ts-node scripts/palette-to-einui.ts brand-palette.json > theme.css
```

### 4. Add to Your Project

```css
/* globals.css */
@import './theme.css';
```

---

## Palette JSON Formats

### Minimal Format (anchor only)

The converter generates all 7 colors algorithmically from the anchor:

```json
{
  "name": "brand",
  "anchor": { "oklch": { "l": 0.60, "c": 0.15, "h": 280 } }
}
```

### Full Format (from OKLCH Generator)

If using the [OKLCH Color Palette Generator](https://gloss-modern-smile.figma.site/):

```json
{
  "name": "brand",
  "anchor": {
    "oklch": { "l": 0.60, "c": 0.15, "h": 280 }
  },
  "colors": [
    { "index": 0, "oklch": { "l": 0.20, "c": 0.045, "h": 280 } },
    { "index": 1, "oklch": { "l": 0.35, "c": 0.084, "h": 280 } },
    { "index": 2, "oklch": { "l": 0.48, "c": 0.119, "h": 280 } },
    { "index": 3, "oklch": { "l": 0.60, "c": 0.150, "h": 280 } },
    { "index": 4, "oklch": { "l": 0.73, "c": 0.116, "h": 280 } },
    { "index": 5, "oklch": { "l": 0.85, "c": 0.075, "h": 280 } },
    { "index": 6, "oklch": { "l": 0.95, "c": 0.045, "h": 280 } }
  ],
  "settings": {
    "colorCount": 7,
    "lightnessRange": { "min": 0.20, "max": 0.95 },
    "curveType": "quadratic",
    "direction": "ease-out"
  }
}
```

---

## Output: Generated CSS Variables

All values in `oklch()` format — no rgba or hex.

```css
/* Ein UI Theme: brand */
/* Generated from OKLCH palette — all values in oklch() format */

:root {
  /* Master Palette (OKLCH) */
  --color-1: oklch(0.95 0.045 280);
  --color-2: oklch(0.85 0.075 280);
  --color-3: oklch(0.73 0.116 280);
  --color-4: oklch(0.60 0.150 280);   /* Anchor */
  --color-5: oklch(0.48 0.119 280);
  --color-6: oklch(0.35 0.084 280);
  --color-7: oklch(0.20 0.045 280);

  /* Semantic Mappings */
  --background: var(--color-7);
  --foreground: var(--color-1);
  --primary: var(--color-4);
  --primary-foreground: var(--color-1);
  --secondary: var(--color-6);
  --secondary-foreground: var(--color-2);
  --accent: var(--color-5);
  --border: var(--color-6);
  --ring: var(--color-4);

  /* Status Colors */
  --destructive: oklch(0.55 0.22 27);
  --success: oklch(0.60 0.17 145);
  --warning: oklch(0.75 0.15 85);

  /* Glass Effects */
  --glass-bg: oklch(from var(--color-7) l c h / 0.4);
  --glass-border: oklch(from var(--color-3) l c h / 0.15);
  --glass-blur: 16px;

  /* Glow Effects */
  --glow-primary: oklch(from var(--color-4) l c h / 0.3);
  --glow-secondary: oklch(from var(--color-5) l c h / 0.3);

  /* Text Colors */
  --text-primary: var(--color-1);
  --text-secondary: var(--color-2);
  --text-muted: var(--color-3);
}
```

---

## Variable Mapping

| Variable | Lightness | Chroma | Usage |
|----------|-----------|--------|-------|
| `--color-1` | 0.95 | ~30% of anchor | Primary text, highlights, lightest backgrounds |
| `--color-2` | 0.85 | ~50% of anchor | Secondary text, hover states |
| `--color-3` | 0.73 | ~77% of anchor | Borders, muted text, glass borders |
| `--color-4` | 0.60 | 100% (anchor) | Primary buttons, links, accents, glows |
| `--color-5` | 0.48 | ~79% of anchor | Active states, secondary glows |
| `--color-6` | 0.35 | ~56% of anchor | Card backgrounds, subtle fills |
| `--color-7` | 0.20 | ~30% of anchor | Page backgrounds, glass backgrounds |

Chroma varies with the taper formula — see SKILL.md for the algorithm.

---

## Example Themes

### Sunset (Warm Orange, H=35)

```json
{
  "name": "sunset",
  "anchor": { "oklch": { "l": 0.60, "c": 0.18, "h": 35 } }
}
```

Generated palette:
```css
--color-1: oklch(0.95 0.054 35);
--color-4: oklch(0.60 0.180 35);  /* anchor */
--color-7: oklch(0.20 0.054 35);
```

### Moss (Earthy Green, H=145)

```json
{
  "name": "moss",
  "anchor": { "oklch": { "l": 0.60, "c": 0.14, "h": 145 } }
}
```

Generated palette:
```css
--color-1: oklch(0.95 0.042 145);
--color-4: oklch(0.60 0.140 145);  /* anchor */
--color-7: oklch(0.20 0.042 145);
```

### Burgundy (Deep Red-Purple, H=340)

```json
{
  "name": "burgundy",
  "anchor": { "oklch": { "l": 0.60, "c": 0.16, "h": 340 } }
}
```

Generated palette:
```css
--color-1: oklch(0.95 0.048 340);
--color-4: oklch(0.60 0.160 340);  /* anchor */
--color-7: oklch(0.20 0.048 340);
```

---

## Integrating with Next.js

### 1. Generate theme file

```bash
npx ts-node scripts/palette-to-einui.ts brand-palette.json > app/themes/brand.css
```

### 2. Import in layout

```tsx
// app/layout.tsx
import './themes/brand.css'
import './globals.css'
```

### 3. Theme switching

```tsx
'use client'
import { useTheme } from 'next-themes'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  )
}
```

---

## OKLCH Color Space

OKLCH is a perceptually uniform color space:

- **L (Lightness)**: 0 = black, 1 = white — perceptually accurate
- **C (Chroma)**: 0 = gray, higher = more colorful — max varies by hue
- **H (Hue)**: 0-360 degrees (red≈20, yellow≈90, green≈145, blue≈250, purple≈300)

Why OKLCH over HSL:
- Colors at the same L value actually appear equally bright
- Smooth gradients without muddy middle colors
- Predictable contrast ratios for accessibility
- CSS-native: `oklch()` has 92%+ browser support

---

## Tips

1. **Ask for anchor color first** — never design without one
2. **Keep anchor at L≈0.60** — optimal for primary buttons/accents
3. **Chroma must taper** — constant chroma creates artificial "AI slop" palettes
4. **Check contrast** — ensure text is readable (4.5:1 minimum)
5. **Use oklch() everywhere** — never fall back to rgba or hex

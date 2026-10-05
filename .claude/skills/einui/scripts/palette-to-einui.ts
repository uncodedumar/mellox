/**
 * OKLCH Palette to Ein UI Theme Converter
 *
 * Converts color palettes from the OKLCH Color Palette Generator
 * (https://gloss-modern-smile.figma.site/) to Ein UI CSS variables.
 *
 * All output uses oklch() format — never rgba or hex.
 *
 * Usage:
 *   npx ts-node palette-to-einui.ts palette.json > theme.css
 *
 * Or import and use programmatically:
 *   import { convertPaletteToEinUI } from './palette-to-einui'
 */

// =============================================================================
// Types
// =============================================================================

export interface OKLCHColor {
  index: number
  hex?: string
  oklch: {
    l: number  // Lightness: 0-1
    c: number  // Chroma: 0-0.4 (saturation)
    h: number  // Hue: 0-360 degrees
  }
}

export interface OKLCHPalette {
  name?: string
  anchor: {
    hex?: string
    oklch: {
      l: number
      c: number
      h: number
    }
  }
  colors?: OKLCHColor[]
  settings?: {
    colorCount: number
    lightnessRange: { min: number; max: number }
    chromaRange?: { min: number; max: number }
    curveType?: 'linear' | 'quadratic' | 'cubic'
    direction?: 'ease-in' | 'ease-out' | 'ease-in-out'
  }
}

export interface EinUITheme {
  name: string
  variables: Record<string, string>
}

// =============================================================================
// Color Science: Chroma Variation
// =============================================================================

/**
 * Calculate chroma at a given lightness, tapering away from the anchor.
 *
 * This is the key to natural-looking palettes:
 * - Peak chroma at anchor lightness
 * - Taper to ~30% at extremes (avoids neon lights and muddy darks)
 */
function calculateChromaAtLightness(
  targetL: number,
  anchorL: number,
  anchorC: number,
  minL: number = 0.20,
  maxL: number = 0.95
): number {
  const distanceFromAnchor = Math.abs(targetL - anchorL)
  const maxDistance = Math.max(Math.abs(minL - anchorL), Math.abs(maxL - anchorL))
  const chromaFactor = 1 - (distanceFromAnchor / maxDistance) * 0.7
  return anchorC * Math.max(chromaFactor, 0.3) // Never below 30%
}

// =============================================================================
// Formatting
// =============================================================================

function oklchString(l: number, c: number, h: number, alpha?: number): string {
  if (alpha !== undefined) {
    return `oklch(${l.toFixed(2)} ${c.toFixed(3)} ${h.toFixed(0)} / ${alpha})`
  }
  return `oklch(${l.toFixed(2)} ${c.toFixed(3)} ${h.toFixed(0)})`
}

// =============================================================================
// The 7 Master Lightness Stops
// =============================================================================

const LIGHTNESS_STOPS = [
  { index: 1, l: 0.95, label: 'Lightest' },
  { index: 2, l: 0.85, label: 'Light' },
  { index: 3, l: 0.73, label: 'Medium light' },
  { index: 4, l: 0.60, label: 'Anchor / Primary' },
  { index: 5, l: 0.48, label: 'Medium dark' },
  { index: 6, l: 0.35, label: 'Dark' },
  { index: 7, l: 0.20, label: 'Darkest' },
]

// =============================================================================
// Main Converter
// =============================================================================

export function convertPaletteToEinUI(palette: OKLCHPalette): EinUITheme {
  const { anchor, name = 'custom' } = palette

  // Generate the 7 master colors with proper chroma variation
  const masterColors = LIGHTNESS_STOPS.map(stop => ({
    ...stop,
    c: stop.l === anchor.oklch.l
      ? anchor.oklch.c // Exact anchor gets full chroma
      : calculateChromaAtLightness(stop.l, anchor.oklch.l, anchor.oklch.c),
    h: anchor.oklch.h,
  }))

  const variables: Record<string, string> = {}

  // Master palette
  for (const color of masterColors) {
    variables[`--color-${color.index}`] = oklchString(color.l, color.c, color.h)
  }

  // Semantic mappings (reference master colors)
  variables['--background'] = 'var(--color-7)'
  variables['--foreground'] = 'var(--color-1)'
  variables['--primary'] = 'var(--color-4)'
  variables['--primary-foreground'] = 'var(--color-1)'
  variables['--secondary'] = 'var(--color-6)'
  variables['--secondary-foreground'] = 'var(--color-2)'
  variables['--accent'] = 'var(--color-5)'
  variables['--accent-foreground'] = 'var(--color-1)'
  variables['--muted'] = 'var(--color-6)'
  variables['--muted-foreground'] = 'var(--color-3)'
  variables['--border'] = 'var(--color-6)'
  variables['--ring'] = 'var(--color-4)'
  variables['--card'] = 'var(--color-7)'
  variables['--card-foreground'] = 'var(--color-1)'

  // Status colors (fixed hues)
  variables['--destructive'] = 'oklch(0.55 0.22 27)'
  variables['--success'] = 'oklch(0.60 0.17 145)'
  variables['--warning'] = 'oklch(0.75 0.15 85)'

  // Glass effects (derived via relative color syntax)
  variables['--glass-bg'] = 'oklch(from var(--color-7) l c h / 0.4)'
  variables['--glass-bg-light'] = 'oklch(from var(--color-7) l c h / 0.2)'
  variables['--glass-bg-solid'] = 'oklch(from var(--color-7) l c h / 0.6)'
  variables['--glass-border'] = 'oklch(from var(--color-3) l c h / 0.15)'
  variables['--glass-border-hover'] = 'oklch(from var(--color-3) l c h / 0.25)'
  variables['--glass-blur'] = '16px'
  variables['--glass-blur-light'] = '12px'
  variables['--glass-blur-heavy'] = '20px'

  // Glow effects (derived from anchor, not named colors)
  variables['--glow-primary'] = 'oklch(from var(--color-4) l c h / 0.3)'
  variables['--glow-secondary'] = 'oklch(from var(--color-5) l c h / 0.3)'

  // Text colors
  variables['--text-primary'] = 'var(--color-1)'
  variables['--text-secondary'] = 'var(--color-2)'
  variables['--text-muted'] = 'var(--color-3)'
  variables['--text-disabled'] = 'oklch(from var(--color-3) l c h / 0.5)'

  return { name, variables }
}

// =============================================================================
// CSS Output Generator
// =============================================================================

export function generateCSS(theme: EinUITheme): string {
  const lines: string[] = [
    `/* Ein UI Theme: ${theme.name} */`,
    `/* Generated from OKLCH palette — all values in oklch() format */`,
    '',
    ':root {',
  ]

  // Group variables by category
  const categories = [
    { prefix: '--color-', label: 'Master Palette (OKLCH)' },
    { prefix: '--background', label: 'Semantic Mappings' },
    { prefix: '--destructive', label: 'Status Colors' },
    { prefix: '--glass-', label: 'Glass Effects' },
    { prefix: '--glow-', label: 'Glow Effects' },
    { prefix: '--text-', label: 'Text Colors' },
  ]

  let currentCategory = ''

  for (const [key, value] of Object.entries(theme.variables)) {
    // Add category comment
    for (const cat of categories) {
      if (key.startsWith(cat.prefix) && currentCategory !== cat.label) {
        currentCategory = cat.label
        lines.push(`  /* ${cat.label} */`)
        break
      }
    }
    lines.push(`  ${key}: ${value};`)
  }

  lines.push('}')

  return lines.join('\n')
}

// =============================================================================
// Tailwind Config Generator
// =============================================================================

export function generateTailwindConfig(theme: EinUITheme): string {
  return `/* Tailwind CSS v4 theme extension for ${theme.name} */

@theme {
  --color-glass-bg: var(--glass-bg);
  --color-glass-border: var(--glass-border);
  --color-glow-primary: var(--glow-primary);
  --color-glow-secondary: var(--glow-secondary);
  --blur-glass: var(--glass-blur);
}
`
}

// =============================================================================
// Simple Palette Format (for easy manual creation)
// =============================================================================

export interface SimplePalette {
  name: string
  anchor: {
    oklch: { l: number; c: number; h: number }
  }
}

/**
 * Create a full palette from just an anchor color in OKLCH format.
 *
 * For best results, provide your anchor directly in OKLCH:
 *   { name: "brand", anchor: { oklch: { l: 0.60, c: 0.15, h: 280 } } }
 *
 * Use https://oklch.com or https://gloss-modern-smile.figma.site/ to find
 * the OKLCH values for any color.
 */
export function createPaletteFromAnchor(simple: SimplePalette): OKLCHPalette {
  return {
    name: simple.name,
    anchor: simple.anchor,
  }
}

// =============================================================================
// CLI Runner
// =============================================================================

if (require.main === module) {
  const fs = require('fs')
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log(`
OKLCH Palette to Ein UI Theme Converter

Usage:
  npx ts-node palette-to-einui.ts <palette.json> [--tailwind]

Palette format (OKLCH anchor):
{
  "name": "brand",
  "anchor": { "oklch": { "l": 0.60, "c": 0.15, "h": 280 } }
}

Full format (from OKLCH Color Palette Generator):
{
  "name": "brand",
  "anchor": { "oklch": { "l": 0.60, "c": 0.15, "h": 280 } },
  "colors": [...]
}

All output uses oklch() format. No rgba or hex.
`)
    process.exit(0)
  }

  const inputFile = args[0]
  const includeTailwind = args.includes('--tailwind')

  try {
    const input = JSON.parse(fs.readFileSync(inputFile, 'utf8'))

    let palette: OKLCHPalette
    if (input.anchor) {
      palette = input as OKLCHPalette
    } else {
      throw new Error('Invalid palette format: must include "anchor" with oklch values')
    }

    const theme = convertPaletteToEinUI(palette)
    console.log(generateCSS(theme))

    if (includeTailwind) {
      console.log('')
      console.log(generateTailwindConfig(theme))
    }
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  }
}

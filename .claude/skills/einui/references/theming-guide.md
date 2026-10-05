# Ein UI Theming Guide

Complete CSS variable configuration using OKLCH color palettes. Every project gets a unique palette derived from the user's anchor color — there are no default themes.

## CSS Variables Structure

### 1. Master Palette (7 Colors)

The foundation of the entire theme. All other variables reference these. Generated from the user's anchor color using the algorithm in SKILL.md.

```css
:root {
  --color-1: oklch(0.95 [...] [...]);  /* Lightest — text, highlights */
  --color-2: oklch(0.85 [...] [...]);  /* Light — secondary text, hover */
  --color-3: oklch(0.73 [...] [...]);  /* Medium light — borders, muted text */
  --color-4: oklch(0.60 [...] [...]);  /* Anchor — primary buttons, links */
  --color-5: oklch(0.48 [...] [...]);  /* Medium dark — active states */
  --color-6: oklch(0.35 [...] [...]);  /* Dark — card backgrounds */
  --color-7: oklch(0.20 [...] [...]);  /* Darkest — page background */
}
```

### 2. Semantic Mappings

Reference the master palette only — never define new color values here.

```css
:root {
  --background: var(--color-7);
  --foreground: var(--color-1);
  --primary: var(--color-4);
  --primary-foreground: var(--color-1);
  --secondary: var(--color-6);
  --secondary-foreground: var(--color-2);
  --accent: var(--color-5);
  --accent-foreground: var(--color-1);
  --muted: var(--color-6);
  --muted-foreground: var(--color-3);
  --border: var(--color-6);
  --ring: var(--color-4);
  --card: var(--color-7);
  --card-foreground: var(--color-1);

  /* Status colors — fixed hues, independent of palette */
  --destructive: oklch(0.55 0.22 27);
  --success: oklch(0.60 0.17 145);
  --warning: oklch(0.75 0.15 85);
}
```

### 3. Glass Effect Variables

Derived from master colors using CSS relative color syntax.

```css
:root {
  /* Glass backgrounds — darkest color with alpha */
  --glass-bg: oklch(from var(--color-7) l c h / 0.4);
  --glass-bg-light: oklch(from var(--color-7) l c h / 0.2);
  --glass-bg-solid: oklch(from var(--color-7) l c h / 0.6);

  /* Glass borders — medium-light color with alpha */
  --glass-border: oklch(from var(--color-3) l c h / 0.15);
  --glass-border-hover: oklch(from var(--color-3) l c h / 0.25);

  /* Blur intensity (not color-dependent) */
  --glass-blur: 16px;
  --glass-blur-light: 12px;
  --glass-blur-heavy: 20px;
}
```

### 4. Glow Effect Variables

Derived from anchor and adjacent colors. Never use named colors like "cyan" or "purple".

```css
:root {
  --glow-primary: oklch(from var(--color-4) l c h / 0.3);
  --glow-secondary: oklch(from var(--color-5) l c h / 0.3);
}
```

### 5. Text Color Variables

Reference master palette directly.

```css
:root {
  --text-primary: var(--color-1);
  --text-secondary: var(--color-2);
  --text-muted: var(--color-3);
  --text-disabled: oklch(from var(--color-3) l c h / 0.5);
}
```

## Glass Effect Utilities

### Base Glass Class

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 12px;
}
```

### Glow Effect Class

```css
.glass-glow {
  position: relative;
}

.glass-glow::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: linear-gradient(
    135deg,
    var(--glow-primary),
    var(--glow-secondary)
  );
  border-radius: inherit;
  opacity: 0.7;
  z-index: -1;
  filter: blur(8px);
  transition: opacity 0.3s ease;
}

.glass-glow:hover::before {
  opacity: 1;
}
```

### Animated Glow Pulse

```css
@keyframes glow-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

.glass-glow-animated::before {
  animation: glow-pulse 2s ease-in-out infinite;
}
```

## Background Gradients

Derived from palette colors — never use generic slate/purple.

```css
/* Page background */
.bg-page {
  background: linear-gradient(
    135deg,
    var(--color-7) 0%,
    var(--color-6) 50%,
    var(--color-7) 100%
  );
}

/* Decorative blur circles */
.bg-decoration-primary {
  background: oklch(from var(--color-4) l c h / 0.3);
  filter: blur(60px);
  border-radius: 50%;
}

.bg-decoration-secondary {
  background: oklch(from var(--color-5) l c h / 0.3);
  filter: blur(60px);
  border-radius: 50%;
}
```

## Dark Mode Configuration

Ein UI is designed for dark mode by default. The 7-color palette works as-is (L=0.20 backgrounds, L=0.95 text).

```css
.dark {
  /* Dark mode uses the palette as generated — no overrides needed */
}

.light {
  /* For light mode, invert the semantic mappings */
  --background: var(--color-1);
  --foreground: var(--color-7);
  --primary: var(--color-4);
  --primary-foreground: var(--color-1);
  --card: var(--color-1);
  --card-foreground: var(--color-7);
  --border: var(--color-2);
  --muted: var(--color-2);
  --muted-foreground: var(--color-5);

  /* Softer glass for light backgrounds */
  --glass-bg: oklch(from var(--color-7) l c h / 0.05);
  --glass-border: oklch(from var(--color-5) l c h / 0.1);
  --glow-primary: oklch(from var(--color-4) l c h / 0.15);
  --glow-secondary: oklch(from var(--color-5) l c h / 0.15);

  /* Text */
  --text-primary: var(--color-7);
  --text-secondary: var(--color-6);
  --text-muted: var(--color-5);
}
```

## Tailwind CSS v4 Integration

```css
@theme {
  --color-glass-bg: var(--glass-bg);
  --color-glass-border: var(--glass-border);
  --color-glow-primary: var(--glow-primary);
  --color-glow-secondary: var(--glow-secondary);
  --blur-glass: var(--glass-blur);
}
```

Usage in components:
```tsx
<div className="bg-[var(--color-7)] text-[var(--color-1)] border-[var(--color-6)]">
  Glass container using palette colors
</div>
```

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .glass-glow::before,
  .glass-glow-animated::before {
    animation: none;
    transition: none;
  }
}
```

## FORBIDDEN Practices

### Never use named color glows
```css
/* WRONG */
--glow-cyan: rgba(6, 182, 212, 0.3);
--glow-purple: rgba(147, 51, 234, 0.3);
```

### Never use rgba/hex in CSS variables
```css
/* WRONG */
--glass-bg: rgba(255, 255, 255, 0.05);
--accent: #3b82f6;
```

### Never use hardcoded Tailwind colors
```tsx
{/* WRONG */}
<div className="bg-cyan-500 text-purple-400">
<div className="from-slate-950 via-purple-900 to-slate-950">
```

### Always use master palette references
```css
/* CORRECT */
--glow-primary: oklch(from var(--color-4) l c h / 0.3);
```

```tsx
{/* CORRECT */}
<div className="bg-[var(--color-4)] text-[var(--color-1)]">
<div className="from-[var(--color-7)] via-[var(--color-6)] to-[var(--color-7)]">
```

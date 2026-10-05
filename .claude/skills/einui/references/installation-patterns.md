# Ein UI Installation Patterns

Project setup patterns for different Next.js configurations.

## New Project Setup

### 1. Create Next.js Project

```bash
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
```

### 2. Initialize Shadcn UI

```bash
npx shadcn@latest init
```

Select options:
- Style: Default
- Base color: Neutral
- CSS variables: Yes

### 3. Configure Tailwind CSS v4

Ensure `tailwind.config.ts` includes content paths:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
```

### 4. Add Ein UI Components

**Method 1: Direct Registry URL (Recommended)**
```bash
npx shadcn@latest add "https://ui.eindev.ir/r/glass-card.json" "https://ui.eindev.ir/r/glass-button.json"
```

**Method 2: Registry Namespace**

First add the registry to `components.json`:
```json
{
  "registries": {
    "@einui": "https://ui.eindev.ir/r/{name}"
  }
}
```

Then install with namespace:
```bash
npx shadcn@latest add @einui/glass-card @einui/glass-button
```

### 5. Add CSS Variables

In `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --glass-bg: oklch(from var(--color-7) l c h / 0.4);
    --glass-border: oklch(from var(--color-3) l c h / 0.15);
    --glass-blur: 16px;
    --glow-primary: oklch(from var(--color-4) l c h / 0.3);
    --glow-secondary: oklch(from var(--color-5) l c h / 0.3);
  }
}
```

## Existing Project Integration

### Verify Prerequisites

```bash
# Check Next.js version (should be 14+)
cat package.json | grep '"next"'

# Check Tailwind version (should be v4)
cat package.json | grep '"tailwindcss"'

# Check for Shadcn config
ls components.json
```

### Add Missing Dependencies

```bash
# If Shadcn not initialized
npx shadcn@latest init

# Required utilities
npm install clsx tailwind-merge
```

### Install Components

```bash
npx shadcn@latest add @einui/glass-card
```

Components install to: `components/liquid-glass/`

## Manual Component Installation

For cases where CLI installation fails:

### 1. Create Component Directory

```bash
mkdir -p components/liquid-glass
```

### 2. Create Component File

```tsx
// components/liquid-glass/glass-card.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow' | 'solid'
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border border-white/10 bg-white/5 backdrop-blur-md',
          variant === 'glow' && 'glass-glow',
          variant === 'solid' && 'bg-white/10 backdrop-blur-xl',
          className
        )}
        {...props}
      />
    )
  }
)

GlassCard.displayName = 'GlassCard'

export { GlassCard }
```

### 3. Add Utility Function

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Dark Mode Setup Patterns

### Pattern 1: next-themes (Recommended)

```bash
npm install next-themes
```

```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Pattern 2: Manual Toggle

```tsx
// components/theme-toggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { GlassButton } from '@/components/liquid-glass/glass-button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <GlassButton
      variant="ghost"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </GlassButton>
  )
}
```

## Troubleshooting

### Shadcn CLI Errors

If `npx shadcn@latest add` fails:

1. Verify `components.json` exists
2. Check npm registry access
3. Try manual installation pattern above

### Backdrop Blur Not Working

Ensure parent containers have proper stacking:

```css
/* May need explicit positioning */
.glass-container {
  position: relative;
  isolation: isolate;
}
```

### Import Path Issues

Default install location is `@/components/liquid-glass/`. Verify `tsconfig.json` has path alias:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

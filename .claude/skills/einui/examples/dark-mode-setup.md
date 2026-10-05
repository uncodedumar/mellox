# Dark Mode Setup for Ein UI

Complete guide for implementing dark mode with Ein UI components.

## Setup with next-themes

### 1. Install Dependency

```bash
npm install next-themes
```

### 2. Create Theme Provider

```tsx
// components/providers/theme-provider.tsx
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### 3. Add to Root Layout

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'

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
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 4. Create Theme Toggle Component

```tsx
// components/theme-toggle.tsx
'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { GlassButton } from '@/components/liquid-glass/glass-button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <GlassButton
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </GlassButton>
  )
}
```

## CSS Variables for Both Themes

```css
/* globals.css */
@layer base {
  :root {
    /* Light mode glass effect */
    --glass-bg: oklch(from var(--color-7) l c h / 0.05);
    --glass-border: oklch(from var(--color-5) l c h / 0.1);
    --glass-blur: 16px;
    --text-primary: var(--color-7);
    --text-secondary: var(--color-6);
  }

  .dark {
    /* Dark mode glass effect */
    --glass-bg: oklch(from var(--color-7) l c h / 0.4);
    --glass-border: oklch(from var(--color-3) l c h / 0.15);
    --glass-blur: 16px;
    --text-primary: var(--color-1);
    --text-secondary: var(--color-2);
  }
}
```

## Usage Example

```tsx
// app/page.tsx
import { GlassCard } from '@/components/liquid-glass/glass-card'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <nav className="flex justify-end p-4">
        <ThemeToggle />
      </nav>

      <div className="container mx-auto px-4 py-12">
        <GlassCard className="p-8">
          <h1 className="text-2xl font-bold text-foreground">
            Theme-Aware Glass Card
          </h1>
          <p className="mt-4 text-muted-foreground">
            This card automatically adapts its glass effect
            based on the current theme.
          </p>
        </GlassCard>
      </div>
    </main>
  )
}
```

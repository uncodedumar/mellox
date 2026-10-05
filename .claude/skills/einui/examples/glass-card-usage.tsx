// Example: Glass Card Component Usage
// Install: npx shadcn@latest add @einui/glass-card @einui/glass-button

import { GlassCard } from '@/components/liquid-glass/glass-card'
import { GlassButton } from '@/components/liquid-glass/glass-button'

// Basic Card
export function BasicCard() {
  return (
    <GlassCard className="p-6 max-w-md">
      <h2 className="text-xl font-semibold text-white/95">
        Glass Card Title
      </h2>
      <p className="mt-2 text-white/70">
        A beautiful frosted glass card with subtle transparency
        and backdrop blur effects.
      </p>
    </GlassCard>
  )
}

// Card with Glow Effect
export function GlowCard() {
  return (
    <GlassCard variant="glow" className="p-6 max-w-md">
      <h2 className="text-xl font-semibold">Featured Content</h2>
      <p className="mt-2 text-muted-foreground">
        This card has a subtle glow effect around its border.
      </p>
      <GlassButton variant="glow" className="mt-4">
        Learn More
      </GlassButton>
    </GlassCard>
  )
}

// Solid Variant Card
export function SolidCard() {
  return (
    <GlassCard variant="solid" className="p-6 max-w-md">
      <h2 className="text-xl font-semibold">More Visible Card</h2>
      <p className="mt-2 text-muted-foreground">
        The solid variant has higher opacity for better readability.
      </p>
    </GlassCard>
  )
}

// Card Grid Layout
export function CardGrid() {
  const items = [
    { title: 'Feature One', description: 'Description of the first feature' },
    { title: 'Feature Two', description: 'Description of the second feature' },
    { title: 'Feature Three', description: 'Description of the third feature' },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item, index) => (
        <GlassCard
          key={index}
          className="p-6 transition-transform hover:scale-105"
        >
          <h3 className="text-lg font-medium">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {item.description}
          </p>
        </GlassCard>
      ))}
    </div>
  )
}

// Hero Section with Glass Card
export function HeroSection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[var(--color-7)] via-[var(--color-6)] to-[var(--color-7)]">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[var(--color-5)]/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[var(--color-4)]/30 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center p-8">
        <GlassCard variant="glow" className="max-w-2xl p-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Build Beautiful UIs
          </h1>
          <p className="mt-6 text-lg text-white/70">
            Create stunning frosted glass interfaces with Ein UI components.
            Built on Shadcn and Radix UI for accessibility and customization.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <GlassButton variant="glow" size="lg">
              Get Started
            </GlassButton>
            <GlassButton variant="outline" size="lg">
              Documentation
            </GlassButton>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

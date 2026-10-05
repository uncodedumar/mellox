# Ein UI Component API Reference

TypeScript interfaces, props, and variant documentation for Ein UI components.

---

## glass-button

### Props Interface

```typescript
interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  glowEffect?: boolean   // Adds a gradient glow behind the button
  asChild?: boolean      // Use Radix Slot for composition
}
```

### Variants (via class-variance-authority)

```typescript
const glassButtonVariants = cva(
  // Base styles: rounded-xl, text-sm, hover:scale-105, active:scale-95
  {
    variants: {
      variant: {
        default: "bg-white/20 backdrop-blur-xl border border-white/30 text-white",
        primary: "bg-linear-to-r from-[var(--color-4)]/80 via-[var(--color-5)]/80 to-[var(--color-3)]/80",
        outline: "bg-transparent border-2 border-white/40 text-white",
        ghost: "bg-transparent text-white/70 hover:bg-white/10",
        destructive: "bg-[var(--destructive)]/30 border border-[var(--destructive)]/40 text-[var(--color-1)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### Usage Examples

```tsx
import { GlassButton } from '@/components/liquid-glass/glass-button'

// Basic variants
<GlassButton variant="default">Default</GlassButton>
<GlassButton variant="primary">Primary</GlassButton>
<GlassButton variant="outline">Outline</GlassButton>
<GlassButton variant="ghost">Ghost</GlassButton>
<GlassButton variant="destructive">Delete</GlassButton>

// Sizes
<GlassButton size="sm">Small</GlassButton>
<GlassButton size="lg">Large</GlassButton>
<GlassButton size="icon"><Plus /></GlassButton>

// With glow effect
<GlassButton glowEffect>Glowing</GlassButton>

// As link (using asChild with Next.js Link)
<GlassButton asChild>
  <Link href="/dashboard">Dashboard</Link>
</GlassButton>

// With icon
<GlassButton>
  <Settings className="mr-2" />
  Settings
</GlassButton>
```

---

## glass-card

### Props Interface

```typescript
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowEffect?: boolean  // Adds gradient glow behind card (default: true)
  children: React.ReactNode
}
```

### Exported Components

```typescript
// Main card container
GlassCard: React.FC<GlassCardProps>

// Structural components (standard HTML props)
GlassCardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>>    // p-6 flex flex-col gap-1.5
GlassCardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> // text-xl font-semibold text-white
GlassCardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> // text-sm text-white/60
GlassCardContent: React.FC<React.HTMLAttributes<HTMLDivElement>>   // p-6 pt-0
GlassCardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>>    // flex items-center p-6 pt-0
```

### Usage Examples

```tsx
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
  GlassCardFooter
} from '@/components/liquid-glass/glass-card'

// Full card structure
<GlassCard>
  <GlassCardHeader>
    <GlassCardTitle>Account Settings</GlassCardTitle>
    <GlassCardDescription>Manage your account preferences</GlassCardDescription>
  </GlassCardHeader>
  <GlassCardContent>
    <form>
      <GlassInput placeholder="Email" />
    </form>
  </GlassCardContent>
  <GlassCardFooter>
    <GlassButton variant="outline">Cancel</GlassButton>
    <GlassButton variant="primary">Save</GlassButton>
  </GlassCardFooter>
</GlassCard>

// Without glow (for nested cards or performance)
<GlassCard glowEffect={false}>
  <GlassCardContent>Simple content</GlassCardContent>
</GlassCard>

// Card with custom styling
<GlassCard className="max-w-md">
  <GlassCardContent className="p-8">
    Custom padded content
  </GlassCardContent>
</GlassCard>
```

---

## glass-dialog

### Exported Components (Radix Dialog primitives)

```typescript
GlassDialog: typeof DialogPrimitive.Root           // Root component
GlassDialogTrigger: typeof DialogPrimitive.Trigger // Trigger element
GlassDialogPortal: typeof DialogPrimitive.Portal   // Portal wrapper
GlassDialogClose: typeof DialogPrimitive.Close     // Close button
GlassDialogOverlay: React.FC                       // Backdrop with blur
GlassDialogContent: React.FC                       // Modal content
GlassDialogHeader: React.FC                        // Header container
GlassDialogFooter: React.FC                        // Footer with button layout
GlassDialogTitle: React.FC                         // Dialog title
GlassDialogDescription: React.FC                   // Description text
```

### Content Props

```typescript
interface GlassDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  // All Radix Dialog.Content props supported
  // Automatically includes close X button in top-right
}
```

### Usage Examples

```tsx
import {
  GlassDialog,
  GlassDialogTrigger,
  GlassDialogContent,
  GlassDialogHeader,
  GlassDialogTitle,
  GlassDialogDescription,
  GlassDialogFooter,
  GlassDialogClose
} from '@/components/liquid-glass/glass-dialog'

// Basic dialog
<GlassDialog>
  <GlassDialogTrigger asChild>
    <GlassButton>Open Dialog</GlassButton>
  </GlassDialogTrigger>
  <GlassDialogContent>
    <GlassDialogHeader>
      <GlassDialogTitle>Confirm Action</GlassDialogTitle>
      <GlassDialogDescription>
        Are you sure you want to proceed?
      </GlassDialogDescription>
    </GlassDialogHeader>
    <GlassDialogFooter>
      <GlassDialogClose asChild>
        <GlassButton variant="outline">Cancel</GlassButton>
      </GlassDialogClose>
      <GlassButton variant="primary">Confirm</GlassButton>
    </GlassDialogFooter>
  </GlassDialogContent>
</GlassDialog>

// Controlled dialog
const [open, setOpen] = useState(false)

<GlassDialog open={open} onOpenChange={setOpen}>
  <GlassDialogContent>
    <GlassDialogHeader>
      <GlassDialogTitle>Edit Profile</GlassDialogTitle>
    </GlassDialogHeader>
    <form onSubmit={(e) => {
      e.preventDefault()
      // handle submit
      setOpen(false)
    }}>
      <GlassInput name="name" placeholder="Name" />
      <GlassDialogFooter>
        <GlassButton type="submit">Save Changes</GlassButton>
      </GlassDialogFooter>
    </form>
  </GlassDialogContent>
</GlassDialog>
```

---

## glass-tabs

### Exported Components (Radix Tabs primitives + framer-motion)

```typescript
GlassTabs: typeof TabsPrimitive.Root       // Root - accepts defaultValue, value, onValueChange
GlassTabsList: React.FC                    // Tab button container with glow animation
GlassTabsTrigger: React.FC                 // Individual tab button
GlassTabsContent: React.FC                 // Content panel with AnimatePresence transitions
```

### Props

```typescript
// GlassTabs (Root)
interface GlassTabsProps {
  defaultValue?: string          // Initially active tab
  value?: string                 // Controlled active tab
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
}

// GlassTabsTrigger
interface GlassTabsTriggerProps {
  value: string                  // Tab identifier (required)
  disabled?: boolean
}

// GlassTabsContent
interface GlassTabsContentProps {
  value: string                  // Matching tab identifier (required)
  forceMount?: boolean          // Keep in DOM even when inactive
}
```

### Usage Examples

```tsx
import {
  GlassTabs,
  GlassTabsList,
  GlassTabsTrigger,
  GlassTabsContent
} from '@/components/liquid-glass/glass-tabs'

// Basic tabs
<GlassTabs defaultValue="overview">
  <GlassTabsList>
    <GlassTabsTrigger value="overview">Overview</GlassTabsTrigger>
    <GlassTabsTrigger value="analytics">Analytics</GlassTabsTrigger>
    <GlassTabsTrigger value="settings">Settings</GlassTabsTrigger>
  </GlassTabsList>
  <GlassTabsContent value="overview">
    <GlassCard>Overview content...</GlassCard>
  </GlassTabsContent>
  <GlassTabsContent value="analytics">
    <GlassCard>Analytics content...</GlassCard>
  </GlassTabsContent>
  <GlassTabsContent value="settings">
    <GlassCard>Settings content...</GlassCard>
  </GlassTabsContent>
</GlassTabs>

// Controlled tabs
const [activeTab, setActiveTab] = useState('tab1')

<GlassTabs value={activeTab} onValueChange={setActiveTab}>
  <GlassTabsList>
    <GlassTabsTrigger value="tab1">Tab 1</GlassTabsTrigger>
    <GlassTabsTrigger value="tab2">Tab 2</GlassTabsTrigger>
  </GlassTabsList>
  ...
</GlassTabs>
```

---

## glass-select

### Exported Components (Radix Select primitives)

```typescript
GlassSelect: typeof SelectPrimitive.Root
GlassSelectGroup: typeof SelectPrimitive.Group
GlassSelectValue: typeof SelectPrimitive.Value
GlassSelectTrigger: React.FC              // Trigger button with chevron
GlassSelectContent: React.FC              // Dropdown content
GlassSelectLabel: React.FC                // Group label
GlassSelectItem: React.FC                 // Selectable option
GlassSelectSeparator: React.FC            // Visual divider
GlassSelectScrollUpButton: React.FC       // Scroll indicator
GlassSelectScrollDownButton: React.FC     // Scroll indicator
```

### Content Props

```typescript
interface GlassSelectContentProps {
  position?: 'popper' | 'item-aligned'  // Default: 'popper'
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}
```

### Usage Examples

```tsx
import {
  GlassSelect,
  GlassSelectTrigger,
  GlassSelectValue,
  GlassSelectContent,
  GlassSelectGroup,
  GlassSelectLabel,
  GlassSelectItem,
  GlassSelectSeparator
} from '@/components/liquid-glass/glass-select'

// Basic select
<GlassSelect>
  <GlassSelectTrigger className="w-[200px]">
    <GlassSelectValue placeholder="Select a fruit" />
  </GlassSelectTrigger>
  <GlassSelectContent>
    <GlassSelectItem value="apple">Apple</GlassSelectItem>
    <GlassSelectItem value="banana">Banana</GlassSelectItem>
    <GlassSelectItem value="orange">Orange</GlassSelectItem>
  </GlassSelectContent>
</GlassSelect>

// Grouped select with labels
<GlassSelect defaultValue="est">
  <GlassSelectTrigger className="w-[280px]">
    <GlassSelectValue placeholder="Select timezone" />
  </GlassSelectTrigger>
  <GlassSelectContent>
    <GlassSelectGroup>
      <GlassSelectLabel>North America</GlassSelectLabel>
      <GlassSelectItem value="est">Eastern (EST)</GlassSelectItem>
      <GlassSelectItem value="cst">Central (CST)</GlassSelectItem>
      <GlassSelectItem value="pst">Pacific (PST)</GlassSelectItem>
    </GlassSelectGroup>
    <GlassSelectSeparator />
    <GlassSelectGroup>
      <GlassSelectLabel>Europe</GlassSelectLabel>
      <GlassSelectItem value="gmt">GMT</GlassSelectItem>
      <GlassSelectItem value="cet">CET</GlassSelectItem>
    </GlassSelectGroup>
  </GlassSelectContent>
</GlassSelect>

// Controlled select
const [value, setValue] = useState('')

<GlassSelect value={value} onValueChange={setValue}>
  ...
</GlassSelect>
```

---

## glass-command-palette

### Props Interface

```typescript
interface GlassCommandPaletteProps {
  open?: boolean                              // Controlled open state
  onOpenChange?: (open: boolean) => void     // Open state callback
  groups?: CommandGroup[]                     // Command groups (has defaults)
  placeholder?: string                        // Search placeholder
  position?: CommandPalettePosition           // Palette position
}

type CommandPalettePosition = 'center' | 'top' | 'bottom' | 'left' | 'right'

interface CommandGroup {
  label: string
  items: CommandItem[]
}

interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string               // e.g., "G H" for multiple keys
  action?: () => void             // Function to execute
  href?: string                   // Navigation URL
}
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `⌘K` / `Ctrl+K` | Toggle palette |
| `↑` / `↓` | Navigate items |
| `Enter` | Execute selected |
| `Escape` | Close palette |

### Usage Examples

```tsx
import { GlassCommandPalette, GlassCommandTrigger } from '@/components/innovative/glass-command-palette'
import type { CommandGroup } from '@/components/innovative/glass-command-palette'

// Basic usage with trigger
const [open, setOpen] = useState(false)

<>
  <GlassCommandTrigger onClick={() => setOpen(true)} />
  <GlassCommandPalette open={open} onOpenChange={setOpen} />
</>

// Custom commands
const commands: CommandGroup[] = [
  {
    label: 'Pages',
    items: [
      { id: 'home', label: 'Home', icon: <Home />, shortcut: 'G H', href: '/' },
      { id: 'settings', label: 'Settings', icon: <Settings />, shortcut: 'G S', href: '/settings' },
    ],
  },
  {
    label: 'Actions',
    items: [
      {
        id: 'new-doc',
        label: 'Create Document',
        icon: <Plus />,
        shortcut: 'N',
        action: () => console.log('Create new doc'),
      },
      {
        id: 'logout',
        label: 'Sign Out',
        icon: <LogOut />,
        action: handleLogout,
      },
    ],
  },
]

<GlassCommandPalette
  open={open}
  onOpenChange={setOpen}
  groups={commands}
  placeholder="Search commands..."
  position="center"
/>

// Different positions
<GlassCommandPalette position="top" {...props} />      // Slides from top
<GlassCommandPalette position="left" {...props} />     // Sidebar style
<GlassCommandPalette position="right" {...props} />    // Right sidebar
```

---

## glass-input

### Props Interface

```typescript
interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // All standard input props supported
}
```

### Styling

- Base: `h-10 w-full rounded-xl px-4 py-2 text-sm`
- Glass: `bg-white/10 backdrop-blur-xl border border-white/20`
- Focus: `border-white/40 bg-white/15 ring-2 ring-[var(--color-4)]/30`
- Placeholder: `text-white/40`

### Usage Examples

```tsx
import { GlassInput } from '@/components/liquid-glass/glass-input'

<GlassInput type="text" placeholder="Username" />
<GlassInput type="email" placeholder="email@example.com" />
<GlassInput type="password" placeholder="Password" />
<GlassInput type="search" placeholder="Search..." />
<GlassInput disabled value="Disabled" />

// With form
<form className="space-y-4">
  <div>
    <label htmlFor="email" className="text-white/80 text-sm">Email</label>
    <GlassInput id="email" type="email" required />
  </div>
  <GlassButton type="submit">Submit</GlassButton>
</form>
```

---

## glass-badge

### Variants (via class-variance-authority)

```typescript
const glassBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white/20 backdrop-blur-xl border border-white/30 text-white",
        secondary: "bg-white/10 border border-white/20 text-white/80",
        destructive: "bg-[var(--destructive)]/30 border border-[var(--destructive)]/40 text-[var(--color-1)]",
        outline: "bg-transparent border border-white/40 text-white/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
```

### Usage Examples

```tsx
import { GlassBadge } from '@/components/liquid-glass/glass-badge'

<GlassBadge>Default</GlassBadge>
<GlassBadge variant="secondary">Secondary</GlassBadge>
<GlassBadge variant="destructive">Error</GlassBadge>
<GlassBadge variant="outline">Outline</GlassBadge>

// With icon
<GlassBadge>
  <Check className="mr-1 h-3 w-3" />
  Complete
</GlassBadge>
```

---

## glass-sheet

### Variants (via class-variance-authority)

```typescript
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg transition ease-in-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)
```

### Usage Examples

```tsx
import {
  GlassSheet,
  GlassSheetTrigger,
  GlassSheetContent,
  GlassSheetHeader,
  GlassSheetTitle,
  GlassSheetDescription,
  GlassSheetFooter,
  GlassSheetClose
} from '@/components/liquid-glass/glass-sheet'

// Right drawer (default)
<GlassSheet>
  <GlassSheetTrigger asChild>
    <GlassButton>Open Menu</GlassButton>
  </GlassSheetTrigger>
  <GlassSheetContent>
    <GlassSheetHeader>
      <GlassSheetTitle>Menu</GlassSheetTitle>
      <GlassSheetDescription>Navigation options</GlassSheetDescription>
    </GlassSheetHeader>
    <nav>...</nav>
  </GlassSheetContent>
</GlassSheet>

// Left sidebar
<GlassSheet>
  <GlassSheetTrigger asChild>
    <GlassButton size="icon"><Menu /></GlassButton>
  </GlassSheetTrigger>
  <GlassSheetContent side="left">
    <nav>Sidebar content</nav>
  </GlassSheetContent>
</GlassSheet>

// Bottom sheet (mobile-style)
<GlassSheet>
  <GlassSheetContent side="bottom">
    <GlassSheetHeader>
      <GlassSheetTitle>Options</GlassSheetTitle>
    </GlassSheetHeader>
    <div className="py-4">Bottom sheet content</div>
  </GlassSheetContent>
</GlassSheet>
```

---

## Common Patterns

### Form with Validation

```tsx
import { useState } from 'react'
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent, GlassCardFooter } from '@/components/liquid-glass/glass-card'
import { GlassInput } from '@/components/liquid-glass/glass-input'
import { GlassButton } from '@/components/liquid-glass/glass-button'

function ContactForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // ... submit logic
    setLoading(false)
  }

  return (
    <GlassCard className="max-w-md">
      <GlassCardHeader>
        <GlassCardTitle>Contact Us</GlassCardTitle>
      </GlassCardHeader>
      <form onSubmit={handleSubmit}>
        <GlassCardContent className="space-y-4">
          <GlassInput name="name" placeholder="Name" required />
          <GlassInput name="email" type="email" placeholder="Email" required />
          <GlassTextarea name="message" placeholder="Message" rows={4} required />
        </GlassCardContent>
        <GlassCardFooter>
          <GlassButton type="submit" variant="primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </GlassButton>
        </GlassCardFooter>
      </form>
    </GlassCard>
  )
}
```

### Dashboard Card with Stats

```tsx
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/liquid-glass/glass-card'
import { GlassProgress } from '@/components/liquid-glass/glass-progress'
import { GlassBadge } from '@/components/liquid-glass/glass-badge'

function StatsCard({ title, value, change, progress }: StatProps) {
  return (
    <GlassCard>
      <GlassCardHeader>
        <div className="flex justify-between items-center">
          <GlassCardTitle className="text-sm font-medium">{title}</GlassCardTitle>
          <GlassBadge variant={change >= 0 ? 'default' : 'destructive'}>
            {change >= 0 ? '+' : ''}{change}%
          </GlassBadge>
        </div>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="text-3xl font-bold text-white mb-4">{value}</div>
        <GlassProgress value={progress} />
      </GlassCardContent>
    </GlassCard>
  )
}
```

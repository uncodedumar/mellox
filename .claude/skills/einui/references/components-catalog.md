# Ein UI Components Catalog

Complete reference for all Ein UI liquid glass components. Install via shadcn CLI using the registry URLs.

## Installation

```bash
# Single component
npx shadcn@latest add "https://ui.eindev.ir/r/glass-card.json"

# Multiple components
npx shadcn@latest add "https://ui.eindev.ir/r/glass-card.json" "https://ui.eindev.ir/r/glass-button.json"
```

---

## Liquid Glass Core Components (23)

### glass-avatar
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-avatar.json"`
**Dependencies:** `@radix-ui/react-avatar`

Circular profile images with gradient glow effects and fallback initials for user representation.

```tsx
import { GlassAvatar, GlassAvatarImage, GlassAvatarFallback } from '@/components/liquid-glass/glass-avatar'

<GlassAvatar>
  <GlassAvatarImage src="/avatar.jpg" alt="User" />
  <GlassAvatarFallback>JD</GlassAvatarFallback>
</GlassAvatar>
```

### glass-badge
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-badge.json"`
**Dependencies:** `class-variance-authority`

Small visual indicators for status, labels, or categories with frosted glass styling and color variants.

```tsx
import { GlassBadge } from '@/components/liquid-glass/glass-badge'

<GlassBadge variant="default">New</GlassBadge>
<GlassBadge variant="secondary">Beta</GlassBadge>
<GlassBadge variant="destructive">Error</GlassBadge>
<GlassBadge variant="outline">Draft</GlassBadge>
```

### glass-button
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-button.json"`
**Dependencies:** `@radix-ui/react-slot`, `class-variance-authority`

Interactive button components with multiple variants, sizes, and optional glow effects.

```tsx
import { GlassButton } from '@/components/liquid-glass/glass-button'

<GlassButton variant="default">Default</GlassButton>
<GlassButton variant="glow">Glow Effect</GlassButton>
<GlassButton variant="outline">Outline</GlassButton>
<GlassButton variant="ghost">Ghost</GlassButton>
<GlassButton size="sm">Small</GlassButton>
<GlassButton size="lg">Large</GlassButton>
```

### glass-card
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-card.json"`

Flexible container components with frosted glass morphism effect, perfect for displaying grouped content.

```tsx
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent, GlassCardFooter } from '@/components/liquid-glass/glass-card'

<GlassCard>
  <GlassCardHeader>
    <GlassCardTitle>Card Title</GlassCardTitle>
    <GlassCardDescription>Card description text</GlassCardDescription>
  </GlassCardHeader>
  <GlassCardContent>
    <p>Main content goes here</p>
  </GlassCardContent>
  <GlassCardFooter>
    <GlassButton>Action</GlassButton>
  </GlassCardFooter>
</GlassCard>
```

### glass-dialog
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-dialog.json"`
**Dependencies:** `@radix-ui/react-dialog`, `lucide-react`

Modal dialog components with backdrop blur and smooth animations for confirmations and forms.

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

<GlassDialog>
  <GlassDialogTrigger asChild>
    <GlassButton>Open Dialog</GlassButton>
  </GlassDialogTrigger>
  <GlassDialogContent>
    <GlassDialogHeader>
      <GlassDialogTitle>Dialog Title</GlassDialogTitle>
      <GlassDialogDescription>Dialog description</GlassDialogDescription>
    </GlassDialogHeader>
    <div>Content here</div>
    <GlassDialogFooter>
      <GlassDialogClose asChild>
        <GlassButton variant="outline">Cancel</GlassButton>
      </GlassDialogClose>
      <GlassButton>Confirm</GlassButton>
    </GlassDialogFooter>
  </GlassDialogContent>
</GlassDialog>
```

### glass-input
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-input.json"`

Form input components with focus glow animations and glass morphism styling.

```tsx
import { GlassInput } from '@/components/liquid-glass/glass-input'

<GlassInput type="text" placeholder="Enter your name" />
<GlassInput type="email" placeholder="email@example.com" />
<GlassInput type="password" placeholder="Password" />
<GlassInput disabled placeholder="Disabled input" />
```

### glass-progress
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-progress.json"`
**Dependencies:** `@radix-ui/react-progress`

Visual indicators for task completion with animated gradient fill and glow effects.

```tsx
import { GlassProgress } from '@/components/liquid-glass/glass-progress'

<GlassProgress value={33} />
<GlassProgress value={66} />
<GlassProgress value={100} />
```

### glass-slider
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-slider.json"`
**Dependencies:** `@radix-ui/react-slider`

Range input controls with gradient track, glow effects, and smooth thumb interaction.

```tsx
import { GlassSlider } from '@/components/liquid-glass/glass-slider'

<GlassSlider defaultValue={[50]} max={100} step={1} />
<GlassSlider defaultValue={[25, 75]} max={100} step={1} /> {/* Range */}
```

### glass-switch
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-switch.json"`
**Dependencies:** `@radix-ui/react-switch`

Toggle controls for binary options with smooth transitions and glow effects when activated.

```tsx
import { GlassSwitch } from '@/components/liquid-glass/glass-switch'

<GlassSwitch />
<GlassSwitch defaultChecked />
<GlassSwitch disabled />
```

### glass-tabs
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-tabs.json"`
**Dependencies:** `@radix-ui/react-tabs`, `framer-motion`

Tabbed interface components with smooth transitions and glass morphism styling.

```tsx
import { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent } from '@/components/liquid-glass/glass-tabs'

<GlassTabs defaultValue="tab1">
  <GlassTabsList>
    <GlassTabsTrigger value="tab1">Tab 1</GlassTabsTrigger>
    <GlassTabsTrigger value="tab2">Tab 2</GlassTabsTrigger>
  </GlassTabsList>
  <GlassTabsContent value="tab1">Content for tab 1</GlassTabsContent>
  <GlassTabsContent value="tab2">Content for tab 2</GlassTabsContent>
</GlassTabs>
```

### glass-tooltip
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-tooltip.json"`
**Dependencies:** `@radix-ui/react-tooltip`

Contextual information popups with glass morphism styling and smooth animations on hover.

```tsx
import { GlassTooltip, GlassTooltipTrigger, GlassTooltipContent, GlassTooltipProvider } from '@/components/liquid-glass/glass-tooltip'

<GlassTooltipProvider>
  <GlassTooltip>
    <GlassTooltipTrigger>Hover me</GlassTooltipTrigger>
    <GlassTooltipContent>
      <p>Tooltip content</p>
    </GlassTooltipContent>
  </GlassTooltip>
</GlassTooltipProvider>
```

### glass-select
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-select.json"`
**Dependencies:** `@radix-ui/react-select`, `lucide-react`

Dropdown select with frosted glass styling.

```tsx
import {
  GlassSelect,
  GlassSelectTrigger,
  GlassSelectValue,
  GlassSelectContent,
  GlassSelectItem
} from '@/components/liquid-glass/glass-select'

<GlassSelect>
  <GlassSelectTrigger>
    <GlassSelectValue placeholder="Select option" />
  </GlassSelectTrigger>
  <GlassSelectContent>
    <GlassSelectItem value="option1">Option 1</GlassSelectItem>
    <GlassSelectItem value="option2">Option 2</GlassSelectItem>
    <GlassSelectItem value="option3">Option 3</GlassSelectItem>
  </GlassSelectContent>
</GlassSelect>
```

### glass-textarea
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-textarea.json"`
**Dependencies:** `framer-motion`

Multi-line text input with focus glow effects.

```tsx
import { GlassTextarea } from '@/components/liquid-glass/glass-textarea'

<GlassTextarea placeholder="Enter your message..." rows={4} />
```

### glass-checkbox
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-checkbox.json"`
**Dependencies:** `@radix-ui/react-checkbox`, `framer-motion`, `lucide-react`

Checkbox with animated check indicator.

```tsx
import { GlassCheckbox } from '@/components/liquid-glass/glass-checkbox'

<div className="flex items-center gap-2">
  <GlassCheckbox id="terms" />
  <label htmlFor="terms">Accept terms and conditions</label>
</div>
```

### glass-radio
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-radio.json"`
**Dependencies:** `@radix-ui/react-radio-group`, `framer-motion`

Radio group with animated selection.

```tsx
import { GlassRadioGroup, GlassRadioGroupItem } from '@/components/liquid-glass/glass-radio'

<GlassRadioGroup defaultValue="option1">
  <div className="flex items-center gap-2">
    <GlassRadioGroupItem value="option1" id="r1" />
    <label htmlFor="r1">Option 1</label>
  </div>
  <div className="flex items-center gap-2">
    <GlassRadioGroupItem value="option2" id="r2" />
    <label htmlFor="r2">Option 2</label>
  </div>
</GlassRadioGroup>
```

### glass-skeleton
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-skeleton.json"`
**Dependencies:** `framer-motion`

Loading placeholder with shimmer effect.

```tsx
import { GlassSkeleton } from '@/components/liquid-glass/glass-skeleton'

<GlassSkeleton className="h-4 w-[250px]" />
<GlassSkeleton className="h-4 w-[200px]" />
<GlassSkeleton className="h-12 w-12 rounded-full" />
```

### glass-table
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-table.json"`

Data table with glass headers and row styling.

```tsx
import {
  GlassTable,
  GlassTableHeader,
  GlassTableBody,
  GlassTableRow,
  GlassTableHead,
  GlassTableCell
} from '@/components/liquid-glass/glass-table'

<GlassTable>
  <GlassTableHeader>
    <GlassTableRow>
      <GlassTableHead>Name</GlassTableHead>
      <GlassTableHead>Status</GlassTableHead>
    </GlassTableRow>
  </GlassTableHeader>
  <GlassTableBody>
    <GlassTableRow>
      <GlassTableCell>Item 1</GlassTableCell>
      <GlassTableCell>Active</GlassTableCell>
    </GlassTableRow>
  </GlassTableBody>
</GlassTable>
```

### glass-breadcrumb
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-breadcrumb.json"`
**Dependencies:** `lucide-react`

Breadcrumb navigation component.

```tsx
import {
  GlassBreadcrumb,
  GlassBreadcrumbList,
  GlassBreadcrumbItem,
  GlassBreadcrumbLink,
  GlassBreadcrumbSeparator,
  GlassBreadcrumbPage
} from '@/components/liquid-glass/glass-breadcrumb'

<GlassBreadcrumb>
  <GlassBreadcrumbList>
    <GlassBreadcrumbItem>
      <GlassBreadcrumbLink href="/">Home</GlassBreadcrumbLink>
    </GlassBreadcrumbItem>
    <GlassBreadcrumbSeparator />
    <GlassBreadcrumbItem>
      <GlassBreadcrumbLink href="/products">Products</GlassBreadcrumbLink>
    </GlassBreadcrumbItem>
    <GlassBreadcrumbSeparator />
    <GlassBreadcrumbItem>
      <GlassBreadcrumbPage>Current Page</GlassBreadcrumbPage>
    </GlassBreadcrumbItem>
  </GlassBreadcrumbList>
</GlassBreadcrumb>
```

### glass-sheet
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-sheet.json"`
**Dependencies:** `@radix-ui/react-dialog`, `class-variance-authority`, `lucide-react`

Slide-out drawer/panel with glass morphism.

```tsx
import {
  GlassSheet,
  GlassSheetTrigger,
  GlassSheetContent,
  GlassSheetHeader,
  GlassSheetTitle,
  GlassSheetDescription
} from '@/components/liquid-glass/glass-sheet'

<GlassSheet>
  <GlassSheetTrigger asChild>
    <GlassButton>Open Sheet</GlassButton>
  </GlassSheetTrigger>
  <GlassSheetContent side="right">
    <GlassSheetHeader>
      <GlassSheetTitle>Sheet Title</GlassSheetTitle>
      <GlassSheetDescription>Sheet description</GlassSheetDescription>
    </GlassSheetHeader>
    <div>Sheet content</div>
  </GlassSheetContent>
</GlassSheet>
```

### glass-popover
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-popover.json"`
**Dependencies:** `@radix-ui/react-popover`

Floating popover with glass background.

```tsx
import { GlassPopover, GlassPopoverTrigger, GlassPopoverContent } from '@/components/liquid-glass/glass-popover'

<GlassPopover>
  <GlassPopoverTrigger asChild>
    <GlassButton>Open Popover</GlassButton>
  </GlassPopoverTrigger>
  <GlassPopoverContent>
    <p>Popover content here</p>
  </GlassPopoverContent>
</GlassPopover>
```

### glass-alert-dialog
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-alert-dialog.json"`
**Dependencies:** `@radix-ui/react-alert-dialog`
**Registry Dependencies:** `glass-button`

Confirmation dialog with glass backdrop.

```tsx
import {
  GlassAlertDialog,
  GlassAlertDialogTrigger,
  GlassAlertDialogContent,
  GlassAlertDialogHeader,
  GlassAlertDialogTitle,
  GlassAlertDialogDescription,
  GlassAlertDialogFooter,
  GlassAlertDialogCancel,
  GlassAlertDialogAction
} from '@/components/liquid-glass/glass-alert-dialog'

<GlassAlertDialog>
  <GlassAlertDialogTrigger asChild>
    <GlassButton variant="destructive">Delete</GlassButton>
  </GlassAlertDialogTrigger>
  <GlassAlertDialogContent>
    <GlassAlertDialogHeader>
      <GlassAlertDialogTitle>Are you sure?</GlassAlertDialogTitle>
      <GlassAlertDialogDescription>
        This action cannot be undone.
      </GlassAlertDialogDescription>
    </GlassAlertDialogHeader>
    <GlassAlertDialogFooter>
      <GlassAlertDialogCancel>Cancel</GlassAlertDialogCancel>
      <GlassAlertDialogAction>Continue</GlassAlertDialogAction>
    </GlassAlertDialogFooter>
  </GlassAlertDialogContent>
</GlassAlertDialog>
```

### glass-separator
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-separator.json"`
**Dependencies:** `@radix-ui/react-separator`

Visual divider with glass gradient.

```tsx
import { GlassSeparator } from '@/components/liquid-glass/glass-separator'

<GlassSeparator />
<GlassSeparator orientation="vertical" className="h-4" />
```

### glass-scroll-area
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-scroll-area.json"`
**Dependencies:** `@radix-ui/react-scroll-area`

Custom scrollbar with glass styling.

```tsx
import { GlassScrollArea } from '@/components/liquid-glass/glass-scroll-area'

<GlassScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  <div>Long scrollable content here...</div>
</GlassScrollArea>
```

---

## Innovative Components (8)

### glass-command-palette
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-command-palette.json"`
**Dependencies:** `lucide-react`

Spotlight-style command palette with keyboard navigation, search filtering, and customizable positioning.

```tsx
import { GlassCommandPalette } from '@/components/innovative/glass-command-palette'

// Basic usage - typically controlled by keyboard shortcut (Cmd+K)
<GlassCommandPalette
  open={open}
  onOpenChange={setOpen}
  commands={[
    { id: '1', label: 'Search...', icon: Search, action: () => {} },
    { id: '2', label: 'Settings', icon: Settings, action: () => {} },
  ]}
/>
```

### glass-notification
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-notification.json"`
**Dependencies:** `lucide-react`

Customizable notification/toast system with glass morphism styling.

```tsx
import { GlassNotification } from '@/components/innovative/glass-notification'

<GlassNotification
  type="success"
  title="Success!"
  description="Your changes have been saved."
  onClose={() => {}}
/>
```

### glass-dock
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-dock.json"`

macOS-style dock with glass background and magnification effects.

```tsx
import { GlassDock } from '@/components/innovative/glass-dock'

<GlassDock
  items={[
    { icon: Home, label: 'Home', onClick: () => {} },
    { icon: Settings, label: 'Settings', onClick: () => {} },
  ]}
/>
```

### glass-gauge
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-gauge.json"`

Circular progress gauge with glass styling for metrics display.

```tsx
import { GlassGauge } from '@/components/innovative/glass-gauge'

<GlassGauge value={75} max={100} label="CPU" />
```

### glass-morph-card
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-morph-card.json"`

Card with morphing animation effects on hover/interaction.

```tsx
import { GlassMorphCard } from '@/components/innovative/glass-morph-card'

<GlassMorphCard>
  <h3>Morphing Card</h3>
  <p>Hover for effect</p>
</GlassMorphCard>
```

### glass-ripple
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-ripple.json"`

Click ripple effect component for dynamic interactions.

```tsx
import { GlassRipple } from '@/components/innovative/glass-ripple'

<GlassRipple>
  <button>Click for ripple</button>
</GlassRipple>
```

### glass-spotlight
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-spotlight.json"`

Spotlight effect that highlights specific UI areas with glass morphism.

```tsx
import { GlassSpotlight } from '@/components/innovative/glass-spotlight'

<GlassSpotlight>
  <div>Highlighted content</div>
</GlassSpotlight>
```

### glass-timeline
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/glass-timeline.json"`

Vertical timeline with glass nodes for chronological display.

```tsx
import { GlassTimeline, GlassTimelineItem } from '@/components/innovative/glass-timeline'

<GlassTimeline>
  <GlassTimelineItem date="2024-01-01" title="Event 1">
    Description of event 1
  </GlassTimelineItem>
  <GlassTimelineItem date="2024-02-01" title="Event 2">
    Description of event 2
  </GlassTimelineItem>
</GlassTimeline>
```

---

## Widget Components (6)

### base-widget
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/base-widget.json"`
**Dependencies:** `framer-motion`

Foundation component for all widgets. Required by other widget components.

```tsx
import { BaseWidget } from '@/components/widgets/base-widget'

<BaseWidget title="Custom Widget" icon={Star}>
  <div>Widget content</div>
</BaseWidget>
```

### calendar-widget
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/calendar-widget.json"`
**Dependencies:** `lucide-react`
**Registry Dependencies:** `base-widget`

Calendar widget for displaying dates, events, and scheduling.

```tsx
import { CalendarWidget } from '@/components/widgets/calendar-widget'

<CalendarWidget
  events={[
    { date: new Date(), title: 'Meeting', type: 'work' },
  ]}
/>
```

### clock-widget
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/clock-widget.json"`
**Dependencies:** `lucide-react`
**Registry Dependencies:** `base-widget`

Clock widgets including analog, digital, world clock, stopwatch, and timer.

```tsx
import { ClockWidget, AnalogClock, DigitalClock, WorldClock, Stopwatch, Timer } from '@/components/widgets/clock-widget'

<ClockWidget variant="analog" />
<ClockWidget variant="digital" />
<WorldClock timezones={['America/New_York', 'Europe/London', 'Asia/Tokyo']} />
<Stopwatch />
<Timer initialSeconds={300} />
```

### weather-widget
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/weather-widget.json"`
**Dependencies:** `lucide-react`
**Registry Dependencies:** `base-widget`

Weather display with temperature, conditions, forecasts, and hourly data.

```tsx
import { WeatherWidget } from '@/components/widgets/weather-widget'

<WeatherWidget
  location="New York"
  temperature={72}
  condition="sunny"
  forecast={[
    { day: 'Mon', high: 75, low: 60, condition: 'sunny' },
    { day: 'Tue', high: 70, low: 55, condition: 'cloudy' },
  ]}
/>
```

### stats-widget
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/stats-widget.json"`
**Dependencies:** `lucide-react`
**Registry Dependencies:** `base-widget`

Statistics and metrics widgets for data display and comparisons.

```tsx
import { StatsWidget, StatCard } from '@/components/widgets/stats-widget'

<StatsWidget>
  <StatCard
    title="Revenue"
    value="$12,345"
    change={+12.5}
    icon={DollarSign}
  />
  <StatCard
    title="Users"
    value="1,234"
    change={-2.3}
    icon={Users}
  />
</StatsWidget>
```

### stock-widget
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/stock-widget.json"`
**Dependencies:** `lucide-react`
**Registry Dependencies:** `base-widget`

Stock market widget for prices, trends, and financial data.

```tsx
import { StockWidget } from '@/components/widgets/stock-widget'

<StockWidget
  symbol="AAPL"
  price={178.50}
  change={+2.35}
  changePercent={+1.33}
/>
```

---

## Pre-built Blocks (5)

Blocks are complete page layouts that install to your `app/` directory.

### admin-panel
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/admin-panel.json"`
**Target:** `app/admin/page.tsx`
**Dependencies:** `lucide-react`
**Uses:** glass-card, glass-button, glass-input, glass-tabs, glass-dialog, glass-badge, glass-avatar, glass-progress, glass-switch

Complete admin dashboard with sidebar navigation, stats cards, data tables, and user management.

### login-page
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/login-page.json"`
**Target:** `app/auth/login/page.tsx`
**Dependencies:** `lucide-react`
**Uses:** glass-card, glass-button, glass-input, glass-checkbox

Login page with email/password, password visibility toggle, remember me, and social login buttons.

### signup-page
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/signup-page.json"`
**Target:** `app/auth/signup/page.tsx`
**Dependencies:** `lucide-react`
**Uses:** glass-card, glass-button, glass-input, glass-checkbox

Sign up page with multi-step validation, password strength indicator, and terms agreement.

### forgot-password-page
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/forgot-password-page.json"`
**Target:** `app/auth/forgot-password/page.tsx`
**Dependencies:** `lucide-react`
**Uses:** glass-card, glass-button, glass-input

Password recovery page with email submission and confirmation state.

### pricing-page
**Install:** `npx shadcn@latest add "https://ui.eindev.ir/r/pricing-page.json"`
**Target:** `app/pricing/page.tsx`
**Dependencies:** `lucide-react`
**Uses:** glass-card, glass-button, glass-badge, glass-switch

Pricing page with plan tiers, billing toggle (monthly/yearly), feature comparison, and FAQ section.

---

## Dependency Summary

| Dependency | Components Using It |
|------------|---------------------|
| `@radix-ui/react-avatar` | glass-avatar |
| `@radix-ui/react-checkbox` | glass-checkbox |
| `@radix-ui/react-dialog` | glass-dialog, glass-sheet |
| `@radix-ui/react-popover` | glass-popover |
| `@radix-ui/react-progress` | glass-progress |
| `@radix-ui/react-radio-group` | glass-radio |
| `@radix-ui/react-scroll-area` | glass-scroll-area |
| `@radix-ui/react-select` | glass-select |
| `@radix-ui/react-separator` | glass-separator |
| `@radix-ui/react-slider` | glass-slider |
| `@radix-ui/react-slot` | glass-button |
| `@radix-ui/react-switch` | glass-switch |
| `@radix-ui/react-tabs` | glass-tabs |
| `@radix-ui/react-tooltip` | glass-tooltip |
| `@radix-ui/react-alert-dialog` | glass-alert-dialog |
| `class-variance-authority` | glass-badge, glass-button, glass-sheet |
| `framer-motion` | glass-tabs, glass-textarea, glass-checkbox, glass-radio, glass-skeleton, base-widget |
| `lucide-react` | glass-dialog, glass-select, glass-checkbox, glass-breadcrumb, glass-sheet, glass-command-palette, glass-notification, all widgets, all blocks |

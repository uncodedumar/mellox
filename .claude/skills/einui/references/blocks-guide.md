# Ein UI Pre-built Blocks Guide

Pre-built page blocks are complete, production-ready page layouts that install directly into your Next.js `app/` directory.

## Installation

```bash
# Install a block
npx shadcn@latest add "https://ui.eindev.ir/r/[block-name].json"
```

Blocks automatically install their required component dependencies.

---

## Available Blocks

### login-page

**Install:**
```bash
npx shadcn@latest add "https://ui.eindev.ir/r/login-page.json"
```

**Target:** `app/auth/login/page.tsx`

**Dependencies:** `lucide-react`

**Uses Components:**
- glass-card
- glass-button
- glass-input
- glass-checkbox

**Features:**
- Email and password form fields
- Password visibility toggle (Eye/EyeOff icons)
- "Remember me" checkbox
- "Forgot password?" link
- Loading state with spinner
- Social login buttons (Google, GitHub, Twitter)
- Link to sign up page
- Responsive design
- Form validation

**Code Structure:**
```tsx
export default function LoginPageBlock() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Replace with your auth logic
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="min-full py-4 flex items-center justify-center bg-linear-to-br from-[var(--color-7)] via-[var(--color-6)] to-[var(--color-7)]">
      <GlassCard className="w-full max-w-md">
        {/* Header with icon */}
        {/* Email input */}
        {/* Password input with visibility toggle */}
        {/* Remember me checkbox */}
        {/* Submit button with loading state */}
        {/* Social login divider */}
        {/* Social login buttons */}
        {/* Sign up link */}
      </GlassCard>
    </div>
  )
}
```

**Customization Points:**
- Replace `handleSubmit` with your authentication logic
- Update social login buttons to use your OAuth providers
- Modify the gradient background colors
- Add additional form validation (e.g., with Zod)
- Connect to your router for navigation

---

### signup-page

**Install:**
```bash
npx shadcn@latest add "https://ui.eindev.ir/r/signup-page.json"
```

**Target:** `app/auth/signup/page.tsx`

**Dependencies:** `lucide-react`

**Uses Components:**
- glass-card
- glass-button
- glass-input
- glass-checkbox

**Features:**
- Full name, email, password fields
- Confirm password with validation
- Password strength indicator
- Password requirements checklist
- Terms and conditions checkbox
- Loading state
- Social signup options
- Link to login page

**Password Strength Logic:**
```tsx
const calculatePasswordStrength = (password: string): number => {
  let score = 0
  if (password.length >= 8) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++
  return score
}

const getStrengthColor = (strength: number) => {
  switch (strength) {
    case 1: return 'bg-[var(--destructive)]'
    case 2: return 'bg-[var(--warning)]'
    case 3: return 'bg-[var(--info)]'
    case 4: return 'bg-[var(--success)]'
    default: return 'bg-white/20'
  }
}
```

---

### forgot-password-page

**Install:**
```bash
npx shadcn@latest add "https://ui.eindev.ir/r/forgot-password-page.json"
```

**Target:** `app/auth/forgot-password/page.tsx`

**Dependencies:** `lucide-react`

**Uses Components:**
- glass-card
- glass-button
- glass-input

**Features:**
- Email input for recovery
- Two-state UI: input form → confirmation message
- Loading state during submission
- "Check your email" confirmation with icon
- Resend email option
- Tips for finding the email
- Back to login link
- Support contact link

**State Management:**
```tsx
const [email, setEmail] = useState("")
const [isSubmitted, setIsSubmitted] = useState(false)
const [isLoading, setIsLoading] = useState(false)

// After submission, switches to confirmation view
{isSubmitted ? (
  <ConfirmationView email={email} onResend={handleResend} />
) : (
  <EmailForm onSubmit={handleSubmit} />
)}
```

---

### pricing-page

**Install:**
```bash
npx shadcn@latest add "https://ui.eindev.ir/r/pricing-page.json"
```

**Target:** `app/pricing/page.tsx`

**Dependencies:** `lucide-react`

**Uses Components:**
- glass-card
- glass-button
- glass-badge
- glass-switch

**Features:**
- Three pricing tiers (Starter, Professional, Enterprise)
- Monthly/Yearly billing toggle
- "Save 20%" badge for yearly
- Feature comparison lists with checkmarks
- "Most Popular" highlighted tier
- Different gradient accents per tier
- "Contact Sales" for enterprise
- Responsive grid layout

**Pricing Data Structure:**
```tsx
const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: { monthly: 29, yearly: 24 },
    description: "Perfect for individuals and small projects",
    badge: null,
    features: ["Up to 5 projects", "2GB storage", "Basic analytics", "Single user"],
    cta: "Get Started",
    highlighted: false,
    gradient: "from-[var(--color-4)] to-[var(--color-3)]",
  },
  {
    name: "Professional",
    icon: Sparkles,
    price: { monthly: 79, yearly: 66 },
    description: "Best for growing teams and businesses",
    badge: "Most Popular",
    features: [
      "Unlimited projects",
      "50GB storage",
      "Advanced analytics",
      "Up to 10 team members",
      "Custom domain",
      "API access",
      "Integrations",
    ],
    cta: "Subscribe Now",
    highlighted: true,
    gradient: "from-[var(--color-5)] to-[var(--color-4)]",
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: { monthly: null, yearly: null },
    description: "For large organizations with custom needs",
    badge: "Custom",
    features: [
      "Everything in Professional",
      "Unlimited storage",
      "24/7 phone support",
      "On-premise deployment",
      "Security compliance",
    ],
    cta: "Contact Sales",
    highlighted: false,
    gradient: "from-[var(--color-2)] to-[var(--destructive)]",
  },
]
```

**Customization:**
- Update pricing and features arrays
- Modify gradient colors per tier
- Add/remove tiers
- Connect CTA buttons to Stripe/payment flow
- Add FAQ section below pricing cards

---

### admin-panel

**Install:**
```bash
npx shadcn@latest add "https://ui.eindev.ir/r/admin-panel.json"
```

**Target:** `app/admin/page.tsx`

**Dependencies:** `lucide-react`

**Uses Components:**
- glass-card
- glass-button
- glass-input
- glass-tabs
- glass-dialog
- glass-badge
- glass-avatar
- glass-progress
- glass-switch

**Features:**
- Sidebar navigation with icons
- Dashboard stats cards
- User management table
- Activity feed
- Search functionality
- Responsive layout (mobile sidebar toggle)
- Tabs for different views
- Add user dialog
- Settings toggles

**Layout Structure:**
```tsx
<div className="flex min-h-screen">
  {/* Sidebar */}
  <aside className="w-64 hidden md:flex flex-col">
    <nav>{/* Navigation items */}</nav>
  </aside>

  {/* Main Content */}
  <main className="flex-1">
    {/* Header with search */}
    {/* Stats cards grid */}
    {/* Tabs: Overview | Users | Settings */}
    {/* Content based on active tab */}
  </main>
</div>
```

**Customization Points:**
- Replace mock data with real API calls
- Add authentication/authorization
- Customize navigation items
- Add more tabs/views as needed
- Integrate with your data models

---

## Block Patterns

### Background Gradient

All blocks use a consistent background:
```tsx
<div className="min-h-full flex items-center justify-center bg-linear-to-br from-[var(--color-7)] via-[var(--color-6)] to-[var(--color-7)]">
```

Customize colors:
```tsx
// Ocean theme
bg-linear-to-br from-[var(--color-7)] via-[var(--color-1)] to-[var(--color-7)]

// Forest theme
bg-linear-to-br from-[var(--color-7)] via-[var(--success)] to-[var(--color-7)]

// Sunset theme
bg-linear-to-br from-[var(--color-7)] via-[var(--color-2)] to-[var(--color-7)]
```

### Form Submission Pattern

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  
  try {
    // Your API call here
    await api.submit(formData)
    // Success handling
  } catch (error) {
    // Error handling
  } finally {
    setIsLoading(false)
  }
}
```

### Loading Button Pattern

```tsx
<GlassButton type="submit" variant="primary" disabled={isLoading}>
  {isLoading ? (
    <>
      <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin mr-2" />
      Loading...
    </>
  ) : (
    <>
      <Icon className="h-4 w-4 mr-2" />
      Submit
    </>
  )}
</GlassButton>
```

---

## Combining Blocks

Blocks work together. Example auth flow:

```tsx
// app/auth/layout.tsx
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-[var(--color-7)] via-[var(--color-6)] to-[var(--color-7)]">
      {children}
    </div>
  )
}

// Then each block (login, signup, forgot-password) inherits the layout
```

Link between blocks:
```tsx
// In login-page
<Link href="/auth/signup">Don't have an account? Sign up</Link>
<Link href="/auth/forgot-password">Forgot password?</Link>

// In signup-page
<Link href="/auth/login">Already have an account? Sign in</Link>
```

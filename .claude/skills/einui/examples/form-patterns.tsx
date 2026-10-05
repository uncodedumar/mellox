"use client"

import { useState } from "react"
import { Send, Check, AlertCircle, Loader2 } from "lucide-react"
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
  GlassCardFooter,
} from "@/components/liquid-glass/glass-card"
import { GlassInput } from "@/components/liquid-glass/glass-input"
import { GlassTextarea } from "@/components/liquid-glass/glass-textarea"
import { GlassButton } from "@/components/liquid-glass/glass-button"
import { GlassCheckbox } from "@/components/liquid-glass/glass-checkbox"
import {
  GlassSelect,
  GlassSelectTrigger,
  GlassSelectValue,
  GlassSelectContent,
  GlassSelectItem,
} from "@/components/liquid-glass/glass-select"
import {
  GlassRadioGroup,
  GlassRadioGroupItem,
} from "@/components/liquid-glass/glass-radio"
import { GlassBadge } from "@/components/liquid-glass/glass-badge"

// =============================================================================
// Contact Form with Validation
// =============================================================================

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  newsletter: boolean
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "general",
    message: "",
    newsletter: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSubmitted(true)
    } catch (error) {
      console.error("Submission failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <GlassCard className="max-w-md mx-auto">
        <GlassCardContent className="py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--success)]/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-[var(--success)]" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
          <p className="text-white/60 mb-6">
            Thank you for reaching out. We'll get back to you soon.
          </p>
          <GlassButton variant="outline" onClick={() => setIsSubmitted(false)}>
            Send Another Message
          </GlassButton>
        </GlassCardContent>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="max-w-md mx-auto">
      <GlassCardHeader>
        <GlassCardTitle>Contact Us</GlassCardTitle>
        <GlassCardDescription>
          Fill out the form below and we'll get back to you as soon as possible.
        </GlassCardDescription>
      </GlassCardHeader>

      <form onSubmit={handleSubmit}>
        <GlassCardContent className="space-y-4">
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-white/80">
              Name <span className="text-[var(--destructive)]">*</span>
            </label>
            <GlassInput
              id="name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-[var(--destructive)]/50" : ""}
            />
            {errors.name && (
              <p className="text-sm text-[var(--destructive)] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white/80">
              Email <span className="text-[var(--destructive)]">*</span>
            </label>
            <GlassInput
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? "border-[var(--destructive)]/50" : ""}
            />
            {errors.email && (
              <p className="text-sm text-[var(--destructive)] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Subject Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Subject</label>
            <GlassSelect
              value={formData.subject}
              onValueChange={(value) => setFormData({ ...formData, subject: value })}
            >
              <GlassSelectTrigger>
                <GlassSelectValue placeholder="Select a subject" />
              </GlassSelectTrigger>
              <GlassSelectContent>
                <GlassSelectItem value="general">General Inquiry</GlassSelectItem>
                <GlassSelectItem value="support">Technical Support</GlassSelectItem>
                <GlassSelectItem value="sales">Sales Question</GlassSelectItem>
                <GlassSelectItem value="feedback">Feedback</GlassSelectItem>
              </GlassSelectContent>
            </GlassSelect>
          </div>

          {/* Message Textarea */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-white/80">
              Message <span className="text-[var(--destructive)]">*</span>
            </label>
            <GlassTextarea
              id="message"
              placeholder="How can we help you?"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={errors.message ? "border-[var(--destructive)]/50" : ""}
            />
            {errors.message && (
              <p className="text-sm text-[var(--destructive)] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.message}
              </p>
            )}
            <p className="text-xs text-white/40">
              {formData.message.length}/500 characters
            </p>
          </div>

          {/* Newsletter Checkbox */}
          <div className="flex items-center gap-2">
            <GlassCheckbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, newsletter: checked as boolean })
              }
            />
            <label htmlFor="newsletter" className="text-sm text-white/70">
              Subscribe to our newsletter for updates
            </label>
          </div>
        </GlassCardContent>

        <GlassCardFooter>
          <GlassButton
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </GlassButton>
        </GlassCardFooter>
      </form>
    </GlassCard>
  )
}

// =============================================================================
// Settings Form with Radio Groups
// =============================================================================

type NotificationFrequency = "realtime" | "daily" | "weekly" | "never"
type Theme = "light" | "dark" | "system"

interface SettingsFormData {
  displayName: string
  email: string
  notifications: NotificationFrequency
  theme: Theme
  marketingEmails: boolean
  securityAlerts: boolean
}

export function SettingsForm() {
  const [settings, setSettings] = useState<SettingsFormData>({
    displayName: "John Doe",
    email: "john@example.com",
    notifications: "daily",
    theme: "dark",
    marketingEmails: false,
    securityAlerts: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <GlassCard className="max-w-lg mx-auto">
      <GlassCardHeader>
        <div className="flex items-center justify-between">
          <GlassCardTitle>Settings</GlassCardTitle>
          {saved && (
            <GlassBadge variant="default" className="bg-[var(--success)]/20 text-[var(--success)] border-[var(--success)]/30">
              <Check className="w-3 h-3 mr-1" />
              Saved
            </GlassBadge>
          )}
        </div>
        <GlassCardDescription>
          Manage your account preferences and notification settings.
        </GlassCardDescription>
      </GlassCardHeader>

      <GlassCardContent className="space-y-6">
        {/* Profile Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider">
            Profile
          </h3>
          <div className="space-y-2">
            <label className="text-sm text-white/80">Display Name</label>
            <GlassInput
              value={settings.displayName}
              onChange={(e) =>
                setSettings({ ...settings, displayName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/80">Email</label>
            <GlassInput
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />
          </div>
        </div>

        {/* Notification Frequency */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider">
            Notification Frequency
          </h3>
          <GlassRadioGroup
            value={settings.notifications}
            onValueChange={(value) =>
              setSettings({ ...settings, notifications: value as NotificationFrequency })
            }
          >
            {[
              { value: "realtime", label: "Real-time", desc: "Get notified immediately" },
              { value: "daily", label: "Daily Digest", desc: "One email per day" },
              { value: "weekly", label: "Weekly Summary", desc: "One email per week" },
              { value: "never", label: "Never", desc: "Disable email notifications" },
            ].map((option) => (
              <div
                key={option.value}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <GlassRadioGroupItem value={option.value} id={option.value} />
                <div className="flex-1">
                  <label htmlFor={option.value} className="text-sm text-white cursor-pointer">
                    {option.label}
                  </label>
                  <p className="text-xs text-white/50">{option.desc}</p>
                </div>
              </div>
            ))}
          </GlassRadioGroup>
        </div>

        {/* Theme Selection */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider">
            Theme
          </h3>
          <GlassSelect
            value={settings.theme}
            onValueChange={(value) => setSettings({ ...settings, theme: value as Theme })}
          >
            <GlassSelectTrigger>
              <GlassSelectValue />
            </GlassSelectTrigger>
            <GlassSelectContent>
              <GlassSelectItem value="light">Light</GlassSelectItem>
              <GlassSelectItem value="dark">Dark</GlassSelectItem>
              <GlassSelectItem value="system">System</GlassSelectItem>
            </GlassSelectContent>
          </GlassSelect>
        </div>

        {/* Email Preferences */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider">
            Email Preferences
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div>
                <p className="text-sm text-white">Marketing Emails</p>
                <p className="text-xs text-white/50">Receive product updates and offers</p>
              </div>
              <GlassCheckbox
                checked={settings.marketingEmails}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, marketingEmails: checked as boolean })
                }
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div>
                <p className="text-sm text-white">Security Alerts</p>
                <p className="text-xs text-white/50">Get notified about account activity</p>
              </div>
              <GlassCheckbox
                checked={settings.securityAlerts}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, securityAlerts: checked as boolean })
                }
              />
            </div>
          </div>
        </div>
      </GlassCardContent>

      <GlassCardFooter className="flex justify-end gap-3">
        <GlassButton variant="outline">Cancel</GlassButton>
        <GlassButton variant="primary" onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </GlassButton>
      </GlassCardFooter>
    </GlassCard>
  )
}

// =============================================================================
// Export all form components
// =============================================================================

export default function FormPatternsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[var(--color-7)] via-[var(--color-6)] to-[var(--color-7)] p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Form Patterns</h1>
          <p className="text-white/60">
            Examples of forms built with Ein UI components
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <ContactForm />
          <SettingsForm />
        </div>
      </div>
    </div>
  )
}

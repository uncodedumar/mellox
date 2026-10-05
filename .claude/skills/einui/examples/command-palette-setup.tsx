"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Home,
  Search,
  Settings,
  User,
  FileText,
  Folder,
  Moon,
  Sun,
  LogOut,
  HelpCircle,
  Keyboard,
  Palette,
  Bell,
  Shield,
  CreditCard,
  Plus,
  Copy,
  Trash2,
  Download,
  Upload,
  Share2,
  Star,
  Archive,
  RefreshCw,
} from "lucide-react"
import {
  GlassCommandPalette,
  GlassCommandTrigger,
} from "@/components/innovative/glass-command-palette"
import type { CommandGroup } from "@/components/innovative/glass-command-palette"
import { GlassButton } from "@/components/liquid-glass/glass-button"
import { GlassCard, GlassCardContent } from "@/components/liquid-glass/glass-card"

// =============================================================================
// Example 1: Basic Command Palette
// =============================================================================

export function BasicCommandPalette() {
  const [open, setOpen] = useState(false)

  const commands: CommandGroup[] = [
    {
      label: "Navigation",
      items: [
        { id: "home", label: "Go to Home", icon: <Home className="w-4 h-4" />, href: "/" },
        { id: "docs", label: "Documentation", icon: <FileText className="w-4 h-4" />, href: "/docs" },
        { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" />, href: "/settings" },
      ],
    },
    {
      label: "Actions",
      items: [
        {
          id: "search",
          label: "Search files",
          icon: <Search className="w-4 h-4" />,
          shortcut: "⌘ F",
          action: () => console.log("Search"),
        },
        {
          id: "new",
          label: "Create new document",
          icon: <Plus className="w-4 h-4" />,
          shortcut: "⌘ N",
          action: () => console.log("New document"),
        },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Basic Command Palette</h3>
      <p className="text-white/60 text-sm">Press ⌘K or click the button below</p>
      <GlassCommandTrigger onClick={() => setOpen(true)} />
      <GlassCommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={commands}
        placeholder="Type a command or search..."
      />
    </div>
  )
}

// =============================================================================
// Example 2: Feature-Rich Command Palette
// =============================================================================

export function FeatureRichCommandPalette() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [recentFiles] = useState([
    { id: "1", name: "Project Proposal.docx" },
    { id: "2", name: "Q4 Report.xlsx" },
    { id: "3", name: "Design System.fig" },
  ])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
    setOpen(false)
  }, [])

  const commands: CommandGroup[] = [
    {
      label: "Quick Actions",
      items: [
        {
          id: "new-file",
          label: "New File",
          description: "Create a new document",
          icon: <Plus className="w-4 h-4" />,
          shortcut: "⌘ N",
          action: () => alert("Creating new file..."),
        },
        {
          id: "new-folder",
          label: "New Folder",
          description: "Create a new folder",
          icon: <Folder className="w-4 h-4" />,
          shortcut: "⌘ ⇧ N",
          action: () => alert("Creating new folder..."),
        },
        {
          id: "upload",
          label: "Upload File",
          description: "Upload from your computer",
          icon: <Upload className="w-4 h-4" />,
          action: () => alert("Opening file picker..."),
        },
      ],
    },
    {
      label: "Recent Files",
      items: recentFiles.map((file) => ({
        id: `recent-${file.id}`,
        label: file.name,
        icon: <FileText className="w-4 h-4" />,
        action: () => alert(`Opening ${file.name}`),
      })),
    },
    {
      label: "File Actions",
      items: [
        {
          id: "copy",
          label: "Copy",
          icon: <Copy className="w-4 h-4" />,
          shortcut: "⌘ C",
          action: () => console.log("Copy"),
        },
        {
          id: "download",
          label: "Download",
          icon: <Download className="w-4 h-4" />,
          shortcut: "⌘ D",
          action: () => console.log("Download"),
        },
        {
          id: "share",
          label: "Share",
          icon: <Share2 className="w-4 h-4" />,
          shortcut: "⌘ ⇧ S",
          action: () => console.log("Share"),
        },
        {
          id: "star",
          label: "Add to Favorites",
          icon: <Star className="w-4 h-4" />,
          action: () => console.log("Favorited"),
        },
        {
          id: "archive",
          label: "Archive",
          icon: <Archive className="w-4 h-4" />,
          action: () => console.log("Archived"),
        },
        {
          id: "delete",
          label: "Delete",
          icon: <Trash2 className="w-4 h-4" />,
          shortcut: "⌘ ⌫",
          action: () => console.log("Deleted"),
        },
      ],
    },
    {
      label: "Settings",
      items: [
        {
          id: "profile",
          label: "Profile Settings",
          icon: <User className="w-4 h-4" />,
          href: "/settings/profile",
        },
        {
          id: "notifications",
          label: "Notification Preferences",
          icon: <Bell className="w-4 h-4" />,
          href: "/settings/notifications",
        },
        {
          id: "security",
          label: "Security & Privacy",
          icon: <Shield className="w-4 h-4" />,
          href: "/settings/security",
        },
        {
          id: "billing",
          label: "Billing & Plans",
          icon: <CreditCard className="w-4 h-4" />,
          href: "/settings/billing",
        },
      ],
    },
    {
      label: "Appearance",
      items: [
        {
          id: "toggle-theme",
          label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
          icon: theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
          action: toggleTheme,
        },
        {
          id: "customize",
          label: "Customize Theme",
          icon: <Palette className="w-4 h-4" />,
          href: "/settings/appearance",
        },
      ],
    },
    {
      label: "Help",
      items: [
        {
          id: "shortcuts",
          label: "Keyboard Shortcuts",
          icon: <Keyboard className="w-4 h-4" />,
          shortcut: "⌘ /",
          action: () => console.log("Show shortcuts"),
        },
        {
          id: "help",
          label: "Help Center",
          icon: <HelpCircle className="w-4 h-4" />,
          href: "/help",
        },
        {
          id: "refresh",
          label: "Refresh Page",
          icon: <RefreshCw className="w-4 h-4" />,
          shortcut: "⌘ R",
          action: () => window.location.reload(),
        },
        {
          id: "logout",
          label: "Sign Out",
          icon: <LogOut className="w-4 h-4" />,
          action: () => console.log("Signing out..."),
        },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Feature-Rich Command Palette</h3>
      <p className="text-white/60 text-sm">
        Full example with recent files, file actions, settings, and theming
      </p>
      <div className="flex gap-2">
        <GlassCommandTrigger onClick={() => setOpen(true)} />
        <GlassButton variant="outline" size="sm" onClick={() => setOpen(true)}>
          ⌘K
        </GlassButton>
      </div>
      <GlassCommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={commands}
        placeholder="Search commands, files, settings..."
      />
    </div>
  )
}

// =============================================================================
// Example 3: Different Positions
// =============================================================================

export function PositionedCommandPalettes() {
  const [position, setPosition] = useState<"center" | "top" | "left" | "right">("center")
  const [open, setOpen] = useState(false)

  const commands: CommandGroup[] = [
    {
      label: "Navigation",
      items: [
        { id: "home", label: "Home", icon: <Home className="w-4 h-4" />, href: "/" },
        { id: "docs", label: "Docs", icon: <FileText className="w-4 h-4" />, href: "/docs" },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Position Variants</h3>
      <p className="text-white/60 text-sm">Command palette supports multiple positions</p>
      <div className="flex flex-wrap gap-2">
        {(["center", "top", "left", "right"] as const).map((pos) => (
          <GlassButton
            key={pos}
            variant={position === pos ? "primary" : "outline"}
            size="sm"
            onClick={() => {
              setPosition(pos)
              setOpen(true)
            }}
          >
            {pos.charAt(0).toUpperCase() + pos.slice(1)}
          </GlassButton>
        ))}
      </div>
      <GlassCommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={commands}
        position={position}
        placeholder={`Position: ${position}`}
      />
    </div>
  )
}

// =============================================================================
// Example 4: Global Keyboard Shortcut Hook
// =============================================================================

function useCommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return { open, setOpen }
}

export function GlobalShortcutExample() {
  const { open, setOpen } = useCommandPalette()

  const commands: CommandGroup[] = [
    {
      label: "Global Commands",
      items: [
        {
          id: "search",
          label: "Global Search",
          icon: <Search className="w-4 h-4" />,
          shortcut: "⌘ ⇧ F",
          action: () => alert("Global search"),
        },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Global Keyboard Shortcut</h3>
      <p className="text-white/60 text-sm">
        Press ⌘K anywhere on the page to toggle the command palette
      </p>
      <code className="block p-4 rounded-lg bg-white/5 text-sm text-white/80 font-mono">
        {`// Hook for global shortcut
function useCommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return { open, setOpen }
}`}
      </code>
      <GlassCommandPalette open={open} onOpenChange={setOpen} groups={commands} />
    </div>
  )
}

// =============================================================================
// Main Page Component
// =============================================================================

export default function CommandPaletteSetup() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[var(--color-7)] via-[var(--color-6)] to-[var(--color-7)] p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Command Palette Examples</h1>
          <p className="text-white/60">
            Various implementations of the GlassCommandPalette component
          </p>
        </div>

        <div className="grid gap-8">
          <GlassCard>
            <GlassCardContent className="p-6">
              <BasicCommandPalette />
            </GlassCardContent>
          </GlassCard>

          <GlassCard>
            <GlassCardContent className="p-6">
              <FeatureRichCommandPalette />
            </GlassCardContent>
          </GlassCard>

          <GlassCard>
            <GlassCardContent className="p-6">
              <PositionedCommandPalettes />
            </GlassCardContent>
          </GlassCard>

          <GlassCard>
            <GlassCardContent className="p-6">
              <GlobalShortcutExample />
            </GlassCardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

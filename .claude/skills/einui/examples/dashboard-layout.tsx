"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  BarChart3,
  ArrowUpRight,
} from "lucide-react"
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
} from "@/components/liquid-glass/glass-card"
import { GlassButton } from "@/components/liquid-glass/glass-button"
import { GlassInput } from "@/components/liquid-glass/glass-input"
import { GlassProgress } from "@/components/liquid-glass/glass-progress"
import { GlassBadge } from "@/components/liquid-glass/glass-badge"
import {
  GlassTabs,
  GlassTabsList,
  GlassTabsTrigger,
  GlassTabsContent,
} from "@/components/liquid-glass/glass-tabs"
import {
  GlassAvatar,
  GlassAvatarImage,
  GlassAvatarFallback,
} from "@/components/liquid-glass/glass-avatar"

// =============================================================================
// Stats Card Component
// =============================================================================

interface StatCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  trend: "up" | "down"
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <GlassCard>
      <GlassCardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-white/10">{icon}</div>
          <GlassBadge
            variant={trend === "up" ? "default" : "destructive"}
            className={
              trend === "up"
                ? "bg-[var(--success)]/20 text-[var(--success)] border-[var(--success)]/30"
                : "bg-[var(--destructive)]/20 text-[var(--destructive)] border-[var(--destructive)]/30"
            }
          >
            {trend === "up" ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {Math.abs(change)}%
          </GlassBadge>
        </div>
        <div className="mt-4">
          <p className="text-sm text-white/60">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}

// =============================================================================
// Activity Item Component
// =============================================================================

interface ActivityItem {
  id: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  action: string
  target: string
  time: string
}

function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <GlassCard>
      <GlassCardHeader>
        <GlassCardTitle className="text-lg">Recent Activity</GlassCardTitle>
        <GlassCardDescription>Latest actions across your workspace</GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <GlassAvatar className="h-10 w-10">
                {item.user.avatar && <GlassAvatarImage src={item.user.avatar} />}
                <GlassAvatarFallback>{item.user.initials}</GlassAvatarFallback>
              </GlassAvatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">
                  <span className="font-medium">{item.user.name}</span>{" "}
                  <span className="text-white/60">{item.action}</span>{" "}
                  <span className="font-medium">{item.target}</span>
                </p>
                <p className="text-xs text-white/40">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}

// =============================================================================
// Progress Card Component
// =============================================================================

interface ProjectProgress {
  name: string
  progress: number
  status: "on-track" | "at-risk" | "completed"
}

function ProjectsProgress({ projects }: { projects: ProjectProgress[] }) {
  const statusColors = {
    "on-track": "text-[var(--success)]",
    "at-risk": "text-[var(--warning)]",
    completed: "text-[var(--color-2)]",
  }

  return (
    <GlassCard>
      <GlassCardHeader>
        <GlassCardTitle className="text-lg">Project Progress</GlassCardTitle>
        <GlassCardDescription>Track your active projects</GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">{project.name}</span>
                <span className={`text-xs capitalize ${statusColors[project.status]}`}>
                  {project.status.replace("-", " ")}
                </span>
              </div>
              <GlassProgress value={project.progress} />
              <p className="text-xs text-white/40 text-right">{project.progress}%</p>
            </div>
          ))}
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}

// =============================================================================
// Sidebar Navigation
// =============================================================================

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
  badge?: number
}

function Sidebar({
  items,
  isOpen,
  onClose,
}: {
  items: NavItem[]
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50 h-screen w-64
          bg-white/5 backdrop-blur-xl border-r border-white/10
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[var(--color-4)] to-[var(--color-5)]">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-white">Dashboard</span>
              </div>
              <button onClick={onClose} className="md:hidden text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--color-4)]/20 text-[var(--color-4)] border border-[var(--color-4)]/30">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5">
              <GlassAvatar className="h-10 w-10">
                <GlassAvatarFallback>JD</GlassAvatarFallback>
              </GlassAvatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">John Doe</p>
                <p className="text-xs text-white/50 truncate">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

// =============================================================================
// Main Dashboard Component
// =============================================================================

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems: NavItem[] = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "Overview", href: "#" },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Analytics", href: "#", badge: 3 },
    { icon: <Users className="w-5 h-5" />, label: "Customers", href: "#" },
    { icon: <Activity className="w-5 h-5" />, label: "Reports", href: "#" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", href: "#" },
  ]

  const stats: StatCardProps[] = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: 20.1,
      icon: <DollarSign className="w-5 h-5 text-[var(--color-4)]" />,
      trend: "up",
    },
    {
      title: "Active Users",
      value: "2,350",
      change: 15.3,
      icon: <Users className="w-5 h-5 text-[var(--color-2)]" />,
      trend: "up",
    },
    {
      title: "Sales",
      value: "+12,234",
      change: 4.5,
      icon: <TrendingUp className="w-5 h-5 text-[var(--success)]" />,
      trend: "up",
    },
    {
      title: "Bounce Rate",
      value: "24.3%",
      change: 2.1,
      icon: <Activity className="w-5 h-5 text-[var(--warning)]" />,
      trend: "down",
    },
  ]

  const activities: ActivityItem[] = [
    {
      id: "1",
      user: { name: "Sarah Chen", initials: "SC" },
      action: "created a new",
      target: "project",
      time: "2 minutes ago",
    },
    {
      id: "2",
      user: { name: "Mike Johnson", initials: "MJ" },
      action: "updated the",
      target: "dashboard settings",
      time: "15 minutes ago",
    },
    {
      id: "3",
      user: { name: "Emily Davis", initials: "ED" },
      action: "commented on",
      target: "Q4 Report",
      time: "1 hour ago",
    },
    {
      id: "4",
      user: { name: "Alex Kim", initials: "AK" },
      action: "completed",
      target: "client onboarding",
      time: "3 hours ago",
    },
  ]

  const projects: ProjectProgress[] = [
    { name: "Website Redesign", progress: 75, status: "on-track" },
    { name: "Mobile App v2", progress: 45, status: "at-risk" },
    { name: "API Integration", progress: 100, status: "completed" },
    { name: "Customer Portal", progress: 30, status: "on-track" },
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-[var(--color-7)] via-[var(--color-6)] to-[var(--color-7)]">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar items={navItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-xl border-b border-white/10">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <GlassInput placeholder="Search..." className="pl-10 w-64" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <GlassButton variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--color-4)]" />
                </GlassButton>
                <GlassAvatar className="h-9 w-9">
                  <GlassAvatarFallback>JD</GlassAvatarFallback>
                </GlassAvatar>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-6">
            <GlassTabs defaultValue="overview">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                  <p className="text-white/60">Welcome back, John!</p>
                </div>
                <GlassTabsList>
                  <GlassTabsTrigger value="overview">Overview</GlassTabsTrigger>
                  <GlassTabsTrigger value="analytics">Analytics</GlassTabsTrigger>
                  <GlassTabsTrigger value="reports">Reports</GlassTabsTrigger>
                </GlassTabsList>
              </div>

              <GlassTabsContent value="overview">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {stats.map((stat) => (
                    <StatCard key={stat.title} {...stat} />
                  ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ActivityFeed items={activities} />
                  <ProjectsProgress projects={projects} />
                </div>
              </GlassTabsContent>

              <GlassTabsContent value="analytics">
                <GlassCard>
                  <GlassCardContent className="p-12 text-center">
                    <BarChart3 className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">Analytics content goes here</p>
                  </GlassCardContent>
                </GlassCard>
              </GlassTabsContent>

              <GlassTabsContent value="reports">
                <GlassCard>
                  <GlassCardContent className="p-12 text-center">
                    <Activity className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">Reports content goes here</p>
                  </GlassCardContent>
                </GlassCard>
              </GlassTabsContent>
            </GlassTabs>
          </div>
        </main>
      </div>
    </div>
  )
}

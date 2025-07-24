"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, FileText, Send, Star } from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <aside className="w-full border-r bg-background md:w-64 md:flex-shrink-0">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Star className="h-5 w-5 text-blue-600" />
          <span>RateMe Admin</span>
        </Link>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/dashboard")
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/agents"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/dashboard/agents")
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              Agents
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/summaries"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/dashboard/summaries")
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <FileText className="h-4 w-4" />
              Summaries
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/manual"
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/dashboard/manual")
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Send className="h-4 w-4" />
              Manual Send
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, Users, FileText, Send, Star, Menu, ChevronRight } from "lucide-react"

// Navigation items with their paths and icons
const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Agents",
    href: "/dashboard/agents",
    icon: Users,
  },
  {
    title: "Summaries",
    href: "/dashboard/summaries",
    icon: FileText,
  },
  {
    title: "Manual Send",
    href: "/dashboard/manual",
    icon: Send,
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  // For desktop sidebar
  const DesktopSidebar = (
    <div className={cn("hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30", className)}>
      <div className="flex flex-col flex-grow border-r bg-background">
        {/* Logo and brand */}
        <div className="h-16 flex items-center px-4 border-b">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="rounded-md bg-blue-600 p-1.5">
              <Star className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl">RateMe</span>
          </Link>
        </div>

        {/* Navigation links */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        {/* User profile section */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-medium">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@rateme.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // For mobile sidebar (hamburger menu)
  const MobileSidebar = (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          {/* Logo and brand */}
          <div className="h-16 flex items-center px-4 border-b">
            <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setIsOpen(false)}>
              <div className="rounded-md bg-blue-600 p-1.5">
                <Star className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl">RateMe</span>
            </Link>
          </div>

          {/* Navigation links */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                    {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          {/* User profile section */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm font-medium">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">admin@rateme.com</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <>
      {DesktopSidebar}
      {MobileSidebar}
    </>
  )
}

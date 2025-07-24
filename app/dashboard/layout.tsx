import type React from "react"
import { DashboardLayout } from "@/components/ui/dashboard/dashboard-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}

"use client"

import { useState } from "react"
import { SectionCards } from "@/components/ui/dashboard/section-cards"
import { ChartAreaInteractive } from "@/components/ui/dashboard/chart-area-interactive"
import { DataTable } from "@/components/ui/dashboard/data-table"
import { Button } from "@/components/ui/button"
import { RefreshCcw, Download } from "lucide-react"

// This would normally come from an API call
const mockMetrics = {
  avgRating: 4.2,
  feedbackCount: 1248,
  responseRate: 68,
  trend: [
    { date: "Jan 1", rating: 4.1 },
    { date: "Jan 2", rating: 4.0 },
    { date: "Jan 3", rating: 4.2 },
    { date: "Jan 4", rating: 4.3 },
    { date: "Jan 5", rating: 4.1 },
    { date: "Jan 6", rating: 4.4 },
    { date: "Jan 7", rating: 4.2 },
    { date: "Jan 8", rating: 4.3 },
    { date: "Jan 9", rating: 4.5 },
    { date: "Jan 10", rating: 4.2 },
    { date: "Jan 11", rating: 4.3 },
    { date: "Jan 12", rating: 4.4 },
    { date: "Jan 13", rating: 4.1 },
    { date: "Jan 14", rating: 4.2 },
  ],
}

// Mock feedback data
const mockFeedback = [
  { id: "1", agent: "John Smith", rating: 5, comment: "Very helpful and friendly", createdAt: "2023-04-20T10:30:00Z" },
  {
    id: "2",
    agent: "Sarah Johnson",
    rating: 4,
    comment: "Good service but took a while",
    createdAt: "2023-04-20T11:15:00Z",
  },
  { id: "3", agent: "Michael Brown", rating: 3, comment: "Average experience", createdAt: "2023-04-20T12:00:00Z" },
  { id: "4", agent: "Emily Davis", rating: 5, comment: "Excellent support!", createdAt: "2023-04-20T13:45:00Z" },
  {
    id: "5",
    agent: "David Wilson",
    rating: 4,
    comment: "Knowledgeable and patient",
    createdAt: "2023-04-20T14:30:00Z",
  },
  { id: "6", agent: "Lisa Martinez", rating: 5, comment: "Solved my issue quickly", createdAt: "2023-04-20T15:15:00Z" },
  {
    id: "7",
    agent: "Robert Taylor",
    rating: 2,
    comment: "Had to repeat my issue multiple times",
    createdAt: "2023-04-20T16:00:00Z",
  },
  { id: "8", agent: "Jennifer Anderson", rating: 5, comment: "Very professional", createdAt: "2023-04-20T16:45:00Z" },
  { id: "9", agent: "James Thomas", rating: 4, comment: "Good experience overall", createdAt: "2023-04-20T17:30:00Z" },
  {
    id: "10",
    agent: "Patricia Jackson",
    rating: 5,
    comment: "Went above and beyond",
    createdAt: "2023-04-20T18:15:00Z",
  },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Function to refresh data
  const refreshData = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={refreshData} disabled={isLoading}>
            <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh data</span>
          </Button>

          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <SectionCards metrics={mockMetrics} isLoading={isLoading} />

      <div className="my-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Rating Trends</h2>
        </div>
        <ChartAreaInteractive data={mockMetrics.trend} isLoading={isLoading} />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Latest Feedback</h2>
        <DataTable data={mockFeedback} isLoading={isLoading} />
      </div>
    </div>
  )
}

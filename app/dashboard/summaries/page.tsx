import { SummaryList } from "@/components/ui/dashboard/summary-list"

// Mock summaries data
const mockSummaries = [
  {
    id: "1",
    agent: "John Smith",
    period: "Last 30 days",
    summary:
      "John has consistently received high ratings with an average of 4.8/5. Customers frequently mention his patience and technical knowledge. Areas for potential improvement include follow-up communication.",
    sentimentScore: 0.85,
  },
  {
    id: "2",
    agent: "Sarah Johnson",
    period: "Last 30 days",
    summary:
      "Sarah maintains a strong average rating of 4.6/5. Customers appreciate her clear explanations and friendly demeanor. Some feedback suggests she could improve on resolution speed for complex issues.",
    sentimentScore: 0.78,
  },
  {
    id: "3",
    agent: "Michael Brown",
    period: "Last 30 days",
    summary:
      "Michael's average rating is 4.2/5. Positive comments highlight his problem-solving abilities, while improvement areas include active listening and avoiding technical jargon with non-technical customers.",
    sentimentScore: 0.65,
  },
  {
    id: "4",
    agent: "Emily Davis",
    period: "Last 30 days",
    summary:
      "Emily excels with a 4.9/5 average rating. Customers consistently praise her empathy and thoroughness. No significant areas for improvement were identified in recent feedback.",
    sentimentScore: 0.92,
  },
]

export default function SummariesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI-Generated Summaries</h1>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Download CSV
        </button>
      </div>
      <SummaryList summaries={mockSummaries} />
    </div>
  )
}

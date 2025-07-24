import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MessageSquare, BarChart } from "lucide-react"

type Props = {
  metrics: {
    avgRating?: number
    feedbackCount?: number
    responseRate?: number
  }
}

export function SectionCards({ metrics }: Props) {
  const { avgRating = 0, feedbackCount = 0, responseRate = 0 } = metrics

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">Out of 5.0 stars</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
          <MessageSquare className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{feedbackCount}</div>
          <p className="text-xs text-muted-foreground">+{Math.floor(feedbackCount * 0.12)} from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
          <BarChart className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{responseRate}%</div>
          <p className="text-xs text-muted-foreground">+2% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}

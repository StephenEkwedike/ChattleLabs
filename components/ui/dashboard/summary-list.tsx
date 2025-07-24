import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Summary = {
  id: string
  agent: string
  period: string
  summary: string
  sentimentScore: number
}

export function SummaryList({ summaries }: { summaries: Summary[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {summaries.map((summary) => (
        <Card key={summary.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">{summary.agent}</CardTitle>
            <Badge variant={getSentimentVariant(summary.sentimentScore)}>
              {getSentimentLabel(summary.sentimentScore)}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-2">{summary.period}</div>
            <p className="text-sm">{summary.summary}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function getSentimentVariant(score: number): "default" | "outline" | "secondary" | "destructive" {
  if (score >= 0.8) return "default"
  if (score >= 0.6) return "secondary"
  if (score >= 0.4) return "outline"
  return "destructive"
}

function getSentimentLabel(score: number): string {
  if (score >= 0.8) return "Very Positive"
  if (score >= 0.6) return "Positive"
  if (score >= 0.4) return "Neutral"
  if (score >= 0.2) return "Negative"
  return "Very Negative"
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type HistoryItem = {
  id: string
  agent: string
  recipient: string
  type: string
  sentAt: string
  status: string
}

export function SentHistory({ history }: { history: HistoryItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Sent</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.agent}</TableCell>
                <TableCell>{item.recipient}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{formatDate(item.sentAt)}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "Delivered" ? "default" : "destructive"}>{item.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date)
}

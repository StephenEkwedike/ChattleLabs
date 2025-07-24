import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star } from "lucide-react"

type Row = {
  id: string
  agent: string
  rating: number
  comment: string
  createdAt: string
}

export function DataTable({ data }: { data: Row[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent</TableHead>
            <TableHead className="w-[100px] text-center">Rating</TableHead>
            <TableHead className="hidden md:table-cell">Comment</TableHead>
            <TableHead className="w-[150px]">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.agent}</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center">
                  <span className="mr-1">{row.rating}</span>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{row.comment}</TableCell>
              <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

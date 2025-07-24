import { AgentsList } from "@/components/ui/dashboard/agents-list"

// Mock agents data
const mockAgents = [
  { id: "1", name: "John Smith", avatar: "/placeholder.svg?height=40&width=40", avgRating: 4.8, responseCount: 156 },
  { id: "2", name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40", avgRating: 4.6, responseCount: 142 },
  { id: "3", name: "Michael Brown", avatar: "/placeholder.svg?height=40&width=40", avgRating: 4.2, responseCount: 98 },
  { id: "4", name: "Emily Davis", avatar: "/placeholder.svg?height=40&width=40", avgRating: 4.9, responseCount: 203 },
  { id: "5", name: "David Wilson", avatar: "/placeholder.svg?height=40&width=40", avgRating: 4.5, responseCount: 167 },
  { id: "6", name: "Lisa Martinez", avatar: "/placeholder.svg?height=40&width=40", avgRating: 4.7, responseCount: 189 },
  { id: "7", name: "Robert Taylor", avatar: "/placeholder.svg?height=40&width=40", avgRating: 3.9, responseCount: 112 },
  {
    id: "8",
    name: "Jennifer Anderson",
    avatar: "/placeholder.svg?height=40&width=40",
    avgRating: 4.8,
    responseCount: 178,
  },
  { id: "9", name: "James Thomas", avatar: "/placeholder.svg?height=40&width=40", avgRating: 4.4, responseCount: 145 },
  {
    id: "10",
    name: "Patricia Jackson",
    avatar: "/placeholder.svg?height=40&width=40",
    avgRating: 4.9,
    responseCount: 210,
  },
]

export default function AgentsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Agents</h1>
      </div>
      <AgentsList agents={mockAgents} />
    </div>
  )
}

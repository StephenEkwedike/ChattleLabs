import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

type Agent = {
  id: string
  name: string
  avatar: string
  avgRating: number
  responseCount: number
}

export function AgentsList({ agents }: { agents: Agent[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <Card key={agent.id} className="cursor-pointer hover:bg-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <h3 className="font-medium">{agent.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="flex items-center mr-4">
                    <Star className="mr-1 h-4 w-4 text-yellow-500" />
                    <span>{agent.avgRating.toFixed(1)}</span>
                  </div>
                  <span>{agent.responseCount} responses</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

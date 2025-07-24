import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Phone, MessageSquare, TrendingUp, Clock, Shield } from "lucide-react"

const features = [
  {
    icon: Phone,
    title: "NEVER MISS A LEAD",
    description:
      "Your AI receptionist answers every call instantly, even when you're busy with customers or after hours.",
    color: "bg-purple-500",
  },
  {
    icon: Calendar,
    title: "AUTOMATIC BOOKING",
    description: "Seamlessly schedules appointments directly into your calendar while qualifying leads.",
    color: "bg-pink-500",
  },
  {
    icon: MessageSquare,
    title: "HUMAN-LIKE CONVERSATIONS",
    description: "Advanced AI that understands your business and speaks naturally with potential customers.",
    color: "bg-yellow-500",
  },
  {
    icon: TrendingUp,
    title: "INCREASE CONVERSIONS",
    description: "Convert more leads by responding instantly and professionally to every inquiry.",
    color: "bg-green-500",
  },
  {
    icon: Clock,
    title: "24/7 AVAILABILITY",
    description: "Your business never sleeps. Capture leads and book appointments around the clock.",
    color: "bg-blue-500",
  },
  {
    icon: Shield,
    title: "INDUSTRY EXPERTISE",
    description: "Trained specifically for dental, solar, landscaping, roofing, and renovation businesses.",
    color: "bg-red-500",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6 leading-none">
            WHY HIGH-TICKET
            <br />
            <span className="bg-purple-500 text-white px-4 py-2 inline-block transform rotate-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              BUSINESSES
            </span>
            <br />
            CHOOSE US
          </h2>
          <p className="text-xl text-gray-700 font-bold max-w-2xl mx-auto">
            Built specifically for dental offices, solar companies, landscapers, roofers, and renovators
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div
                  className={`w-16 h-16 ${feature.color} rounded-none mb-6 flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-black mb-4 leading-tight">{feature.title}</h3>
                <p className="text-gray-700 font-semibold leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

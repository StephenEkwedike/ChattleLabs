import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Dr. Sarah Martinez",
    business: "Martinez Dental Practice",
    industry: "Dental",
    quote:
      "Chattle Labs increased our appointment bookings by 300%. The AI handles after-hours calls perfectly and never misses a potential patient.",
    rating: 5,
    avatar: "/images/SarahMartinez.jpg",
  },
  {
    name: "Mike Thompson",
    business: "Premier Roofing",
    industry: "Roofing",
    quote:
      "Storm season used to overwhelm our phone lines. Now every emergency call gets answered immediately, even at 2 AM.",
    rating: 5,
    avatar: "/images/MikeThompson.jpg",
  },
  {
    name: "Jennifer Rodriguez",
    business: "Elite Landscaping Co.",
    industry: "Landscaping",
    quote:
      "The ROI is incredible. One high-ticket landscaping project pays for months of service. The AI books consultations while I'm on job sites.",
    rating: 5,
    avatar: "/images/JenniferRodriguez.jpeg",
  },
  {
    name: "David Chen",
    business: "SolarTech Solutions",
    industry: "Solar",
    quote:
      "We were losing leads every day to competitors who answered faster. Now our AI receptionist captures every inquiry instantly.",
    rating: 5,
    avatar: "/images/DavidChen.jpg",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6 leading-none">
            REAL RESULTS
            <br />
            <span className="bg-black text-white px-4 py-2 inline-block transform -rotate-1 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
              REAL BUSINESSES
            </span>
          </h2>
          <p className="text-xl text-black font-bold max-w-2xl mx-auto">
            See how high-ticket service businesses are growing with AI receptionists
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-none border-4 border-black mr-4 object-cover"
                  />
                  <div>
                    <h4 className="text-xl font-black text-black">{testimonial.name}</h4>
                    <p className="text-gray-700 font-bold">{testimonial.business}</p>
                    <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
                      {testimonial.industry}
                    </p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-gray-800 font-semibold text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
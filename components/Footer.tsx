import { Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t-8 border-black py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-3xl font-black text-black mb-4">
              CHATTLE
              <span className="bg-purple-500 text-white px-2 py-1 ml-2 inline-block transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                LABS
              </span>
            </h3>
            <p className="text-gray-700 font-semibold mb-4">
              AI receptionists for high-ticket service businesses. Never miss a lead again.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700 font-semibold">
                <Phone className="h-4 w-4 mr-2" />
(916)-862-7706
              </div>
              <div className="flex items-center text-gray-700 font-semibold">
                <MapPin className="h-4 w-4 mr-2" />
                San Francisco, CA
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black text-black mb-4 uppercase tracking-wide">INDUSTRIES</h4>
            <ul className="space-y-2 text-gray-700 font-semibold">
              <li>Dental Practices</li>
              <li>Solar Companies</li>
              <li>Landscaping</li>
              <li>Roofing</li>
              <li>Renovation & Construction</li>
              <li>Paving & Concrete</li>
            </ul>
          </div>
        </div>

        <div className="border-t-4 border-black mt-8 pt-8 text-center">
          <p className="text-black font-black text-lg">© 2025 CHATTLE LABS. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  )
}
import { Star } from "lucide-react"
import Link from "next/link"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { Testimonials } from "@/components/Testimonials"
import { ContactForm } from "@/components/ContactForm"
import { Footer } from "@/components/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto flex items-center px-4 py-4">
          <div className="flex items-center">
            <div className="mr-2 rounded-md bg-blue-600 p-2">
              <Star className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">CHATTLE LABS</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Main Value Proposition */}
      <Features />

      {/* Testimonials */}
      <Testimonials />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </main>
  )
}
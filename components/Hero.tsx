"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, MessageSquare } from 'lucide-react'

export function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Geometric shapes for NeoBrutalist effect */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-black rotate-12"></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 bg-blue-600 rotate-45"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-600 rotate-12"></div>
      <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-black rotate-45"></div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Bold NeoBrutalist heading */}
          <h1 className="text-6xl md:text-8xl font-black text-black mb-8 leading-none tracking-tight">
            NEVER MISS
            <br />
            <span className="text-white bg-blue-600 px-4 py-2 inline-block transform -rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black">
              A CALL
            </span>
            <br />
            AGAIN
          </h1>

          <p className="text-xl md:text-2xl text-black font-bold mb-12 max-w-2xl mx-auto">
            Chattle Labs builds AI receptionists that answer calls, book appointments, and convert leads 24/7 for
            high-ticket service businesses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-black text-white hover:bg-gray-800 text-xl px-8 py-6 font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(37,99,235,1)] hover:shadow-[8px_8px_0px_0px_rgba(37,99,235,1)] transition-all transform hover:-translate-y-1"
            >
              GET YOUR AI RECEPTIONIST
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="bg-white text-black hover:bg-gray-100 text-xl px-8 py-6 font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:-translate-y-1"
            >
              BOOK A DEMO
              <Phone className="ml-2 h-6 w-6" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-black font-black text-sm">
            <div className="flex items-center gap-2 bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <MessageSquare className="h-5 w-5" />
              <span>24/7 AVAILABILITY</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-600 text-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Phone className="h-5 w-5" />
              <span>HUMAN-LIKE CONVERSATIONS</span>
            </div>
            <div className="flex items-center gap-2 bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <ArrowRight className="h-5 w-5" />
              <span>INSTANT SETUP</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
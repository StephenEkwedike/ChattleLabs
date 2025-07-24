"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Phone, Mail, Building } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    industry: "",
    leadSource: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit to Airtable via API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: "", email: "", phone: "", business: "", industry: "", leadSource: "", message: "" })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <Card className="max-w-2xl mx-auto border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-none mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <Mail className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">MESSAGE SENT!</h3>
              <p className="text-white font-semibold mb-8">
                We'll get back to you within 24 hours with a custom AI receptionist demo for your business.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-white text-black hover:bg-gray-100 font-black border-4 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                SEND ANOTHER MESSAGE
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-none">
              GET YOUR
              <br />
              <span className="bg-purple-500 text-white px-4 py-2 inline-block transform rotate-1 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                FREE DEMO
              </span>
            </h2>
            <p className="text-xl text-white font-bold max-w-2xl mx-auto">
              See how an AI receptionist can transform your high-ticket service business
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <Card className="border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              <CardHeader className="bg-purple-500 border-b-4 border-white">
                <CardTitle className="text-2xl font-black text-white flex items-center">
                  <Mail className="mr-3 h-6 w-6" />
                  CONTACT US
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                        Full Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-semibold"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                        Email *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-semibold"
                        placeholder="john@business.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                        Phone *
                      </label>
                      <Input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-semibold"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                        Business Name *
                      </label>
                      <Input
                        required
                        value={formData.business}
                        onChange={(e) => handleInputChange("business", e.target.value)}
                        className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-semibold"
                        placeholder="Smith Dental Practice"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                      Industry *
                    </label>
                    <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                      <SelectTrigger className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-semibold">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dental Practice">Dental Practice</SelectItem>
                        <SelectItem value="Solar Company">Solar Company</SelectItem>
                        <SelectItem value="Landscaping">Landscaping</SelectItem>
                        <SelectItem value="Roofing">Roofing</SelectItem>
                        <SelectItem value="Renovation/Construction">Renovation/Construction</SelectItem>
                        <SelectItem value="Paving/Concrete">Paving/Concrete</SelectItem>
                        <SelectItem value="Other High-Ticket Service">Other High-Ticket Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                      HOW DID YOU HEAR ABOUT US? *
                    </label>
                    <Select value={formData.leadSource} onValueChange={(value) => handleInputChange("leadSource", value)}>
                      <SelectTrigger className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-semibold">
                        <SelectValue placeholder="Select how you heard about us" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Google Search">Google Search</SelectItem>
                        <SelectItem value="Social Media">Social Media</SelectItem>
                        <SelectItem value="Referral">Referral</SelectItem>
                        <SelectItem value="Advertisement">Advertisement</SelectItem>
                        <SelectItem value="Website">Website</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                      Tell us about your business
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-semibold min-h-[120px]"
                      placeholder="How many calls do you get per day? What's your biggest challenge with phone management?"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-black text-xl py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    {isSubmitting ? "SENDING..." : "SEND"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Calendly Integration */}
            <Card className="border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              <CardHeader className="bg-blue-500 border-b-4 border-white">
                <CardTitle className="text-2xl font-black text-white flex items-center">
                  <Calendar className="mr-3 h-6 w-6" />
                  BOOK A CALL
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 bg-white">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-black text-black mb-4">PREFER TO TALK DIRECTLY?</h3>
                  <p className="text-gray-700 font-semibold mb-6">
                    Schedule a 15-minute voice call to discuss your business needs and see how our AI receptionist can help. This is a phone/voice call only - no video required.
                  </p>
                </div>

                {/* Calendly Embed */}
                <div className="calendly-inline-widget" data-url="https://calendly.com/stekwe123/ai-receptionist-setup-initial-call" style={{minWidth:"320px", height:"700px"}}></div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-sm font-semibold text-gray-700">
                    <Phone className="h-4 w-4 mr-2" />
                    15-minute voice consultation call
                  </div>
                  <div className="flex items-center text-sm font-semibold text-gray-700">
                    <Building className="h-4 w-4 mr-2" />
                    Custom demo for your industry
                  </div>
                  <div className="flex items-center text-sm font-semibold text-gray-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Available 7 days a week
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

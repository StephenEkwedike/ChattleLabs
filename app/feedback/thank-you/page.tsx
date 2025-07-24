"use client"

import { Star } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header with logo in top left */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 border-b">
        <div className="flex items-center">
          <div className="mr-2 rounded-md bg-blue-600 p-1">
            <Star className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold">RateMe</span>
        </div>
      </header>

      {/* Thank you content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md">
          {/* Success icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Star className="h-8 w-8 text-blue-600 fill-blue-600" />
          </div>

          {/* Thank you message */}
          <h1 className="text-2xl font-bold mb-3">Thank You!</h1>
          <p className="text-gray-600">
            Your feedback helps us improve our customer service and provide better experiences.
          </p>
        </div>
      </main>
    </div>
  )
}

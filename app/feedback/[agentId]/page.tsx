"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Star, X, Send } from "lucide-react"
import { cn } from "@/lib/utils"

// =============================================
// ALL CODE IN ONE FILE AS REQUESTED
// =============================================

export default function FeedbackPage() {
  const router = useRouter()
  const params = useParams()
  const agentId = params?.agentId as string

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [agentName, setAgentName] = useState("Loading...")
  const [showThankYou, setShowThankYou] = useState(false)

  const MAX_COMMENT_LENGTH = 150

  // Rating text mapping
  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Poor"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
        return "Great"
      case 5:
        return "Excellent"
      default:
        return "Rate your experience"
    }
  }

  // Suggestion options
  const positiveOptions = [
    "Great service",
    "Really helpful",
    "Good conversation",
    "Solved my problem",
    "Very knowledgeable",
    "Patient and understanding",
  ]

  const negativeOptions = [
    "Was rude",
    "Poor English",
    "Couldn't answer properly",
    "Long wait time",
    "Didn't resolve issue",
    "Kept interrupting",
  ]

  // Toggle suggestion selection
  const toggleSuggestion = (suggestion: string) => {
    if (selectedSuggestions.includes(suggestion)) {
      setSelectedSuggestions(selectedSuggestions.filter((s) => s !== suggestion))
    } else {
      setSelectedSuggestions([...selectedSuggestions, suggestion])
    }
  }

  useEffect(() => {
    // In a real app, we would fetch the agent's name from an API
    const fetchAgentName = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setAgentName(`${agentId ? `Agent ${agentId.slice(0, 4)}` : "Customer Service Agent"}`)
    }

    fetchAgentName()
  }, [agentId])

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= MAX_COMMENT_LENGTH) {
      setComment(value)
    }
  }

  const handleSubmit = async () => {
    if (rating === 0) return

    setIsSubmitting(true)

    try {
      // In a real app, we would submit the feedback to an API
      console.log({
        agentId,
        rating,
        comment,
        suggestions: selectedSuggestions,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show thank you message
      setShowThankYou(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/feedback/thank-you")
      }, 2000)
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showThankYou) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="rounded-full bg-blue-100 p-3 mb-4">
            <Star className="h-8 w-8 text-blue-600 fill-blue-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-6">Your feedback helps us improve our service.</p>
        </div>
      </div>
    )
  }

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
        <h1 className="text-lg font-semibold">Rating</h1>
        <button onClick={() => router.back()} className="rounded-full p-2 hover:bg-gray-100" aria-label="Close">
          <X className="h-6 w-6" />
        </button>
      </header>

      {/* Main content - everything centered with compact spacing */}
      <main className="flex-1 overflow-y-auto flex flex-col justify-between">
        <div className="mx-auto w-full max-w-md px-4 py-4">
          {/* Agent info - centered */}
          <div className="text-center mb-6">
            <p className="text-gray-600">How was your call with</p>
            <p className="text-xl font-semibold">{agentName}</p>
          </div>

          {/* Rating stars - centered */}
          <div className="flex flex-col items-center mb-6">
            <p className="text-xl font-medium mb-3">{getRatingText(rating)}</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                >
                  <Star
                    className={cn(
                      "h-10 w-10 transition-colors",
                      rating >= star ? "fill-yellow-400 text-yellow-400" : "fill-none text-gray-300",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback section - only show if rating is selected */}
          {rating > 0 && (
            <div className="space-y-4">
              {/* Feedback prompt - centered */}
              <h2 className="text-lg font-medium text-center">
                {rating >= 4 ? "What went well?" : "What could be improved?"}
              </h2>

              {/* Suggestion chips - centered */}
              <div className="space-y-2">
                <div className="flex flex-wrap justify-center gap-2">
                  {positiveOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleSuggestion(option)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                        selectedSuggestions.includes(option)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200",
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {negativeOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleSuggestion(option)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                        selectedSuggestions.includes(option)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200",
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment box - centered with width matching stars */}
              <div className="space-y-2 mx-auto" style={{ width: "calc(5 * 2.5rem + 0.5rem)" }}>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 text-center">
                  Additional comments (optional)
                </label>
                <div className="relative">
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Tell us more about your experience..."
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                    {comment.length}/{MAX_COMMENT_LENGTH}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer with send button - width matching stars */}
      <footer className="sticky bottom-0 border-t bg-white p-4 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={rating === 0 || isSubmitting}
          style={{ width: "calc(5 * 2.5rem + 0.5rem)" }}
          className={cn(
            "flex items-center justify-center rounded-lg py-3 text-white font-medium transition-colors",
            rating === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          )}
        >
          {isSubmitting ? (
            <>
              <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </footer>
    </div>
  )
}

// Thank You Page component included in the same file
export function ThankYouPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      router.push("/")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
      <div className="rounded-full bg-blue-100 p-4 mb-6">
        <Star className="h-10 w-10 text-blue-600 fill-blue-600" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Feedback!</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Your feedback helps us improve our customer service and provide better experiences.
      </p>
      <button onClick={() => router.push("/")} className="text-blue-600 font-medium hover:underline">
        Return to Home
      </button>
    </div>
  )
}

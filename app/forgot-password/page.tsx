"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Star, Mail, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError("")
  }

  const validateForm = () => {
    if (!email) {
      setError("Email is required")
      return false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // This would be replaced with your actual password reset logic
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful submission
      console.log("Password reset requested for:", email)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Password reset error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center">
            <div className="mr-2 rounded-md bg-blue-600 p-1.5">
              <Star className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">RateMe</span>
          </Link>
        </div>
      </header>

      {/* Forgot Password Form */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {!isSubmitted ? (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold">Reset your password</h1>
                <p className="mt-2 text-gray-600">
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </div>

              <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Mail className="h-5 w-5" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className={`pl-10 ${error ? "border-red-500" : ""}`}
                        value={email}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center justify-center">
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
                        Sending reset link...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Reset password
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold">Check your email</h2>
              <p className="mt-2 text-gray-600">
                We've sent a password reset link to <span className="font-medium">{email}</span>
              </p>
              <p className="mt-4 text-sm text-gray-500">
                If you don't see it in your inbox, please check your spam folder.
              </p>
              <div className="mt-6">
                <Link href="/signin" className="text-blue-600 hover:text-blue-800">
                  Return to sign in
                </Link>
              </div>
            </div>
          )}

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link href="/signin" className="font-medium text-blue-600 hover:text-blue-800">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} RateMe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

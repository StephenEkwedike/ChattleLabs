import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chattle Labs - AI Receptionists for High-Ticket Service Businesses",
  description:
    "Never miss a call again. Chattle Labs builds AI receptionists that answer calls, book appointments, and convert leads 24/7 for dental offices, solar companies, landscapers, roofers, and renovators.",
  keywords:
    "AI receptionist, dental practice, solar company, landscaping, roofing, renovation, lead generation, appointment booking",
  openGraph: {
    title: "Chattle Labs - AI Receptionists for High-Ticket Service Businesses",
    description: "Never miss a call again. AI receptionists that convert leads 24/7.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

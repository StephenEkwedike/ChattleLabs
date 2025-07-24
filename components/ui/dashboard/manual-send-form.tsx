"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Skeleton } from "@/components/ui/skeleton"

type Agent = {
  id: string
  name: string
}

type FormData = {
  agent: string
  type: "SMS" | "Email"
  recipient: string
}

type ManualSendFormProps = {
  onSend: (data: FormData) => void
  isLoading?: boolean
  agents?: Agent[]
  agentsLoading?: boolean
}

export function ManualSendForm({ onSend, isLoading = false, agents = [], agentsLoading = false }: ManualSendFormProps) {
  const [formData, setFormData] = useState<FormData>({
    agent: "",
    type: "SMS",
    recipient: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSend(formData)
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const isFormValid = formData.agent && formData.recipient

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Rating Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agent">Select Agent</Label>
            {agentsLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select value={formData.agent} onValueChange={(value) => handleChange("agent", value)} required>
                <SelectTrigger id="agent">
                  <SelectValue placeholder="Select an agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <Label>Request Type</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => handleChange("type", value as "SMS" | "Email")}
              className="flex space-x-4"
              defaultValue="SMS"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SMS" id="sms" />
                <Label htmlFor="sms">SMS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Email" id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">{formData.type === "SMS" ? "Phone Number" : "Email Address"}</Label>
            <Input
              id="recipient"
              type={formData.type === "SMS" ? "tel" : "email"}
              placeholder={formData.type === "SMS" ? "+1234567890" : "customer@example.com"}
              value={formData.recipient}
              onChange={(e) => handleChange("recipient", e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || !isFormValid}>
            {isLoading ? "Sending..." : "Send Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

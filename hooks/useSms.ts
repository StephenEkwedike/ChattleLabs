import React, { useState } from 'react'

export interface SmsMessage {
  id: string
  to: string
  message: string
  status: 'pending' | 'sent' | 'failed'
  timestamp: Date
}

export function useSms() {
  const [messages, setMessages] = useState<SmsMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendSms = async (to: string, message: string) => {
    setIsLoading(true)
    try {
      const newMessage: SmsMessage = {
        id: Date.now().toString(),
        to,
        message,
        status: 'pending',
        timestamp: new Date()
      }
      
      setMessages(prev => [newMessage, ...prev])
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update status to sent
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'sent' as const }
            : msg
        )
      )
      
      return { success: true, messageId: newMessage.id }
    } catch (error) {
      console.error('Failed to send SMS:', error)
      return { success: false, error: 'Failed to send SMS' }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages,
    sendSms,
    isLoading
  }
}

export function useSmsHistory() {
  const [history, setHistory] = useState<SmsMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = async () => {
    setLoading(true)
    setError(null)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock history data
      const mockHistory: SmsMessage[] = [
        {
          id: '1',
          to: '+1234567890',
          message: 'Welcome to ChattleLabs! Your AI receptionist is ready.',
          status: 'sent',
          timestamp: new Date(Date.now() - 3600000)
        },
        {
          id: '2',
          to: '+1234567891',
          message: 'Your appointment has been confirmed for tomorrow at 2 PM.',
          status: 'sent',
          timestamp: new Date(Date.now() - 7200000)
        }
      ]
      
      setHistory(mockHistory)
    } catch (err) {
      setError('Failed to load SMS history')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    refetch()
  }, [])

  return {
    history,
    loading,
    error,
    refetch
  }
}

export function useSendInvite() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendInvite = async (phoneNumber: string, message: string) => {
    setLoading(true)
    setError(null)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Random success/failure for demo
      if (Math.random() > 0.1) {
        return { success: true, messageId: Date.now().toString() }
      } else {
        throw new Error('Failed to send invite')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send invite'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return {
    sendInvite,
    loading,
    error
  }
}
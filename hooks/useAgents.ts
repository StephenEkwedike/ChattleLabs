import { useState, useEffect } from 'react'

export interface Agent {
  id: string
  name: string
  phoneNumber: string
  status: 'active' | 'inactive' | 'busy'
  industry: string
  callsHandled: number
  lastActive: Date
}

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading agents
    const loadAgents = async () => {
      setIsLoading(true)
      
      // Mock data
      const mockAgents: Agent[] = [
        {
          id: '1',
          name: 'Dental Assistant AI',
          phoneNumber: '(555) 123-4567',
          status: 'active',
          industry: 'Dental',
          callsHandled: 156,
          lastActive: new Date()
        },
        {
          id: '2',
          name: 'Solar Consultation AI',
          phoneNumber: '(555) 234-5678',
          status: 'active',
          industry: 'Solar',
          callsHandled: 89,
          lastActive: new Date()
        },
        {
          id: '3',
          name: 'Roofing Emergency AI',
          phoneNumber: '(555) 345-6789',
          status: 'busy',
          industry: 'Roofing',
          callsHandled: 234,
          lastActive: new Date()
        }
      ]
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setAgents(mockAgents)
      setIsLoading(false)
    }

    loadAgents()
  }, [])

  const updateAgentStatus = (agentId: string, status: Agent['status']) => {
    setAgents(prev => 
      prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, status, lastActive: new Date() }
          : agent
      )
    )
  }

  const createAgent = (agentData: Omit<Agent, 'id' | 'callsHandled' | 'lastActive'>) => {
    const newAgent: Agent = {
      ...agentData,
      id: Date.now().toString(),
      callsHandled: 0,
      lastActive: new Date()
    }
    
    setAgents(prev => [...prev, newAgent])
    return newAgent
  }

  const deleteAgent = (agentId: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId))
  }

  return {
    agents,
    isLoading,
    updateAgentStatus,
    createAgent,
    deleteAgent
  }
}
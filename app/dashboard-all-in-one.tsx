"use client"

import React from "react"

// =============================================
// IMPORTS
// =============================================
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  FileText,
  Send,
  Star,
  Bell,
  ChevronDown,
  BarChart,
  MessageSquare,
  Check,
} from "lucide-react"

// =============================================
// UTILITY FUNCTIONS
// =============================================
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date)
}

function getSentimentVariant(score: number): "default" | "outline" | "secondary" | "destructive" {
  if (score >= 0.8) return "default"
  if (score >= 0.6) return "secondary"
  if (score >= 0.4) return "outline"
  return "destructive"
}

function getSentimentLabel(score: number): string {
  if (score >= 0.8) return "Very Positive"
  if (score >= 0.6) return "Positive"
  if (score >= 0.4) return "Neutral"
  if (score >= 0.2) return "Negative"
  return "Very Negative"
}

// =============================================
// MOCK DATA
// =============================================
// Mock metrics data
const mockMetrics = {
  avgRating: 4.2,
  feedbackCount: 1248,
  responseRate: 68,
  trend: [
    { date: "Jan 1", rating: 4.1 },
    { date: "Jan 2", rating: 4.0 },
    { date: "Jan 3", rating: 4.2 },
    { date: "Jan 4", rating: 4.3 },
    { date: "Jan 5", rating: 4.1 },
    { date: "Jan 6", rating: 4.4 },
    { date: "Jan 7", rating: 4.2 },
    { date: "Jan 8", rating: 4.3 },
    { date: "Jan 9", rating: 4.5 },
    { date: "Jan 10", rating: 4.2 },
    { date: "Jan 11", rating: 4.3 },
    { date: "Jan 12", rating: 4.4 },
    { date: "Jan 13", rating: 4.1 },
    { date: "Jan 14", rating: 4.2 },
  ],
}

// Mock feedback data
const mockFeedback = [
  { id: "1", agent: "John Smith", rating: 5, comment: "Very helpful and friendly", createdAt: "2023-04-20T10:30:00Z" },
  {
    id: "2",
    agent: "Sarah Johnson",
    rating: 4,
    comment: "Good service but took a while",
    createdAt: "2023-04-20T11:15:00Z",
  },
  { id: "3", agent: "Michael Brown", rating: 3, comment: "Average experience", createdAt: "2023-04-20T12:00:00Z" },
  { id: "4", agent: "Emily Davis", rating: 5, comment: "Excellent support!", createdAt: "2023-04-20T13:45:00Z" },
  {
    id: "5",
    agent: "David Wilson",
    rating: 4,
    comment: "Knowledgeable and patient",
    createdAt: "2023-04-20T14:30:00Z",
  },
  { id: "6", agent: "Lisa Martinez", rating: 5, comment: "Solved my issue quickly", createdAt: "2023-04-20T15:15:00Z" },
  {
    id: "7",
    agent: "Robert Taylor",
    rating: 2,
    comment: "Had to repeat my issue multiple times",
    createdAt: "2023-04-20T16:00:00Z",
  },
  { id: "8", agent: "Jennifer Anderson", rating: 5, comment: "Very professional", createdAt: "2023-04-20T16:45:00Z" },
  { id: "9", agent: "James Thomas", rating: 4, comment: "Good experience overall", createdAt: "2023-04-20T17:30:00Z" },
  {
    id: "10",
    agent: "Patricia Jackson",
    rating: 5,
    comment: "Went above and beyond",
    createdAt: "2023-04-20T18:15:00Z",
  },
]

// Mock agents data
const mockAgents = [
  { id: "1", name: "John Smith", avatar: "/placeholder.svg?height=40&width=40", avgRating: 4.8, responseCount: 156 },
  { id: "2", name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40", avgRating: 4.6, responseCount: 142 },
  { id: "3", name: "Michael Brown", avatar: "/placeholder.svg?height=40&width=40", avgRating: 4.2, responseCount: 98 },
  { id: "4", name: "Emily Davis", avatar: "/placeholder.svg?height=40&width=40", avgRating: 4.9, responseCount: 203 },
  { id: "5", name: "David Wilson", avatar: "/placeholder.svg?height=40&width=40", avgRating: 4.5, responseCount: 167 },
  { id: "6", name: "Lisa Martinez", avatar: "/placeholder.svg?height=40&width=40", avgRating: 4.7, responseCount: 189 },
  { id: "7", name: "Robert Taylor", avatar: "/placeholder.svg?height=40&width=40", avgRating: 3.9, responseCount: 112 },
  {
    id: "8",
    name: "Jennifer Anderson",
    avatar: "/placeholder.svg?height=40&width=40",
    avgRating: 4.8,
    responseCount: 178,
  },
  { id: "9", name: "James Thomas", avatar: "/placeholder.svg?height=40&width=40", avgRating: 4.4, responseCount: 145 },
  {
    id: "10",
    name: "Patricia Jackson",
    avatar: "/placeholder.svg?height=40&width=40",
    avgRating: 4.9,
    responseCount: 210,
  },
]

// Mock summaries data
const mockSummaries = [
  {
    id: "1",
    agent: "John Smith",
    period: "Last 30 days",
    summary:
      "John has consistently received high ratings with an average of 4.8/5. Customers frequently mention his patience and technical knowledge. Areas for potential improvement include follow-up communication.",
    sentimentScore: 0.85,
  },
  {
    id: "2",
    agent: "Sarah Johnson",
    period: "Last 30 days",
    summary:
      "Sarah maintains a strong average rating of 4.6/5. Customers appreciate her clear explanations and friendly demeanor. Some feedback suggests she could improve on resolution speed for complex issues.",
    sentimentScore: 0.78,
  },
  {
    id: "3",
    agent: "Michael Brown",
    period: "Last 30 days",
    summary:
      "Michael's average rating is 4.2/5. Positive comments highlight his problem-solving abilities, while improvement areas include active listening and avoiding technical jargon with non-technical customers.",
    sentimentScore: 0.65,
  },
  {
    id: "4",
    agent: "Emily Davis",
    period: "Last 30 days",
    summary:
      "Emily excels with a 4.9/5 average rating. Customers consistently praise her empathy and thoroughness. No significant areas for improvement were identified in recent feedback.",
    sentimentScore: 0.92,
  },
]

// Mock sent history
const mockSentHistory = [
  {
    id: "1",
    agent: "John Smith",
    recipient: "+1234567890",
    type: "SMS",
    sentAt: "2023-04-20T14:30:00Z",
    status: "Delivered",
  },
  {
    id: "2",
    agent: "Sarah Johnson",
    recipient: "customer@example.com",
    type: "Email",
    sentAt: "2023-04-20T13:15:00Z",
    status: "Delivered",
  },
  {
    id: "3",
    agent: "Michael Brown",
    recipient: "+1987654321",
    type: "SMS",
    sentAt: "2023-04-20T11:45:00Z",
    status: "Failed",
  },
  {
    id: "4",
    agent: "Emily Davis",
    recipient: "client@example.org",
    type: "Email",
    sentAt: "2023-04-20T10:30:00Z",
    status: "Delivered",
  },
  {
    id: "5",
    agent: "David Wilson",
    recipient: "+1122334455",
    type: "SMS",
    sentAt: "2023-04-19T16:20:00Z",
    status: "Delivered",
  },
]

// Mock agents for the dropdown
const mockAgentsDropdown = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Sarah Johnson" },
  { id: "3", name: "Michael Brown" },
  { id: "4", name: "Emily Davis" },
  { id: "5", name: "David Wilson" },
]

// =============================================
// UI COMPONENTS
// =============================================

// Button Component
function Button({ children, className, variant = "default", size = "default", disabled, type = "button", ...props }) {
  const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }

  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

// Card Components
function Card({ className, ...props }) {
  return <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
}

function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
}

function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
}

function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}

function CardFooter({ className, ...props }) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
}

// Badge Component
function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}

// Avatar Components
function Avatar({ className, ...props }) {
  return <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
}

function AvatarImage({ className, src, alt = "", ...props }) {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)} {...props} />
  )
}

// Table Components
function Table({ className, ...props }) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  )
}

function TableHeader({ className, ...props }) {
  return <thead className={cn("[&_tr]:border-b", className)} {...props} />
}

function TableBody({ className, ...props }) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
}

function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}
      {...props}
    />
  )
}

function TableHead({ className, ...props }) {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }) {
  return <td className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
}

// Input Component
function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

// Label Component
function Label({ className, ...props }) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  )
}

// Select Components
function Select({ children, value, onValueChange, ...props }) {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || "")

  const handleSelect = (val) => {
    setSelectedValue(val)
    onValueChange?.(val)
    setOpen(false)
  }

  return (
    <div className="relative" {...props}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selectedValue ? children.find((child) => child.props.value === selectedValue)?.props.children : "Select..."}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      {open && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
          <div className="p-1">
            {children.map((child) => (
              <div
                key={child.props.value}
                onClick={() => handleSelect(child.props.value)}
                className={cn(
                  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  selectedValue === child.props.value && "bg-accent text-accent-foreground",
                )}
              >
                {child.props.children}
                {selectedValue === child.props.value && <Check className="ml-auto h-4 w-4" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SelectItem({ value, children }) {
  return { props: { value, children } }
}

// Radio Components
function RadioGroup({ value, onValueChange, className, children, ...props }) {
  return (
    <div className={cn("flex", className)} {...props}>
      {children.map((child) =>
        React.cloneElement(child, {
          checked: value === child.props.value,
          onChange: () => onValueChange(child.props.value),
        }),
      )}
    </div>
  )
}

function RadioGroupItem({ value, id, checked, onChange, children }) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      {children}
    </div>
  )
}

// Dropdown Menu Components
function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      {React.Children.map(children, (child) => React.cloneElement(child, { open, setOpen }))}
    </div>
  )
}

function DropdownMenuTrigger({ children, open, setOpen }) {
  return React.cloneElement(children, { onClick: () => setOpen(!open) })
}

function DropdownMenuContent({ children, open, align = "end" }) {
  if (!open) return null
  return (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        align === "end" ? "right-0" : "left-0",
        "mt-2",
      )}
    >
      {children}
    </div>
  )
}

function DropdownMenuItem({ children, ...props }) {
  return (
    <button
      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-left"
      {...props}
    >
      {children}
    </button>
  )
}

function DropdownMenuLabel({ children }) {
  return <div className="px-2 py-1.5 text-sm font-semibold">{children}</div>
}

function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-muted" />
}

// =============================================
// DASHBOARD COMPONENTS
// =============================================

// AppSidebar Component
function AppSidebar() {
  const pathname = usePathname()

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <aside className="w-full border-r bg-background md:w-64 md:flex-shrink-0">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Star className="h-5 w-5 text-blue-600" />
          <span>RateMe Admin</span>
        </Link>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive("/dashboard")
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/agents"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive("/dashboard/agents")
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Users className="h-4 w-4" />
              Agents
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/summaries"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive("/dashboard/summaries")
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <FileText className="h-4 w-4" />
              Summaries
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/manual"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive("/dashboard/manual")
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Send className="h-4 w-4" />
              Manual Send
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

// SiteHeader Component
function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <div className="flex flex-1 items-center justify-end gap-4">
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

// SectionCards Component
function SectionCards({ metrics }) {
  const { avgRating = 0, feedbackCount = 0, responseRate = 0 } = metrics

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">Out of 5.0 stars</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
          <MessageSquare className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{feedbackCount}</div>
          <p className="text-xs text-muted-foreground">+{Math.floor(feedbackCount * 0.12)} from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
          <BarChart className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{responseRate}%</div>
          <p className="text-xs text-muted-foreground">+2% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}

// ChartAreaInteractive Component
function ChartAreaInteractive({ data }) {
  // This is a simplified version since we can't include recharts in this single file
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating Trends</CardTitle>
        <CardDescription>Average customer ratings over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[350px] w-full">
          {/* In a real implementation, this would be a recharts AreaChart */}
          <div className="flex h-full w-full items-center justify-center bg-muted/20">
            <p className="text-muted-foreground">Chart would render here (using recharts)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// DataTable Component
function DataTable({ data }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent</TableHead>
            <TableHead className="w-[100px] text-center">Rating</TableHead>
            <TableHead className="hidden md:table-cell">Comment</TableHead>
            <TableHead className="w-[150px]">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.agent}</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center">
                  <span className="mr-1">{row.rating}</span>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{row.comment}</TableCell>
              <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// AgentsList Component
function AgentsList({ agents }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <Card key={agent.id} className="cursor-pointer hover:bg-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <h3 className="font-medium">{agent.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="flex items-center mr-4">
                    <Star className="mr-1 h-4 w-4 text-yellow-500" />
                    <span>{agent.avgRating.toFixed(1)}</span>
                  </div>
                  <span>{agent.responseCount} responses</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// SummaryList Component
function SummaryList({ summaries }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {summaries.map((summary) => (
        <Card key={summary.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">{summary.agent}</CardTitle>
            <Badge variant={getSentimentVariant(summary.sentimentScore)}>
              {getSentimentLabel(summary.sentimentScore)}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-2">{summary.period}</div>
            <p className="text-sm">{summary.summary}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ManualSendForm Component
function ManualSendForm({ onSend }) {
  const [formData, setFormData] = useState({
    agent: "",
    type: "SMS",
    recipient: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      onSend(formData)
      setIsLoading(false)
      setFormData({
        ...formData,
        recipient: "",
      })
    }, 1000)
  }

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Rating Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agent">Select Agent</Label>
            <Select value={formData.agent} onValueChange={(value) => handleChange("agent", value)}>
              <SelectItem value="default">Select an agent</SelectItem>
              {mockAgentsDropdown.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Request Type</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => handleChange("type", value)}
              className="flex space-x-4"
            >
              <RadioGroupItem value="SMS" id="sms">
                <Label htmlFor="sms">SMS</Label>
              </RadioGroupItem>
              <RadioGroupItem value="Email" id="email">
                <Label htmlFor="email">Email</Label>
              </RadioGroupItem>
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

// SentHistory Component
function SentHistory({ history }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Sent</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.agent}</TableCell>
                <TableCell>{item.recipient}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{formatDate(item.sentAt)}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "Delivered" ? "default" : "destructive"}>{item.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// =============================================
// DASHBOARD PAGES
// =============================================

// Dashboard Layout
export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen flex-col md:flex-row">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}

// Dashboard Overview Page
export function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="mb-6 text-2xl font-bold">Dashboard Overview</h1>
      <SectionCards metrics={mockMetrics} />
      <div className="my-6">
        <ChartAreaInteractive data={mockMetrics.trend} />
      </div>
      <div>
        <h2 className="mb-4 text-xl font-semibold">Latest Feedback</h2>
        <DataTable data={mockFeedback} />
      </div>
    </div>
  )
}

// Agents Page
export function AgentsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Agents</h1>
      </div>
      <AgentsList agents={mockAgents} />
    </div>
  )
}

// Summaries Page
export function SummariesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI-Generated Summaries</h1>
        <Button>Download CSV</Button>
      </div>
      <SummaryList summaries={mockSummaries} />
    </div>
  )
}

// Manual Send Page
export function ManualSendPage() {
  const [sentHistory, setSentHistory] = useState(mockSentHistory)

  const handleSend = (formData) => {
    // In a real app, this would call an API
    console.log("Sending invitation:", formData)

    // Add to history for demo
    const newEntry = {
      id: String(Date.now()),
      agent: formData.agent,
      recipient: formData.recipient,
      type: formData.type,
      sentAt: new Date().toISOString(),
      status: "Delivered",
    }

    setSentHistory([newEntry, ...sentHistory])
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manual Send</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-1">
          <ManualSendForm onSend={handleSend} />
        </div>
        <div className="md:col-span-1 lg:col-span-2">
          <SentHistory history={sentHistory} />
        </div>
      </div>
    </div>
  )
}

// =============================================
// MAIN EXPORT
// =============================================

// This is the main export that combines all dashboard functionality
export default function Dashboard() {
  const pathname = usePathname()

  // Render the appropriate page based on the current path
  const renderPage = () => {
    switch (pathname) {
      case "/dashboard":
        return <DashboardPage />
      case "/dashboard/agents":
        return <AgentsPage />
      case "/dashboard/summaries":
        return <SummariesPage />
      case "/dashboard/manual":
        return <ManualSendPage />
      default:
        return <DashboardPage />
    }
  }

  return <DashboardLayout>{renderPage()}</DashboardLayout>
}

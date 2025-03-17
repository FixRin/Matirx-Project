import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useSpring, animated } from "@react-spring/web"
import {
  LayoutDashboard,
  BarChart2,
  MessageSquare,
  Users,
  CheckSquare,
  FileText,
  Settings,
  ChevronRight,
  Search,
  MoreVertical,
  ChevronUp,
  ChevronDown,
} from "lucide-react"

// Sample data
const employeeData = [
  {
    id: 1,
    name: "Esther Howard",
    position: "Sale's manager USA",
    transactions: 3490,
    rise: true,
    tasksCompleted: 3,
  },
  {
    id: 2,
    name: "Eleanor Pena",
    position: "Sale's manager Europe",
    transactions: 590,
    rise: false,
    tasksCompleted: 5,
  },
  {
    id: 3,
    name: "Robert Fox",
    position: "Sale's manager Asia",
    transactions: 2600,
    rise: true,
    tasksCompleted: 1,
  },
]

const graphData = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "June", "July"].map((i) => {
  const revenue = 500 + Math.random() * 2000
  const expectedRevenue = Math.max(revenue + (Math.random() - 0.5) * 2000, 0)
  return {
    name: i,
    revenue,
    expectedRevenue,
    sales: Math.floor(Math.random() * 500),
  }
})

const navItems = [
  { icon: <LayoutDashboard size={20} />, text: "Dashboard", id: "dashboard" },
  { icon: <BarChart2 size={20} />, text: "Analytics", id: "analytics" },
  { icon: <MessageSquare size={20} />, text: "Messages", id: "messages", badge: "6" },
  { icon: <Users size={20} />, text: "Team", id: "team" },
  { icon: <CheckSquare size={20} />, text: "Tasks", id: "tasks" },
  { icon: <FileText size={20} />, text: "Reports", id: "reports" },
  { icon: <Settings size={20} />, text: "Settings", id: "settings" },
]

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("dashboard")

  return (
    <div className="flex min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-800 transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col border-r dark:border-gray-700">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b dark:border-gray-700">
            <span className="text-2xl font-bold dark:text-white">Dashboard</span>
            <button
              className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <ChevronRight />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeItem === item.id
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.text}</span>
                {item.badge && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-xs text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="border-t dark:border-gray-700 p-4">
            <div className="flex items-center">
              <img src="/placeholder.svg" alt="User" className="h-8 w-8 rounded-full" />
              <div className="ml-3">
                <p className="text-sm font-medium dark:text-white">Jerry Wilson</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold dark:text-white">Hello David</h1>
              <p className="text-gray-600 dark:text-gray-400">Here's what's happening today</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-64 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:text-white"
                />
              </div>
              <button
                className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {employeeData.map((employee) => (
              <StatCard key={employee.id} data={employee} />
            ))}
          </div>

          {/* Charts */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h2 className="mb-4 text-lg font-semibold dark:text-white">Revenue Overview</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
                    <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "none",
                        borderRadius: "0.5rem",
                        color: "#fff",
                      }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2} />
                    <Line type="monotone" dataKey="expectedRevenue" stroke="#34D399" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h2 className="mb-4 text-lg font-semibold dark:text-white">Team Performance</h2>
              <div className="space-y-4">
                {employeeData.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src="/placeholder.svg" alt={employee.name} className="h-10 w-10 rounded-full" />
                      <div>
                        <p className="font-medium dark:text-white">{employee.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{employee.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1 ${employee.rise ? "text-green-500" : "text-red-500"}`}>
                        {employee.rise ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        {employee.transactions}
                      </span>
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ data }) {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: data.transactions },
    config: { duration: 1000 },
  })

  return (
    <div className="rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold dark:text-white">{data.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{data.position}</p>
        </div>
        <div className={`flex items-center gap-1 text-sm ${data.rise ? "text-green-500" : "text-red-500"}`}>
          {data.rise ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <animated.span>{number.to((n) => `$${n.toFixed(2)}`)}</animated.span>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm dark:text-gray-300">
          <span>Tasks Completed</span>
          <span>{data.tasksCompleted}/5</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full rounded-full bg-indigo-600" style={{ width: `${(data.tasksCompleted / 5) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}

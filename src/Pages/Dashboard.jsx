"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bell,
  Calendar,
  ChevronDown,
  Home,
  Layers,
  Menu,
  MessageSquare,
  PieChart,
  Settings,
  User,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";
import CalendarApp from "../Components/CalendarApp";
import LineChart from "../Components/LineChart";
import RadarChartExample from "../Components/Radar-Chart";
import supabase from "../Utils/Supabase";
import UsersProfile from "../Components/UsersProfile";
import ProductDatasDashboard from "../Components/ProductDatasDashboard";
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setData] = useState(null);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const theme = useSelector((state) => state.theme.mode);
 
  return (
    <div
      className={` ${
        theme === "dark"
          ? "bg-texture flex h-screen  bg-gray-900 text-white pt-24 "
          : "bg-texture flex h-screen  pt-24"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`bg-white  shadow-lg transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } md:relative md:block`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <img
            src="https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/batman-chromebook-wallpaper.jpg"
            className={`rounded-2xl  font-bold  ${
              !sidebarOpen && "hidden"
            } md:block`}
          />
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <SidebarItem
              icon={<Home className="h-5 w-5" />}
              title="Dashboard"
              isActive={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<Users className="h-5 w-5" />}
              title="Users"
              isActive={activeTab === "users"}
              onClick={() => setActiveTab("users")}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<Layers className="h-5 w-5" />}
              title="Products"
              isActive={activeTab === "products"}
              onClick={() => setActiveTab("products")}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<BarChart className="h-5 w-5" />}
              title="Analytics"
              isActive={activeTab === "analytics"}
              onClick={() => setActiveTab("analytics")}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<MessageSquare className="h-5 w-5" />}
              title="Messages"
              isActive={activeTab === "messages"}
              onClick={() => setActiveTab("messages")}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<Calendar className="h-5 w-5" />}
              title="Calendar"
              isActive={activeTab === "calendar"}
              onClick={() => setActiveTab("calendar")}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<Settings className="h-5 w-5" />}
              title="Settings"
              isActive={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
              collapsed={!sidebarOpen}
            />
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ">
        {/* Header */}
        <header className="bg-white shadow-sm ">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-md hover:bg-gray-100 md:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-1 rounded-full hover:bg-gray-100 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <span className="hidden md:block font-medium">Admin User</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4">
          {activeTab === "dashboard" && <DashboardContent />}
          {activeTab === "users" && <UsersProfile />}
          {activeTab === "products" && <ProductDatasDashboard />}
          {activeTab === "analytics" && <AnalyticsContent />}
          {activeTab === "messages" && <MessagesContent />}
          {activeTab === "calendar" && <CalendarApp />}
          {activeTab === "settings" && <SettingsContent />}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, title, isActive, onClick, collapsed }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center w-full p-2 rounded-md ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <span className="flex items-center justify-center">{icon}</span>
        {!collapsed && <span className="ml-3 hidden md:block">{title}</span>}
      </button>
    </li>
  );
}

function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value="2,543"
          change="+12.5%"
          isPositive={true}
        />
        <StatCard
          title="Revenue"
          value="$45,234"
          change="+8.2%"
          isPositive={true}
        />
        <StatCard
          title="Pending Orders"
          value="12"
          change="-2.4%"
          isPositive={false}
        />
        <StatCard
          title="Active Sessions"
          value="324"
          change="+18.7%"
          isPositive={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Sales Overview</h3>
            <select className="border rounded-md px-2 py-1 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64   bg-gray-50 rounded-md">
            <LineChart />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Traffic Sources</h3>
            <button className="text-blue-500 text-sm">View All</button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
            <RadarChartExample />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Recent Orders</h3>
          <button className="text-blue-500 text-sm">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <TableRow
                id="#ORD-0042"
                customer="John Smith"
                date="Apr 8, 2025"
                amount="$240.00"
                status="Completed"
              />
              <TableRow
                id="#ORD-0041"
                customer="Lisa Johnson"
                date="Apr 7, 2025"
                amount="$158.50"
                status="Processing"
              />
              <TableRow
                id="#ORD-0040"
                customer="Michael Brown"
                date="Apr 7, 2025"
                amount="$89.99"
                status="Completed"
              />
              <TableRow
                id="#ORD-0039"
                customer="Sarah Wilson"
                date="Apr 6, 2025"
                amount="$325.00"
                status="Pending"
              />
              <TableRow
                id="#ORD-0038"
                customer="David Miller"
                date="Apr 5, 2025"
                amount="$112.50"
                status="Completed"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, isPositive }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
      <p
        className={`text-sm mt-2 ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {change}
      </p>
    </div>
  );
}

function TableRow({ id, customer, date, amount, status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {customer}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}



function ProductsContent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Products Management</h3>
      <p className="text-gray-500">Product management content would go here.</p>
    </div>
  );
}

function AnalyticsContent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Analytics Dashboard</h3>
      <p className="text-gray-500">Analytics content would go here.</p>
    </div>
  );
}

function MessagesContent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Messages</h3>
      <p className="text-gray-500">Messages content would go here.</p>
    </div>
  );
}

function CalendarContent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Calendar</h3>
      <p className="text-gray-500">Calendar content would go here.</p>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Settings</h3>
      <p className="text-gray-500">Settings content would go here.</p>
    </div>
  );
}

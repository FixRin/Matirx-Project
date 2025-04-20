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
  NotepadText
} from "lucide-react";
import UserSettings from '../Components/UserSettings'
import MyOrders from '../Components/MyOrders'
import { useDispatch, useSelector } from "react-redux";
import CalendarApp from "../Components/CalendarApp";
import LineChart from "../Components/LineChart";
import RadarChartExample from "../Components/Radar-Chart";
import supabase from "../Utils/Supabase";
import UsersProfile from "../Components/UsersProfile";
import ProductDatasDashboard from "../Components/ProductDatasDashboard";
import UserDashboardContent from '../Components/UserDashboardContent'
import { setActiveTab } from "../Redux/ActiveTabSlice";
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeTab = useSelector((state) => state.activeTab);
  const dispatch = useDispatch()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const theme = useSelector((state) => state.theme.mode);
  const [session, setSession] = useState(null);
  
    const use = async()=>{
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });
  
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
  
      return () => subscription.unsubscribe();
    }
    useEffect(() => {
   use()
    }, []);
  
  
    const [data, setData] = useState(null);
    const using = async () => {
      let { data: profiles, error } = await supabase.from("profiles").select("*");

      setData(profiles[profiles.findIndex((user)=>user.email===session.user.email)]);
    };
  
    useEffect(() => {
      using();
    }, [session]);
    
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
        className={`${theme==='dark'?'bg-gray-800/[0.6]':'bg-white' } shadow-lg transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } md:relative md:block`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <img
            src={data?data.ProfilePicture:''}
            className={` rounded-full object-cover  font-bold  ${
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
              onClick={() => dispatch(setActiveTab('dashboard'))}
              collapsed={!sidebarOpen}
            />
         
            <SidebarItem
              icon={<NotepadText className="h-5 w-5" />}
              title="Orders"
              isActive={activeTab === "Orders"}
              onClick={() => dispatch(setActiveTab('Orders'))}
              collapsed={!sidebarOpen}
            />
        
        <SidebarItem
              icon={<Settings className="h-5 w-5" />}
              title="Settings"
              isActive={activeTab === "settings"}
              onClick={() => dispatch(setActiveTab('settings'))}
              collapsed={!sidebarOpen}
            />
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ">
        {/* Header */}
        <header className={`${theme==='dark'?'bg-gray-800/[0.6] ':'bg-white' } shadow-sm `}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-md hover:bg-gray-100 md:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-xl font-semibold ">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-1 rounded-full hover:bg-gray-100 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center gap-2 cursor-pointer">
            
                <span className="hidden md:block font-medium">Admin User</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4">
          {activeTab === "dashboard" && <UserDashboardContent />}
       
          {activeTab === "Orders" && <MyOrders />}
     
          {activeTab === "settings" && <SettingsContent />}
        </main>
      </div>
    </div>
  );
}

export  function SidebarItem({ icon, title, isActive, onClick, collapsed }) {
  const theme = useSelector((state) => state.theme.mode);
 
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center justify-center w-full p-2 rounded-md ${
          isActive
            ?  `${theme==='dark'?"bg-gray-600 text-blue-600":'"bg-blue-50 text-blue-600"'}`
            : `${theme==='dark'?"text-gray-100 hover:bg-gray-600":'text-gray-600 hover:bg-gray-100'}`
        }`}
      >
        <span className="flex items-center justify-center">{icon}</span>
        {!collapsed && <span className="ml-3 hidden md:block">{title}</span>}
      </button>
    </li>
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






function MessagesContent() {
  const theme = useSelector((state) => state.theme.mode);
 
  return (
    <div className={`${theme==='dark'?'bg-gray-800/[0.6]':'bg-white' }  p-6 rounded-lg shadow-sm`}>
      <h3 className="text-lg font-medium mb-4">Your Orders</h3>
      
    </div>
  );
}


function SettingsContent() {
  const theme = useSelector((state) => state.theme.mode);
 
  return (
    <div className={`${theme==='dark'?'bg-gray-800/[0.6]':'bg-white' }  p-6 rounded-lg shadow-sm`}>
      <h3 className="text-lg font-medium mb-4">Settings</h3>
      <p className="text-gray-500"><UserSettings/></p>
    </div>
  );
}

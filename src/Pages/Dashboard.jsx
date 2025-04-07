"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Sun,
  Moon,
  Bell,
  Settings,
  ChevronDown,
  Plus,
  Eye,
  Edit,
  Copy,
  Trash,
  X,
} from "lucide-react";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../Redux/ProductsSlice";

export default function AdsDashboard() {
  // State for modals
  const [cardDetailsModal, setCardDetailsModal] = useState({
    visible: false,
    type: "",
    title: "",
    content: "",
  });
  const [createProductModal, setCreateProductModal] = useState(false);
  const [viewProductModal, setViewProductModal] = useState({
    visible: false,
    ProductId: null,
    details: "",
  });
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({
    visible: false,
    ProductId: null,
  });
  const [profileModal, setProfileModal] = useState(false);
  const [allNotificationsModal, setAllNotificationsModal] = useState(false);
  const [settingsPageModal, setSettingsPageModal] = useState({
    visible: false,
    page: "",
    title: "",
    content: "",
  });

  // State for dropdowns
  const [activeDropdown, setActiveDropdown] = useState("");

  // State for dark mode

  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
    spendBudget: "$223.52",
    totalClicks: "14",
    status: "Active",
    campaignBudget: "$100",
    campaignSpent: "$23",
  });

  // State for Products
  const [Products, setProducts] = useState([
    {
      id: 1,
      Product: "Tshirt1",
      activatedTimes: 0,
      status: "Active",
    },
    {
      id: 2,
      Product: "Tshirt2",
      activatedTimes: 0,
      status: "Active",
    },
  ]);
      const { productItems, status, error } = useSelector(
        (state) => state.ProductData
      );
      const dispatch = useDispatch();
      useEffect(() => {
        if (status === "idle") {
          dispatch(fetchProductData());
        }
      }, [status, dispatch]);
    
      if (status === "failed") {
        return <div>Error: {error}</div>;
      }

  // Toggle dropdown
  const toggleDropdown = (dropdownId) => {
    if (activeDropdown === dropdownId) {
      setActiveDropdown("");
    } else {
      setActiveDropdown(dropdownId);
    }
  };

  // Select option from dropdown
  const selectOption = (dropdownId, option) => {
    // Update UI based on selection
    if (dropdownId === "campaignDropdown") {
      if (option === "Summer Sale Campaign") {
        setDashboardData({
          ...dashboardData,
          spendBudget: "$345.67",
          totalClicks: "28",
        });
      } else if (option === "New Product Launch") {
        setDashboardData({
          ...dashboardData,
          spendBudget: "$512.89",
          totalClicks: "42",
        });
      } else if (option === "Holiday Special") {
        setDashboardData({
          ...dashboardData,
          spendBudget: "$198.45",
          totalClicks: "19",
        });
      } else {
        setDashboardData({
          ...dashboardData,
          spendBudget: "$223.52",
          totalClicks: "14",
        });
      }
    }

    setActiveDropdown("");
  };

  // Show card details
  const showCardDetails = (cardType) => {
    let title = "";
    let content = "";

    if (cardType === "spend") {
      title = "Spend Budget Details";
      content = (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Spend
            </h3>
            <p className="text-2xl font-bold">{dashboardData.spendBudget}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Daily Average
              </h3>
              <p className="text-lg font-semibold">$31.93</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Projected Monthly
              </h3>
              <p className="text-lg font-semibold">$958.00</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Spend Breakdown
            </h3>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Facebook Ads</span>
                <span className="text-sm font-medium">$125.45</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-teal-500 h-2 rounded-full"
                  style={{ width: "56%" }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Google Ads</span>
                <span className="text-sm font-medium">$78.32</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-teal-500 h-2 rounded-full"
                  style={{ width: "35%" }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">LinkedIn Ads</span>
                <span className="text-sm font-medium">$19.75</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-teal-500 h-2 rounded-full"
                  style={{ width: "9%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (cardType === "clicks") {
      title = "Total Clicks Details";
      content = (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Clicks
            </h3>
            <p className="text-2xl font-bold">{dashboardData.totalClicks}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Click-through Rate
              </h3>
              <p className="text-lg font-semibold">2.3%</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Cost per Click
              </h3>
              <p className="text-lg font-semibold">$15.97</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Click Trends (Last 7 Days)
            </h3>
            <div className="h-32 mt-2 flex items-end space-x-2">
              <div
                className="w-1/7 bg-teal-200 dark:bg-teal-800 rounded-t"
                style={{ height: "40%" }}
              ></div>
              <div
                className="w-1/7 bg-teal-300 dark:bg-teal-700 rounded-t"
                style={{ height: "60%" }}
              ></div>
              <div
                className="w-1/7 bg-teal-400 dark:bg-teal-600 rounded-t"
                style={{ height: "30%" }}
              ></div>
              <div
                className="w-1/7 bg-teal-500 rounded-t"
                style={{ height: "80%" }}
              ></div>
              <div
                className="w-1/7 bg-teal-400 dark:bg-teal-600 rounded-t"
                style={{ height: "50%" }}
              ></div>
              <div
                className="w-1/7 bg-teal-300 dark:bg-teal-700 rounded-t"
                style={{ height: "70%" }}
              ></div>
              <div
                className="w-1/7 bg-teal-200 dark:bg-teal-800 rounded-t"
                style={{ height: "45%" }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      );
    } else if (cardType === "status") {
      title = "Campaign Status Details";
      content = (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Current Status
            </h3>
            <p className="text-2xl font-bold text-teal-500">
              {dashboardData.status}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Campaign Timeline
            </h3>
            <div className="mt-2">
              <div className="flex justify-between text-sm">
                <span>Start Date</span>
                <span className="font-medium">March 1, 2025</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 my-2">
                <div
                  className="bg-teal-500 h-2 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>End Date</span>
                <span className="font-medium">May 31, 2025</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Status History
            </h3>
            <div className="mt-2 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Active</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    March 10, 2025
                  </p>
                </div>
                <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-xs">
                  Current
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Paused</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    March 5-10, 2025
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Active</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    March 1-5, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (cardType === "budget") {
      title = "Campaign Budget Details";
      content = (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Budget
            </h3>
            <p className="text-2xl font-bold">{dashboardData.campaignBudget}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Budget Spent
            </h3>
            <div className="flex items-baseline">
              <p className="text-xl font-semibold text-teal-500">
                {dashboardData.campaignSpent}
              </p>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                (23% of total)
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
              <div
                className="bg-teal-500 h-2 rounded-full"
                style={{ width: "23%" }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Daily Budget
              </h3>
              <p className="text-lg font-semibold">$3.33</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Remaining
              </h3>
              <p className="text-lg font-semibold">$77.00</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Budget Adjustments
            </h3>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Initial Budget</span>
                <span className="font-medium">$80.00</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Increase on Mar 5</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  +$20.00
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Current Budget</span>
                <span className="font-medium">$100.00</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    setCardDetailsModal({
      visible: true,
      type: cardType,
      title,
      content,
    });
  };

  // View Product details
  const viewProduct = (ProductId) => {
    let details = "";

    if (ProductId === 1) {
      details = (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Product Name
            </h3>
            <p className="text-lg font-semibold">Tshirt1</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Description
            </h3>
            <p className="text-base">sdfsdfsd</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </h3>
              <p className="text-base text-teal-500">Active</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Activated
              </h3>
              <p className="text-base">0 times</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Created
            </h3>
            <p className="text-base">March 5, 2025</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Last Modified
            </h3>
            <p className="text-base">March 10, 2025</p>
          </div>
        </div>
      );
    } else if (ProductId === 2) {
      details = (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Product Name
            </h3>
            <p className="text-lg font-semibold">Tshirt 2</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Description
            </h3>
            <p className="text-base">sfsdmsdkfksd</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </h3>
              <p className="text-base text-teal-500">Active</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Activated
              </h3>
              <p className="text-base">0 times</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Created
            </h3>
            <p className="text-base">March 7, 2025</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Last Modified
            </h3>
            <p className="text-base">March 7, 2025</p>
          </div>
        </div>
      );
    } else {
      details = (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Product Name
            </h3>
            <p className="text-lg font-semibold">New Custom Name</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Description
            </h3>
            <p className="text-base">New custom product description</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </h3>
              <p className="text-base text-teal-500">Active</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Activated
              </h3>
              <p className="text-base">0 times</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Created
            </h3>
            <p className="text-base">Today</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Last Modified
            </h3>
            <p className="text-base">Today</p>
          </div>
        </div>
      );
    }

    setViewProductModal({
      visible: true,
      ProductId,
      details,
    });
  };

  // Edit Product
  const editProduct = (ProductId) => {
    // Show create Product modal with pre-filled data
    setCreateProductModal(true);
  };

  // Duplicate Product
  const duplicateProduct = (ProductId) => {
    const ProductToDuplicate = Products.find(
      (Product) => Product.id === ProductId
    );
    if (ProductToDuplicate) {
      const newProduct = {
        id: Products.length + 1,
        Product: `${ProductToDuplicate.Product} (Copy)`,
        activatedTimes: 0,
        status: "Active",
      };
      setProducts([...Products, newProduct]);
    }
  };

  // Delete Product
  const deleteProduct = (ProductId) => {
    setDeleteConfirmModal({
      visible: true,
      ProductId,
    });
  };

  // Confirm delete
  const confirmDelete = () => {
    if (deleteConfirmModal.ProductId) {
      setProducts(
        Products.filter(
          (Product) => Product.id !== deleteConfirmModal.ProductId
        )
      );
    }
    setDeleteConfirmModal({ visible: false, ProductId: null });
  };

  // Create new Product
  const createProduct = () => {
    const newProduct = {
      id: Products.length + 1,
      Product: "New custom Product",
      activatedTimes: 0,
      status: "Active",
    };
    setProducts([...Products, newProduct]);
    setCreateProductModal(false);
  };

  // Show settings page
  const showSettingsPage = (page) => {
    let title = "";
    let content = "";

    if (page === "account") {
      title = "Account Settings";
      content = (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  defaultValue="John"
                  className="w-full border dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue="Doe"
                  className="w-full border dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="w-full border dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full border dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
          Sign
          <div>
            <h3 className="text-lg font-medium mb-4">Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition-colors">
              Cancel
            </button>
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      );
    }

    setSettingsPageModal({
      visible: true,
      page,
      title,
      content,
    });

    // Close any open dropdowns
    setActiveDropdown("");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setActiveDropdown("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-blue-50/50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200 pt-24">
      <div className="container mx-auto p-4">
        <h1 className="text-gray-500 dark:text-gray-400 text-sm mb-2">
          Dashboard
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-2 bg-blue-100 dark:bg-blue-900 p-1 rounded">
                <div className="text-teal-500 font-bold">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 4L20 18H4L12 4Z" fill="#4ade80" />
                  </svg>
                </div>
              </div>
              <span className="text-teal-500 font-bold text-xl">PixelWear</span>
            </div>

            <div className="flex items-center w-full md:w-auto">
              <div className="relative flex-1 md:flex-none md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-8 h-9 w-full border dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="flex ml-2 space-x-1">
                {/* Notifications Button */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("notificationsDropdown")}
                    className="relative p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 tooltip"
                  >
                    <span className="tooltiptext">Notifications</span>
                    <Bell className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                    <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
                  </button>
                  {activeDropdown === "notificationsDropdown" && (
                    <div className="dropdown-content absolute right-0 top-10 mt-2 w-72 z-10">
                      <div className="p-3 border-b dark:border-gray-700">
                        <h3 className="font-medium">Notifications</h3>
                      </div>
                      <a
                        href="#"
                        className="flex p-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <div className="w-2 h-2 mt-1.5 bg-teal-500 rounded-full mr-2"></div>
                        <div>
                          <p className="text-sm font-medium">
                            Campaign "Summer Sale" is performing well
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            2 hours ago
                          </p>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="flex p-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <div className="w-2 h-2 mt-1.5 bg-red-500 rounded-full mr-2"></div>
                        <div>
                          <p className="text-sm font-medium">
                            Budget limit reached for "Product Launch"
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Yesterday
                          </p>
                        </div>
                      </a>
                      <a
                        href="#"
                        onClick={() => {
                          setAllNotificationsModal(true);
                          setActiveDropdown("");
                        }}
                        className="p-3 text-center text-sm text-teal-500 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        View all notifications
                      </a>
                    </div>
                  )}
                </div>

                {/* Settings Button */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("settingsDropdown")}
                    className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 tooltip"
                  >
                    <span className="tooltiptext">Settings</span>
                    <Settings className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                  </button>
                  {activeDropdown === "settingsDropdown" && (
                    <div className="dropdown-content absolute right-0 top-10 mt-2 w-48 z-10">
                      <a href="#" onClick={() => showSettingsPage("account")}>
                        Account Settings
                      </a>
                      <a href="#" onClick={() => showSettingsPage("billing")}>
                        Billing
                      </a>
                      <a href="#" onClick={() => showSettingsPage("team")}>
                        Team Management
                      </a>
                      <a href="#" onClick={() => showSettingsPage("api")}>
                        API Access
                      </a>
                      <a
                        href="#"
                        onClick={() => alert("You have been logged out.")}
                      >
                        Log Out
                      </a>
                    </div>
                  )}
                </div>

                {/* User Menu Button */}
                <div className="ml-1 relative">
                  <div
                    onClick={() => toggleDropdown("userMenuDropdown")}
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden cursor-pointer tooltip"
                  >
                    <span className="tooltiptext">User Menu</span>
                    <img
                      src="https://i.pinimg.com/736x/5d/b9/b7/5db9b78e03c052de2e63baee0bc71456.jpg"
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {activeDropdown === "userMenuDropdown" && (
                    <div className="dropdown-content absolute right-0 top-10 mt-2 w-48 z-10">
                      <div className="p-3 border-b dark:border-gray-700">
                        <p className="font-medium">John Doe</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          john.doe@example.com
                        </p>
                      </div>
                      <a
                        href="#"
                        onClick={() => {
                          setProfileModal(true);
                          setActiveDropdown(" ");
                        }}
                      >
                        My Profile
                      </a>
                      <a href="#" onClick={() => showSettingsPage("account")}>
                        Account Settings
                      </a>
                      <a href="#" onClick={() => showSettingsPage("billing")}>
                        Billing
                      </a>
                     
                        <a   onClick={() => {
                          console.log("sdfsdjfnsdj");
                        }} style={{color:'red'}}>Log Out</a>
                    
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col dropdown">
              <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Account:
              </span>
              <div
                className="flex items-center justify-between border dark:border-gray-700 rounded p-2 text-sm cursor-pointer bg-white dark:bg-gray-700"
                onClick={() => toggleDropdown("accountDropdown")}
              >
                <span className="truncate">Deployment Add Account</span>
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0" />
              </div>
              {activeDropdown === "accountDropdown" && (
                <div className="dropdown-content w-full mt-1 z-10">
                  <a
                    href="#"
                    onClick={() =>
                      selectOption("accountDropdown", "Deployment Add Account")
                    }
                  >
                    Deployment Add Account
                  </a>
                  <a
                    href="#"
                    onClick={() =>
                      selectOption("accountDropdown", "Marketing Account")
                    }
                  >
                    Marketing Account
                  </a>
                  <a
                    href="#"
                    onClick={() =>
                      selectOption("accountDropdown", "Sales Account")
                    }
                  >
                    Sales Account
                  </a>
                  <a
                    href="#"
                    onClick={() =>
                      selectOption("accountDropdown", "Support Account")
                    }
                  >
                    Support Account
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col dropdown">
              <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Campaign Groups:
              </span>
              <div
                className="flex items-center justify-between border dark:border-gray-700 rounded p-2 text-sm cursor-pointer bg-white dark:bg-gray-700"
                onClick={() => toggleDropdown("campaignGroupDropdown")}
              >
                <span className="truncate">TH</span>
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0" />
              </div>
              {activeDropdown === "campaignGroupDropdown" && (
                <div className="dropdown-content w-full mt-1 z-10">
                  <a
                    href="#"
                    onClick={() => selectOption("campaignGroupDropdown", "TH")}
                  >
                    TH
                  </a>
                  <a
                    href="#"
                    onClick={() =>
                      selectOption("campaignGroupDropdown", "Prospecting")
                    }
                  >
                    Prospecting
                  </a>
                  <a
                    href="#"
                    onClick={() =>
                      selectOption("campaignGroupDropdown", "Retargeting")
                    }
                  >
                    Retargeting
                  </a>
                  <a
                    href="#"
                    onClick={() =>
                      selectOption("campaignGroupDropdown", "Awareness")
                    }
                  >
                    Awareness
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col dropdown">
              <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Campaigns:
              </span>
              <div
                className="flex items-center justify-between border dark:border-gray-700 rounded p-2 text-sm cursor-pointer bg-white dark:bg-gray-700"
                onClick={() => toggleDropdown("campaignDropdown")}
              >
                <span className="truncate">Ecommerce Marketing Messages</span>
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0" />
              </div>
              {activeDropdown === "campaignDropdown" && (
                <div className="dropdown-content w-full mt-1 z-10">
                  <a
                    href="#"
                    onClick={() =>
                      selectOption(
                        "campaignDropdown",
                        "Ecommerce Marketing Messages"
                      )
                    }
                  >
                    Ecommerce Marketing Messages
                  </a>
                  <a
                    href="#"
                    onClick={() =>
                      selectOption("campaignDropdown", "Summer Sale Campaign")
                    }
                  >
                    Summer Sale Campaign
                  </a>
                  <a
                    href="#"
                    onClick={() =>
                      selectOption("campaignDropdown", "New Product Launch")
                    }
                  >
                    New Product Launch
                  </a>
                  <a
                    href="#"
                    onClick={() =>
                      selectOption("campaignDropdown", "Holiday Special")
                    }
                  >
                    Holiday Special
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col dropdown">
              <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Week:
              </span>
              <div
                className="flex items-center justify-between border dark:border-gray-700 rounded p-2 text-sm cursor-pointer bg-white dark:bg-gray-700"
                onClick={() => toggleDropdown("weekDropdown")}
              >
                <span className="truncate">Current Week</span>
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0" />
              </div>
              {activeDropdown === "weekDropdown" && (
                <div className="dropdown-content w-full mt-1 z-10">
                  <a
                    href="#"
                    onClick={() => selectOption("weekDropdown", "Current Week")}
                  >
                    Current Week
                  </a>
                  <a
                    href="#"
                    onClick={() => selectOption("weekDropdown", "Last Week")}
                  >
                    Last Week
                  </a>
                  <a
                    href="#"
                    onClick={() => selectOption("weekDropdown", "Last 2 Weeks")}
                  >
                    Last 2 Weeks
                  </a>
                  <a
                    href="#"
                    onClick={() => selectOption("weekDropdown", "Last Month")}
                  >
                    Last Month
                  </a>
                  <a
                    href="#"
                    onClick={() => selectOption("weekDropdown", "Custom Range")}
                  >
                    Custom Range
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div
              onClick={() => showCardDetails("spend")}
              className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Spend Budget
              </h3>
              <p className="text-xl font-semibold">
                {dashboardData.spendBudget}
              </p>
            </div>

            <div
              onClick={() => showCardDetails("clicks")}
              className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Total Clicks
              </h3>
              <p className="text-xl font-semibold">
                {dashboardData.totalClicks}
              </p>
            </div>

            <div
              onClick={() => showCardDetails("status")}
              className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Status
              </h3>
              <p className="text-xl font-semibold text-teal-500">
                {dashboardData.status}
              </p>
            </div>

            <div
              onClick={() => showCardDetails("budget")}
              className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Campaign Budget
              </h3>
              <div className="flex items-baseline">
                <p className="text-xl font-semibold">
                  {dashboardData.campaignBudget}
                </p>
                <span className="text-gray-400 mx-2">/</span>
                <p className="text-xl font-semibold text-teal-500">
                  {dashboardData.campaignSpent}
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Chart */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Statistics</h2>
              <div className="flex items-center text-xs">
                <div className="flex items-center mr-4">
                  <div className="w-2 h-2 rounded-full bg-teal-400 mr-1"></div>
                  <span>Clicks</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-400 mr-1"></div>
                  <span>Spend</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg p-4 shadow-sm">
              <div className="chart-container">
                {/* Chart grid lines */}
                {[0, 20, 40, 60, 80, 100].map((pos) => (
                  <div
                    key={pos}
                    className="chart-line"
                    style={{ bottom: `${pos}%` }}
                  >
                    <span className="chart-label">
                      {Math.floor((5 * pos) / 100)}
                    </span>
                    <span className="chart-label-right">
                      {Math.floor((50 * pos) / 100)}
                    </span>
                  </div>
                ))}

                {/* Chart curves */}
                <div className="chart-curve-green"></div>
                <div className="chart-curve-red"></div>

                {/* Chart labels */}
                <div className="absolute bottom-0 left-5 text-xs text-gray-500 dark:text-gray-400">
                  Click
                </div>
                <div className="absolute bottom-0 right-5 text-xs text-gray-500 dark:text-gray-400">
                  Spend
                </div>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Product List</h2>
              <button
                onClick={() => setCreateProductModal(true)}
                className="flex items-center text-teal-500 hover:text-teal-600 text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-50 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-300">
                  <tr>
                    <th className="px-4 py-2 text-left rounded-l-md">
                      Product
                    </th>
                    <th className="px-4 py-2 text-center">Activated # Times</th>
                    <th className="px-4 py-2 text-center">Status</th>
                    <th className="px-4 py-2 text-center rounded-r-md">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {Products.map((Product) => (
                    <tr
                      key={Product.id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="px-4 py-3">{Product.Product}</td>
                      <td className="px-4 py-3 text-center">
                        {Product.activatedTimes}
                      </td>
                      <td className="px-4 py-3 text-center text-teal-500">
                        {Product.status}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center space-x-2">
                          <button
                            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 tooltip"
                            onClick={() => viewProduct(Product.id)}
                          >
                            <span className="tooltiptext">View Product</span>
                            <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          </button>
                          <button
                            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 tooltip"
                            onClick={() => editProduct(Product.id)}
                          >
                            <span className="tooltiptext">Edit Product</span>
                            <Edit className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          </button>
                          <button
                            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 tooltip"
                            onClick={() => duplicateProduct(Product.id)}
                          >
                            <span className="tooltiptext">
                              Duplicate Product
                            </span>
                            <Copy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          </button>
                          <button
                            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 tooltip"
                            onClick={() => deleteProduct(Product.id)}
                          >
                            <span className="tooltiptext">Delete Product</span>
                            <Trash className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}

      {/* Card Details Modal */}
      {cardDetailsModal.visible && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="bg-teal-500 text-white py-3 px-4 rounded-t-lg">
              <h2 className="text-lg font-medium">{cardDetailsModal.title}</h2>
            </div>

            <div className="p-6">
              <div className="mb-6">{cardDetailsModal.content}</div>

              <div className="flex justify-end">
                <button
                  onClick={() =>
                    setCardDetailsModal({
                      visible: false,
                      type: "",
                      title: "",
                      content: "",
                    })
                  }
                  className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Product Modal */}
      {createProductModal && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="bg-teal-500 text-white py-3 px-4 rounded-t-lg text-center">
              <h2 className="text-lg font-medium">Create Product</h2>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Product name"
                  className="w-full border dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Product
                </label>
                <div className="mb-4">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1"></label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center justify-between border dark:border-gray-700 rounded p-2 text-sm cursor-pointer dropdown bg-white dark:bg-gray-700">
                      <span className="truncate">Not spent daily budget</span>
                      <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-1 flex-shrink-0" />
                    </div>
                    <div className="flex items-center justify-between border dark:border-gray-700 rounded p-2 text-sm cursor-pointer dropdown bg-white dark:bg-gray-700">
                      <span className="truncate">Greater</span>
                      <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-1 flex-shrink-0" />
                    </div>
                    <div className="flex items-center justify-between border dark:border-gray-700 rounded p-2 text-sm cursor-pointer dropdown bg-white dark:bg-gray-700">
                      <span className="truncate">Days</span>
                      <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-1 flex-shrink-0" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Execute
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center justify-between border dark:border-gray-700 rounded p-2 text-sm cursor-pointer dropdown bg-white dark:bg-gray-700">
                      <span className="truncate">Decrease</span>
                      <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-1 flex-shrink-0" />
                    </div>
                    <div className="flex items-center justify-between border dark:border-gray-700 rounded p-2 text-sm cursor-pointer dropdown bg-white dark:bg-gray-700">
                      <span className="truncate">Change</span>
                      <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-1 flex-shrink-0" />
                    </div>
                    <div className="flex items-center justify-between border dark:border-gray-700 rounded p-2 text-sm cursor-pointer dropdown bg-white dark:bg-gray-700">
                      <span className="truncate">USD</span>
                      <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-1 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={createProduct}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Create
                </button>
                <button
                  onClick={() => setCreateProductModal(false)}
                  className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {viewProductModal.visible && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="bg-teal-500 text-white py-3 px-4 rounded-t-lg">
              <h2 className="text-lg font-medium">Product Details</h2>
            </div>

            <div className="p-6">
              <div className="mb-6">{viewProductModal.details}</div>

              <div className="flex justify-end">
                <button
                  onClick={() =>
                    setViewProductModal({
                      visible: false,
                      ProductId: null,
                      details: "",
                    })
                  }
                  className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmModal.visible && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="bg-red-500 text-white py-3 px-4 rounded-t-lg">
              <h2 className="text-lg font-medium">Confirm Delete</h2>
            </div>

            <div className="p-6">
              <p className="mb-6">
                Are you sure you want to delete this Product? This action cannot
                be undone.
              </p>

              <div className="flex justify-between">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    setDeleteConfirmModal({ visible: false, ProductId: null })
                  }
                  className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {profileModal && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="bg-teal-500 text-white py-3 px-4 rounded-t-lg">
              <h2 className="text-lg font-medium">My Profile</h2>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden mr-4">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">John Doe</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Account Manager
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </h4>
                  <p>john.doe@example.com</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Phone
                  </h4>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Role
                  </h4>
                  <p>Administrator</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Member Since
                  </h4>
                  <p>January 15, 2023</p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => showSettingsPage("account")}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setProfileModal(false)}
                  className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Notifications Modal */}
      {allNotificationsModal && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="bg-teal-500 text-white py-3 px-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-medium">All Notifications</h2>
              <button
                onClick={() => setAllNotificationsModal(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <div className="flex p-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                  <div className="w-2 h-2 mt-1.5 bg-teal-500 rounded-full mr-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">
                        Campaign "Summer Sale" is performing well
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        2 hours ago
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Your campaign has exceeded the target CTR by 15%
                    </p>
                  </div>
                </div>

                <div className="flex p-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                  <div className="w-2 h-2 mt-1.5 bg-red-500 rounded-full mr-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">
                        Budget limit reached for "Product Launch"
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Yesterday
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Your campaign has reached 90% of its allocated budget
                    </p>
                  </div>
                </div>

                <div className="flex p-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                  <div className="w-2 h-2 mt-1.5 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">
                        New Product activated
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        2 days ago
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Your Product "Increase budget on high ROI" was triggered
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t dark:border-gray-700">
              <div className="flex justify-between">
                <button className="text-teal-500 hover:text-teal-600 text-sm font-medium">
                  Mark all as read
                </button>
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm">
                  Clear all notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Page Modal */}
      {settingsPageModal.visible && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="bg-teal-500 text-white py-3 px-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-medium">{settingsPageModal.title}</h2>
              <button
                onClick={() =>
                  setSettingsPageModal({
                    visible: false,
                    page: "",
                    title: "",
                    content: "",
                  })
                }
                className="text-white hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">{settingsPageModal.content}</div>
          </div>
        </div>
      )}

      {/* Add CSS for custom chart styles */}
      <style jsx>{`
        .chart-container {
          position: relative;
          height: 250px;
        }
        .chart-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background-color: #f0f0f0;
        }
        :global(.dark) .chart-line {
          background-color: #374151;
        }
        .chart-label {
          position: absolute;
          left: 5px;
          font-size: 10px;
          color: #888;
        }
        :global(.dark) .chart-label {
          color: #9ca3af;
        }
        .chart-label-right {
          position: absolute;
          right: 5px;
          font-size: 10px;
          color: #888;
        }
        :global(.dark) .chart-label-right {
          color: #9ca3af;
        }
        .chart-curve-green {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 250" preserveAspectRatio="none"><path d="M0,200 Q250,100 500,150 T1000,100 V250 H0 Z" fill="rgba(78, 222, 128, 0.1)" stroke="rgba(78, 222, 128, 1)" strokeWidth="2" /></svg>');
          background-size: 100% 100%;
        }
        .chart-curve-red {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 250" preserveAspectRatio="none"><path d="M0,150 Q250,200 500,100 T1000,150" fill="none" stroke="rgba(248, 113, 113, 1)" strokeWidth="2" /></svg>');
          background-size: 100% 100%;
        }
        .tooltip {
          position: relative;
          display: inline-block;
        }
        .tooltip .tooltiptext {
          visibility: hidden;
          width: 120px;
          background-color: #333;
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 5px;
          position: absolute;
          z-index: 1;
          bottom: 125%;
          left: 50%;
          margin-left: -60px;
          opacity: 0;
          transition: opacity 0.3s;
          font-size: 12px;
        }
        :global(.dark) .tooltip .tooltiptext {
          background-color: #111;
        }
        .tooltip:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
        }
        .dropdown-content {
          position: absolute;
          background-color: white;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
          border-radius: 0.375rem;
          border: 1px solid #e5e7eb;
        }
        :global(.dark) .dropdown-content {
          background-color: #1f2937;
          border-color: #374151;
        }
        .dropdown-content a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }
        :global(.dark) .dropdown-content a {
          color: #e5e7eb;
        }
        .dropdown-content a:hover {
          background-color: #f9fafb;
        }
        :global(.dark) .dropdown-content a:hover {
          background-color: #374151;
        }
      `}</style>
    </div>
  );
}

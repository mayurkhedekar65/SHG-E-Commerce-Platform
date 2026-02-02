import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- IMPORT YOUR SEPARATE COMPONENTS HERE ---
// Ensure the file paths match your project structure
import PendingOrders from "../components/PendingOrders";
import OrderHistory from "../components/OrderHistory";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  // State to track which section is currently active
  const [activeTab, setActiveTab] = useState("profile");

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("access_token");
    alert("logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://127.0.0.1:8000/get_user_profile/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((response) => response.data)
          .then((data) => setProfileData(data["user_details"][0]));
      } catch {
        console.error("profile data not found..");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex font-sans">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-[#bfa85f] shadow-lg hidden md:flex flex-col sticky top-0 h-screen">
          <div className="p-6 border-b border-[#bfa85f]">
            <h2 className="text-2xl font-semibold tracking-wide">
              User Profile
            </h2>
            <p className="text-sm text-[#a69e6e] mt-1 uppercase tracking-wide">
              Member Panel
            </p>
          </div>

          <nav className="flex-1 p-6 space-y-4">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left px-5 py-3 rounded-xl font-semibold transition duration-300 ease-in-out ${
                activeTab === "profile" 
                ? "bg-[#bfa85f] shadow-md text-gray-900" 
                : "hover:bg-gray-800 text-[#bfa85f]"
              }`}
            >
              Profile
            </button>

            <button 
              onClick={() => setActiveTab("pending")}
              className={`w-full text-left px-5 py-3 rounded-xl font-semibold transition duration-300 ease-in-out ${
                activeTab === "pending" 
                ? "bg-[#bfa85f] shadow-md text-gray-900" 
                : "hover:bg-gray-800 text-[#bfa85f]"
              }`}
            >
              Pending Orders
            </button>

            <button 
              onClick={() => setActiveTab("delivered")}
              className={`w-full text-left px-5 py-3 rounded-xl font-semibold transition duration-300 ease-in-out ${
                activeTab === "delivered" 
                ? "bg-[#bfa85f] shadow-md text-gray-900" 
                : "hover:bg-gray-800 text-[#bfa85f]"
              }`}
            >
              Delivered Orders
            </button>

            <button
              className="w-full text-left px-5 py-3 rounded-xl hover:bg-gray-800 font-semibold tracking-wide text-[#bfa85f] transition duration-300 ease-in-out"
              onClick={logout}
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Welcome, {profileData?.customer_name || "User"}
              </h1>
              <p className="text-base text-gray-600 mt-2 max-w-xl leading-relaxed">
                Manage your profile and orders efficiently with ease.
              </p>
            </div>
          </div>

          {/* Dynamic Content Based on activeTab */}
          {activeTab === "profile" && (
            <>
              {/* Profile Panel */}
              <section className="bg-white rounded-3xl shadow-lg p-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-wide">
                  Profile Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { label: "Name", value: profileData?.customer_name },
                    { label: "Email", value: profileData?.customer_email },
                    { label: "Contact Number", value: profileData?.phone_number },
                    { label: "Address", value: profileData?.address },
                  ].map((item, index) => (
                    <div key={index}>
                      <p className="text-xs uppercase font-semibold text-gray-500 mb-2 tracking-wide">
                        {item.label}
                      </p>
                      <div className="bg-gray-50 rounded-2xl px-6 py-4 font-semibold text-gray-900 shadow-sm select-text">
                        {item.value || "Not Available"}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Orders Preview Section (Original Grid) */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Pending Orders Preview */}
                {/* <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-wide">
                      Pending Orders
                    </h3>
                    <span className="bg-yellow-600 text-yellow-100 px-4 py-2 rounded-full text-sm font-semibold tracking-wider">
                      Pending
                    </span>
                  </div>

                  <ul className="space-y-4">
                    {pendingOrders?.length ? (
                      pendingOrders.map((order, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center bg-gray-50 rounded-2xl px-6 py-4 shadow-sm hover:bg-gray-100 transition-colors duration-300"
                        >
                          <span className="font-semibold text-gray-900 tracking-wide">
                            {order.itemName}
                          </span>
                          <span className="text-sm text-gray-600 font-medium">
                            Qty: {order.quantity}
                          </span>
                        </li>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600 font-medium">
                        No pending orders
                      </p>
                    )}
                  </ul>
                  <button onClick={() => setActiveTab("pending")} className="mt-6 text-[#bfa85f] font-bold text-sm uppercase tracking-widest hover:underline">View All</button>
                </div> */}

                {/* Delivered Orders Preview */}
                {/* <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-wide">
                      Delivered Orders
                    </h3>
                    <span className="bg-green-700 text-green-100 px-4 py-2 rounded-full text-sm font-semibold tracking-wider">
                      Delivered
                    </span>
                  </div>

                  <ul className="space-y-4">
                    {deliveredOrders?.length ? (
                      deliveredOrders.map((order, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center bg-gray-50 rounded-2xl px-6 py-4 shadow-sm hover:bg-gray-100 transition-colors duration-300"
                        >
                          <span className="font-semibold text-gray-900 tracking-wide">
                            {order.itemName}
                          </span>
                          <span className="text-sm text-gray-600 font-medium">
                            Qty: {order.quantity}
                          </span>
                        </li>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600 font-medium">
                        No delivered orders
                      </p>
                    )}
                  </ul>
                  <button onClick={() => setActiveTab("delivered")} className="mt-6 text-[#bfa85f] font-bold text-sm uppercase tracking-widest hover:underline">View History</button>
                </div> */}
              </section>
            </>
          )}

          {/* Full-width Pending Orders Section */}
          {activeTab === "pending" && (
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <PendingOrders />
            </div>
          )}

          {/* Full-width Order History Section */}
          {activeTab === "delivered" && (
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <OrderHistory />
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default UserProfile;
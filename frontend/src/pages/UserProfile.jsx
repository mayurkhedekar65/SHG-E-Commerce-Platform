import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [pendingOrders,setPendingOrders]=useState([])
  const [deliveredOrders,setDeliveredOrders]=useState([])

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
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#F5C469] shadow-xl hidden md:flex flex-col">
          <div className="p-6 border-b border-yellow-400">
            <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
            <p className="text-xs text-gray-700">Member Panel</p>
          </div>

          <nav className="flex-1 p-4 space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-white shadow font-semibold text-gray-800">
              Profile
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/70 font-medium text-gray-800">
              Pending Orders
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/70 font-medium text-gray-800">
              Delivered Orders
            </button>

            <button
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/70 font-medium text-gray-800"
              onClick={logout}
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {profileData?.customer_name || "User"}
            </h1>
            <p className="text-sm text-gray-500">
              Manage your profile and orders
            </p>
          </div>

          {/* Profile Panel */}
          <div className="bg-[#F5C469] rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Profile Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Name", value: profileData?.customer_name },
                { label: "Email", value: profileData?.customer_email },
                { label: "Contact Number", value: profileData?.phone_number },
                { label: "Address", value: profileData?.address },
              ].map((item, index) => (
                <div key={index}>
                  <p className="text-xs uppercase font-semibold text-gray-700 mb-1">
                    {item.label}
                  </p>
                  <div className="bg-white rounded-xl px-4 py-3 font-medium text-gray-800 shadow">
                    {item.value || "Not Available"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Orders Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pending Orders */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Pending Orders
                </h3>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                  Pending
                </span>
              </div>

              <ul className="space-y-3">
                {pendingOrders?.length ? (
                  pendingOrders.map((order, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-100 rounded-lg p-3"
                    >
                      <span className="font-medium text-gray-700">
                        {order.itemName}
                      </span>
                      <span className="text-sm text-gray-500">
                        Qty: {order.quantity}
                      </span>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No pending orders</p>
                )}
              </ul>
            </div>

            {/* { Delivered Orders } */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Delivered Orders
                </h3>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                  Delivered
                </span>
              </div>

              <ul className="space-y-3">
                {deliveredOrders?.length ? (
                  deliveredOrders.map((order, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-100 rounded-lg p-3"
                    >
                      <span className="font-medium text-gray-700">
                        {order.itemName}
                      </span>
                      <span className="text-sm text-gray-500">
                        Qty: {order.quantity}
                      </span>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No delivered orders</p>
                )}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserProfile;

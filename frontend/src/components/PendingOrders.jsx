import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faClock, faTruck, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        // Replace with your actual endpoint for pending orders
        const response = await axios.get("http://127.0.0.1:8000/userform/pending_orders/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingOrders();
  }, [token]);

  if (loading) return <div className="p-10 text-center italic text-gray-500">Loading your orders...</div>;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <h2 className="text-3xl font-black text-[#111827] mb-2">Pending Orders</h2>
        <p className="text-gray-500">Track your items currently in process or transit.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-20 rounded-[2rem] text-center border border-dashed border-gray-200">
          <FontAwesomeIcon icon={faBox} className="text-gray-200 text-6xl mb-4" />
          <p className="text-gray-400 font-medium">No pending orders found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={order.id}
              className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Order Meta Header */}
              <div className="bg-[#111827] p-5 text-white flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-6 items-center">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Order ID</p>
                    <p className="font-mono text-[#F5C469]">#{order.order_id || 'SHG-8821'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Placed On</p>
                    <p className="text-sm">{order.date || 'Oct 24, 2023'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#F5C469]/10 px-4 py-2 rounded-full border border-[#F5C469]/30">
                  <div className="w-2 h-2 bg-[#F5C469] rounded-full animate-pulse"></div>
                  <span className="text-[#F5C469] text-xs font-black uppercase tracking-widest">Processing</span>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Product Thumbnails */}
                  <div className="flex -space-x-4">
                    {order.items?.map((item, i) => (
                      <div key={i} className="w-16 h-16 rounded-xl border-2 border-white overflow-hidden bg-gray-50 shadow-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="flex-1">
                    <p className="font-bold text-[#111827]">
                      {order.items?.length} Items: {order.items?.[0]?.name} {order.items?.length > 1 && '...'}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} className="text-[#F5C469]" /> Est: 3-4 Days
                      </span>
                      <span className="flex items-center gap-1 font-bold text-[#111827]">
                        Total: <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" /> {order.total_amount?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="px-6 py-3 border-2 border-[#111827] text-[#111827] rounded-xl font-bold hover:bg-[#111827] hover:text-white transition-all text-xs uppercase tracking-widest">
                    Track Details
                  </button>
                </div>

                {/* Tracking Progress Bar */}
                <div className="mt-8 pt-6 border-t border-gray-50">
                  <div className="relative flex justify-between">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
                    <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-[#F5C469] -translate-y-1/2 z-0"></div>
                    
                    {[faBox, faClock, faTruck].map((icon, i) => (
                      <div key={i} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 ${i === 0 ? 'bg-[#F5C469] border-[#F5C469] text-[#111827]' : 'bg-white border-gray-100 text-gray-300'}`}>
                        <FontAwesomeIcon icon={icon} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingOrders;
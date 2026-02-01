import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faDownload, faStar, faBagShopping, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const OrderHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Replace with your actual endpoint for delivered/completed orders
        const response = await axios.get("http://127.0.0.1:8000/userform/order_history/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching order history", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [token]);

  if (loading) return <div className="p-10 text-center italic text-gray-500">Loading your history...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Section Header */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Order History</h2>
          <p className="text-gray-500 mt-1">Review your past purchases and SHG contributions.</p>
        </div>
        <div className="hidden md:block">
          <FontAwesomeIcon icon={faBagShopping} className="text-gray-100 text-5xl" />
        </div>
      </div>

      {history.length === 0 ? (
        <div className="bg-white p-20 rounded-[2.5rem] text-center border border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">No completed orders found in your history.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {history.map((order, index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={order.id}
              className="bg-white rounded-[2.5rem] shadow-md border border-gray-50 overflow-hidden group hover:shadow-xl transition-all"
            >
              {/* Top Meta Bar */}
              <div className="bg-gray-900 px-8 py-4 flex justify-between items-center text-white">
                <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
                  <span>Ordered: {order.date || "Jan 12, 2026"}</span>
                  <span className="text-[#bfa85f]">ID: #{order.order_id || "SHG-9921"}</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <FontAwesomeIcon icon={faCircleCheck} size="sm" />
                  <span className="text-[10px] font-black uppercase">Delivered</span>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-8 flex flex-col lg:flex-row items-center gap-10">
                {/* Product Preview */}
                <div className="w-24 h-24 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                  <img src={order.image || "https://via.placeholder.com/150"} alt="Product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Info */}
                <div className="flex-1 text-center lg:text-left">
                  <h4 className="text-xl font-black text-gray-900">{order.itemName || "Handcrafted Jute Bag"}</h4>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><FontAwesomeIcon icon={faCalendarAlt} className="text-[#bfa85f]" /> Delivered on Feb 01</span>
                    <span className="font-bold text-gray-900">Total: ₹{order.price?.toLocaleString() || "450"}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <button className="flex-1 px-6 py-3 bg-gray-50 text-gray-900 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#bfa85f] hover:text-gray-900 transition-all flex items-center justify-center gap-2 border border-gray-100">
                    <FontAwesomeIcon icon={faDownload} /> Invoice
                  </button>
                  <button className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#bfa85f] hover:text-gray-900 transition-all flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faStar} /> Rate
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
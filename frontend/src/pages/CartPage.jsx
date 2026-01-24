import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus, faArrowLeft, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data.cart_items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      alert("Please login to view your cart");
      navigate("/signup");
    } else {
      fetchCart();
    }
  }, [token]);

  const updateQuantity = async (productId, currentQty, delta) => {
    if (currentQty + delta < 1) return;
    try {
      await axios.post(
        "http://127.0.0.1:8000/cart/add_to_cart/",
        { product_id: productId, quantity: delta },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (error) {
      alert("Failed to update quantity");
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/cart/remove/${productId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (error) {
      alert("Failed to remove item");
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.product.Amount * item.quantity), 0);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFDFD]">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#F5C469] border-t-transparent rounded-full mb-4"
        />
        <p className="text-[#333333] font-medium tracking-widest uppercase text-sm">Refining your selection...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#F9F9F9] px-6 md:px-16 lg:px-24">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <button 
              onClick={() => navigate("/")}
              className="group flex items-center gap-2 text-gray-400 hover:text-[#333333] transition-all mb-4 text-sm font-bold uppercase tracking-widest"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Bazaar
            </button>
            <h1 className="text-4xl md:text-5xl font-black text-[#333333] tracking-tighter">
              Your Bag <span className="text-[#F5C469] text-2xl ml-2">({cartItems.length} items)</span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* CART LIST */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="popLayout">
              {cartItems.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-20 rounded-3xl shadow-sm text-center border border-gray-100 flex flex-col items-center"
                >
                  <FontAwesomeIcon icon={faBagShopping} className="text-gray-100 text-8xl mb-6" />
                  <p className="text-gray-500 text-xl font-light italic">"A journey of a thousand miles begins with a single artisanal product."</p>
                  <button 
                    onClick={() => navigate("/")}
                    className="mt-8 px-10 py-4 bg-[#333333] text-white rounded-full font-bold hover:bg-[#F5C469] hover:text-[#333333] transition-all"
                  >
                    Start Exploring
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      key={item.id} 
                      className="group bg-white p-6 rounded-4xl shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col sm:flex-row items-center gap-8 border border-gray-50 relative overflow-hidden"
                    >
                      {/* Product Image */}
                      <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-2xl bg-gray-50">
                        <img 
                          src={`http://127.0.0.1:8000/media/${item.product.image}`} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          alt={item.product.ProductName}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between h-full py-2">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-2xl text-[#333333] leading-tight mb-1">{item.product.ProductName}</h3>
                            <button 
                              onClick={() => removeItem(item.product.id)}
                              className="text-gray-300 hover:text-red-500 transition-colors p-2"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                          <p className="text-[#F5C469] font-bold text-lg mb-4">₹{item.product.Amount}</p>
                        </div>
                        
                        {/* Controls */}
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-6 bg-[#F9F9F9] px-6 py-3 rounded-2xl border border-gray-100">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity, -1)} 
                              className="text-gray-400 hover:text-[#333333] transition-colors"
                            >
                              <FontAwesomeIcon icon={faMinus} size="sm" />
                            </button>
                            <span className="font-black text-[#333333] text-lg w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity, 1)} 
                              className="text-gray-400 hover:text-[#F5C469] transition-colors"
                            >
                              <FontAwesomeIcon icon={faPlus} size="sm" />
                            </button>
                          </div>
                          <p className="hidden md:block text-[#333333] font-black text-xl">
                            ₹{(item.product.Amount * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* SUMMARY SECTION */}
          <div className="lg:col-span-4">
            <div className="bg-[#333333] text-white p-10 rounded-[2.5rem] shadow-2xl sticky top-36 overflow-hidden border border-[#444444]">
              {/* Subtle Background Pattern Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5C469] opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              
              <h2 className="text-3xl font-black mb-8 tracking-tighter italic">Order <span className="text-[#F5C469]">Details</span></h2>
              
              <div className="space-y-6 text-base font-medium">
                <div className="flex justify-between items-center text-gray-400">
                  <span>Cart Subtotal</span>
                  <span className="text-white">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Standard Shipping</span>
                  <span className="text-green-400 font-bold uppercase text-xs tracking-widest bg-green-400/10 px-3 py-1 rounded-full">Free</span>
                </div>
                
                <div className="pt-8 mt-4 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-black tracking-[0.2em] mb-1">Total Payable</p>
                    <p className="text-4xl font-black text-[#F5C469]">₹{totalPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <button className="group w-full mt-10 bg-[#F5C469] text-[#333333] font-black py-5 rounded-2xl hover:bg-white transition-all transform active:scale-[0.98] uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3">
                Secure Checkout
                <FontAwesomeIcon icon={faArrowLeft} className="rotate-180 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <p className="text-center mt-6 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                🔒 100% Secure Payments Powered by SHG Bazaar
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartPage;
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { motion } from "motion/react";
import axios from "axios";
import ProductViewCard from "./ProductViewCard";
/*
  NEW PROP:
  onRequireLogin → function passed from parent to open login popup
*/
const ProductCard = ({
  image,
  ProductName,
  Amount,
  Quantity,
  productId,
  onRequireLogin,
}) => {
  const product = {
    name: ProductName,
    price: Amount,
    unit: Quantity,
    image: image, // replace with your image
    description:
      "Fresh and premium quality ground nuts, perfect for daily cooking and snacks.",
  };
  const [open, setOpen] = useState(false);
  const handleAddToCart = async () => {
    setOpen(false);
    const token = localStorage.getItem("access_token");

    // 🔴 USER NOT LOGGED IN (no token at all)
    if (!token) {
      onRequireLogin(); // open login popup
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/cart/add_to_cart/",
        {
          product_id: productId,
          quantity: 1,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(response.data.message || "Product added to cart successfully!");
    } catch (error) {
      // 🔴 TOKEN EXPIRED / INVALID
      if (error.response?.status === 401) {
        onRequireLogin(); // open login popup
      }
      // 🔴 BACKEND MESSAGE
      else if (error.response?.data?.message) {
        console.log("Sending productId:", productId);

        alert(error.response.data.message);
      }
      // 🔴 UNKNOWN ERROR
      else {
        alert("Failed to add product to cart");
      }
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-72"
      >
        <div className="flex flex-col h-full bg-[#2F2F2F] rounded-2xl overflow-hidden">
          {/* IMAGE */}
          <div className="h-44 bg-white">
            <img
              src={`http://127.0.0.1:8000/media/${image}`}
              alt={ProductName}
              className="w-full h-full object-contain p-4"
            />
          </div>

          {/* CONTENT */}
          <div className="p-4 flex-1 text-left">
            <h3 className="text-white font-semibold text-base leading-tight">
              {ProductName}
            </h3>

            <p className="mt-3 text-sm text-gray-400">{Quantity} ml</p>

            <div className="mt-4 text-2xl font-bold text-[#F5C469]">
              ₹{Amount}
            </div>
          </div>

          {/* ACTION */}
          <div className="p-4 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#F5C469] text-[#2F2F2F] font-bold py-3 rounded-xl"
            >
              Add to Cart
            </button>

            <button
              onClick={() => setOpen(true)}
              className="mt-4 w-full border border-[#F5C469] text-[#F5C469] font-semibold py-2.5 rounded-xl bg-transparent hover:bg-[#F5C469]/10 transition "
            >
              View Product
            </button>
          </div>
        </div>
      </motion.div>

      <ProductViewCard
        isOpen={open}
        product={product}
        addToCart={handleAddToCart}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default ProductCard;

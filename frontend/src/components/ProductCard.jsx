import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { motion } from "motion/react";

const ProductCard = ({ image, ProductName, Amount, Quantity }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full sm:w-72"
    >
      <div className="flex flex-col justify-between h-full bg-[#F5F5F5] rounded-2xl shadow-lg border-2 border-[#F5C469] overflow-hidden">
        <div className="h-48 overflow-hidden rounded-t-2xl border-b-2 border-[#F5C469]">
          <img
            src={`http://127.0.0.1:8000/media/${image}`}
            alt={ProductName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-4 text-left">
          <h3 className="font-bold text-xl text-[#333333] truncate">
            {ProductName}
          </h3>
          <p className="mt-2 text-md text-[#333333]">
            <span className="font-semibold">₹{Amount}</span> / {Quantity}ml
          </p>
        </div>

        <div className="px-4 pb-4 flex justify-center">
          <button className="flex items-center justify-center gap-2 w-full bg-[#333333] text-[#F5C469] font-bold py-3 rounded-xl hover:bg-[#444444] transition">
            <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
            WhatsApp Order
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

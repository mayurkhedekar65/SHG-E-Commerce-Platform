import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { motion } from "motion/react";

const ProductCard = ({
  image,
  ProductName,
  // GroupName,
  Amount,
  Quantity,
  // Location,
}) => {
  return (
    <>
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
        <div className="flex flex-col justify-between h-full bg-[#dddddd] rounded-lg text-center w-75 pb-5 shadow-2xl text-[#333333] border border-[#F5C469]">
          <div>
            <img
              className="rounded-t-lg border-b border-[#F5C469]"
              src={`http://127.0.0.1:8000/media/${image}`}
              alt="not available"
            />
          </div>
          <div className="text-left pl-5">
            <h3 className="mt-2 font-bold text-lg">{ProductName}</h3>
            {/* <p className="mt-2">{GroupName}</p> */}
            <p className="mt-2 md:text-lg text-[15px]">
              <span className="font-bold">₹{Amount}</span>/{Quantity}ml
            </p>
            {/* <p className="mt-2">
              <FontAwesomeIcon className="mr-1" icon={faLocationDot} />
              {Location}
            </p> */}
          </div>
          <div className="mt-4 flex justify-center items-center">
            <button className="border border-[#F5C469] capitalize bg-[#333333] py-3 px-9 rounded-lg text-[#F5C469] font-bold flex justify-center items-center ">
              <FontAwesomeIcon className="mr-2 text-2xl" icon={faWhatsapp} />{" "}
              whatapp order
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default ProductCard;

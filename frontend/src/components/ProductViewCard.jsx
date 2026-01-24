import React from "react";

const ProductViewCard = ({ isOpen, onClose, product,addToCart }) => {
  if (!isOpen) return null;

  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center">

  {/* Backdrop */}
  <div
    className="absolute inset-0 bg-black/60"
    onClick={onClose}
  />

  {/* Modal */}
  <div className="relative z-10 w-[92%] max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl">

    {/* Close */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
    >
      ✕
    </button>

    <div className="flex flex-col md:flex-row">

      {/* IMAGE */}
      <div className="md:w-1/2 bg-[#F3F3F3] flex items-center justify-center p-6">
        <img
          src={`http://127.0.0.1:8000/media/${product.image}`}
          alt={product.name}
          className="max-h-[420px] object-contain"
        />
      </div>

      {/* DETAILS */}
      <div className="md:w-1/2 p-8 flex flex-col">

        <h2 className="text-2xl font-semibold text-[#2F2F2F]">
          {product.name}
        </h2>

        <p className="mt-4 text-gray-600 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-6">
          <span className="text-3xl font-bold text-[#F5C469]">
            ₹{product.price}
          </span>
          <span className="ml-2 text-gray-500">
            / {product.unit}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="mt-auto pt-8 flex gap-4">

          <button
            onClick={addToCart}
            className="
              flex-1
              bg-[#F5C469]
              text-[#2F2F2F]
              font-bold
              py-3
              rounded-xl
              hover:bg-[#f3b84f]
              transition
            "
          >
            Add to Cart
          </button>

          <button
            onClick={onClose}
            className="
              flex-1
              border
              border-gray-300
              text-gray-600
              py-3
              rounded-xl
              hover:bg-gray-100
              transition
            "
          >
            Close
          </button>

        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default ProductViewCard;

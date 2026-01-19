import React from "react";
import { Edit2, Eye, Trash2 } from "lucide-react";

const AdminProductCard = ({image,price,category,stock, onEdit, onDelete,id }) => {


  const getStatusClass = (s) => {
    switch (s) {
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Out of Stock": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden 
                transition-all duration-300 hover:-translate-y-1 hover:shadow-xl 
                w-full max-w-xs">

  {/* Image */}
  <img
    src={`http://127.0.0.1:8000/media/${image}`}
    alt={name}
    className="w-full h-48 object-cover bg-gray-100"
    onError={(e) =>
      (e.target.src =
        "https://placehold.co/600x400/F5C469/333?text=Image+Unavailable")
    }
  />

  {/* Content */}
  <div className="p-5">

    {/* Status & Stock */}
    <div className="flex justify-between items-center mb-3">
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full 
        ${getStatusClass(status)}`}
      >
        {status}
      </span>

      <span className="text-xs text-gray-500">
        Stock: <span className="font-semibold">{stock}</span>
      </span>
    </div>

    {/* Title */}
    <h3 className="text-lg font-bold text-[#333333] truncate mb-1">
      {name}
    </h3>

    {/* Category */}
    <p className="text-sm text-gray-500 mb-2">
      {category}
    </p>

    {/* Price */}
    <p className="text-xl font-bold text-[#333333] mb-4">
      ₹{parseFloat(price).toFixed(2)}
    </p>

    {/* Actions */}
    <div className="grid grid-cols-3 gap-2">

      <button
        onClick={() => onEdit && onEdit(productInfo)}
        className="flex items-center justify-center gap-2 px-3 py-2
                   text-sm font-semibold rounded-lg
                   bg-[#42a6f8] text-white
                   hover:bg-blue-500 transition"
      >
        <Edit2 size={16} />
        Edit
      </button>

      <button
        className="flex items-center justify-center gap-2 px-3 py-2
                   text-sm font-semibold rounded-lg
                   bg-[#333333] text-[#dddddd]
                   hover:bg-zinc-700 transition"
      >
        <Eye size={16} />
        View
      </button>

      <button
        onClick={onDelete}
        className="flex items-center justify-center gap-2 px-3 py-2
                   text-sm font-semibold rounded-lg
                   bg-red-500 text-white
                   hover:bg-red-600 transition"
      >
        <Trash2 size={16} />
        Delete
      </button>

    </div>
  </div>
</div>

  );
};

export default AdminProductCard;

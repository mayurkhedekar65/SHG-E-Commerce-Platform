import React from "react";
import { Edit2, Eye, Trash2 } from "lucide-react";

const AdminProductCard = ({ productInfo = {}, onEdit, onDelete }) => {
  const {
    id = null,
    image = "https://placehold.co/600x400/FBBF24/333?text=No+Image",
    name = "No name",
    category = "No category",
    price = 0,
    stock = 0,
    status = "Unknown"
  } = productInfo || {};

  const getStatusClass = (s) => {
    switch (s) {
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Out of Stock": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl w-full max-w-xs">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
        onError={(e) =>
          (e.target.src =
            "https://placehold.co/600x400/FBBF24/333?text=Image+Error")
        }
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getStatusClass(
              status
            )}`}
          >
            {status}
          </span>
          <span className="text-sm text-zinc-600">Stock: {stock}</span>
        </div>

        <h3 className="text-xl font-bold text-zinc-900 truncate ">{name}</h3>
        <p className="text-sm text-zinc-600 mb-2">{category}</p>
        <p className="text-lg font-semibold text-zinc-900 mb-4">
          ₹{parseFloat(price).toFixed(2)}
        </p>

        <div className="flex justify-between gap-2">
          <button
            onClick={() => onEdit && onEdit(productInfo)}
            className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
          >
            <Edit2 size={16} /> Edit
          </button>

          <button className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 bg-zinc-600 text-white text-sm font-medium rounded-md hover:bg-zinc-700">
            <Eye size={16} /> View
          </button>

          <button
            onClick={() => onDelete && onDelete(id)}
            className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;

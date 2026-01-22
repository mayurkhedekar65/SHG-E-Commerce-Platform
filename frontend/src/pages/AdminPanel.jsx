import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminProductCard from "../components/AdminProductCard";
import AddProductForm from "../components/AddProductForm.jsx";
import GroupProfile from "./GroupProfile.jsx"

const AdminPanel = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // NEW STATE
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/get_group_products/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      setProductList(res.data.products_list);
    } catch {
      console.error("Products not found");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.post(`http://127.0.0.1:8000/delete_product/${id}/`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        alert("Product deleted successfully");
        fetchProducts();
      } catch {
        alert("Delete failed");
      }
    }
  };

  const logOut = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div className="bg-[#dddddd] min-h-screen">
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-[#333333] shadow-2xl p-6">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#F5C469]">SHG Admin</h2>
        </div>
        <ul className="space-y-2 text-sm font-medium">
          {[{ key: "dashboard", label: "Dashboard" }, { key: "profile", label: "Profile" }].map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveSection(item.key)}
                className={`w-full px-4 py-3 rounded-xl text-left transition ${activeSection === item.key ? "bg-[#F5C469] text-[#333333]" : "text-[#dddddd] hover:bg-[#F5C469] hover:text-[#333333]"}`}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <button onClick={logOut} className="w-full px-4 py-3 rounded-xl text-left text-red-300 hover:bg-red-500 hover:text-white transition">Logout</button>
          </li>
        </ul>
      </aside>

      <main className="ml-64 p-6 min-h-screen">
        {activeSection === "dashboard" && (
          <>
            <div className="bg-white rounded-2xl shadow p-6 mb-6 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-[#333333]">Admin Dashboard</h1>
              <button onClick={() => setIsModalOpen(true)} className="bg-[#F5C469] text-[#333333] font-semibold px-6 py-2.5 rounded-xl shadow">
                Add Product
              </button>
            </div>

            {isLoading ? <p>Loading...</p> : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productList.map((product) => (
                  <AdminProductCard
                    key={product.id}
                    {...product}
                    productInfo={product}
                    onDelete={() => handleDelete(product.id)}
                    onEdit={() => handleEdit(product)}
                  />
                ))}
              </div>
            )}
          </>
        )}
        {activeSection === "profile" && <GroupProfile />}
      </main>

      {isModalOpen && (
        <AddProductForm
          isOpen={isModalOpen}
          initialData={editingProduct}
          onClose={handleCloseModal}
          onSubmit={fetchProducts}
        />
      )}
    </div>
  );
};

// ... keep SHGProfilePanel as it was ...
export default AdminPanel;
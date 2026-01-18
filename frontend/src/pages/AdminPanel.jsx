import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminProductCard from "../components/AdminProductCard";
import AddProductForm from "../components/addproductform.jsx";

const AdminPanel = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/get_products/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setProductList(res.data.products_list);
      } catch {
        console.error("Products not found");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const logOut = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div className="bg-[#dddddd] min-h-screen">
      {/* ================= FIXED SIDEBAR ================= */}
      <aside
        className="fixed top-0 left-0 z-40 w-64 h-screen
                   bg-[#333333] shadow-2xl p-6"
      >
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#F5C469]">SHG Admin</h2>
          <p className="text-xs text-gray-400">Management Dashboard</p>
        </div>

        <ul className="space-y-2 text-sm font-medium">
          {[
            { key: "dashboard", label: "Dashboard" },
            { key: "profile", label: "Profile" },
          ].map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveSection(item.key)}
                className={`w-full px-4 py-3 rounded-xl text-left transition
                  ${
                    activeSection === item.key
                      ? "bg-[#F5C469] text-[#333333]"
                      : "text-[#dddddd] hover:bg-[#F5C469] hover:text-[#333333]"
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}

          <div className="border-t border-gray-600 my-4" />

          <li>
            <button
              onClick={logOut}
              className="w-full px-4 py-3 rounded-xl text-left
                         text-red-300 hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="ml-64 p-6 min-h-screen overflow-y-auto">
        {activeSection === "dashboard" && (
          <>
            <div className="bg-white rounded-2xl shadow p-6 mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-[#333333]">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Manage products & inventory
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#F5C469] text-[#333333]
                           font-semibold px-6 py-2.5
                           rounded-xl shadow"
              >
                Add Product
              </button>
            </div>

            {isLoading ? (
              <p className="text-gray-600">Loading products...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productList.map((product) => (
                  <AdminProductCard
                    key={product.id}
                    image={product.image}
                    price={product.price}
                    category={product.category}
                    stock={product.stock_quantity}
                    status={product.status}
                    id={product.id}
                    onDelete={handleDelete}
                    productInfo={product}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeSection === "profile" && <SHGProfilePanel />}
      </main>

      {isModalOpen && (
        <AddProductForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminPanel;

/* ================= PROFILE PANEL ================= */

const SHGProfilePanel = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/get_grp_profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => setProfileData(res.data.shg_grp_details[0]));
  }, []);

  return (
    <>
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-3xl font-bold text-[#333333]">SHG Profile</h2>
        <p className="text-sm text-gray-500">Self Help Group information</p>
      </div>

      <div className="bg-[#F5C469] rounded-2xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["SHG Name", profileData.name_of_shg],
            ["Registration Number", profileData.registration_number],
            ["Contact Number", profileData.contact_number],
            ["Village", profileData.village],
            ["District", profileData.district],
            ["Type of SHG", profileData.type_of_shg],
            ["Date of Formation", profileData.date_of_formation],
          ].map(([label, value], index) => (
            <div key={index}>
              <p className="text-xs font-semibold uppercase text-gray-700 mb-1">
                {label}
              </p>
              <div className="bg-white rounded-xl px-4 py-3 font-medium text-[#333333]">
                {value || "Not Available"}
              </div>
            </div>
          ))}

          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase text-gray-700 mb-1">
              Address
            </p>
            <div className="bg-white rounded-xl px-4 py-3 font-medium text-[#333333]">
              {profileData.address || "Not Available"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

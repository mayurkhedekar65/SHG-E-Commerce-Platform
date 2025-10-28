import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import all your pages
import Home from "./pages/Home";
import RegistrationForm from "./pages/RegistrationForm";
import ShgGroups from "./pages/ShgGroups";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

// Import components
import AdminProductCard from "./components/AdminProductCard";

export default function App() {
  const [count, setCount] = useState(0);

  // Example product for AdminProductCard demo
  const product = {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1999,
    stock: 12,
    status: "Active",
    image: "https://placehold.co/600x400/87CEEB/000?text=Headphones",
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrationform" element={<RegistrationForm />} />
        <Route path="/shggroups" element={<ShgGroups />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Admin Product Demo Route */}
        <Route
          path="/adminproduct"
          element={
            <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
              <AdminProductCard
                productInfo={product}
                onEdit={() => alert("Edit clicked")}
                onDelete={() => alert("Delete clicked")}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

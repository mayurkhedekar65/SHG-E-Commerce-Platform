import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ContainerLoader from "../components/ContainerLoader";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import axios from "axios";
import SigninPopup from "../components/SigninPopup";
import SignupPopup from "../components/SignupPopup"; // ✅ NEW

const Products = () => {
  const [Product, setProduct] = useState([]);
  const [loader, showLoader] = useState(true);
  const [loading, setLoading] = useState(false);

  // 🔹 popup states
  const [showSigninPopup, setShowSigninPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => showLoader(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/get_products/");
        setProduct(response.data.products_list);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // 🔁 FULL PAGE REFRESH AFTER LOGIN / SIGNUP
  const handleAuthSuccess = () => {
    setShowSigninPopup(false);
    setShowSignupPopup(false);
    window.location.reload(); // ✅ THIS IS WHAT YOU ASKED
  };

  return (
    <>
      {/* 🔐 SIGNIN POPUP */}
      {showSigninPopup && (
        <SigninPopup
          onClose={() => setShowSigninPopup(false)}
          onSuccess={handleAuthSuccess}
          openSignup={() => {
            setShowSigninPopup(false);
            setShowSignupPopup(true);
          }}
        />
      )}

      {/* 🆕 SIGNUP POPUP */}
      {showSignupPopup && (
        <SignupPopup
          onClose={() => setShowSignupPopup(false)}
          onSuccess={handleAuthSuccess}
          openSignin={() => {
            setShowSignupPopup(false);
            setShowSigninPopup(true);
          }}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Navbar />

          <section className="py-35 bg-[#dddddd] min-h-screen">
            {!loader && (
              <h2 className="text-center text-3xl font-bold text-[#333333]">
                Products
              </h2>
            )}

            {loader && <ContainerLoader />}

            {!loader && (
              <div className="grid grid-cols-1 md:grid-cols-4 md:mx-20 gap-y-8 pt-10">
                {Product.map((item) => (
                  <ProductCard
                    key={item.id}
                    image={item.image}
                    ProductName={item.product_name}
                    Amount={item.price}
                    Quantity={item.stock_quantity}
                    productId={item.id}
                    onRequireLogin={() => setShowSigninPopup(true)}
                  />
                ))}
              </div>
            )}
          </section>

          <Footer setLoading={setLoading} />
        </motion.div>
      )}
    </>
  );
};

export default Products;

import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import ContainerLoader from "../components/ContainerLoader";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const Products = () => {
  const [Product, setProduct] = useState([]);
  const [loader, showLoader] = useState(true);
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    showLoader(false);
  }, 3500);

  useEffect(() => {
    try {
      fetch("http://127.0.0.1:8000/products/")
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => console.error("Error:", error));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            <Navbar></Navbar>
            <section className=" py-35 bg-[#dddddd] min-h-screen">
              {!loader && (
                <div className="text-center">
                  <h2 className="font-bold text-[#333333] font-sans text-2xl md:text-3xl ">
                    Products
                  </h2>
                </div>
              )}
              {loader && <ContainerLoader />}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 6 }}
              >
                {!loader && (
                  <div className="grid grid-cols-1 md:grid-cols-4 md:mx-20 place-items-center items-stretch gap-y-8 md:gap-x-0 text-center pt-10">
                    {Product.map((item, index) => (
                      <ProductCard
                        key={index}
                        ProductName={item["ProductName"]}
                        GroupName={item["GroupName"]}
                        Amount={item["Amount"]}
                        Quantity={item["Quantity"]}
                        Location={item["Location"]}
                      ></ProductCard>
                    ))}
                  </div>
                )}
              </motion.div>
            </section>
            <Footer setLoading={setLoading} />
          </motion.div>
        </>
      )}
    </>
  );
};
export default Products;

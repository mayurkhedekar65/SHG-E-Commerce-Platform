import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import ContainerLoader from "../components/ContainerLoader";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import axios from "axios";
const Products = () => {
  const [Product, setProduct] = useState([]);
  const [loader, showLoader] = useState(true);
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    showLoader(false);
  }, 3500);

  useEffect(() => {
    const fetchData=async()=>{
    try {
     const response=await axios.get("http://127.0.0.1:8000/get_products/")
          setProduct(response.data["products_list"]);
    } catch{
      console.error("products not available..");
    }
  }
fetchData()
  }, [setProduct]);

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
                        image={item["image"]}
                        ProductName={item["product_name"]}
                        // GroupName={item["GroupName"]}
                        Amount={item["price"]}
                        Quantity={item["stock_quantity"]}
                        // Location={item["Location"]}
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

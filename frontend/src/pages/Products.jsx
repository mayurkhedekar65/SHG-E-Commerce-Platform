import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const Products = () => {
  return (
    <>
      <Navbar></Navbar>
      <section className=" py-35 bg-[#dddddd]">
        <div className="text-center">
          <h2 className="font-bold text-[#333333] font-sans text-2xl md:text-3xl ">
            Products
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 text-center pt-10">
          <ProductCard
            ProductName={"Premium Coconut Oil"}
            GroupName={"by Mapusa Women's Collective"}
            Amount={"350"}
            Quantity={"500"}
            Location={"Mapusa, Bardez"}
          ></ProductCard>
          <ProductCard
            ProductName={"Handwoven Table Runner"}
            GroupName={"by Ponda Craft Circle"}
            Amount={"800"}
            Quantity={"500"}
            Location={"Ponda, Central Goa"}
          ></ProductCard>
          <ProductCard
            ProductName={"Artisanal Cashew Feni"}
            GroupName={"by Bicholim Distillers Group"}
            Amount={"1,200"}
            Quantity={"750"}
            Location={"Bicholim, North Goa"}
          ></ProductCard>
          <ProductCard
            ProductName={"Ceramic Dinner Set"}
            GroupName={"by Margao Pottery Collective"}
            Amount={"2,500"}
            Quantity={"500"}
            Location={"Margao, Salcete"}
          ></ProductCard>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};
export default Products;

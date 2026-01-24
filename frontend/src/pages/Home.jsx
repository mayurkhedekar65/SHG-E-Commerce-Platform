import React, { useState } from "react";
import Navbar from "../components/NavBar";
import MainSection from "../components/MainSection";
import ShopCategoryCard from "../components/ShopCategoryCard";
import ProductCard from "../components/ProductCard";
import GroupCard from "../components/GroupCard";
import ImpactCard from "../components/ImpactCard";
import ProcessCard from "../components/ProcessCard";
import Footer from "../components/Footer";
import BottomButtonSection from "../components/BottomButtonSection";
import { motion } from "framer-motion";

import {
  faUtensils,
  faPalette,
  faShirt,
  faLeaf,
  faHouse,
  faGift,
  faUser,
  faBox,
  faHeart,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import image from "../assets/ChatGPT Image Oct 22, 2025, 06_20_44 PM.png";
import Loader from "../components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(false);
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
            <MainSection setLoading={setLoading} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4 }}
          >
            <section className="text-center py-14 bg-[#dddddd]">
              <div>
                <h2 className="font-bold text-[#333333] font-sans text-2xl md:text-3xl ">
                  Shop by Category
                </h2>
                <p className="text-[#333333] md:text-[17px] mt-4">
                  Explore authentic Goan products crafted with love by local
                  Self Help Groups
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-5 justify-center items-center md:gap-12 text-center pt-10">
                <ShopCategoryCard
                  Logo={faUtensils}
                  CategoryType={"Food & Beverages"}
                ></ShopCategoryCard>
                <ShopCategoryCard
                  Logo={faPalette}
                  CategoryType={"Handicrafts"}
                ></ShopCategoryCard>
                <ShopCategoryCard
                  Logo={faShirt}
                  CategoryType={"Textiless"}
                ></ShopCategoryCard>
                <ShopCategoryCard
                  Logo={faLeaf}
                  CategoryType={"Wellness"}
                ></ShopCategoryCard>
                <ShopCategoryCard
                  Logo={faHouse}
                  CategoryType={"Home Decor"}
                ></ShopCategoryCard>
                <ShopCategoryCard
                  Logo={faGift}
                  CategoryType={"Gifts"}
                ></ShopCategoryCard>
              </div>
            </section>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            <section className=" py-14 bg-[#333333]">
              <div className="text-center">
                <h2 className="font-bold text-[#F5C469] font-sans text-2xl md:text-3xl ">
                  Featured Products
                </h2>
                <p className="text-[#dddddd] md:text-[17px] mt-2">
                  Handpicked favorites from our local artisans
                </p>
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
            <section className="text-center py-14 bg-[#dddddd]">
              <div>
                <h2 className="font-bold  text-[#333333] font-sans text-2xl md:text-3xl ">
                  Featured SHG Groups
                </h2>
                <p className="  text-[#333333] md:text-[17px] mt-4">
                  Meet the amazing Self Help Groups creating beautiful products
                  across Goa
                </p>
              </div>
              <div className="grid grid-col-1 md:grid-cols-4 place-items-center items-stretch md:mx-20 md:gap-x-4 text-center pt-10">
                <GroupCard
                  GroupName={"Mapusa Women's Collective"}
                  GroupInfo={
                    "Specializing in organic food products and traditional preserves since 2018"
                  }
                  Location={"Mapusa, Bardez"}
                  TotalProducts={"24"}
                  TotalGroupMembers={"15"}
                  Logo={image}
                ></GroupCard>
                <GroupCard
                  GroupName={"Ponda Craft Circle"}
                  GroupInfo={
                    "Master weavers creating beautiful textiles and home decor items"
                  }
                  Location={"Ponda, Central Goa"}
                  TotalProducts={"18"}
                  TotalGroupMembers={"12"}
                  Logo={image}
                ></GroupCard>
                <GroupCard
                  GroupName={"Margao Pottery Collective"}
                  GroupInfo={
                    "Traditional pottery and ceramic art passed down through generations"
                  }
                  Location={"Margao, Salcete"}
                  TotalProducts={"32"}
                  TotalGroupMembers={"20"}
                  Logo={image}
                ></GroupCard>
                <GroupCard
                  GroupName={"Bicholim Spice Masters"}
                  GroupInfo={
                    "Authentic Goan spices and masalas prepared using traditional methods"
                  }
                  Location={"Bicholim, North Goa"}
                  TotalProducts={"28"}
                  TotalGroupMembers={"18"}
                  Logo={image}
                ></GroupCard>
              </div>
            </section>
            <section className="text-center py-14 bg-[#333333]">
              <div>
                <h2 className="font-bold text-[#F5C469] font-sans text-2xl md:text-3xl ">
                  Our Impact
                </h2>
                <p className="text-[#dddddd] md:text-[17px] mt-4">
                  Supporting local communities and preserving traditional crafts
                  across Goa
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 text-center pt-10">
                <ImpactCard
                  TotalNumber={"150"}
                  CardText={"SHG Groups"}
                  Logo={faUser}
                ></ImpactCard>
                <ImpactCard
                  TotalNumber={"2500"}
                  CardText={"Products"}
                  Logo={faBox}
                ></ImpactCard>
                <ImpactCard
                  TotalNumber={"10,000"}
                  CardText={"Happy Customers"}
                  Logo={faHeart}
                ></ImpactCard>
                <ImpactCard
                  TotalNumber={"50L"}
                  CardText={"Revenue Generated"}
                  Logo={faRupeeSign}
                ></ImpactCard>
              </div>
            </section>
            <section className="text-center py-14 bg-[#dddddd]">
              <div>
                <h2 className="font-bold text-[#333333]  font-sans text-2xl md:text-3xl ">
                  How SHG Bazaar Works
                </h2>
                <p className="text-[#333333]  md:text-[17px] px-2 md:px-0 mt-4">
                  Simple steps to discover and purchase authentic Goan products
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8  md:gap-10 text-center pt-10">
                <ProcessCard
                  Number={"1"}
                  Title={"Browse Products"}
                  Description={
                    "Explore our curated collection of authentic Goan products from verified SHG groups"
                  }
                ></ProcessCard>
                <ProcessCard
                  Number={"2"}
                  Title={"Connect via WhatsApp"}
                  Description={
                    "Chat directly with SHG groups through WhatsApp to discuss your requirements"
                  }
                ></ProcessCard>
                <ProcessCard
                  Number={"3"}
                  Title={"Place Your Order"}
                  Description={
                    "Confirm your order details and make payment directly to the SHG group"
                  }
                ></ProcessCard>
                <ProcessCard
                  Number={"4"}
                  Title={"Receive & Enjoy"}
                  Description={
                    "Get your authentic Goan products delivered to your doorstep"
                  }
                ></ProcessCard>
              </div>
            </section>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 5 }}
          >
            <BottomButtonSection setLoading={setLoading} />
            <Footer setLoading={setLoading} />
          </motion.div>
        </>
      )}
    </>
  );
};

export default Home;

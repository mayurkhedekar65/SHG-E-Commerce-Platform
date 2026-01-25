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
                  image={
                    "https://via.placeholder.com/300x200.png?text=Coconut+Oil"
                  }
                  ProductName={"Premium Coconut Oil"}
                  Amount={"350"}
                  Quantity={500}
                  Description={
                    "Cold-pressed coconut oil made by local women's SHG."
                  }
                  Category={"Edible Oil"}
                ></ProductCard>
                <ProductCard
                  image={
                    "https://via.placeholder.com/300x200.png?text=Organic+Honey"
                  }
                  ProductName={"Organic Honey"}
                  Amount={"450"}
                  Quantity={200}
                  Description={
                    "Pure organic honey harvested by the Sunshine Women's SHG."
                  }
                  Category={"Honey & Syrups"}
                ></ProductCard>
                <ProductCard
                  image={
                    "https://via.placeholder.com/300x200.png?text=Handmade+Soap"
                  }
                  ProductName={"Lavender Handmade Soap"}
                  Amount={"150"}
                  Quantity={300}
                  Description={
                    "Natural handmade soap with soothing lavender fragrance."
                  }
                  Category={"Personal Care"}
                ></ProductCard>
                <ProductCard
                  image={
                    "https://via.placeholder.com/300x200.png?text=Handwoven+Bag"
                  }
                  ProductName={"Handwoven Cotton Bag"}
                  Amount={"600"}
                  Quantity={150}
                  Description={
                    "Eco-friendly handwoven cotton bag by Mountain Weavers SHG."
                  }
                  Category={"Textiles & Handicrafts"}
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
              <div className="grid grid-col-1 md:grid-cols-4  items-stretch md:mx-20 md:gap-x-3 text-center pt-10">
                <GroupCard
                  NameOfShg={"Mountain Weavers SHG"}
                  DateOfFormation={"05-06-2019"}
                  RegistrationNumber={"SHG13579XYZ"}
                  ContactNumber={"+91 97654 32109"}
                  Village={"Chorla"}
                  Taluka={"Sattari"}
                  District={"North Goa"}
                  TypeOfShg={"Textiles & Handloom"}
                  Address={
                    "Plot No. 7, Hillview Street, Chorla, Sattari, North Goa"
                  }
                ></GroupCard>
                <GroupCard
                  NameOfShg={"Seaside Artisans SHG"}
                  DateOfFormation={"22-11-2016"}
                  RegistrationNumber={"SHG24680LMN"}
                  ContactNumber={"+91 99887 66554"}
                  Village={"Calangute"}
                  Taluka={"Bardez"}
                  District={"North Goa"}
                  TypeOfShg={"Handicrafts & Art"}
                  Address={
                    "Shop 5, Beach Road, Calangute Village, Bardez, North Goa"
                  }
                ></GroupCard>
                <GroupCard
                  NameOfShg={"Greenfields Farmers SHG"}
                  DateOfFormation={"10-03-2018"}
                  RegistrationNumber={"SHG67890ABC"}
                  ContactNumber={"+91 91234 56789"}
                  Village={"Ponda"}
                  Taluka={"Ponda Taluka"}
                  District={"North Goa"}
                  TypeOfShg={"Agriculture & Farming"}
                  Address={"House No. 12, Market Road, Ponda, North Goa, Goa"}
                ></GroupCard>
                <GroupCard
                  NameOfShg={"Sunshine Women's SHG"}
                  DateOfFormation={"15-08-2015"}
                  RegistrationNumber={"SHG12345XYZ"}
                  ContactNumber={"+91 98765 43210"}
                  Village={"Kudal"}
                  Taluka={"Kudal Taluka"}
                  District={"Sindhudurg"}
                  TypeOfShg={"Women Empowerment"}
                  Address={
                    "Plot No. 24, Main Street, Kudal Village, Sindhudurg, Maharashtra"
                  }
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

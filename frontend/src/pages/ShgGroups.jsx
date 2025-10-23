import React, { useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import GroupCard from "../components/GroupCard";
import image from "../assets/ChatGPT Image Oct 22, 2025, 06_20_44 PM.png";

const ShgGroups = () => {
  return (
    <>
      <Navbar></Navbar>
      <section className="text-center py-35 bg-[#dddddd]">
        <div>
          <h2 className="font-bold  text-[#333333] font-sans text-2xl md:text-3xl ">
            *SHG Groups*
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 text-center pt-10">
          <GroupCard
            GroupName={"Mapusa Women's Collective"}
            GroupInfo={
              "Specializing in organic food products and traditional preserves since 2018"
            }
            Location={"Mapusa, Bardez"}
            TotalProducts={"24 Products"}
            TotalGroupMembers={"15 Members"}
            Logo={image}
          ></GroupCard>
          <GroupCard
            GroupName={"Ponda Craft Circle"}
            GroupInfo={
              "Master weavers creating beautiful textiles and home decor items"
            }
            Location={"Ponda, Central Goa"}
            TotalProducts={"18 Products"}
            TotalGroupMembers={"12 Members"}
            Logo={image}
          ></GroupCard>
          <GroupCard
            GroupName={"Margao Pottery Collective"}
            GroupInfo={
              "Traditional pottery and ceramic art passed down through generations"
            }
            Location={"Margao, Salcete"}
            TotalProducts={"32 Products"}
            TotalGroupMembers={"20 Members"}
            Logo={image}
          ></GroupCard>
          <GroupCard
            GroupName={"Bicholim Spice Masters"}
            GroupInfo={
              "Authentic Goan spices and masalas prepared using traditional methods"
            }
            Location={"Bicholim, North Goa"}
            TotalProducts={"28 Products"}
            TotalGroupMembers={"18 Members"}
            Logo={image}
          ></GroupCard>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};
export default ShgGroups;

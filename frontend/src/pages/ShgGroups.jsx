import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import GroupCard from "../components/GroupCard";
import image from "../assets/ChatGPT Image Oct 22, 2025, 06_20_44 PM.png";
import ContainerLoader from "../components/ContainerLoader";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import axios from "axios";

const ShgGroups = () => {
  const [Groups, setGroups] = useState([]);
  const [loader, showLoader] = useState(true);
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    showLoader(false);
  }, 3500);

  useEffect(() => {
    const fetchData=async()=>{
      try {
      const response=await axios.get("http://127.0.0.1:8000/shggroups/",{
         headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
      })
         setGroups(response.data["shg_groups_list"])
      } 
      catch {
      console.error("groups not available...");
    }
    }
    fetchData()
  }, [setGroups]);
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
            <section className="text-center py-35 bg-[#dddddd] min-h-screen">
              {!loader && (
                <div>
                  <h2 className="font-bold  text-[#333333] font-sans text-2xl md:text-3xl ">
                    SHG Groups
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
                  <div className="grid grid-cols-1 md:grid-cols-4 place-items-center items-stretch gap-y-8 md:gap-x-0 md:mx-20 text-center pt-10">
                    {Groups.map((item, index) => (
                      <GroupCard
                        key={index}
                        GroupName={item["name_of_shg"]}
                        GroupInfo={item["contact_number"]}
                        Location={item["address"]}
                        TotalProducts={item["type_of_shg"]}
                        TotalGroupMembers={item["date_of_formation"]}
                        // Logo={image}
                      ></GroupCard>
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
export default ShgGroups;

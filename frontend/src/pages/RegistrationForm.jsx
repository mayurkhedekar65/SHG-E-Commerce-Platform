import React, { useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import axios from "axios";

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name_of_sng: "",
    date_of_formation: "",
    registration_number: "",
    contact_number: "",
    village: "",
    taluka: "",
    district: "",
    type_of_shg: "",
    Address: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/submit_registration_form/",
        formData
      );
      alert("form submitted");
      setFormData({
        name_of_sng: "",
        date_of_formation: "",
        registration_number: "",
        contact_number: "",
        village: "",
        taluka: "",
        district: "",
        type_of_shg: "",
        Address: "",
      });
    } catch (error) {
      console.error("error in submitting form", error);
      alert("error in submitting form.please tru again");
    }
  };
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
            <div className=" bg-[#dddddd]">
              <div className="text-center pt-35">
                <h1 className="font-bold md:text-3xl text-2xl">
                  SHG Registration Form
                </h1>
              </div>
              <div className="pt-10 pb-30 flex justify-center items-center bg-[#dddddd]">
                <div className="bg-[#F5C469] pt-10 pb-8 md:pt-12 md:pb-10 pr-8 pl-8  md:pr-100 md:pl-100 rounded-2xl max-w-md border border-[#333333] shadow-2xl">
                  <form className="text-center" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row justify-center items-center md:gap-8">
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="name"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Name of SHG*
                          </label>
                        </div>
                        <input
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          type="text"
                          placeholder="eg., Mahalaxmi Mahila SHG"
                          onChange={handleChange}
                          value={formData.name_of_sng}
                          name="name_of_sng"
                        />
                      </div>

                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="name"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Date of Formation*
                          </label>
                        </div>
                        <input
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] text-[#585858]"
                          type="date"
                          onChange={handleChange}
                          value={formData.date_of_formation}
                          name="date_of_formation"
                        />

                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center md:gap-8">
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="name"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Registration Number*
                          </label>
                        </div>
                        <input
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          type="text"
                          placeholder="eg., SHG-GOA-2025-017"
                          onChange={handleChange}
                          value={formData.registration_number}
                          name="registration_number"
                        />
                      </div>
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="text"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Contact Number*
                          </label>
                        </div>
                        <input
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          type="text"
                          placeholder="eg., 9146228061"
                          onChange={handleChange}
                          value={formData.contact_number}
                          name="contact_number"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center md:gap-8">
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="text"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Village / Locality*
                          </label>
                        </div>
                        <input
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          type="text"
                          placeholder="eg., Keri,Panchawadi"
                          onChange={handleChange}
                          value={formData.village}
                          name="village"
                        />
                      </div>
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="text"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Taluka*
                          </label>
                        </div>
                        <input
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          type="text"
                          placeholder="eg., Sattari"
                          onChange={handleChange}
                          value={formData.taluka}
                          name="taluka"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center md:gap-8">
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="text"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            District*
                          </label>
                        </div>
                        <select
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] text-[#585858]"
                          name=""
                          id=""
                          onChange={handleChange}
                          value={formData.district}
                     
                        >
                          <option value="North Goa">North Goa</option>
                          <option value="South Goa">South Goa</option>
                        </select>
                      </div>
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="text"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Type of SHG*
                          </label>
                        </div>
                        <select
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] text-[#585858]"
                          name=""
                          id=""
                          onChange={handleChange}
                          value={formData.type_of_shg}
     
                        >
                          <option value="Women">Women</option>
                          <option value="Men">Men</option>
                          <option value="Mixed">Mixed</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center">
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="message"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                            onChange={handleChange}
                            value={formData.Address}
                            name="Address"
                          >
                            Address of SHG Office*
                          </label>
                        </div>
                        <textarea
                          className="mb-10 w-70 h-30 md:w-2xl md:h-35 p-3 border bg-[#dddddd]  border-[#333333] rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          placeholder="eg., House No. 56, Near Primary School, Keri, Valpoi – 403505"
                        ></textarea>
                      </div>
                      <div></div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center">
                      <button className="hover:bg-[#dddddd] hover:border-[#333333] hover:border  hover:rounded-lg  hover:text-[#333333] bg-accent bg-[#333333] text-[#F5C469] font-semibold capitalize border pt-2 pb-2 md:px-77 px-28 rounded-xl md:text-[17px] text-[17px]">
                        submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <Footer setLoading={setLoading} />
          </motion.div>
        </>
      )}
    </>
  );
};
export default RegistrationForm;

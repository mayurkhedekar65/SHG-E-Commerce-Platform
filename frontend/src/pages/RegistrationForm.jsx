// --- ADD THIS FUNCTION AT THE TOP ---
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
// ---------------------------------

import React, { useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const showLoader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/shglogin");
    }, 1500);
  };
  const [FormData, setFormData] = useState({
    name_of_shg: "",
    date_of_formation: "",
    registration_number: "",
    contact_number: "",
    village: "",
    taluka: "",
    district: "",
    type_of_shg: "",
    email: "",
    password: "",
    address: "",
  });
  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      FormData["name_of_shg"] == "" ||
      FormData["date_of_formation"] == "" ||
      FormData["registration_number"] == "" ||
      FormData["contact_number"] == "" ||
      FormData["village"] == "" ||
      FormData["taluka"] == "" ||
      FormData["district"] == "" ||
      FormData["type_of_shg"] == "" ||
      FormData["email"] == "" ||
      FormData["password"] == "" ||
      FormData["address"] == ""
    ) {
      if (FormData["name_of_shg"] == "") {
        alert("please enter group name !");
      } else if (FormData["date_of_formation"] == "") {
        alert("please enter group registration date !");
      } else if (FormData["registration_number"] == "") {
        alert("please enter group registration number !");
      } else if (FormData["contact_number"] == "") {
        alert("please enter group contact number !");
      } else if (FormData["contact_number"].length < 10) {
        alert("contact number length cannot be less than 10 !");
      } else if (FormData["village"] == "") {
        alert("please enter village!");
      } else if (FormData["taluka"] == "") {
        alert("please enter taluka !");
      } else if (FormData["district"] == "") {
        alert("please enter village !");
      } else if (FormData["type_of_shg"] == "") {
        alert("please enter type_of_shg !");
      } else if (FormData["email"] == "") {
        alert("please enter email !");
      } else if (FormData["password"] == "") {
        alert("please enter password !");
      } else if (FormData["address"] == "") {
        alert("please enter Address !");
      }
    } else {
      try {
        // --- FIX: ADDED withCredentials AND REDIRECT ON SUCCESS ---
        const response = await axios.post(
          "http://127.0.0.1:8000/groupform/submit_registration_form/",
          FormData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": getCookie("csrftoken"),
            },
          }
        );
        
        alert(response.data["message"]);
        navigate("/adminpanel"); // Redirect to dashboard
        // -----------------------------------------------------

      } catch (error) {
        console.error("error in submitting form !", error);
        alert("error in submitting form.please try again !");
      }
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
            {/* <Navbar></Navbar> */}
            <div className=" bg-[#dddddd]">
              <div className="text-center pt-35">
                <h1 className="font-bold md:text-3xl text-2xl">
                  SHG Registration Form
                </h1>
              </div>
              <div className="pt-10 pb-30 flex justify-center items-center bg-[#dddddd]">
                <div className="bg-[#F5C469] pt-10 pb-8 md:pt-12 md:pb-10 pr-8 pl-8  rounded-2xl border border-[#333333] shadow-2xl">
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
                          value={FormData.name_of_shg}
                          name="name_of_shg"
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
                          value={FormData.date_of_formation}
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
                          value={FormData.registration_number}
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
                          value={FormData.contact_number}
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
                          value={FormData.village}
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
                          value={FormData.taluka}
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
                          name="district"
                          id=""
                          onChange={handleChange}
                          value={FormData.district}
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
                          name="type_of_shg"
                          id=""
                          onChange={handleChange}
                          value={FormData.type_of_shg}
                        >
                          <option value="Women">Women</option>
                          <option value="Men">Men</option>
                          <option value="Mixed">Mixed</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center md:gap-8">
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="text"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            email*
                          </label>
                        </div>
                        <input
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          type="text"
                          placeholder="eg., shaktienterprises@gmail.com"
                          onChange={handleChange}
                          value={FormData.email}
                          name="email"
                        />
                      </div>
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="text"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            password*
                          </label>
                        </div>
                        <input
                          className="border bg-[#dddddd] border-[#333333] w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          type="password"
                          placeholder="password"
                          onChange={handleChange}
                          value={FormData.password}
                          name="password"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center">
                      <div>
                        <div className="text-left mb-2">
                          <label
                            htmlFor="message"
                            className="capitalize text-[#333333] md:text-[15px] text-[14px]"
                          >
                            Address of SHG Office*
                          </label>
                        </div>
                        <textarea
                          className="mb-10 w-70 h-30 md:w-2xl md:h-35 p-3 border bg-[#dddddd]  border-[#333333] rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                          placeholder="eg., House No. 56, Near Primary School, Keri, Valpoi – 403505"
                          onChange={handleChange}
                          value={FormData.address}
                          name="address"
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
                  <div className="flex justify-center  items-center  gap-2 capitalize mt-5  text-[15px]">
                    <div  className="text-[#333333]">
                      <p>already have an account ?</p>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="capitalize text-blue-500"
                        onClick={showLoader}
                      >
                        shg login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Footer setLoading={setLoading} /> */}
          </motion.div>
        </>
      )}
    </>
  );
};
export default RegistrationForm;
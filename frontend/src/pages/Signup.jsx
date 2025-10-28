import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Signup = () => {
  const [FormData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:8000/userform/user_registration_form/",
        FormData
      );
      alert("form submitted");
      setFormData({
        customer_name: "",
        email: "",
        phone_number: "",
        password: "",
      });
    } catch (error) {
      console.error("error in submitting form", error);
      alert("error in submitting form.please tru again");
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <main className="py-15  min-h-screen bg-[#dddddd]">
          <div className=" bg-[#F5C469] text-center  pt-8 pb-8  md:pt-8 md:pb-8 pr-8 pl-8 rounded-2xl  mx-140">
            <h3 className="capitalize font-bold md:text-3xl text-2xl mb-5 text-[#333333]">
              sign up
            </h3>
            <form action="#" className="text-center" onSubmit={handleSubmit}>
              <div>
                <div className="text-left mb-2">
                  <label
                    htmlFor="username"
                    className="capitalize text-[#333333]  md:text-[15px] text-[14px]"
                  >
                    name*
                  </label>
                </div>
                <input
                  name="customer_name"
                  className="border bg-[#dddddd]  border-[#333333]  w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                  type="text"
                  placeholder="enter your name"
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="text-left mb-2">
                  <label
                    htmlFor="email"
                    className="capitalize text-[#333333]  md:text-[15px] text-[14px]"
                  >
                    email*
                  </label>
                </div>
                <input
                  name="email"
                  className="border bg-[#dddddd]  border-[#333333]  w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                  type="email"
                  placeholder="enter your email"
                  onChange={handleChange}

                />
              </div>
              <div>
                <div className="text-left mb-2">
                  <label
                    htmlFor="phone number"
                    className="capitalize text-[#333333]  md:text-[15px] text-[14px]"
                  >
                    phone number*
                  </label>
                </div>
                <input
                  name="phone_number"
                  className="border  bg-[#dddddd] border-[#333333]  w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                  type="password"
                  placeholder="enter your phone number"
                  onChange={handleChange}

                />
              </div>
              <div>
                <div className="text-left mb-2">
                  <label
                    htmlFor="password"
                    className="capitalize text-[#333333]  md:text-[15px] text-[14px]"
                  >
                    password*
                  </label>
                </div>
                <input
                  name="password"
                  className="border  bg-[#dddddd] border-[#333333]  w-70 h-13 md:w-80 md:h-12 mb-6 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                  type="password"
                  placeholder="enter your password"
                  onChange={handleChange}

                />
              </div>
              <div>
                {/* <div>
                  <div className="text-left mb-2">
                    <label
                      htmlFor="confirm password"
                      className="capitalize text-[#333333]  md:text-[15px] text-[14px]"
                    >
                      confirm password*
                    </label>
                  </div>
                  <input
                    className="border  bg-[#dddddd] border-[#333333]  w-70 h-13 md:w-80 md:h-12 mb-10 rounded-xl pl-3 placeholder:capitalize placeholder:text-[14px] placeholder:text-[#585858]"
                    type="password"
                    placeholder="enter your confirm password"
                  />
                </div> */}
                <div></div>
                <button className="hover:bg-[#dddddd] hover:border-[#333333] hover:border  hover:rounded-lg  hover:text-[#333333] bg-accent bg-[#333333] text-[#F5C469] font-semibold capitalize border pt-2 pb-2 md:px-33 px-28 rounded-xl md:text-[17px] text-[17px]">
                  submit
                </button>
              </div>
              <div className="flex justify-center items-center gap-2 capitalize mt-5 text-[15px]">
                <div className="text-[#333333]">
                  <p>already have an account ?</p>
                </div>
                <div>
                  <button type="button" className="capitalize text-blue-500">
                    signin
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </motion.div>
    </>
  );
};
export default Signup;

import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const RegistrationForm = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className=" bg-[#dddddd]">
        <div className="text-center pt-35">
          <h1 className="font-bold md:text-3xl text-2xl">
            SHG Registration Form
          </h1>
        </div>
        <div className="pt-10 pb-30 flex justify-center items-center bg-[#dddddd]">
          <div className="bg-[#F5C469] pt-10 pb-8 md:pt-12 md:pb-10 pr-8 pl-8  md:pr-100 md:pl-100 rounded-2xl max-w-md border border-[#333333] shadow-2xl">
            <form action="#" className="text-center">
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
                    type="number"
                    placeholder="eg., 9146228061"
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
      <Footer></Footer>
    </>
  );
};
export default RegistrationForm;

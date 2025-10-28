import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/shg_baazar_logo.png";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [loader, activateLoader] = useState(false);
  const [hide, setHide] = useState(true);

  const showLoader = (path) => {
    activateLoader(true);
    setHide(false);
    setTimeout(() => {
      activateLoader(false);
      setHide(true);
      navigate(path);
    }, 1500);
  };
  return (
    <>
      {loader && <Loader />}

      {hide && (
        <header className="flex justify-center items-center gap-70 md:gap-160 py-2  md:bg-linear-to-l  md:to-[#333333]  md:from-[#F5C469]  bg-linear-to-b from-[#333333]  to-[#3d3c3c]   fixed w-full z-67">
          <div>
            <button onClick={() => navigate("/")}>
              <img className=" w-12 h-12 md:w-15 md:h-15" src={logo} alt="" />
            </button>
          </div>
          <div className="md:hidden">
            <FontAwesomeIcon
              icon={menuOpen ? faXmark : faBars}
              className="text-2xl text-[#F5C469] cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
          <nav
            className={`${
              menuOpen
                ? "flex flex-col absolute  top-14 left-0 w-full  bg-[#3d3c3c]    py-4 space-y-4 items-center"
                : "hidden"
            } md:flex md:space-x-8 md:static md:flex-row md:justify-center md:items-center md:space-y-0 md:bg-transparent md:shadow-none`}
          >
            <div className="flex flex-col md:flex-row justify-around items-center gap-5 md:gap-10 capitalize text-[16.5px] text-[#dddddd] md:text-[#333333]">
              <button className="capitalize " onClick={() => navigate("/")}>
                home
              </button>
              <button
                className="capitalize"
                onClick={() => showLoader("/snggroups")}
              >
                SHG Groups
              </button>
              <button
                className="capitalize"
                onClick={() => showLoader("/contact")}
              >
                contact
              </button>
              <button
                className="capitalize"
                onClick={() => showLoader("/about")}
              >
                about
              </button>
              <button
                className="capitalize bg-[#F5C469] text-[#333333]  md:bg-[#333333] md:text-[#dddddd] border border-[#dddddd] py-2 px-30 md:px-6 rounded-lg md:rounded-4xl"
                onClick={() => showLoader("/registrationform")}
              >
                register SHG
              </button>
                    <button
                className="capitalize text-[#F5C469] bg-[#333333]  md:text-[#333333] md:bg-[#dddddd] border border-[#333333] py-2 px-30 md:px-6 rounded-lg md:rounded-4xl"
                onClick={() => showLoader("/signup")}
              >
                signup
              </button>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};
export default Navbar;

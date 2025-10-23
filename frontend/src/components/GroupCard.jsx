import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot,faUser,faBox} from "@fortawesome/free-solid-svg-icons";


const GroupCard = ({ GroupName, GroupInfo,Location,TotalProducts,TotalGroupMembers,Logo}) => {
  return (
    <>
      <div className="bg-[#dddddd] border border-[#333333]    rounded-lg text-center w-75 pb-5 shadow-2xl text-[#333333]">
        <div className="border-b border-[#333333] ">
          <img
            className="rounded-t-lg"
            src={Logo}
            alt="not available"
          />
        </div>
        <div className="text-center">
          <h3 className="mt-2 font-bold text-lg">{GroupName}</h3>
          <p className="mt-2 px-3  text-[#333333]">{GroupInfo}</p>
          <p className="mt-2 flex justify-center items-center"><FontAwesomeIcon className="mr-1 text-[#F5C469]" icon={faLocationDot}/><p>{Location}</p></p>
          <div className="flex justify-center items-center mt-2 space-x-5">
            <div className="flex justify-center items-center"><FontAwesomeIcon className="mr-1 text-[#F5C469]" icon={faBox}/><p>{TotalProducts}</p></div>
            <div className="flex justify-center items-center"><FontAwesomeIcon className="mr-1 text-[#F5C469]" icon={faUser}/><p>{TotalGroupMembers}</p></div>
          </div>
        </div>
        <div className="mt-4">
          <button className="capitalize text-[#333333] border border-[#333333] py-3 px-19 rounded-lg bg-[#F5C469] font-bold">
            <FontAwesomeIcon className="mr-2 text-[#333333] " icon={faUser}/>
            view group
          </button>
        </div>
      </div>
    </>
  );
};
export default GroupCard;

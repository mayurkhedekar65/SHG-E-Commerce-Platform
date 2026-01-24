import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faUser,
  faBox,
} from "@fortawesome/free-solid-svg-icons";

const GroupViewCard = ({ isOpen, onClose, group}) => {
  if (!isOpen) return null;

  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center">

  {/* BACKDROP */}
  <div
    className="absolute inset-0 bg-black/60"
    onClick={onClose}
  />

  {/* MODAL */}
  <div className="relative z-10 w-[92%] max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl">

    {/* CLOSE BUTTON */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
    >
      ✕
    </button>

    {/* MODAL CONTENT */}
    <div className="flex flex-col md:flex-row">

      {/* LEFT: GROUP IMAGE */}
      <div className="md:w-1/2 bg-[#EDEDED] flex items-center justify-center p-6">
        <img
          src={group.image}
          alt={"not available"}
          className="max-h-[400px] w-full object-cover rounded-lg"
        />
      </div>

      {/* RIGHT: DETAILS */}
      <div className="md:w-1/2 p-8 flex flex-col">

        {/* NAME */}
        <h2 className="text-2xl font-semibold text-[#2B2B2B] line-clamp-2">
          {group.name}
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-4 text-gray-600 leading-relaxed line-clamp-5">
          {group.info}
        </p>

        {/* LOCATION */}
        <div className="mt-4 flex items-center gap-2 text-sm text-[#2B2B2B]">
          <FontAwesomeIcon className="text-[#E6B65C]" icon={faLocationDot} />
          <span>{group.location}</span>
        </div>

        {/* STATS */}
        <div className="mt-5 flex gap-6 text-sm flex-wrap text-[#2B2B2B]">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <FontAwesomeIcon className="text-[#E6B65C]" icon={faBox} />
            <span>{group.totalproducts} Products</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <FontAwesomeIcon className="text-[#E6B65C]" icon={faUser} />
            <span>{group.totalgroupmembers} Members</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-auto pt-6 flex flex-col gap-4">
          {/* <button
            // onClick={joinGroup} // your function to join or view group
            className="
              w-full
              bg-[#E6B65C]
              text-[#2B2B2B]
              font-semibold
              py-3
              rounded-lg
              hover:bg-[#d9a94f]
              transition
            "
          >
            <FontAwesomeIcon className="mr-2" icon={faUser} />
            Join / View Group
          </button> */}

          <button
            onClick={onClose}
            className="
              w-full
              border border-gray-300
              text-gray-600
              py-3
              rounded-lg
              hover:bg-gray-100
              transition
            "
          >
            Close
          </button>
        </div>

      </div>
    </div>
  </div>
</div>

  );
};

export default GroupViewCard;

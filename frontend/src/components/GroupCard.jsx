import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faUser,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";
import GroupImage from "../assets/ChatGPT Image Oct 22, 2025, 06_20_44 PM.png";
import { useState } from "react";
import GroupViewCard from "./GroupViewCard";

const GroupCard = ({
  GroupName,
  GroupInfo,
  Location,
  TotalProducts,
  TotalGroupMembers,
  // Logo,
}) => {
  const group = {
    image: GroupImage,
    name: GroupName,
    info: GroupInfo,
    location: Location,
    totalproducts: TotalProducts,
    totalgroupmembers: TotalGroupMembers,
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.97 }}
        className="h-full"
      >
        <div
          className="
    h-full
    bg-[#FAFAFA]
    border border-[#2B2B2B]
    rounded-xl
    shadow-md
    flex flex-col
    overflow-hidden
    text-[#2B2B2B]
  "
        >
          {/* IMAGE */}
          <div className="h-36 bg-[#EDEDED] overflow-hidden">
            <img
              src={GroupImage}
              alt={GroupName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* ACCENT STRIP */}
          <div className="h-1.5 bg-[#E6B65C]" />

          {/* CONTENT */}
          <div className="flex-1 px-5 py-5 text-center">
            {/* GROUP NAME */}
            <h3 className="font-semibold text-lg leading-snug line-clamp-2">
              {GroupName}
            </h3>

            {/* GROUP INFO */}
            <p className="mt-3 text-sm text-[#6B7280] leading-relaxed line-clamp-3">
              {GroupInfo}
            </p>

            {/* LOCATION */}
            <div className="mt-4 flex justify-center items-center gap-2 text-sm">
              <FontAwesomeIcon
                className="text-[#E6B65C]"
                icon={faLocationDot}
              />
              <span className="truncate max-w-[200px]">{Location}</span>
            </div>

            {/* STATS */}
            <div className="mt-5 flex justify-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <FontAwesomeIcon className="text-[#E6B65C]" icon={faBox} />
                <span>{TotalProducts} Products</span>
              </div>

              <div className="flex items-center gap-2 whitespace-nowrap">
                <FontAwesomeIcon className="text-[#E6B65C]" icon={faUser} />
                <span>{TotalGroupMembers} Members</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="px-5 pb-5">
            <button
            onClick={()=>setOpen(true)}
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
              View Group
            </button>
          </div>
        </div>
      </motion.div>

      <GroupViewCard
        isOpen={open}
        group={group}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
export default GroupCard;

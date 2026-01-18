import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const GroupProfile = () => {
  const [profileData, setProfileData] = useState({});
  // const token = localStorage.getItem("access_token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://127.0.0.1:8000/get_grp_profile/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((response) => response.data)
          .then((data) => setProfileData(data["shg_grp_details"][0]));
      } catch {
        console.error("profile data not found..");
      }
    };
    fetchData();
  }, []);
  return (
    <>
     <div className="bg-[#dddddd] min-h-screen p-6">

  {/* Page Header */}
  <div className="mb-6 bg-white rounded-2xl shadow p-6">
    <h2 className="text-3xl font-bold text-[#333333]">
      SHG Profile
    </h2>
    <p className="text-sm text-gray-500 mt-1">
      Self Help Group information overview
    </p>
  </div>

  {/* Profile Card */}
  <div className="bg-[#F5C469] rounded-2xl shadow-lg p-8">

    <h3 className="text-xl font-bold text-[#333333] mb-6">
      Group Details
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Field */}
      <div>
        <p className="text-xs font-semibold uppercase text-gray-700 mb-1">
          SHG Name
        </p>
        <div className="bg-white rounded-xl px-4 py-3 font-medium text-[#333333] shadow-sm">
          {profileData?.name_of_shg || "Not Available"}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase text-gray-700 mb-1">
          Registration Number
        </p>
        <div className="bg-white rounded-xl px-4 py-3 font-medium text-[#333333] shadow-sm">
          {profileData?.registration_number || "Not Available"}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase text-gray-700 mb-1">
          Contact Number
        </p>
        <div className="bg-white rounded-xl px-4 py-3 font-medium text-[#333333] shadow-sm">
          {profileData?.contact_number || "Not Available"}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase text-gray-700 mb-1">
          Village
        </p>
        <div className="bg-white rounded-xl px-4 py-3 font-medium text-[#333333] shadow-sm">
          {profileData?.village || "Not Available"}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase text-gray-700 mb-1">
          District
        </p>
        <div className="bg-white rounded-xl px-4 py-3 font-medium text-[#333333] shadow-sm">
          {profileData?.district || "Not Available"}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase text-gray-700 mb-1">
          Type of SHG
        </p>
        <div className="bg-white rounded-xl px-4 py-3 font-medium text-[#333333] shadow-sm">
          {profileData?.type_of_shg || "Not Available"}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase text-gray-700 mb-1">
          Date of Formation
        </p>
        <div className="bg-white rounded-xl px-4 py-3 font-medium text-[#333333] shadow-sm">
          {profileData?.date_of_formation || "Not Available"}
        </div>
      </div>

      {/* Full-width Address */}
      <div className="md:col-span-2">
        <p className="text-xs font-semibold uppercase text-gray-700 mb-1">
          Address
        </p>
        <div className="bg-white rounded-xl px-4 py-3 font-medium text-[#333333] shadow-sm">
          {profileData?.address || "Not Available"}
        </div>
      </div>

    </div>
  </div>
</div>

    </>
  );
};

export default GroupProfile;

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
  }, [setProfileData]);
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-[#F5C469] shadow-xl rounded-2xl w-full max-w-3xl p-8">
          <div className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">SHG Profile</h2>
            <p className="text-sm text-gray-500">Self Help Group Information</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">SHG Name</p>
              <div className="bg-gray-100 rounded-lg px-4 py-2 font-medium text-gray-800">
                {profileData?.name_of_shg || "Not Available"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Registration Number</p>
              <div className="bg-gray-100 rounded-lg px-4 py-2 font-medium text-gray-800">
                {profileData?.registration_number || "Not Available"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Contact Number</p>
              <div className="bg-gray-100 rounded-lg px-4 py-2 font-medium text-gray-800">
                {profileData?.contact_number || "Not Available"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Village</p>
              <div className="bg-gray-100 rounded-lg px-4 py-2 font-medium text-gray-800">
                {profileData?.village || "Not Available"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">District</p>
              <div className="bg-gray-100 rounded-lg px-4 py-2 font-medium text-gray-800">
                {profileData?.district || "Not Available"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Type of SHG</p>
              <div className="bg-gray-100 rounded-lg px-4 py-2 font-medium text-gray-800">
                {profileData?.type_of_shg || "Not Available"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Date of Formation</p>
              <div className="bg-gray-100 rounded-lg px-4 py-2 font-medium text-gray-800">
                {profileData?.date_of_formation || "Not Available"}
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Address</p>
              <div className="bg-gray-100 rounded-lg px-4 py-2 font-medium text-gray-800">
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

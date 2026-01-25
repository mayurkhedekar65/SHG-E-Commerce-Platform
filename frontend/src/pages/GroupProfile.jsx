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
      <div className="min-h-screen bg-gray-50 p-8 font-sans">
        {/* Page Header */}
        <header className="mb-8 bg-white rounded-3xl shadow-md p-8">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-wide">
            SHG Profile
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Self Help Group information overview
          </p>
        </header>

        {/* Profile Card */}
        <section className="bg-white rounded-3xl shadow-lg p-10 max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 tracking-wide">
            Group Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Single Field */}
            {[
              { label: "SHG Name", value: profileData?.name_of_shg },
              {
                label: "Registration Number",
                value: profileData?.registration_number,
              },
              { label: "Contact Number", value: profileData?.contact_number },
              { label: "Village", value: profileData?.village },
              { label: "District", value: profileData?.district },
              { label: "Type of SHG", value: profileData?.type_of_shg },
              {
                label: "Date of Formation",
                value: profileData?.date_of_formation,
              },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs font-semibold uppercase text-gray-500 mb-2 tracking-wide">
                  {label}
                </p>
                <div className="bg-gray-100 rounded-xl px-5 py-4 font-medium text-gray-800 shadow-sm transition-shadow hover:shadow-md">
                  {value || "Not Available"}
                </div>
              </div>
            ))}

            {/* Full-width Address */}
            <div className="md:col-span-2">
              <p className="text-xs font-semibold uppercase text-gray-500 mb-2 tracking-wide">
                Address
              </p>
              <div className="bg-gray-100 rounded-xl px-5 py-4 font-medium text-gray-800 shadow-sm transition-shadow hover:shadow-md">
                {profileData?.address || "Not Available"}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GroupProfile;

import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Admin_SuccessStories = () => {
  const axiosPublic = useAxiosPublic();
  const [successStories, setSuccessStories] = useState([]);

  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const response = await axiosPublic.get("/user-stories");
        setSuccessStories(response.data);
      } catch (error) {
        console.error("Error fetching success stories:", error);
      }
    };

    fetchSuccessStories();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <h2 className="text-4xl font-semibold text-black mb-8 text-center gloock-regular ">
         Submitted Success Stories 💖
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-sm rounded-lg">
          <thead className="bg-pink-50 text-black ">
            <tr>
              <th className="p-4 text-left">Male Biodata ID</th>
              <th className="p-4 text-left">Female Biodata ID</th>
              <th className="p-4 text-left w-2/3">💍 Success Story 💍</th>
            </tr>
          </thead>
          <tbody>
            {successStories.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500 italic">
                  No success stories submitted yet. 💕
                </td>
              </tr>
            ) : (
              successStories.map((story) => (
                <tr key={story._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4 text-gray-700">{story.maleBiodataId}</td>
                  <td className="p-4 text-gray-700">{story.femaleBiodataId}</td>
                  <td className="p-4 text-gray-700 italic">"{story.story}"</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default Admin_SuccessStories;

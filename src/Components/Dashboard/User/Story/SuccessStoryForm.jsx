import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SuccessStoryForm = () => {
  const axiosPublic = useAxiosPublic();
  const [maleBiodataId, setMaleBiodataId] = useState("");
  const [femaleBiodataId, setFemaleBiodataId] = useState("");
  const [story, setStory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!maleBiodataId || !femaleBiodataId || !story) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required!",
        text: "Please fill out all fields before submitting.",
      });
      return;
    }

    const successStory = {
      maleBiodataId,
      femaleBiodataId,
      story,
      createdAt: new Date(),
    };

    try {
      const response = await axiosPublic.post("/user-stories", successStory);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your success story has been submitted.",
        });

        // Reset form
        setMaleBiodataId("");
        setFemaleBiodataId("");
        setStory("");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again later.",
      });
      console.error("Error submitting success story:", error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white shadow-lg rounded-lg p-6  w-full max-w-3xl mx-auto gloock-regular mb-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Submit Your Success Story
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Share your experience with BlissBonds.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">
            Male Biodata ID
          </label>
          <input
            type="number"
            value={maleBiodataId}
            onChange={(e) => setMaleBiodataId(e.target.value)}
            placeholder="Enter Male Biodata ID"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-pink-500   gilda-display-regular"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">
            Female Biodata ID
          </label>
          <input
            type="number"
            value={femaleBiodataId}
            onChange={(e) => setFemaleBiodataId(e.target.value)}
            placeholder="Enter Female Biodata ID"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-pink-500 gilda-display-regular"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Success Story
          </label>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Write your success story..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-pink-500 h-32 resize-none gilda-display-regular"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-300 transition  gilda-display-regular"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default SuccessStoryForm;

import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";





const Approve_Premium = () => {
  const axiosPublic = useAxiosPublic();
  const [premiumRequests, setPremiumRequests] = useState([]);
  const [premiumStatus, setPremiumStatus] = useState({}); // Store premium status of each user
  const [biodataIds, setBiodataIds] = useState({}); // Store biodata ID of each user
  const [loading, setLoading] = useState(true);

  // Fetch all premium requests on component mount
  useEffect(() => {
    const fetchPremiumRequests = async () => {
      try {
        const response = await axiosPublic.get("/premium-requests");
        setPremiumRequests(response.data);
  
        const userResponse = await axiosPublic.get("/get-create-edit-biodata");
  
        // Reconstruct the premium status and biodata ID mappings
        const premiumStatuses = {};
        const biodataIdsMap = {};
        
        for (const request of response.data) {
          const user = userResponse.data.find((u) => u.email === request.email);
          premiumStatuses[request.email] = user ? user.isPremium : false;
          biodataIdsMap[request.email] = user ? user.biodataId : "N/A";
        }
  
        setPremiumStatus(premiumStatuses);
        setBiodataIds(biodataIdsMap);
      } catch (error) {
        console.error("Error fetching premium requests:", error);
      }
      finally {
        setLoading(false);
    }
    };
  
    fetchPremiumRequests();
  }, [axiosPublic]); // Ensure fresh data is fetched
  

  const handleMakePremium = async (email) => {
    try {
      // Call backend to update user to premium
      await axiosPublic.patch(`/update-biodata-premium/${email}`);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "User has been marked as premium successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Update the premium status in UI
      setPremiumStatus((prev) => ({ ...prev, [email]: true }));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while updating the user to premium!",
      });
    }
  };

  return loading ? (
    <div className="flex justify-center items-center py-6">
        <Button className="rounded-full" loading={true}>
            Loading
        </Button>
    </div>
) : (
    <div className="container mx-auto p-6">
      <Typography variant="h1" className="mb-3 gloock-regular">
        Approve Premium Requests
      </Typography>
      <Typography variant="lead" className="mb-6 gilda-display-regular">
      Approve users premium request from user dashboard
      </Typography>
      {premiumRequests.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
            <th className="border border-gray-300 px-4 py-2">Biodata ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Premium Status</th>
            </tr>
          </thead>
          <tbody>
            {premiumRequests.map((request) => (
              <tr key={request._id}>
                <td className="border border-gray-300 px-4 py-2 text-center">{biodataIds[request.email] || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{request.name}</td>
                <td className="border border-gray-300 px-4 py-2">{request.email}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Button
                    onClick={() => handleMakePremium(request.email)}
                    variant="gradient"
                    color={premiumStatus[request.email] ? "green" : "yellow"}
                    disabled={premiumStatus[request.email]} // Disable if already premium
                  >
                    {premiumStatus[request.email] ? "Premium User" : "Make Premium"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Typography color="gray" className="mt-10 text-center">
          No pending premium requests found.
        </Typography>
      )}
    </div>
  );
};

export default Approve_Premium;

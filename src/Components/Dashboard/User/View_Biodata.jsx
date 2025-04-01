import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Chip,
} from "@material-tailwind/react";
import Swal from "sweetalert2"; // Import Swal for alert messages
import useAxiosPublic from "../../hooks/useAxiosPublic";





const View_Biodata = () => {
  const axiosPublic = useAxiosPublic();
  const [biodataList, setBiodataList] = useState([]);
  const [premiumRequests, setPremiumRequests] = useState([]); // To check existing premium requests
  const [selectedBiodata, setSelectedBiodata] = useState(null); // For modal selection
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all biodata and premium requests on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const biodataResponse = await axiosPublic.get("/get-create-edit-biodata");
        const premiumResponse = await axiosPublic.get("/premium-requests");
        setBiodataList(biodataResponse.data); // Store updated biodata list
        setPremiumRequests(premiumResponse.data); // Store premium requests
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosPublic]); // Add axiosPublic as a dependency to refetch on change


  // const handleMakePremium = async () => {
  //   try {
  //     // Check if the user has already submitted a premium request
  //     const existingRequest = premiumRequests.find(
  //       (request) => request.email === selectedBiodata.email
  //     );

  //     if (existingRequest) {
  //       Swal.fire({
  //         icon: "info",
  //         title: "Premium Request Already Sent",
  //         text: `The user ${selectedBiodata.name} has already sent a premium request.`,
  //       });
  //       setIsModalOpen(false);
  //       return;
  //     }

  //     // If no existing request, proceed to submit a new one
  //     await axiosPublic.post("/request-premium", {
  //       name: selectedBiodata.name,
  //       email: selectedBiodata.email,
  //     });

  //     Swal.fire({
  //       position: "center",
  //       icon: "success",
  //       title: "Premium request submitted successfully!",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });

  //     // Update the premium requests list
  //     setPremiumRequests((prev) => [
  //       ...prev,
  //       { name: selectedBiodata.name, email: selectedBiodata.email },
  //     ]);
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Something went wrong while submitting the premium request!",
  //     });
  //   } finally {
  //     setIsModalOpen(false); // Close the modal
  //   }
  // };

  const handleMakePremium = async () => {
    try {
      // Check if the user has already submitted a premium request
      const existingRequest = premiumRequests.find(
        (request) => request.email === selectedBiodata.email
      );

      if (existingRequest) {
        Swal.fire({
          icon: "info",
          title: "Premium Request Already Sent",
          text: `The user ${selectedBiodata.name} has already sent a premium request.`,
        });
        setIsModalOpen(false);
        return;
      }

      // Send request to backend
      await axiosPublic.post("/request-premium", {
        name: selectedBiodata.name,
        email: selectedBiodata.email,
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Premium request submitted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Update UI to show request is sent
      setPremiumRequests((prev) => [
        ...prev,
        { name: selectedBiodata.name, email: selectedBiodata.email, status: "Pending" },
      ]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while submitting the premium request!",
      });
    } finally {
      setIsModalOpen(false); // Close the modal
    }
  };


  return loading ? (
    <div className="flex justify-center items-center py-6">
      <Button className="rounded-full" loading={true}>
        Loading
      </Button>
    </div>
  ) : (
    <div className="space-y-6">
      <h1 className=" gloock-regular text-5xl text-center ">View All Biodata</h1>
      <p className="gilda-display-regular text-lg text-center mt-4">Explore the profiles of BlissBonds Matrimony members</p>
    

    <div className="flex flex-wrap gap-6 justify-center">
     
      {biodataList.length > 0 ? (
        biodataList.map((biodata) => (
          <Card key={biodata.biodataId} className="w-96 mb-10">
            <CardHeader shadow={false} floated={false} className="h-96">
              <img
                src={biodata.profileImage || "https://via.placeholder.com/400"}
                alt={`biodata-${biodata.biodataId}`}
                className="h-full w-full object-cover  gilda-display-regular"
              />
            </CardHeader>
            <CardBody>

              <Typography color="blue-gray" className="font-medium text-lg mb-2 gilda-display-regular text-black">
                {biodata.name}
              </Typography>

              {biodata.isPremium && (
                <Typography
                  color="green"
                  variant="small"
                  className="font-medium mb-2 text-sm gilda-display-regular"
                >
                  Premium User{" "}
                  <CheckIcon className="inline-block h-4 w-4 text-green-500 gilda-display-regular " />
                </Typography>
                
              )}


              <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2 gilda-display-regular "
              >
                Biodata Id: {biodata.biodataId || "N/A"}
              </Typography>

              <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2 gilda-display-regular"
              >
                Age: {biodata.age || "N/A"}
              </Typography>

              <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2 gilda-display-regular"
              >
                Date of Birth: {biodata.dob || "N/A"}
              </Typography>
              <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2 gilda-display-regular"
              >

                <Typography
                  color="black"
                  variant="small"
                  className="font-normal opacity-65 mb-2 gilda-display-regular"
                >
                  Biodata Type: {biodata.biodataType || "N/A"}
                </Typography>

                Race: {biodata.race || "N/A"}
              </Typography>
              <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2 gilda-display-regular"
              >
                Height: {biodata.height || "N/A"} | Weight: {biodata.weight || "N/A"}
              </Typography>
              <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2 gilda-display-regular"
              >
                Occupation: {biodata.occupation || "N/A"}
              </Typography>
              <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2 gilda-display-regular"
              >
                Father's Name: {biodata.fathersName || "N/A"}
              </Typography>
              <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2 gilda-display-regular"
              >
                Mother's Name: {biodata.mothersName || "N/A"}
              </Typography>
              <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2 gilda-display-regular"
              >
                Permanent Division: {biodata.permanentDivision || "N/A"}
              </Typography>
              <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2 gilda-display-regular"
              >
                Present Division: {biodata.presentDivision || "N/A"}
              </Typography>
              <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2 gilda-display-regular"
              >
                Expected Partner Age: {biodata.expectedPartnerAge || "N/A"}
              </Typography>
              <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2 gilda-display-regular"
              >
                Expected Partner Height: {biodata.expectedPartnerHeight || "N/A"}
              </Typography>
              <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2 gilda-display-regular"
              >
                Expected Partner Weight: {biodata.expectedPartnerWeight || "N/A"}
              </Typography>
              {/* <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2"
              >
                Email: {biodata.email || "N/A"}
              </Typography>
              <Typography
                color="gray"
                variant="small"
                className="font-normal opacity-75 mb-2"
              >
                Mobile: {biodata.mobile || "N/A"}
              </Typography> */}

              {/* Show Contact Info Only for Premium Users */}
              {biodata.isPremium ? (
                <>
                  <Typography
                    color="gray"
                    variant="small"
                    className="font-normal opacity-75 mb-2 gilda-display-regular"
                  >
                    Email: {biodata.email || "N/A"}
                  </Typography>
                  <Typography
                    color="gray"
                    variant="small"
                    className="font-normal opacity-75 mb-2 gilda-display-regular"
                  >
                    Mobile: {biodata.mobile || "N/A"}
                  </Typography>
                </>
              ) : (
                <Typography
                  color="blue"
                  variant="small"
                  className="font-normal opacity-75 mb-2  cursor-pointer gilda-display-regular"
                  onClick={() => Swal.fire("Request Sent", "Your request to see contact info has been submitted.", "success")}
                >
                  [Email & Mobile] ▶️ Make a Request 📩
                </Typography>
              )}
            </CardBody>
            <CardFooter className="pt-0 ">
              <Button
                onClick={() => {
                  setSelectedBiodata(biodata);
                  setIsModalOpen(true);
                }}
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 shadow-none hover:scale-105 gilda-display-regular text-black"
                disabled={biodata.isPremium} // Disable button if already premium
              >
                {biodata.isPremium ? "Already Premium" : "Make Premium"}
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Typography color="gray" className="mt-10 text-center">
          No biodata found.
        </Typography>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} size="xs" handler={() => setIsModalOpen(false)}>
        <DialogHeader>Confirm Premium Request</DialogHeader>
        <DialogBody>
          Are you sure you want to submit a premium request for{" "}
          <b>{selectedBiodata?.name}</b>?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setIsModalOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleMakePremium}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
    </div>
  );
};

export default View_Biodata;

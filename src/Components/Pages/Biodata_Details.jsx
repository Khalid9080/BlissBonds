
import { BsSuitHeartFill } from "react-icons/bs";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Button, CardFooter } from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2';
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const Biodata_Details = () => {
  const { biodataId } = useParams();
  const [biodata, setBiodata] = useState(null);
  const [relatedBiodatas, setRelatedBiodatas] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);



  const handleAddToFavourite = async () => {
    try {
      const favouriteData = {
        biodataId: biodata.biodataId,
        name: biodata.name,
        permanentDivision: biodata.permanentDivision,
        occupation: biodata.occupation
      };

      const response = await axiosPublic.post('/add-to-favourite', favouriteData);

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Added to Favourites!",
          text: "You can view it in the Favourite section.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Failed to add to favourites!",
      });
    }
  };


  // useEffect(() => {
  //   const fetchBiodataDetails = async () => {
  //     try {
  //       const response = await axiosPublic.get(`/biodata-details/${biodataId}`);
  //       setBiodata(response.data);
  //       fetchRelatedBiodatas(response.data.biodataType);
  //     } catch (error) {
  //       console.error("Error fetching biodata details:", error.response ? error.response.data : error);
  //     }
  //   };

  //   const fetchRelatedBiodatas = async (biodataType) => {
  //     try {
  //       const response = await axiosPublic.get("/get-create-edit-biodata");
  //       const filteredBiodatas = response.data.filter((b) => b.biodataType === biodataType && b.biodataId !== parseInt(biodataId));
  //       setRelatedBiodatas(filteredBiodatas.slice(0, 3));
  //     } catch (error) {
  //       console.error("Error fetching related biodatas:", error);
  //     }
  //   };

  //   if (biodataId) fetchBiodataDetails();
  // }, [biodataId, axiosPublic]);

  useEffect(() => {
    const fetchBiodataDetails = async () => {
      try {
        const response = await axiosPublic.get(`/biodata-details/${biodataId}`);
        setBiodata(response.data);
        fetchRelatedBiodatas(response.data.biodataType);
      } catch (error) {
        console.error("Error fetching biodata details:", error.response ? error.response.data : error);
      }
    };

    const fetchRelatedBiodatas = async (biodataType) => {
      try {
        const response = await axiosPublic.get("/get-create-edit-biodata");
        const filteredBiodatas = response.data.filter((b) => b.biodataType === biodataType && b.biodataId !== parseInt(biodataId));
        setRelatedBiodatas(filteredBiodatas.slice(0, 3));
      } catch (error) {
        console.error("Error fetching related biodatas:", error);
      }
    };

    const checkApprovalStatus = async () => {
      try {
        const res = await axiosPublic.get(`/get-my-contact-requests`);
        const approved = res.data.some(
          (req) => req.biodataId === parseInt(biodataId) && req.status === "Approved"
        );
        setIsApproved(approved);
      } catch (error) {
        console.error("Error checking approval status:", error);
      }
    };

    if (biodataId) {
      fetchBiodataDetails();
      checkApprovalStatus();
    }
  }, [biodataId, axiosPublic]);


  if (!biodata) {
    return <div>Loading...</div>;
  }

  // const handleRequestPremium = () => {
  //   navigate("/checkout", {
  //     state: {
  //       email: biodata.email,
  //       biodataId: biodata.biodataId,
  //       name: biodata.name,
  //     }
  //   });
  // };

  const handleRequestPremium = () => {
    if (user) {
      navigate("/checkout", {
        state: {
          email: biodata.email,
          biodataId: biodata.biodataId,
          name: biodata.name,
        }
      });
    } else {
      navigate("/login");
    }
  };


  return (
    <div className="flex flex-col items-center py-4">
      <h1 className="text-5xl mt-10 gloock-regular ">Biodata Details | BlissBonds Matrimony</h1>
      <p className="text-lg gilda-display-regular mt-5 mb-5"> This keeps it professional, clear, and engaging for users browsing biodata details. Let me know if you'd like a different tone or structure! </p>
      <Card className="w-full max-w-6xl">
        <Helmet>
          <title>Bliss Bonds | Biodata Details</title>
        </Helmet>
        <CardHeader shadow={false} floated={false} className="h-[400px]">
          <img
            src={biodata.profileImage || "https://via.placeholder.com/500"}
            alt={`Biodata ${biodata.biodataId}`}
            className="h-full w-full object-cover "
          />
        </CardHeader>
        <CardBody className="px-6 py-4 ">
          <Typography color="blue-gray" className="font-medium text-xl mb-2 gloock-regular text-gray-800">
            {biodata.name}
          </Typography>

          {/* {biodata.isPremium && (
            <Typography color="green" variant="small" className="font-medium mb-2 text-sm">
              Premium User{" "}
              <CheckIcon className="inline-block h-4 w-4 text-green-500" />
            </Typography>
          )} */}

          <Typography color="green" variant="small" className="font-medium mb-2 text-sm text-green-700">
            {biodata.isPremium || isApproved ? (
              <>Premium User <CheckIcon className="inline-block h-4 w-4 text-green-700" /></>
            ) : null}
          </Typography>

          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Biodata Id: {biodata.biodataId || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Age: {biodata.age || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Date of Birth: {biodata.dob || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Biodata Type: {biodata.biodataType || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Race: {biodata.race || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Height: {biodata.height || "N/A"} | Weight: {biodata.weight || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Occupation: {biodata.occupation || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Father's Name: {biodata.fathersName || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Mother's Name: {biodata.mothersName || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Permanent Division: {biodata.permanentDivision || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Present Division: {biodata.presentDivision || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Expected Partner Age: {biodata.expectedPartnerAge || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Expected Partner Height: {biodata.expectedPartnerHeight || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Expected Partner Weight: {biodata.expectedPartnerWeight || "N/A"}
          </Typography>

          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Email: {biodata.isPremium || isApproved ? biodata.email : "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1 gilda-display-regular  text-gray-900">
            Mobile: {biodata.isPremium || isApproved ? biodata.mobile : "N/A"}
          </Typography>

          {/* {biodata.isPremium ? (
            <>
              <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
                Email: {biodata.email || "N/A"}
              </Typography>
              <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
                Mobile: {biodata.mobile || "N/A"}
              </Typography>
            </>
          ) : (
            <Typography
              color="blue"
              className="text-md font-normal opacity-75 mb-1 cursor-pointer"
              onClick={handleRequestPremium}
            >
              [Email & Mobile] ▶️ Make a Request 📩
            </Typography>
          )} */}

          {!biodata.isPremium && !isApproved && (
            <Typography
              color="blue"
              className="text-md font-normal opacity-75 mb-1 cursor-pointer"
              onClick={handleRequestPremium}
            >
              [Email & Mobile] ▶️ Make a Request 📩
            </Typography>
          )}
        </CardBody>

        <CardFooter className="pt-3">
          <Button size="lg" fullWidth={true} onClick={handleAddToFavourite} className="flex items-center justify-center gap-2 text-sm gilda-display-regular">
            Add to Favourite
            <BsSuitHeartFill className="text-white text-lg" />
          </Button>

        </CardFooter>

      </Card>

      {relatedBiodatas.length > 0 && (
        <div className="mt-6 w-full max-w-6xl">
          <Typography color="blue-gray" className="text-lg font-semibold mb-2">
            Suggested {biodata.biodataType} Profiles
          </Typography>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 ">
            {relatedBiodatas.map((related) => (
              <Card key={related.biodataId} className="w-full max-w-sm">
                <CardHeader shadow={false} floated={false} className="h-[200px]">
                  <img
                    src={related.profileImage || "https://via.placeholder.com/500"}
                    alt={`Biodata ${related.biodataId}`}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody className="px-4 py-2">
                  <Typography color="blue-gray" className="font-medium text-md mb-1">
                    {related.name || "N/A"}
                  </Typography>
                  <Typography color="gray" className="text-sm font-normal opacity-75 mb-1">
                    Age: {related.age || "N/A"}
                  </Typography>
                  <Typography color="gray" className="text-sm font-normal opacity-75 mb-1">
                    Occupation: {related.occupation || "N/A"}
                  </Typography>
                </CardBody>
                <div className="p-2 text-center">
                  <Button
                    ripple={true}
                    fullWidth={true}
                    className="bg-gray-900 text-white shadow-none hover:scale-105"
                    onClick={() => window.location.href = `/biodata-details/${related.biodataId}`}
                  >
                    View Profile
                  </Button>
                </div>
              </Card>

            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Biodata_Details;




/*

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { CheckIcon } from "@heroicons/react/24/outline";

const Biodata_Details = () => {
  const { biodataId } = useParams(); // Get the biodataId from the URL
  const [biodata, setBiodata] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchBiodataDetails = async () => {
      try {
        const response = await axiosPublic.get(`/biodata-details/${biodataId}`);
        setBiodata(response.data);
      } catch (error) {
        console.error("Error fetching biodata details:", error.response ? error.response.data : error);
      }
    };

    if (biodataId) fetchBiodataDetails();
  }, [biodataId, axiosPublic]);

  if (!biodata) {
    return <div>Loading...</div>;  // Show a loading message while the data is being fetched
  }

  return (
    <div className="flex justify-center py-4">
      <Card className="w-full max-w-6xl">
        <CardHeader shadow={false} floated={false} className="h-[400px]">
          <img
            src={biodata.profileImage || "https://via.placeholder.com/500"}
            alt={`Biodata ${biodata.biodataId}`}
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="px-6 py-4">
          <Typography color="blue-gray" className="font-medium text-xl mb-2">
            {biodata.name}
          </Typography>

          {biodata.isPremium && (
            <Typography color="green" variant="small" className="font-medium mb-2 text-sm">
              Premium User{" "}
              <CheckIcon className="inline-block h-4 w-4 text-green-500" />
            </Typography>
          )}

          <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
            Biodata Id: {biodata.biodataId || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
            Age: {biodata.age || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
            Date of Birth: {biodata.dob || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
            Biodata Type: {biodata.biodataType || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
            Race: {biodata.race || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
            Height: {biodata.height || "N/A"} | Weight: {biodata.weight || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
            Occupation: {biodata.occupation || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
            Father's Name: {biodata.fathersName || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
            Mother's Name: {biodata.mothersName || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
            Permanent Division: {biodata.permanentDivision || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
            Present Division: {biodata.presentDivision || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
            Expected Partner Age: {biodata.expectedPartnerAge || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
            Expected Partner Height: {biodata.expectedPartnerHeight || "N/A"}
          </Typography>
          <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
            Expected Partner Weight: {biodata.expectedPartnerWeight || "N/A"}
          </Typography>

          {biodata.isPremium ? (
            <>
              <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
                Email: {biodata.email || "N/A"}
              </Typography>
              <Typography color="gray" className="text-md font-normal opacity-75 mb-1">
                Mobile: {biodata.mobile || "N/A"}
              </Typography>
            </>
          ) : (
            <Typography
              color="blue"
              className="text-md font-normal opacity-75 mb-1 cursor-pointer"
              onClick={() => alert("Request to view contact information has been submitted.")}
            >
              [Email & Mobile] ▶️ Make a Request 📩
            </Typography>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Biodata_Details;
*/
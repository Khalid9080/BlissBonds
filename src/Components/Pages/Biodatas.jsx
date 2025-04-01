import React, { useContext, useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import BiodataFilter from "./BiodataFilter";
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

// In Biodatas.jsx
const Biodatas = () => {
  const axiosPublic = useAxiosPublic();
  const [biodataList, setBiodataList] = useState([]);
  const [filteredBiodatas, setFilteredBiodatas] = useState([]);
  const { user } = useContext(AuthContext);

  const [filters, setFilters] = useState({
    ageRange: "",
    biodataType: "",
    division: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/get-create-edit-biodata");
        let shuffled = response.data.sort(() => 0.5 - Math.random());
        let selectedBiodatas = shuffled.slice(0, 20);
        setBiodataList(selectedBiodatas);
        setFilteredBiodatas(selectedBiodatas);
      } catch (error) {
        console.error("Error fetching biodata:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  // Apply filters
  useEffect(() => {
    let filtered = biodataList;

    if (filters.ageRange) {
      const [min, max] = filters.ageRange.split("-").map(Number);
      filtered = filtered.filter((b) => b.age >= min && b.age <= max);
    }

    if (filters.biodataType) {
      filtered = filtered.filter((b) => b.biodataType === filters.biodataType);
    }

    if (filters.division) {
      filtered = filtered.filter((b) => b.permanentDivision === filters.division);
    }

    setFilteredBiodatas(filtered);
  }, [filters, biodataList]);

  return (
    <div className="flex flex-col mx-auto ">
      <Helmet>
        <title>Bliss Bonds - Biodatas page</title>
      </Helmet>
      <h1 className="gloock-regular sm:text-5xl text-4xl text-center mt-20"> Biodatas of the BlissBonds Website</h1>
      <p className="gilda-display-regular text-lg text-center mt-5">Where we can find the preferable biodata through your intrest</p>

      <div className="flex flex-col lg:flex-row w-full mt-10">
        <div className="w-full mx-auto md:mx-0 min-w-[250px] p-4 rounded-md">
          <h2 className="gilda-display-regular text-2xl mb-3 text-center font-bold gloock-regular">Filter your biodata</h2>
          <BiodataFilter filters={filters} setFilters={setFilters} />
        </div>

        <div className="sm:w-3/4 grid md:grid-cols-2 grid-cols-1 gap-8">
          {filteredBiodatas.length > 0 ? (
            filteredBiodatas.map((biodata) => (
              <Card key={biodata.biodataId} className="w-full">
                <CardHeader shadow={false} floated={false} className="h-[400px]">
                  <img
                    src={biodata.profileImage || "https://via.placeholder.com/500"}
                    alt={biodata.biodataId}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody className="px-6 py-4">
                  <Typography color="blue-gray" className="font-medium text-xl mb-2 gilda-display-regular">
                    Biodata Id: {biodata.biodataId || "N/A"}
                  </Typography>
                  <Typography color="black" className="text-lg font-normal mb-1 gilda-display-regular">
                    Biodata Type: {biodata.biodataType || "N/A"}
                  </Typography>
                  <Typography color="gray" className="text-md text-black font-normal opacity-75 mb-1 gilda-display-regular">
                    Permanent Address: {biodata.permanentDivision || "N/A"}
                  </Typography>
                  <Typography color="gray" className="text-md font-normal text-black opacity-75 mb-1 gilda-display-regular">
                    Age: {biodata.age || "N/A"}
                  </Typography>
                  <Typography color="gray" className="text-md font-normal text-black opacity-75 mb-1 gilda-display-regular">
                    Occupation: {biodata.occupation || "N/A"}
                  </Typography>
                </CardBody>
                <div className="p-4 text-center">
                  {/* <Button
                  ripple={true}
                  fullWidth={true}
                  className="bg-blue-500 text-white shadow-none hover:scale-105"
                  onClick={() => navigate(`/biodata-details/${biodata.biodataId}`)} // Navigate with the biodataId
                >
                  View Profile
                </Button> */}

                  <Button
                    ripple={true}
                    fullWidth={true}
                    className="bg-gray-900 text-white shadow-none hover:scale-105 gilda-display-regular"
                    onClick={() => {
                      // First action: Check if the user is logged in and navigate accordingly
                      if (user) {
                        navigate("/checkout", {
                          state: {
                            email: biodata.email,
                            biodataId: biodata.biodataId,
                            name: biodata.name,
                          },
                        });
                        navigate(`/biodata-details/${biodata.biodataId}`);
                      } else {
                        navigate("/login");
                      }
                      // Second action: Also navigate to the biodata details page
                      // Note: Once you navigate to a new page, the component unmounts so the second call may not take effect.

                    }}
                  >
                    View Profile
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Typography color="gray" className="mt-10 text-center col-span-2">
              No biodata found.
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};


export default Biodatas;

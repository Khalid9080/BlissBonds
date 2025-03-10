import React, { useEffect, useState } from "react";
import { Typography, Card, Button } from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { GiLovers } from "react-icons/gi";
import { IoManOutline } from "react-icons/io5";
import { GrUserFemale } from "react-icons/gr";
function StatsCard({ count, title, description, Icon }) {
  return (
    <Card
      color="transparent"
      shadow={true}
      className="bg-gray-100 p-6 flex flex-col justify-between h-full"
    >
      <div className="flex items-center">
        {/* Icon placed beside the count */}
        <div className="flex items-center justify-center ">
          <div>
            <Typography
              variant="gradient"
              className="text-4xl font-bold mr-3"
              color="blue-gray"
            >
              {count}
            </Typography>
          </div>

          <div className="text-pink-500 bg-pink-100 p-3 rounded-full">
            <Icon className="text-4xl" />
          </div>

        </div>

      </div>
      <hr className="mt-2 mb-4 max-w-xs" />
      <Typography variant="h5" color="blue-gray" className="mt-1 font-bold">
        {title}
      </Typography>
      <Typography className="text-base max-w-xs font-normal leading-7 !text-gray-500">
        {description}
      </Typography>
    </Card>
  );
}

function SuccessCounter() {
  const axiosPublic = useAxiosPublic();
  const [stats, setStats] = useState({
    totalMarriageCount: 0,
    maleBiodata: 0,
    femaleBiodata: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch Success Stories for Marriage Count
        const successRes = await axiosPublic.get("/success-stories");
        const successData = successRes.data;
        const totalMarriageCount = successData.length;

        // Fetch biodata records for male and female counts
        const biodataRes = await axiosPublic.get("/get-create-edit-biodata");
        const biodataData = biodataRes.data;

        const maleBiodata = biodataData.filter(
          (item) => item.biodataType && item.biodataType.toLowerCase() === "male"
        ).length;

        const femaleBiodata = biodataData.filter(
          (item) => item.biodataType && item.biodataType.toLowerCase() === "female"
        ).length;

        setStats({
          totalMarriageCount,
          maleBiodata,
          femaleBiodata,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [axiosPublic]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Button className="rounded-full" loading={true}>
          Loading
        </Button>
      </div>
    );
  }

  return (
    <section className="py-6 px-8 container mx-auto ">
      <div className="lg:mb-10 mb-5  ">
        <Typography
          color="blue-gray"
          className=" text-2xl font-bold lg:!text-2xl text-center gloock-regular "
        >
          Success Stories and Stats
        </Typography>
        <Typography  className="w-full !text-gray-700 max-w-xl mx-auto text-center text-lg gilda-display-regular mt-3 font-bold">
          Discover how many marriages have been successful, and check out our biodata stats.
        </Typography>
      </div>
      <div className="grid gap-5 lg:grid-cols-1 lg:gap-12 xl:grid-cols-2 items-center">
        <Card className="bg-gray-100/50 py-6 text-center" shadow={true}>
          <Typography
            variant="h1"
            className="!text-green-500 !leading-snug text-5xl"
          >
            <div className="flex items-center justify-center gap-3">
              <div>{stats.totalMarriageCount}</div>
              <div> <GiLovers /></div>
            </div>

          </Typography>
          <Typography variant="h5" color="blue-gray" className="mt-2 font-bold ">
            Total Marriage Count
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mt-10 font-bold ">
            Total marriages achieved through BlissBond
          </Typography>
          <Typography
            variant="lead"
            className="mt-1 text-base mx-auto !text-gray-500 lg:w-8/12"
          >
            These are the successful stories that showcase the power of connection.
          </Typography>
        </Card>
        <div className="grid lg:grid-cols-2 gap-10 gap-x-10 ">
          {/* Male Biodata Card */}
          <StatsCard
            count={stats.maleBiodata}
            title="Total Male Biodata Count"
            description="The total number of male biodata profiles available in the system."
            Icon={IoManOutline} // Pass icon as prop
          />
          {/* Female Biodata Card */}
          <StatsCard
            count={stats.femaleBiodata}
            title="Total Female Biodata Count"
            description="The total number of female biodata profiles available in the system."
            Icon={GrUserFemale} // Pass icon as prop
          />
        </div>
      </div>
    </section>
  );
}

export default SuccessCounter;
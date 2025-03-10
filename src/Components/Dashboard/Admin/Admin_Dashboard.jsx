import React, { useEffect, useState } from "react";
import { Typography, Card, Button } from "@material-tailwind/react";

import PieChart from "./Pie/PieChart";
import Admin_SuccessStories from "./Story/Admin_SuccessStories";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function StatsCard({ count, title, description }) {
  return (
    <Card color="transparent" shadow={false}>
      <Typography
        variant="gradient"
        className="text-4xl font-bold"
        color="blue-gray"
      >
        {count}
      </Typography>
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

function StatsSection8() {
  const axiosPublic = useAxiosPublic();
  const [stats, setStats] = useState({
    totalBiodata: 0,
    maleBiodata: 0,
    femaleBiodata: 0,
    premiumBiodata: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch biodata records from the database
        const biodataRes = await axiosPublic.get("/get-create-edit-biodata");
        const biodataData = biodataRes.data;
        console.log("Biodata Data:", biodataData); // Debugging log

        const totalBiodata = biodataData.length;
        // const maleBiodata = biodataData.filter(
        //   (item) => item.gender === "male"
        // ).length;
        // const femaleBiodata = biodataData.filter(
        //   (item) => item.gender === "female"
        // ).length;
        const maleBiodata = biodataData.filter(
          (item) =>
            item.biodataType &&
            item.biodataType.toLowerCase() === "male"
        ).length;

        const femaleBiodata = biodataData.filter(
          (item) =>
            item.biodataType &&
            item.biodataType.toLowerCase() === "female"
        ).length;

        const premiumBiodata = biodataData.filter(
          (item) => item.isPremium
        ).length;

        // Fetch contact requests to calculate total revenue
        const contactRes = await axiosPublic.get("/get-my-contact-requests");
        const contactData = contactRes.data;
        const totalRevenue = contactData.reduce(
          (acc, req) => acc + parseFloat(req.amount || 0),
          0
        );

        setStats({
          totalBiodata,
          maleBiodata,
          femaleBiodata,
          premiumBiodata,
          totalRevenue,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
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
    <section className=" py-10 px-8 container mx-auto">
      <div className="lg:mb-24 mb-10">
        <Typography
          color="blue-gray"
          className="mb-4 !text-2xl font-bold lg:!text-5xl gloock-regular text-center"
        >
          Admin Dashboard of BlissBonds Website
        </Typography>
        <Typography variant="lead" className="w-full !text-gray-500 max-w-xl gilda-display-regular text-lg text-center mx-auto">
          We&apos;re constantly trying to express ourselves and actualize our
          dreams. If you have the opportunity to play
        </Typography>
      </div>
      <div className="grid gap-10 lg:grid-cols-1 lg:gap-24 xl:grid-cols-2 items-center">
        <Card className="bg-gray-100/50 py-24 text-center" shadow={true}>
          <Typography
            variant="h1"
            className="!text-green-500 !leading-snug text-5xl"
          >
            ${stats.totalRevenue.toFixed(2)}
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mt-2 font-bold">
            Total Revenue
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mt-10 font-bold">
            Total revenue for purchasing contact information
          </Typography>
          <Typography
            variant="lead"
            className="mt-1 text-base mx-auto !text-gray-500 lg:w-8/12"
          >
            Congratulations on reaching a new milestone in matrimony system!
          </Typography>
        </Card>
        <div>
          <div className="grid lg:grid-cols-2 gap-10 gap-x-20">
            <StatsCard
              float={true}
              shadow={true}
              count={stats.totalBiodata}
              title="Total Biodata Count"
              description="The total number of biodata profiles available in the system."
              className="bg-gray-100/50"
            />
            <StatsCard
              count={stats.maleBiodata}
              title="Total Male Biodata Count"
              description="The total number of male biodata profiles available in the website."
            />
            <StatsCard
              count={stats.femaleBiodata}
              title="Total Female Biodata Count"
              description="The total number of female biodata profiles available in the website."
            />
            <StatsCard
              count={stats.premiumBiodata}
              title="Total Premium Biodata Count"
              description="The total number of premium biodata profiles available in the website."
            />
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-center gloock-regular my-10 text-4xl"> Pie Chart of the BlissBonds</h1>
        <div className="flex flex-col items-center justify-center gap-2">
          <Typography variant="h6" color="blue-gray" className="font-bold text-center ">
            Biodata Distribution Pie Chart
          </Typography>
          <Typography variant="small" color="gray" className="max-w-sm font-normal text-cente">
            Visual representation of biodata statistics in BlissBonds.
          </Typography>
        </div>
        <PieChart></PieChart>
      </div>
    </section>
  );
}

const Admin_Dashboard = () => {
  return (
    <div>
      <StatsSection8 />
      <div className="mb-10">
        <Admin_SuccessStories></Admin_SuccessStories>
      </div>
      
    </div>
  );
};

export default Admin_Dashboard;

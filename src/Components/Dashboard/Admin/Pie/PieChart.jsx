import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";

import useAxiosPublic from "../../../hooks/useAxiosPublic";


const PieChart = () => {
  const axiosPublic = useAxiosPublic();
  const [chartData, setChartData] = useState({
    series: [0, 0, 0, 0], // Default values
    labels: ["Total Biodata", "Male Biodata", "Female Biodata", "Premium Biodata"],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const biodataRes = await axiosPublic.get("/get-create-edit-biodata");
        const biodataData = biodataRes.data;

        const totalBiodata = biodataData.length;
        const maleBiodata = biodataData.filter(item => item.biodataType?.toLowerCase() === "male").length;
        const femaleBiodata = biodataData.filter(item => item.biodataType?.toLowerCase() === "female").length;
        const premiumBiodata = biodataData.filter(item => item.isPremium).length;

        setChartData({
          series: [totalBiodata, maleBiodata, femaleBiodata, premiumBiodata],
          labels: ["Total Biodata", "Male Biodata", "Female Biodata", "Premium Biodata"],
        });
      } catch (error) {
        console.error("Error fetching biodata stats:", error);
      }
    };

    fetchStats();
  }, [axiosPublic]);

  return (
    <div>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
       
        
      </CardHeader>
      <CardBody className="mt-4 grid place-items-center px-2">
        <Chart
          options={{
            chart: { type: "pie" },
            labels: chartData.labels,
            colors: ["#4CAF50", "#FF9800", "#2196F3", "#D32F2F"], // Different colors
            legend: { position: "bottom" },
          }}
          series={chartData.series}
          type="pie"
          width={320}
          height={320}
        />
      </CardBody>
    </div>
  );
};

export default PieChart;

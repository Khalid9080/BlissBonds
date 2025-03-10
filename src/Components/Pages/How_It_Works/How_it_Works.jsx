import React from "react";
import {
  Card,
  CardBody,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import porfile from "../../../assets/HomePageIcons/profile.png";
import matching from "../../../assets/HomePageIcons/icons8-merge-48.png";
import communication from "../../../assets/HomePageIcons/icons8-communication-48.png";
import support from "../../../assets/HomePageIcons/support.png";
import partner from "../../../assets/HomePageIcons/partner.png";

const steps = [
  {
    title: "Create Your Profile",
    description:
      "Start your journey by creating a detailed profile. Share your values, interests, and expectations to help us find your ideal match. Your privacy is our priority, ensuring only relevant matches can view your profile.",
    img: porfile,
  },
  {
    title: "Intelligent Matchmaking",
    description:
      "Our smart matchmaking algorithm analyzes your preferences and connects you with individuals who align with your relationship goals and lifestyle.",
    img: matching,
  },
  {
    title: "Seamless Communication",
    description:
      "Get to know your matches through our secure communication tools. From instant messaging to video calls, we provide a safe space to explore meaningful connections.",
    img: communication,
  },
  {
    title: "Expert Support & Advice",
    description:
      "BlissBonds is more than a matchmaking platform. Our relationship advisors offer guidance, dating tips, and support to help you build a successful relationship.",
    img: support,
  },
  {
    title: "Find Your Perfect Partner",
    description:
      "BlissBonds is committed to helping you create a lasting bond. We guide you every step of the way, from the first match to a lifelong relationship.",
    img: partner,
    fullWidth: true,
  },
];

const HowBlissBondsWorks = () => {
  return (
    <section className="px-8 lg:py-10">
      <div className="container mx-auto mt-10">
        <Typography
          variant="h2"
          className="mb-4 text-center text-5xl font-bold gloock-regular"
        >
          How BlissBonds Works
        </Typography>
        <Typography
         
          className=" text-lg max-w-3xl text-center mx-auto  mb-10 lg:mb-16 gilda-display-regular"
        >
          Discover how BlissBonds helps you find a life partner with ease, security, and genuine compatibility.
        </Typography>
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {steps.map((step, key) => (
            <Card
              key={key}
              shadow={false}
              className={`bg-gray-100/50 rounded-2xl shadow-md  p-6 ${step.fullWidth ? 'lg:col-span-2 w-full' : ''}`}
            >
              <CardBody className="flex flex-row gap-6 items-start ">
                <img src={step.img} className="w-16 h-16" alt={step.title} />
                <div className="flex flex-col">
                  <Typography color="blue-gray" className="text-2xl gilda-display-regular font-extrabold">
                    {step.title}
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-900 mt-2 gilda-display-regular">
                    {step.description}
                  </Typography>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowBlissBondsWorks;

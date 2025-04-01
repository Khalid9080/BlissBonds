import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import porfile from "../../../assets/HomePageIcons/profile.png";
import matching from "../../../assets/HomePageIcons/icons8-merge-48.png";
import communication from "../../../assets/HomePageIcons/icons8-communication-48.png";
import support from "../../../assets/HomePageIcons/support.png";
import partner from "../../../assets/HomePageIcons/partner.png";

// Import Framer Motion
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Define the steps
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
  const controls = useAnimation();

  // Set up InView for animation trigger
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <section className="px-8 lg:py-10">
      <div className="container mx-auto mt-10">
        <div>
          {/* Title with slide-in animation */}
          <motion.div
            initial={{ opacity: 0, y: 100 }} // Hidden initially, positioned below
            whileInView={{ opacity: 1, y: 0 }} // When in view, it becomes visible and slides up
            transition={{ duration: 1, ease: "easeOut" }} // Smooth slide animation
            viewport={{ once: false, amount: 0.1 }} // Triggers when the element is in view
          >
            <Typography
              variant="h2"
              className="mb-4 text-center text-5xl font-bold gloock-regular"
            >
              How BlissBonds Works
            </Typography>
          </motion.div>

          {/* Subtitle with slide-in animation */}
          <motion.div
            initial={{ opacity: 0, y: 100 }} // Hidden initially, positioned below
            whileInView={{ opacity: 1, y: 0 }} // Slide up and become visible
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.1 }} // Animation triggered when section is in view
          >
            <Typography
              className="text-lg max-w-3xl text-center mx-auto mb-10 lg:mb-16 gilda-display-regular"
            >
              Discover how BlissBonds helps you find a life partner with ease, security, and genuine compatibility.
            </Typography>
          </motion.div>
        </div>

        {/* Apply the ref to trigger animations on scroll */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2" ref={ref}>
          {steps.map((step, key) => {
            // Apply animation only if the card is not the fullWidth card
            const isFullWidth = step.fullWidth;

            return (
              <motion.div
                key={key}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.5, delay: key * 0.2 },
                  },
                }}
                // Skip animations for the "Find Your Perfect Partner" card
                className={isFullWidth ? "lg:col-span-2 w-full h-full" : "h-full"}
              >
                <Card
                  shadow={false}
                  className={`bg-gray-100/50 rounded-2xl shadow-md p-6 ${isFullWidth ? "lg:col-span-2 w-full" : ""
                    } h-full`} // Ensure the card takes full height
                >
                  <CardBody className="flex flex-col gap-6 items-start h-full">
                    <img src={step.img} className="w-16 h-16" alt={step.title} />
                    <div className="flex flex-col flex-grow">
                      <Typography color="blue-gray" className="text-2xl gilda-display-regular font-extrabold">
                        {step.title}
                      </Typography>
                      <Typography variant="paragraph" className="text-gray-900 mt-2 gilda-display-regular">
                        {step.description}
                      </Typography>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowBlissBondsWorks;

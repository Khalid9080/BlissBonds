import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Typography, Rating } from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useInView } from "react-intersection-observer";

const Story_Form = () => {
  const [stories, setStories] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axiosPublic.get("/success-stories");

        if (response.data && response.data.length > 0) {
          // Shuffle the stories randomly and take 6 stories
          const shuffledStories = response.data.sort(() => 0.5 - Math.random()).slice(0, 6);
          setStories(shuffledStories);
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 py-10 px-6">
      {stories.length > 0 ? (
        stories.map((story, index) => (
          <StoryCard key={index} story={story} />
        ))
      ) : (
        <Typography className="text-center w-full text-gray-500">
          Loading stories...
        </Typography>
      )}
    </div>
  );
};

const StoryCard = ({ story }) => {
  // Using the useInView hook to trigger animation when the card is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Triggers the animation only once
    threshold: 0.3, // The card will trigger the animation when it comes into view by 30%
  });

  return (
    <div
      ref={ref}
      className={`w-full max-w-[45rem] flex flex-row h-72 rounded-lg shadow-md overflow-hidden transition-all duration-700 ease-in-out ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
      }`}
    >
      {/* Image Section */}
      <CardHeader shadow={false} floated={false} className="m-0 w-1/3 max-h-72 rounded-none">
        <img
          src={
            story.imageUrl ||
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
          }
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>

      {/* Content Section */}
      <CardBody className="w-2/3  flex flex-col justify-between">
        <Typography variant="h6" color="blue-gray" className="font-bold">
          {story.marriageDate
            ? new Date(story.marriageDate).toDateString()
            : "No Date Provided"}
        </Typography>

        {/* Rating Moved Above Description */}
        <div className="">
          <Rating value={parseInt(story.reviewStars)} readonly />
        </div>

        <Typography color="gray" className="text-sm leading-relaxed line-clamp-4 gilda-display-regular">
          {story.successStory || "No Story Provided"}
        </Typography>
      </CardBody>
    </div>
  );
};

export default Story_Form;

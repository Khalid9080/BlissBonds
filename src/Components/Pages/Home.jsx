import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import axios from "axios";
import slider_1 from "../../assets/Banner/slider-1.png";
import slider_2 from "../../assets/Banner/slider-2.png";
import slider_3 from "../../assets/Banner/slider-3.png";
import slider_4 from "../../assets/Banner/slider-4.png";
import { HompageStat } from "./Stat/HomePageStat";
import { SuccessStoryCard } from "./Stat/SuccessStoryCard";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Success_Story from "./Success/Success_Story";
import Story_From from "./Success/Story_From";
import Success_Counter from "./Success/Success_Counter";
import How_it_Works from "./How_It_Works/How_it_Works";
import { Helmet } from "react-helmet-async";


const Home = () => {
    const [premiumMembers, setPremiumMembers] = useState([]);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPremiumMembers = async () => {
            try {
                const response = await axiosPublic.get("/get-create-edit-biodata");
                const premiumUsers = response.data.filter(user => user.isPremium).slice(0, 6);
                setPremiumMembers(premiumUsers);
            } catch (error) {
                console.error("Error fetching premium members:", error);
            }
        };
        fetchPremiumMembers();
    }, []);

    return (
        <div className='mt-16'>
            <Helmet>
                <title>Bliss Bonds - Home</title>
            </Helmet>
            <div className='text-center space-y-5 my-10'>
                <h1 className='text-5xl font-bold gloock-regular'>BlissBonds</h1>
                <h3 className='text-2xl font-bold gloock-regular text-pink-500'>Where Love Finds Its Forever</h3>
                <p className=' gilda-display-regular w-10/12 mx-auto '>
                    Where Dreams Begin and Love Lasts Forever – Your Premier Wedding Platform for Creating Magical Moments, Curating Unforgettable Experiences, and Bringing Your Perfect Love Story to Life. From Personalized Planning to Elegant Inspirations, We’re Here to Make Every Step of Your Journey as Beautiful as Your Forever Bond.
                </p>
            </div>
            <Carousel loop={true} autoplay={true} className="rounded-xl">
                <img src={slider_1} alt="image 1" className="h-full w-full object-cover object-center" />
                <img src={slider_2} alt="image 2" className="h-full w-full object-cover object-center" />
                <img src={slider_3} alt="image 3" className="h-full w-full object-cover object-center" />
                <img src={slider_4} alt="image 4" className="h-full w-full object-cover object-center" />
            </Carousel>

            <section >
                <h1 className='text-5xl font-bold gloock-regular mt-24 text-center '>Our Premium Members</h1>
                <p className='text-center font-light gilda-display-regular mt-8  w-10/12 mx-auto'>
                    Welcome to Blissbonds Premium Membership – Where Exceptional Matches Are Made! Our premium members enjoy exclusive benefits and personalized services to help them find their perfect match. Join our community of distinguished individuals who are serious about finding love and building lasting relationships.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center px-4 mt-16">
                    {premiumMembers.length > 0 ? (
                        premiumMembers.map(member => (
                            <Card key={member.biodataId} className="w-full">
                                <CardHeader color="blue-gray" className="relative h-56" shadow={true} floated={false}>
                                    <img src={member.profileImage || "https://via.placeholder.com/500"} alt={member.biodataId} className="h-full w-full object-cover" />
                                    <div className="absolute top-44 left-6 bg-green-600 text-white text-xs px-2 py-1 rounded gloock-regular">Premium</div>
                                </CardHeader>
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2 gloock-regular text-black ">
                                        Biodata ID: {member.biodataId}
                                    </Typography>
                                    <Typography className="gilda-display-regular">
                                        Age: {member.age}
                                    </Typography>
                                    <Typography className="gilda-display-regular">
                                        Permanent Division: {member.permanentDivision}
                                    </Typography>
                                    <Typography className="gilda-display-regular">
                                        Occupation: {member.occupation}
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0 ">
                                    <Button className=" gilda-display-regular"onClick={() => navigate(`/biodata-details/${member.biodataId}`)}>View Profile</Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <Typography className="text-center text-gray-500 gilda-display-regular">No premium members available</Typography>
                    )}
                </div>
            </section>

            <section >
                {/* <h1 className='text-5xl font-bold gloock-regular text-center'>How It Works</h1> */}
                <How_it_Works></How_it_Works>
            </section>

            <section className="my-5">
                <h1 className='text-5xl font-bold gloock-regular text-center'>Success Counter</h1>
                <Success_Counter></Success_Counter>
            </section>

            <section className="mt-20">
            <h1 className='text-5xl font-bold gloock-regular text-center '>Success Stories</h1>
            <p className="text-center mt-8 gilda-display-regular text-lg "> ✨ Inspiring Success Stories from BlissBonds: Real Couples, Real Love, and Everlasting Bonds! 💍❤️</p>
                <Story_From></Story_From>
                <div className="mt-20"><Success_Story></Success_Story></div>
               
            </section>
        </div>
    );
};

export default Home;

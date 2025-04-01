import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

// Import Framer Motion
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Success_Story = () => {
    const axiosPublic = useAxiosPublic();
    const [formData, setFormData] = useState({
        marriageDate: new Date(),
        reviewStars: "",
        imageUrl: "",
        successStory: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle DatePicker change
    const handleDateChange = (date) => {
        setFormData({ ...formData, marriageDate: date });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPublic.post("/success-stories", formData);
            
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Story submitted successfully!",
                showConfirmButton: false,
                timer: 2000,
            });

            console.log("Response:", response.data);

            // Clear form after submission
            setFormData({ marriageDate: new Date(), reviewStars: "", imageUrl: "", successStory: "" });

        } catch (error) {
            console.error("Error submitting story:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to submit story. Please try again.",
            });
        }
    };

    // Animation control with Framer Motion
    const controls = useAnimation();
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
        <div>
            <motion.section
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1.5 },
                    },
                }}
                className="px-8 py-8 lg:py-16 bg-gradient-to-b from-pink-50 to-white rounded-xl mb-10"
            >
                <div className="container mx-auto text-center">
                    <Typography variant="h1" className="mb-4 !text-3xl lg:!text-5xl gloock-regular">
                        Send Us Your Success Stories
                    </Typography>
                    <Typography variant="h5" className="mb-4 !text-base lg:!text-2xl gilda-display-regular">
                        Your Moments
                    </Typography>
                    <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl text-black gilda-display-regular">
                        The best way to inspire others is to share your success stories with us. 
                        Share your journey with BlissBonds and let us help you spread the love.
                    </Typography>

                    <motion.div
                        initial="hidden"
                        animate={controls}
                        variants={{
                            hidden: { opacity: 0, y: 100 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 1.5, delay: 0.3 },
                            },
                        }}
                        className="flex justify-center"
                    >
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:max-w-sm">
                            <Typography variant="small" className="text-left !font-semibold text-black gilda-display-regular">
                                Make Your Story
                            </Typography>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Typography variant="small" className="mb-2 text-left font-medium text-black gilda-display-regular">
                                        Marriage Date
                                    </Typography>
                                    <DatePicker 
                                        selected={formData.marriageDate} 
                                        onChange={handleDateChange}
                                        className="w-full p-2 border border-gray-300 rounded bg-red-50"
                                    />
                                </div>
                                <div>
                                    <Typography variant="small" className="mb-2 text-left font-medium text-black gilda-display-regular">
                                        Review Star
                                    </Typography>
                                    <Input
                                        type="number"
                                        min="1"
                                        max="5"
                                        name="reviewStars"
                                        placeholder="Rate 1-5"
                                        value={formData.reviewStars}
                                        onChange={handleChange}
                                        required
                                        className="focus:border-t-gray-900 border-black"
                                        containerProps={{
                                            className: "!min-w-full",
                                        }}
                                        labelProps={{
                                            className: "hidden",
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <Typography variant="small" className="mb-2 text-left font-medium text-black gilda-display-regular">
                                    Couple / Male / Female Image Link
                                </Typography>
                                <Input
                                    type="text"
                                    name="imageUrl"
                                    placeholder="Image URL"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    required
                                    className="focus:border-t-gray-900 border-black"
                                    containerProps={{
                                        className: "!min-w-full",
                                    }}
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                />
                            </div>

                            <div>
                                <Typography variant="small" className="mb-2 text-left font-medium text-black gilda-display-regular">
                                    Success Story
                                </Typography>
                                <Textarea
                                    rows={6}
                                    name="successStory"
                                    placeholder="Your Story"
                                    value={formData.successStory}
                                    onChange={handleChange}
                                    required
                                    className="focus:border-t-gray-900 border-black"
                                    containerProps={{
                                        className: "!min-w-full",
                                    }}
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                />
                            </div>

                            <Button type="submit" className="w-full" color="gray">
                                Send Story
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Success_Story;

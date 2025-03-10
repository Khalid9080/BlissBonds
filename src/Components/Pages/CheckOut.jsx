import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import {
    CreditCardIcon,
    LockClosedIcon,
} from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const axiosPublic = useAxiosPublic();

function formatCardNumber(value) {
    const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
}

function formatExpires(value) {
    return value
        .replace(/[^0-9]/g, "")
        .replace(/^([2-9])$/g, "0$1")
        .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
        .replace(/^0{1,}/g, "0")
        .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}

const CheckOut = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpires, setCardExpires] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const { email, biodataId, name } = location.state || {};

    const handlePayment = async () => {
        if (!amount || amount < 5) {
            Swal.fire("Error", "Minimum payment amount is $5", "error");
            return;
        }
        setLoading(true);
        const paymentData = {
            biodataId,
            email,
            name,
            amount,
            cardNumber,
            status: "Pending",
        };

        try {
            const response = await axiosPublic.post("/store-payment", paymentData);
            if (response.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your payment has been submitted!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Payment failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col ">
            <Helmet>
                <title>Bliss Bonds - Checkout</title>
            </Helmet>
            <h1 className="gloock-regular text-center mt-10 text-5xl">Make Payment Through wallet</h1>
            <p className=" text-center mt-5 text-lg gilda-display-regular">Secure & Hassle-Free Payments – Choose Your Plan and Find Your Perfect Match</p>
            <Card className="w-full max-w-[24rem] mx-auto mt-20">
                <CardHeader color="gray" floated={false} shadow={false} className="m-0 grid place-items-center px-4 py-8 text-center">
                    <div className="mb-4 h-20 p-6 text-white">
                        <CreditCardIcon className="h-10 w-10 text-white" />
                    </div>
                    <Typography variant="h5" color="white">
                        Checkout
                    </Typography>
                </CardHeader>
                <CardBody>
                    <Tabs value="card" className="overflow-visible">
                        <TabsHeader className="relative z-0">
                            <Tab value="card">Pay with Card</Tab>
                        </TabsHeader>
                        <TabsBody>
                            <TabPanel value="card" className="p-0">
                                <form className="mt-12 flex flex-col gap-4">
                                    <div>
                                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                            Your Email
                                        </Typography>
                                        <Input
                                            type="email"
                                            placeholder="name@mail.com"
                                            value={email || ""}
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{ className: "before:content-none after:content-none" }}
                                        />
                                    </div>
                                    <div>
                                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                            Your Name
                                        </Typography>
                                        <Input
                                            placeholder="Your Name"
                                            value={name || ""}
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{ className: "before:content-none after:content-none" }}
                                        />
                                    </div>

                                    <div className="my-3">
                                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium ">
                                            Stripe Card Number
                                        </Typography>

                                        <Input
                                            maxLength={19}
                                            value={formatCardNumber(cardNumber)}
                                            onChange={(event) => setCardNumber(event.target.value)}
                                            icon={<CreditCardIcon className="absolute left-0 h-4 w-4 text-blue-gray-300" />}
                                            placeholder="0000 0000 0000 0000"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{ className: "before:content-none after:content-none" }}
                                        />
                                        <div className="my-4 flex items-center gap-4">
                                            <div>
                                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                                    Biodata ID
                                                </Typography>
                                                <Input
                                                    maxLength={5}
                                                    value={cardExpires ? formatExpires(cardExpires) : (biodataId || "")}
                                                    onChange={(event) => setCardExpires(event.target.value)}
                                                    containerProps={{ className: "min-w-[72px]" }}
                                                    placeholder="00"
                                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                    labelProps={{ className: "before:content-none after:content-none" }}


                                                />
                                            </div>
                                            <div>
                                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                                    Enter Amount
                                                </Typography>
                                                <Input
                                                    type="number"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    maxLength={4}
                                                    containerProps={{ className: "min-w-[72px]" }}
                                                    placeholder="At least $5"
                                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                    labelProps={{ className: "before:content-none after:content-none" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Button onClick={handlePayment} size="lg" disabled={loading}>
                                        {loading ? "Processing..." : "Pay Now"}
                                    </Button>
                                    <Typography variant="small" color="gray" className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60">
                                        <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are secure and encrypted
                                    </Typography>
                                </form>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    );
};

export default CheckOut;

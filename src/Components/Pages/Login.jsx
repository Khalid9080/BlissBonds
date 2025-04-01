import React, { useContext, useState } from 'react';
import {
    Card,
    Input,
    Button,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const { googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn, setUser } = useContext(AuthContext);
    const [error, setError] = useState({});

    // const handleGoogleSignIn = () => {
    //     googleSignIn()
    //         .then(result => {
    //             const user = result.user;
    //             setUser(user);
    //             const userInfo = {
    //                 email: user?.email,
    //                 name: user?.displayName,
    //             }
    //             axiosPublic.post('/users', userInfo)
    //                 .then(res => {
    //                     console.log(res.data)
    //                     navigate('/');
    //                 })

    //             toast.success("Login successful");
    //         })
    // }

    const from = location.state?.from || { pathname: "/" };

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            const user = result.user;
            setUser(user);

            // Fetch the JWT Token from Firebase
            const token = await user.getIdToken(); // ✅ Correctly get the token

            // Store token in localStorage
            localStorage.setItem("Access-token", token);

            // Send user info to the backend
            const userInfo = {
                email: user?.email,
                name: user?.displayName,
            };

            await axiosPublic.post("/users", userInfo, {
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ Send the token in headers
                },
            });

            toast.success("Login successful");
            navigate("/");
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            toast.error("Google Sign-In failed");
        }
    };





    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const LoginData = { email, password };
        console.log(LoginData);

        setError({}); // Reset errors

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError((prev) => ({
                ...prev,
                email: "Invalid email address.",
            }));
            toast.error("Invalid email address.");
            return;
        }

        // Password validation
        if (password.length < 6) {
            setError((prev) => ({
                ...prev,
                password: "Password must be at least 6 characters long.",
            }));
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        signIn(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                // navigate('/');
                navigate(from, { replace: true });
                toast.success("Login successful");
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    };

    return (
        <Card
            shadow={true}
            className="md:px-24 md:py-14 py-8 border border-gray-300 my-10 sm:w-6/12 w-10/12 mx-auto"
        >
            <Helmet>
                <title>Bliss Bonds - Login</title>
            </Helmet>
            <ToastContainer />
            <Typography variant="h4" color="blue-gray" className='mx-auto text-center text-4xl mb-3 '>
                Login Page
            </Typography>
            <Typography color="gray" className="mt-1 font-normal mx-auto text-center">
                Nice to meet you! Enter your details to Login.
            </Typography>
            <CardBody>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email">
                            <Typography
                                variant="paragraph"
                                color="blue-gray"
                                className="block font-medium mb-2"
                            >
                                Your Email
                            </Typography>
                        </label>
                        <Input
                            id="email"
                            color="gray"
                            size="lg"
                            type="email"
                            name="email"
                            placeholder="name@mail.com"
                            className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                        {error.email && (
                            <Typography
                                color="red"
                                className="text-sm mt-1"
                            >
                                {error.email}
                            </Typography>
                        )}

                        <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="block font-medium my-2">
                            Password
                        </Typography>
                        <Input
                            name='password'
                            type="password"
                            size="lg"
                            placeholder="********"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {error.password && (
                            <Typography
                                color="red"
                                className="text-sm mt-1"
                            >
                                {error.password}
                            </Typography>
                        )}
                    </div>
                    <Button type='submit' size="lg" color="gray" fullWidth>
                        Login
                    </Button>
                    <Button
                        onClick={handleGoogleSignIn}
                        variant="outlined"
                        size="lg"
                        className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
                        fullWidth
                    >
                        <img
                            src={`https://www.material-tailwind.com/logos/logo-google.png`}
                            alt="google"
                            className="h-6 w-6"
                        />
                        sign in with google
                    </Button>

                    <Typography
                        variant="small"
                        className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
                    >
                        Upon <NavLink to="/signup" className="font-bold">Sign Up</NavLink>, you consent to abide by our{" "}
                        <a href="#" className="text-gray-900">
                            Terms of Service
                        </a>{" "}
                        &{" "}
                        <a href="#" className="text-gray-900">
                            Privacy Policy.
                        </a>
                    </Typography>
                </form>
            </CardBody>
        </Card>
    );
};

export default Login;

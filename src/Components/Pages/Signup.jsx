import React, { useContext, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";


const Signup = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, updateUserProfile, setUser } = useContext(AuthContext);
  const [error, setError] = useState({});

  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const SignupData = { name, email, photo, password };
    console.log(SignupData);

    setError({});

    // Name validation
    if (name.length < 5) {
      setError((prev) => ({
        ...prev,
        name: "Name must be at least 5 characters long.",
      }));
      toast.error("Name must be at least 5 characters long.");
      return;
    }

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
    const hasLowerCase = /[a-z]/;
    const hasUpperCase = /[A-Z]/;
    const hasDigitAndLength = /\d/;
    if (!hasLowerCase.test(password)) {
      setError((prev) => ({
        ...prev,
        password: "Password must contain at least one lowercase letter.",
      }));
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }
    if (!hasUpperCase.test(password)) {
      setError((prev) => ({
        ...prev,
        password: "Password must contain at least one uppercase letter.",
      }));
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (password.length < 6 || !hasDigitAndLength.test(password)) {
      setError((prev) => ({
        ...prev,
        password:
          "Password must be at least 6 characters long and contain at least one number.",
      }));
      toast.error(
        "Password must be at least 6 characters long and contain at least one number."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile(name, email, password, photo)
          .then(() => {
            const userInfo = {
              name,
              email,
              password,
              photo,

            };
            axiosPublic
              .post('/users', userInfo)
              .then((res) => {
                if (res.insertedId) {
                  console.log("User profile updated");
                }
              })
              .catch((error) => console.error(error.message));
            navigate("/");
          })
          .catch((error) => {
            console.error(error.message);
            toast.error(error.message);
          });
      })
      .catch((error) => {
        console.error(error.message);
        toast.error(error.message);
      });


  };

  return (
    <div>
      <Helmet>
        <title>Bliss Bonds - Signup</title>
      </Helmet>
      <Card
        color="transparent"
        shadow={true}
        className="mt-10 border border-gray-300 md:w-7/12 w-10/12 mx-auto"
      >
        <ToastContainer />
        <Typography
          variant="h4"
          color="blue-gray"
          className="mx-auto text-center mt-10 text-4xl mb-3"
        >
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal mx-auto text-center">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form onSubmit={handleSignup} className="mt-8 mb-2 md:w-7/12 w-10/12 mx-auto">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input name="name" size="lg" placeholder="Add your name" />
            {error.name && (
              <Typography color="red" className="text-sm">
                {error.name}
              </Typography>
            )}

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input name="email" size="lg" placeholder="name@mail.com" />
            {error.email && (
              <Typography color="red" className="text-sm">
                {error.email}
              </Typography>
            )}

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Photo URL
            </Typography>
            <Input name="photo" size="lg" placeholder="Add your photo URL" />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              name="password"
              type="password"
              size="lg"
              placeholder="********"
            />
            {error.password && (
              <Typography color="red" className="text-sm">
                {error.password}
              </Typography>
            )}
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree to the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6 text-sm" fullWidth>
            Sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal mb-10">
            Already have an account?{" "}
            <NavLink to="/login" className="text-primary font-bold">
              Login
            </NavLink>{" "}
            now.
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Signup;

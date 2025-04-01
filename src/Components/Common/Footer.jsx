import React from "react";
import { Typography } from "@material-tailwind/react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import footerLogo from "../../assets/logo-62.png";
const Footer = () => {
  return (
    <footer className="w-full bg-pink-50 p-8 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center space-x-4">
          <img
            src={footerLogo} // Replace with BlissBonds logo
            alt="BlissBonds Logo"
            className="w-12"
          /> 
          <Typography color="pink" className="text-xl font-semibold gloock-regular">
            BlissBonds
          </Typography>
        </div>
        <ul className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-8 gilda-display-regular">
          <li>
            <Typography
              as="a"
              href="#about"
              color="blue-gray"
              className="font-normal transition-colors hover:text-pink-500 focus:text-pink-500 gilda-display-regular"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#services"
              color="blue-gray"
              className="font-normal transition-colors hover:text-pink-500 focus:text-pink-500 gilda-display-regular"
            >
              Services
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#privacy"
              color="blue-gray"
              className="font-normal transition-colors hover:text-pink-500 focus:text-pink-500 gilda-display-regular"
            >
              Privacy Policy
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#contact"
              color="blue-gray"
              className="font-normal transition-colors hover:text-pink-500 focus:text-pink-500 gilda-display-regular"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-pink-200" />
      <div className="flex flex-col md:flex-row items-center justify-between">
        <Typography color="blue-gray" className="text-center md:text-left font-normal gilda-display-regular">
          &copy; {new Date().getFullYear()} BlissBonds. All Rights Reserved.
        </Typography>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-pink-500 hover:text-pink-600">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-600">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-600">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-600">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

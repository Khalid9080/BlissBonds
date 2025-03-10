import React from "react";
import { Helmet } from "react-helmet-async";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="bg-gradient-to-b from-pink-50 to-white py-16 px-6 lg:px-20 mt-10 rounded-xl shadow-lg">
      <Helmet>
        <title>Bliss Bonds - Contact Us</title>
      </Helmet>
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl gloock-regular text-gray-900 md:text-6xl mb-4">
          Contact Us
        </h1>
        <h2 className="text-2xl gilda-display-regular text-gray-600 md:text-3xl mb-6">
          We're here to help you find your perfect match
        </h2>
        <p className="text-gray-700 leading-relaxed md:text-lg mx-auto max-w-3xl">
          Whether you have questions about our platform, need assistance with
          your profile, or want to share feedback, our team is here to assist
          you. Reach out to us, and we'll get back to you as soon as possible.
        </p>
      </section>

      {/* Contact Information Section */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Location */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
          <FaMapMarkerAlt className="text-pink-500 text-4xl mx-auto mb-3" />
          <h4 className="text-xl gilda-display-regular text-gray-700 mb-2">
            Our Address
          </h4>
          <p className="text-gray-600">123 Bliss Street, Love City, Wonderland</p>
        </div>
        {/* Phone */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
          <FaPhoneAlt className="text-pink-500 text-4xl mx-auto mb-3" />
          <h4 className="text-xl gilda-display-regular text-gray-700 mb-2">
            Call Us
          </h4>
          <p className="text-gray-600">+123 456 7890</p>
        </div>
        {/* Email */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
          <FaEnvelope className="text-pink-500 text-4xl mx-auto mb-3" />
          <h4 className="text-xl gilda-display-regular text-gray-700 mb-2">
            Email Us
          </h4>
          <p className="text-gray-600">support@blissbonds.com</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
        <h3 className="text-3xl gloock-regular text-gray-900 mb-6 text-center">
          Get in Touch
        </h3>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 gilda-display-regular mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 gilda-display-regular mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 gilda-display-regular mb-2">
              Message
            </label>
            <textarea
              placeholder="Write your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 h-32 resize-none"
            ></textarea>
          </div>

          <button className="w-full bg-pink-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-600 transition">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;

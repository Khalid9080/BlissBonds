import React from "react";
import { Helmet } from "react-helmet-async";
import { FaHeart, FaHandshake, FaUserShield } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-pink-50 to-white py-16 px-6 lg:px-20 mt-10 rounded-xl shadow-lg">
      <Helmet>
        <title>Bliss Bonds - About Us</title>
      </Helmet>
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl gloock-regular text-gray-900 md:text-6xl mb-4">
          About BlissBonds
        </h1>
        <h2 className="text-2xl gilda-display-regular text-gray-600 md:text-3xl mb-6">
          Where Everlasting Love Stories Begin
        </h2>
        <p className="text-gray-700 leading-relaxed md:text-lg mx-auto max-w-3xl">
          At <span className="font-semibold text-pink-500">BlissBonds</span>, we
          believe finding a life partner should be a heartfelt, personal, and
          fulfilling journey. Our mission is to help individuals connect, grow,
          and embark on the beautiful path of marriage with confidence and
          support.
        </p>
      </section>

      {/* Who We Are */}
      <section className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 mb-16">
        <div className="md:w-1/2">
          <img
            src="https://i.ibb.co.com/bgq39dnT/440936209-985326169613819-2822143957339550874-n.jpg"
            alt="Couple in love"
            className="w-full h-auto rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h3 className="text-3xl gloock-regular text-gray-900 mb-4">
            Who We Are
          </h3>
          <p className="text-gray-700 leading-relaxed md:text-lg">
            We are a team of dedicated professionals committed to helping people
            find meaningful connections that last a lifetime. With years of
            experience in the matrimony industry, our platform provides a
            secure, user-friendly space for individuals to meet compatible
            matches based on shared values and goals.
          </p>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl gloock-regular text-gray-900 mb-10">
          Our Core Values
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value 1 */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
            <FaUserShield className="text-pink-500 text-4xl mx-auto mb-4" />
            <h4 className="text-xl gilda-display-regular mb-3 text-gray-700">
              Authenticity
            </h4>
            <p className="text-gray-600">
              Every profile on BlissBonds is verified, ensuring you meet real
              people with genuine intentions to find a life partner.
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
            <FaHandshake className="text-pink-500 text-4xl mx-auto mb-4" />
            <h4 className="text-xl gilda-display-regular mb-3 text-gray-700">
              Respect
            </h4>
            <p className="text-gray-600">
              Our community is built on mutual respect, embracing diverse
              backgrounds, cultures, and beliefs to create meaningful, lasting
              bonds.
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
            <FaHeart className="text-pink-500 text-4xl mx-auto mb-4" />
            <h4 className="text-xl gilda-display-regular mb-3 text-gray-700">
              Support
            </h4>
            <p className="text-gray-600">
              From personalized matchmaking to relationship advice, we support
              our members throughout their journey toward a blissful union.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

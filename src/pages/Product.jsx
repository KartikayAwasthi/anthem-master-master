import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Images
import skyroImg from "../assets/Skyro/white skyro 2.0 May 120370.png";
import inaraImg from "../assets/Inara/Pearl white inara0110.png";
import evaaraImg from "../assets/eVaara/fan1.png";
import pedestalImg from "../assets/pedestal.webp"; // Add your pedestal fan image here
import fanRotatingGif from "../assets/fan-rotating.gif"; // New product image

const Product = () => {
  const ceilingFans = [
    { name: "SKYRO", image: skyroImg, id: "skyro" },
    { name: "INARA", image: inaraImg, id: "inara" },
    { name: "eVAARA", image: evaaraImg, id: "evaara" },
    { name: "SPINZ", image: fanRotatingGif, id: "spinz" },
  ];

  const pedestalFans = [
    { name: "PEDESTAL PRO", image: pedestalImg, id: "pedestalpro" },
  ];

  return (
    <div className="bg-[#1c1c1c] text-white min-h-0 py-10 w-full">
      {/* Ceiling Fans Section */}
      <section className="max-w-7xl mx-auto mb-10 px-4 md:px-12">
        <motion.h2
          className="text-4xl font-bold text-center mb-10 text-[#ba6a5a]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Ceiling Fans
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {ceilingFans.map((fan, index) => (
            <Link key={index} to={`/fan/${fan.id}`}>
              <motion.div
                className="bg-[#2f2f2f] border border-[#ba6a5a]/30 backdrop-blur-md p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <img
                  src={fan.image}
                  alt={fan.name}
                  className="h-48 mx-auto object-contain mb-4"
                />
                <h3 className="text-xl font-semibold text-[#ba6a5a]">{fan.name}</h3>
                <p className="text-gray-300 text-sm mt-2">
                  Stylish, energy-efficient & whisper quiet.
                </p>
                <span className="inline-block mt-4 text-[#e49385] hover:underline">
                  View Details →
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pedestal Fans Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-12">
        <motion.h2
          className="text-4xl font-bold text-center mb-10 text-[#ba6a5a]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Pedestal Fans
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
          {pedestalFans.map((fan, index) => (
            <Link key={index} to={`/fan/${fan.id}`}>
              <motion.div
                className="bg-[#2f2f2f] border border-[#ba6a5a]/30 backdrop-blur-md p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={fan.image}
                  alt={fan.name}
                  className="h-48 mx-auto object-contain mb-4"
                />
                <h3 className="text-xl font-semibold text-[#ba6a5a]">{fan.name}</h3>
                <p className="text-gray-300 text-sm mt-2">
                  Adjustable height. Maximum airflow.
                </p>
                <span className="inline-block mt-4 text-[#e49385] hover:underline">
                  View Details →
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Product;

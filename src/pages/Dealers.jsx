import React from "react";
import { motion } from "framer-motion";
import { Store } from "lucide-react";
import amazonLogo from "../assets/amazon.png";
import flipkartLogo from "../assets/flipkart.png";

const certifiedDealers = [
  {
    name: "CoolAir Distributors",
    city: "Delhi",
    location: "Karol Bagh",
    phone: "+91 9876543210",
  },
  {
    name: "Sethi Electricals",
    city: "Mumbai",
    location: "Andheri West",
    phone: "+91 9123456780",
  },
  {
    name: "Shree Fans Mart",
    city: "Bangalore",
    location: "Jayanagar",
    phone: "+91 9820012345",
  },
  {
    name: "Vaibhav Enterprises",
    city: "Lucknow",
    location: "Hazratganj",
    phone: "+91 9988776655",
  },
];

const Dealer = () => {
  return (
    <div className="bg-[#1c1c1c] text-white py-10 w-full" id="dealer">
      <div className="px-4 md:px-12 max-w-6xl mx-auto">
        {/* Title */}
        <motion.h2
          className="text-4xl font-bold text-center mb-4 text-[#ba6a5a]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Buy From Our Trusted Dealers
        </motion.h2>

        <motion.p
          className="text-gray-300 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 20 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Get your Anthem fan from certified outlets or online platforms.
        </motion.p>

        {/* 🛒 Online Links */}
        <motion.div
          className="flex flex-col md:flex-row justify-center gap-8 mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 20 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <a
            href="https://www.amazon.in/s?k=anthem+fan"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition flex items-center gap-4"
          >
            <img src={amazonLogo} alt="Amazon" className="h-10" />
          </a>

          <a
            href="https://www.flipkart.com/search?q=anthem+fan"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition flex items-center gap-4"
          >
            <img src={flipkartLogo} alt="Flipkart" className="h-10" />
          </a>
        </motion.div>

        {/* 🏪 Certified Dealers */}
        <motion.div
          className="bg-[#2f2f2f] p-4 rounded-xl shadow-xl w-full max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 20 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2 text-[#ba6a5a]">
            <Store className="w-6 h-6" /> Certified Dealer Network
          </h3>

          <ul className="space-y-4">
            {certifiedDealers.map((dealer, index) => (
              <motion.li
                key={index}
                className="bg-gradient-to-r from-[#ba6a5a]/10 via-[#e49385]/10 to-[#efb4a5]/10 border border-[#ba6a5a]/30 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-md backdrop-blur-md"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      dealer.name + " " + dealer.city
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#efb4a5] text-lg hover:text-[#e49385] transition-colors"
                    title={`View ${dealer.name} on Google Maps`}
                  >
                    📍
                  </a>
                  <div>
                    <p className="font-semibold text-white">{dealer.name}</p>
                    <p className="text-gray-300 text-sm">{dealer.city}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        dealer.name +
                          " " +
                          dealer.city +
                          " " +
                          dealer.location
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 text-xs underline hover:text-[#efb4a5]"
                    >
                      {dealer.location}
                    </a>
                  </div>
                </div>
                <a
                  href={`tel:${dealer.phone.replace(/[^+\d]/g, "")}`}
                  className="text-[#e49385] mt-2 sm:mt-0 text-sm hover:underline"
                >
                  {dealer.phone}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Dealer;

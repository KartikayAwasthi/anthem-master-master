import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="bg-[#1c1c1c] text-white py-10 w-full" id="contact">
      <div className="px-4 md:px-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Contact Form */}
          <motion.div
            className="bg-[#2f2f2f] p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl font-bold mb-6 text-[#ba6a5a]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Contact Us
            </motion.h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 rounded bg-[#444] text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded bg-[#444] text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Your Message</label>
                <textarea
                  rows="5"
                  placeholder="Type your message"
                  className="w-full px-4 py-2 rounded bg-[#444] text-white focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#ba6a5a] hover:bg-[#e49385] px-6 py-2 rounded text-white transition shadow-md"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col justify-center bg-[#2f2f2f] p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="text-5xl mb-2 text-center text-[#efb4a5]">✉️</div>
            <h3 className="text-2xl font-semibold mb-6 text-center text-[#e49385]">
              Get in Touch
            </h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-3">
                <Mail className="text-[#efb4a5]" />
                <a
                  href="https://mail.google.com/mail/?view=cm&to=support@anthemfans.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  support@anthemfans.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#e49385]" />
                <a
                  href="tel:+919930101710"
                  className="hover:text-white transition"
                >
                  +91 9930101710
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-[#ba6a5a] mt-1" />
                <a
                  href="https://www.google.com/maps/place/Plot+No.72,+GDIC,+Bethora+Industrial+Estate,+Ponda,+Goa+403409"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Plot No.72, GDIC, Bethora Industrial Estate,<br />
                  Bethora, Ponda, Goa – 403409
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

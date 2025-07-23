import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Assets
import ceoImg from "../assets/ceo.jpg";
import team1 from "../assets/team1.webp";
import team2 from "../assets/team2.png";
import team3 from "../assets/team3.jpg";
import factory1 from "../assets/factory1.jpg";
import factory2 from "../assets/factory2.jpg";
import catalogPDF from "../assets/Anthem_Catalog.pdf";

const About = () => {
  const team = [
    { name: "Rajesh Awasthi", role: "CEO & Founder", img: ceoImg },
    { name: "Sneha Rao", role: "Design Head", img: team1 },
    { name: "Aman Shah", role: "Production Manager", img: team2 },
    { name: "Divya Kulkarni", role: "Marketing Lead", img: team3 },
  ];

  const [ceoRef, inViewCeo] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef, inViewTeam] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [catalogRef, inViewCatalog] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-[#1c1c1c] text-white min-h-0 py-10 w-full">
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold text-center mb-4 px-4 md:px-12 text-[#ba6a5a]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        Our Story 🚀
      </motion.h1>
      <p className="text-gray-300 text-center max-w-3xl mx-auto mb-8 px-4 md:px-12">
        Anthem began in 1991 with a simple vision — to create smarter, quieter, and more energy-efficient fans. Today, we’re a global brand trusted by lakhs.
      </p>

      {/* ✅ Modern Horizontal Timeline */}
      <section className="py-10 bg-[#2f2f2f] text-white w-full px-4 md:px-12 rounded-3xl shadow-xl my-6" id="timeline">
        <div className="w-full">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#ba6a5a]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Milestones Through Time ⏳
          </motion.h2>

          {/* Timeline Steps */}
          <div className="relative">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0">

              {/* 1991 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#e49385] w-6 h-6 rounded-full animate-pulse mb-2"></div>
                <h3 className="text-xl font-semibold">1991</h3>
                <p className="text-gray-400 mt-2 max-w-xs">Started as an OEM supplier during India’s liberalization era.</p>
              </div>

              {/* 2010 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#e49385] w-6 h-6 rounded-full animate-pulse mb-2"></div>
                <h3 className="text-xl font-semibold">2010</h3>
                <p className="text-gray-400 mt-2 max-w-xs">Opened a modern integrated factory in Goa with in-house painting, winding, and testing.</p>
              </div>

              {/* 2024 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#e49385] w-6 h-6 rounded-full animate-pulse mb-2"></div>
                <h3 className="text-xl font-semibold">2024</h3>
                <p className="text-gray-400 mt-2 max-w-xs">Exporting to UAE, Iraq, Oman, Nepal, Bahrain, and parts of Africa.</p>
              </div>
            </div>

            {/* Connecting Line */}
            <div className="absolute top-3 left-0 right-0 h-1 bg-[#efb4a5] hidden md:block z-0"></div>
          </div>

          {/* Factory Image Gallery */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            <img src={factory1} alt="Old Factory" className="rounded-xl shadow-lg object-cover w-full h-64" />
            <img src={factory2} alt="New Factory" className="rounded-xl shadow-lg object-cover w-full h-64" />
          </div>
        </div>
      </section>

      {/* CEO Message */}
<motion.div
  ref={ceoRef}
  className="mt-12 px-4 md:px-12"
  initial={{ opacity: 0, y: 20 }}
  animate={inViewCeo ? { opacity: 1, y: 20 } : {}}
  transition={{ duration: 1 }}
>
  <h2 className="text-3xl font-bold text-center mb-6 text-[#ba6a5a]">From the CEO 💬</h2>
  <div className="flex flex-col items-center text-center">
    <img
      src={ceoImg}
      alt="CEO"
      className="w-40 h-40 object-cover rounded-full shadow-lg mb-4"
    />
    <p className="text-gray-300 text-lg max-w-2xl">
      “From a small workshop to a global brand — Anthem’s journey is a reflection of our dedication to innovation, quality, and people.”
    </p>
    <span className="text-[#efb4a5] mt-2 font-semibold">— Elone Musk</span>
  </div>
</motion.div>


      {/* Team Section */}
      <div ref={teamRef} className={`transition-opacity duration-1000 ease-in-out mt-12 ${inViewTeam ? "opacity-100" : "opacity-0"} px-4 md:px-12`}>
        <motion.h2 className="text-3xl font-bold text-center mb-10 text-[#ba6a5a]">Meet Our Team 👥</motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center w-full mx-auto max-w-6xl">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              className="bg-[#2f2f2f] backdrop-blur-md p-6 rounded-xl shadow-md border border-[#ba6a5a]/30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border border-white/20"
              />
              <h3 className="text-xl font-semibold text-[#ba6a5a]">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Catalog Download */}
<motion.div
  ref={catalogRef}
  className="mt-12 text-center px-4 md:px-12"
  initial={{ opacity: 0, y: 20 }}
  animate={inViewCatalog ? { opacity: 1, y: 20 } : {}}
  transition={{ duration: 1 }}
>
  <h2 className="text-2xl font-semibold mb-4">
    Download Our Product Catalog 
  </h2>
  <a
    href={catalogPDF}
    download="Anthem_Fan_Catalog.pdf"
    className="inline-block bg-[#ba6a5a] hover:bg-[#e49385] text-white font-medium px-6 py-3 rounded-lg transition shadow-md"
  >
    Download Catalog
  </a>
</motion.div>

    </div>
  );
};

export default About;


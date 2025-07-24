import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Images
import skyroImg from "../assets/Skyro/white skyro 2.0 May 120370.png";
import inaraImg from "../assets/Inara/Pearl white inara0110.png";
import evaaraImg from "../assets/eVaara/fan3.png"; // eVaara fan image

const Home = () => {
  return (
    <div className="w-full min-h-0 overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-[#1c1c1c] text-white">
      {/* ✅ Video Background Hero */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center snap-start bg-[#1c1c1c] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover sm:object-center"
            style={{
              objectPosition: window.innerWidth < 768 ? 'center center' : 'center center'
            }}
            src="/anthem-background.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
          {/* Responsive overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 sm:bg-black/20"></div>
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          {/* <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white drop-shadow-2xl text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Anthem
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-200 drop-shadow-lg text-center max-w-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Premium Ceiling Fans
          </motion.p> */}
        </div>
      </section>

      {/* ✅ Top Picks - Enhanced Modern Design */}
      <section className="py-16 bg-gradient-to-br from-[#1a1a1a] via-[#2f2f2f] to-[#1a1a1a] snap-start w-full px-4 md:px-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#ba6a5a] to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#e49385] to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-block px-4 py-2 bg-[#ba6a5a]/10 border border-[#ba6a5a]/20 rounded-full text-[#ba6a5a] text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              ⭐ FEATURED COLLECTION
            </motion.div>
            
            <motion.h2
              className="text-5xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our{" "}
              <span className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] bg-clip-text text-transparent">
                Top Picks
              </span>
            </motion.h2>

            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover our premium ceiling fans engineered for{" "}
              <span className="text-[#e49385] font-medium">power</span>,{" "}
              <span className="text-[#e49385] font-medium">style</span> &{" "}
              <span className="text-[#e49385] font-medium">silence</span>
            </motion.p>
          </div>

          {/* Fan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { image: skyroImg, name: "SKYRO", id: "skyro", desc: "Premium BLDC technology with whisper-quiet operation" },
              { image: inaraImg, name: "INARA", id: "inara", desc: "Smart home ready with LED lighting integration" },
              { image: evaaraImg, name: "eVAARA", id: "evaara", desc: "Exceptional value with modern aesthetics & efficiency" }
            ].map((fan, index) => (
              <Link key={index} to={`/fan/${fan.id}`}>
                <motion.div
                  className="group relative bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-3xl p-8 shadow-2xl border border-[#ba6a5a]/10 hover:border-[#ba6a5a]/30 transition-all duration-500 overflow-hidden"
                  whileHover={{ 
                    scale: 1.03,
                    rotateX: 5,
                    rotateY: 5
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ba6a5a]/20 via-transparent to-[#e49385]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  
                  {/* Fan Image */}
                  <div className="relative z-10 mb-8">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 p-6">
                      <img 
                        src={fan.image} 
                        alt={fan.name} 
                        className="h-52 w-full object-contain transform group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-[#ba6a5a] transition-colors duration-300">
                      Anthem {fan.name}
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                      {fan.desc}
                    </p>
                    
                    {/* CTA Button */}
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ba6a5a] to-[#e49385] text-white font-semibold rounded-full group-hover:shadow-lg group-hover:shadow-[#ba6a5a]/25 transition-all duration-300">
                      <span>Explore Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-[#ba6a5a] to-[#e49385] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-tl from-[#e49385] to-[#ba6a5a] rounded-full opacity-10 group-hover:opacity-30 transition-opacity duration-300"></div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link 
              to="/products"
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[#ba6a5a] text-[#ba6a5a] font-semibold rounded-full hover:bg-[#ba6a5a] hover:text-white transition-all duration-300 group"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ✅ Why Choose Anthem */}
      <section className="py-8 flex flex-col justify-center items-center text-center bg-[#1c1c1c] snap-start w-full px-4 md:px-12 rounded-3xl shadow-xl my-6">
        <motion.h2
          className="text-4xl font-bold mb-6 text-[#ba6a5a]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Anthem?
        </motion.h2>
        <p className="max-w-3xl mx-auto text-gray-400 mb-12">
          Our fans are engineered with precision to deliver unmatched efficiency, durability, and design.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto w-full max-w-5xl">
          {[
            { emoji: "⚡️", title: "BLDC Motor", desc: "Only 3W–35W power usage. Saves ₹1500/year." },
            { emoji: "🌀", title: "Aerodynamic Blades", desc: "High airflow. Low noise." },
            { emoji: "🧲", title: "100% Copper Wiring", desc: "Long-lasting, safe & efficient." },
            { emoji: "🧼", title: "Anti-Dust Coating", desc: "Reduces cleaning frequency." },
            { emoji: "🎨", title: "Elegant Design", desc: "Perfectly blends with interiors." },
            { emoji: "🛡️", title: "Rust-Proof Body", desc: "Weatherproof durability." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-[#2f2f2f] backdrop-blur-md p-6 rounded-xl text-left border border-[#ba6a5a]/30 shadow hover:shadow-lg transition"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-3">{feature.emoji}</div>
              <h3 className="text-xl font-bold mb-2 text-[#e49385]">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

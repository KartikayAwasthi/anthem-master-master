import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Images
const skyroImg = "/Skyro/white skyro 2.0 May 120370.png";
const inaraImg = "/Inara/Pearl white inara0110.png";
const evaaraImg = "/eVaara/fan3.png"; // eVaara fan image
const pedestalImg = "/pedestal.webp"; // Pedestal fan image

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

      {/* ✅ Our Top Picks */}
      <section className="py-8 flex flex-col justify-center items-center text-center bg-[#2f2f2f] snap-start w-full px-4 md:px-12 rounded-3xl shadow-xl my-6">
        <motion.h2
          className="text-4xl font-bold mb-4 text-[#ba6a5a]"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          Our Top Picks
        </motion.h2>

        <p className="text-gray-300 mb-10">Engineered for power, style & silence.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
          {[
            { image: skyroImg, name: "SKYRO", id: "skyro" },
            { image: inaraImg, name: "INARA", id: "inara" },
            { image: evaaraImg, name: "eVAARA", id: "evaara" }
          ].map((fan, index) => (
            <Link key={index} to={`/fan/${fan.id}`}>
              <motion.div
                className="bg-[#1c1c1c]/60 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-2xl transition border border-[#ba6a5a]/30 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <img src={fan.image} alt={fan.name} className="h-44 w-full object-contain mb-4" />
                <h3 className="text-2xl font-semibold mb-2 text-[#ba6a5a]">Anthem {fan.name}</h3>
                <p className="text-gray-300 text-sm">Silent operation, smart control, superior airflow.</p>
                <span className="inline-block mt-4 text-[#e49385] hover:underline">
                  View Details →
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* ✅ Ceiling Fans - Enhanced Modern Design */}
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
              Ceiling{" "}
              <span className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] bg-clip-text text-transparent">
                Fans
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

      {/* ✅ Pedestal Fans Section */}
      <section className="py-16 bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] snap-start w-full px-4 md:px-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-[#e49385] to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-block px-4 py-2 bg-[#e49385]/10 border border-[#e49385]/20 rounded-full text-[#e49385] text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              🌪️ VERSATILE COOLING
            </motion.div>
            
            <motion.h2
              className="text-5xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Pedestal{" "}
              <span className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] bg-clip-text text-transparent">
                Fans
              </span>
            </motion.h2>

            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Portable powerhouse fans with{" "}
              <span className="text-[#e49385] font-medium">adjustable height</span> &{" "}
              <span className="text-[#e49385] font-medium">maximum airflow</span>
            </motion.p>
          </div>

          {/* Pedestal Fan Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <Link to="/fan/pedestalpro">
                <motion.div
                  className="group relative bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-3xl p-8 shadow-2xl border border-[#ba6a5a]/10 hover:border-[#ba6a5a]/30 transition-all duration-500 overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    rotateX: 5,
                    rotateY: 5
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ba6a5a]/20 via-transparent to-[#e49385]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  
                  {/* Fan Image */}
                  <div className="relative z-10 mb-8">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 p-6">
                      <img 
                        src={pedestalImg} 
                        alt="PEDESTAL PRO" 
                        className="w-full h-64 object-contain mx-auto transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" 
                      />
                      {/* Floating Elements */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-[#ba6a5a]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                      <div className="absolute bottom-4 left-4 w-6 h-6 bg-[#e49385]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-[#e49385] transition-colors duration-300">
                      Anthem PEDESTAL PRO
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                      Adjustable height with maximum airflow delivery for versatile cooling solutions
                    </p>
                    
                    {/* Price and CTA */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-bold text-[#ba6a5a]">₹2,999</span>
                      <span className="inline-flex items-center text-[#e49385] font-medium group-hover:translate-x-1 transition-transform duration-300">
                        View Details →
                      </span>
                    </div>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#e49385] rounded-full"></span>
                        <span>Adjustable Height</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#e49385] rounded-full"></span>
                        <span>Powerful Motor</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#e49385] rounded-full"></span>
                        <span>Stable Base</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#e49385] rounded-full"></span>
                        <span>Easy Mobility</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#ba6a5a]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-[#e49385]/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              </Link>
            </div>
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
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[#e49385] text-[#e49385] font-semibold rounded-full hover:bg-[#e49385] hover:text-white transition-all duration-300 group"
            >
              <span>Explore All Fans</span>
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

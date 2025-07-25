import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart, Plus } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import CartButton from "../components/CartButton";

// Images
import skyroImg from "../assets/Skyro/white skyro 2.0 May 120370.png";
import inaraImg from "../assets/Inara/Pearl white inara0110.png";
import evaaraImg from "../assets/eVaara/fan1.png";
import pedestalImg from "../assets/pedestal.webp"; // Add your pedestal fan image here
import fanRotatingGif from "../assets/fan-rotating.gif"; // New product image

const Product = () => {
  const ceilingFans = [
    { name: "SKYRO", image: skyroImg, id: "skyro", price: "₹3,999", desc: "Premium BLDC technology with whisper-quiet operation" },
    { name: "INARA", image: inaraImg, id: "inara", price: "₹4,499", desc: "Smart home ready with LED lighting integration and less noise" },
    { name: "eVAARA", image: evaaraImg, id: "evaara", price: "₹3,699", desc: "Exceptional value with modern aesthetics & efficiency" },
  ];

  const pedestalFans = [
    { name: "PEDESTAL PRO", image: pedestalImg, id: "pedestalpro", price: "₹2,999", desc: "Adjustable height with maximum airflow delivery" },
  ];

  const handleAddToCart = (fan, e) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation();
    addToCart(fan);
  };

  return (
    <div className="bg-[#1c1c1c] text-white min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#1a1a1a] via-[#2f2f2f] to-[#1a1a1a] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#ba6a5a] to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#e49385] to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 text-center">
          <motion.div
            className="inline-block px-4 py-2 bg-[#ba6a5a]/10 border border-[#ba6a5a]/20 rounded-full text-[#ba6a5a] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ⚡ COMPLETE COLLECTION
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            All{" "}
            <span className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] bg-clip-text text-transparent">
              Products
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our complete range of premium ceiling fans and pedestal fans designed for every home and lifestyle
          </motion.p>
        </div>
      </section>
      {/* Ceiling Fans Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ceiling{" "}
            <span className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] bg-clip-text text-transparent">
              Fans
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Premium ceiling fans engineered for efficiency, style, and whisper-quiet operation
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {ceilingFans.map((fan, index) => (
            <Link key={index} to={`/fan/${fan.id}`}>
              <motion.div
                className="group relative bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-3xl p-6 shadow-2xl border border-[#ba6a5a]/10 hover:border-[#ba6a5a]/30 transition-all duration-500 overflow-hidden"
                whileHover={{ 
                  scale: 1.03,
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
                <div className="relative z-10 mb-6">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 p-4">
                    <img 
                      src={fan.image} 
                      alt={fan.name} 
                      className="w-full h-40 object-contain mx-auto transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" 
                    />
                    {/* Floating Elements */}
                    <div className="absolute top-2 right-2 w-8 h-8 bg-[#ba6a5a]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#e49385] transition-colors duration-300">
                    Anthem {fan.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {fan.desc}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[#ba6a5a]">{fan.price}</span>
                    <span className="inline-flex items-center text-[#e49385] text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                      View Details →
                    </span>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <CartButton product={fan} />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#ba6a5a]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-[#e49385]/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pedestal Fans Section */}
      <section className="py-16 bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-[#e49385] to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Pedestal{" "}
              <span className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] bg-clip-text text-transparent">
                Fans
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Versatile pedestal fans with adjustable height and powerful airflow for any space
            </motion.p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              {pedestalFans.map((fan, index) => (
                <Link key={index} to={`/fan/${fan.id}`}>
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
                          src={fan.image} 
                          alt={fan.name} 
                          className="w-full h-56 object-contain mx-auto transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" 
                        />
                        {/* Floating Elements */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-[#ba6a5a]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                        <div className="absolute bottom-4 left-4 w-6 h-6 bg-[#e49385]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#e49385] transition-colors duration-300">
                        Anthem {fan.name}
                      </h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {fan.desc}
                      </p>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-3xl font-bold text-[#ba6a5a]">{fan.price}</span>
                        <span className="inline-flex items-center text-[#e49385] font-medium group-hover:translate-x-1 transition-transform duration-300">
                          View Details →
                        </span>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <CartButton product={fan} className="py-4 px-6 text-lg" />
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#ba6a5a]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-[#e49385]/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] bg-clip-text text-transparent">
              Anthem?
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { emoji: "⚡️", title: "BLDC Motor", desc: "Ultra-efficient motors that save up to ₹1500/year" },
            { emoji: "🌀", title: "Aerodynamic Design", desc: "Advanced blade engineering for maximum airflow" },
            { emoji: "🔇", title: "Whisper Quiet", desc: "Operates below 35dB for peaceful environment" },
            { emoji: "🎨", title: "Premium Finishes", desc: "Multiple color options to match your décor" },
            { emoji: "🛡️", title: "Extended Warranty", desc: "2-3 years comprehensive warranty coverage" },
            { emoji: "📱", title: "Smart Ready", desc: "Compatible with modern smart home systems" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] p-6 rounded-xl border border-[#ba6a5a]/10 hover:border-[#ba6a5a]/30 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{feature.emoji}</div>
              <h3 className="text-xl font-bold mb-3 text-[#e49385]">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Product;


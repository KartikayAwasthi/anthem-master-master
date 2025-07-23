import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Zap, Volume2, Shield, ChevronDown, ChevronUp } from "lucide-react";
import ColorChangeTransition from "../components/ColorChangeTransition";

// Import fan images
import skyroImg from "../assets/Skyro/white skyro 2.0 May 120370.png";
import inaraImg from "../assets/Inara/Pearl white inara0110.png";
import evaaraImg from "../assets/eVaara/fan1.png";
import fanRotatingGif from "../assets/fan-rotating.gif";
import pedestalImg from "../assets/pedestal.webp";

// Import eVaara color variants
import evaaraImg1 from "../assets/eVaara/fan1.png";
import evaaraImg2 from "../assets/eVaara/fan2.png";
import evaaraImg3 from "../assets/eVaara/fan3.png";
import evaaraImg4 from "../assets/eVaara/fan4.png";
import evaaraImg5 from "../assets/eVaara/fan5.png";

// Import Skyro color variants
import skyroImg1 from "../assets/Skyro/white skyro 2.0 May 120370.png";
import skyroImg2 from "../assets/Skyro/black skyro 2.0 May 120315.png";
import skyroImg3 from "../assets/Skyro/Blue skyro 2.0 May 120380.png";
import skyroImg4 from "../assets/Skyro/golden skyro 2.0 May 120352.png";
import skyroImg5 from "../assets/Skyro/purple skyro 2.0 May 120328.png";

// Import Inara color variants
import inaraImg1 from "../assets/Inara/Pearl white inara0110.png";
import inaraImg2 from "../assets/Inara/bakers brown 0106.png";
import inaraImg3 from "../assets/Inara/black inara 2.0 May 120319.png";
import inaraImg4 from "../assets/Inara/Blue Inara 2.0 May 120386.png";
import inaraImg5 from "../assets/Inara/golden inara 2.0 May 120356.png";
import inaraImg6 from "../assets/Inara/purple inara 2.0 May 120336.png";
import inaraImg7 from "../assets/Inara/white inara 2.0 May 120365.png";

const fanData = {
  skyro: {
    name: "SKYRO",
    image: skyroImg,
    price: "₹3,999",
    rating: 4.8,
    description: "The SKYRO ceiling fan combines cutting-edge BLDC motor technology with elegant design. Perfect for modern homes seeking efficiency and style.",
    features: [
      "BLDC Motor - Ultra energy efficient",
      "Remote Control with 6 speed settings",
      "Anti-dust coating for easy maintenance",
      "Aerodynamic blade design for maximum airflow",
      "Whisper-quiet operation below 35dB"
    ],
    specifications: {
      "Motor Type": "BLDC (Brushless DC)",
      "Power Consumption": "28W",
      "Air Delivery": "230 CMM",
      "Speed": "300 RPM",
      "Sweep": "1200mm",
      "Warranty": "2 Years"
    },
    colors: [
      { name: "Classic White", image: skyroImg1, code: "#FFFFFF" },
      { name: "Matte Black", image: skyroImg2, code: "#2F2F2F" },
      { name: "Royal Blue", image: skyroImg3, code: "#4169E1" },
      { name: "Antique Gold", image: skyroImg4, code: "#D4AF37" },
      { name: "Purple", image: skyroImg5, code: "#8A2BE2" }
    ]
  },
  inara: {
    name: "INARA",
    image: inaraImg,
    price: "₹4,499",
    rating: 4.9,
    description: "INARA represents the pinnacle of ceiling fan engineering with premium materials and smart features for the discerning homeowner.",
    features: [
      "Premium BLDC Motor technology",
      "Smart home integration ready",
      "LED light with dimmer control",
      "Rust-proof aluminum body",
      "Energy Star certified"
    ],
    specifications: {
      "Motor Type": "BLDC Premium",
      "Power Consumption": "32W",
      "Air Delivery": "250 CMM",
      "Speed": "320 RPM",
      "Sweep": "1200mm",
      "Warranty": "3 Years"
    },
    colors: [
      { name: "Pearl White", image: inaraImg1, code: "#F8F8FF" },
      { name: "Bakers Brown", image: inaraImg2, code: "#8B4513" },
      { name: "Matte Black", image: inaraImg3, code: "#2F2F2F" },
      { name: "Royal Blue", image: inaraImg4, code: "#4169E1" },
      { name: "Antique Gold", image: inaraImg5, code: "#D4AF37" },
      { name: "Purple", image: inaraImg6, code: "#8A2BE2" },
      { name: "Classic White", image: inaraImg7, code: "#FFFFFF" }
    ]
  },
  evaara: {
    name: "eVAARA",
    image: evaaraImg,
    price: "₹3,699",
    rating: 4.7,
    description: "eVAARA offers exceptional value with reliable performance and modern aesthetics. The perfect choice for everyday comfort.",
    features: [
      "Efficient BLDC motor",
      "Decorative LED lighting",
      "Multiple finish options",
      "Easy installation design",
      "Low maintenance operation"
    ],
    specifications: {
      "Motor Type": "BLDC Standard",
      "Power Consumption": "25W",
      "Air Delivery": "220 CMM",
      "Speed": "280 RPM",
      "Sweep": "1200mm",
      "Warranty": "2 Years"
    },
    colors: [
      { name: "Classic White", image: evaaraImg1, code: "#FFFFFF" },
      { name: "Pearl Bronze", image: evaaraImg2, code: "#CD7F32" },
      { name: "Matte Black", image: evaaraImg3, code: "#2F2F2F" },
      { name: "Brushed Silver", image: evaaraImg4, code: "#C0C0C0" },
      { name: "Antique Gold", image: evaaraImg5, code: "#D4AF37" }
    ]
  },
  spinz: {
    name: "SPINZ",
    image: fanRotatingGif,
    price: "₹4,999",
    rating: 4.9,
    description: "SPINZ is our premium rotating fan that showcases advanced engineering with dynamic movement and superior airflow distribution.",
    features: [
      "Revolutionary rotating design",
      "360-degree airflow coverage",
      "Advanced BLDC motor",
      "Smart oscillation control",
      "Premium finish materials"
    ],
    specifications: {
      "Motor Type": "BLDC Advanced",
      "Power Consumption": "35W",
      "Air Delivery": "280 CMM",
      "Speed": "350 RPM",
      "Sweep": "1200mm",
      "Warranty": "3 Years"
    }
  },
  pedestalpro: {
    name: "PEDESTAL PRO",
    image: pedestalImg,
    price: "₹2,999",
    rating: 4.6,
    description: "PEDESTAL PRO delivers powerful airflow with adjustable height and tilt features. Perfect for versatile cooling solutions.",
    features: [
      "Adjustable height mechanism",
      "90-degree tilt adjustment",
      "Powerful motor for maximum airflow",
      "Stable base design",
      "Easy mobility with wheels"
    ],
    specifications: {
      "Motor Type": "Induction Motor",
      "Power Consumption": "75W",
      "Air Delivery": "180 CMM",
      "Speed": "1350 RPM",
      "Height": "Adjustable 48-52 inches",
      "Warranty": "2 Years"
    }
  }
};

const FanDetail = () => {
  const { fanId } = useParams();
  const fan = fanData[fanId];
  
  // State for selected color (for eVaara and Inara)
  const [selectedColor, setSelectedColor] = useState(null);
  
  // State for color change transition
  const [showColorTransition, setShowColorTransition] = useState(false);
  
  // State for specifications dropdown
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  
  // Initialize selected color when fan data is available
  useEffect(() => {
    if ((fanId === "evaara" || fanId === "inara" || fanId === "skyro") && fan?.colors) {
      setSelectedColor(fan.colors[0]);
    } else {
      setSelectedColor(null);
    }
  }, [fanId, fan]);

  // Handle color change with transition animation
  const handleColorChange = (color) => {
    if (selectedColor?.name !== color.name) {
      setShowColorTransition(true);
      // Delay the actual color change to sync with animation
      setTimeout(() => {
        setSelectedColor(color);
      }, 600);
    }
  };

  // Hide transition animation
  const hideColorTransition = () => {
    setShowColorTransition(false);
  };
  
  // Get current image based on selected color or default fan image
  const getCurrentImage = () => {
    if ((fanId === "evaara" || fanId === "inara" || fanId === "skyro") && selectedColor) {
      return selectedColor.image;
    }
    return fan?.image;
  };

  if (!fan) {
    return (
      <div className="bg-[#1c1c1c] text-white min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#ba6a5a] mb-4">Fan not found</h2>
          <Link to="/products" className="text-[#e49385] hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1c1c1c] text-white min-h-screen py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Fan Image */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#b4b4b4] rounded-xl p-6 lg:p-8 text-center flex items-center justify-center"
            >
              <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
                <img
                  src={getCurrentImage()}
                  alt={fan.name}
                  className="w-full h-auto max-h-72 lg:max-h-80 xl:max-h-96 object-contain mx-auto transition-transform duration-300 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Color Selection - Only for eVaara, Inara, and Skyro - Below Fan Image */}
            {(fanId === "evaara" || fanId === "inara" || fanId === "skyro") && fan.colors && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-[#2f2f2f] rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-[#e49385] mb-4 text-center">Choose Your Color</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {fan.colors.map((color, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleColorChange(color)}
                      className={`relative group flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedColor?.name === color.name
                          ? "border-[#ba6a5a] bg-[#ba6a5a]/10"
                          : "border-gray-600 hover:border-[#e49385]"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Color Circle */}
                      <div
                        className={`w-10 h-10 rounded-full border-3 ${
                          selectedColor?.name === color.name
                            ? "border-[#ba6a5a]"
                            : "border-gray-400"
                        }`}
                        style={{ backgroundColor: color.code }}
                      />
                      {/* Color Name */}
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors text-center font-medium">
                        {color.name}
                      </span>
                      {/* Selected Indicator */}
                      {selectedColor?.name === color.name && (
                        <motion.div 
                          className="absolute -top-2 -right-2 w-6 h-6 bg-[#ba6a5a] rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
                {selectedColor && (
                  <motion.p 
                    className="text-center text-gray-400 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Selected: <span className="text-[#e49385] font-medium">{selectedColor.name}</span>
                  </motion.p>
                )}
              </motion.div>
            )}
          </div>

          {/* Fan Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold text-[#ba6a5a] mb-2">
                Anthem {fan.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-[#e49385]">{fan.price}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-gray-300">{fan.rating}</span>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{fan.description}</p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-xl font-semibold text-[#e49385] mb-4">Key Features</h3>
              <ul className="space-y-2">
                {fan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-[#ba6a5a] mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Icons */}
            <div className="flex gap-6 py-4">
              <div className="text-center">
                <Zap className="w-8 h-8 text-[#e49385] mx-auto mb-1" />
                <span className="text-xs text-gray-400">Energy Efficient</span>
              </div>
              <div className="text-center">
                <Volume2 className="w-8 h-8 text-[#e49385] mx-auto mb-1" />
                <span className="text-xs text-gray-400">Quiet Operation</span>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-[#e49385] mx-auto mb-1" />
                <span className="text-xs text-gray-400">2-3 Year Warranty</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                className="bg-[#ba6a5a] hover:bg-[#e49385] text-white px-6 py-3 rounded-lg font-semibold transition flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Now
              </motion.button>
              <motion.button 
                className="border border-[#ba6a5a] text-[#ba6a5a] hover:bg-[#ba6a5a] hover:text-white px-6 py-3 rounded-lg font-semibold transition flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Specifications Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 lg:mt-16 bg-[#2f2f2f] rounded-xl p-6 lg:p-8"
        >
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsSpecsOpen(!isSpecsOpen)}
          >
            <h3 className="text-2xl font-semibold text-[#e49385]">Technical Specifications</h3>
            <motion.div
              animate={{ rotate: isSpecsOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[#e49385]"
            >
              {isSpecsOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </motion.div>
          </div>
          
          <motion.div
            initial={false}
            animate={{ 
              height: isSpecsOpen ? "auto" : 0,
              opacity: isSpecsOpen ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {Object.entries(fan.specifications).map(([key, value], index) => (
                  <motion.div 
                    key={key} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isSpecsOpen ? 1 : 0, y: isSpecsOpen ? 0 : 10 }}
                    transition={{ duration: 0.3, delay: isSpecsOpen ? index * 0.05 : 0 }}
                    className="flex justify-between items-center border-b border-[#444] pb-3 mb-2"
                  >
                    <span className="text-gray-400 text-sm lg:text-base">{key}</span>
                    <span className="text-white font-medium text-sm lg:text-base text-right">{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Color Change Transition Animation */}
      <ColorChangeTransition 
        isVisible={showColorTransition} 
        onComplete={hideColorTransition} 
      />
    </div>
  );
};

export default FanDetail;

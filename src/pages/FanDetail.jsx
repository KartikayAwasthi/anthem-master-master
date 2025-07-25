import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, Zap, Volume2, Shield, ChevronDown, ChevronUp, ShoppingCart, Heart, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import ColorChangeTransition from "../components/ColorChangeTransition";
import { useCart } from "../contexts/CartContext";
import CartButton from "../components/CartButton";

// Import fan images
const skyroImg = "/Skyro/white skyro 2.0 May 120370.png";
const inaraImg = "/Inara/Pearl white inara0110.png";
const pedestalImg = "/pedestal.webp";

// eVaara variants - Updated to use public/eVaara images
const evaaraImg1 = "/eVaara/fan1.png";
const evaaraImg2 = "/eVaara/fan2.png";
const evaaraImg3 = "/eVaara/fan3.png";
const evaaraImg4 = "/eVaara/fan4.png";
const evaaraImg5 = "/eVaara/fan5.png";

// Skyro variants
const skyroImg1 = "/Skyro/white skyro 2.0 May 120370.png";
const skyroImg2 = "/Skyro/black skyro 2.0 May 120315.png";
const skyroImg3 = "/Skyro/Blue skyro 2.0 May 120380.png";
const skyroImg4 = "/Skyro/golden skyro 2.0 May 120352.png";
const skyroImg5 = "/Skyro/purple skyro 2.0 May 120328.png";

// Inara variants
const inaraImg1 = "/Inara/Pearl white inara0110.png";
const inaraImg2 = "/Inara/bakers brown 0106.png";
const inaraImg3 = "/Inara/black inara 2.0 May 120319.png";
const inaraImg4 = "/Inara/Blue Inara 2.0 May 120386.png";
const inaraImg5 = "/Inara/golden inara 2.0 May 120356.png";
const inaraImg6 = "/Inara/purple inara 2.0 May 120336.png";
const inaraImg7 = "/Inara/white inara 2.0 May 120365.png";

const fanData = {
  skyro: {
    name: "SKYRO",
    image: skyroImg,
    price: "₹3,999",
    rating: 4.8,
    description:
      "The SKYRO ceiling fan combines cutting-edge BLDC motor technology with elegant design. Perfect for modern homes seeking efficiency and style.",
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
      Sweep: "1200mm",
      Warranty: "2 Years"
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
    description:
      "INARA represents the pinnacle of ceiling fan engineering with premium materials and smart features for the discerning homeowner.",
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
      Sweep: "1200mm",
      Warranty: "3 Years"
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
    image: evaaraImg1, // Updated to use first image from src/assets/eVaara
    price: "₹3,699",
    rating: 4.7,
    description:
      "eVAARA offers exceptional value with reliable performance and modern aesthetics. The perfect choice for everyday comfort.",
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
      Sweep: "1200mm",
      Warranty: "2 Years"
    },
    colors: [
      { name: "Classic White", image: evaaraImg1, code: "#FFFFFF" },
      { name: "Pearl Bronze", image: evaaraImg2, code: "#CD7F32" },
      { name: "Matte Black", image: evaaraImg3, code: "#2F2F2F" },
      { name: "Brushed Silver", image: evaaraImg4, code: "#C0C0C0" },
      { name: "Antique Gold", image: evaaraImg5, code: "#D4AF37" }
    ]
  },
  pedestalpro: {
    name: "PEDESTAL PRO",
    image: pedestalImg,
    price: "₹2,999",
    rating: 4.6,
    description:
      "PEDESTAL PRO delivers powerful airflow with adjustable height and tilt features. Perfect for versatile cooling solutions.",
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
      Height: "Adjustable 48-52 inches",
      Warranty: "2 Years"
    }
  }
};

 const fanCreatives = {
  evaara: [
    "/evaara-creatives/1.jpg",
    "/evaara-creatives/2.jpg",
    "/evaara-creatives/3.jpg",
    "/evaara-creatives/4.jpg",
    "/evaara-creatives/5.jpg",
    "/evaara-creatives/6.png"
  ],
  skyro: [
    "/Skyro-creatives/1.jpg",
    "/Skyro-creatives/2.jpg",
    "/Skyro-creatives/3.jpg"
  ],
  inara: [
    "/Inara-creatives/1.png",
    "/Inara-creatives/2.png",
    "/Inara-creatives/3.jpg"
  ]
};



const FanDetail = () => {
  const { fanId } = useParams();
  const { addToCart } = useCart();
  const fan = fanData[fanId];
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColorTransition, setShowColorTransition] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Fullscreen image viewer states
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);

  // Handle add to cart
  const handleAddToCart = () => {
    if (fan) {
      const cartItem = {
        id: fan.id || fanId,
        name: fan.name,
        price: fan.price,
        image: getCurrentImage(),
        desc: fan.description,
        color: selectedColor?.name || 'Default'
      };
      addToCart(cartItem);
      
      // Optional: Show success message
      alert(`${fan.name} added to cart!`);
    }
  };

  useEffect(() => {
    if (fan?.colors?.length > 0) {
      setSelectedColor(fan.colors[0]);
    } else {
      setSelectedColor(null);
    }
    window.scrollTo(0, 0);
  }, [fanId, fan]);

  const handleColorChange = (color) => {
    if (selectedColor?.name !== color.name) {
      setShowColorTransition(true);
      setTimeout(() => {
        setSelectedColor(color);
      }, 600);
    }
  };

  const hideColorTransition = () => {
    setShowColorTransition(false);
  };

  const getCurrentImage = () => {
    return fan?.colors && selectedColor ? selectedColor.image : fan?.image;
  };

  // Fullscreen image viewer functions
  const openFullscreen = (imageIndex) => {
    setFullscreenImageIndex(imageIndex);
    setShowFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setShowFullscreen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (fanCreatives[fanId]) {
      setFullscreenImageIndex((prev) => 
        prev === fanCreatives[fanId].length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (fanCreatives[fanId]) {
      setFullscreenImageIndex((prev) => 
        prev === 0 ? fanCreatives[fanId].length - 1 : prev - 1
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showFullscreen) {
        switch (e.key) {
          case 'Escape':
            closeFullscreen();
            break;
          case 'ArrowLeft':
            prevImage();
            break;
          case 'ArrowRight':
            nextImage();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showFullscreen, fanId]);

  if (!fan) {
    return (
      <div className="bg-[#1c1c1c] text-white min-h-screen flex items-center justify-center">
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
    <div className="bg-[#1c1c1c] text-white min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-[#e49385] hover:text-[#ba6a5a] transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Products</span>
          </Link>
        </motion.div>

        {/* Fullscreen Image Viewer */}
        <AnimatePresence>
          {showFullscreen && fanCreatives[fanId] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
              onClick={closeFullscreen}
            >
              {/* Simple header with close button and image counter */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                <div className="bg-black/50 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
                  <span className="font-medium">{fullscreenImageIndex + 1} / {fanCreatives[fanId].length}</span>
                </div>
                <button
                  onClick={closeFullscreen}
                  className="bg-black/50 text-white p-3 hover:bg-red-600/50 rounded-full transition-all duration-200 backdrop-blur-sm"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Simple navigation arrows */}
              {fanCreatives[fanId].length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 hover:bg-[#ba6a5a]/50 rounded-full transition-all duration-200 z-20 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 hover:bg-[#ba6a5a]/50 rounded-full transition-all duration-200 z-20 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}

              {/* Simple image viewer */}
              <motion.div
                className="relative flex items-center justify-center w-full h-full p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  className="relative flex items-center justify-center rounded-lg shadow-2xl"
                >
                  <motion.img
                    key={fullscreenImageIndex}
                    src={fanCreatives[fanId][fullscreenImageIndex]}
                    alt={`Creative ${fullscreenImageIndex + 1}`}
                    className="select-none rounded-lg max-w-[80vw] max-h-[80vh] object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    draggable={false}
                  />
                </motion.div>
              </motion.div>

              {/* Simple bottom instructions */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/80 text-sm text-center z-20">
                <div className="bg-black/50 rounded-xl px-6 py-3 backdrop-blur-sm">
                  <div className="flex items-center justify-center space-x-6 text-xs">
                    <span className="flex items-center space-x-1">
                      <span className="text-[#e49385]">←→</span>
                      <span>Navigate</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="text-[#e49385]">ESC</span>
                      <span>Close</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-[#ffffff9a] to-[#ffffff91] rounded-2xl p-8 shadow-2xl">
              <img
                src={getCurrentImage()}
                alt={fan.name}
                className="w-full h-96 object-contain transition-all duration-500"
              />
              {/* Floating Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              {/* Localized Color Change Animation */}
              <ColorChangeTransition 
                isVisible={showColorTransition} 
                onComplete={hideColorTransition}
                type="fan"
                localized={true}
              />
            </div>

            {/* Color Variants */}
            {fan.colors && fan.colors.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#e49385]">Available Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {fan.colors.map((color, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-300 bg-[#2f2f2f] ${
                        selectedColor?.name === color.name
                          ? "border-[#ba6a5a] bg-[#ba6a5a]/10"
                          : "border-gray-600 hover:border-[#e49385]"
                      }`}
                      onClick={() => handleColorChange(color)}
                    >
                      <img
                        src={color.image}
                        alt={color.name}
                        className="w-16 h-16 object-contain"
                      />
                      <p className="text-xs text-center mt-2">{color.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Anthem {fan.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(fan.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                  <span className="text-gray-300 ml-2">({fan.rating})</span>
                </div>
                <span className="text-green-400 text-sm">In Stock</span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {fan.description}
              </p>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-[#2f2f2f] to-[#1f1f1f] rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-[#ba6a5a]">{fan.price}</span>
                  <span className="text-gray-400 line-through ml-3">₹{parseInt(fan.price.replace('₹', '')) + 1000}</span>
                </div>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Save ₹1000
                </span>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#e49385]">Key Features</h3>
              <div className="grid grid-cols-1 gap-3">
                {fan.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-[#2f2f2f] rounded-lg"
                  >
                    <div className="w-2 h-2 bg-[#ba6a5a] rounded-full mt-2"></div>
                    <span className="text-gray-200">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <div className="flex-1">
                <CartButton 
                  product={{
                    id: fan.id || fanId,
                    name: fan.name,
                    price: fan.price,
                    image: getCurrentImage(),
                    desc: fan.description,
                    color: selectedColor?.name || 'Default'
                  }}
                  className="py-4 px-6"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#2f2f2f] text-white py-4 px-6 rounded-xl font-semibold border border-[#ba6a5a] hover:bg-[#ba6a5a]/10 transition-all duration-300"
              >
                Buy Now
              </motion.button>
            </div>

            {/* Quick Info Icons */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[#2f2f2f] rounded-xl">
                <Zap className="w-8 h-8 text-[#ba6a5a] mx-auto mb-2" />
                <p className="text-sm text-gray-300">Energy Efficient</p>
              </div>
              <div className="text-center p-4 bg-[#2f2f2f] rounded-xl">
                <Volume2 className="w-8 h-8 text-[#ba6a5a] mx-auto mb-2" />
                <p className="text-sm text-gray-300">Silent Operation</p>
              </div>
              <div className="text-center p-4 bg-[#2f2f2f] rounded-xl">
                <Shield className="w-8 h-8 text-[#ba6a5a] mx-auto mb-2" />
                <p className="text-sm text-gray-300">2 Year Warranty</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-[#2f2f2f] rounded-xl p-6"
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
            animate={{ height: isSpecsOpen ? "auto" : 0, opacity: isSpecsOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(fan.specifications).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isSpecsOpen ? 1 : 0, y: isSpecsOpen ? 0 : 10 }}
                  transition={{ duration: 0.3, delay: isSpecsOpen ? index * 0.05 : 0 }}
                  className="flex justify-between items-center border-b border-[#444] pb-3"
                >
                  <span className="text-gray-400 text-sm">{key}</span>
                  <span className="text-white font-medium text-sm text-right">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

       {/* Creatives Section */}
{fanCreatives[fanId] && (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.5 }}
    className="mt-12"
  >
    <h3 className="text-2xl font-semibold text-[#e49385] mb-6">
      Creative Highlights
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {fanCreatives[fanId].map((img, index) => (
        <motion.div
          key={index}
          className="relative rounded-xl overflow-hidden shadow-lg bg-[#2f2f2f] hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
          onClick={() => openFullscreen(index)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Simple image */}
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={img}
              alt={`Creative ${index + 1}`}
              className="w-full h-64 object-cover transition-all duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Simple overlay with zoom icon */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center rounded-xl">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
              <ZoomIn className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Simple image counter */}
          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
            <span className="font-medium">{index + 1}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
)}



        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-semibold text-[#e49385] mb-6">You Might Also Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(fanData)
              .filter(([id]) => id !== fanId)
              .slice(0, 3)
              .map(([id, relatedFan]) => (
                <Link key={id} to={`/fan/${id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#2f2f2f] rounded-xl p-4 hover:bg-[#3a3a3a] transition-all duration-300"
                  >
                    <img
                      src={relatedFan.image}
                      alt={relatedFan.name}
                      className="w-full h-32 object-contain mb-3"
                    />
                    <h4 className="font-semibold text-white mb-1">Anthem {relatedFan.name}</h4>
                    <p className="text-[#ba6a5a] font-bold">{relatedFan.price}</p>
                  </motion.div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FanDetail;


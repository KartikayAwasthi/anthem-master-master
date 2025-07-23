import React from 'react';
import { motion } from 'framer-motion';
import { useLoading } from '../contexts/LoadingContext';
import anthemLogo from '../assets/Anthem-logo.png';

const LoadingScreen = () => {
  const { isLoading, loadingMessage } = useLoading();
  
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#1c1c1c] via-[#2f2f2f] to-[#1c1c1c] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        {/* Anthem Logo Animation */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Actual Anthem Logo */}
          <motion.div
            className="w-24 h-24 mx-auto mb-4 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center p-3"
            animate={{ 
              scale: [1, 1.05, 1],
              rotateY: [0, 360]
            }}
            transition={{ 
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 3, repeat: Infinity, ease: "linear" }
            }}
          >
            <img
              src={anthemLogo}
              alt="Anthem Logo"
              className="w-full h-full object-contain filter brightness-110"
            />
          </motion.div>
          
          <motion.h2
            className="text-2xl font-bold text-[#ba6a5a] mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            ANTHEM
          </motion.h2>
          
          <motion.p
            className="text-gray-400 text-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Premium Ceiling Fans
          </motion.p>
        </motion.div>

        {/* Fan Blade Animation */}
        <motion.div
          className="relative w-16 h-16 mx-auto mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.1
              }}
            >
              <div
                className="w-full h-1 bg-gradient-to-r from-[#ba6a5a] to-transparent rounded-full"
                style={{
                  transformOrigin: '10% 50%',
                  transform: `rotate(${i * 120}deg)`
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          className="flex space-x-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[#e49385] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="text-gray-300 text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
        >
          {loadingMessage || 'Loading...'}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

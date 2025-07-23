import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import anthemLogo from '../assets/Anthem-logo.png';

const ColorChangeTransition = ({ isVisible, onComplete, type = 'fan' }) => {
  if (!isVisible) return null;

  const getTransitionText = () => {
    switch (type) {
      case 'wall':
        return {
          title: 'Updating Wall Color...',
          subtitle: 'Transforming your space'
        };
      case 'fan':
      default:
        return {
          title: 'Updating Color...',
          subtitle: 'Experience the new look'
        };
    }
  };

  const transitionText = getTransitionText();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => {
          // Auto-hide after animation completes
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1000);
        }}
      >
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ scale: 0.5, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: -30 }}
          transition={{ 
            duration: 0.5, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
        >
          {/* Anthem Logo with Color Change Animation */}
          <motion.div
            className="relative w-20 h-20 mb-4"
            initial={{ scale: 0.8, rotateY: 0 }}
            animate={{ 
              scale: [0.8, 1.1, 1],
              rotateY: [0, 180, 360]
            }}
            transition={{ 
              duration: 1.2,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          >
            {/* Background glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#ba6a5a] to-[#e49385] rounded-xl opacity-30 blur-lg"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: 2,
                ease: "easeInOut"
              }}
            />
            
            {/* Logo container */}
            <motion.div
              className="relative w-20 h-20 bg-white/95 backdrop-blur-md rounded-xl flex items-center justify-center shadow-2xl border border-[#ba6a5a]/20"
              animate={{
                boxShadow: [
                  "0 4px 20px rgba(186, 106, 90, 0.3)",
                  "0 8px 40px rgba(228, 147, 133, 0.5)",
                  "0 4px 20px rgba(186, 106, 90, 0.3)"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: 2,
                ease: "easeInOut"
              }}
            >
              <img
                src={anthemLogo}
                alt="Anthem Logo"
                className="w-14 h-14 object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Color Change Text */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.h3
              className="text-white text-lg font-semibold mb-2"
              animate={{
                color: ["#ffffff", "#ba6a5a", "#e49385", "#ffffff"]
              }}
              transition={{
                duration: 1.5,
                repeat: 1,
                ease: "easeInOut"
              }}
            >
              {transitionText.title}
            </motion.h3>
            
            <motion.p
              className="text-gray-300 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut"
              }}
            >
              {transitionText.subtitle}
            </motion.p>
          </motion.div>

          {/* Animated color circles */}
          <motion.div
            className="flex space-x-2 mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background: `linear-gradient(45deg, #ba6a5a, #e49385)`
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 0.8,
                  repeat: 2,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ColorChangeTransition;

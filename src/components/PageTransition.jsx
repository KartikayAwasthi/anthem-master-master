import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import anthemLogo from '../assets/Anthem-logo.png';

const PageTransition = ({ children }) => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full min-h-screen relative"
      >
        {/* Page Transition Logo Overlay */}
        <motion.div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg"
            animate={{ rotateY: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <img
              src={anthemLogo}
              alt="Anthem"
              className="w-12 h-12 object-contain"
            />
          </motion.div>
        </motion.div>
        
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;

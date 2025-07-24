import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import anthemLogo from '../assets/Anthem-logo.png';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(false);

  // Scroll to top and show transition overlay
  useEffect(() => {
    window.scrollTo(0, 0);
    setShowOverlay(true);
    const timer = setTimeout(() => setShowOverlay(false), 800); // Match transition duration
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Dynamic animation variants based on route
  const getPageVariants = (path) => {
    switch (path) {
      case '/products':
        return {
          initial: { opacity: 0, scale: 0.95 },
          in: { opacity: 1, scale: 1 },
          out: { opacity: 0, scale: 1.05 }
        };
      case '/about':
        return {
          initial: { x: 100, opacity: 0 },
          in: { x: 0, opacity: 1 },
          out: { x: -100, opacity: 0 }
        };
      case '/dealer':
        return {
          initial: { y: 50, opacity: 0 },
          in: { y: 0, opacity: 1 },
          out: { y: -50, opacity: 0 }
        };
      default:
        return {
          initial: { opacity: 0, y: 20 },
          in: { opacity: 1, y: 0 },
          out: { opacity: 0, y: -20 }
        };
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.6
  };

  const variants = getPageVariants(location.pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={variants}
        transition={pageTransition}
        className="w-full min-h-screen relative"
      >
        {/* Animated Logo Overlay */}
        {showOverlay && (
          <motion.div
            aria-hidden="true"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Rotating Fan Wings */}
            <motion.div
              className="absolute inset-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
            >
              {[0, 120, 240].map((angle, index) => (
                <motion.div
                  key={index}
                  className="absolute w-16 h-1 bg-gradient-to-r from-[#ba6a5a] to-transparent rounded-full origin-left"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: 'left center',
                    transform: `rotate(${angle}deg) translateX(40px)`
                  }}
                />
              ))}
            </motion.div>

            {/* Anthem Logo in Center */}
            <motion.div
              className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg relative z-10"
              animate={{ rotateY: 360 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <img
                src={anthemLogo}
                alt="Anthem"
                className="w-12 h-12 object-contain"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Render page content */}
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

export default PageTransition;

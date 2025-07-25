import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const anthemLogo = '/Anthem-logo.png';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(false);
  const isFirstLoadRef = useRef(true);

  // Handle transition trigger
  useEffect(() => {
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      window.scrollTo(0, 0);
      return;
    }

    setShowOverlay(true);
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setShowOverlay(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Route-specific animation styles
  const getPageVariants = (path) => {
    if (path === '/') {
      // Home: fade in with scale
      return {
        initial: { opacity: 0, scale: 0.95, y: 30 },
        in: { opacity: 1, scale: 1, y: 0 },
        out: { opacity: 0, scale: 1.05, y: -30 },
      };
    }

    if (path === '/products') {
      // Slide in from right
      return {
        initial: { opacity: 0, x: 100 },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: -100 },
      };
    }

    if (path === '/room') {
      // Flip effect
      return {
        initial: { opacity: 0, rotateY: -45 },
        in: { opacity: 1, rotateY: 0 },
        out: { opacity: 0, rotateY: 45 },
      };
    }

    if (path === '/support') {
      // Slide up
      return {
        initial: { opacity: 0, y: 50 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -50 },
      };
    }

    if (path.includes('/fan/')) {
      // Zoom-in + rise
      return {
        initial: { opacity: 0, scale: 0.8, y: 30 },
        in: { opacity: 1, scale: 1, y: 0 },
        out: { opacity: 0, scale: 1.1, y: -30 },
      };
    }

    // Default fade
    return {
      initial: { opacity: 0 },
      in: { opacity: 1 },
      out: { opacity: 0 },
    };
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.5,
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
        {/* Logo Transition Overlay */}
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              className="fixed inset-0 z-[9998] bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative flex flex-col items-center">
                {/* Spinning Logo */}
                <motion.div
                  className="w-28 h-28 rounded-full bg-white p-3 shadow-xl shadow-[#e49385]/30 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <img
                    src={anthemLogo}
                    alt="Anthem Logo"
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Text */}
                <motion.h3
                  className="text-xl md:text-2xl font-semibold mt-6 tracking-wider text-[#f8a78a]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  WELCOME TO ANTHEM
                </motion.h3>

                {/* Loading Dots */}
                <motion.div
                  className="flex space-x-2 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#e49385]"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {children}
      </motion.main>
    </AnimatePresence>
  );
};

export default PageTransition;

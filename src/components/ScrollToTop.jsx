import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    scrollToTop();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full flex justify-center py-8"
        >
          <motion.button
            onClick={handleScrollToTop}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 8px 30px rgba(186, 106, 90, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group bg-gradient-to-r from-[#ba6a5a] to-[#e49385] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            aria-label="Scroll to top"
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#e49385] to-[#ba6a5a] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            
            {/* Icon */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <ArrowUp className="w-6 h-6" />
            </motion.div>
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></div>
          </motion.button>
          
          {/* Text label */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="absolute -bottom-2 text-[#ba6a5a] text-sm font-medium"
          >
            Back to Top
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;

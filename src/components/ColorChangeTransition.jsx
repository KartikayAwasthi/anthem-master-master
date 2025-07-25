import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const anthemLogo = '/Anthem-logo.png';

const ColorChangeTransition = ({ isVisible, onComplete, type = 'fan', localized = false }) => {
  // Handle completion callback
  React.useEffect(() => {
    if (isVisible && onComplete) {
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  const getTransitionContent = () => {
    if (type === 'wall') {
      return {
        icon: '🎨',
        text: 'Changing wall color...',
        gradient: 'from-blue-600 to-purple-600',
        showLogo: false
      };
    }
    
    return {
      icon: '🌀',
      text: 'Updating fan color...',
      gradient: 'from-[#ba6a5a] to-[#e49385]',
      showLogo: true
    };
  };

  const content = getTransitionContent();

  // For localized transitions (fan color changes), show a smaller overlay
  if (localized) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated Background */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${content.gradient} opacity-40 rounded-2xl`}
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut"
              }}
            />
            
            {/* Content */}
            <motion.div
              className="relative z-10 text-center text-white"
              initial={{ scale: 0.8, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Anthem Logo for fan color changes */}
              {content.showLogo && (
                <motion.div
                  className="mb-3"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <motion.img
                    src={anthemLogo}
                    alt="Anthem"
                    className="h-12 w-auto mx-auto filter brightness-0 invert"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity
                    }}
                  />
                </motion.div>
              )}

              {/* Icon for non-fan transitions */}
              {!content.showLogo && (
                <motion.div
                  className="text-3xl mb-2"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                >
                  {content.icon}
                </motion.div>
              )}
              
              <motion.p
                className="text-sm font-medium text-white/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {content.text}
              </motion.p>
              
              {/* Loading dots */}
              <motion.div
                className="flex justify-center space-x-1 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-white/80 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // For full-screen transitions (wall color changes)
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated Background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${content.gradient} opacity-20`}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
          />
          
          {/* Content */}
          <motion.div
            className="relative z-10 text-center text-white"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Anthem Logo for fan color changes */}
            {content.showLogo && (
              <motion.div
                className="mb-6"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.img
                  src={anthemLogo}
                  alt="Anthem"
                  className="h-20 w-auto mx-auto filter brightness-0 invert"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity
                  }}
                />
              </motion.div>
            )}

            {/* Icon for non-fan transitions */}
            {!content.showLogo && (
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              >
                {content.icon}
              </motion.div>
            )}
            
            <motion.p
              className="text-lg font-medium text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {content.text}
            </motion.p>
            
            {/* Loading dots */}
            <motion.div
              className="flex justify-center space-x-1 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white/80 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ColorChangeTransition;


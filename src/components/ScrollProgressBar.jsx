import React, { useState, useEffect } from 'react';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(Math.max(scrollPercent, 0), 1));
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initialize on mount

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const progressPercentage = scrollProgress * 100;

  return (
    <div className="fixed top-[70px] left-0 w-full h-2 bg-gray-200/20 backdrop-blur-sm z-40">
      <div 
        className="h-full bg-gradient-to-r from-[#ba6a5a] to-[#e49385] transition-all duration-150 ease-out shadow-sm"
        style={{ width: `${progressPercentage}%` }}
      />
      {/* Glow effect */}
      <div 
        className="absolute top-0 h-full bg-[#ba6a5a] opacity-50 blur-sm transition-all duration-150 ease-out"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;

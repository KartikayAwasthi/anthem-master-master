import React from 'react';

const SmoothScrollLink = ({ 
  to, 
  children, 
  offset = -64, 
  duration = 1200, 
  className = '',
  onClick,
  ...props 
}) => {
  const scrollTo = (target, options = {}) => {
    if (typeof target === 'string') {
      if (target === '#top' || target === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (target.startsWith('#')) {
        const element = document.getElementById(target.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else if (target && target.scrollIntoView) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Handle different scroll targets
    scrollTo(to);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};

export default SmoothScrollLink;

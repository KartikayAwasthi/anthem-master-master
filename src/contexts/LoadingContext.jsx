import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const location = useLocation();

  // Handle route changes
  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage('Loading page...');

    // Simulate loading time based on route
    let loadingTime = 800; // Default loading time

    // Customize loading time for different routes
    if (location.pathname.includes('/room')) {
      loadingTime = 1500; // Longer for 3D room
      setLoadingMessage('Preparing 3D Experience...');
    } else if (location.pathname.includes('/fan/')) {
      loadingTime = 1000; // Medium for fan details
      setLoadingMessage('Loading Anthem fan details...');
    } else if (location.pathname === '/') {
      loadingTime = 1200; // Medium for home page
      setLoadingMessage('Welcome to Anthem Fans...');
    } else if (location.pathname.includes('/products')) {
      loadingTime = 900;
      setLoadingMessage('Loading premium fans...');
    } else if (location.pathname.includes('/about')) {
      loadingTime = 900;
      setLoadingMessage('Loading our story...');
    } else if (location.pathname.includes('/support')) {
      loadingTime = 800;
      setLoadingMessage('Loading support center...');
    } else if (location.pathname.includes('/dealer')) {
      loadingTime = 800;
      setLoadingMessage('Finding dealers near you...');
    } else {
      loadingTime = 800;
      setLoadingMessage('Loading Anthem experience...');
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      setLoadingMessage('');
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Manual loading controls
  const startLoading = (message = 'Loading...') => {
    setIsLoading(true);
    setLoadingMessage(message);
  };

  const stopLoading = () => {
    setIsLoading(false);
    setLoadingMessage('');
  };

  const value = {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

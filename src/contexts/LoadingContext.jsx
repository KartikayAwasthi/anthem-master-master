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
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  // Handle route changes with smooth transitions
  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    
    // Start transition
    setIsTransitioning(true);
    setLoadingMessage('Loading page...');
    
    // Simulate brief loading for transition
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setLoadingMessage('');
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname, isFirstLoad]);

  // Manual loading controls
  const startLoading = (message = 'Loading...') => {
    setIsLoading(true);
    setLoadingMessage(message);
  };

  const stopLoading = () => {
    setIsLoading(false);
    setLoadingMessage('');
  };

  // Transition controls
  const startTransition = (message = 'Loading...') => {
    setIsTransitioning(true);
    setLoadingMessage(message);
  };

  const stopTransition = () => {
    setIsTransitioning(false);
    setLoadingMessage('');
  };

  const value = {
    isLoading: isLoading || isTransitioning,
    loadingMessage,
    isTransitioning,
    startLoading,
    stopLoading,
    startTransition,
    stopTransition
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

import React, { createContext, useContext, useState,useEffect } from 'react';
import Loader from './Loader';


const LoaderContext = createContext();


export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);


  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Loader />}
    </LoaderContext.Provider>
  );
};

// custom hook
export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) {
      throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
};

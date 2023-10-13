// ScrollMemory.js
import { useState, useEffect } from 'react';

function ScrollMemory() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]); // Add scrollPosition as a dependency

  return null;
}

export default ScrollMemory;

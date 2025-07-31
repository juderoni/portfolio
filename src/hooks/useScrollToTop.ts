import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use instant scroll for route changes to avoid conflicts with user scrolling
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Changed from 'smooth' to 'instant'
    });
  }, [pathname]);
};

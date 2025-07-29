import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Temporarily enable smooth scrolling for route changes
    document.documentElement.classList.add('smooth-scroll');
    
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    // Remove smooth scroll class after a delay to prevent conflicts
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('smooth-scroll');
    }, 1000);

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove('smooth-scroll');
    };
  }, [pathname]);
};

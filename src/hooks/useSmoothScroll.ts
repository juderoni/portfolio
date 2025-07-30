import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId: string, offset: number = 80) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Temporarily enable smooth scrolling
      document.documentElement.classList.add('smooth-scroll');
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Remove smooth scroll class after scrolling
      setTimeout(() => {
        document.documentElement.classList.remove('smooth-scroll');
      }, 1000);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    // Temporarily enable smooth scrolling
    document.documentElement.classList.add('smooth-scroll');
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Remove smooth scroll class after scrolling
    setTimeout(() => {
      document.documentElement.classList.remove('smooth-scroll');
    }, 1000);
  }, []);

  return { scrollToElement, scrollToTop };
};
import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    // If reduced motion is requested, immediately activate everything
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-init').forEach((el) => {
        el.classList.add('reveal-active');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-init').forEach((el) => {
        el.classList.add('reveal-active');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal-init:not(.reveal-active)');
      elements.forEach((el) => {
        // If element is already in viewport or above it (e.g. user scrolled or refreshed), activate immediately
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.95) {
          el.classList.add('reveal-active');
        } else {
          observer.observe(el);
        }
      });
    };

    // Run initially and after a slight delay to capture dynamically rendered items
    observeElements();
    const timeout = setTimeout(observeElements, 400);

    // Also fallback check on scroll to prevent any element from ever remaining invisible
    const handleScroll = () => {
      document.querySelectorAll('.reveal-init:not(.reveal-active)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.95) {
          el.classList.add('reveal-active');
          observer.unobserve(el);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}

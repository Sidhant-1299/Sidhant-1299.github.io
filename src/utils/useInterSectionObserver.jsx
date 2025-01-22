import { useState, useEffect, useRef } from "react";

/**
 * A custom hook for observing the intersection of an element with the viewport.
 * @param {Object} options - Intersection Observer options (root, rootMargin, threshold).
 * @returns {Object} - { ref, isVisible }:
 * - ref: Pass this to the element you want to observe.
 * - isVisible: Boolean indicating whether the element is in the viewport.
 */
function useIntersectionObserver(options = { threshold: 0.1 }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options]);

  return { ref: elementRef, isVisible };
}

export default useIntersectionObserver;

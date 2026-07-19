import { useCallback, useRef } from 'react';
import gsap from 'gsap';

const observe = (
  element: HTMLElement,
  onIntersect: () => void,
  rootMargin: string
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin }
  );
  observer.observe(element);
  return () => observer.disconnect();
};

export const useScrollAnimation = () => {
  const cleanupRef = useRef<() => void>();

  const setRef = useCallback((element: HTMLElement | null) => {
    cleanupRef.current?.();
    cleanupRef.current = undefined;
    if (!element) return;

    cleanupRef.current = observe(
      element,
      () => element.classList.add('animate-in'),
      '0px 0px -50px 0px'
    );
  }, []);

  return setRef;
};

export const useFadeInUp = () => {
  const cleanupRef = useRef<() => void>();

  const setRef = useCallback((element: HTMLElement | null) => {
    cleanupRef.current?.();
    cleanupRef.current = undefined;
    if (!element) return;

    gsap.set(element, { opacity: 0, y: 30 });

    cleanupRef.current = observe(
      element,
      () => {
        gsap.to(element, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
      },
      '0px 0px -100px 0px'
    );
  }, []);

  return setRef;
};

export const useSlideReveal = (
  delay: number = 0,
  distance: number = 60,
  duration: number = 0.9
) => {
  const cleanupRef = useRef<() => void>();

  const setRef = useCallback((element: HTMLElement | null) => {
    cleanupRef.current?.();
    cleanupRef.current = undefined;
    if (!element) return;

    gsap.set(element, { opacity: 0, y: distance });

    cleanupRef.current = observe(
      element,
      () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration,
          delay: delay * 0.25,
          ease: 'expo.out',
        });
      },
      '0px 0px -20% 0px'
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, distance, duration]);

  return setRef;
};

export const useStaggerAnimation = (delay: number = 0) => {
  const cleanupRef = useRef<() => void>();

  const setRef = useCallback((element: HTMLElement | null) => {
    cleanupRef.current?.();
    cleanupRef.current = undefined;
    if (!element) return;

    gsap.set(element, { opacity: 0, y: 40 });

    cleanupRef.current = observe(
      element,
      () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: delay * 0.2,
          ease: 'power2.out',
        });
      },
      '0px 0px -50px 0px'
    );
  }, [delay]);

  return setRef;
};

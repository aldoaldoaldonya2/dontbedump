'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const GsapScrollSmoother = ({ children }: { children: React.ReactNode }) => {
  const smoother = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    smoother.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
    });

    ScrollTrigger.refresh();

    return () => {
      if (smoother.current) {
        smoother.current.kill();
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper" style={{ overflow: 'hidden', position: 'fixed', width: '100%', height: '100%', top: 0, left: 0 }}>
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
};

export default GsapScrollSmoother;

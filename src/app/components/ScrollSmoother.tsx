'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { Observer } from 'gsap/dist/Observer';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);

const GsapScrollSmoother = ({ children }: { children: React.ReactNode }) => {
  const smoother = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const wrapper = document.querySelector('#smooth-wrapper');
      const content = document.querySelector('#smooth-content');

      if (wrapper && content) {
        smoother.current = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.2,
          effects: true,
          smoothTouch: 0.1,
        });

        ScrollTrigger.refresh();
      }
    }

    return () => {
      if (smoother.current) {
        smoother.current.kill();
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper" style={{ overflow: 'hidden', width: '100%' }}>
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
};

export default GsapScrollSmoother;
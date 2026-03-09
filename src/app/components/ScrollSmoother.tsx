'use client';

import { useEffect, useRef } from 'react';

const GsapScrollSmoother = ({ children }: { children: React.ReactNode }) => {
  const smoother = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    const initSmoother = async () => {
      try {
        // Dynamic import to avoid SSR and tree-shaking issues
        const { gsap } = await import('gsap/dist/gsap');
        const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
        const { ScrollSmoother: ScrollSmootherPlugin } = await import('gsap/dist/ScrollSmoother');
        const { Observer } = await import('gsap/dist/Observer');

        // Register all plugins
        gsap.registerPlugin(ScrollTrigger, ScrollSmootherPlugin, Observer);

        ctx = gsap.context(() => {
          smoother.current = ScrollSmootherPlugin.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.2,
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: true,
          });
        });

        ScrollTrigger.refresh();
      } catch (error) {
        console.warn('ScrollSmoother initialization failed:', error);
      }
    };

    initSmoother();

    return () => {
      if (smoother.current) {
        smoother.current.kill();
        smoother.current = null;
      }
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef} style={{ overflow: 'hidden', width: '100%' }}>
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
};

export default GsapScrollSmoother;
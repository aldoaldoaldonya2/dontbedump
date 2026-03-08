'use client';

import { useEffect, useRef } from 'react';
// Gunakan path lengkap ke file /dist/ untuk stabilitas di Vercel
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
// WAJIB: Tambahkan Observer karena normalizeScroll membutuhkannya
import { Observer } from 'gsap/dist/Observer';

// Registrasi semua plugin yang terlibat
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);
}

const GsapScrollSmoother = ({ children }: { children: React.ReactNode }) => {
  const smoother = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Pastikan elemen wrapper dan content sudah ada di DOM
      const wrapper = document.querySelector('#smooth-wrapper');
      const content = document.querySelector('#smooth-content');

      if (wrapper && content) {
        smoother.current = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.2,
          effects: true,
          smoothTouch: 0.1,
          normalizeScroll: true,
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
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        const footer = footerRef.current;
        const title = titleRef.current;
        if (!footer || !title) return;

        gsap.fromTo(title,
            { opacity: 0, y: 100, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: footer,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    return (
        <footer ref={footerRef} className="relative bg-black text-white py-12 md:py-20 overflow-hidden border-t border-white/10 z-50">
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-black z-0"></div>

            <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 flex flex-col items-center">

                <h2 ref={titleRef} className="text-[12vw] font-notable leading-none tracking-tighter text-center whitespace-nowrap opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] mb-12">
                    DON'T BE DUMB
                </h2>

                <div className="w-full h-px bg-white/20 mb-10 blur-[1px]"></div>

                <div className="w-full flex flex-col md:flex-row gap-10 md:gap-4 items-center justify-between text-center md:text-left">

                    <div className="flex flex-col gap-2 font-limelight">
                        <p className="text-2xl md:text-3xl text-white/80">A$AP ROCKY</p>
                        <p className="text-md text-white/40">Awge / RCA Records</p>
                    </div>

                    <div className="flex justify-center gap-8">
                        <a href="https://instagram.com/asaprocky" target="_blank" className="hover:-translate-y-2 hover:scale-110 transition-all duration-300"><i className="bi bi-instagram text-4xl text-white/60 hover:text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"></i></a>
                        <a href="https://twitter.com/asvpxrocky" target="_blank" className="hover:-translate-y-2 hover:scale-110 transition-all duration-300"><i className="bi bi-twitter-x text-4xl text-white/60 hover:text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"></i></a>
                        <a href="https://open.spotify.com/album/4itKk52E9ZCdWUQcFAkud9" target="_blank" className="hover:-translate-y-2 hover:scale-110 transition-all duration-300"><i className="bi bi-spotify text-4xl text-white/60 hover:text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"></i></a>
                        <a href="https://music.apple.com/us/album/dont-be-dumb/1862934946" target="_blank" className="hover:-translate-y-2 hover:scale-110 transition-all duration-300"><i className="bi bi-apple text-4xl text-white/60 hover:text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"></i></a>
                        <a href="https://github.com/aldoaldoaldonya2" target="_blank" className="hover:-translate-y-2 hover:scale-110 transition-all duration-300"><i className="bi bi-github text-4xl text-white/60 hover:text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"></i></a>
                    </div>

                    <div className="flex flex-col gap-2 font-notable md:text-right text-white/40 text-sm">
                        <p>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED.</p>
                        <p className="hover:text-white transition-colors cursor-pointer">DESIGNED BY ALDO</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

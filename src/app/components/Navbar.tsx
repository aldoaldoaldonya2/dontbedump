"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const menuLinksRef = useRef<HTMLUListElement>(null);
    const menuOpenRef = useRef(isMenuOpen);

    useEffect(() => {
        menuOpenRef.current = isMenuOpen;
    }, [isMenuOpen]);

    // Navigation Hide/Show on Scroll logic
    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        // Set initial hidden state above screen
        gsap.set(nav, { yPercent: -200, opacity: 0 });

        // Show animation timeline for scroll
        const showNav = gsap.to(nav, {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: "circ.out",
            paused: true
        });

        let lastScrollY = 0;
        let accumulatedUp = 0;

        ScrollTrigger.create({
            start: "top -50",
            onUpdate: (self) => {
                const currentScroll = self.scroll();
                const delta = currentScroll - lastScrollY;
                lastScrollY = currentScroll;

                // Stop triggering scroll effects if menu is open
                if (menuOpenRef.current) return;

                if (delta < 0) {
                    // Scrolling up
                    accumulatedUp += Math.abs(delta);
                    if (accumulatedUp > 100) {
                        showNav.play();
                    }
                } else if (delta > 0) {
                    // Scrolling down
                    accumulatedUp = 0;
                    if (delta > 10) {
                        showNav.reverse();
                    }
                }
            }
        });

        // Intro animation when website loads
        gsap.to(nav, { yPercent: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    useGSAP(() => {
        const overlay = overlayRef.current;
        const links = menuLinksRef.current?.children;
        if (!overlay || !links) return;

        if (isMenuOpen) {
            gsap.to(overlay, {
                clipPath: "circle(150% at 50% 50%)",
                duration: 1.2,
                ease: "power4.inOut"
            });
            gsap.fromTo(links,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.4, ease: "back.out(1.2)" }
            );
        } else {
            gsap.to(overlay, {
                clipPath: "circle(0% at 50% 50%)",
                duration: 0.8,
                ease: "power3.inOut"
            });
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleScroll = (e: React.MouseEvent<HTMLElement>, target: string) => {
        e.preventDefault();
        setIsMenuOpen(false);

        gsap.to(window, {
            duration: 0.8,
            scrollTo: {
                y: target,
                offsetY: 0
            },
            ease: "power3.inOut"
        });
    };

    return (
        <>
            <nav
                ref={navRef}
                className="fixed border-white/30 top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-70 flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-xl border rounded-full text-white shadow-2xl"
            >
                <button
                    onClick={toggleMenu}
                    className="relative cursor-pointer flex justify-center items-center w-12 h-12 focus:outline-none group z-50 hover:scale-110 transition-transform"
                >
                    <span className={`block absolute w-8 h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45" : "-translate-y-2 group-hover:w-6"}`}></span>
                    <span className={`block absolute w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
                    <span className={`block absolute w-8 h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45" : "translate-y-2 group-hover:w-6"}`}></span>
                </button>
                <h1 className="text-3xl md:text-4xl text-nowrap -mt-2 absolute left-1/2 -translate-x-1/2 font-notable cursor-pointer"
                    onClick={(e) => handleScroll(e, "#hero")}>
                    Don't Be Dumb
                </h1>
                <div className="hidden md:flex items-center gap-4">
                    <a href="https://github.com/aldoaldoaldonya2" target="_blank" className="hover:text-gray-300 transition-all"><i className="bi bi-github text-3xl"></i></a>
                </div>
            </nav>

            {/* Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[60] flex flex-col justify-center items-center"
                style={{
                    clipPath: "circle(0% at 50% 50%)",
                    pointerEvents: isMenuOpen ? "auto" : "none"
                }}
            >

                <h2 className="absolute top-10 left-10 text-3xl font-notable text-white/10 uppercase tracking-widest hidden md:block">Navigation</h2>

                <ul ref={menuLinksRef} className="list-none flex flex-col gap-10 text-center font-limelight text-5xl md:text-7xl text-white">
                    <li className="overflow-hidden">
                        <a
                            href="#about"
                            onClick={(e) => handleScroll(e, "#about")}
                            className="inline-block hover:text-gray-400 hover:scale-110 hover:skew-x-2 transition-all duration-300"
                        >
                            About
                        </a>
                    </li>
                    <li className="overflow-hidden">
                        <a
                            href="#music"
                            onClick={(e) => handleScroll(e, "#music")}
                            className="inline-block hover:text-gray-400 hover:scale-110 hover:-skew-x-2 transition-all duration-300"
                        >
                            Music
                        </a>
                    </li>
                    <li className="overflow-hidden">
                        <a
                            href="#story"
                            onClick={(e) => handleScroll(e, "#story")}
                            className="inline-block hover:text-gray-400 hover:scale-110 hover:skew-x-2 transition-all duration-300"
                        >
                            Story
                        </a>
                    </li>
                </ul>

                <div className="absolute bottom-12 flex items-center gap-8 md:hidden">
                    <a href="https://music.apple.com/us/album/dont-be-dumb/1862934946" target="_blank" className="hover:scale-110 transition-transform"><i className="bi bi-apple-music text-3xl text-white/70 hover:text-white"></i></a>
                    <a href="https://open.spotify.com/album/4itKk52E9ZCdWUQcFAkud9?si=Bnxya4uLTSWKiaQyztA2sg" target="_blank" className="hover:scale-110 transition-transform"><i className="bi bi-spotify text-3xl text-white/70 hover:text-white"></i></a>
                    <a href="https://github.com/aldoaldoaldonya2" target="_blank" className="hover:scale-110 transition-transform"><i className="bi bi-github text-3xl text-white/70 hover:text-white"></i></a>
                </div>
            </div>
        </>
    );
}

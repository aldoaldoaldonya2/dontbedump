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
    const characterRef = useRef<HTMLImageElement>(null);
    const menuOpenRef = useRef(isMenuOpen);

    useEffect(() => {
        menuOpenRef.current = isMenuOpen;
    }, [isMenuOpen]);

    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        const showNav = gsap.to(nav, {
            top: "24px",
            opacity: 1,
            duration: 0.5,
            ease: "circ.out",
            paused: true
        });

        let lastScrollY = 0;
        let accumulatedDown = 0;

        ScrollTrigger.create({
            start: "top -50",
            onUpdate: (self) => {
                const currentScroll = self.scroll();
                const delta = currentScroll - lastScrollY;
                lastScrollY = currentScroll;

                if (menuOpenRef.current) return;

                if (delta > 0) {
                    accumulatedDown = 0;
                    if (delta > 10) {
                        showNav.reverse();
                    }
                } else if (delta < 0) {
                    accumulatedDown += Math.abs(delta);
                    if (accumulatedDown > 50) {
                        showNav.play();
                    }
                }
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    useGSAP(() => {
        const overlay = overlayRef.current;
        const links = menuLinksRef.current?.children;
        const character = characterRef.current;
        if (!overlay || !links || !character) return;

        if (isMenuOpen) {
            gsap.to(overlay, {
                clipPath: "circle(150% at 50% 50%)",
                duration: 1.2,
                ease: "power4.inOut"
            });
            gsap.fromTo(links,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.4, ease: "back.out(1.2)" }
            );
            gsap.fromTo(character,
                { rotation: 25, x: 100, y: 100, opacity: 0, scale: 0.8 },
                { rotation: -5, x: 0, y: 0, opacity: 1, scale: 1, duration: 1.5, delay: 0.6, ease: "elastic.out(1, 0.5)" }
            );
        } else {
            gsap.to(overlay, {
                clipPath: "circle(0% at 50% 50%)",
                duration: 0.8,
                ease: "power3.inOut"
            });
            gsap.to(character, {
                opacity: 0,
                x: 100,
                rotation: 25,
                duration: 0.6,
                ease: "power2.in"
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
                className="fixed border-white/30 top-[-120px] opacity-0 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-70 flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-xl border rounded-full text-white shadow-2xl"
            >
                <button
                    onClick={toggleMenu}
                    className="relative cursor-pointer flex justify-center items-center w-8 h-8 md:w-12 md:h-12 focus:outline-none group z-50 hover:scale-110 transition-transform"
                >
                    <span className={`block absolute w-8 h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45" : "-translate-y-2 group-hover:w-6"}`}></span>
                    <span className={`block absolute w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
                    <span className={`block absolute w-8 h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45" : "translate-y-2 group-hover:w-6"}`}></span>
                </button>
                <h1 className="text-xl md:text-4xl text-nowrap -mt-2 absolute left-1/2 -translate-x-1/2 font-notable cursor-help"
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
                className="fixed inset-0 bg-background/50 backdrop-blur-3xl z-60 w-full h-full"
                style={{
                    clipPath: "circle(0% at 50% 50%)",
                    pointerEvents: isMenuOpen ? "auto" : "none"
                }}>

                <h2 className="absolute top-10 left-10 text-3xl font-notable text-white/40 uppercase tracking-widest hidden md:block z-10">Navigation</h2>

                <div className="absolute top-10 right-10 z-10 flex flex-col items-center gap-6 md:gap-10">
                    <div className="flex gap-10 md:gap-10">
                        <a href="https://music.apple.com/us/album/dont-be-dumb/1862934946" target="_blank" className="transition-transform duration-200 ease-out"><i className="bi bi-apple text-4xl md:text-5xl text-white/80 hover:text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"></i></a>
                        <a href="https://open.spotify.com/album/4itKk52E9ZCdWUQcFAkud9?si=Bnxya4uLTSWKiaQyztA2sg" target="_blank" className="transition-transform duration-200 ease-out"><i className="bi bi-spotify text-4xl md:text-5xl text-white/80 hover:text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"></i></a>
                    </div>
                </div>

                <div className="absolute left-10 md:left-52 top-1/2 -translate-y-1/2 z-20">
                    <ul ref={menuLinksRef} className="list-none flex flex-col gap-6 md:gap-8 font-limelight text-4xl md:text-5xl text-white">
                        <li className="overflow-hidden">
                            <a
                                href="#about"
                                onClick={(e) => handleScroll(e, "#about")}
                                className="group relative inline-block transition-all duration-300 py-1"
                            >
                                About
                                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                            </a>
                        </li>
                        <li className="overflow-hidden">
                            <a
                                href="#music"
                                onClick={(e) => handleScroll(e, "#music")}
                                className="group relative inline-block transition-all duration-300 py-1"
                            >
                                Music
                                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                            </a>
                        </li>
                        <li className="overflow-hidden">
                            <a
                                href="#story"
                                onClick={(e) => handleScroll(e, "#story")}
                                className="group relative inline-block transition-all duration-300 py-1"
                            >
                                Story
                                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                            </a>
                        </li>
                        <li className="overflow-hidden">
                            <a
                                href="#characters"
                                onClick={(e) => handleScroll(e, "#characters")}
                                className="group relative inline-block transition-all duration-300 py-1"
                            >
                                Characters
                                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                            </a>
                        </li>
                        <li className="overflow-hidden">
                            <a
                                href="#asap-rocky"
                                onClick={(e) => handleScroll(e, "#asap-rocky")}
                                className="group relative inline-block transition-all duration-300 py-1"
                            >
                                A$AP Rocky
                                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="absolute -bottom-20 -right-20 md:-bottom-25 md:-right-10 z-0 pointer-events-none">
                    <img
                        ref={characterRef}
                        src="/assets/images/overlay.png"
                        alt="Character Overlay"
                        className="w-[350px] md:w-[450px] object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] opacity-0 mix-blend-screen"
                    />
                </div>
            </div>
        </>
    );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const showAnim = gsap.from(navRef.current, {
                yPercent: -100,
                paused: true,
                duration: 0.3,
                delay: 0.5,
                ease: "power2.out"
            }).progress(1);

            ScrollTrigger.create({
                start: "top top",
                end: "max",
                onUpdate: (self) => {
                    if (self.direction === -1) {
                        showAnim.play();
                    } else if (self.direction === 1) {
                        showAnim.reverse();
                    }
                }
            });

            gsap.set(navRef.current, { yPercent: -100 });

            const handlePreloaderFinished = () => {
                gsap.to(navRef.current, {
                    delay: 3,
                    yPercent: 0,
                    visibility: "visible",
                    duration: 0.8,
                    ease: "power2.out"
                });
            };

            window.addEventListener("preloaderFinished", handlePreloaderFinished);

            return () => {
                window.removeEventListener("preloaderFinished", handlePreloaderFinished);
            };
        });

        return () => ctx.revert();
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLElement>, target: string) => {
        e.preventDefault();
        gsap.to(window, {
            duration: 0.6,
            scrollTo: {
                y: target,
                offsetY: 20
            },
            ease: "power3.inOut"
        });
    };

    return (
        <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-6 bg-background text-white">

            <ul className="list-none flex gap-6 font-limelight text-xl">
                <li>
                    <a
                        href="#about"
                        onClick={(e) => handleScroll(e, "#about")}
                        className="hover:text-red-500 transition-colors duration-300"
                    >
                        About
                    </a>
                </li>
                <li>
                    <a
                        href="#music"
                        onClick={(e) => handleScroll(e, "#music")}
                        className="hover:text-red-500 transition-colors duration-300"
                    >
                        Music
                    </a>
                </li>
                <li>
                    <a
                        href="#story"
                        onClick={(e) => handleScroll(e, "#story")}
                        className="hover:text-red-500 transition-colors duration-300"
                    >
                        Story
                    </a>
                </li>
            </ul>
            <h1 className="text-5xl cursor-help font-notable absolute left-1/2 -translate-x-1/2 -translate-y-2"
                onClick={(e) => handleScroll(e, "#hero")}>
                Don't Be
            </h1>
            <div className="flex items-center gap-6">
                <a href="https://music.apple.com/us/album/dont-be-dumb/1862934946" target="_blank" className="hover:scale-110 transition-transform"><i className="bi bi-apple-music text-4xl"></i></a>
                <a href="https://open.spotify.com/album/4itKk52E9ZCdWUQcFAkud9?si=Bnxya4uLTSWKiaQyztA2sg" target="_blank" className="hover:scale-110 transition-transform"><i className="bi bi-spotify text-4xl"></i></a>
                <a href="https://github.com/aldoaldoaldonya2" target="_blank" className="hover:scale-110 transition-transform"><i className="bi bi-github text-4xl"></i></a>
            </div>
            <div className="border-b border-foreground w-[calc(95%)] absolute bottom-0"></div>
        </nav>
    );
}

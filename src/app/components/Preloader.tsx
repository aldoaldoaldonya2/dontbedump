"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/dist/Flip";

if (typeof window !== "undefined") {
    gsap.registerPlugin(Flip);
}

export default function Preloader() {
    const container = useRef<HTMLDivElement>(null);
    const albumRef = useRef<HTMLImageElement>(null);
    const vinylRef = useRef<HTMLImageElement>(null);
    const vinylWrapperRef = useRef<HTMLDivElement>(null);
    const preloadOverlayRef = useRef<HTMLDivElement>(null);

    const [isLoaded, setIsLoaded] = useState(false);

    useGSAP(() => {
        gsap.to(albumRef.current, {
            scale: 1,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        if (typeof window !== "undefined") {
            const handleLoad = () => setIsLoaded(true);

            if (document.readyState === "complete") {
                setIsLoaded(true);
            } else {
                window.addEventListener("load", handleLoad);
                return () => window.removeEventListener("load", handleLoad);
            }
        }
    }, { scope: container });

    useGSAP(() => {
        if (!isLoaded || !albumRef.current || !vinylRef.current || !vinylWrapperRef.current) return;

        gsap.killTweensOf(albumRef.current);

        const tl = gsap.timeline();
        gsap.to(vinylRef.current, {
            rotation: 360,
            duration: 10,
            repeat: -1,
            ease: "none",
        });

        tl.to(albumRef.current, {
            delay: 0.5,
            yPercent: 400,
            opacity: 0.5,
            duration: 4,
            ease: "power4.inOut",
        })
            .fromTo(vinylWrapperRef.current,
                { scale: 1.0 },
                {
                    scale: 1.1,
                    duration: 1,
                    ease: "power4.out"
                },
                "<0.2"
            )
            .add(() => {
                const target = document.querySelector("#vinyl");
                if (target && vinylWrapperRef.current && preloadOverlayRef.current) {
                    const state = Flip.getState(vinylWrapperRef.current);

                    vinylWrapperRef.current.classList.remove("-z-10");

                    target.appendChild(vinylWrapperRef.current);

                    // Start fading out overlay and disable pointer events
                    gsap.to(preloadOverlayRef.current, {
                        // autoAlpha: 0,
                        opacity: 0,
                        duration: 1,
                        onComplete: () => {
                            if (preloadOverlayRef.current) preloadOverlayRef.current.style.display = 'none';
                        }
                    });

                    window.dispatchEvent(new CustomEvent("preloaderFinished"));

                    Flip.from(state, {
                        duration: 1.8,
                        ease: "expo.inOut",
                        scale: true,
                        absolute: true,
                    });
                }
            });

    }, { dependencies: [isLoaded], scope: container });

    return (
        <div
            ref={preloadOverlayRef}
            className="fixed inset-0 z-50 bg-gray-500 flex items-center justify-center overflow-hidden"
        >
            <div ref={container} className="relative w-80 h-80 sm:w-96 sm:h-96">
                <div
                    ref={vinylWrapperRef}
                    className="absolute inset-0 flex items-center justify-center -z-10"
                >
                    <Image
                        ref={vinylRef}
                        src="/assets/images/vinyl.png"
                        alt="Vinyl Record"
                        width={400}
                        height={400}
                        className="w-full h-full object-contain"
                        priority
                    />
                </div>

                <Image
                    ref={albumRef}
                    src="/assets/images/album.png"
                    alt="Album Cover"
                    width={400}
                    height={400}
                    className="absolute inset-0 w-full h-full object-contain shadow-2xl z-10"
                    priority
                />
            </div>
        </div>
    );
}

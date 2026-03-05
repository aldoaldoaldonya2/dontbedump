"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/all";

if (typeof window !== "undefined") {
    gsap.registerPlugin(Flip);
}

export default function Preloader() {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isLoaded || !imageRef.current || !preloaderRef.current) return;

        const targetContainer = document.querySelector("#hero-image-target");

        if (targetContainer) {
            const state = Flip.getState(imageRef.current);

            targetContainer.appendChild(imageRef.current);

            window.dispatchEvent(new CustomEvent("preloaderFinished"));
            gsap.to(preloaderRef.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    if (preloaderRef.current) {
                        preloaderRef.current.style.display = "none";
                    }
                }
            });

            Flip.from(state, {
                duration: 1.5,
                ease: "power3.inOut",
                scale: true,
                absolute: true
            });
        }
    }, [isLoaded]);

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-200 flex items-center justify-center"
        >
            <img
                ref={imageRef}
                src="/assets/images/album.png"
                alt="Don't Be Dumb"
                className="w-1/2 md:w-1/3 max-w-md object-contain z-250 shadow-2xl"
                data-flip-id="hero-img"
            />
        </div>
    );
}

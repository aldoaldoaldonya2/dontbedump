"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let xPercent = 0;
        let direction = -1;

        const animate = () => {
            if (xPercent <= -50) {
                xPercent = 0;
            } else if (xPercent > 0) {
                xPercent = -50;
            }

            if (marqueeRef.current) {
                gsap.set(marqueeRef.current, { xPercent: xPercent });
            }

            xPercent += 0.04 * direction;
            requestAnimationFrame(animate);
        };

        const scrollTrigger = ScrollTrigger.create({
            onUpdate: (self) => {
                const velocity = self.getVelocity();
                const skew = gsap.utils.clamp(-15, 15, velocity / 50);

                direction = self.direction === 1 ? -1 : 1;

                gsap.to(".marquee-text", {
                    skewX: skew,
                    duration: 0.2,
                    ease: "power1.out",
                    overwrite: true,
                    onComplete: () => {
                        gsap.to(".marquee-text", {
                            skewX: 0,
                            duration: 0.6,
                            ease: "power2.out",
                        });
                    }
                });
            }
        });

        const animationHandle = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationHandle);
            scrollTrigger.kill();
        };
    }, []);

    const content = " DON'T BE DUMB ";
    const repeatedContent = new Array(8).fill(content).join("");

    return (
        <section className="bg-black py-10 overflow-hidden border-y border-white/20">
            <div className="flex whitespace-nowrap relative">
                <div ref={marqueeRef} className="flex shrink-0">
                    <div ref={textRef} className="marquee-text text-3xl md:text-3xl font-notable text-white uppercase leading-none px-3">
                        {repeatedContent}
                    </div>
                    <div className="marquee-text text-3xl md:text-3xl font-notable text-white uppercase leading-none px-3">
                        {repeatedContent}
                    </div>
                </div>
            </div>
        </section>
    );
}

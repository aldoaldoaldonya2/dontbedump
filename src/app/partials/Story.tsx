"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Story() {
    useGSAP(() => {
        gsap.to(".story-bg", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: "#story",
                scrub: true
            }
        });

        gsap.from(".story-content > *", {
            x: -100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: "#story",
                start: "top 60%",
            }
        });
    });

    return (
        <section id="story" className="relative min-h-screen w-full bg-[#111] overflow-hidden flex items-center px-10 py-20">
            <div className="story-bg absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
                <h1 className="text-[40vw] font-notable text-white select-none leading-none">DUMB</h1>
            </div>

            <div className="container mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-20">
                <div className="story-content">
                    <h2 className="text-8xl font-lacquer text-white mb-10 leading-none">THE MANIFESTO</h2>
                    <p className="text-3xl text-white/80 font-bold mb-8 leading-tight">
                        "Common sense isn't common. Intelligence isn't about knowing all the answers; it's about the courage to ask the right questions."
                    </p>
                    <p className="text-xl text-white/60 leading-relaxed max-w-xl">
                        A$AP Rocky's return to the spotlight is a calculated collision of high art and raw street energy. Through the lens of "Ghetto Expressionism," urban life is transformed into a politically charged artistic statement. This is the lulllaby for the sophisticated ignorant.
                    </p>
                </div>
                <div className="hidden md:block">
                    <div className="w-full aspect-square bg-white/5 border border-white/10 rounded-lg flex items-center justify-center backdrop-blur-3xl p-12">
                        {/* <div className="text-center">
                            <h3 className="text-3xl font-notable mb-4">TIM BURTON</h3>
                            <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Visual Consultant / Art Direction</p>
                        </div> */}
                        <img src="/assets/images/dontbedumb.jpg" alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}

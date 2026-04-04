"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const barcodeWidths = [2.4, 4.1, 1.2, 3.8, 4.5, 1.9, 3.2, 2.7, 4.9, 1.5, 3.6, 4.2, 2.1, 3.9, 1.8, 4.7, 2.5, 3.4, 1.3, 4.8, 2.9, 3.1, 4.4, 1.7, 3.5];

export default function Listen() {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        const text = textRef.current;

        if (!container || !content || !text) return;

        gsap.fromTo(text,
            { opacity: 0, y: 50, filter: "blur(10px)" },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        gsap.fromTo(content,
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                delay: 0.3,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: container,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Simple subtle parallax on background
        gsap.to(".bg-grid", {
            y: 100,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

    }, []);

    return (
        <section ref={containerRef} id="listen" className="relative w-full py-32 flex flex-col items-center justify-center bg-black overflow-hidden border-y border-white/5">

            {/* Very minimal grid background */}
            <div className="bg-grid absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 w-full max-w-[900px] px-6 flex flex-col items-center">

                <div className="mb-12 flex flex-col items-center text-center">
                    <p className="font-notable text-white/40 uppercase tracking-[0.5em] text-sm md:text-base mb-4">Official Audio</p>
                    <h2 ref={textRef} className="text-4xl md:text-6xl lg:text-7xl font-limelight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        STREAM IT
                    </h2>
                </div>

                <div
                    ref={contentRef}
                    className="w-full relative bg-neutral-950 p-2 md:p-6 rounded-[20px] md:rounded-[32px] border border-white/10 shadow-2xl group flex flex-col justify-center items-center"
                >
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] pointer-events-none"></div>

                    <div className="relative w-full h-[420px] bg-black rounded-[14px] mb-8 md:rounded-[24px] overflow-hidden shadow-inner border border-white/5 grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-in-out">
                        <iframe
                            data-testid="embed-iframe"
                            style={{ borderRadius: '12px', border: 'none', background: 'transparent' }}
                            src="https://open.spotify.com/embed/album/4itKk52E9ZCdWUQcFAkud9?utm_source=generator&theme=0"
                            width="100%"
                            height="100%"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    <div className="relative w-full bg-black rounded-[14px] md:rounded-[24px] overflow-hidden shadow-inner border border-white/5 grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-in-out">
                        <iframe
                            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                            frameBorder="0"
                            height="450"
                            loading="lazy"
                            className="mx-auto"
                            style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', borderRadius: '10px', outline: 'none' }}
                            sandbox="allow-forms allow-popups allow-scripts allow-same-origin"
                            src="https://embed.music.apple.com/us/album/dont-be-dumb/1862934946">
                        </iframe>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center opacity-50">
                    <div className="w-40 h-10 flex gap-[2px]">
                        {barcodeWidths.map((width, i) => (
                            <div key={i} className="h-full bg-white" style={{ width: `${width}px` }}></div>
                        ))}
                    </div>
                    <p className="font-mono text-xs mt-3 tracking-[0.3em] text-white/70">A$AP_ROCKY // AWGE /// 2026</p>
                </div>

            </div>
        </section>
    );
}
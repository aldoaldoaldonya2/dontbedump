'use client'

import { useRef } from "react";
// 1. Ubah jalur import ke /dist/
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// 2. Register plugin hanya di sisi Client (Browser)
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const characters = [
    {
        name: "GR1M",
        title: "The Visionary",
        desc: "Leading the march for those who see beauty in simplicity and truth in the absurd.",
        color: "from-red-500 to-orange-600",
        font: "font-notable"
    },
    {
        name: "MR. MAYERS",
        title: "The Gatekeeper",
        desc: "A paradox of high culture and low inhibitions. The elitist of the underground.",
        color: "from-blue-500 to-purple-600",
        font: "font-lacquer"
    },
    {
        name: "RUGAHAND",
        title: "The Enforcer",
        desc: "Defying the logic of the masses. Breaking rules to find the real patterns.",
        color: "from-green-500 to-emerald-600",
        font: "font-limelight"
    },
    {
        name: "BABUSHKA BOI",
        title: "The Outsider",
        desc: "The observer of contradictions. He represents ancestral wisdom trapped in a hyper-modern circus, watching the world through a fractured lens.",
        color: "from-yellow-400 to-amber-600",
        font: "font-monoton"
    },
    {
        name: "DUMMY",
        title: "The Mirror",
        desc: "The vessel of the masses. DUMMY is what remains when critical thought is traded for social currency—a beautiful, hollow icon.",
        color: "from-yellow-400 to-amber-600",
        font: "font-monoton"
    },
    {
        name: "SHIRTHEAD",
        title: "The Chaos",
        desc: "The physical manifestation of social anxiety and the urge to disappear. He is the static in the brain that makes confidence feel like a lie.",
        color: "from-cyan-400 to-blue-600",
        font: "font-notable"
    }
];

const TOTAL_SLIDES = characters.length + 1;

export default function Introduce() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current,
                { x: 0 },
                {
                    x: `-${(TOTAL_SLIDES - 1) * 100}vw`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        scroller: '#smooth-wrapper',
                        start: "top top",
                        end: () => `+=${(TOTAL_SLIDES - 1) * window.innerWidth}`,
                        scrub: 0.6,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <div ref={triggerRef} className="overflow-hidden">
            {/* 3. Gunakan inline style untuk dynamic width */}
            <div
                className="flex h-screen flex-row will-change-transform transform-gpu"
                style={{ width: `${TOTAL_SLIDES * 100}vw` }}
                ref={sectionRef}
            >
                {/* Intro slide */}
                <div className="w-screen h-screen shrink-0 flex flex-col items-center justify-center p-10 md:p-20 relative">
                    <p className="text-xl md:text-2xl text-white/70 max-w-xl font-jakarta leading-relaxed">
                        Introducing.
                    </p>
                    <p className="text-8xl text-nowrap cursor-help font-notable">THEM.</p>
                </div>

                {/* Character slides */}
                {characters.map((char, index) => (
                    <div
                        key={index}
                        className="h-screen w-screen shrink-0 flex items-center justify-center p-10 md:p-20 relative"
                    >
                        <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${char.color} blur-[100px] pointer-events-none`} />

                        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10">
                            <div className="space-y-6">
                                <span className="text-white/40 font-mono text-sm uppercase tracking-[0.3em] block">
                                    Character 0{index + 1}
                                </span>
                                <h2 className={`text-7xl md:text-9xl text-white uppercase leading-tight ${char.font} break-words`}>
                                    {char.name}
                                </h2>
                                <h3 className="text-4xl md:text-5xl font-lacquer text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                                    {char.title}
                                </h3>
                                <p className="text-xl md:text-2xl text-white/70 max-w-xl font-jakarta leading-relaxed">
                                    {char.desc}
                                </p>
                            </div>

                            <div className="relative group">
                                <div className={`absolute inset-0 bg-gradient-to-br ${char.color} opacity-20 blur-xl transition-opacity duration-700`} />
                                <div className="aspect-[4/5] bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center relative backdrop-blur-sm">
                                    <div className={`text-9xl opacity-20 ${char.font} text-white select-none`}>
                                        {char.name[0]}
                                    </div>
                                    <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                                        <div className="w-12 h-[1px] bg-white/30" />
                                        <div className={`text-xs text-white/30 uppercase tracking-widest ${char.font}`}>
                                            DBDB_{char.name.replace(/\s+/g, '_').toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
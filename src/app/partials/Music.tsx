"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const tracks = [
    "ORDER OF PROTECTION", "HELICOPTER$", "INTERROGATION (SKIT)",
    "STOLED YA FLOW", "STAY HERE 4 LIFE (feat. Brent Faiyaz)", "PLAYA", "NO TRESPASSING",
    "STOP SNITCHING (feat. Bossman Dlow & Sauce Walka)", "STFU (feat. Slay Squad)", "PUNK ROCKY",
    "AIR FORCE (BLACK DEMARCO)", "WHISKEY (RELEASE ME) (feat. Gorillaz & Westside Gunn)",
    "ROBBERY (feat. Doechii)", "DON'T BE DUMB / TRIP BABY", "THE END (feat. will.i.am & Jessica Pratt)", 
    "SWAT TEAM", "FISH N STEAK (WHAT IT IS) (feat. Tyler, The Creator & Jozzy)", "FLACKITO JODYE (feat. Tokischa)", "I Smoked Away My Brain (I'm God x Demons Mashup)"
];

const features = [
    "Tyler, The Creator", "Westside Gunn", "Doechii",
    "Brent Faiyaz", "Gorillaz", "will.i.am", "Jozzy", "Slay Squad", "Bossman Dlow", "Sauce Walka", "Tokischa"
];

export default function Music() {
    useGSAP(() => {
        gsap.from(".track-item", {
            x: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#music",
                start: "top 70%",
            }
        });

        gsap.from(".feature-badge", {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: "#features-list",
                start: "top 80%",
            }
        });
    });

    return (
        <section id="music" className="min-h-screen w-full bg-black text-white py-20 px-10">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div>
                        <h2 className="text-6xl font-notable mb-12">TRACKLIST</h2>
                        <ul className="space-y-4">
                            {tracks.map((track, i) => (
                                <li key={i} className="track-item flex items-center gap-4 text-xl border-b border-white/10 pb-2">
                                    <span className="text-white/30 font-mono text-sm">{(i + 1).toString().padStart(2, '0')}</span>
                                    {track}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-6xl font-notable mb-12">FEATURES</h2>
                        <div id="features-list" className="flex flex-wrap gap-4">
                            {features.map((feature, i) => (
                                <span key={i} className="feature-badge px-6 py-3 bg-white text-black font-bold text-lg rounded-full">
                                    {feature}
                                </span>
                            ))}
                        </div>
                        <div className="mt-20">
                            <h3 className="text-4xl font-lacquer mb-6">SONIC LANDSCAPE</h3>
                            <p className="text-xl text-white/70 leading-relaxed">
                                A masterclass in genre-bending. From the gritty punk energy of "Punk Rocky" to the smooth jazz-infused soul of "Whiseky". Produced by the best to redefine the sound of Harlem.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client'

import styles from './Asap.module.css';
import { useRef } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Asap() {
    const sectionRef = useRef<HTMLElement>(null);
    const topFoldRef = useRef<HTMLDivElement>(null);
    const centerFoldRef = useRef<HTMLDivElement>(null);
    const bottomFoldRef = useRef<HTMLDivElement>(null);

    const topContentRef = useRef<HTMLDivElement>(null);
    const centerContentRef = useRef<HTMLDivElement>(null);
    const bottomContentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const centerContent = centerContentRef.current;
        const centerFold = centerFoldRef.current;

        if (!centerContent || !centerFold || !sectionRef.current) return;

        ScrollTrigger.refresh();

        const contentHeight = centerContent.clientHeight;
        const viewportHeight = centerFold.clientHeight;
        const overflowHeight = Math.max(0, contentHeight - viewportHeight + 150);

        if (overflowHeight > 0) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    scroller: '#smooth-wrapper',
                    start: "center center",
                    end: `+=${overflowHeight}`,
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            tl.to([topContentRef.current, centerContentRef.current, bottomContentRef.current], {
                y: -overflowHeight,
                ease: "none",
            });
        }

    }, { scope: sectionRef });

    const content = (
        <div id="asap-rocky" className="container mx-auto px-4 md:px-0">
            <div className="">
                <p className='font-notable text-center text-7xl max-md:text-4xl'>A<span className='font-lacquer'>$</span>AP Rocky</p>
                <img src="/assets/images/asap.png" className='mx-auto' alt="" />
                <div className="text-6xl max-md:text-2xl">
                    <span className="font-bold">Rakim Mayers</span>, globally known as <span className='font-bold'>A$AP Rocky</span>, is more than just a rapper—he’s a cultural polymath.
                    <br />
                    Whether it's music, high fashion, or visual arts, Rocky has consistently pushed the boundaries of what it means to be a "modern rockstar."
                    <br /><br />
                    Here is a breakdown of why Lord Flacko remains one of the most influential figures in the game:
                    <br /><br />
                    <p className='font-bold'>1. The "Fashion Killa" Legacy</p>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rocky didn't just join the fashion world; he disrupted it. He was among the first to bridge the gap between Harlem streetwear and Parisian luxury.
                    <br />
                    <br />
                    The Blueprint: He famously put brands like Rick Owens and Raf Simons on the hip-hop map.
                    <br />
                    <br />
                    Creative Director: Through his creative agency AWGE, he has collaborated with giants like Prada, Gucci, and Mercedes-Benz.
                    <br /><br />
                    <p className='font-bold'>2. Sonic Innovation & Visuals</p>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rocky’s music is defined by its "cloudy," psychedelic texture. He doesn't just release songs; he creates immersive experiences.
                    <br />
                    <br />
                    The Sound: From the chopped-and-screwed vibes of Live. Love. A$AP to the experimental sounds of TESTING, he constantly avoids the "mainstream" trap.
                    <br />
                    <br />
                    Music Videos: His visuals are arguably the best in the industry, utilizing complex editing, surrealism, and cinematic transitions that feel like a fever dream.
                    <br /><br />
                    <p className='font-bold'>3. The AWGE Philosophy</p>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Never reveal your next move." Rocky operates through AWGE, a mysterious creative collective that handles everything from music videos to clothing. The "No Interviews" and "Strictly for the Youth" vibe of AWGE has created a massive cult following that values authenticity over hype.
                    <br /><br />
                    <p className='font-bold'>4. The New Era: Don't Be Dumb</p>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As of 2026, the anticipation for his latest project, Don't Be Dumb, has reached a fever pitch.
                    <br />
                    <br />
                    <hr />
                    <br />
                    <span className='font-bold'>The Concept:</span> <br /> The album is expected to be his most "experimental" yet, blending high-art concepts with heavy-hitting production.
                    <br />
                    <br />
                    <span className='font-bold'>Family Man:</span> <br /> Since becoming a father with Rihanna, Rocky has maintained a balance between his "Pretty Flacko" persona and a more grounded, mature artistic vision.
                </div>
            </div>
        </div>
    );

    return (
        <section className="bg-white text-black" id="asap" ref={sectionRef}>
            <div className={styles.all}>
                <div className={styles.wrapper3d}>
                    <div className={`${styles.fold} ${styles.foldBefore} ${styles.foldTop}`} ref={topFoldRef}>
                        <div className={styles.foldAlign}>
                            <div ref={topContentRef} className="pb-24">
                                {content}
                            </div>
                        </div>
                    </div>
                    <div className={styles.fold} data-fold-content="true" ref={centerFoldRef}>
                        <div className={styles.foldAlign}>
                            <div ref={centerContentRef} className="pb-24">
                                {content}
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.fold} ${styles.foldAfter} ${styles.foldBottom}`} ref={bottomFoldRef}>
                        <div className={styles.foldAlign}>
                            <div ref={bottomContentRef} className="pb-24">
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

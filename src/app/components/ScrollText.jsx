"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function HeroTitle() {
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;

        const split = new SplitText(textRef.current, { type: "chars, words, lines" });

        gsap.from(split.chars, {
            scrollTrigger: {
                trigger: textRef.current,
                start: "top 100%", // when element enters 
                end: "bottom top",
                // scrub: 1,
                // toggleActions: "play pause resume reverse",
                toggleActions: "play none restart restart",
                // toggleActions:  onEnter onLeave onEnterBack onLeaveBack
            },
            yPercent: 100,
            rotation: 8,
            opacity: 0,
            stagger: 0.03,
            duration: .4,
            ease: "power4.out",
        });

        // cleanup if needed
        return () => {
            split.revert(); // puts DOM back to original state
        };
    }, []);

    // ✅ JSX belongs here, not inside useEffect
    return (
        <section style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ top: 0, left: 0, bottom: 0, right: 0, position: "relative", overflow: "visible" }}>
                <h1
                    ref={textRef}
                    style={{
                        //     fontSize: "3rem",
                        //     fontWeight: "bold",
                        textAlign: "center",
                        lineHeight: "1.2",
                    }}
                >
                    ScrollTrigger SplitText Animation
                </h1>
            </div>
        </section >
    );
}

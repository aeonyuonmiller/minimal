'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import Magnetic from "../components/Magnetic.jsx";
import ArrowDownRight from "../icons/ArrowDownRight.js"

export default function AnimatedBox() {
    gsap.registerPlugin(ScrollTrigger, Draggable);

    const boxRef = useRef(null);
    const containerRef = useRef(null);

    // Using useGSAP to run animation on mount
    useGSAP(() => {
        // gsap.from(boxRef.current, { y: 200, duration: 1 });

        // gsap.fromTo(
        //     boxRef.current,
        //     { opacity: 0, scale: 0.5 },
        //     { opacity: 1, scale: 1, duration: 1 }
        // );

        // with ScrollTrigger
        gsap.fromTo(
            boxRef.current,
            {
                opacity: 0,
                // yPercent: 20
            },
            {
                opacity: 1,
                width: "90vh",
                yPercent: 0,
                duration: 1,
                ease: "circ.inOut",
                scrollTrigger: {
                    trigger: boxRef.current,
                    // pinnedContainer: containerRef.current,
                    start: "top bottom",
                    // end: "bottom top",
                    end: "+=200",
                    scrub: 1,
                    // snap: 1,
                    // markers: true,
                    toggleActions: "play reverse reverse none",
                }
            }
        );
    }, []);

    return <section className="first" ref={containerRef}>
        <div className="firstContainer" ref={boxRef}>
            <div className="title">
                <h2>Title</h2>
            </div>

            <Magnetic>
                <div className="firstCta">
                    <div>
                        <ArrowDownRight />
                    </div>
                    {/* <Button /> */}
                </div>
            </Magnetic>
        </div>
    </section>
}

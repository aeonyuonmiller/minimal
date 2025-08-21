'use client'

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import './mousemove.css';

export default function MouseMove() {
    const rootRef = useRef(null);

    useGSAP(() => {
        const root = rootRef.current;
        if (!root) return;

        const images = [];
        root.querySelectorAll('.medias img').forEach(image => {
            images.push(image.getAttribute('src'));
        });

        let incr = 0,
            oldIncrX = 0,
            oldIncrY = 0,
            resetDist = window.innerWidth / 8,
            indexImg = 0;

        const handleMouseMove = (e) => {
            // initialize on first movement
            if (!oldIncrX && !oldIncrY) {
                oldIncrX = e.clientX;
                oldIncrY = e.clientY;
            }

            const valX = e.clientX;
            const valY = e.clientY;

            incr += Math.abs(valX - oldIncrX) + Math.abs(valY - oldIncrY);

            if (incr > resetDist) {
                incr = 0;
                createMedia(
                    valX,
                    valY - root.getBoundingClientRect().top,
                    valX - oldIncrX,
                    valY - oldIncrY
                );
            }

            oldIncrX = valX;
            oldIncrY = valY;
        };

        function createMedia(x, y, deltaX, deltaY) {
            const image = document.createElement("img");
            image.setAttribute('src', images[indexImg]);
            image.style.position = "absolute";
            image.style.top = "0";
            image.style.left = "0";
            image.style.pointerEvents = "none";
            root.appendChild(image);

            const tl = gsap.timeline({
                onComplete: () => {
                    root.removeChild(image);
                    tl.kill();
                }
            });

            tl.fromTo(image, {
                xPercent: -50 + (Math.random() - 0.5) * 10,
                yPercent: -50 + (Math.random() - 0.5) * 10,
                scaleX: 1.4,
                scaleY: 1.4
            }, {
                scaleX: 1,
                scaleY: 1,
                // ease: 'elastic.out(2, 0.6)',
                ease: 'power4.inOut',
                duration: 3
            });

            tl.fromTo(image, {
                x,
                y,
                rotation: (Math.random() - 0.5) * 90,
            }, {
                x: '+=' + deltaX * 4,
                y: '+=' + deltaY * 4,
                rotation: (Math.random() - 0.5) * 90,
                ease: 'power4.out',
                duration: 1.5
            }, '<');

            tl.to(image, {
                duration: 0.3,
                opacity: 0,
                scale: 0.1,
                delay: 0.1,
                ease: 'back.in(1.5)'
            });

            indexImg = (indexImg + 1) % images.length;
        }

        root.addEventListener("mousemove", handleMouseMove);

        // cleanup
        return () => {
            root.removeEventListener("mousemove", handleMouseMove);
        };
    }, { scope: rootRef }); // attach GSAP lifecycle to this ref

    return (
        <section className="mwg_effect020" ref={rootRef}>
            <div className="container">
                <div className="header">
                    <p>AYM Studio®</p>
                    <p>15:48</p>
                    <p>Get in touch</p>
                </div>

                {/* <p className="title">Let's work together.</p> */}
                <p className="title">Donnerwetter Donnerstag</p>
                <p className="text">
                    Creativity mixed with technology. Elevate your brand.
                </p>
            </div>

            <div className="medias">
                <img src="/001.jpg" alt="" />
                <img src="/005.jpg" alt="" />
                <img src="/004.jpg" alt="" />
                <img src="/002.jpeg" alt="" />
                <img src="/001.jpg" alt="" />
                <img src="/004.jpg" alt="" />
                <img src="/005.jpg" alt="" />
            </div>
        </section>
    );
}

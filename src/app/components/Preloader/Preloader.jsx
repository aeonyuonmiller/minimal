'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './preloader.css';

export default function Preloader({ onFinish }) {
    const [progress, setProgress] = useState(0);
    const preloaderRef = useRef(null);
    const preloaderBarRef = useRef(null);


    useEffect(() => {
        let count = 0;
        const interval = setInterval(() => {
            count += 1;
            setProgress(count);
            if (count === 100) {
                clearInterval(interval);
                exitAnimation();
            }
        }, 20); // 0–100 in 2 seconds
    }, []);

    useEffect(() => {
        gsap.fromTo(
            // ".preloader-progressbar",
            preloaderBarRef.current,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 3, ease: 'power4.inOut' }
        )

        gsap.fromTo(
            ".preloader-counter",
            { xPercent: 0 },
            { xPercent: 100, duration: 2, ease: 'power2.out' }
        );
    }, []);

    const exitAnimation = () => {
        gsap.to(preloaderRef.current, {
            y: '-90vw',
            // right: 0,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: onFinish,
        });

        gsap.to(
            // ".preloader-progressbar",
            preloaderBarRef.current,
            { scaleX: 0, opacity: 0, duration: 2, ease: 'power4.inOut' },
        );
    };

    return (
        <div
            ref={preloaderRef}
            className="preloader"
        >
            <div className="preloader-counter">{progress}%</div>
            <div
                ref={preloaderBarRef}
                className="preloader-progressbar"
                style={{ borderRadius: 30 }}
            />
        </div>
    );
}

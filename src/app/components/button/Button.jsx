'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedButton({ children }) {
    const buttonRef = useRef < HTMLButtonElement | null > (null);
    const arrowRef = useRef < SVGPathElement | null > (null);
    const textRef = useRef < HTMLSpanElement | null > (null);

    useEffect(() => {
        const button = buttonRef.current;
        const arrow = arrowRef.current;
        const text = textRef.current;

        if (!button || !arrow || !text) return;

        const handleEnter = () => {
            gsap.to(arrow, { x: 6, duration: 0.3, ease: 'power2.out' });
            gsap.to(text, { x: 3, duration: 0.3, ease: 'power2.out' });
        };

        const handleLeave = () => {
            gsap.to(arrow, { x: 0, duration: 0.3, ease: 'power2.out' });
            gsap.to(text, { x: 0, duration: 0.3, ease: 'power2.out' });
        };

        button.addEventListener('mouseenter', handleEnter);
        button.addEventListener('mouseleave', handleLeave);

        return () => {
            button.removeEventListener('mouseenter', handleEnter);
            button.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            className="group flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
            <span ref={textRef}>{children}</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    ref={arrowRef}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </button>
    );
}

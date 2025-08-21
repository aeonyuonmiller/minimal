import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

export default function Tilting({ children }) {
    const wrapperRef = useRef(null);

    useEffect(() => {
        const rotateXTo = gsap.quickTo(wrapperRef.current, "rotationX", {
            duration: 1,
            ease: "elastic.out(1, 0.4)"
        });

        const rotateYTo = gsap.quickTo(wrapperRef.current, "rotationY", {
            duration: 1,
            ease: "elastic.out(1, 0.4)"
        });

        const handleMouseMove = (e) => {
            const rect = wrapperRef.current.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            const rotateY = x / rect.width * 30; // max 30deg
            const rotateX = -y / rect.height * 30;
            rotateXTo(rotateX);
            rotateYTo(rotateY);
        };

        const handleMouseLeave = () => {
            rotateXTo(0);
            rotateYTo(0);
        };

        const el = wrapperRef.current;
        el.style.transformStyle = 'preserve-3d';
        el.style.transformPerspective = '600px';

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return React.cloneElement(children, { ref: wrapperRef });
}

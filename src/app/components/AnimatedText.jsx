'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, SplitText);

export default function AnimatedText({ as = 'p', children }) {
    const el = useRef(null);
    const splitRef = useRef(null);

    const isParagraph = as === 'p';

    useGSAP(() => {
        // Split text into lines or chars
        splitRef.current = new SplitText(el.current, {
            type: isParagraph ? 'lines' : 'chars',
            linesClass: 'line-child',
            charsClass: 'char-child',
        });

        const targets = isParagraph
            ? splitRef.current.lines
            : splitRef.current.chars;

        gsap.fromTo(
            targets,
            { y: '100%', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                duration: 0.6,
                stagger: 0.05,
                ease: 'power2.out',
            }
        );

        return () => {
            splitRef.current?.revert();
        };
    }, []);

    const Tag = as;

    return (
        <Tag
            ref={el}
            style={{ overflow: 'hidden', display: 'block' }}
            className="animated-text"
        >
            {children}
        </Tag>
    );
}

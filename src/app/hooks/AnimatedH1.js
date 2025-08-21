'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText, useGSAP);

export default function AnimatedSplitText({ children, ...props }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const split = new SplitText(containerRef.current, { type: 'chars' });

    gsap.from(split.chars, {
      opacity: 0,
      y: 10,
      duration: 0.6,
      stagger: 0.03,
      ease: 'power4.out',
    });
  }, { scope: containerRef });

  return (
    <span ref={containerRef} {...props} style={{ display: 'inline-block' }}>
      {children}
    </span>
  );
}

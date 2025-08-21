// components/GridParallax.jsx
'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './gridparallax.css';

gsap.registerPlugin(Draggable);

export default function GridParallax({ items = [] }) {
  const containerRef = useRef(null);
  const [introPlayed, setIntroPlayed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const wrappers = Array.from(container.querySelectorAll('.item-wrapper'));

      function initIntro() {
        const visible = wrappers.filter(item => {
          const r = item.getBoundingClientRect();
          return (
            r.x > -r.width &&
            r.x < window.innerWidth + r.width &&
            r.y > -r.height &&
            r.y < window.innerHeight + r.height
          );
        });
        visible.forEach(item => {
          const r = item.getBoundingClientRect();
          const x = -r.x + window.innerWidth * 0.5 - r.width * 0.5;
          const y = -r.y + window.innerHeight * 0.5 - r.height * 0.5;
          gsap.set(item, { x, y });
        });
        gsap.to(visible.reverse(), {
          duration: 2,
          ease: 'expo.inOut',
          x: 0,
          y: 0,
          stagger: 0.05,
          onComplete: () => setIntroPlayed(true),
        });
      }

      function setupParallax() {
        Draggable.create(container, {
          type: 'x,y',
          inertia: true,
          onDrag: updateParallax,
          onThrowUpdate: updateParallax,
        });
      }

      function updateParallax() {
        const scrollX = this.x;
        const scrollY = this.y;
        wrappers.forEach((item, i) => {
          const depth = parseFloat(item.dataset.depth) || 0;
          gsap.to(item, { x: scrollX * depth, y: scrollY * depth, overwrite: true });
        });
      }

      initIntro();
      setupParallax();

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="grid-parallax-container" ref={containerRef}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="item-wrapper"
          data-depth={item.depth ?? 0}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}

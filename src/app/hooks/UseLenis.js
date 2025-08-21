'use client'

import { useEffect } from "react";
import Lenis from "lenis";

const UseLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, // Adjust the scrolling speed
      lerp: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      direction: "vertical", // Scroll direction (vertical or horizontal)
      smooth: true,
      // infinite: true,
    });

    const animate = (time) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => lenis.destroy();
  }, []);
};

export default UseLenis;
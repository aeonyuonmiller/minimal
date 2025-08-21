"use client";

import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "./components/button/Button.jsx";
import Preloader from "./components/Preloader/Preloader.jsx";
import AnimatedH1 from "./hooks/AnimatedH1.js"

import Lenis from 'lenis';
import Inertia from './components/Inertia/Inertia.js';
import MouseMove from './components/MouseMove/MouseMove.jsx';
import ScrollText from './components/ScrollText.jsx';


export default function Home() {


  useEffect( () => {
    const lenis = new Lenis({
      // Value between 0 and 1
      // Default value: 0.1
      // The lower the value, the smoother the scroll
      lerp: 0.05, 
      // Default value: 1
      // The higher the value, the faster the scrolling
      wheelMultiplier: 1, 
    });

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // apply parallax effect to any element with a data-speed attribute
    gsap.to("[data-speed]", {
      y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
      opacity: 0,
      scale: 0.6,
      scaleY: 2,
      perspective: 800,
      rotateY: 20,
      rotateX: 90,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0
      }
    });

    gsap.fromTo(
      ".image-one img",
      {
        clipPath: "inset(100% 0% 0% 0%)",
        scale: 1.2,
        rotate: 5
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        rotate: 0,
        duration: 2,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      ".location, .menu-toggle, .logo",
      {
        scale: 1.1,
        opacity: 0,
        stagger: 0.5
      },
      {
        scale: 1,
        opacity: 1
      },
      "-=0.5"
    );

    gsap.fromTo(
      "h1",
      {
        scale: 1.1,
        opacity: 0,
        stagger: 0.5
      },
      {
        scale: 1,
        opacity: 1
      },
      "+=0.2"
    );

    gsap.fromTo(
      ".hero-click",
      {
        scale: 1.1,
        opacity: 0,
        y: 20
      },
      {
        scale: 1,
        opacity: 1,
        y: 0
      },
      "+=0.2"
    );
  }, []); // empty dependency array, runs once on mount

  return (
    <>
      <div className="wrapper">
        <div className="bl">
          <h1 data-speed="1.1">
            Bring <strong>playfulness</strong> into your digital touchpoints.
          </h1>

          <button data-speed="1.1" className="hero-click">View process</button>
        </div>

        <div data-speed="1.2" className="image-one">
          <img src="./002.JPEG" alt="portrait" />
        </div>

        <div className="location">
          <img src="./globe.svg" alt="world icon" />
          Berlin
        </div>
      </div>

      <Inertia title="works" />

      <ScrollText />

      <div className="wrapper center">
        <h2>steps to <strong>results</strong></h2>
      </div>

      <MouseMove />
      {/* <Preloader /> */}
    </>
  );
}

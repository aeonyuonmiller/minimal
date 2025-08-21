"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import './inertia.css'; 

export default function Inertia({title}) {
  const rootRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(InertiaPlugin);

    let oldX = 0,
      oldY = 0,
      deltaX = 0,
      deltaY = 0;

    const root = rootRef.current;
    if (!root) return;

    const handleMouseMove = (e) => {
      deltaX = e.clientX - oldX;
      deltaY = e.clientY - oldY;

      oldX = e.clientX;
      oldY = e.clientY;
    };

    root.addEventListener("mousemove", handleMouseMove);

    const mediaEls = root.querySelectorAll(".media");

    mediaEls.forEach((el) => {
      const handleMouseEnter = () => {
        const tl = gsap.timeline({
          onComplete: () => {
            tl.kill();
          },
        });

        tl.timeScale(1.4);

        const image = el.querySelector("img");

        tl.to(image, {
          inertia: {
            x: {
              velocity: deltaX * 30,
              end: 0,
            },
            y: {
              velocity: deltaY * 30,
              end: 0,
            },
          },
        });

        tl.fromTo(
          image,
          { rotate: 0 },
          {
              duration: .6,
            //   scale: 1.05,
            // rotate: (Math.random() - 0.5) * 30,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "<"
        );
      };

      el.addEventListener("mouseenter", handleMouseEnter);

      // cleanup for each
      return () => {
        el.removeEventListener("mouseenter", handleMouseEnter);
      };
    });

    // cleanup root listener
    return () => {
      root.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
      <div ref={rootRef} className="mwg_effect000">
        <h2>{title}</h2>
      
        <div className="medias">
            <div className="media">
                <img src="./001.JPG" alt="Media 1" />
            </div>
              
            <div className="media">
                <img src="./002.jpeg" alt="Media 2" />
              </div>
              
              <div className="media">
                <img src="./004.jpg" alt="Media 1" />
            </div>
              
            <div className="media">
                <img src="./005.jpg" alt="Media 2" />
            </div>
              
            <div className="media">
                <img src="./005.jpg" alt="Media 1" />
            </div>
              
            <div className="media">
                <img src="./004.jpg" alt="Media 2" />
              </div>
              
              <div className="media">
                <img src="/002.jpeg" alt="Media 1" />
            </div>
              
            <div className="media">
                <img src="./001.jpg" alt="Media 2" />
              </div>
              
              <div className="media">
                <img src="./001.jpg" alt="Media 1" />
            </div>
              
            <div className="media">
                <img src="./002.jpeg" alt="Media 2" />
              </div>
              
              <div className="media">
                <img src="./004.jpg" alt="Media 1" />
            </div>
              
            <div className="media">
                <img src="./005.jpg" alt="Media 2" />
            </div>
        </div>
    </div>
  );
}

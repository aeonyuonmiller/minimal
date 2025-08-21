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
    const mediaElsImg = root.querySelectorAll(".media img");

    // 👇 Animate when container enters viewport
     gsap.fromTo(
      mediaElsImg,
      {
        opacity: 0,
        y: 50,
        rotate: 5,
        clipPath: "inset(100% 0% 0% 0%)",
        scale: .8, // optional, makes it feel "popping in"
      },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        delay: .8,
        duration: .8,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: root.querySelector(".medias"),
          start: "top 80%", // when top of container hits 80% of viewport
          toggleActions: "play none restart restart",
        },
      }
    );

    // Hover inertia effect
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
                <img src="/one.jpg" alt="Media 1" />
            </div>
              
            <div className="media">
                <img src="/two.jpg" alt="Media 2" />
              </div>
              
              <div className="media">
                <img src="/three.jpg" alt="Media 1" />
            </div>
              
            <div className="media">
                <img src="/four.jpg" alt="Media 2" />
            </div>
              
            <div className="media">
                <img src="/five.jpg" alt="Media 1" />
            </div>
              
            <div className="media">
                <img src="/four.jpg" alt="Media 2" />
              </div>
              
              <div className="media">
                <img src="/two.jpg" alt="Media 1" />
            </div>
              
            <div className="media">
                <img src="/five.jpg" alt="Media 2" />
              </div>
              
              <div className="media">
                <img src="/one.jpg" alt="Media 1" />
            </div>
              
            <div className="media">
                <img src="/two.jpg" alt="Media 2" />
              </div>
              
              <div className="media">
                <img src="/three.jpg" alt="Media 1" />
            </div>
              
            <div className="media">
                <img src="/four.jpg" alt="Media 2" />
            </div>
        </div>
    </div>
  );
}

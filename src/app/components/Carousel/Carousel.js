"use client";

import { useEffect, useRef, useState } from "react";
import Core from "smooothy";
import gsap from "gsap";
import "./carousel.css";

// Custom hook
export function useSmooothy(config = { lerpFactor: .1}) {
  const sliderRef = useRef(null);
  const [slider, setSlider] = useState(null);

  const refCallback = (node) => {
    if (node && !slider) {
      const instance = new Core(node, config);
      gsap.ticker.add(instance.update.bind(instance));
      setSlider(instance);
    }
    sliderRef.current = node;
  };

  useEffect(() => {
    return () => {
      if (slider) {
        gsap.ticker.remove(slider.update.bind(slider));
        slider.destroy();
      }
    };
  }, [slider]);

  return { ref: refCallback, slider };
}

// Component
const slides = Array.from({ length: 30 }, (_, i) => i);

export default function Carousel() {
  const { ref } = useSmooothy();

  return (
    <div className="container" ref={ref}>
      {/* {slides.map((slide, i) => (
        <div key={i} className="slide">
          <div className="slide-inner">
            <div className="slide-outline" />
            <p className="slide-index">{i}</p>
          </div>
        </div>
      ))} */}
      <div key="1" className="slide">uno</div>
      <div key="2" className="slidetwo">dos</div>
      <div key="3" className="slide">trés</div>
      <div key="4" className="slide">quattro</div>
      <div key="5" className="slidetwo">okeyy</div>
    </div>
  );
}

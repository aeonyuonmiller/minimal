import * as React from "react";
import { gsap } from "gsap";

const MenuIcon = (props) => {
  const topBar = React.useRef(null);
  const bottomBar = React.useRef(null);

  const handleMouseEnter = () => {
    gsap.to(topBar.current, {
      scaleX: 1.1,
      y: 6,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(bottomBar.current, {
      scaleX: 1.1,
      y: -6,
      duration: 0.3,
      ease: "power4.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to([topBar.current, bottomBar.current], {
      scaleX: 1,
      duration: 0.3,
      y: 0,
      ease: "power2.inOut",
    });
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40%"
      fill="none"
      viewBox="0 0 80 80"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "pointer" }}
    >
      <rect
        ref={topBar}
        width="67"
        height="6"
        x="6.5"
        y="23"
        fill="#efefef"
        rx="3.5"
      ></rect>
      <rect
        ref={bottomBar}
        width="67"
        height="6"
        x="6.5"
        y="50"
        fill="#efefef"
        rx="3.5"
      ></rect>
    </svg>
  );
};

export default MenuIcon;

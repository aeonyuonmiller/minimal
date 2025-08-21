"use client";
import * as React from "react";
import Magnetic from "../components/Magnetic.jsx"

function Logo({color}) {
  return (
    <svg width="100%" viewBox="0 0 99 40" fill="none">
      <rect
        x={0.191}
        y={14.218}
        width={11.116}
        height={11.116}
        rx={5.558}
        fill={color}
      />
        <rect
        x={13.102}
        y={4.156}
        width={21.991}
        height={11.116}
        rx={5.558}
        transform="rotate(44 13.102 4.156)"
        fill={color}
        />
      <rect
        x={28.208}
        y={1.998}
        width={21.991}
        height={11.116}
        rx={5.558}
        transform="rotate(44 28.208 1.998)"
        fill={color}
        />
      <rect
        x={53.438}
        y={4.054}
        width={21.991}
        height={11.116}
        rx={5.558}
        transform="rotate(44 53.438 4.054)"
        fill={color}
        />
      <rect
        x={76.8}
        y={27.395}
        width={21.991}
        height={11.116}
        rx={5.558}
        transform="rotate(-135 76.8 27.395)"
        fill={color}
      />
        <rect
        x={84.372}
        y={4.054}
        width={21.991}
        height={11.116}
        rx={5.558}
        transform="rotate(44 84.372 4.054)"
        fill={color}
        />
      <rect
        width={21.991}
        height={11.116}
        rx={5.558}
        transform="scale(1 -1) rotate(44 65.97 29.118)"
        fill={color}
        />
    </svg>
  );
}

const MemoLogo = React.memo(Logo);
export default MemoLogo;

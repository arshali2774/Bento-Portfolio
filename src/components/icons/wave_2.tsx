import React from "react";

const WaveLine2 = ({ color = "#7B61FF" }: { color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 50"
    width="100%"
    height="50"
    preserveAspectRatio="none"
  >
    <path
      d="M0 30 Q 25 10, 50 30 T 100 30 T 150 30 T 200 30 T 250 30 T 300 30 T 350 30 T 400 30 T 450 30 T 500 30 V50 H0 Z"
      fill={color}
    />
  </svg>
);

export default WaveLine2;

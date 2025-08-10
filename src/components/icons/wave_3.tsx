import React from "react";

const WaveLine3 = ({ color = "#7B61FF" }: { color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 50"
    width="100%"
    height="50"
    preserveAspectRatio="none"
  >
    <path
      d="M0 25 C 25 0, 75 50, 100 25 S 175 0, 200 25 S 275 50, 300 25 S 375 0, 400 25 S 475 50, 500 25 V50 H0 Z"
      fill={color}
    />
  </svg>
);

export default WaveLine3;

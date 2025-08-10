import React from "react";

type WaveProps = {
  width?: string | number;
  height?: number;
  fill?: string;
  className?: string;
};

const defaultProps = {
  width: "100%",
  height: 200,
  fill: "currentColor",
};

/**
 * Smooth wave - low amplitude, long wavelength
 */
export function SmoothWave({
  width = defaultProps.width,
  height = defaultProps.height,
  fill = defaultProps.fill,
  className,
}: WaveProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <path
        d="
          M0,100
          C360,40 720,160 1080,100
          C1200,80 1320,120 1440,100
          L1440,200
          L0,200
          Z
        "
        fill={fill}
      />
    </svg>
  );
}

/**
 * Medium wave - medium amplitude and frequency
 */
export function MediumWave({
  width = defaultProps.width,
  height = defaultProps.height,
  fill = defaultProps.fill,
  className,
}: WaveProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <path
        d="
          M0,110
          C120,70 240,150 360,110
          C480,70 600,150 720,110
          C840,70 960,150 1080,110
          C1200,70 1320,150 1440,110
          L1440,200
          L0,200
          Z
        "
        fill={fill}
      />
    </svg>
  );
}

/**
 * Rough wave - high amplitude and frequency
 */
export function RoughWave({
  width = defaultProps.width,
  height = 220,
  fill = defaultProps.fill,
  className,
}: WaveProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <path
        d="
          M0,120
          C80,40 160,200 240,120
          C320,40 400,200 480,120
          C560,40 640,200 720,120
          C800,40 880,200 960,120
          C1040,40 1120,200 1200,120
          C1280,40 1360,200 1440,120
          L1440,220
          L0,220
          Z
        "
        fill={fill}
      />
    </svg>
  );
}

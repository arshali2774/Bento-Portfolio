"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";

/**
 * Programmatic morphable shapes:
 * - All shapes use the same number of anchors (n)
 * - Anchors -> Catmull-Rom -> Cubic Bézier segments (smooth rounded curves)
 * - ViewBox is 0 0 24 24 (center = 12,12)
 */

const N = 200; // number of anchor points (same for all shapes)
const CX = 12;
const CY = 12;
const BASE_R = 7.2; // base radius in SVG units (fits inside 24x24)

/* Utility: polar -> cartesian */
function polar(cx: number, cy: number, r: number, angle: number) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

/* Catmull-Rom to cubic Bezier conversion for closed-loop */
function catmullRomToBezier(points: { x: number; y: number }[], tension = 1) {
  const len = points.length;
  if (len < 2) return "";
  let d = `M ${points[0].x.toFixed(3)} ${points[0].y.toFixed(3)} `;
  for (let i = 0; i < len; i++) {
    const p0 = points[(i - 1 + len) % len];
    const p1 = points[i];
    const p2 = points[(i + 1) % len];
    const p3 = points[(i + 2) % len];

    // Catmull-Rom to Bezier control points
    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    d += `C ${cp1x.toFixed(3)} ${cp1y.toFixed(3)} ${cp2x.toFixed(
      3
    )} ${cp2y.toFixed(3)} ${p2.x.toFixed(3)} ${p2.y.toFixed(3)} `;
  }
  d += "Z";
  return d;
}

/* Build points from a radii array (length N) */
function pointsFromRadii(radii: number[], angleOffset = -Math.PI / 2) {
  const pts = [];
  for (let i = 0; i < N; i++) {
    const angle = angleOffset + (i * Math.PI * 2) / N;
    const r = BASE_R * radii[i];
    pts.push(polar(CX, CY, r, angle));
  }
  return pts;
}

// function makeRadiiPatterns() {
//   const n = N;

//   // 1) Blob (organic blobby shape)
//   const blob = Array.from({ length: n }, (_, i) => {
//     const t = (i / n) * Math.PI * 2;
//     return 0.92 + 0.12 * Math.sin(t * 2 + 0.5);
//   });

//   // 2) Star (rounded star, milder inner radius)
//   const star = Array.from({ length: n }, (_, i) => {
//     const t = (i / n) * Math.PI * 2;
//     // 8-lobed soft modulation for a smooth "seal" effect
//     return 1.0 + 0.15 * Math.cos(t * 5);
//   });

//   // 3) Pentagon-like (5 peaks repeated for n anchors)
//   const pentagon = Array.from({ length: n }, (_, i) =>
//     i % 2 === 0 ? 1.0 : 0.93
//   );

//   return [blob, star, pentagon];
// }
function makeRadiiPatterns() {
  const n = N;

  // 1) Blob (organic)
  const blob = Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    return 0.92 + 0.12 * Math.sin(t * 2 + 0.5);
  });

  // 2) Star (seal-like rounded points)
  const star = Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    return 1.0 + 0.15 * Math.cos(t * 5);
  });

  // 3) Smooth Pentagon
  const pentagon = Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    return 1.0 + 0.08 * Math.cos(t * 5);
  });

  // 4) Rounded Clover (4 big lobes)
  const clover4 = Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    return 0.94 + 0.18 * Math.cos(t * 2);
  });

  // 5) Sunburst (more defined peaks)
  const sunburst = Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    return 0.88 + 0.28 * Math.cos(t * 5);
  });

  // 6) Smooth Flower (soft 8 lobes)
  const flower8 = Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    return 0.97 + 0.1 * Math.sin(t * 4);
  });

  // 7) Wavy Circle (very subtle undulations)
  const wavyCircle = Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    return 1.0 + 0.05 * Math.sin(t * 3);
  });

  return [blob, star, pentagon, clover4, sunburst, flower8, wavyCircle];
}

/* Build the path array (same segment structure for every shape) */
function buildMorphPaths() {
  const radiiPatterns = makeRadiiPatterns();
  const paths = radiiPatterns.map((radii) => {
    const pts = pointsFromRadii(radii);
    return catmullRomToBezier(pts, 1); // tension=1 looks nice; tweak 0.8-1.2 if you want
  });
  return paths;
}

/* Component */
type MorphingShapeProps = {
  rotationDirection: "cw" | "ccw";
  delay?: number;
  size?: number;
  cycleMs?: number;
};

export default function MorphingShape({
  rotationDirection,
  delay = 0,
  size = 72,
  cycleMs = 2200,
}: MorphingShapeProps) {
  const paths = useMemo(() => buildMorphPaths(), []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setIndex((p) => (p + 1) % paths.length);
    }, cycleMs);
    return () => clearInterval(iv);
  }, [paths.length, cycleMs]);

  // styles so svg rotates around center
  const svgStyle: React.CSSProperties = {
    transformBox: "fill-box",
    transformOrigin: "center",
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={svgStyle}
      animate={{ rotate: rotationDirection === "cw" ? 360 : -360 }}
      transition={{
        rotate: { repeat: Infinity, ease: "linear", duration: 6, delay },
      }}
    >
      <motion.path
        fill="currentColor"
        initial={{ d: paths[0] }}
        animate={{ d: paths[index] }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

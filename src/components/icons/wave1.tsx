import { motion } from "motion/react";
import React, { useMemo, useState, useEffect } from "react";

const AnimatedWave: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const points = 120; // how many points to plot
  const amplitude = 2; // wave height
  const wavelength = 8; // distance between peaks

  // Static path for server-side rendering to prevent hydration errors
  const staticPath =
    "M0,11 L2,11 L4,11 L6,11 L8,11 L10,11 L12,11 L14,11 L16,11 L18,11 L20,11 L22,11 L24,11 L26,11 L28,11 L30,11 L32,11 L34,11 L36,11 L38,11 L40,11 L42,11 L44,11 L46,11 L48,11 L50,11 L52,11 L54,11 L56,11 L58,11 L60,11 L62,11 L64,11 L66,11 L68,11 L70,11 L72,11 L74,11 L76,11 L78,11 L80,11 L82,11 L84,11 L86,11 L88,11 L90,11 L92,11 L94,11 L96,11 L98,11 L100,11 L102,11 L104,11 L106,11 L108,11 L110,11 L112,11 L114,11 L116,11 L118,11 L120,11 L122,11 L124,11 L126,11 L128,11 L130,11 L132,11 L134,11 L136,11 L138,11 L140,11 L142,11 L144,11 L146,11 L148,11 L150,11 L152,11 L154,11 L156,11 L158,11 L160,11 L162,11 L164,11 L166,11 L168,11 L170,11 L172,11 L174,11 L176,11 L178,11 L180,11 L182,11 L184,11 L186,11 L188,11 L190,11 L192,11 L194,11 L196,11 L198,11 L200,11 L202,11 L204,11 L206,11 L208,11 L210,11 L212,11 L214,11 L216,11 L218,11 L220,11 L222,11 L224,11 L226,11 L228,11 L230,11 L232,11 L234,11 L236,11 L238,11 L240,11 L241,11 L242,11 L243,11 L245,11";

  // Ensure we're on the client side to prevent hydration errors
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate sine path based on a phase shift
  const generatePath = (phase: number) => {
    let path = `M0,11 `;
    for (let x = 0; x <= points; x++) {
      // reverse phase direction by subtracting instead of adding
      const y =
        11 + amplitude * Math.sin((x / wavelength) * Math.PI * 2 - phase);
      path += `L${x * 2},${y} `;
    }
    return path;
  };

  // Pre-generate several frames for morphing
  const waveFrames = useMemo(() => {
    const frames: string[] = [];
    const frameCount = 60;
    for (let i = 0; i < frameCount; i++) {
      frames.push(generatePath((i / frameCount) * Math.PI * 2));
    }
    return frames;
  }, []);

  // Don't render animation on server side
  if (!isClient) {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d={staticPath}
          style={{ opacity: 0 }}
        />
      </svg>
    );
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="120 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d={generatePath(0)}
        initial={{
          pathLength: 0,
          opacity: 0,
        }}
        animate={{
          pathLength: 1,
          opacity: 1,
          d: waveFrames,
        }}
        transition={{
          pathLength: {
            duration: 1.5,
            ease: "easeInOut",
            delay: 2, // Wait 2 seconds before starting to draw
          },
          opacity: {
            duration: 0.3,
            ease: "easeInOut",
            delay: 2, // Wait 2 seconds before fading in
          },
          d: {
            duration: 2,
            ease: "linear",
            repeat: Infinity,
            delay: 3.5, // Start wave motion after 2s delay + 1.5s drawing
          },
        }}
      />
    </svg>
  );
};

export default AnimatedWave;

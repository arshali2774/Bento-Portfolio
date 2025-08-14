"use client";
import Asterisk16 from "./icons/shape_asterik";
import Decagram from "./icons/shape_decagram";
import StarFourPoints from "./icons/shape_star2";
import { motion, steps } from "motion/react";
import AnimatedWave from "./icons/wave1";
import MorphingShape from "./MorphingShape";
import MorphShapeGSAP from "./MorphShapeGSAP";
import { shape1, shape2, shape3 } from "@/utils/shapesArr";

const Shape = () => {
  return (
    <div className="flex items-center justify-center w-full h-full text-[var(--card)] relative overflow-hidden px-8">
      {/* Background Lines */}
      <motion.div className="absolute top-[10%] left-0 w-full h-12  overflow-hidden">
        <AnimatedWave />
      </motion.div>
      {/* <motion.div className="absolute top-[2%] left-0 w-full h-12  overflow-hidden">
        <AnimatedWave />
      </motion.div> */}

      <motion.div className="absolute bottom-[10%] left-0 w-full h-12  overflow-hidden">
        <AnimatedWave />
      </motion.div>
      <MorphShapeGSAP shapes={shape1} />
      <MorphShapeGSAP shapes={shape2} />
      <MorphShapeGSAP shapes={shape3} />
      {/* <MorphingShape rotationDirection="cw" /> */}

      {/* <motion.div className="absolute top-[50%] left-0 w-[200%] -z-10">
        <WaveLine2 color="#7B61FF" />
      </motion.div>

      <motion.div className="absolute top-[80%] left-0 w-[200%] -z-10">
        <WaveLine3 color="#7B61FF" />
      </motion.div> */}
      {/* 1 — Smooth clockwise medium speed */}
      {/* <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: [0, 360] }}
        transition={{
          scale: { delay: 1.7, duration: 0.5, ease: "backOut" },
          rotate: { repeat: Infinity, ease: "linear", duration: 2 },
        }}
      >
        <Decagram size="50" />
      </motion.div> */}

      {/* 2 — Smooth counter-clockwise fast */}
      {/* <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: [0, -360] }}
        transition={{
          scale: { delay: 1.8, duration: 0.5, ease: "backOut" },
          rotate: { repeat: Infinity, ease: "linear", duration: 2 },
        }}
      >
        <Asterisk16 size="50" />
      </motion.div> */}

      {/* 3 — Stepped clockwise, slow */}
      {/* <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: [0, 360] }}
        transition={{
          scale: { delay: 1.9, duration: 0.5, ease: "backOut" },
          rotate: {
            repeat: Infinity,
            ease: "linear",
            duration: 10, // slower rotation
          },
        }}
      >
        <StarFourPoints size="50" />
      </motion.div> */}

      {/* 4 — Complex sequence: smooth CW fast → step CW → smooth CCW fast → step CCW */}
      {/* <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: 1,
          rotate: [
            0,
            360, // smooth clockwise
            360,
            720, // step clockwise
            720,
            360, // smooth counter-clockwise
            360,
            0, // step counter-clockwise
          ],
        }}
        transition={{
          scale: { delay: 2.0, duration: 0.5, ease: "backOut" },
          rotate: {
            repeat: Infinity,
            duration: 8, // total cycle time
            ease: [
              "linear", // smooth CW
              steps(8), // step CW
              "linear", // smooth CCW
              steps(8), // step CCW
            ],
            times: [0, 0.25, 0.5, 0.75, 1],
          },
        }}
      >
        <Decagram size="50" />
      </motion.div> */}
    </div>
  );
};

export default Shape;

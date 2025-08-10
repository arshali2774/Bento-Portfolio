import Asterisk16 from "./icons/shape_asterik";
import Decagram from "./icons/shape_decagram";
import StarFourPoints from "./icons/shape_star2";
import { motion, steps } from "motion/react";

import WaveLine2 from "./icons/wave_2";
import WaveLine3 from "./icons/wave_3";
// import { WaveLine1 } from "./icons/wave_1";
import { SmoothWave } from "./icons/waves";
import Wave1 from "./icons/wave_1";

const Shape = () => {
  return (
    <div className="flex gap-3 items-center justify-center w-full h-full text-[var(--card)] relative overflow-hidden">
      {/* Background Lines */}

      {/* <motion.div className="absolute top-[20%] left-0 w-full h-fit -z-10">
        <Wave1 height={10} />
      </motion.div>

      <motion.div className="absolute top-[50%] left-0 w-[200%] -z-10">
        <WaveLine2 color="#7B61FF" />
      </motion.div>

      <motion.div className="absolute top-[80%] left-0 w-[200%] -z-10">
        <WaveLine3 color="#7B61FF" />
      </motion.div> */}
      {/* 1 — Smooth clockwise medium speed */}
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: [0, 360] }}
        transition={{
          scale: { delay: 1.7, duration: 0.5, ease: "backOut" },
          rotate: { repeat: Infinity, ease: "linear", duration: 2 },
        }}
      >
        <Decagram size="50" />
      </motion.div>

      {/* 2 — Smooth counter-clockwise fast */}
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: [0, -360] }}
        transition={{
          scale: { delay: 1.8, duration: 0.5, ease: "backOut" },
          rotate: { repeat: Infinity, ease: "linear", duration: 2 },
        }}
      >
        <Asterisk16 size="50" />
      </motion.div>

      {/* 3 — Stepped clockwise, slow */}
      <motion.div
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
      </motion.div>

      {/* 4 — Complex sequence: smooth CW fast → step CW → smooth CCW fast → step CCW */}
      <motion.div
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
      </motion.div>
    </div>
  );
};

export default Shape;

"use client";
import { AnimatePresence, motion, circInOut, backOut } from "motion/react";
import { useState } from "react";

const About = () => {
  const [size, setSize] = useState({ width: 120, height: 130 });
  const [showCardText, setShowCardText] = useState(true);
  const [showGridText, setShowGridText] = useState(false);

  const morphDuration = 500; // matches your layout animation
  const gapBeforeMorph = 200; // time between text fade out and morph start

  const toggleSize = () => {
    if (size.width === 120) {
      // Card → Grid
      setShowCardText(false); // fade out card text
      setTimeout(() => {
        setSize({ width: 100, height: 100 }); // start morph
      }, gapBeforeMorph);
      setTimeout(() => {
        setShowGridText(true); // fade in grid text after morph
      }, gapBeforeMorph + morphDuration);
    } else {
      // Grid → Card
      setShowGridText(false); // fade out grid text
      setTimeout(() => {
        setSize({ width: 120, height: 130 }); // start morph
      }, gapBeforeMorph);
      setTimeout(() => {
        setShowCardText(true); // fade in card text after morph
      }, gapBeforeMorph + morphDuration);
    }
  };

  return (
    <div className="w-full h-screen bg-amber-800 p-12 flex flex-col items-center justify-center gap-3">
      <button onClick={toggleSize} className="bg-white p-4">
        Click
      </button>

      <div className="w-2xl h-64 p-6 flex flex-col justify-between relative">
        {/* Card Text */}
        <AnimatePresence mode="wait">
          {showCardText && (
            <>
              <motion.p
                key="para"
                initial={{ opacity: 0, scaleY: 0.5 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.5 }}
                transition={{ duration: 0.3 }}
                className="font-overpass text-lg relative z-10"
              >
                Looking for me ?
              </motion.p>
              <motion.h1
                key="heading"
                initial={{ opacity: 0, scaleY: 0.5 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.5 }}
                transition={{ duration: 0.3 }}
                className="font-lora text-4xl relative z-10"
              >
                Contact Me
              </motion.h1>
            </>
          )}
        </AnimatePresence>

        {/* Grid */}
        <div className="inset-0 absolute rounded-lg grid grid-cols-3 grid-rows-2 gap-3 overflow-hidden">
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              layout
              transition={{
                duration: morphDuration / 1000,
                ease: circInOut,
              }}
              style={{ width: `${size.width}%`, height: `${size.height}%` }}
              className={`bg-emerald-500 rounded-lg text-white text-lg flex items-center justify-center ${
                index === 4 ? "col-span-2" : ""
              }`}
            >
              <AnimatePresence>
                {showGridText && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.06, // stagger
                      ease: backOut,
                    }}
                  >
                    Text
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

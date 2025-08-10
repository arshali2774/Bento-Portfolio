"use client";
import { AnimatePresence, motion, circInOut, backOut } from "motion/react";
import { useState } from "react";
import ArrowTopRight1 from "./icons/arrow";
import { socials } from "@/utils/socials";

const ContactCard = () => {
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
    <div className="w-full h-full p-6 flex flex-col justify-between relative ">
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
              className="text-xl relative z-10 "
            >
              Looking for me ?
            </motion.p>
            <motion.button
              key="heading"
              initial={{ opacity: 0, scaleY: 0.5 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.5 }}
              transition={{ duration: 0.3 }}
              onClick={toggleSize}
              className="flex gap-4 text-4xl font-lora cursor-pointer z-10"
            >
              Contact Me <ArrowTopRight1 size="24" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div className="inset-0 absolute rounded-lg grid grid-cols-3 grid-rows-2 gap-3 overflow-hidden">
        {socials.map((social, index) => (
          <motion.div
            key={index}
            layout
            transition={{
              duration: morphDuration / 1000,
              ease: circInOut,
            }}
            style={{ width: `${size.width}%`, height: `${size.height}%` }}
            className={`bg-[var(--card)] rounded-lg  text-lg flex items-center justify-center  overflow-hidden  ${
              index === 4 ? "col-span-2" : ""
            }`}
          >
            <AnimatePresence>
              {showGridText &&
                (index !== 4 ? (
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.06, // stagger
                      ease: backOut,
                    }}
                    className="flex items-center justify-center text-[var(--text)] h-full w-full cursor-pointer hover:bg-[var(--hover)]"
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </motion.a>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.06, // stagger
                      ease: backOut,
                    }}
                    onClick={toggleSize}
                    className="hover:bg-[var(--hover)] w-full h-full cursor-pointer flex items-center justify-center text-[var(--text)]"
                  >
                    {social.icon}
                  </motion.button>
                ))}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContactCard;

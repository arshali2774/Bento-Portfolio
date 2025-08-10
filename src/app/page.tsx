"use client";
import ArrowTopRight1 from "@/components/icons/arrow";
import {
  AnimatePresence,
  anticipate,
  circOut,
  easeIn,
  motion,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { themes } from "@/utils/themes";
import ContactCard from "@/components/ContactCard";
import Shape from "@/components/Shape";

export default function Home() {
  // Animation variants for the firework burst effect (delayed until item 9 completes both stages)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 1.5, // Wait for item 9 to complete both scaling and positioning
      },
    },
  };
  // Special animation for Item 9 - Two-stage "dropping from screen" effect
  const item9Variants = {
    hidden: {
      scale: 4, // Start huge (close to camera/screen)
      opacity: 0,
      x: "calc(50vw - 50% - 1050px)", // Centered horizontally
      y: "calc(50vh - 50% - 300px)", // Centered vertically
      filter: "blur(2px)", // Slight blur when it's "close to camera"
    },
    visible: {
      scale: 1, // Scale down to normal, then stay normal
      opacity: 1,
      x: ["calc(50vw - 50% - 1050px)", "calc(50vw - 50% - 1050px)", 0], // Stay centered, then move to position
      y: ["calc(50vh - 50% - 300px)", "calc(50vh - 50% - 300px)", 0], // Stay centered, then move to position
      filter: ["blur(0px)", "blur(0px)"], // Remove blur
      transition: {
        duration: 2.2,
        // times: [0, 1], // Smooth transition
        ease: [circOut, anticipate],
      },
    },
  };
  // contact me grid variants
  const contactGridVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        ease: easeIn,
      },
    },
  };
  // Calculate center offset for each item to create the burst effect
  const createItemVariants = (finalX: number, finalY: number) => ({
    hidden: {
      x: `calc(50vw - 50% - ${finalX}px)`,
      y: `calc(50vh - 50% - ${finalY}px)`,
      scale: 1,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: [0, 1, 1],
      transition: {
        duration: 0.5,
        times: [0, 0.5, 1],
        ease: circOut,
        // ease: cubicBezier(.47,.96,.33,.98),
      },
    },
  });
  //states
  const [theme, setTheme] = useState(themes[0]); // default fallback
  const [contactClick, setContactClick] = useState(false);
  const handleContactClick = () => {
    setContactClick(true);
  };
  useEffect(() => {
    const lastIndex = parseInt(localStorage.getItem("themeIndex") || "0", 10);
    const nextIndex = (lastIndex + 1) % themes.length;
    setTheme(themes[lastIndex]);
    localStorage.setItem("themeIndex", nextIndex.toString());
  }, []);
  if (!theme) return null; // Optional: show nothing during first render
  return (
    // Bento grid
    <main
      className="h-screen bg-[var(--background)] text-[var(--text)] p-4 relative overflow-hidden"
      style={
        {
          "--hover": theme.hover,
          "--card": theme.card,
          "--background": theme.background,
          "--text": theme.text,
          // "--hover": theme.dark_mode.hover,
          // "--card": theme.dark_mode.card,
          // "--background": theme.dark_mode.background,
          // "--text":theme.dark_mode.text
        } as React.CSSProperties
      }
    >
      <motion.div
        className="grid grid-cols-13 grid-rows-8 gap-4 w-full h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={createItemVariants(0, 0)}
          className="bg-[var(--card)] rounded-lg col-start-1 col-end-3  flex items-center justify-center"
        >
          <span className="text-center text-nowrap font-silkscreen leading-1 text-2xl">
            Arsh Ali
          </span>
        </motion.div>
        <div className="col-start-3 col-end-7">
          <Shape />
        </div>
        <motion.div
          variants={createItemVariants(650, 0)}
          className="bg-[var(--card)]  rounded-lg col-start-7 col-end-11 overflow-hidden"
        >
          <ul className="flex w-full items-center justify-evenly h-full font-overpass">
            <li className="hover:bg-[var(--hover)] h-full w-full flex items-center justify-center cursor-pointer">
              <span className="text-center text-nowrap text-lg">Home</span>
            </li>
            <li className="hover:bg-[var(--hover)] h-full w-full flex items-center justify-center cursor-pointer">
              <span className="text-center text-nowrap text-lg">About me</span>
            </li>
            <li className="hover:bg-[var(--hover)] h-full w-full flex items-center justify-center cursor-pointer">
              <span className="text-center text-nowrap text-lg">My work</span>
            </li>
          </ul>
        </motion.div>
        <motion.div
          variants={createItemVariants(1150, 0)}
          className="bg-[var(--card)]  p-2 rounded-lg col-start-11 col-end-14 flex items-center justify-center"
        >
          <span className="text-center text-nowrap font-overpass text-lg">
            Wanna Hire Me?
          </span>
        </motion.div>

        <motion.div
          variants={createItemVariants(50, 50)}
          className="bg-[var(--card)]  p-6 rounded-lg col-start-1 col-end-7 row-span-4 flex flex-col justify-between font-overpass"
        >
          <p className="text-xl"> What do I Like ?</p>
          <h1 className="text-6xl">
            <span className="font-lora">Crafting</span>
            <br />
            <span className="font-sofia">Visuals</span>
            <br />
            <span>Building</span>
            <br />
            <span className="font-limeLight">Experiences</span>
            <br />
          </h1>
        </motion.div>
        <motion.div
          variants={createItemVariants(700, 100)}
          className="bg-[var(--card)]  p-6 rounded-lg col-start-7 col-end-10 row-span-4 font-overpass flex flex-col justify-between"
        >
          <p className="font-lora text-xl">
            From stunning posters and logos to dynamic websites. I bring
            creativity and innovation together to design to bold brands,
            engaging motion and seamless web experiences.
          </p>
          <h2 className="text-4xl">What do I do ?</h2>
        </motion.div>

        <motion.div
          variants={createItemVariants(1050, 50)}
          className="rounded-lg col-start-10 col-end-14 row-span-2 font-overpass flex flex-col justify-between relative"
        >
          <ContactCard />
          {/* <p className="text-xl">Looking for me?</p>
          <button
            className="flex gap-4 text-4xl font-lora cursor-pointer hover:bg-[var(--hover)] w-fit px-3 py-4 rounded-lg"
            onClick={handleContactClick}
          >
            Contact Me <ArrowTopRight1 size="24" />
          </button> */}
        </motion.div>
        <motion.div
          variants={createItemVariants(0, 500)}
          className="bg-[var(--card)] rounded-lg col-start-1 col-end-5 row-span-3"
        >
          <Image
            src="/image-2.jpg" // Refers to public/images/banner.jpg
            alt="Profile Image 2"
            fill
            className="object-cover rounded-lg mix-blend-luminosity "
            priority
          />
        </motion.div>
        <motion.div
          variants={createItemVariants(450, 500)}
          className="bg-[var(--card)]  p-6 rounded-lg col-start-5 col-end-10  row-span-3 flex flex-col justify-between"
        >
          <p className="text-xl">Wanna check out my works ?</p>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-lora">Project 1</h2>
              <span className="w-24 h-1 bg-[var(--text)]"></span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-lora">Project 2</h2>
              <span className="w-24 h-1 bg-[var(--text)]"></span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-lora">Project 3</h2>
              <span className="w-24 h-1 bg-[var(--text)]"></span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-lora">Project 4</h2>
              <span className="w-24 h-1 bg-[var(--text)]"></span>
            </div>
          </div>
        </motion.div>

        {/* Item 9 - Two-stage animation: scale down at center, pause, then move to position */}

        <motion.div
          variants={item9Variants}
          initial="hidden"
          animate="visible"
          className="bg-[var(--card)] rounded-lg col-start-10 col-end-14 row-span-5 row-start-4 relative"
        >
          <Image
            src="/image-1.jpg" // Refers to public/images/banner.jpg
            alt="Profile Image 1"
            fill
            className="object-cover rounded-lg mix-blend-luminosity"
          />
        </motion.div>
      </motion.div>
    </main>
  );
}

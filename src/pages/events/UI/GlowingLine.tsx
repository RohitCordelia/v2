import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GlowingLine = ({ className }: { className?: string }) => {
  // Path data traced from your provided image
  const pathData =
    'M87.5005 1C87.5005 1 -60.6993 90.0697 61.0001 180C120.391 223.887 257.011 270.781 481.501 318.5C534.5 335.5 507 395 451.5 447.5C396 500 109.5 459 45.5002 491C-4.49979 516 1.50015 568.21 1.50015 596.5C1.50015 663.177 160.058 689.764 316 733C534 793.442 645.501 801.018 645.501 851';

  // The height of the coordinate system for the SVG path
  const svgHeight = 1102;

  // 1. Track scroll progress for the whole page (0 to 1)
  const { scrollYProgress } = useScroll();

  // 2. Map scroll progress to the gradient's vertical position
  // As the user scrolls, we move a 300px tall gradient from the top to the bottom
  // of the SVG. The offset makes sure it starts/ends off-screen.
  const gradientY = useTransform(scrollYProgress, [0, 1], [-400, svgHeight]);

  return (
    <div className={`line-container ${className}`}>
      <svg
        viewBox="0 0 402 1102"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        // This makes the SVG stretch to the container's full width and height
        preserveAspectRatio="none"
      >
        <defs>
          {/* This gradient is the "hotspot" of light that will travel */}
          <motion.linearGradient
            id="glow-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="400" // A 300px tall gradient
            gradientUnits="userSpaceOnUse"
            // The `y` position is animated by Framer Motion based on scroll
            style={{ y: gradientY }}
          >
            {/* The gradient fades in and out to create a soft moving light */}
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </motion.linearGradient>
        </defs>

        {/* Path 1: The non-glowing base line. Always visible. */}
        <path d={pathData} className="line-base" />

        {/* Path 2: The line that will carry the moving glow. */}
        <path d={pathData} stroke="url(#glow-gradient)" className="line-glow" />
      </svg>
    </div>
  );
};

export default GlowingLine;

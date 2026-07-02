/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export default function BackgroundElements() {
  const [isMobile, setIsMobile] = useState(false);

  // Motion values for normalized mouse positions (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics configs for liquid-smooth feedback
  const springConfig = { damping: 45, stiffness: 90, mass: 1.2 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax transforms for the background glow
  const glowX = useTransform(springX, [-0.5, 0.5], ["-30%", "-10%"]);
  const glowY = useTransform(springY, [-0.5, 0.5], ["-30%", "-10%"]);

  // Parallax transforms for physical shapes (different coefficients to create depth)
  const shape1X = useTransform(springX, [-0.5, 0.5], [-50, 50]);
  const shape1Y = useTransform(springY, [-0.5, 0.5], [-50, 50]);

  const shape2X = useTransform(springX, [-0.5, 0.5], [70, -70]);
  const shape2Y = useTransform(springY, [-0.5, 0.5], [70, -70]);

  const shape3X = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const shape3Y = useTransform(springY, [-0.5, 0.5], [30, -30]);

  useEffect(() => {
    // Check if user is on mobile to optimize performance
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) - 0.5;
      const ny = (e.clientY / innerHeight) - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#ffffff]">
      {/* Dynamic Radial Ambient Lights - Monochrome Soft Glows */}
      {!isMobile && (
        <motion.div
          style={{
            left: glowX,
            top: glowY,
          }}
          className="absolute w-[80vw] h-[80vw] rounded-full bg-radial from-neutral-200/40 via-neutral-100/10 to-transparent blur-[120px] will-change-transform"
        />
      )}

      {/* Static Monochrome Light on the bottom right */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-radial from-neutral-100/60 to-transparent blur-[140px]" />

      {/* Ambient Grid Overlay (Swiss Style Fine lines) */}
      <div 
        className="absolute inset-0 opacity-[0.04]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #000000 1px, transparent 1px),
            linear-gradient(to bottom, #000000 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Interactive Geometric Shapes - In Monochrome */}

      {/* Shape 1: Concentric Quantum Gyroscope */}
      <motion.div
        style={{
          x: isMobile ? 0 : shape1X,
          y: isMobile ? 0 : shape1Y,
        }}
        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 40, damping: 20, delay: 0.2 }}
        className="absolute top-[12%] right-[5%] md:right-[15%] w-[280px] h-[280px] md:w-[440px] md:h-[440px] opacity-20 md:opacity-30 will-change-transform"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Outer Rotating Ring with Dashes */}
          <motion.circle
            cx="200"
            cy="200"
            r="160"
            fill="none"
            stroke="url(#mono-grad)"
            strokeWidth="1.5"
            strokeDasharray="12, 12"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          />

          {/* Middle Ring with a faster counter-rotation */}
          <motion.circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="url(#grey-glow)"
            strokeWidth="2"
            strokeDasharray="40 10 5 10"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          />

          {/* Inner Geodesic-like Pattern */}
          <motion.g
            animate={{ rotate: 180 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          >
            {/* Triangular internal trusses */}
            <polygon points="200,100 286,250 114,250" fill="none" stroke="#000000" strokeWidth="1" strokeOpacity="0.15" />
            <polygon points="200,300 286,150 114,150" fill="none" stroke="#000000" strokeWidth="1" strokeOpacity="0.15" />
            
            {/* Center Core Pulsing Dot */}
            <motion.circle
              cx="200"
              cy="200"
              r="12"
              fill="url(#core-mono)"
              animate={{ scale: [0.9, 1.25, 0.9] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
          </motion.g>

          {/* Definitions of Gradients for SVGs */}
          <defs>
            <linearGradient id="mono-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#888888" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="grey-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#cccccc" stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id="core-mono" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Shape 2: Cyber Monochrome Polygon */}
      <motion.div
        style={{
          x: isMobile ? 0 : shape2X,
          y: isMobile ? 0 : shape2Y,
        }}
        initial={{ opacity: 0, scale: 0.4, rotate: 60 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 35, damping: 18, delay: 0.4 }}
        className="absolute top-[45%] md:top-[35%] left-[2%] md:left-[8%] w-[180px] h-[180px] md:w-[280px] md:h-[280px] opacity-15 md:opacity-20 will-change-transform"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Hexagonal mesh structure */}
          <motion.polygon
            points="100,20 170,60 170,140 100,180 30,140 30,60"
            fill="none"
            stroke="url(#dark-grad)"
            strokeWidth="1.5"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
            style={{ transformOrigin: "100px 100px" }}
          />
          {/* Internal star mesh lines */}
          <motion.g
            animate={{ rotate: -180 }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
            style={{ transformOrigin: "100px 100px" }}
          >
            <line x1="100" y1="20" x2="100" y2="180" stroke="#000000" strokeWidth="0.75" strokeOpacity="0.1" />
            <line x1="30" y1="60" x2="170" y2="140" stroke="#000000" strokeWidth="0.75" strokeOpacity="0.1" />
            <line x1="30" y1="140" x2="170" y2="60" stroke="#000000" strokeWidth="0.75" strokeOpacity="0.1" />
            
            <circle cx="100" cy="100" r="40" fill="none" stroke="#000000" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.2" />
          </motion.g>

          <defs>
            <linearGradient id="dark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Shape 3: Subtle Tiny Orbitals */}
      <motion.div
        style={{
          x: isMobile ? 0 : shape3X,
          y: isMobile ? 0 : shape3Y,
        }}
        className="absolute top-[25%] left-[45%] w-[120px] h-[120px] opacity-10 hidden md:block will-change-transform"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#000000" strokeWidth="0.5" strokeDasharray="2, 6" />
          <motion.circle
            cx="50"
            cy="5"
            r="3"
            fill="#000000"
            animate={{
              cx: [50, 95, 50, 5, 50],
              cy: [5, 50, 95, 50, 5],
            }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}

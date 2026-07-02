/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowUpRight, Cpu, Layers } from "lucide-react";
import { PORTFOLIO } from "../data";
import { PortfolioProject } from "../types";

// Animated Mockup Graphics rendered entirely in inline responsive SVGs using monochrome palette
function ProjectGraphic({ type, color }: { type: PortfolioProject["mockupType"]; color: string }) {
  // Use pure black and grey strokes instead of the custom color parameter for sterile monochrome look
  const strokeColor = "#000000";

  if (type === "mesh") {
    return (
      <svg viewBox="0 0 400 240" className="w-full h-full opacity-70">
        {/* Generative Tech Wave Mesh */}
        <g stroke={strokeColor} strokeWidth="0.75" fill="none" strokeOpacity="0.25">
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d={`M -50,${40 + i * 15} Q 100,${10 + i * 20 - (i % 2) * 30} 200,${40 + i * 15} T 450,${40 + i * 15}`}
              className="animate-[pulse_4s_infinite_ease-in-out]"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={i}
              x1={40 + i * 35}
              y1="-20"
              x2={20 + i * 40}
              y2="260"
              strokeOpacity="0.1"
            />
          ))}
        </g>
        <circle cx="200" cy="120" r="40" fill="none" stroke={strokeColor} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 3" />
        <circle cx="200" cy="120" r="10" fill={strokeColor} fillOpacity="0.05" />
      </svg>
    );
  }

  if (type === "lines") {
    return (
      <svg viewBox="0 0 400 240" className="w-full h-full opacity-70">
        {/* Isometric perspective web lines */}
        <g stroke={strokeColor} strokeWidth="0.75" fill="none" strokeOpacity="0.25">
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1="200"
              y1="120"
              x2={Math.cos((i * Math.PI) / 8) * 300 + 200}
              y2={Math.sin((i * Math.PI) / 8) * 300 + 120}
              strokeOpacity={0.1 + (i % 3) * 0.08}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <polygon
              key={i}
              points={`
                ${200 + Math.cos(0) * (25 + i * 30)},${120 + Math.sin(0) * (25 + i * 30)}
                ${200 + Math.cos(Math.PI/3) * (25 + i * 30)},${120 + Math.sin(Math.PI/3) * (25 + i * 30)}
                ${200 + Math.cos((2*Math.PI)/3) * (25 + i * 30)},${120 + Math.sin((2*Math.PI)/3) * (25 + i * 30)}
                ${200 + Math.cos(Math.PI) * (25 + i * 30)},${120 + Math.sin(Math.PI) * (25 + i * 30)}
                ${200 + Math.cos((4*Math.PI)/3) * (25 + i * 30)},${120 + Math.sin((4*Math.PI)/3) * (25 + i * 30)}
                ${200 + Math.cos((5*Math.PI)/3) * (25 + i * 30)},${120 + Math.sin((5*Math.PI)/3) * (25 + i * 30)}
              `}
              strokeDasharray={i % 2 === 0 ? "4 4" : "none"}
            />
          ))}
        </g>
      </svg>
    );
  }

  // Rings default
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full opacity-70">
      {/* Dynamic orbital concentric rings */}
      <g stroke={strokeColor} strokeWidth="1" fill="none" strokeOpacity="0.25" className="origin-center">
        <circle cx="200" cy="120" r="80" strokeDasharray="10 20 40 10" className="animate-[spin_40s_linear_infinite]" style={{ transformOrigin: "200px 120px" }} />
        <circle cx="200" cy="120" r="55" strokeDasharray="5 5" className="animate-[spin_25s_linear_infinite_reverse]" style={{ transformOrigin: "200px 120px" }} />
        <circle cx="200" cy="120" r="30" className="animate-[pulse_3s_infinite_ease-in-out]" />
        
        {/* Crosshair target lines */}
        <line x1="200" y1="20" x2="200" y2="220" strokeDasharray="2 4" strokeOpacity="0.1" />
        <line x1="80" y1="120" x2="320" y2="120" strokeDasharray="2 4" strokeOpacity="0.1" />
      </g>
    </svg>
  );
}

interface PortfolioProps {
  onStartProject: (projectName?: string) => void;
}

export default function Portfolio({ onStartProject }: PortfolioProps) {
  return (
    <section id="portfolio" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#ffffff] z-10 overflow-hidden border-t border-black/5">
      {/* Ambient soft background gradient (Monochrome) */}
      <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-neutral-100 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 text-black/40 font-mono text-xs tracking-[0.25em] uppercase mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-black mr-1" />
              <span>[ ИЗБРАННЫЕ КЕЙСЫ / PORTFOLIO ]</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              className="text-4xl md:text-5xl font-display font-bold text-black tracking-tight"
            >
              Интерактивные проекты, <br />
              <span className="font-serif italic font-normal text-neutral-600">
                меняющие правила игры
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral-500 text-sm md:text-base font-light font-sans max-w-sm leading-relaxed"
          >
            Каждый кейс является результатом безупречного баланса технической архитектуры, интерактивного дизайна и жесткой B2B-конверсии.
          </motion.p>
        </div>

        {/* Portfolio Stack Grid */}
        <div className="space-y-12 md:space-y-16">
          {PORTFOLIO.map((project: PortfolioProject, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ type: "spring", stiffness: 50, damping: 18 }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-stretch gap-8 md:gap-12 lg:gap-16 bg-[#ffffff] border border-black/10 rounded-3xl p-6 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.02)] overflow-hidden relative group`}
              >
                {/* Tactile Fuzzy Velvet 3D Texture background filter inside portfolio item */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] mix-blend-overlay z-0">
                  <filter id="felt-noise-portfolio">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.8 0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#felt-noise-portfolio)" />
                </svg>

                {/* Left Side: Mockup Preview Vector */}
                <div className="flex-1 min-h-[220px] md:min-h-[280px] bg-neutral-50 rounded-2xl border border-black/10 flex items-center justify-center relative overflow-hidden group-hover:border-black/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ffffff]/10" />
                  
                  {/* Soft organic ambient light */}
                  <div className="absolute w-44 h-44 rounded-full bg-neutral-200 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

                  {/* Inline Generative Interactive Graphic */}
                  <div className="w-full max-w-[340px] transform group-hover:scale-[1.03] transition-transform duration-700 ease-out">
                    <ProjectGraphic type={project.mockupType} color={project.accentColor} />
                  </div>

                  {/* Top-Right Year Label */}
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/[0.02] border border-black/10 text-[10px] font-mono text-neutral-500">
                    RELEASE // {project.year}
                  </div>
                </div>

                {/* Right Side: Content Details */}
                <div className="flex-1 flex flex-col justify-between py-2 md:py-4 z-10">
                  <div>
                    {/* Category */}
                    <span className="text-xs font-mono tracking-wider font-semibold uppercase block mb-3 text-black">
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-black mb-4 tracking-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-500 text-sm md:text-base font-light leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Stack Badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded bg-black/[0.02] border border-black/5 text-[11px] font-mono text-neutral-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Highlight: Real Metric & Action button */}
                  <div className="pt-6 border-t border-black/5 flex items-center justify-between gap-6">
                    {/* Highlighted Metric */}
                    <div className="flex items-center space-x-3.5">
                      <div className="p-2.5 rounded-xl bg-black/[0.02] border border-black/5 text-neutral-800 shadow-inner shrink-0">
                        <Cpu className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <span className="block text-xl md:text-2xl font-display font-black tracking-tight leading-none mb-1 text-black">
                          {project.metric}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">
                          {project.metricLabel}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <button
                      onClick={() => onStartProject(`Реплика/Развитие проекта: ${project.title}`)}
                      className="relative p-3.5 rounded-xl bg-black text-white hover:bg-neutral-900 transition-all cursor-pointer group/arrow focus:outline-none flex items-center justify-center shadow-md"
                    >
                      <ArrowUpRight className="w-5 h-5 text-white transition-transform duration-300 transform group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

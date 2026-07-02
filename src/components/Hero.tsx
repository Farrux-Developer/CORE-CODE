/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowDown, Sparkles, MessageSquare } from "lucide-react";

interface HeroProps {
  onStartProject: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onStartProject, onScrollToSection }: HeroProps) {
  // Stagger wrapper definitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4,
      },
    },
  };

  // Sliding fade up for typography elements
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        mass: 1,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-28 pb-16 z-10 overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Visual Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/[0.02] border border-black/10 backdrop-blur-md mb-8 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-black/70 uppercase">
            60FPS • HIGH-END DIGITAL EXPERIENCES
          </span>
        </motion.div>

        {/* Cinematic Headline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-[80px] font-display font-bold text-black tracking-tight leading-[0.95]"
          >
            Архитектура <br className="sm:hidden" />
            <span className="font-serif italic font-normal text-neutral-800">
              веб-сервисов
            </span>{" "}
            <br className="hidden md:inline" />
            мирового класса
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-neutral-600 text-base md:text-lg tracking-wide font-sans font-light leading-relaxed pt-4"
          >
            Разработка премиальных сайтов и сложных интерфейсов под руководством Farrux. Чистый, производительный код, безупречная швейцарская типографика и нулевой компромисс в качестве.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            {/* CTA Button */}
            <motion.button
              onClick={onStartProject}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 w-full sm:w-auto rounded-xl text-base font-semibold text-white bg-black hover:bg-neutral-900 shadow-[0_4px_20px_rgba(0,0,0,0.15)] cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none"
            >
              <Sparkles className="w-4 h-4 text-white" />
              Обсудить проект
            </motion.button>

            {/* Showcase shortcut */}
            <motion.button
              onClick={() => onScrollToSection("portfolio")}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 0, 0, 0.03)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 w-full sm:w-auto rounded-xl text-base font-medium text-black border border-black/10 hover:border-black/20 cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none"
            >
              <MessageSquare className="w-4 h-4 text-neutral-500" />
              Смотреть работы
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Real-world like Capabilities / Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 20, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 pt-20 border-t border-black/5 w-full mt-24 max-w-4xl"
        >
          <div className="text-center md:text-left">
            <span className="block text-3xl md:text-4xl font-display font-bold text-black mb-1">
              60<span className="text-neutral-400 font-mono">+</span>
            </span>
            <span className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
              FPS Плавность
            </span>
          </div>

          <div className="text-center md:text-left">
            <span className="block text-3xl md:text-4xl font-display font-bold text-black mb-1">
              0.5<span className="text-neutral-400 font-mono">с</span>
            </span>
            <span className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
              Время загрузки
            </span>
          </div>

          <div className="text-center md:text-left col-span-2 md:col-span-1">
            <span className="block text-3xl md:text-4xl font-display font-bold text-black mb-1">
              100<span className="text-neutral-400 font-mono">%</span>
            </span>
            <span className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
              Bespoke Код (Без ORM)
            </span>
          </div>
        </motion.div>
      </div>

      {/* Down arrow scroll helper */}
      <motion.button
        onClick={() => onScrollToSection("services")}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 rounded-full border border-black/5 bg-black/[0.01] text-neutral-400 hover:text-black hover:border-black/10 transition-colors cursor-pointer hidden sm:block focus:outline-none"
      >
        <ArrowDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
}

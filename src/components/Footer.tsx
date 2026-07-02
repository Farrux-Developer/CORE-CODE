/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowUpRight, Github, Send, Youtube } from "lucide-react";

interface FooterProps {
  onStartProject: () => void;
}

export default function Footer({ onStartProject }: FooterProps) {
  const socialLinks = [
    { label: "Telegram", href: "https://t.me/FrontEndandBackEndDevelopement", icon: Send },
    { label: "GitHub", href: "https://github.com/Farrux-Developer", icon: Github },
    { label: "YouTube (Git-Commit-Coffee)", href: "https://www.youtube.com/channel/UC96bbw9mTZi9bT_QZcKBnSA", icon: Youtube },
  ];

  return (
    <footer className="relative bg-[#ffffff] border-t border-black/10 pt-24 pb-12 px-6 md:px-12 z-10 overflow-hidden">
      {/* Footer background soft radial light */}
      <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[60vw] h-[60vw] rounded-full bg-neutral-100 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        {/* Massive Call-to-Action Area */}
        <div className="text-center max-w-4xl mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="space-y-6"
          >
            <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase block font-bold">
              // ГОТОВЫ НАЧАТЬ ЭВОЛЮЦИЮ?
            </span>
            
            <h2 className="text-4xl sm:text-6xl md:text-[76px] font-display font-black text-black tracking-tight leading-[0.95]">
              Готовы создать <br />
              нечто{" "}
              <span className="font-serif italic font-normal text-neutral-600">
                выдающееся
              </span>
              ?
            </h2>

            <p className="text-neutral-500 max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed pt-3">
              Давайте объединим ваши бизнес-цели с нашей глубокой экспертизой в веб-технологиях и утонченном интерактивном дизайне. Сделаем сайт мирового класса.
            </p>

            <div className="pt-6">
              <motion.button
                onClick={onStartProject}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 rounded-xl text-base font-bold text-white bg-black hover:bg-neutral-900 shadow-xl cursor-pointer inline-flex items-center gap-2 transition-all duration-300 focus:outline-none"
              >
                <span>Запустить проект</span>
                <ArrowUpRight className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Links, Socials & Meta Grid */}
        <div className="w-full pt-12 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo meta */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
            <span className="font-display font-black text-sm tracking-widest text-black">
              FARRUX
            </span>
            <span className="text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase font-semibold">
              Bespoke Web Architect
            </span>
          </div>

          {/* Social icons */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-black transition-colors py-1 group"
                >
                  <IconComponent className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-colors" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Legal copyright */}
          <div className="text-center md:text-right">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block tracking-wider font-semibold">
              © 2026 Farrux. All rights reserved.
            </span>
            <span className="text-[9px] font-mono text-neutral-400 block mt-0.5">
              CRAFTED BY FARRUX • EXPERT DEVELOPER
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

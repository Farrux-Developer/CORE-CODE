/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Code, Sparkles } from "lucide-react";

interface NavbarProps {
  onStartProject: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Navbar({ onStartProject, onScrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    // Intersection Observer to detect active section in real-time
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // High-fidelity intersection zone
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ["services", "portfolio", "calculator"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const navLinks = [
    { label: "Услуги", id: "services" },
    { label: "Проекты", id: "portfolio" },
    { label: "Калькулятор", id: "calculator" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 md:px-12 py-4 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-black/10 py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center space-x-2.5 group focus:outline-none text-left cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-xl bg-black flex items-center justify-center overflow-hidden shadow-md">
              <Code className="w-4 h-4 text-white absolute transition-transform duration-300 group-hover:scale-0" />
              <Sparkles className="w-4 h-4 text-white absolute transition-transform duration-300 scale-0 group-hover:scale-110" />
            </div>
            <div>
              <span className="font-display font-black text-lg tracking-widest text-black uppercase">
                FARRUX
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-400 block -mt-1 uppercase font-semibold">
                Web Architect
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onScrollToSection(link.id)}
                  className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 py-1.5 focus:outline-none group cursor-pointer ${
                    isActive ? "text-black" : "text-neutral-400 hover:text-black"
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-black transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </button>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onStartProject}
              className="relative px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide overflow-hidden group transition-all duration-300 border border-black/10 hover:border-black bg-white text-black hover:bg-black hover:text-white cursor-pointer shadow-sm"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Запустить проект
                <ArrowUpRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-black/[0.02] border border-black/10 text-black focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Backdrop & Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-45 md:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm bg-white border-l border-black/10 p-8 z-50 flex flex-col md:hidden shadow-2xl"
            >
              {/* Tactile Fuzzy Velvet 3D Texture background filter in mobile nav */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] mix-blend-overlay z-0">
                <filter id="felt-noise-nav">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.8 0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#felt-noise-nav)" />
              </svg>

              <div className="flex items-center justify-between mb-12 relative z-10">
                <span className="font-display font-black text-lg tracking-widest text-black">
                  FARRUX
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-black/[0.02] border border-black/10 text-black focus:outline-none cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-6 text-left relative z-10">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onScrollToSection(link.id);
                      }}
                      className={`text-lg font-bold tracking-wide transition-colors duration-200 text-left flex items-center justify-between group cursor-pointer ${
                        isActive ? "text-black" : "text-neutral-400 hover:text-black"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-auto pt-8 border-t border-black/10 flex flex-col space-y-4 relative z-10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStartProject();
                  }}
                  className="w-full text-center py-4 rounded-xl font-bold bg-black text-white hover:bg-neutral-900 shadow-md cursor-pointer focus:outline-none"
                >
                  Запустить проект
                </button>
                <div className="text-center text-[10px] text-neutral-400 font-mono font-semibold">
                  © 2026 FARRUX. WEB ARCHITECT
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Sparkles, 
  ShoppingBag, 
  Layers, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Target, 
  Users, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck
} from "lucide-react";
import { SERVICES } from "../data";

interface ServicesProps {
  onStartProject: (serviceTitle?: string) => void;
}

export default function Services({ onStartProject }: ServicesProps) {
  
  // Select icon based on service properties
  const getServiceIcon = (iconName: string, isDark: boolean) => {
    const colorClass = isDark ? "text-white" : "text-black";
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className={`w-5 h-5 ${colorClass}`} />;
      case "Layers":
        return <Layers className={`w-5 h-5 ${colorClass}`} />;
      case "ShoppingBag":
        return <ShoppingBag className={`w-5 h-5 ${colorClass}`} />;
      default:
        return <Sparkles className={`w-5 h-5 ${colorClass}`} />;
    }
  };

  return (
    <section id="services" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#ffffff] z-10 overflow-hidden border-t border-black/5">
      {/* Swiss grid pattern background element */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Title Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 text-black/40 font-mono text-xs tracking-[0.25em] uppercase mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-ping mr-1" />
            <span>[ НАШИ РЕШЕНИЯ / PORTFOLIO CASE-STUDIES ]</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="text-4xl md:text-6xl font-display font-bold text-black tracking-tight leading-tight"
          >
            Реальные проекты <br />
            <span className="font-serif italic font-normal text-neutral-600">
              с окупаемостью для B2B
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-neutral-500 mt-6 text-base md:text-lg font-light leading-relaxed max-w-2xl"
          >
            Каждое решение проектируется индивидуально под коммерческие цели бизнеса. Никаких фейковых шаблонов — только реальный код, безупречный отклик, продуманный сценарный UX и высокая конверсия.
          </motion.p>
        </div>

        {/* Sticky Stack Cards Container */}
        <div className="relative mt-12 space-y-20 pb-12">
          {SERVICES.map((service, index) => {
            // Offset for sticky stacked cards
            const stickyTop = 100 + index * 40;
            const isPaperCard = service.id === "ai-project";
            const isFuzzyCard = service.id === "about-me";
            const isDarkCard = isFuzzyCard; // Interactive 3D is presented on black fuzzy velvet canvas

            let bgClass = "bg-[#ffffff]";
            let borderClass = "border-black/10";
            let shadowClass = "shadow-[0_35px_80px_rgba(0,0,0,0.03)]";
            let selectionClass = "selection:bg-black selection:text-white";

            if (isPaperCard) {
              bgClass = "bg-[#fcfbf9]"; // warm rich off-white designer paper tone
              borderClass = "border-black/15";
            } else if (isFuzzyCard) {
              bgClass = "bg-[#111111]"; // Luxurious black velvet paper canvas
              borderClass = "border-white/10";
              shadowClass = "shadow-[0_40px_100px_rgba(0,0,0,0.45)]";
              selectionClass = "selection:bg-white selection:text-black"; // Fix selection text bug
            }

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0.1, y: -120 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 45, 
                  damping: 24, // High damping to guarantee gentle drop snapping
                  mass: 1.25
                }}
                className={`sticky rounded-3xl border p-8 md:p-12 overflow-hidden flex flex-col justify-between min-h-[580px] group/card will-change-transform transition-all duration-500 ${bgClass} ${borderClass} ${shadowClass} ${selectionClass}`}
                style={{ 
                  top: `${stickyTop}px`,
                  zIndex: index + 1
                }}
              >
                {/* 1. Paper Texture SVG Noise Filter */}
                {isPaperCard && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14] mix-blend-multiply z-0">
                    <filter id={`paper-noise-${service.id}`}>
                      <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.15 0" />
                    </filter>
                    <rect width="100%" height="100%" filter={`url(#paper-noise-${service.id})`} />
                  </svg>
                )}

                {/* 2. Fuzzy 3D Tactile Monochrome Velvet Texture Filter */}
                {isFuzzyCard && (
                  <>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12] mix-blend-overlay z-0">
                      <filter id={`fuzzy-velvet-${service.id}`}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0" />
                      </filter>
                      <rect width="100%" height="100%" filter={`url(#fuzzy-velvet-${service.id})`} />
                    </svg>
                    {/* Fluffy monochrome velvet 3D shape blur watermark */}
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none z-0" />
                  </>
                )}

                {/* Soft fluffy organic 3D gradient shape for general cards */}
                <div className={`absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-gradient-to-br ${isDarkCard ? "from-white/5 via-white/[0.01]" : "from-neutral-200/20 via-neutral-100/5"} to-transparent blur-3xl pointer-events-none z-0 opacity-80 group-hover/card:scale-105 transition-transform duration-700`} />
                <div className={`absolute -left-12 -bottom-12 w-48 h-48 rounded-full ${isDarkCard ? "bg-white/[0.02]" : "bg-neutral-100/30"} blur-2xl pointer-events-none z-0`} />

                {/* Card Content Wrapper */}
                <div className="relative z-10 flex-grow">
                  {/* Card Header */}
                  <div className={`flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b ${isDarkCard ? "border-white/10" : "border-black/5"}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3.5 rounded-2xl ${isDarkCard ? "bg-white/5 border-white/10" : "bg-neutral-50 border-black/5"} border shadow-sm`}>
                        {getServiceIcon(service.iconName, isDarkCard)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block leading-tight">
                          {service.subtitle}
                        </span>
                        <h3 className={`text-xl md:text-2xl font-display font-bold ${isDarkCard ? "text-white" : "text-black"} tracking-tight mt-1`}>
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-xs font-mono">
                      <div>
                        <span className="block text-neutral-400 uppercase tracking-widest text-[9px] mb-0.5">Класс</span>
                        <div className={`flex items-center ${isDarkCard ? "text-neutral-300" : "text-neutral-700"} gap-1.5 font-medium`}>
                          <Clock className={`w-3.5 h-3.5 ${isDarkCard ? "text-white" : "text-black"}`} />
                          <span>{service.timeEstimate}</span>
                        </div>
                      </div>
                      <div className={`h-6 w-[1px] ${isDarkCard ? "bg-white/10" : "bg-black/10"}`} />
                      <div>
                        <span className="block text-neutral-400 uppercase tracking-widest text-[9px] mb-0.5">Тип</span>
                        <span className={`font-semibold ${isDarkCard ? "text-white" : "text-black"}`}>{service.priceEstimate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Grid with details on left and image/GitHub link on right */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                    
                    {/* Left Details Column */}
                    <div className="lg:col-span-7 space-y-6">
                      <p className={`${isDarkCard ? "text-neutral-300" : "text-neutral-700"} text-sm md:text-base font-light leading-relaxed max-w-2xl`}>
                        {service.description}
                      </p>

                      {/* B2B STRUCTURE GRID */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* What we do */}
                        <div className={`space-y-2 p-4 rounded-xl ${isDarkCard ? "bg-white/[0.02] border-white/5 hover:border-white/10" : "bg-black/[0.01] border-black/5 hover:border-black/10"} border transition-colors`}>
                          <div className={`flex items-center space-x-2 ${isDarkCard ? "text-white/70" : "text-black/70"}`}>
                            <Briefcase className="w-4 h-4 shrink-0" />
                            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">СПЕКТР РАБОТ:</span>
                          </div>
                          <p className={`${isDarkCard ? "text-neutral-400" : "text-neutral-600"} text-xs leading-relaxed font-light`}>
                            {service.whatWeDo}
                          </p>
                        </div>

                        {/* For whom */}
                        <div className={`space-y-2 p-4 rounded-xl ${isDarkCard ? "bg-white/[0.02] border-white/5 hover:border-white/10" : "bg-black/[0.01] border-black/5 hover:border-black/10"} border transition-colors`}>
                          <div className={`flex items-center space-x-2 ${isDarkCard ? "text-white/70" : "text-black/70"}`}>
                            <Users className="w-4 h-4 shrink-0" />
                            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">ОРИЕНТИР:</span>
                          </div>
                          <p className={`${isDarkCard ? "text-neutral-400" : "text-neutral-600"} text-xs leading-relaxed font-light`}>
                            {service.forWhom}
                          </p>
                        </div>

                        {/* Problem solved */}
                        <div className={`space-y-2 p-4 rounded-xl ${isDarkCard ? "bg-white/[0.02] border-white/5 hover:border-white/10" : "bg-black/[0.01] border-black/5 hover:border-black/10"} border transition-colors`}>
                          <div className={`flex items-center space-x-2 ${isDarkCard ? "text-white/70" : "text-black/70"}`}>
                            <Target className="w-4 h-4 shrink-0" />
                            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">ЭФФЕКТ ДЛЯ БИЗНЕСА:</span>
                          </div>
                          <p className={`${isDarkCard ? "text-neutral-400" : "text-neutral-600"} text-xs leading-relaxed font-light`}>
                            {service.problemSolved}
                          </p>
                        </div>

                        {/* Key Metric Container */}
                        <div className={`p-4 rounded-xl ${isDarkCard ? "bg-[#181818] border-white/10" : "bg-[#f8f9fa] border-black/10"} border flex flex-col justify-between shadow-sm`}>
                          <div className={`flex items-center space-x-2 ${isDarkCard ? "text-white" : "text-black"}`}>
                            <TrendingUp className="w-4 h-4 shrink-0" />
                            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">КЛЮЧЕВОЙ ПОКАЗАТЕЛЬ:</span>
                          </div>
                          <div className="mt-2">
                            <div className={`text-2xl font-display font-black ${isDarkCard ? "text-white" : "text-black"} tracking-tight`}>
                              {service.keyMetric}
                            </div>
                            <span className={`text-[10px] ${isDarkCard ? "text-neutral-400" : "text-neutral-500"} leading-snug block mt-0.5`}>
                              {service.keyMetricLabel}
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* Checklist */}
                      <div>
                        <span className="block font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-3">Технологический стек проекта:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className={`flex items-center text-xs ${isDarkCard ? "text-neutral-300" : "text-neutral-700"}`}>
                              <CheckCircle2 className={`w-4 h-4 ${isDarkCard ? "text-white" : "text-black"} mr-2.5 shrink-0`} />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Media Column */}
                    <div className="lg:col-span-5 space-y-4">
                      {/* Image Frame with dynamic portfolio illustration */}
                      <div className={`relative rounded-2xl overflow-hidden border ${isDarkCard ? "border-white/15 bg-white/5" : "border-black/10 bg-black/[0.02]"} aspect-[4/3] w-full flex items-center justify-center`}>
                        {service.imageUrl ? (
                          <img 
                            src={service.imageUrl} 
                            alt={service.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        ) : (
                          <span className="text-xs font-mono text-neutral-400">[ No Image Available ]</span>
                        )}
                      </div>

                      {/* GitHub Link CTA */}
                      {service.githubUrl && (
                        <a 
                          href={service.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-mono text-xs tracking-widest uppercase transition-all duration-300 group/git font-bold ${
                            isDarkCard 
                              ? "bg-white text-black hover:bg-neutral-100" 
                              : "bg-black text-white hover:bg-neutral-900 shadow-md"
                          }`}
                        >
                          <span>Смотреть код на GitHub</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/git:translate-x-1" />
                        </a>
                      )}
                    </div>

                  </div>
                </div>

                {/* Footer details & CTA */}
                <div className={`relative z-10 pt-6 border-t ${isDarkCard ? "border-white/10" : "border-black/5"} flex flex-wrap items-center justify-between gap-6 mt-auto`}>
                  <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
                    <ShieldCheck className={`w-3.5 h-3.5 ${isDarkCard ? "text-white" : "text-black"}`} />
                    <span>Проект запущен • Архитектура находится под NDA по стандартам OWASP</span>
                  </div>
                  
                  <button
                    onClick={() => onStartProject(service.title)}
                    className={`relative inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md group/btn focus:outline-none cursor-pointer ${
                      isDarkCard 
                        ? "text-black bg-white hover:bg-neutral-100" 
                        : "text-white bg-black hover:bg-neutral-900"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Обсудить проект
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </span>
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

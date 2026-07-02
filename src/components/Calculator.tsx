/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calculator as CalcIcon, HelpCircle, ArrowRight, Check, Sparkles } from "lucide-react";

interface CalculatorProps {
  onCalculateComplete: (summaryText: string) => void;
}

export default function Calculator({ onCalculateComplete }: CalculatorProps) {
  // Option structures
  const services = [
    { id: "promo", label: "Иммерсивный промо-сайт", basePrice: 2500, baseWeeks: 3 },
    { id: "shop", label: "Премиум E-Commerce бутик", basePrice: 4500, baseWeeks: 5 },
    { id: "saas", label: "Индивидуальный веб-сервис/SaaS", basePrice: 6000, baseWeeks: 7 },
    { id: "brand", label: "Брендинг & Дизайн система", basePrice: 1500, baseWeeks: 2 },
  ];

  const complexities = [
    { id: "min", label: "Clean Minimalist (Чистая верстка, аккуратный ховер)", multiplier: 1.0, addWeeks: 0 },
    { id: "fluid", label: "Fluid Interactive (Пружинные анимации, микро-интерактивы)", multiplier: 1.25, addWeeks: 1 },
    { id: "cinematic", label: "Immersive 3D/Cinematic (Шейдеры, SVG-физика, кастомные переходы)", multiplier: 1.5, addWeeks: 3 },
  ];

  const scales = [
    { id: "single", label: "1 страница (Лендинг)", addPrice: 0, addWeeks: 0 },
    { id: "small", label: "2 - 5 страниц", addPrice: 800, addWeeks: 1 },
    { id: "medium", label: "6 - 10 страниц", addPrice: 1800, addWeeks: 2 },
    { id: "large", label: "Многостраничный портал / SaaS", addPrice: 3500, addWeeks: 4 },
  ];

  const addonsList = [
    { id: "multilang", label: "Мультиязычность (i18n)", price: 400 },
    { id: "cms", label: "Кастомная CMS / Админ-панель", price: 1200 },
    { id: "stripe", label: "Интеграция шлюзов оплат", price: 600 },
    { id: "seo", label: "Полное SEO-продвижение & Аналитика", price: 400 },
  ];

  // Selection states
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedComplexity, setSelectedComplexity] = useState(complexities[1]);
  const [selectedScale, setSelectedScale] = useState(scales[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Derived states
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [estimatedWeeks, setEstimatedWeeks] = useState(0);

  useEffect(() => {
    // Math logic: (basePrice + scalePrice + addonsPrice) * complexityMultiplier
    const addonsPrice = addonsList
      .filter((addon) => selectedAddons.includes(addon.id))
      .reduce((acc, addon) => acc + addon.price, 0);

    const price = Math.round(
      (selectedService.basePrice + selectedScale.addPrice + addonsPrice) *
        selectedComplexity.multiplier
    );

    const weeks =
      selectedService.baseWeeks +
      selectedScale.addWeeks +
      selectedComplexity.addWeeks;

    setEstimatedPrice(price);
    setEstimatedWeeks(weeks);
  }, [selectedService, selectedComplexity, selectedScale, selectedAddons]);

  const handleAddonToggle = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleSendRequest = () => {
    const addonsText = addonsList
      .filter((addon) => selectedAddons.includes(addon.id))
      .map((addon) => addon.label)
      .join(", ");

    const summary = `Услуга: ${selectedService.label}, Сложность: ${selectedComplexity.label}, Объём: ${selectedScale.label}, Дополнения: ${addonsText || "Нет"}, Оценка бюджета: $${estimatedPrice}, Оценка сроков: ${estimatedWeeks} нед.`;
    
    onCalculateComplete(summary);
  };

  return (
    <section id="calculator" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#ffffff] z-10 overflow-hidden border-t border-black/5">
      {/* Decorative clean radial background */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-neutral-100 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/[0.02] border border-black/10 backdrop-blur-md mb-4 shadow-sm"
          >
            <CalcIcon className="w-3.5 h-3.5 text-black" />
            <span className="text-[11px] font-mono tracking-widest text-black/70 uppercase">
              СМАРТ ОЦЕНКА • КАЛЬКУЛЯТОР ПРОЕКТА
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-black tracking-tight leading-tight">
            Спланируйте бюджет <br />
            <span className="font-serif italic font-normal text-neutral-600">
              своего будущего артефакта
            </span>
          </h2>
          <p className="text-neutral-500 mt-4 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Выберите ключевые опции ниже. Калькулятор настроен на основе наших премиум-стандартов, чтобы вы сразу сориентировались в бюджете и сроках.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls / Options (Left Col) */}
          <div className="lg:col-span-7 space-y-8 bg-[#ffffff] border border-black/10 rounded-3xl p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.01)]">
            
            {/* Service Type */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                1. ТИП ЦИФРОВОГО РЕШЕНИЯ
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedService(item)}
                    className={`p-4 rounded-2xl text-left border text-sm font-medium transition-all focus:outline-none cursor-pointer flex justify-between items-center ${
                      selectedService.id === item.id
                        ? "bg-black border-black text-white shadow-md"
                        : "bg-white border-black/10 text-neutral-600 hover:border-black/20 hover:text-black"
                    }`}
                  >
                    <span>{item.label}</span>
                    {selectedService.id === item.id && (
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 ml-2">
                        <Check className="w-3 h-3 text-black font-bold" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Design & Animations Complexity */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-1.5">
                2. ПЛАВНОСТЬ И СЛОЖНОСТЬ ИНТЕРАКТИВА
                <HelpCircle className="w-3.5 h-3.5 text-neutral-400 hover:text-neutral-600 cursor-help" />
              </label>
              <div className="space-y-3">
                {complexities.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedComplexity(item)}
                    className={`w-full p-4 rounded-2xl text-left border text-sm font-medium transition-all focus:outline-none cursor-pointer flex justify-between items-center ${
                      selectedComplexity.id === item.id
                        ? "bg-black border-black text-white shadow-md"
                        : "bg-white border-black/10 text-neutral-600 hover:border-black/20 hover:text-black"
                    }`}
                  >
                    <div>
                      <span className={`block font-medium ${selectedComplexity.id === item.id ? 'text-white' : 'text-neutral-900'}`}>{item.label.split(" (")[0]}</span>
                      <span className={`text-xs font-light block mt-0.5 ${selectedComplexity.id === item.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {item.label.includes(" (") ? `(${item.label.split(" (")[1]}` : ""}
                      </span>
                    </div>
                    {selectedComplexity.id === item.id && (
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 ml-3">
                        <Check className="w-3 h-3 text-black font-bold" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Scale / Page count */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                3. МАСШТАБ СТРУКТУРЫ (ОБЪЁМ СТРАНИЦ)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scales.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedScale(item)}
                    className={`p-4 rounded-2xl text-left border text-sm font-medium transition-all focus:outline-none cursor-pointer flex justify-between items-center ${
                      selectedScale.id === item.id
                        ? "bg-black border-black text-white shadow-md"
                        : "bg-white border-black/10 text-neutral-600 hover:border-black/20 hover:text-black"
                    }`}
                  >
                    <span>{item.label}</span>
                    {selectedScale.id === item.id && (
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 ml-2">
                        <Check className="w-3 h-3 text-black font-bold" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Packages */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                4. ДОПОЛНИТЕЛЬНЫЕ ИНТЕГРАЦИИ (ДОПЫ)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addonsList.map((item) => {
                  const isChecked = selectedAddons.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleAddonToggle(item.id)}
                      className={`p-4 rounded-2xl text-left border text-sm font-medium transition-all focus:outline-none cursor-pointer flex justify-between items-center ${
                        isChecked
                          ? "bg-neutral-100 border-black text-black"
                          : "bg-white border-black/10 text-neutral-600 hover:border-black/20 hover:text-black"
                      }`}
                    >
                      <span>{item.label}</span>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ml-2 transition-all ${
                        isChecked ? "bg-black border-black" : "border-black/20 bg-transparent"
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 text-white font-bold" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Estimates Showcase Dashboard (Right Col) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-black border border-black rounded-3xl p-8 relative overflow-hidden shadow-xl text-white">
              {/* Tactile background texture inside calculator results box */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05] mix-blend-overlay z-0">
                <filter id="felt-noise-calc">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.8 0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#felt-noise-calc)" />
              </svg>

              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none" />
              
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-4 relative z-10">
                // ВАША СПЕЦИФИКАЦИЯ
              </span>

              {/* Estimated Budget display */}
              <div className="mb-8 relative z-10">
                <span className="text-xs text-neutral-400 font-light block mb-1">Ориентировочный бюджет</span>
                <div className="flex items-baseline gap-2">
                  <motion.span 
                    key={estimatedPrice}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-4xl md:text-5xl font-display font-black text-white leading-none tracking-tight"
                  >
                    ${estimatedPrice.toLocaleString()}
                  </motion.span>
                  <span className="text-xs text-neutral-400 font-mono">USD *</span>
                </div>
              </div>

              {/* Estimated Timeline display */}
              <div className="mb-10 pb-8 border-b border-white/10 relative z-10">
                <span className="text-xs text-neutral-400 font-light block mb-1.5">Приблизительные сроки</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl md:text-2xl font-display font-bold text-white">
                    ~ {estimatedWeeks} недель
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">({estimatedWeeks * 5} рабочих дней)</span>
                </div>
              </div>

              {/* Dynamic brief summaries */}
              <div className="space-y-3 mb-10 relative z-10">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Сложность дизайна:</span>
                  <span className="text-white font-medium">{selectedComplexity.label.split(" (")[0]}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Объём страниц:</span>
                  <span className="text-white font-medium">{selectedScale.label}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Доп. модули:</span>
                  <span className="text-white font-medium">
                    {selectedAddons.length > 0 ? `Выбрано: ${selectedAddons.length}` : "Нет"}
                  </span>
                </div>
              </div>

              {/* Request Button */}
              <button
                onClick={handleSendRequest}
                className="w-full py-4 rounded-xl font-bold tracking-wide bg-white hover:bg-neutral-100 text-black shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 group focus:outline-none relative z-10"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Зафиксировать спецификацию</span>
                <ArrowRight className="w-4 h-4 text-black transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-[10px] text-neutral-500 font-mono text-center mt-4 relative z-10">
                * Смета ориентировочная. Окончательная стоимость формируется после составления подробного ТЗ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

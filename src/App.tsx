/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import BackgroundElements from "./components/BackgroundElements";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Calculator from "./components/Calculator";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function App() {
  // Modal tracking states
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactInitialMessage, setContactInitialMessage] = useState("");

  // Trigger modal with custom preset text (e.g. from cost planner or specific service card)
  const handleStartProject = (presetText?: string) => {
    setContactInitialMessage(presetText || "");
    setIsContactOpen(true);
  };

  const handleCalculatorComplete = (summaryText: string) => {
    setContactInitialMessage(summaryText);
    setIsContactOpen(true);
  };

  // Smooth scroll helper
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Offset for fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div id="studio-app" className="min-h-screen bg-[#ffffff] text-[#000000] selection:bg-black selection:text-white font-sans relative antialiased overflow-x-hidden">
      {/* 1. Interactive 3D/Parallax backgrounds & Radial Neon glow layers */}
      <BackgroundElements />

      {/* 2. Floating Navbar */}
      <Navbar 
        onStartProject={() => handleStartProject("Здравствуйте, Farrux! Хочу обсудить запуск нового проекта.")} 
        onScrollToSection={handleScrollToSection} 
      />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* 3. Hero Section */}
        <Hero 
          onStartProject={() => handleStartProject("Здравствуйте, Farrux! Хочу обсудить разработку премиального веб-сайта.")} 
          onScrollToSection={handleScrollToSection} 
        />

        {/* 4. Services Grid Section */}
        <Services onStartProject={(serviceTitle) => handleStartProject(`Интересует услуга: "${serviceTitle}". Хотелось бы обсудить цели и ТЗ.`)} />

        {/* 5. Portfolio Showcase Section */}
        <Portfolio onStartProject={(projectName) => handleStartProject(`Заинтересовал проект: "${projectName}". Хочу узнать подробнее об интеграции аналогичных систем.`)} />

        {/* 6. Cost Estimator / Planner Section */}
        <Calculator onCalculateComplete={handleCalculatorComplete} />
      </main>

      {/* 7. Footer CTA Block */}
      <Footer onStartProject={() => handleStartProject("Здравствуйте! Готов обсудить спецификацию проекта.")} />

      {/* 8. Overlay Contact Drawer / Modal Form */}
      <ContactForm 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        initialMessage={contactInitialMessage} 
      />
    </div>
  );
}

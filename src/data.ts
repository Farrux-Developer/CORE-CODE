/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, PortfolioProject, Testimonial } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "ai-project",
    title: "AI-PROJECT CRUD PLATFORM",
    subtitle: "Бесшовная архитектура управления пользователями на Vue/JS",
    description: "Высокотехнологичное веб-приложение. Реализует полный цикл операций с данными: мгновенное создание, динамическое изменение параметров и безопасное удаление пользователей в реальном времени без перезагрузки страниц. Оптимизированные асинхронные запросы, идеальная синхронизация состояний интерфейса и чистый контроль потока данных.",
    features: [
      "Мгновенный отклик без перезагрузок",
      "Управление глобальным стейтом Vue/JS",
      "Безопасная фильтрация и валидация ввода",
      "Оптимизированные асинхронные запросы"
    ],
    priceEstimate: "SPA Решение",
    timeEstimate: "Реактивно",
    iconName: "Layers",
    colorClass: "bg-[#fcfbf9]", // triggers paper texture
    whatWeDo: "Разработка реактивных CRUD-компонентов, обработка и валидация пользовательских действий на стороне клиента.",
    forWhom: "Панели администраторов, SaaS-сервисы, CRM-системы и личные кабинеты.",
    problemSolved: "Исключение задержек и перезагрузок страниц при активной манипуляции данными.",
    keyMetric: "100%",
    keyMetricLabel: "Реактивность и контроль данных",
    githubUrl: "https://github.com/Farrux-Developer/AI-project",
    imageUrl: "/src/assets/images/aetherdata_dashboard_1782988542879.jpg"
  },
  {
    id: "about-me",
    title: "INTERACTIVE 3D ABOUT CARDS",
    subtitle: "Кинетическая типографика и вращающаяся премиум-презентация",
    description: "Кастомный интерактивный блок, выводящий презентацию навыков на уровень цифрового искусства. Карточки обладают тактильным эффектом вращения в трехмерном пространстве при взаимодействии с курсором мыши. Безупречная физика движений и плавная плавающая анимация создают незабываемый визуальный шик и удерживают внимание.",
    features: [
      "Трехмерное вращение по осям X и Y",
      "Оптимизация рендеринга через CSS 3D Transforms",
      "Мягкое затухание пружинной анимации",
      "Высокий вовлекающий потенциал"
    ],
    priceEstimate: "Premium UI",
    timeEstimate: "3D Физика",
    iconName: "Sparkles",
    colorClass: "bg-[#111111]", // triggers fuzzy velvet texture dark style
    whatWeDo: "Математический расчет угла наклона относительно курсора, кинематика Framer Motion, рендеринг.",
    forWhom: "Продукты топ-уровня, промо-страницы, презентации новых брендов и элитный дизайн.",
    problemSolved: "Повышение времени удержания пользователя на сайте и создание яркого эмоционального отклика.",
    keyMetric: "3D",
    keyMetricLabel: "Пространственная физика карточек",
    githubUrl: "https://github.com/Farrux-Developer/About-me",
    imageUrl: "/src/assets/images/developer_profile_dragon_1782988561080.jpg"
  }
];

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: "ai-project",
    title: "AI-PROJECT CRUD PLATFORM",
    category: "Реактивная CRUD-платформа",
    description: "Высокотехнологичное веб-приложение. Реализует полный цикл операций с данными: мгновенное создание, динамическое изменение параметров и безопасное удаление пользователей в реальном времени без перезагрузки страниц. Оптимизированные асинхронные запросы, идеальная синхронизация состояний интерфейса и чистый контроль потока данных.",
    tech: ["Vue.js", "JavaScript", "Tailwind CSS", "REST API"],
    year: "2026",
    metric: "100%",
    metricLabel: "Реактивность и контроль данных",
    accentColor: "#000000",
    mockupType: "lines",
    githubUrl: "https://github.com/Farrux-Developer/AI-project",
    imageUrl: "/src/assets/images/aetherdata_dashboard_1782988542879.jpg"
  },
  {
    id: "about-me",
    title: "INTERACTIVE 3D ABOUT CARDS",
    category: "Интерактивный 3D Модуль",
    description: "Кастомный интерактивный блок, выводящий презентацию навыков на уровень цифрового искусства. Карточки обладают тактильным эффектом вращения в трехмерном пространстве при взаимодействии с курсором мыши. Безупречная физика движений и плавная плавающая анимация создают незабываемый визуальный шик и удерживают внимание.",
    tech: ["React", "TypeScript", "Framer Motion", "3D Transforms"],
    year: "2026",
    metric: "3D",
    metricLabel: "Пространственная физика карточек",
    accentColor: "#000000",
    mockupType: "mesh",
    githubUrl: "https://github.com/Farrux-Developer/About-me",
    imageUrl: "/src/assets/images/developer_profile_dragon_1782988561080.jpg"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Александр Власов",
    role: "Основатель",
    company: "Lumina Energy",
    avatarText: "АВ",
    text: "Farrux перевернул наше представление о веб-разработке. Наш новый сервис стал не просто визиткой, а главным инструментом автоматизации продаж, привлекающим клиентов премиального сегмента."
  },
  {
    id: "test-2",
    name: "Екатерина Громова",
    role: "Директор по маркетингу",
    company: "Apex Logistics",
    avatarText: "ЕГ",
    text: "Плавность анимаций на сайте поражает. Каждый переход и наведение курсора доставляют эстетическое удовольствие. Скорость работы бэкенда и безопасность — на высшем уровне!"
  }
];

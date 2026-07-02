/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, X, Check, Copy, Send, ArrowRight } from "lucide-react";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage: string;
}

export default function ContactForm({ isOpen, onClose, initialMessage }: ContactFormProps) {
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  // Status states
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [smtpWarning, setSmtpWarning] = useState("");
  const [copiedText, setCopiedText] = useState("");
  const [emailSentTo, setEmailSentTo] = useState("");
  const [emailSentFrom, setEmailSentFrom] = useState("");

  // Sync initial message from calculator or service card
  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    } else {
      setMessage("");
    }
  }, [initialMessage, isOpen]);

  const handleCopy = (text: string, type: "phone" | "email") => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSmtpWarning("");

    // Client-side validation
    if (!name.trim()) {
      setSubmitError("Имя обязательно для заполнения");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setSubmitError("Пожалуйста, введите корректный Email");
      return;
    }
    if (!phone.trim() || phone.trim().length < 5) {
      setSubmitError("Пожалуйста, введите корректный номер телефона");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_name: name,
          email: email,
          phone: phone,
          service_type: message || "General Inquiry",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Произошла ошибка при отправке запроса");
      }

      if (data.smtp_error) {
        setSmtpWarning(data.smtp_error);
      } else {
        setSmtpWarning("");
      }

      if (data.email_sent_to) {
        setEmailSentTo(data.email_sent_to);
      }
      if (data.email_sent_from) {
        setEmailSentFrom(data.email_sent_from);
      }

      setIsSuccess(true);
      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      setSubmitError(err.message || "Не удалось отправить заявку. Попробуйте снова или свяжитесь напрямую.");
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubmitError("");
    setSmtpWarning("");
    setEmailSentTo("");
    setEmailSentFrom("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-zoom-out"
          />

          {/* Dialog Panel */}
          <motion.div
            initial={{ y: 50, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 50, scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="relative w-full max-w-4xl bg-white border border-black/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 my-8"
          >
            {/* Left Column: Direct Contacts info (Swiss-Style Deep Black Panel) */}
            <div className="flex-1 bg-black text-white p-8 md:p-12 flex flex-col justify-between relative">
              {/* Tactile Fuzzy Velvet 3D Texture background filter */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06] mix-blend-overlay z-0">
                <filter id="felt-noise-modal">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.8 0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#felt-noise-modal)" />
              </svg>

              <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-white/5 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-4">
                  // ПРЯМАЯ СВЯЗЬ
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight mb-4">
                  Давайте создадим <br />
                  нечто выдающееся
                </h3>
                <p className="text-neutral-400 text-sm font-light leading-relaxed mb-8 max-w-sm">
                  Свяжитесь со мной напрямую. Я лично разберу вашу задачу, предложу техническую архитектуру и сориентирую по этапам. Без посредников и шаблонных решений.
                </p>

                {/* Main Action Links */}
                <div className="space-y-6">
                  {/* Phone Block */}
                  <div className="flex items-center justify-between group">
                    <a
                      href="tel:+998333030340"
                      className="flex items-center space-x-4 cursor-pointer text-left focus:outline-none"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono text-neutral-400 uppercase">Позвонить</span>
                        <span className="text-sm font-medium text-white group-hover:text-neutral-300 transition-colors">
                          +998333030340
                        </span>
                      </div>
                    </a>
                    <button
                      onClick={() => handleCopy("+998333030340", "phone")}
                      className="p-2 text-neutral-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
                      title="Копировать телефон"
                    >
                      {copiedText === "phone" ? (
                        <Check className="w-3.5 h-3.5 text-neutral-200" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Email Block */}
                  <div className="flex items-center justify-between group">
                    <a
                      href="mailto:farruxwebsitedeveloper@gmail.com"
                      className="flex items-center space-x-4 cursor-pointer text-left focus:outline-none"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono text-neutral-400 uppercase">Написать почту</span>
                        <span className="text-sm font-medium text-white group-hover:text-neutral-300 transition-colors break-all">
                          farruxwebsitedeveloper@gmail.com
                        </span>
                      </div>
                    </a>
                    <button
                      onClick={() => handleCopy("farruxwebsitedeveloper@gmail.com", "email")}
                      className="p-2 text-neutral-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
                      title="Копировать email"
                    >
                      {copiedText === "email" ? (
                        <Check className="w-3.5 h-3.5 text-neutral-200" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Location/Time info */}
              <div className="pt-8 border-t border-white/10 mt-8 md:mt-0 flex items-center justify-between text-[10px] text-neutral-400 font-mono relative z-10">
                <span>FARUX WEBSECTOR</span>
                <span>GMT+5</span>
              </div>
            </div>

            {/* Right Column: Interaction Form or Success Screen */}
            <div className="flex-[1.2] p-8 md:p-12 relative flex flex-col justify-center bg-white text-black">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-lg bg-black/[0.02] hover:bg-black/[0.06] border border-black/10 text-neutral-400 hover:text-black transition-all focus:outline-none cursor-pointer z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form-screen"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-3">
                      // ДЕТАЛИ ПРОЕКТА
                    </span>
                    <h4 className="text-xl md:text-2xl font-display font-bold text-black mb-6">
                      Запустить проект
                    </h4>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                          Имя *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Александр"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:border-black text-black placeholder-neutral-400 focus:outline-none transition-all text-sm"
                        />
                      </div>

                      {/* Email input */}
                      <div>
                        <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                          Ваш Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="client@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:border-black text-black placeholder-neutral-400 focus:outline-none transition-all text-sm"
                        />
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                          Телефон *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+998"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:border-black text-black placeholder-neutral-400 focus:outline-none transition-all text-sm"
                        />
                      </div>

                      {/* Project specification / message */}
                      <div>
                        <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                          Спецификация / Задачи проекта
                        </label>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Расскажите в свободной форме или приложите расчет из калькулятора..."
                          className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:border-black text-black placeholder-neutral-400 focus:outline-none transition-all text-sm resize-none"
                        />
                      </div>

                      {/* Submit btn */}
                      <button
                        type="submit"
                        disabled={isSending}
                        className="w-full py-3.5 rounded-xl font-bold bg-black text-white hover:bg-neutral-950 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none disabled:opacity-50 mt-2 shadow-md"
                      >
                        {isSending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Отправка...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-white" />
                            <span>Оформить заявку</span>
                          </>
                        )}
                      </button>

                      {submitError && (
                        <div className="mt-4 p-4 rounded-xl border border-red-200 bg-red-50 text-xs md:text-sm text-red-600 font-mono font-bold text-left break-words leading-relaxed shadow-sm">
                          <div className="flex items-center gap-2 mb-1.5 text-red-700">
                            <span className="text-sm font-black">🛑 Ошибка отправки:</span>
                          </div>
                          <p>{submitError}</p>
                        </div>
                      )}
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6"
                  >
                    <div className="w-14 h-14 rounded-full bg-neutral-100 border border-black/5 flex items-center justify-center mx-auto mb-6 text-black shadow-inner">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-2xl font-display font-bold text-black tracking-tight mb-4">
                      Заявка зафиксирована!
                    </h4>
                    
                    <div className="p-5 rounded-2xl bg-neutral-50 border border-black/5 text-xs md:text-sm text-neutral-700 leading-relaxed text-left max-w-lg mx-auto shadow-inner space-y-4">
                      <p>
                        Ваша заявка зафиксирована в базе данных! Мы свяжемся с вами для начала сотрудничества. Вы также можете связаться напрямую: <a href="tel:+998333030340" className="underline hover:text-neutral-600 transition-colors font-semibold">+998333030340</a>.
                      </p>

                      {!smtpWarning && emailSentTo && (
                        <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/60 text-xs text-emerald-950 space-y-1.5 shadow-sm text-left">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                            <span className="text-base">🚀</span>
                            <span>Email-уведомление отправлено!</span>
                          </div>
                          <p className="text-[13px]">
                            Уведомление успешно доставлено на адрес: <strong className="font-semibold text-emerald-900">{emailSentTo}</strong> через аккаунт отправки <strong className="font-semibold text-emerald-900">{emailSentFrom}</strong>.
                          </p>
                          <p className="text-[11px] text-emerald-800 italic mt-1">
                            💡 <strong>Важно:</strong> Если вы всё еще не видите письмо во входящих, обязательно проверьте папку <strong>«Спам» (Spam)</strong>, <strong>«Промоакции» (Promotions)</strong> или вкладку <strong>«Соцсети»</strong> — почтовые службы часто сортируют письма от SMTP релеев в эти категории.
                          </p>
                        </div>
                      )}

                      {smtpWarning && (
                        <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/70 text-xs text-amber-900 leading-relaxed space-y-3 shadow-sm text-left">
                          <div className="flex items-center gap-1.5 font-bold text-amber-950 text-sm">
                            <span className="text-base">⚠️</span>
                            <span>Диагностика SMTP почты:</span>
                          </div>
                          
                          <div className="p-2.5 bg-white/80 rounded-lg border border-amber-100 font-mono text-[11px] text-amber-800 break-words">
                            <strong>Ошибка:</strong> {smtpWarning}
                          </div>

                          <div className="space-y-2">
                            <p className="font-semibold text-amber-950 text-[13px]">
                              Как это исправить, чтобы заявки приходили вам на почту:
                            </p>
                            <ol className="list-decimal list-inside space-y-1.5 text-amber-800 text-xs pl-1">
                              <li>
                                Войдите в ваш личный кабинет <strong>Brevo</strong> (или другого SMTP-провайдера) и перейдите в раздел <span className="font-semibold">SMTP & API</span>.
                              </li>
                              <li>
                                Сгенерируйте новый <span className="font-semibold">SMTP Key</span> (не путайте его с API Key v3, вам нужен именно SMTP пароль/ключ).
                              </li>
                              <li>
                                В правом верхнем углу интерфейса <strong>Google AI Studio</strong> нажмите кнопку настройки (иконка шестерёнки / <span className="font-semibold">Settings</span>).
                              </li>
                              <li>
                                Задайте (или отредактируйте) следующие переменные окружения:
                                <div className="mt-2 pl-4 space-y-1 font-mono text-[11px] text-amber-900 border-l-2 border-amber-200 bg-amber-100/30 py-1.5 rounded-r-md">
                                  <div>• <span className="font-bold">SMTP_USER</span> = ваш логин/почта в Brevo</div>
                                  <div>• <span className="font-bold">SMTP_PASSWORD</span> = ваш скопированный SMTP-ключ</div>
                                  <div>• <span className="font-bold">SMTP_HOST</span> = <span className="text-neutral-500">smtp-relay.brevo.com</span></div>
                                  <div>• <span className="font-bold">SMTP_PORT</span> = <span className="text-neutral-500">587</span></div>
                                  <div>• <span className="font-bold">SMTP_TO</span> = ваш email для получения заявок</div>
                                </div>
                              </li>
                            </ol>
                            <p className="text-[11px] text-amber-700 italic mt-1 pl-1">
                              💡 После сохранения переменных окружения в AI Studio платформа автоматически перезапустит сервер и применит новые параметры.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleReset}
                      className="mt-8 px-6 py-2.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-900 transition-all focus:outline-none cursor-pointer shadow-md"
                    >
                      Вернуться на сайт
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";

const MAPS_URL =
  "https://www.google.com/maps?q=Mitla+145%2C+Col.+Narvarte+Oriente%2C+Benito+Ju%C3%A1rez%2C+CDMX";

export default function Contact() {
  const { dict, lang } = useI18n();
  const t = dict.contact;
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", message: "",
    otherService: "", songCount: "", sessionType: "",
  });
  const [services, setServices] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const serviceKeys = ["recording", "production", "mixing", "other"] as const;
  const sessionTypeKeys = ["singleDay", "halfDay", "liveSession", "other"] as const;

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const toggleService = (key: string) =>
    setServices(p => (p.includes(key) ? p.filter(s => s !== key) : [...p, key]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? t.form.errorFallback);
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.form.errorFallback);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2">

      {/* Left — full-bleed photo */}
      <div className="relative min-h-[50vh] md:min-h-svh">
        <Image
          src="/gallery/NOVENA-7867.jpg"
          alt="Estudio Novena — sala de grabación"
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Right — contáctanos + copy + form + dirección/mail */}
      <div className="flex flex-col justify-center px-5 md:px-12 lg:px-16 py-16 md:py-24">

        <p
          className="text-sm tracking-[0.3em] uppercase text-ash mb-4"
          style={{ fontFamily: "var(--font-highway)" }}
          data-animate
        >
          {t.eyebrow}
        </p>

        <h1
          className="text-cobalt uppercase leading-[0.92] tracking-tight mb-10 md:mb-14
                     text-[clamp(1.8rem,2.6vw,2.6rem)]"
          style={{ fontFamily: "var(--font-highway-exp)" }}
          data-animate
        >
          {t.heading}
        </h1>

        {sent ? (
          <div className="border border-sand/50 px-8 py-12 mb-12">
            <p
              className="text-cobalt text-2xl uppercase mb-2"
              style={{ fontFamily: "var(--font-highway-exp)" }}
            >
              {t.sent.title}
            </p>
            <p className="text-ash text-sm" style={{ fontFamily: "var(--font-serif)" }}>
              {t.sent.body}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(["firstName", "lastName"] as const).map((name) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label
                    htmlFor={name}
                    className="text-sm tracking-[0.2em] uppercase text-cobalt"
                    style={{ fontFamily: "var(--font-highway)" }}
                  >
                    {name === "firstName" ? t.form.firstName : t.form.lastName} *
                  </label>
                  <input
                    id={name}
                    name={name}
                    required
                    value={form[name]}
                    onChange={update}
                    className="w-full bg-transparent border-0 border-b border-sand/60 px-0 py-3 text-dusk text-base
                               outline-none focus:border-dusk transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm tracking-[0.2em] uppercase text-cobalt"
                style={{ fontFamily: "var(--font-highway)" }}
              >
                {t.form.email} *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={update}
                className="w-full bg-transparent border-0 border-b border-sand/60 px-0 py-3 text-dusk text-base
                           outline-none focus:border-dusk transition-colors"
                style={{ fontFamily: "var(--font-serif)" }}
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <p
                className="text-sm tracking-[0.2em] uppercase text-cobalt"
                style={{ fontFamily: "var(--font-highway)" }}
              >
                {t.form.lookingFor}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                {serviceKeys.map((key) => (
                  <label
                    key={key}
                    htmlFor={`service-${key}`}
                    className="inline-flex items-center gap-2 cursor-pointer select-none"
                  >
                    <input
                      id={`service-${key}`}
                      type="checkbox"
                      checked={services.includes(key)}
                      onChange={() => toggleService(key)}
                      className="sr-only peer"
                    />
                    <span
                      className="w-4 h-4 shrink-0 border border-sand/60 flex items-center justify-center
                                 transition-colors peer-checked:bg-cobalt peer-checked:border-cobalt"
                      aria-hidden="true"
                    >
                      <svg
                        width="10" height="8" viewBox="0 0 10 8" fill="none"
                        className={services.includes(key) ? "opacity-100" : "opacity-0"}
                      >
                        <path d="M1 4L3.5 6.5L9 1" stroke="var(--color-ivory)" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span
                      className="text-dusk text-sm"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {t.form.services[key]}
                    </span>
                  </label>
                ))}
              </div>
              {services.includes("other") && (
                <input
                  name="otherService"
                  value={form.otherService}
                  onChange={update}
                  placeholder={t.form.otherPlaceholder}
                  className="w-full bg-transparent border-0 border-b border-sand/60 px-0 py-2 text-dusk text-sm
                             outline-none focus:border-dusk transition-colors placeholder:text-ash/60"
                  style={{ fontFamily: "var(--font-serif)" }}
                />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="songCount"
                  className="text-sm tracking-[0.2em] uppercase text-cobalt"
                  style={{ fontFamily: "var(--font-highway)" }}
                >
                  {t.form.songCount}
                </label>
                <input
                  id="songCount"
                  name="songCount"
                  value={form.songCount}
                  onChange={update}
                  className="w-full bg-transparent border-0 border-b border-sand/60 px-0 py-3 text-dusk text-base
                             outline-none focus:border-dusk transition-colors"
                  style={{ fontFamily: "var(--font-serif)" }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="sessionType"
                  className="text-sm tracking-[0.2em] uppercase text-cobalt"
                  style={{ fontFamily: "var(--font-highway)" }}
                >
                  {t.form.sessionType}
                </label>
                <select
                  id="sessionType"
                  name="sessionType"
                  value={form.sessionType}
                  onChange={update}
                  className="w-full bg-transparent border-0 border-b border-sand/60 px-0 py-3 text-dusk text-base
                             outline-none focus:border-dusk transition-colors appearance-none"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  <option value="" disabled>{t.form.selectPlaceholder}</option>
                  {sessionTypeKeys.map((key) => (
                    <option key={key} value={key}>{t.form.sessionTypeOptions[key]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm tracking-[0.2em] uppercase text-cobalt"
                style={{ fontFamily: "var(--font-highway)" }}
              >
                {t.form.message} *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={2}
                value={form.message}
                onChange={e => {
                  update(e);
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className="w-full bg-transparent border-0 border-b border-sand/60 px-0 py-3 text-dusk text-base
                           outline-none focus:border-dusk transition-colors resize-none overflow-hidden"
                style={{ fontFamily: "var(--font-serif)" }}
              />
            </div>

            {error && (
              <p
                className="text-flame text-sm"
                style={{ fontFamily: "var(--font-serif)" }}
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="self-start rounded-full border border-cobalt text-cobalt px-10 py-4 text-sm tracking-[0.2em] uppercase
                         hover:bg-cobalt hover:text-ivory transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-cobalt"
              style={{ fontFamily: "var(--font-highway)" }}
            >
              {sending ? t.form.sending : t.form.send}
            </button>
          </form>
        )}

        {/* Ubicaciones + mail */}
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <p
              className="text-sm tracking-[0.3em] uppercase text-ash mb-4"
              style={{ fontFamily: "var(--font-highway)" }}
            >
              {t.locationLabel}
            </p>
            <div className="mb-4">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dusk text-sm hover:text-flame transition-colors"
                style={{ fontFamily: "var(--font-highway-exp)" }}
              >
                {lang === "es" ? "Col. Narvarte, Ciudad de México" : "Col. Narvarte, Mexico City"}
              </a>
            </div>
            <div>
              <p
                className="text-dusk text-sm"
                style={{ fontFamily: "var(--font-highway-exp)" }}
              >
                {dict.scl.location}
              </p>
            </div>
          </div>
          <div>
            <p
              className="text-sm tracking-[0.3em] uppercase text-ash mb-2"
              style={{ fontFamily: "var(--font-highway)" }}
            >
              {t.emailLabel}
            </p>
            <a
              href="mailto:info@estudionovena.com"
              className="text-dusk text-sm hover:text-flame transition-colors"
              style={{ fontFamily: "var(--font-highway-exp)" }}
            >
              info@estudionovena.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";

const MAPS_URL =
  "https://www.google.com/maps?q=Mitla+145%2C+Col.+Narvarte+Oriente%2C+Benito+Ju%C3%A1rez%2C+CDMX";

export default function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

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
          Contáctanos
        </p>

        <h1
          className="text-cobalt uppercase leading-[0.92] tracking-tight mb-10 md:mb-14
                     text-[clamp(1.8rem,2.6vw,2.6rem)]"
          style={{ fontFamily: "var(--font-highway-exp)" }}
          data-animate
        >
          El espacio está listo para tu proyecto.
        </h1>

        {sent ? (
          <div className="border border-sand/50 px-8 py-12 mb-12">
            <p
              className="text-cobalt text-2xl uppercase mb-2"
              style={{ fontFamily: "var(--font-highway-exp)" }}
            >
              Mensaje enviado.
            </p>
            <p className="text-ash text-sm" style={{ fontFamily: "var(--font-serif)" }}>
              Estaremos en contacto pronto.
            </p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4 mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(["firstName", "lastName"] as const).map((name) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label
                    htmlFor={name}
                    className="text-sm tracking-[0.2em] uppercase text-cobalt"
                    style={{ fontFamily: "var(--font-highway)" }}
                  >
                    {name === "firstName" ? "Nombre" : "Apellido"} *
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
                Email *
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

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm tracking-[0.2em] uppercase text-cobalt"
                style={{ fontFamily: "var(--font-highway)" }}
              >
                Mensaje *
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

            <button
              type="submit"
              className="self-start rounded-full border border-cobalt text-cobalt px-10 py-4 text-sm tracking-[0.2em] uppercase
                         hover:bg-cobalt hover:text-ivory transition-colors"
              style={{ fontFamily: "var(--font-highway)" }}
            >
              Enviar
            </button>
          </form>
        )}

        {/* Dirección + mail */}
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <p
              className="text-sm tracking-[0.3em] uppercase text-ash mb-2"
              style={{ fontFamily: "var(--font-highway)" }}
            >
              Ubicación
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dusk text-sm hover:text-flame transition-colors"
              style={{ fontFamily: "var(--font-highway-exp)" }}
            >
              Mitla 145, Col. Narvarte Oriente<br />Benito Juárez, CDMX
            </a>
          </div>
          <div>
            <p
              className="text-sm tracking-[0.3em] uppercase text-ash mb-2"
              style={{ fontFamily: "var(--font-highway)" }}
            >
              Email
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

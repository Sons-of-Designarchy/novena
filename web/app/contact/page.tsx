"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div>
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">

      {/* Header */}
      <div className="mb-14 md:mb-20" data-animate>
        <p
          className="text-sm tracking-[0.3em] uppercase text-dusk/30 mb-4"
          style={{ fontFamily: "var(--font-highway)" }}
        >
          Contáctanos
        </p>
        <h1
          className="text-[clamp(3rem,10vw,8rem)] uppercase leading-none tracking-tight text-cobalt"
          style={{ fontFamily: "var(--font-highway-exp)" }}
        >
          Contacto
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

        {/* Left */}
        <div>
          <p
            className="text-dusk/50 text-sm mb-1"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Reserva una sesión con nosotros en:
          </p>
          <a
            href="mailto:info@estudionovena.com"
            className="block text-dusk text-xl mb-12 hover:text-flame transition-colors"
            style={{ fontFamily: "var(--font-highway-exp)" }}
          >
            info@estudionovena.com
          </a>

          {/* Map */}
          <div className="overflow-hidden border border-sand/50">
            <iframe
              title="Estudio Novena — Mitla 145, Narvarte Poniente, CDMX"
              src="https://www.google.com/maps?q=Mitla%20145,%20Narvarte%20Poniente,%20CDMX&output=embed"
              width="100%"
              height="300"
              style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Right — form */}
        <div>
          <p
            className="text-dusk/40 text-sm mb-8 leading-relaxed"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Para cualquier consulta, escríbenos a través del formulario.
          </p>

          {sent ? (
            <div className="border border-sand/50 px-8 py-12">
              <p
                className="text-dusk text-2xl uppercase mb-2"
                style={{ fontFamily: "var(--font-highway-exp)" }}
              >
                Mensaje enviado.
              </p>
              <p className="text-dusk/40 text-sm" style={{ fontFamily: "var(--font-serif)" }}>
                Estaremos en contacto pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                {(["firstName", "lastName"] as const).map((name) => (
                  <div key={name} className="flex flex-col gap-1.5">
                    <label
                      className="text-sm tracking-[0.2em] uppercase text-dusk/30"
                      style={{ fontFamily: "var(--font-highway)" }}
                    >
                      {name === "firstName" ? "Nombre" : "Apellido"} *
                    </label>
                    <input
                      name={name}
                      required
                      value={form[name]}
                      onChange={update}
                      className="bg-transparent border border-sand/60 px-4 py-3 text-dusk text-sm
                                 outline-none focus:border-dusk transition-colors"
                      style={{ fontFamily: "var(--font-serif)" }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm tracking-[0.2em] uppercase text-dusk/30"
                  style={{ fontFamily: "var(--font-highway)" }}
                >
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update}
                  className="bg-transparent border border-sand/60 px-4 py-3 text-dusk text-sm
                             outline-none focus:border-dusk transition-colors"
                  style={{ fontFamily: "var(--font-serif)" }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm tracking-[0.2em] uppercase text-dusk/30"
                  style={{ fontFamily: "var(--font-highway)" }}
                >
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={update}
                  className="bg-transparent border border-sand/60 px-4 py-3 text-dusk text-sm
                             outline-none focus:border-dusk transition-colors resize-none"
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
        </div>
      </div>
    </section>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, withLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/dictionary";
import { STUDIOS, SPACES, AROUND_THE_STUDIO } from "@/lib/studios";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: `${dict.studios.title} — Estudio Novena` };
}

export default async function Studios({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <div>
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-10 md:pb-16">
        <div data-animate>
          <p
            className="text-sm tracking-[0.3em] uppercase text-ash mb-4
                       opacity-0 animate-fade-up"
            style={{ fontFamily: "var(--font-highway)", animationFillMode: "forwards" }}
          >
            {dict.studios.eyebrow}
          </p>
          <h1
            className="text-[clamp(3rem,10vw,8rem)] uppercase leading-none tracking-tight text-cobalt
                       opacity-0 animate-fade-up delay-100"
            style={{ fontFamily: "var(--font-highway-exp)", animationFillMode: "forwards" }}
          >
            {dict.studios.title}
          </h1>
          <p
            className="mt-6 max-w-xl text-ash text-base md:text-lg leading-relaxed
                       opacity-0 animate-fade-up delay-200"
            style={{ fontFamily: "var(--font-serif)", animationFillMode: "forwards" }}
          >
            {dict.studios.intro}
          </p>
        </div>
      </section>

      {STUDIOS.map((studio, i) => {
        const room = dict.studios.rooms[studio.id];
        if (!room) return null;
        return (
          <section
            key={studio.id}
            data-section="studio"
            className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-20 border-t border-sand/50"
          >
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              {/* Text column */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start" data-animate>
                <p
                  className="text-sm tracking-[0.3em] uppercase text-sand mb-3"
                  style={{ fontFamily: "var(--font-highway)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2
                  className="uppercase leading-[0.92] tracking-tight text-cobalt
                             text-[clamp(2.2rem,5vw,3.6rem)]"
                  style={{ fontFamily: "var(--font-highway-exp)" }}
                >
                  {room.name}
                </h2>
                <p
                  className="mt-3 text-ash text-sm tracking-[0.15em] uppercase"
                  style={{ fontFamily: "var(--font-highway)" }}
                >
                  {room.tagline}
                </p>

                <dl className="mt-8 space-y-5">
                  <div>
                    <dt
                      className="text-xs tracking-[0.3em] uppercase text-cobalt mb-2"
                      style={{ fontFamily: "var(--font-highway)" }}
                    >
                      {dict.studios.purposeLabel}
                    </dt>
                    <dd
                      className="text-ash text-sm"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {room.purpose}
                    </dd>
                  </div>

                  {studio.gear.length > 0 && (
                    <div>
                      <dt
                        className="text-xs tracking-[0.3em] uppercase text-cobalt mb-2"
                        style={{ fontFamily: "var(--font-highway)" }}
                      >
                        {dict.studios.gearLabel}
                      </dt>
                      <dd>
                        <ul className="space-y-[6px]">
                          {studio.gear.map((item) => (
                            <li
                              key={item}
                              className="text-ash text-sm flex items-start gap-2"
                              style={{ fontFamily: "var(--font-serif)" }}
                            >
                              <span className="text-sand mt-[3px] shrink-0 text-xs">—</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
                </dl>

                <Link
                  href={withLocale("/contact", lang)}
                  className="group mt-8 inline-flex items-center gap-2
                             rounded-full border border-cobalt text-cobalt
                             px-7 py-3 text-sm tracking-[0.2em] uppercase
                             hover:bg-cobalt hover:text-ivory transition-colors"
                  style={{ fontFamily: "var(--font-highway)" }}
                >
                  {dict.studios.bookRoom}
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>

              {/* Photos */}
              <div className="lg:col-span-8 mt-10 lg:mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {studio.images.map((src, n) => (
                    <div
                      key={src}
                      className={`relative overflow-hidden bg-sand/20
                                  ${n === 0 ? "sm:col-span-2 aspect-[16/10]" : "aspect-[4/3]"}`}
                      data-animate
                      style={{ transitionDelay: `${n * 80}ms` }}
                    >
                      <Image
                        src={src}
                        alt={room.name}
                        fill
                        sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {SPACES.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-20 border-t border-sand/50">
          <h2
            className="text-sm tracking-[0.3em] uppercase text-cobalt mb-8 pb-3
                       border-b border-sand/70"
            style={{ fontFamily: "var(--font-highway)" }}
          >
            {dict.studios.spacesLabel}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {SPACES.map((space) => {
              const copy = dict.studios.spaces[space.id];
              if (!copy) return null;
              return (
                <div key={space.id} data-animate>
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand/20">
                    <Image
                      src={space.image}
                      alt={copy.name}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <h3
                    className="mt-5 uppercase leading-none tracking-tight text-cobalt
                               text-[clamp(1.6rem,3vw,2.2rem)]"
                    style={{ fontFamily: "var(--font-highway-exp)" }}
                  >
                    {copy.name}
                  </h3>
                  <p
                    className="mt-3 text-ash leading-relaxed"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {copy.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {AROUND_THE_STUDIO.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-20 border-t border-sand/50">
          <h2
            className="text-sm tracking-[0.3em] uppercase text-cobalt mb-8 pb-3
                       border-b border-sand/70"
            style={{ fontFamily: "var(--font-highway)" }}
          >
            {dict.studios.aroundLabel}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {AROUND_THE_STUDIO.map((src, n) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden bg-sand/20"
                data-animate
                style={{ transitionDelay: `${n * 60}ms` }}
              >
                <Image
                  src={src}
                  alt="Estudio Novena"
                  fill
                  sizes="(min-width: 768px) 30vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  type: "hero" | "image";
  title: string;
  text?: string;
  subtext?: string;
  cta1?: string;
  cta2?: string;
  ctaLabel1?: string;
  ctaLabel2?: string;
  image: string;
};

const slides: Slide[] = [
  {
    type: "hero",
    title: "TECHNOLOGY AT THE HEART OF THE MISSION",
    subtext:
      "Solutions that strengthen institutions and extend mission reach.",
    cta1: "/strategic-areas",
    cta2: "/work-with-us",
    ctaLabel1: "Explore Our Work",
    ctaLabel2: "Join the Mission",
    image: "/images/team.webp",
  },
  {
    type: "image",
    title: "MEDIA FOR MISSION & EVANGELISM",
    image: "/images/team.webp",
  },
  {
    type: "image",
    title: "RESEARCH, SYSTEMS & INNOVATION",
    image: "/images/team.webp",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const active = slides[index];

  return (
    <section className="relative w-full h-[85vh] overflow-hidden">

      {/* ================= BACKGROUND ================= */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out
            ${
              i === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
            }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/80" />
        </div>
      ))}

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">

        {active.type === "hero" ? (
          <div className="max-w-4xl text-white">

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {active.title}
            </h1>

            {active.text && (
              <p className="mt-5 text-sm sm:text-base md:text-lg text-white/90">
                {active.text}
              </p>
            )}

            {active.subtext && (
              <p className="mt-3 text-xs sm:text-sm md:text-base text-white/75">
                {active.subtext}
              </p>
            )}

            {/* CTA */}
            {(active.cta1 || active.cta2) && (
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

                {active.cta1 && (
                  <Link
                    href={active.cta1 as string}
                    className="px-6 py-3 bg-[#7f264a] text-white font-semibold rounded-md shadow-lg hover:scale-105 transition"
                  >
                    {active.ctaLabel1 ?? "Learn More"}
                  </Link>
                )}

                {active.cta2 && (
                  <Link
                    href={active.cta2 as string}
                    className="px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-[#7f264a] transition"
                  >
                    {active.ctaLabel2 ?? "Get Started"}
                  </Link>
                )}

              </div>
            )}

          </div>
        ) : (
          <div className="text-white max-w-3xl">
            <h2 className="text-xl sm:text-3xl md:text-5xl font-bold">
              {active.title}
            </h2>
          </div>
        )}
      </div>

      {/* ================= DOTS ================= */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "bg-[#7f264a] scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
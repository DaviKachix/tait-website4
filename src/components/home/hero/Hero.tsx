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
    image: "/images/bible-laptop.jpg",
  },
  {
    type: "image",
    title: "MEDIA FOR MISSION & EVANGELISM",
    image: "/images/bible-laptop.jpg",
  },
  {
    type: "image",
    title: "RESEARCH, SYSTEMS & INNOVATION",
    image: "/images/bible-laptop.jpg",
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
    <section className="relative w-full h-[90vh] overflow-hidden">

      {/* ================= BACKGROUND ================= */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover object-center"
          />

          {/* cleaner overlay */}
          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/60" />
        </div>
      ))}

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">

        <div
          key={index}
          className="animate-[fadeUp_0.9s_ease]"
        >

          {active.type === "hero" ? (
            <div className="max-w-4xl text-white">

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
                {active.title}
              </h1>

              {active.text && (
                <p className="mt-5 text-base md:text-lg text-white/90">
                  {active.text}
                </p>
              )}

              {active.subtext && (
                <p className="mt-4 text-sm md:text-base text-white/80">
                  {active.subtext}
                </p>
              )}

              {/* CTA */}
              {(active.cta1 || active.cta2) && (
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

                  {active.cta1 && (
                    <Link
                      href={active.cta1 as string}
                      className="px-7 py-3 bg-white text-black font-medium rounded-xl transition duration-300 hover:scale-105"
                    >
                      {active.ctaLabel1 ?? "Learn More"}
                    </Link>
                  )}

                  {active.cta2 && (
                    <Link
                      href={active.cta2 as string}
                      className="px-7 py-3 border border-white/40 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl transition duration-300 hover:bg-white hover:text-black"
                    >
                      {active.ctaLabel2 ?? "Get Started"}
                    </Link>
                  )}

                </div>
              )}

            </div>
          ) : (
            <div className="text-white max-w-3xl">

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
                {active.title}
              </h2>

            </div>
          )}

        </div>
      </div>

      {/* ================= DOTS ================= */}
      <div className="absolute bottom-8 w-full flex justify-center gap-3 z-20">

        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-300 ${
              i === index
                ? "w-10 h-2 rounded-full bg-white"
                : "w-2 h-2 rounded-full bg-white/50"
            }`}
          />
        ))}

      </div>

      {/* animation */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </section>
  );
}
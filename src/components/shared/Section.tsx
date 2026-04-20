"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Section({
  children,
  bg = "white",
  spacing = "md",
  fullWidth = false,
  withDivider = false,
  bordered = false,
  bgImage,
}: {
  children: React.ReactNode;
  bg?: "white" | "gray" | "grapevine";
  spacing?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  withDivider?: boolean;
  bordered?: boolean;
  bgImage?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // ================= SCROLL ANIMATION =================
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ================= STYLES =================
  const bgStyles = {
    white: "bg-white",
    gray: "bg-gray-50",
    grapevine:
      "bg-gradient-to-b from-[#7f264a]/5 via-white to-white",
  };

  const spacingStyles = {
    sm: "py-12 md:py-14",
    md: "py-16 md:py-20",
    lg: "py-24 md:py-28",
  };

  return (
    <section className={`relative w-full overflow-hidden ${bgStyles[bg]}`}>
      
      {/* ================= WATERMARK ================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <Image
          src="/images/TAIT5.svg"
          alt="TAIT watermark"
          width={700}
          height={700}
          className="opacity-[0.535] scale-125 object-contain animate-[float_14s_ease-in-out_infinite]"
        />
      </div>

      {/* ================= BACKGROUND IMAGE ================= */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="section background"
            fill
            className="object-cover object-center opacity-[0.15]"
          />
        </div>
      )}

      {/* ================= OVERLAY ================= */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/70 via-white/90 to-white" />

      {/* ================= GRAPEVINE GLOW ================= */}
      {bg === "grapevine" && (
        <>
          <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-[#7f264a]/10 blur-[160px] rounded-full" />
          <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-[#7f264a]/5 blur-[160px] rounded-full" />
        </>
      )}

      {/* ================= TOP BORDER ================= */}
      {bordered && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7f264a]/20 to-transparent" />
      )}

      {/* ================= CONTENT ================= */}
      <div
        ref={ref}
        className={`relative z-10 mx-auto px-6 sm:px-8 lg:px-10 ${
          fullWidth ? "max-w-full" : "max-w-6xl"
        }`}
      >
        <div
          className={`
            ${spacingStyles[spacing]} w-full
            transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          {/* ================= DIVIDER ================= */}
          {withDivider && (
            <div className="mb-6 w-16 h-[3px] bg-[#7f264a]/40 rounded-full" />
          )}

          {/* ================= CHILDREN ================= */}
          {children}
        </div>
      </div>
    </section>
  );
}
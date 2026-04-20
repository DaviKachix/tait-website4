"use client";

import Section from "@/components/shared/Section";
import { useEffect, useState } from "react";

const verses = [
  {
    text: "“Then Moses said to the Israelites, ‘See, the Lord has chosen Bezalel… and has filled him with the Spirit of God, with wisdom, understanding, knowledge and all kinds of skills.’”",
    ref: "Exodus 35:35",
  },
  {
    text: "“For we are God’s handiwork, created in Christ Jesus to do good works…”",
    ref: "Ephesians 2:10",
  },
  {
    text: "“If a man cleanses himself from the latter, he will be an instrument for noble purposes, made holy, useful to the Master…”",
    ref: "2 Timothy 2:21",
  },
];

export default function Testimony() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % verses.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section bg="grapevine" spacing="lg">

      <div className="relative overflow-hidden">

        {/* ================= FAINT BACKGROUND IMAGE ================= */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/working.webp"
            alt=""
            className="w-full h-full object-cover opacity-[0.26] scale-110"
          />
          <div className="absolute inset-0 bg-white/70" />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="relative max-w-3xl mx-auto text-center">

          {/* ICON */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[#7f264a]/10 flex items-center justify-center text-[#7f264a] text-xl">
              <i className="fa-solid fa-book-bible"></i>
            </div>
          </div>

          {/* ================= VERSE (ANIMATED) ================= */}
          <div className="min-h-[140px] flex items-center justify-center">

            <div
              key={index}
              className="transition-all duration-700 ease-in-out animate-fadeIn"
            >
              <p className="text-lg md:text-2xl font-medium italic text-gray-800 leading-relaxed">
                {verses[index].text}
              </p>

              <p className="mt-4 text-[#7f264a] font-semibold">
                {verses[index].ref}
              </p>
            </div>

          </div>

          {/* SUB TEXT */}
          <p className="mt-6 text-gray-600 leading-relaxed text-base md:text-lg">
            We are integrated for mission and committed to using technology as a tool for service,
            empowerment, and global outreach.
          </p>

          {/* DIVIDER */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-[2px] bg-[#7f264a]/30" />
          </div>

        </div>
      </div>

      {/* ================= ANIMATION ================= */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
      `}</style>

    </Section>
  );
}
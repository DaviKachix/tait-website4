"use client";

import { useState } from "react";

export default function WorkWithUsPage() {
  const [mode, setMode] = useState<
    null | "careers" | "internships" | "volunteering" | "partnership"
  >(null);

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">

      {/* ================= INTRO ================= */}
      <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">

        <div className="w-12 h-12 mx-auto rounded-xl bg-[#7f264a]/10 flex items-center justify-center text-[#7f264a]">
          <i className="fa-solid fa-people-group"></i>
        </div>

        <h1 className="text-xl font-semibold">Work With Us</h1>

        <p className="text-sm text-gray-500 leading-relaxed">
          We are building digital systems, media platforms, and mission tools for the Church.
          Join us through careers, internships, volunteering, or partnership.
        </p>

      </div>

      {/* ================= OPPORTUNITIES ================= */}
      <div className="max-w-2xl mx-auto space-y-3">

        {[
          {
            key: "careers",
            label: "Careers",
            icon: "fa-briefcase",
            desc: "Join our team in software, media, and digital systems development.",
          },
          {
            key: "internships",
            label: "Internships",
            icon: "fa-graduation-cap",
            desc: "Learn and grow through real-world mission technology projects.",
          },
          {
            key: "volunteering",
            label: "Volunteering",
            icon: "fa-hands-helping",
            desc: "Support mission work with your skills and time.",
          },
          {
            key: "partnership",
            label: "Partnership",
            icon: "fa-handshake",
            desc: "Collaborate with institutions, churches, and organizations.",
          },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setMode(item.key as any)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left
              transition
              ${mode === item.key
                ? "bg-[#7f264a] text-white border-[#7f264a]"
                : "bg-white hover:border-[#7f264a]/40"}
            `}
          >
            <i className={`fa-solid ${item.icon}`} />
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className={`text-xs ${mode === item.key ? "text-white/80" : "text-gray-500"}`}>
                {item.desc}
              </p>
            </div>
          </button>
        ))}

      </div>

      {/* ================= DETAILS SECTION ================= */}
      {mode && (
        <div className="max-w-2xl mx-auto mt-10 bg-white border rounded-2xl p-6 space-y-4">

          <div className="flex items-center gap-2 text-[#7f264a] font-semibold">
            <i className="fa-solid fa-circle-info"></i>
            {mode.toUpperCase()}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {mode === "careers" &&
              "We welcome professionals in software engineering, UI/UX, media production, and system architecture."}

            {mode === "internships" &&
              "Students can join real projects involving systems, dashboards, and digital ministry tools."}

            {mode === "volunteering" &&
              "Contribute your skills in design, development, media, or administration."}

            {mode === "partnership" &&
              "We collaborate with churches, institutions, and organizations for digital transformation."}
          </p>

          <div className="pt-3">
            <button className="w-full bg-[#7f264a] text-white py-3 rounded-xl flex items-center justify-center gap-2">
              <i className="fa-solid fa-paper-plane"></i>
              Apply / Express Interest
            </button>
          </div>

        </div>
      )}

      {/* ================= CONTACT FOOTER ================= */}
      <div className="max-w-2xl mx-auto text-center mt-12 text-sm text-gray-500 space-y-1">

        <p>
          <i className="fa-solid fa-envelope text-[#7f264a] mr-2"></i>
          info@tait.tz
        </p>

        <p>
          <i className="fa-brands fa-whatsapp text-green-600 mr-2"></i>
          +255 620 517 139
        </p>

        <p className="text-xs pt-2">
          TAIT — Integrated for Mission through Digital Systems & Media
        </p>

      </div>

    </main>
  );
}
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [mode, setMode] = useState<null | "assistance" | "project" | "message">(null);

  const email = "info@tait.tz";
  const whatsapp = "255620517139";

  const openWhatsApp = (text: string) => {
    window.open(
      `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const sendEmail = (subject: string, body: string) => {
    window.location.href =
      `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">

      {/* ================= SIMPLE TITLE ================= */}
      <div className="max-w-xl mx-auto text-center mb-10">
        <div className="w-12 h-12 mx-auto rounded-xl bg-[#7f264a]/10 flex items-center justify-center text-[#7f264a]">
          <i className="fa-solid fa-headset"></i>
        </div>

        <h1 className="text-xl font-semibold mt-3">Contact Us</h1>
        <p className="text-sm text-gray-500 mt-1">
          Tell us what you need and we’ll respond via email or WhatsApp.
        </p>
      </div>

      {/* ================= SELECT TYPE ================= */}
      <div className="max-w-xl mx-auto space-y-3">

        {[
          { key: "assistance", label: "I need help / support", icon: "fa-circle-question" },
          { key: "project", label: "I have a software project", icon: "fa-code" },
          { key: "message", label: "Just want to message you", icon: "fa-envelope" },
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
            <i className={`fa-solid ${item.icon} text-[#7f264a]`} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}

      </div>

      {/* ================= FORM ================= */}
      {mode && (
        <div className="max-w-xl mx-auto mt-8 bg-white border rounded-2xl p-6 space-y-4">

          <p className="text-sm text-gray-500">
            Fill in the details below. You can send directly via Email or WhatsApp.
          </p>

          <input
            className="w-full border rounded-xl px-4 py-3 text-sm"
            placeholder="Your name"
          />

          <input
            className="w-full border rounded-xl px-4 py-3 text-sm"
            placeholder="Email address"
          />

          <input
            className="w-full border rounded-xl px-4 py-3 text-sm"
            placeholder="Phone (optional)"
          />

          <textarea
            rows={5}
            className="w-full border rounded-xl px-4 py-3 text-sm"
            placeholder={
              mode === "project"
                ? "Describe your software project..."
                : mode === "assistance"
                ? "What do you need help with?"
                : "Write your message..."
            }
          />

          {/* ================= ACTIONS ================= */}
          <div className="flex flex-col gap-3 pt-2">

            <button
              onClick={() =>
                sendEmail(
                  `TAIT ${mode.toUpperCase()} REQUEST`,
                  "New contact form submission"
                )
              }
              className="flex items-center justify-center gap-2 bg-[#7f264a] text-white py-3 rounded-xl"
            >
              <i className="fa-solid fa-paper-plane"></i>
              Send via Email
            </button>

            <button
              onClick={() =>
                openWhatsApp(
                  `Hello TAIT, I need ${mode} support regarding your services.`
                )
              }
              className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl"
            >
              <i className="fa-brands fa-whatsapp"></i>
              Send via WhatsApp
            </button>

          </div>
        </div>
      )}

      {/* ================= CONTACT INFO ================= */}
      <div className="max-w-xl mx-auto text-center mt-10 text-sm text-gray-500 space-y-1">

        <p>
          <i className="fa-solid fa-envelope text-[#7f264a] mr-2"></i>
          info@tait.tz
        </p>

        <p>
          <i className="fa-brands fa-whatsapp text-green-600 mr-2"></i>
          +255 620 517 139
        </p>

      </div>

    </main>
  );
}
"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function ContactFloat() {
  const [open, setOpen] = useState(false);
  const settings = useQuery(api.settings.getPublic);
  const contact = settings?.contact as { whatsapp?: string; email?: string; defaultMessage?: string } | undefined;
  const whatsappNumber = contact?.whatsapp || "+255620517139";
  const email = contact?.email || "info@tait.tz";
  const message = contact?.defaultMessage || "Hello TAIT, I am contacting you through the TAIT website. I would like assistance with...";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <a
          href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-white shadow-xl transition hover:bg-green-700"
          aria-label="WhatsApp contact"
          title="WhatsApp TAIT"
        >
          <i className="fa-brands fa-whatsapp text-lg" />
        </a>
        <a
          href={`mailto:${email}?subject=${encodeURIComponent("TAIT Website Contact")}`}
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#7f264a] shadow-xl transition hover:bg-[#f5f0ef]"
          aria-label="Email contact"
          title="Email TAIT"
        >
          <i className="fa-solid fa-envelope text-lg" />
        </a>
        <a
          href="/contact"
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7f264a] text-white shadow-xl transition hover:bg-[#6d2240]"
          aria-label="Open contact page"
          title="Open contact page"
        >
          <i className="fa-solid fa-comments text-lg" />
        </a>
      </div>

      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#7f264a] text-white shadow-[0_24px_64px_rgba(127,38,74,0.24)] transition hover:bg-[#6d2240] focus:outline-none focus:ring-2 focus:ring-[#7f264a]/50"
        title="Toggle contact options"
      >
        <i className="fa-solid fa-comment-dots text-2xl" />
      </button>
    </div>
  );
}

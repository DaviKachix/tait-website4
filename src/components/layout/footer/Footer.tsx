"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function Footer() {
  const settings = useQuery(api.settings.getPublic);
  const contact = settings?.contact as { email?: string } | undefined;
  const organization = settings?.organization as { name?: string; description?: string; tagline?: string } | undefined;
  const social = settings?.social as { instagram?: string } | undefined;
  const email = contact?.email || "info@tait.tz";
  return (
    <footer className="relative bg-[#7f264a] text-white mt-16 overflow-hidden">

      {/* ================= WATERMARK ================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/images/TAIT8.svg"
          alt="TAIT watermark"
          width={800}
          height={800}
          className="opacity-[0.64] scale-95 object-contain animate-[float_18s_ease-in-out_infinite]"
        />
      </div>

      {/* ================= OVERLAY (IMPROVES READABILITY) ================= */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7f264a]/90 via-[#7f264a]/95 to-[#7f264a] pointer-events-none" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 text-sm font-medium">

        {/* ================= TOP GRID ================= */}
        <div className="grid md:grid-cols-4 gap-10">

          {/* ABOUT */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/TAIT8.svg"
                alt="TAIT Logo"
                width={80}
                height={80}
                className="object-contain bg-[#7f264a] rounded-full p-1"
              />
            </div>

            <h3 className="font-bold mb-3">About TAIT</h3>

            <p className="leading-relaxed text-white">
              {organization?.description || "Tanzania Adventist Institute of Technology is a digital mission and technology center committed to supporting the Church through systems, media, research, and innovation."}
            </p>

            <p className="mt-4 text-white">
              Email:{" "}
              <a
                href={`mailto:${email}`}
                className="font-bold underline hover:opacity-80"
              >
                {email}
              </a>
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="font-bold mb-3">Explore</h3>

            <ul className="space-y-2">
              <li><a href="/about" className="hover:underline">About TAIT</a></li>
              <li><a href="/services" className="hover:underline">Services</a></li>
              <li><a href="/support" className="hover:underline">Support</a></li>
              <li><a href="/work-with-us" className="hover:underline">Join Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* FOCUS AREAS */}
          <div>
            <h3 className="font-bold mb-3">Focus Areas</h3>

            <ul className="space-y-2">
              <li><a href="/media-mission" className="hover:underline">Media & Evangelism</a></li>
              <li><a href="/research" className="hover:underline">Research & Training</a></li>
              <li><a href="/training" className="hover:underline">Training Programmes</a></li>
              <li><a href="/projects" className="hover:underline">Projects</a></li>
              <li><a href="/systems" className="hover:underline">Systems & Platforms</a></li>
            </ul>
          </div>

          {/* CONNECT */}
          <div>
            <h3 className="font-bold mb-3">Connect</h3>

            <p className="leading-relaxed">
              Reach out directly for mission partnerships, training, and support.
            </p>

            <ul className="mt-4 space-y-1">
              <li><a href="/contact" className="hover:underline">Contact us</a></li>
            </ul>

            <div className="mt-6">
              <h3 className="font-bold mb-3">Contact</h3>

              <div className="flex gap-4 text-lg">
                <a href={social?.instagram || "https://www.instagram.com/taitadventist?igsh=MWVvcTd1OG01bGZvNw=="} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="/contact" className="hover:opacity-80 transition" aria-label="Contact"><i className="fa-solid fa-envelope"></i></a>
              </div>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-white/30 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-center md:text-left font-medium">
            © {new Date().getFullYear()} {organization?.name || "TAIT"} — {organization?.tagline || "Technology at the Heart of the Mission"}
          </p>
        </div>

      </div>
    </footer>
  );
}

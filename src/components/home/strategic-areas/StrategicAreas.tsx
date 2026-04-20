import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";
import Image from "next/image";

export default function StrategicAreas() {
  return (
    <Section bg="gray" withDivider>

      {/* ================= SUBTLE BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <Image
          src="/images/man-computer.webp"
          alt="TAIT background pattern"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* soft grapevine tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7f264a]/5 via-white to-white pointer-events-none" />

      {/* ================= HEADER ================= */}
      <div className="relative text-center max-w-3xl mx-auto">
        <SectionTitle title="Strategic Areas of Operation" />

        <p className="text-gray-600 mt-3 leading-relaxed">
          TAIT operates through three core pillars that drive digital transformation,
          communication, and structured mission execution.
        </p>
      </div>

      {/* ================= GRID ================= */}
      <div className="relative grid md:grid-cols-2 gap-6 mt-12">

        {/* CARD 1 */}
        <div className="group flex gap-5 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">

          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#7f264a]/10 flex items-center justify-center text-[#7f264a] text-xl">
            <i className="fa-solid fa-gears"></i>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#7f264a]">01</span>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#7f264a] transition">
                Digital Empowerment & Development
              </h3>
            </div>

            <p className="text-gray-600 mt-2 leading-relaxed">
              Systems, integrations, data analysis, portals, and full-scale software development
              supporting institutional operations and decision-making.
            </p>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="group flex gap-5 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">

          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#7f264a]/10 flex items-center justify-center text-[#7f264a] text-xl">
            <i className="fa-solid fa-video"></i>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#7f264a]">02</span>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#7f264a] transition">
                Digital Media & Evangelism
              </h3>
            </div>

            <p className="text-gray-600 mt-2 leading-relaxed">
              Media production, livestreaming, event coverage, and digital outreach campaigns
              designed to expand mission reach.
            </p>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="group md:col-span-2 flex gap-5 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">

          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#7f264a]/10 flex items-center justify-center text-[#7f264a] text-xl">
            <i className="fa-solid fa-chart-line"></i>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#7f264a]">03</span>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#7f264a] transition">
                Research, Training & Frameworking
              </h3>
            </div>

            <p className="text-gray-600 mt-2 leading-relaxed">
              Research programs, digital mission tools, training initiatives, frameworks,
              and structured documentation for sustainable growth.
            </p>
          </div>
        </div>

      </div>

      {/* ================= CTA ================= */}
      <div className="relative mt-12 text-center">
        <Link
          href="/strategic-areas"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#7f264a] text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
        >
          Explore Full Strategy
          <i className="fa-solid fa-arrow-right text-sm"></i>
        </Link>
      </div>

    </Section>
  );
}
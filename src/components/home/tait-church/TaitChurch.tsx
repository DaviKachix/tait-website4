import Image from "next/image";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import SectionText from "@/components/shared/SectionText";
import Link from "next/link";

export default function TaitChurch() {
  return (
    <Section bg="white" spacing="lg">

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* ================= TEXT ================= */}
        <div className="max-w-xl">

          <div className="mb-2 flex items-center gap-2 text-[#7f264a] font-semibold text-sm uppercase tracking-wide">
            <i className="fa-solid fa-church"></i>
            Institutional Integration
          </div>

          <SectionTitle title="TAIT and the Church" />

          <div className="space-y-5">
            <SectionText>
              Tanzania Adventist Institute of Technology serves as a digital support and innovation center for the Church.
              It works with leadership, institutions, and ministries to provide systems, tools, and platforms that improve
              coordination, communication, and mission delivery.
            </SectionText>

            <SectionText>
              TAIT enables a connected environment where operations are efficient, information is structured,
              and mission activities are strengthened.
            </SectionText>
          </div>

          {/* CTA */}
          <Link
            href="/tait-church"
            className="inline-flex items-center gap-2 mt-8 px-5 py-3 bg-[#7f264a] text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
          >
            Learn more
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </Link>

        </div>

        {/* ================= IMAGE ================= */}
        <div className="relative w-full h-[280px] sm:h-[340px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl group">

          <Image
            src="/images/team.webp"
            alt="TAIT Church Collaboration"
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            priority
          />

          {/* PREMIUM LAYER */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />

          {/* FLOATING LABEL */}
          <div className="absolute bottom-4 left-4 bg-white/90 text-[#7f264a] text-xs font-semibold px-3 py-1 rounded-full shadow">
            Church • Systems • Mission
          </div>

        </div>

      </div>

    </Section>
  );
}
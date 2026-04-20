import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";

export default function Articles() {
  return (
    <Section bg="grapevine" spacing="lg">

      {/* ================= HEADER ================= */}
      <div className="max-w-3xl mx-auto text-center">

        <div className="flex justify-center mb-3">
          <div className="w-10 h-10 rounded-full bg-[#7f264a]/10 flex items-center justify-center text-[#7f264a]">
            <i className="fa-solid fa-newspaper"></i>
          </div>
        </div>

        <SectionTitle title="Articles & Publications" />

        <p className="text-gray-600 mt-3 leading-relaxed">
          Insights, research updates, and thought leadership on technology, mission,
          and innovation within the Church and institutional ecosystem.
        </p>

      </div>

      {/* ================= DIVIDER ================= */}
      <div className="flex justify-center my-8">
        <div className="w-24 h-[2px] bg-[#7f264a]/20" />
      </div>

      {/* ================= CTA ================= */}
      <div className="text-center">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#7f264a] text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
        >
          Explore Publications
          <i className="fa-solid fa-arrow-right text-sm"></i>
        </Link>

        <p className="text-xs text-gray-500 mt-3">
          Research • Insights • Updates
        </p>
      </div>

    </Section>
  );
}
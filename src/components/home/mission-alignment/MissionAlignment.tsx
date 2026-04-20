import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";

export default function MissionAlignment() {
  return (
    <Section bg="grapevine" spacing="lg">
      {/* HEADER */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <SectionTitle title="Mission Alignment" />
        <div className="w-20 h-[2px] bg-[#7f264a] mx-auto mt-3 opacity-60" />
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        
        <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium">
          All activities within TAIT are aligned with the mission of the Church.
          Systems improve efficiency, media expands outreach, and research guides decision-making.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Each component contributes to strengthening coordination, enhancing communication,
          and advancing mission work across institutions and ministries.
        </p>

        {/* HIGHLIGHT STRIP (no cards, just emphasis line) */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#7f264a]/20 bg-white/70 text-[#7f264a] text-sm font-semibold">
            <i className="fa-solid fa-cross"></i>
            Unified Digital Mission Framework
          </div>
        </div>

      </div>
    </Section>
  );
}
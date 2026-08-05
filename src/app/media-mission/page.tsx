import type { Metadata } from "next";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";

export const metadata: Metadata = {
  title: "Media & Evangelism | TAIT",
  description:
    "TAIT media and evangelism activities build communication, live events, and outreach for the Church.",
};

export default function MediaMissionPage() {
  return (
    <main className="min-h-screen bg-[#faf8f4] py-14">
      <div className="max-w-6xl mx-auto px-6">
        <Section bg="white" spacing="lg">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7f264a]">
              Media & Evangelism
            </p>
            <SectionTitle title="Digital media for mission outreach" />
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              TAIT supports church mission through media production, event coverage, and communication strategies that enlarge the reach of the Gospel.
            </p>
          </div>
        </Section>
      </div>
    </main>
  );
}

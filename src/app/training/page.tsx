import type { Metadata } from "next";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Training | TAIT",
  description:
    "TAIT training programmes equip church leaders, volunteers, and institutions for digital ministry.",
};

const trainingPrograms = [
  {
    title: "Leadership Digital Training",
    description: "Practical skills for church leadership and mission coordination.",
  },
  {
    title: "Media & Evangelism Workshops",
    description: "Training for digital discipleship, live events, and community outreach.",
  },
  {
    title: "Systems Adoption Support",
    description: "Skills and support for new church systems, reporting, and operations.",
  },
];

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-[#faf8f4] py-14">
      <div className="max-w-6xl mx-auto px-6">
        <Section bg="white" spacing="lg">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7f264a]">
              Training Programmes
            </p>
            <SectionTitle title="Developing digital capacity for the Church" />
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              TAIT training equips people to use church systems, launch media ministry, and lead with technology in service of mission.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-12">
            {trainingPrograms.map((item) => (
              <div key={item.title} className="rounded-3xl border border-gray-200 bg-[#fff7f6] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <h2 className="text-xl font-semibold text-[#7f264a]">{item.title}</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/work-with-us" className="inline-flex items-center justify-center gap-2 rounded-3xl bg-[#7f264a] px-6 py-3 text-white shadow-lg transition hover:bg-[#6d2240]">
              Enquire about training
              <i className="fa-solid fa-arrow-right-long"></i>
            </Link>
          </div>
        </Section>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research | TAIT",
  description:
    "TAIT research, training and framework publications that support church transformation and digital ministry.",
};

const researchItems = [
  {
    title: "Church leadership research",
    description: "Insights that shape institutional governance and ministry practice.",
    href: "/research",
  },
  {
    title: "Training programme frameworks",
    description: "Structured learning for leaders, educators, and mission teams.",
    href: "/training",
  },
  {
    title: "Digital ministry evaluation",
    description: "Assessing impact and outcomes for mission-focused technology projects.",
    href: "/articles",
  },
];

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-[#faf8f4] py-14">
      <div className="max-w-6xl mx-auto px-6">
        <Section bg="white" spacing="lg">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7f264a]">
              Research & Training
            </p>
            <SectionTitle title="Evidence-based ministry and training" />
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              TAIT advances research, training, and frameworks that support long-term Church development and mission effectiveness.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-12">
            {researchItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-3xl border border-gray-200 bg-[#fff7f6] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="text-xl font-semibold text-[#7f264a]">{item.title}</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">{item.description}</p>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}

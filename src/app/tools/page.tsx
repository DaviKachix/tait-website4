import type { Metadata } from "next";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools | TAIT",
  description:
    "Explore TAIT tools for church reporting, media coordination, training, and mission delivery.",
};

const tools = [
  {
    title: "Digital Collaboration Tools",
    description: "Work together across church teams, schools, and mission groups.",
    href: "/work-with-us",
  },
  {
    title: "Resource Management Tools",
    description: "Manage planning, events, and training resources more clearly.",
    href: "/support",
  },
  {
    title: "Mission Communication Tools",
    description: "Connect leaders, ministries, and communities with timely information.",
    href: "/contact",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f4] py-14">
      <div className="max-w-6xl mx-auto px-6">
        <Section bg="white" spacing="lg">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7f264a]">
              Tools
            </p>
            <SectionTitle title="Practical tools for mission teams" />
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              TAIT delivers mission-focused digital tools that are designed for church use, event coordination, and ministry support.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-12">
            {tools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="rounded-3xl border border-gray-200 bg-[#fff7f6] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="text-xl font-semibold text-[#7f264a]">{tool.title}</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">{tool.description}</p>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}

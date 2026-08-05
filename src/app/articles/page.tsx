import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";

export const metadata: Metadata = {
  title: "Articles | TAIT",
  description:
    "Latest TAIT articles, publications, and mission research insights for the church and digital mission.",
};

const items = [
  {
    title: "Building sustainable digital systems for the Church",
    subtitle: "How technology supports mission operations and leadership.",
    href: "/articles",
  },
  {
    title: "Media evangelism in East Africa",
    subtitle: "Practical strategies for online and community outreach.",
    href: "/media-mission",
  },
  {
    title: "Training church leaders for digital ministry",
    subtitle: "Programmes that equip institutions for the future.",
    href: "/training",
  },
];

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-[#faf8f4] py-14">
      <div className="max-w-6xl mx-auto px-6">
        <Section bg="white" spacing="lg">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7f264a]">
              Articles & Publications
            </p>
            <SectionTitle title="Insights for mission, media, and research" />
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore TAIT publications that describe our work, show outcomes, and share lessons for the wider church.
            </p>
          </div>

          <div className="grid gap-6 mt-12 md:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-3xl border border-gray-200 bg-[#fff7f6] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="text-xl font-semibold text-[#7f264a]">{item.title}</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">{item.subtitle}</p>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Platforms | TAIT",
  description:
    "TAIT platforms provide secure church communication, membership, and media operations.",
};

const platformItems = [
  {
    title: "Communication & Member Care",
    description: "Connected tools for leadership teams, volunteers and church communities.",
    icon: "fa-comments",
  },
  {
    title: "Event & Media Systems",
    description: "Live event portals, streaming pages and media resource delivery.",
    icon: "fa-play",
  },
  {
    title: "Resource & Training Hubs",
    description: "Central spaces for documents, courses and ministry resources.",
    icon: "fa-folder-open",
  },
];

const platformHighlights = [
  {
    title: "NTUC Events Management",
    url: "https://events.ntucadventist.org",
    description: "Live event systems for conference registration, media coordination and service planning.",
    image: "/images/media-team2.webp",
  },
  {
    title: "Pastors Kids Association",
    url: "https://pakia.tz",
    description: "A digital ministry portal for church children’s programs and pastoral care.",
    image: "/images/TAIT SITE SLIDERS upd-03.webp",
  },
  {
    title: "Tanzania Writers & Authors Association",
    url: "https://taawa.or.tz",
    description: "A publishing and membership platform for writers and authors across Tanzania.",
    image: "/images/team-photo3.webp",
  },
  {
    title: "Gain Tanzania",
    url: "https://gain.tz",
    description: "A platform supporting entrepreneurship and ministry networks across the region.",
    image: "/images/working.webp",
  },
];

export default function PlatformsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f4] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <Section bg="white" spacing="lg">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7f264a]">
              Platforms
            </p>
            <SectionTitle title="Platform solutions for church and mission" />
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              TAIT builds platform solutions that make church communication, event delivery and learning easier for leaders and communities.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {platformItems.map((item) => (
              <div key={item.title} className="rounded-3xl border border-gray-200 bg-[#fff7f6] p-7 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7f264a]/10 text-[#7f264a]">
                  <i className={`fa-solid ${item.icon} text-lg`} />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-[#7f264a]">{item.title}</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <SectionTitle title="Featured platform work" />
            <p className="mt-3 text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These examples highlight TAIT’s platform and systems work across church events, member services, publishing and ministry networks.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {platformHighlights.map((project) => (
                <a
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="text-2xl font-semibold text-[#7f264a]">{project.title}</h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">{project.description}</p>
                    <p className="mt-4 text-sm font-semibold text-[#7f264a]">{project.url.replace(/^https?:\/\//, "")}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}

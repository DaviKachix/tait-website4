import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects | TAIT",
  description: "A summary of TAIT-led church systems, media, training, and strategic mission projects.",
};

const projects = [
  {
    title: "Pastors Kids Association",
    url: "https://pakia.tz",
    description: "A ministry portal supporting children’s pastoral engagement and resource coordination.",
    image: "/images/TAIT SITE SLIDERS upd-03.webp",
  },
  {
    title: "NTUC Events Management",
    url: "https://events.ntucadventist.org",
    description: "An event management system for Adventist conferences, registration and media planning.",
    image: "/images/media-team2.webp",
  },
  {
    title: "Tanzania Writers & Authors Association",
    url: "https://taawa.or.tz",
    description: "A digital community platform for writers, publications and literary collaboration.",
    image: "/images/team-photo3.webp",
  },
  {
    title: "Gain Tanzania",
    url: "https://gain.tz",
    description: "A digital network enabling entrepreneurship, community growth and ministry partnerships.",
    image: "/images/working.webp",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f4] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <Section bg="white" spacing="lg">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7f264a]">
              Projects
            </p>
            <SectionTitle title="Recent work with churches and partner ministries" />
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Examples of TAIT’s work across systems, platforms, events and ministry communications.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-[#fff7f6] shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-7">
                  <h2 className="text-2xl font-semibold text-[#7f264a]">{project.title}</h2>
                  <p className="mt-4 text-gray-600 leading-relaxed">{project.description}</p>
                  <p className="mt-4 text-sm font-semibold text-[#7f264a]">{project.url.replace(/^https?:\/\//, "")}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-3xl bg-[#7f264a] px-6 py-3 text-white shadow-lg transition hover:bg-[#6d2240]">
              Talk about your project
              <i className="fa-solid fa-arrow-right-long"></i>
            </Link>
          </div>
        </Section>
      </div>
    </main>
  );
}

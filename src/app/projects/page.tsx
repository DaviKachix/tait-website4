import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore digital platforms, office management systems, event technology, media, and mission projects delivered by TAIT for Adventist organizations and partners.",
  keywords: ["TAIT projects", "OMAS", "Adventist Office Management System", "church technology", "Tanzania Adventist technology"],
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "TAIT Projects — Technology for Mission",
    description: "Digital systems and mission platforms delivered by TAIT for churches, institutions, and partner organizations.",
    url: "/projects",
    type: "website",
    images: [{ url: "/images/laptop.webp", width: 1200, height: 630, alt: "TAIT digital systems and projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAIT Projects — Technology for Mission",
    description: "Explore digital systems and mission platforms delivered by TAIT.",
    images: ["/images/laptop.webp"],
  },
};

const projects = [
  {
    title: "OMAS",
    subtitle: "Adventist Office Management System",
    url: "https://www.omas.adventisthub.org",
    description: "A centralized office management platform built for Adventist organizations to coordinate administration, records, workflows, and institutional operations.",
    image: "/images/laptop.webp",
    icon: "fa-building-columns",
  },
  {
    title: "Pastors Kids Association",
    url: "https://pakia.tz",
    description: "A ministry portal supporting children’s pastoral engagement and resource coordination.",
    image: "/images/TAIT SITE SLIDERS upd-03.webp",
    icon: "fa-people-group",
  },
  {
    title: "NTUC Events Management",
    url: "https://events.ntucadventist.org",
    description: "An event management system for Adventist conferences, registration and media planning.",
    image: "/images/media-team2.webp",
    icon: "fa-calendar-check",
  },
  {
    title: "Tanzania Writers & Authors Association",
    url: "https://taawa.or.tz",
    description: "A digital community platform for writers, publications and literary collaboration.",
    image: "/images/research.webp",
    icon: "fa-pen-nib",
  },
  {
    title: "Gain Tanzania",
    url: "https://gain.tz",
    description: "A digital network enabling entrepreneurship, community growth and ministry partnerships.",
    image: "/images/working.webp",
    icon: "fa-network-wired",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#faf8f4] py-14">
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
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7f264a]/10 text-[#7f264a]"><i className={`fa-solid ${project.icon}`} aria-hidden="true" /></span>
                    <div><h2 className="text-2xl font-semibold text-[#7f264a]">{project.title}</h2>{project.subtitle && <p className="mt-1 text-sm font-semibold text-slate-700">{project.subtitle}</p>}</div>
                  </div>
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
    </div>
  );
}

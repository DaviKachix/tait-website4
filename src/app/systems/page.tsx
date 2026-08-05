import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Systems | TAIT",
  description:
    "TAIT systems support Church administration, reporting, and member engagement through tailored digital platforms.",
};

const systemServices = [
  {
    title: "Administration & Membership",
    description: "Secure digital tools for church membership, finance, and congregation communication.",
    icon: "fa-users",
  },
  {
    title: "Events & Registration",
    description: "Structured event systems for conferences, training and community gatherings.",
    icon: "fa-calendar-days",
  },
  {
    title: "Reporting & Insights",
    description: "Dashboards and analytics that show program performance and outreach impact.",
    icon: "fa-chart-line",
  },
];

const projects = [
  {
    title: "Pastors Kids Association",
    url: "https://pakia.tz",
    description: "A ministry platform helping church children’s ministries manage programs and resources.",
    image: "/images/TAIT SITE SLIDERS upd-03.webp",
  },
  {
    title: "NTUC Events Management",
    url: "https://events.ntucadventist.org",
    description: "Event registration, schedules and media planning for large Adventist events.",
    image: "/images/media-team2.webp",
  },
  {
    title: "Tanzania Writers & Authors Association",
    url: "https://taawa.or.tz",
    description: "A digital network for authors, writers and literary partnerships across Tanzania.",
    image: "/images/team-photo3.webp",
  },
  {
    title: "Gain Tanzania",
    url: "https://gain.tz",
    description: "A growing technology platform supporting entrepreneurship and church networks.",
    image: "/images/working.webp",
  },
];

export default function SystemsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f4] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <Section bg="white" spacing="lg">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7f264a]">
              Systems & Platforms
            </p>
            <SectionTitle title="Digital systems that work for church leaders" />
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              TAIT creates core systems and platforms for churches, events and ministry networks with clean design and reliable workflows.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {systemServices.map((item) => (
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
            <SectionTitle title="Work examples" />
            <p className="mt-3 text-gray-600 max-w-3xl leading-relaxed">
              These projects show how TAIT applies systems and platform design interchangeably across ministry technology and digital service delivery.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {projects.map((project) => (
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

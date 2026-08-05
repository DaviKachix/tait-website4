import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | TAIT",
  description:
    "Explore TAIT services for Church systems, digital media, research support, and training programmes.",
};

const serviceItems = [
  {
    title: "Systems & Platforms",
    description:
      "Church systems for membership, reporting, communication and digital ministry workflows.",
    href: "/systems",
    icon: "fa-cubes-stacked",
  },
  {
    title: "Media & Evangelism",
    description:
      "Media platforms, event tools and outreach systems built to support mission communication.",
    href: "/media-mission",
    icon: "fa-video",
  },
  {
    title: "Research & Training",
    description:
      "Training, research support and capacity-building solutions for church leaders and teams.",
    href: "/research",
    icon: "fa-chalkboard-user",
  },
];

const featuredWork = [
  {
    title: "Pastors Kids Association",
    url: "https://pakia.tz",
    previewKey: "pakia",
    description:
      "A ministry hub for pastoral children’s programs, events and community resources.",
  },
  {
    title: "NTUC Events Management",
    url: "https://events.ntucadventist.org",
    previewKey: "ntuc",
    description:
      "A polished event and registration platform for Adventist conferences and media planning.",
  },
  {
    title: "Tanzania Writers & Authors Association",
    url: "https://taawa.or.tz",
    previewKey: "taawa",
    description:
      "A publishing and membership site for writers, authors and literary collaboration in Tanzania.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <section className="overflow-hidden rounded-[2rem] bg-white shadow-[0_35px_80px_rgba(15,23,42,0.08)]">
          <div className="bg-[#7f264a]/5 px-6 py-14 sm:px-10 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7f264a]">
                Services
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Built church systems and media tools that move mission forward.
              </h1>
            </div>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/contact"
                className="inline-flex h-fit items-center justify-center gap-2 rounded-full bg-[#7f264a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5c1f39]"
              >
                <i className="fa-solid fa-comments" />
                Book a consultation
              </Link>
            </div>
          </div>

          <div className="px-6 py-14 sm:px-10">
            <div className="grid gap-5 sm:grid-cols-3">
              {serviceItems.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_15px_40px_rgba(15,23,42,0.08)]"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#7f264a]/10 text-[#7f264a] shadow-sm">
                    <i className={`fa-solid ${service.icon} text-2xl`} />
                  </div>
                  <h2 className="mt-6 text-xl font-semibold text-slate-950">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {service.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#7f264a]/20 bg-[#7f264a]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#7f264a]">
                      {service.title.split(" & ")[0]}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-16 border-t border-slate-200 pt-12">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7f264a]">
                    Featured work
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
                    Live sites
                  </h2>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex h-fit items-center justify-center gap-2 rounded-full border border-[#7f264a] px-6 py-3 text-sm font-semibold text-[#7f264a] transition hover:bg-[#7f264a] hover:text-white"
                >
                  <i className="fa-solid fa-rocket" />
                  Start a project
                </Link>
              </div>

              <div className="mt-10 space-y-4">
                {featuredWork.map((project) => (
                  <a
                    key={project.title}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:grid-cols-[120px_minmax(0,1fr)]"
                  >
                    <div className="relative h-32 overflow-hidden rounded-2xl bg-slate-100 sm:h-full">
                      <Image
                        src={`/api/preview?site=${project.previewKey}`}
                        alt={`Preview of ${project.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 120px"
                      />
                    </div>
                    <div className="flex flex-col justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-950">
                          {project.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          {project.description}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#7f264a]">
                        <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                        Open preview
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

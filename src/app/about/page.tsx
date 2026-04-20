import Image from "next/image";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";

export default function Page() {
  return (
    <main className="min-h-screen">

      {/* ================= HERO ================= */}
      <Section bg="gray" spacing="md">
        <div className="max-w-3xl mx-auto text-center space-y-4">

          <SectionTitle title="About TAIT" />

          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            We are Tanzania Adventist Institute of Technology (TAIT), an institution
            <span className="text-[#7f264a] font-semibold"> Integrated for Mission</span>.
            We serve as a digital innovation center supporting the Church through
            systems, Digital Media, research, and training for mission advancement.
          </p>

        </div>
      </Section>

      {/* ================= WHO WE ARE ================= */}
      <Section bg="white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <div className="space-y-6">

            <div>
              <h2 className="text-2xl font-bold text-[#7f264a]">
                Who We Are
              </h2>
              <div className="w-16 h-[3px] bg-[#7f264a] mt-2 rounded-full" />
            </div>

            <p className="text-gray-600 leading-relaxed">
              We are a Christ-centered digital mission team committed to bridging
              technology and Church work. We design and develop systems that
              strengthen coordination, communication, and institutional efficiency.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our identity is rooted in
              <span className="font-semibold text-[#7f264a]"> Integrated for Mission</span>,
              ensuring every solution we build directly supports ministry impact,
              evangelism, and Church growth.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {["Digital Media", "Church Systems", "Mission Tech", "Innovation"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs bg-[#7f264a]/10 text-[#7f264a] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>

          {/* IMAGE */}
          <div className="relative w-full h-[340px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/team.webp"
              alt="TAIT Team Collaboration"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </Section>

      {/* ================= MISSION + VISION ================= */}
      <Section bg="gray">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

          {/* ================= MISSION ================= */}
          <div className="relative p-7 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden">

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#7f264a]/10 rounded-full blur-3xl" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#7f264a]/10 flex items-center justify-center text-[#7f264a]">
                <i className="fa-solid fa-cross"></i>
              </div>

              <h2 className="text-xl font-bold text-[#7f264a]">
                Mission
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed">
              To empower the Church through Digital Systems, Digital Media,
              research insights, and structured training that enhances mission
              effectiveness and service delivery.
            </p>

          </div>

          {/* ================= VISION ================= */}
          <div className="relative p-7 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden">

            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#7f264a]/10 rounded-full blur-3xl" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#7f264a]/10 flex items-center justify-center text-[#7f264a]">
                <i className="fa-solid fa-eye"></i>
              </div>

              <h2 className="text-xl font-bold text-[#7f264a]">
                Vision
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed">
              A fully connected Church ecosystem where technology strengthens
              leadership, operations, education, and global outreach.
            </p>

          </div>

        </div>
      </Section>

      {/* ================= WHAT WE DO ================= */}
      <Section bg="white">
        <div className="relative overflow-hidden">

          {/* BACKGROUND IMAGE */}
          <div className="absolute inset-0">
            <img
              src="/images/church.webp"
              className="w-full h-full object-cover opacity-5"
              alt=""
            />
            <div className="absolute inset-0 bg-white/85" />
          </div>

          <div className="relative max-w-5xl mx-auto space-y-10">

            {/* HEADER */}
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-bold text-[#7f264a]">
                What We Do
              </h2>

              <div className="w-16 h-[3px] bg-[#7f264a] mx-auto rounded-full" />

              <p className="text-gray-600 max-w-2xl mx-auto">
                We are <span className="font-semibold text-[#7f264a]">Integrated for Mission</span> through
                Digital Systems, Digital Media, research, and innovation.
              </p>
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-6">

              {[
                {
                  title: "Digital Development",
                  text: "We build systems that support Church administration, reporting, and operations.",
                },
                {
                  title: "Digital Media & Evangelism",
                  text: "We expand outreach through modern Digital Media platforms and communication tools.",
                },
                {
                  title: "Research & Innovation",
                  text: "We use data-driven insights to guide transformation, strategy, and growth.",
                },
                {
                  title: "Training & Empowerment",
                  text: "We equip people with digital skills for mission work, leadership, and service.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-white/80 backdrop-blur border border-gray-100 shadow-sm hover:shadow-md transition"
                >

                  <h3 className="font-semibold text-[#7f264a] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.text}
                  </p>

                </div>
              ))}

            </div>

          </div>
        </div>
      </Section>

    </main>
  );
}
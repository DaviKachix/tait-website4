import Image from "next/image";
import Section from "@/components/shared/Section";

export default function DevelopmentSection() {
  return (
    <Section bg="white" spacing="md" bordered>

      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* ================= LEFT CONTENT ================= */}
        <div className="space-y-6">

          {/* LABEL */}
          <p className="text-xs uppercase tracking-widest text-[#7f264a]/70 font-medium">
            Strategic Pillar
          </p>

          {/* TITLE */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
            Digital Empowerment and Development
          </h2>

          {/* DIVIDER */}
          <div className="w-12 h-[2px] bg-[#7f264a] rounded-full" />

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed">
            This pillar focuses on building the digital backbone of Church operations,
            ensuring efficiency, scalability, and alignment with mission priorities.
          </p>

          <p className="text-gray-600 leading-relaxed">
            We design and implement systems that reduce manual workload, strengthen
            coordination, and create reliable digital environments that support
            long-term institutional growth.
          </p>

          {/* STRUCTURED LIST */}
          <div className="pt-4 space-y-4">

            {[
              {
                title: "Software Development",
                text: "Dashboards, church systems, mobile applications, reporting tools, and mission-focused platforms.",
              },
              {
                title: "System Customization",
                text: "Adapting and refining systems to align with real Church workflows and operational needs.",
              },
              {
                title: "Data and Business Analysis",
                text: "Transforming institutional data into actionable insights for leadership and planning.",
              },
              {
                title: "Integrations and Portals",
                text: "Connecting systems into unified ecosystems for seamless communication and coordination.",
              },
              {
                title: "New System Development",
                text: "Designing innovative digital solutions that respond to emerging mission needs.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">

                {/* DOT */}
                <span className="mt-2 w-2 h-2 rounded-full bg-[#7f264a]" />

                {/* TEXT */}
                <div>
                  <h3 className="font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-md">

          <Image
            src="/images/bible-laptop.jpg"
            alt="Digital systems development"
            fill
            className="object-cover"
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-black/10" />

        </div>

      </div>

    </Section>
  );
}
import Image from "next/image";
import Section from "@/components/shared/Section";

export default function ResearchSection() {
  return (
    <Section bg="white" spacing="md" bordered>

      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* ================= CONTENT (LEFT) ================= */}
        <div className="space-y-6">

          {/* LABEL */}
          <p className="text-xs uppercase tracking-widest text-[#7f264a]/70 font-medium">
            Strategic Pillar
          </p>

          {/* TITLE */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
            Research, Training and Frameworking
          </h2>

          {/* DIVIDER */}
          <div className="w-12 h-[2px] bg-[#7f264a] rounded-full" />

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed">
            This pillar ensures knowledge development, capacity building, and
            system standardization within the Church’s digital transformation journey.
          </p>

          <p className="text-gray-600 leading-relaxed">
            We do not only build systems—we also build understanding, structure,
            and frameworks that enable long-term sustainability and effective
            technology adoption across institutions.
          </p>

          {/* STRUCTURED LIST */}
          <div className="pt-4 space-y-4">

            {[
              {
                title: "Research Activities",
                text: "Studying digital transformation, system adoption, and technology use within Church environments.",
              },
              {
                title: "Training Programs",
                text: "Equipping leaders, workers, and institutions with practical digital and system skills.",
              },
              {
                title: "Framework Development",
                text: "Designing structured operational models that guide digital implementation and usage.",
              },
              {
                title: "Documentation & Standards",
                text: "Establishing policies, documentation, and standards for consistency and governance.",
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

        {/* ================= IMAGE (RIGHT) ================= */}
        <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden">

          <Image
            src="/images/research.webp"
            alt="Research and training at TAIT"
            fill
            className="object-cover object-center"
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-black/5" />

        </div>

      </div>

    </Section>
  );
}
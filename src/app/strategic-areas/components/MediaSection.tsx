import Image from "next/image";
import Section from "@/components/shared/Section";

export default function MediaSection() {
  return (
    <Section bg="gray" spacing="md" bordered>

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* ================= IMAGE (LEFT) ================= */}
        <div className="relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-md">

          <Image
            src="/images/media-team2.webp"
            alt="TAIT Media Work"
            fill
            className="object-cover"
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-black/10" />

        </div>

        {/* ================= CONTENT (RIGHT) ================= */}
        <div className="space-y-6">

          {/* LABEL */}
          <p className="text-xs uppercase tracking-widest text-[#7f264a]/70 font-medium">
            Strategic Pillar
          </p>

          {/* TITLE */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
            Digital Media, Events and Evangelism
          </h2>

          {/* DIVIDER */}
          <div className="w-12 h-[2px] bg-[#7f264a] rounded-full" />

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed">
            This pillar drives communication, storytelling, and digital evangelism
            across Church platforms, ensuring that the mission is visible, engaging,
            and accessible to both local and global audiences.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Through structured media systems and intentional digital strategies,
            we amplify Church activities, strengthen engagement, and extend outreach
            into the digital space.
          </p>

          {/* STRUCTURED LIST */}
          <div className="pt-4 space-y-4">

            {[
              {
                title: "Media Production",
                text: "High-quality videos, graphics, and content that support communication, training, and engagement.",
              },
              {
                title: "Livestreaming & Broadcasting",
                text: "Real-time coverage of services, conferences, and events for global participation.",
              },
              {
                title: "Event Coverage",
                text: "Professional documentation of Church activities to preserve history and communicate impact.",
              },
              {
                title: "Digital Outreach Campaigns",
                text: "Strategic evangelistic campaigns designed for digital platforms and audience engagement.",
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

      </div>

    </Section>
  );
}
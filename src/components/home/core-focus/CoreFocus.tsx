import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";

export default function CoreFocus() {
  return (
    <Section bg="gray">

      <div className="relative overflow-hidden">

        {/* ================= BACKGROUND LOGOS ================= */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <div className="grid grid-cols-6 md:grid-cols-8 gap-10 p-10">
            {Array.from({ length: 24 }).map((_, i) => (
              <img
                key={i}
                src="/images/tait_logo2.jpg"
                alt=""
                className="w-12 h-12 rounded-full mx-auto animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* ================= CONTENT GRID ================= */}
        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">

          {/* ================= LEFT SIDE ================= */}
          <div>

            <div className="text-left max-w-2xl">
              <SectionTitle title="Our Core Focus" />

              <p className="text-gray-600 mt-3 leading-relaxed">
                Our work is structured around key focus areas that ensure balanced development in
                technology, mission, and people.
              </p>
            </div>

            {/* ITEMS */}
            <div className="mt-8 space-y-4">

              {[
                {
                  icon: "fa-gears",
                  title: "Digital Development",
                  text: "We build systems that support church and institutional operations.",
                },
                {
                  icon: "fa-bullhorn",
                  title: "Media & Evangelism",
                  text: "Digital communication and outreach through media platforms.",
                },
                {
                  icon: "fa-lightbulb",
                  title: "Research & Innovation",
                  text: "Data-driven insights for transformation and growth.",
                },
                {
                  icon: "fa-user-graduate",
                  title: "Training & Empowerment",
                  text: "Skills development for digital mission leadership.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="
                    flex gap-4 p-4 rounded-xl
                    bg-white/90 backdrop-blur-md
                    border border-gray-100
                    shadow-sm
                    hover:shadow-lg hover:-translate-y-1
                    transition-all duration-300
                  "
                >
                  <i className={`fa-solid ${item.icon} text-[#7f264a] text-lg mt-1`} />

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden shadow-xl">

            <img
              src="/images/tait_logo2.jpg"
              alt="Core Focus"
              className="
                w-full h-full object-cover
                scale-105 hover:scale-110
                transition duration-700 ease-out
              "
            />

            {/* overlay for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

          </div>

        </div>
      </div>

    </Section>
  );
}
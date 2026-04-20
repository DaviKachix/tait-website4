import Image from "next/image";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";

export default function ChurchEmpowerment() {
  return (
    <Section bg="gray">

      {/* ================= HEADER ================= */}
      <div className="text-center max-w-3xl mx-auto">
        <SectionTitle title="Church Empowerment" />

        <p className="text-gray-600 mt-3 leading-relaxed">
          We focus on strengthening the systems and structures that support growth and efficiency
          across church operations, education, and administration.
        </p>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="mt-14 grid md:grid-cols-2 gap-12 items-start">

        {/* ================= IMAGE (LEFT) ================= */}
        <div className="relative w-full h-[320px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg group">

          <Image
            src="/images/team.webp"
            alt="Church Empowerment"
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            priority
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />

          {/* floating badge */}
          <div className="absolute bottom-4 left-4 bg-white/90 text-[#7f264a] text-xs font-semibold px-3 py-1 rounded-full shadow">
            Systems • Education • HR • Efficiency
          </div>

        </div>

        {/* ================= CONTENT (RIGHT) ================= */}
        <div className="space-y-8">

          {/* ITEM 1 */}
          <div className="flex gap-4">
            <div className="text-[#7f264a] text-xl mt-1">
              <i className="fa-solid fa-church"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Church Systems
              </h3>
              <p className="text-gray-600 mt-1 leading-relaxed">
                Tools for membership management, reporting, and coordination of church activities.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#7f264a]/20 to-transparent" />

          {/* ITEM 2 */}
          <div className="flex gap-4">
            <div className="text-[#7f264a] text-xl mt-1">
              <i className="fa-solid fa-school"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Education Systems
              </h3>
              <p className="text-gray-600 mt-1 leading-relaxed">
                Digital platforms for schools, training institutions, and academic coordination.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#7f264a]/20 to-transparent" />

          {/* ITEM 3 */}
          <div className="flex gap-4">
            <div className="text-[#7f264a] text-xl mt-1">
              <i className="fa-solid fa-users-gear"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Human Resource Management
              </h3>
              <p className="text-gray-600 mt-1 leading-relaxed">
                Systems for managing personnel, performance tracking, and staff coordination.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#7f264a]/20 to-transparent" />

          {/* ITEM 4 */}
          <div className="flex gap-4">
            <div className="text-[#7f264a] text-xl mt-1">
              <i className="fa-solid fa-sitemap"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Management Efficiency
              </h3>
              <p className="text-gray-600 mt-1 leading-relaxed">
                Improved workflows through structured systems, automation, and communication tools.
              </p>
            </div>
          </div>

        </div>
      </div>

    </Section>
  );
}
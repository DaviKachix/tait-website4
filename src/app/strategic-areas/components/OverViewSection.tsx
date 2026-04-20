export default function OverviewSection() {
  return (
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-8">

        {/* ================= HEADER ================= */}
        <div className="space-y-3 max-w-3xl">

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            Strategic Areas
          </h1>

          <div className="w-16 h-[3px] bg-[#7f264a] rounded-full" />

          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            The Tanzania Adventist Institute of Technology (TAIT) operates as a
            mission-driven digital institution focused on transforming how the Church
            engages with technology, media, and knowledge systems.
          </p>

        </div>

        {/* ================= BODY ================= */}
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* LEFT TEXT */}
          <div className="space-y-5">

            <p className="text-gray-600 leading-relaxed">
              Our strategic direction is built on three integrated operational pillars
              that work together to strengthen mission delivery, improve institutional
              coordination, and enable sustainable digital transformation across the Church.
            </p>

            <p className="text-gray-600 leading-relaxed">
              These pillars are not independent—they are deeply interconnected,
              ensuring that every system, every media initiative, and every research effort
              contributes directly to mission effectiveness and long-term impact.
            </p>

            {/* PILLARS HIGHLIGHT */}
            <div className="pt-3 space-y-2">

              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#7f264a]" />
                <p className="text-gray-800 font-medium">
                  Digital Empowerment & Development
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#7f264a]" />
                <p className="text-gray-800 font-medium">
                  Digital Media & Evangelism
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#7f264a]" />
                <p className="text-gray-800 font-medium">
                  Research, Training & Frameworking
                </p>
              </div>

            </div>

          </div>
{/* ================= RIGHT EMPHASIS BLOCK ================= */}
<div className="relative overflow-hidden">

  {/* BACKGROUND */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#7f264a] via-[#7f264a]/95 to-[#5a1b34]" />

  {/* SOFT GLOW */}
  <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 blur-[120px] rounded-full" />
  <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 blur-[120px] rounded-full" />

  {/* CONTENT */}
  <div className="relative p-8 md:p-10 space-y-5 text-white">

    {/* LABEL */}
    <p className="text-xs uppercase tracking-widest text-white/70 font-medium">
      Integrated Approach
    </p>

    {/* DIVIDER */}
    <div className="w-12 h-[2px] bg-white/40 rounded-full" />

    {/* TEXT */}
    <p className="text-white/90 text-bold leading-relaxed">
      TAIT does not operate in silos. Every solution—whether a system,
      a media initiative, or a research framework—is designed to work
      within a unified ecosystem that strengthens the Church holistically.
    </p>

    <p className="text-white/80 text-bold leading-relaxed">
      This integrated model ensures consistency, scalability, and alignment
      with mission priorities across all levels of operation.
    </p>

  </div>
</div>

          </div>

        </div>

    </section>
  );
}
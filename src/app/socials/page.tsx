"use client";

export default function SocialsPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">

      {/* ================= INTRO ================= */}
      <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">

        <div className="w-12 h-12 mx-auto rounded-xl bg-[#7f264a]/10 flex items-center justify-center text-[#7f264a]">
          <i className="fa-solid fa-broadcast-tower"></i>
        </div>

        <h1 className="text-xl font-semibold">Our Digital Presence</h1>

        <p className="text-sm text-gray-500 leading-relaxed">
          We share updates, projects, training, and mission innovation activities across our digital platforms.
          Follow us and stay connected with TAIT.
        </p>

      </div>

      {/* ================= SOCIAL LINKS ================= */}
      <div className="max-w-2xl mx-auto grid gap-3">

        {/* YouTube */}
        <a
          href="https://youtube.com"
          target="_blank"
          className="flex items-center justify-between bg-white border rounded-xl px-4 py-3 hover:border-[#7f264a]/40 transition"
        >
          <div className="flex items-center gap-3">
            <i className="fa-brands fa-youtube text-red-600 text-xl"></i>
            <div>
              <p className="text-sm font-medium">YouTube</p>
              <p className="text-xs text-gray-500">Sermons, training & project videos</p>
            </div>
          </div>

          <i className="fa-solid fa-arrow-up-right-from-square text-gray-400"></i>
        </a>

        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          className="flex items-center justify-between bg-white border rounded-xl px-4 py-3 hover:border-[#7f264a]/40 transition"
        >
          <div className="flex items-center gap-3">
            <i className="fa-brands fa-facebook text-blue-600 text-xl"></i>
            <div>
              <p className="text-sm font-medium">Facebook</p>
              <p className="text-xs text-gray-500">Updates, events & announcements</p>
            </div>
          </div>

          <i className="fa-solid fa-arrow-up-right-from-square text-gray-400"></i>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          className="flex items-center justify-between bg-white border rounded-xl px-4 py-3 hover:border-[#7f264a]/40 transition"
        >
          <div className="flex items-center gap-3">
            <i className="fa-brands fa-linkedin text-blue-700 text-xl"></i>
            <div>
              <p className="text-sm font-medium">LinkedIn</p>
              <p className="text-xs text-gray-500">Professional updates & partnerships</p>
            </div>
          </div>

          <i className="fa-solid fa-arrow-up-right-from-square text-gray-400"></i>
        </a>

      </div>

      {/* ================= FEED / UPDATES ================= */}
      <div className="max-w-2xl mx-auto mt-10">

        <div className="text-center mb-4">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center justify-center gap-2">
            <i className="fa-solid fa-rss text-[#7f264a]"></i>
            Latest Updates
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-6 space-y-4">

          {/* Placeholder posts */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-800">
              New Digital Training Program Launched
            </p>
            <p className="text-xs text-gray-500">
              TAIT continues empowering church leaders through digital transformation tools.
            </p>
          </div>

          <div className="border-t pt-3 space-y-2">
            <p className="text-sm font-medium text-gray-800">
              Church Systems Upgrade Initiative
            </p>
            <p className="text-xs text-gray-500">
              Improving administration through centralized digital platforms.
            </p>
          </div>

        </div>
      </div>

      {/* ================= ENGAGEMENT ================= */}
      <div className="max-w-xl mx-auto text-center mt-10">

        <div className="flex justify-center mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#7f264a]/10 flex items-center justify-center text-[#7f264a]">
            <i className="fa-solid fa-heart"></i>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          Stay connected, follow our updates, and be part of the mission
          as we use technology to advance the Church globally.
        </p>

      </div>

    </main>
  );
}
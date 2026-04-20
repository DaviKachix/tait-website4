import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#7f264a] text-white mt-16 overflow-hidden">

      {/* ================= WATERMARK ================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/images/TAIT8.svg"
          alt="TAIT watermark"
          width={800}
          height={800}
          className="opacity-[0.64] scale-95 object-contain animate-[float_18s_ease-in-out_infinite]"
        />
      </div>

      {/* ================= OVERLAY (IMPROVES READABILITY) ================= */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7f264a]/90 via-[#7f264a]/95 to-[#7f264a] pointer-events-none" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 text-sm font-medium">

        {/* ================= TOP GRID ================= */}
        <div className="grid md:grid-cols-4 gap-10">

          {/* ABOUT */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/TAIT8.svg"
                alt="TAIT Logo"
                width={80}
                height={80}
                className="object-contain bg-[#7f264a] rounded-full p-1"
              />
            </div>

            <h3 className="font-bold mb-3">About TAIT</h3>

            <p className="leading-relaxed text-white">
              Tanzania Adventist Institute of Technology is a digital mission and technology center
              committed to supporting the Church through systems, media, research, and innovation.
            </p>

            <p className="mt-4 text-white">
              Email:{" "}
              <a
                href="mailto:info@tait.tz"
                className="font-bold underline hover:opacity-80"
              >
                info@tait.tz
              </a>
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="font-bold mb-3">EXPROLE</h3>

            <p className="font-semibold">Key Pages</p>
            <ul className="mt-2 space-y-1">
              <li><a href="/education" className="hover:underline">Education & Training</a></li>
              <li><a href="/research" className="hover:underline">Research</a></li>
              <li><a href="/services" className="hover:underline">Services</a></li>
            </ul>

            <p className="font-semibold mt-5">Development</p>
            <ul className="mt-2 space-y-1">
              <li><a href="/hr" className="hover:underline">Human Resource</a></li>
              <li><a href="/events" className="hover:underline">Events Management</a></li>
              <li><a href="/contact" className="hover:underline">Enquiries</a></li>
              <li><a href="/software" className="hover:underline">Software Development</a></li>
            </ul>
          </div>

          {/* MISSION MEDIA */}
          <div>
            <h3 className="font-bold mb-3">MISSION MEDIA</h3>

            <ul className="space-y-1">
              <li><a href="/media-mission" className="hover:underline">Missionary Activities</a></li>
              <li><a href="/initiatives" className="hover:underline">Initiatives</a></li>
            </ul>

            <h3 className="font-bold mt-6 mb-3">GUIDING POLICIES</h3>

            <ul className="space-y-1">
              <li><a href="/policies" className="hover:underline">Guiding Principles</a></li>
              <li><a href="/terms" className="hover:underline">Terms of Use</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>

          {/* EXTERNAL LINKS + SOCIALS */}
          <div>
            <h3 className="font-bold mb-3">EXTERNAL LINKS</h3>

            <p className="leading-relaxed">
              Connected institutions and church platforms supporting the mission network.
            </p>

            <ul className="mt-4 space-y-1">
              <li><a href="#" className="hover:underline">Adventist.org</a></li>
              <li><a href="#" className="hover:underline">East-Central Africa Division</a></li>
              <li><a href="#" className="hover:underline">Tanzania Union</a></li>
            </ul>

            {/* SOCIALS */}
            <div className="mt-6">
              <h3 className="font-bold mb-3">Connect With Us</h3>

              <div className="flex gap-4 text-lg">
                <a href="#" className="hover:opacity-80 transition"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="hover:opacity-80 transition"><i className="fab fa-instagram"></i></a>
                <a href="#" className="hover:opacity-80 transition"><i className="fab fa-youtube"></i></a>
                <a href="#" className="hover:opacity-80 transition"><i className="fab fa-x-twitter"></i></a>
                <a href="#" className="hover:opacity-80 transition"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-white/30 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-center md:text-left font-medium">
            © {new Date().getFullYear()} TAIT — Technology at the Heart of the Mission
          </p>
        </div>

      </div>
    </footer>
  );
}
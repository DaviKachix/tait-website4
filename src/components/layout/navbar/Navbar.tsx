"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [focusOpen, setFocusOpen] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mProducts, setMProducts] = useState(false);
  const [mFocus, setMFocus] = useState(false);

  return (
    <>
      {/* ================= DESKTOP NAV ================= */}
      <div className="sticky top-4 z-50 flex justify-center">
        <nav className="bg-[#7f264a] text-white rounded-2xl shadow-xl w-[95%] max-w-7xl">

          <div className="px-6 py-3 flex items-center justify-between">

    {/* LOGO */}
<Link href="/" className="flex items-center gap-3">
  <div className="w-[60px] h-[60px] bg-[#7f264a] rounded-full overflow-hidden flex items-center justify-center shadow-sm">
    <Image
      src="/images/TAIT8.svg"
      alt="TAIT Logo"
      width={80}
      height={80}
      className="object-cover bg-[#7f264a] rounded-full p-0.0005"
    />
  </div>
              <div className="leading-tight">
                <h1 className="text-base font-bold tracking-wide">
                  Tanzania Adventist
                </h1>
                <p className="text-xs text-white/80">
                  Institute of Technology
                </p>
              </div>

            </Link>

            {/* MENU */}
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold">

              <Link className="hover:text-white/80 transition" href="/">
                Home
              </Link>

              <Link className="hover:text-white/80 transition" href="/about">
                About
              </Link>

              {/* PRODUCTS */}
              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button className="hover:text-white/80 transition">
                  Products ▾
                </button>

                <div
                  className={`absolute top-full left-0 mt-3 w-52 bg-white text-[#7f264a] rounded-md shadow-lg overflow-hidden transition-all duration-200 origin-top ${
                    productsOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <Link className="block px-4 py-2 hover:bg-gray-100" href="/systems">
                    Systems
                  </Link>
                  <Link className="block px-4 py-2 hover:bg-gray-100" href="/platforms">
                    Platforms
                  </Link>
                  <Link className="block px-4 py-2 hover:bg-gray-100" href="/tools">
                    Tools
                  </Link>
                </div>
              </div>

              {/* FOCUS */}
              <div
                className="relative"
                onMouseEnter={() => setFocusOpen(true)}
                onMouseLeave={() => setFocusOpen(false)}
              >
                <button className="hover:text-white/80 transition">
                  Focus Areas ▾
                </button>

                <div
                  className={`absolute top-full left-0 mt-3 w-60 bg-white text-[#7f264a] rounded-md shadow-lg overflow-hidden transition-all duration-200 origin-top ${
                    focusOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <Link className="block px-4 py-2 hover:bg-gray-100" href="/strategic-areas">
                    Digital Development
                  </Link>
                  <Link className="block px-4 py-2 hover:bg-gray-100" href="/media-mission">
                    Media & Evangelism
                  </Link>
                  <Link className="block px-4 py-2 hover:bg-gray-100" href="/research">
                    Research & Training
                  </Link>
                </div>
              </div>

              <Link className="hover:text-white/80 transition" href="/articles">
                Articles
              </Link>

              <Link className="hover:text-white/80 transition" href="/work-with-us">
                Join Us
              </Link>

              <Link className="hover:text-white/80 transition" href="/contact">
                Contact
              </Link>

              <Link
                href="/socials"
                className="bg-white text-[#7f264a] px-3 py-1 rounded-md font-bold hover:opacity-90 transition"
              >
                Socials
              </Link>

            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-white text-2xl"
            >
              ☰
            </button>

          </div>
        </nav>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

     {/* ================= MOBILE HALF SCREEN MENU (REVERSED) ================= */}
<div
  className={`
    fixed inset-0 z-50
    transition-all duration-500 ease-out
    ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
  `}
>

  {/* ================= BACKDROP ================= */}
  <div
    onClick={() => setMobileOpen(false)}
    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
  />

  {/* ================= DRAWER ================= */}
  <div
    className={`
      absolute right-0 top-0 h-full w-[85%] sm:w-[65%]
      bg-white/95 backdrop-blur-xl
      text-[#7f264a]
      shadow-2xl
      transform transition-transform duration-500 ease-out
      ${mobileOpen ? "translate-x-0" : "translate-x-full"}
    `}
  >

    {/* soft glow */}
    <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#7f264a]/10 blur-3xl rounded-full" />
    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#7f264a]/5 blur-3xl rounded-full" />

    {/* ================= CONTENT WRAPPER ================= */}
    <div className="relative h-full flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#7f264a]/10">

        <div>
          <h2 className="font-bold text-lg leading-tight text-[#7f264a]">
            TAIT Menu
          </h2>
          <p className="text-[11px] text-[#7f264a]/60">
            Institute of Technology
          </p>
        </div>

        <button
          onClick={() => setMobileOpen(false)}
          className="text-2xl leading-none text-[#7f264a] hover:rotate-90 transition"
        >
          ✕
        </button>
      </div>

      {/* ================= SCROLL AREA ================= */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 text-sm">

        {/* ================= MAIN LINKS ================= */}
        <div className="space-y-1">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
          ].map((item, i) => (
            <Link
              key={i}
              onClick={() => setMobileOpen(false)}
              href={item.href}
              className="
                block px-3 py-2 rounded-lg font-semibold
                text-[#7f264a]
                hover:bg-[#7f264a]/10
                transition
              "
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="border-t border-[#7f264a]/10 pt-3">

          <button
            onClick={() => setMProducts(!mProducts)}
            className="w-full flex justify-between items-center px-3 py-2 font-semibold text-[#7f264a]"
          >
            Products
            <span>{mProducts ? "−" : "+"}</span>
          </button>

          <div
            className={`
              ml-2 space-y-1 overflow-hidden transition-all duration-300
              ${mProducts ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}
            `}
          >
            {[
              { href: "/systems", label: "Systems" },
              { href: "/platforms", label: "Platforms" },
              { href: "/tools", label: "Tools" },
            ].map((item, i) => (
              <Link
                key={i}
                onClick={() => setMobileOpen(false)}
                href={item.href}
                className="
                  block px-3 py-2 rounded-md
                  text-[#7f264a]/80
                  hover:bg-[#7f264a]/10
                  transition
                "
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ================= FOCUS ================= */}
        <div className="border-t border-[#7f264a]/10 pt-3">

          <button
            onClick={() => setMFocus(!mFocus)}
            className="w-full flex justify-between items-center px-3 py-2 font-semibold text-[#7f264a]"
          >
            Focus Areas
            <span>{mFocus ? "−" : "+"}</span>
          </button>

          <div
            className={`
              ml-2 space-y-1 overflow-hidden transition-all duration-300
              ${mFocus ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}
            `}
          >
            {[
              { href: "/strategic-areas", label: "Digital Development" },
              { href: "/media-mission", label: "Media & Evangelism" },
              { href: "/research", label: "Research & Training" },
            ].map((item, i) => (
              <Link
                key={i}
                onClick={() => setMobileOpen(false)}
                href={item.href}
                className="
                  block px-3 py-2 rounded-md
                  text-[#7f264a]/80
                  hover:bg-[#7f264a]/10
                  transition
                "
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ================= OTHER LINKS ================= */}
        <div className="border-t border-[#7f264a]/10 pt-3 space-y-1">

          {[
            { href: "/articles", label: "Articles" },
            { href: "/work-with-us", label: "Join Us" },
            { href: "/contact", label: "Contact" },
          ].map((item, i) => (
            <Link
              key={i}
              onClick={() => setMobileOpen(false)}
              href={item.href}
              className="
                block px-3 py-2 rounded-lg
                text-[#7f264a]
                hover:bg-[#7f264a]/10
                transition
              "
            >
              {item.label}
            </Link>
          ))}

          <Link
            onClick={() => setMobileOpen(false)}
            href="/socials"
            className="
              inline-block mt-2
              bg-[#7f264a]
              text-white
              px-4 py-2 rounded-lg font-bold
              shadow
              hover:opacity-90 transition
            "
          >
            Socials
          </Link>
        </div>
      </div>

      {/* ================= BOTTOM IMAGE ================= */}
      <div className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none">
        <img
          src="/images/grapevine-logotypo.jpg"
          alt=""
          className="w-full h-28 object-cover"
        />
      </div>

    </div>
  </div>
</div>
    </>
  );
}
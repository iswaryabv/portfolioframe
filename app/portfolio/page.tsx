"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaShoppingCart,
  FaSearch,
  FaLaptop,
  FaTabletAlt,
  FaMobileAlt,
  FaEye,
  FaPen,
} from "react-icons/fa";

const NAV_ITEMS = [
  { id: "home" as const, label: "Home" },
  { id: "about" as const, label: "About Us" },
  { id: "products" as const, label: "Our Products" },
  { id: "categories" as const, label: "Categories" },
  { id: "contact" as const, label: "Contact" },
];

type NavId = (typeof NAV_ITEMS)[number]["id"];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [innerMobileMenuOpen, setInnerMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeNav, setActiveNav] = useState<NavId>("home");

  function enableEditMode() {
    alert("Edit mode enabled!");
  }

  function setView(view: string) {
    alert(`View set to ${view}`);
  }

  return (
    <main className="min-h-screen bg-[#FFF1F2]">
      {/* ✅ NAVBAR */}
      <nav className="w-full bg-[#06224C]">
        <div className="flex w-full flex-wrap items-center gap-2 px-3 py-3 sm:gap-3 sm:px-8 xl:flex-nowrap">
          <div className="flex min-w-0 flex-shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/25 text-white lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M3 5.5H17M3 10H17M3 14.5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <Link
              href="/"
              className="flex h-8 min-w-[92px] items-center justify-center overflow-hidden rounded-[50%] bg-white px-3 sm:h-9 sm:min-w-[104px]"
            >
              <img
                src="/stackly-logo.webp"
                alt="Stackly logo"
                className="h-[18px] w-auto sm:h-[20px]"
              />
            </Link>
          </div>

          <div className="hidden min-w-0 flex-1 lg:flex lg:items-center">
            <nav
              className="flex w-full min-w-0 flex-wrap items-center justify-evenly gap-x-2 gap-y-2 text-[13px] text-white sm:text-sm sm:gap-x-3"
              aria-label="Main"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`shrink-0 border-b-2 pb-0.5 transition-colors ${
                    activeNav === item.id
                      ? "border-[#f0e6d4] font-medium text-white"
                      : "border-transparent hover:text-white"
                  }`}
                  aria-current={activeNav === item.id ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="ml-auto flex min-w-0 flex-nowrap items-center gap-3 sm:gap-4 md:gap-5">
            {/* CART */}
            <button
              onClick={() => setCartCount((prev) => prev + 1)}
              className="relative flex items-center gap-2 border border-white/30 px-3 py-1 rounded-full text-white text-xs shrink-0"
              aria-label="Shopping cart"
            >
              <FaShoppingCart />
              <span className="hidden sm:inline">Cart</span>

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* SEARCH */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-full shrink-0"
              aria-label="Search"
            >
              <FaSearch className="text-[#06224C]" />
            </button>

            {/* PROFILE */}
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30 shrink-0">
              <img
                src="https://ui-avatars.com/api/?name=User"
                alt="User profile"
              />
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/20 px-3 pb-3 pt-2 lg:hidden">
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveNav(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-md border px-3 py-2 text-xs transition ${
                    activeNav === item.id
                      ? "border-[#f0e6d4] bg-white/10 text-white"
                      : "border-white/25 text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-white p-4 md:p-7 flex justify-center">
        <div className="w-full max-w-[1200px] relative">

          {/* ✅ Canvas Box */}
          <div className="w-full min-h-[530px] bg-[#FFF1F2] rounded-xl border-2 border-gray-300 flex flex-col relative overflow-hidden">

            {/* ✅ INNER NAVBAR */}
            <div className="flex w-full flex-wrap items-center gap-4 px-3 py-3 sm:gap-6 sm:px-8 xl:flex-nowrap border-b border-gray-300 bg-[#06224C] rounded-t-xl">
              {/* Mobile: Portfolio heading and logo on left */}
              <div className="flex items-center gap-2 lg:hidden">
                <Link
                  href="/"
                  className="flex h-8 min-w-[92px] items-center justify-center overflow-hidden rounded-[50%] bg-white px-3 sm:h-9 sm:min-w-[104px]"
                >
                  <img
                    src="/stackly-logo.webp"
                    alt="Stackly logo"
                    className="h-[18px] w-auto sm:h-[20px]"
                  />
                </Link>
                  <span className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-white">
    Portfolio
  </span>
                    </div>

              {/* Desktop: Logo, heading, and nav */}
              <div className="hidden lg:flex w-full items-center gap-6">
                <Link
                  href="/"
                  className="flex h-8 min-w-[92px] items-center justify-center overflow-hidden rounded-[50%] bg-white px-3 sm:h-9 sm:min-w-[104px]"
                >
                  <img
                    src="/stackly-logo.webp"
                    alt="Stackly logo"
                    className="h-[18px] w-auto sm:h-[20px]"
                  />
                </Link>

                <div className="flex flex-1 items-center justify-evenly gap-x-6">
                  <span className="text-lg font-semibold text-white">Portfolio</span>

                  <button
                    type="button"
                    className="shrink-0 border-b-2 border-transparent pb-0.5 transition-colors hover:text-white text-[13px] text-white sm:text-sm"
                  >
                    Home
                  </button>

                  <button
                    type="button"
                    className="shrink-0 border-b-2 border-transparent pb-0.5 transition-colors hover:text-white text-[13px] text-white sm:text-sm"
                  >
                    About Us
                  </button>

                  <button
                    type="button"
                    className="shrink-0 border-b-2 border-transparent pb-0.5 transition-colors hover:text-white text-[13px] text-white sm:text-sm"
                  >
                    Projects
                  </button>

                  <button
                    type="button"
                    className="shrink-0 border-b-2 border-transparent pb-0.5 transition-colors hover:text-white text-[13px] text-white sm:text-sm"
                  >
                    Contacts
                  </button>
                </div>
              </div>

              {/* Mobile: Hamburger menu on right */}
              <div className="lg:hidden ml-auto">
                <button
                  type="button"
                  onClick={() => setInnerMobileMenuOpen((v) => !v)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/25 text-white"
                  aria-label="Toggle portfolio menu"
                  aria-expanded={innerMobileMenuOpen}
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M3 5.5H17M3 10H17M3 14.5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ✅ INNER MOBILE MENU */}
            {innerMobileMenuOpen && (
              <div className="border-t border-white/20 px-3 pb-3 pt-2 lg:hidden bg-[#06224C]">
                <div className="grid grid-cols-2 gap-2">
                  {["Home", "About Us", "Projects", "Contacts"].map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setInnerMobileMenuOpen(false)}
                      className="rounded-md border border-white/25 px-3 py-2 text-xs text-white hover:bg-white/10 transition"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* HERO */}
            <div className="flex-1 flex flex-col px-4 md:px-8 lg:px-12 pt-6 md:pt-10 relative z-10">
              <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                <div className="mb-2">Hello, I'm</div>
                <div className="text-[#477892] mb-2">Srinivas Pentakota</div>
                <div>UI/UX Designer</div>
              </h1>

              <p className="text-gray-600 mt-4 text-lg max-w-xl">
                I create modern, responsive websites with great user experience.
              </p>

              {/* Mobile: Blobs and image below the sentence */}
              <div className="md:hidden mt-6 flex justify-center">
                <div className="relative">
                  <div className="w-[300px] h-[300px] bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300 opacity-20 blur-2xl rounded-full absolute"></div>
                  <div className="w-[200px] h-[150px] bg-cyan-300 opacity-20 blur-2xl rounded-full absolute left-4 top-4"></div>
                  <div className="w-[100px] h-[100px] bg-pink-400 opacity-20 rounded-full absolute right-4 bottom-4"></div>
                  <div className="w-[180px] h-[130px] bg-cyan-300 opacity-20 blur-2xl rounded-[60%_40%_55%_45%] absolute -top-6 -left-6"></div>
                  <div className="w-[140px] h-[230px] bg-white/70 rounded-[80px] rotate-[-30deg] shadow-md absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="w-[165px] h-[245px] rounded-full overflow-hidden border-4 border-white z-20 relative">
                    <img src="/portfolio.png" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* <div className="flex gap-6 mt-5">
                <button className="px-3 py-2 ml-12 w-40  bg-gradient-to-r from-[#06224C] to-[#1A5BBC] text-white rounded-lg hover:bg-gray-700">
                  Edit
                </button>

                <button className="px-3 py-2 border border-[#06224C] text-[#06224C] rounded-lg hover:bg-gray-700 hover:text-white">
                  View My Works
                </button>
              </div> */}
             <div className="flex gap-3 mt-5 justify-center md:justify-start">
  
  <button className="px-3 py-2 w-28 md:ml-10 bg-gradient-to-r from-[#06224C] to-[#1A5BBC] text-white rounded-lg hover:bg-gray-700 text-sm">
    Edit
  </button>

  <button className="px-3 py-2 w-36 border border-[#06224C] text-[#06224C] rounded-lg hover:bg-gray-700 hover:text-white text-sm whitespace-nowrap">
    View My Works
  </button>

</div>

              {/* STATS */}
              <div className="flex flex-col items-center gap-4 mt-8 mb-6 w-full md:flex-row md:justify-between md:gap-0 lg:flex-row lg:justify-between lg:gap-0">
                {[
                  { value: "5+", label: "Years of Experience" },
                  { value: "120+", label: "Projects Done" },
                  { value: "98%", label: "Client Satisfaction" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="w-50 bg-white h-28 rounded-lg shadow-md flex flex-col items-center justify-center text-gray-700"
                  >
                    <h5 className="text-2xl font-bold">{item.value}</h5>
                    <span className="text-sm mt-1">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
      <div className="absolute left-[60%] top-[30%] w-[300px] h-[300px] bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300 opacity-20 blur-2xl rounded-full hidden md:block"></div>

      <div className="absolute left-[65%] top-[28%] w-[200px] h-[150px] bg-cyan-300 opacity-20 blur-2xl rounded-full hidden md:block"></div>

      <div className="absolute left-[65%] top-[43%] w-[100px] h-[100px] bg-pink-400 opacity-20 rounded-full hidden md:block"></div>

      {/* White shape */}
      <div className="absolute left-[69%] top-[26%] w-[140px] h-[230px] bg-white/70 rounded-[80px] rotate-[-30deg] shadow-md hidden md:block"></div>

            {/* PROFILE IMAGE */}
            <div className="absolute left-[68%] top-[26%] w-[165px] h-[245px] rounded-full overflow-hidden border-4 border-white z-20 hidden md:block">
              <img src="/portfolio.png" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* FOOTER CONTROLS */}
          {/* <div className="w-full flex items-center justify-between mt-8 px-4">
            <button className="h-10 px-4 rounded-lg text-blue-800 border border-blue-600 hover:bg-blue-50">
              Help
            </button>

            <div className="h-10 flex items-center gap-3 px-3 border border-blue-600 rounded-lg">
              <FaLaptop />
              <FaMobileAlt />
              <FaTabletAlt />
              <FaSearch />
            </div>

            <button className="h-10 px-4 rounded-lg text-blue-800 border border-blue-600 hover:bg-blue-50">
              Zoom
            </button>
          </div> */}

        </div>
      </div>
    
    </main>
  );
}
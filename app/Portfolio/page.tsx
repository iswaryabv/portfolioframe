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

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [innerMobileMenuOpen, setInnerMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeNav, setActiveNav] = useState("Home");

  function toggleCart() {
    setCartCount((prev) => prev + 1);
  }

  function enableEditMode() {
    alert("Edit mode enabled!");
  }

  function setView(view: string) {
    alert(`View set to ${view}`);
  }

  return (
    
      <main className="min-h-screen bg-[#FFF1F2]">
      
      {/* ✅ NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#06224C] px-4 md:px-8 py-3 flex items-center justify-between shadow-sm">
        
        {/* LEFT */}
        <div className="flex items-center gap-4">
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white"
          >
            <FaBars />
          </button>

          <Link
            href="/"
            className="bg-white px-5 py-3 rounded-[60%] shadow-md">
          
            <img
              src="/stackly-logo.webp"
              alt="logo"
              className="h-5"
            />
          </Link>

          <div className="hidden lg:flex gap-8 text-white text-sm font-bold">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/products"> Our Products</Link>
             <Link href="/products"> Categories</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          
          {/* CART */}
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 border border-white/30 px-3 py-1 rounded-full text-white text-xs"
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
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full"
          >
            <FaSearch className="text-[#06224C]" />
          </button>

          {/* PROFILE */}
          <div className="w-8 h-8 rounded-full overflow-hidden border">
            <img
              src="https://ui-avatars.com/api/?name=User"
              alt="user"
            />
          </div>
        </div>
      </nav>

      {/* ✅ MOBILE MENU */}
      {/* {mobileMenuOpen && (
        <div className="lg:hidden bg-[#06224C] text-white p-4 space-y-3">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
        </div>
      )} */}
      {mobileMenuOpen && (
  <div className="lg:hidden border-t border-white/20 px-4 pb-3 pt-2 bg-[#06224C]">
    <div className="grid grid-cols-2 gap-2">

{[
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
  { name: "Contact", path: "/contact" },
].map((item, i) => (
  <Link
    key={i}
    href={item.path}
    onClick={() => {
      setActiveNav(item.name);
      setMobileMenuOpen(false);
    }}
    className={`rounded-md border px-3 py-2 text-xs transition ${
      activeNav === item.name
        ? "border-[#f0e6d4] bg-white/10 text-white"
        : "border-white/25 text-white hover:bg-white/10"
    }`}
  >
    {item.name}
  </Link>
))}

    </div>
  </div>
)}

      {/* ✅ SEARCH BAR */}
      {searchOpen && (
        <div className="bg-white p-6 border-b">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border p-3 rounded-lg"
          />
        </div>
      )}
      {/* MAIN CONTENT */}
      <div className="flex-1 bg-white p-4 md:p-7 flex justify-center">
       <div className="w-full max-w-[1200px] relative">

  {/* ✅ Canvas Box */}
  <div className="w-full min-h-[530px] bg-[#FFF1F2] rounded-xl border-2 border-gray-300 flex flex-col relative overflow-hidden">

    {/* ✅ INNER NAVBAR */}
    <div className="flex items-center justify-between px-4 md:px-10 py-5 border-b border-gray-300 bg-[#06224C] rounded-t-xl">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setInnerMobileMenuOpen(!innerMobileMenuOpen)}
          className="lg:hidden text-white"
        >
          <FaBars />
        </button>

        <div className="text-lg font-semibold text-white">
          Portfolio
        </div>
      </div>

      {/* DESKTOP LINKS */}
      <div className="hidden lg:flex items-center gap-6 text-white">
        <span>Home</span>
        <span>About Us</span>
        <span>Projects</span>
        <span>Contacts</span>
      </div>
    </div>

    {/* ✅ INNER MOBILE MENU */}
    {innerMobileMenuOpen && (
      <div className="lg:hidden border-t border-white/20 px-4 pb-3 pt-2 bg-[#06224C]">
        <div className="grid grid-cols-2 gap-2">
          {["Home", "About Us", "Projects", "Contacts"].map((item, i) => (
            <button
              key={i}
              onClick={() => setInnerMobileMenuOpen(false)}
              className="rounded-md border border-white/25 px-3 py-2 text-xs text-white hover:bg-white/10"
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
                <div className="text-blue-600 mb-2">Srinivas Pentakota</div>
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
                  <div className="w-[140px] h-[230px] bg-white/70 rounded-[80px] rotate-[-30deg] shadow-md absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="w-[165px] h-[245px] rounded-full overflow-hidden border-4 border-white z-20 relative">
                    <img src="/portfolio.png" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="flex gap-6 mt-5">
                <button className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-gray-700">
                  Edit
                </button>

                <button className="px-6 py-2 border border-gray-800 text-blue-800 rounded-lg hover:bg-gray-700">
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
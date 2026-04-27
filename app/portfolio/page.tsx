"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaBars,
  FaShoppingCart,
  FaSearch,
  FaLaptop,
  FaTabletAlt,
  FaMobileAlt,
  FaEye,
  FaPen, FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope, FaPaperPlane,
  FaGlobe, FaYoutube, FaMicrophone
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const NAV_ITEMS = [
  { id: "home" as const, label: "Home", href: "/" },
  { id: "about" as const, label: "About Us", href: "/page-not-found" },
  { id: "products" as const, label: "Our Products", href: "/page-not-found" },
  { id: "categories" as const, label: "Categories", href: "/page-not-found" },
  { id: "contact" as const, label: "Contact", href: "/page-not-found" },
];

type NavId = (typeof NAV_ITEMS)[number]["id"];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [innerMobileMenuOpen, setInnerMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeNav, setActiveNav] = useState<NavId>("home");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  function enableEditMode() {
    alert("Edit mode enabled!");
  }

  function setView(view: string) {
    alert(`View set to ${view}`);
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // clear input
    setEmail("");

    // navigate to 404 page
    router.push("/page-not-found");
  }

  return (
    // <main className="flex flex-col min-h-screen bg-white pt-[56px] sm:pt-[60px]">
    <main className="flex flex-col min-h-screen bg-white">
      {/* ✅ NAVBAR */}
      <nav className="w-full bg-[#06224C] sticky top-0 left-0 z-50">
        <div className="flex w-full flex-wrap items-center justify-between px-4 py-3 md:px-8 gap-y-3 xl:flex-nowrap">
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">


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

              className="flex h-7 w-[80px] sm:h-9 sm:min-w-[104px] shrink-0 items-center justify-center overflow-hidden rounded-[50%] bg-white px-2 sm:px-3 transition-all"
            >
              <img
                src="/stackly-logo.webp"
                alt="Stackly logo"
                className="h-[14px] sm:h-[20px] w-auto"
              />
            </Link>



          </div>

          <div className={`w-full lg:w-auto lg:min-w-0 lg:flex-1 lg:flex lg:items-center transition-all duration-300 ease-in-out overflow-hidden lg:overflow-visible lg:max-h-none lg:opacity-100 order-last lg:order-none ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="w-full mt-3 border-t border-white/20 pt-3 lg:mt-0 lg:border-t-0 lg:pt-0 lg:flex lg:items-center">
              <nav
                className="flex w-full"
                aria-label="Main"
              >
                <div className="grid grid-cols-2 gap-2 w-full lg:flex lg:w-full lg:min-w-0 lg:flex-wrap lg:items-center lg:justify-evenly lg:gap-x-2 lg:gap-y-2 sm:gap-x-3 text-[13px] sm:text-sm">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => { setActiveNav(item.id); setMobileMenuOpen(false); }}
                      // className={`
                      //   text-center lg:text-left transition-colors text-white
                      //   ${activeNav === item.id
                      //     ? 'bg-white/10 lg:bg-transparent border lg:border-0 border-[#f0e6d4] lg:border-b-2 lg:font-medium'
                      //     : 'border border-white/25 lg:border-0 lg:border-b-2 lg:border-transparent hover:bg-white/10 lg:hover:bg-transparent lg:hover:text-white'}
                      //   rounded-md lg:rounded-none px-3 py-2 lg:px-0 lg:py-0 text-xs sm:text-sm lg:shrink-0 lg:pb-0.5
                      // `}
                      className={`
  text-center lg:text-left text-white
  border border-white/2 lg:border-0 lg:border-b-2
  ${activeNav === item.id
    ? 'bg-white/10 lg:bg-transparent border-[#f0e6d4] lg:border-white lg:font-medium'
    : 'border-transparent'}
  
  rounded-md lg:rounded-none
  px-3 py-2 lg:px-0 lg:py-0
  text-xs sm:text-sm lg:shrink-0 lg:pb-0.5

  transition-all duration-200
  hover:bg-white/10
  lg:hover:bg-transparent
  lg:hover:border-white
  hover:scale-105
  active:scale-95
`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-3 lg:gap-4 ml-auto">
            {/* CART */}
            <Link
              href="/page-not-found"
              tabIndex={0}
              className="relative flex items-center justify-center p-0 w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1 sm:gap-2 border border-white/30 rounded-full text-white text-xs shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              aria-label="Shopping cart"
            >
              <FaShoppingCart />
              <span className="hidden sm:inline">Cart</span>
            </Link>

            {/* SEARCH */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              // className="w-8 h-8 flex items-center justify-center bg-white rounded-full shrink-0"
              className="block w-8 h-8 rounded-full overflow-hidden border border-white/30 shrink-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#06224C] transition-transform hover:scale-110 active:scale-95 cursor-pointer"

              aria-label="Search"
            >
              <FaSearch className="white ml-2" />
            </button>

            {/* PROFILE */}
            <Link
              href="/page-not-found"
              tabIndex={0}
              className="block w-8 h-8 rounded-full overflow-hidden border border-white/30 shrink-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#06224C] transition-transform hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="User profile menu"
            >
              <img
                src="/photo.png"
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>

      </nav>

      {/* SEARCH BAR */}
      <div className={`bg-white p-6 border-b transition-all duration-300 ${searchOpen ? "block" : "hidden"}`}>
        <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/page-not-found'; }} className="w-full relative flex items-center">
          <input type="text" placeholder="Search..." className="w-full border p-3 pr-12 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#06224C]" />
          <button type="submit" aria-label="Submit search" className="absolute right-3 text-[#06224C] hover:scale-110 active:scale-95 transition-transform flex items-center justify-center w-8 h-8">
            <FaSearch />
          </button>
        </form>
      </div>

      {/* MAIN CONTENT */}
      <div className="bg-white px-4 py-6 md:px-8 md:py-8 flex justify-center">
        <div className="w-full max-w-[1200px] relative mt-4 sm:mt-6">

          {/* Canvas Box */}
          <div className="w-full min-h-[530px] bg-[#F2F2F2] rounded-xl border-2 border-gray-300 flex flex-col relative overflow-hidden">

            {/* INNER NAVBAR */}
            <div className="flex w-full flex-wrap items-center justify-between gap-4 px-4 py-3 sm:gap-6 md:px-8 xl:flex-nowrap border-b border-gray-300 bg-[#06224C] rounded-t-xl">

              {/* Mobile Header */}
              <div className="flex flex-wrap items-center justify-between w-full lg:hidden gap-y-2 gap-x-2">
                <div className="flex shrink-0 justify-start">
                  <Link
                    href="/"
                    className="flex h-7 w-[80px] sm:h-8 sm:min-w-[92px] shrink-0 items-center justify-center overflow-hidden rounded-[50%] bg-white px-2 sm:px-3 hover:scale-105 transition"
                  >
                    <img
                      src="/stackly-logo.webp"
                      alt="Stackly logo"
                      className="h-[14px] sm:h-[18px] object-contain"
                    />
                  </Link>
                </div>

                <div className="flex flex-1 min-w-[80px] justify-center px-1">
                  <span className="text-base sm:text-lg font-semibold text-white text-center break-words leading-tight">
                    Portfolio
                  </span>
                </div>

                <div className="flex shrink-0 justify-end ml-auto">
                  <button
                    onClick={() => setInnerMobileMenuOpen((v) => !v)}
                    className="h-8 w-8 shrink-0 border border-white/25 text-white rounded-md hover:bg-white/10 transition flex items-center justify-center"
                  >
                    <FaBars />
                  </button>
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden lg:flex w-full items-center justify-between">

                <div className="flex shrink-0 justify-start">
                  <Link href="/" className="flex h-8 min-w-[92px] shrink-0 items-center justify-center rounded-[50%] bg-white px-3 hover:scale-105 transition">
                    <img src="/stackly-logo.webp" alt="Stackly logo" className="h-[18px]" />
                  </Link>
                </div>

                <div className="flex flex-1 justify-center px-4">
                  <span className="text-lg font-semibold text-white">Portfolio</span>
                </div>

                <div className="flex shrink-0 justify-end gap-x-8">
                  {["Home", "About Us", "Projects", "Contact"].map((item, i) => (
                    <button key={i} className="relative text-white text-sm group shrink-0">
                      {item}
                      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* MOBILE MENU */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${innerMobileMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="px-3 pb-3 pt-2 bg-[#06224C] grid grid-cols-2 gap-2">
                {["Home", "About Us", "Projects", "Contact"].map((item, i) => (
                  <button key={i} onClick={() => setInnerMobileMenuOpen(false)} className="border border-white/25 px-3 py-2 text-xs text-white rounded-md hover:bg-white/10 transition hover:scale-105">
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* HERO */}
            <div className="flex-1 flex flex-col px-4 md:px-8 lg:px-12 py-6 md:py-8 relative z-10">

              <div className="w-full md:w-[55%] lg:w-[60%] shrink-0 flex flex-col relative z-30">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug md:leading-normal break-words whitespace-normal">
                  <div className="mb-2">Hello, I'm</div>
                  <div className="text-[#477892] mb-2 leading-snug">Srinivas Pentakota</div>
                  <div className="leading-snug">UI/UX Designer</div>
                </h1>

                <p className="text-gray-600 mt-4 text-base md:text-lg max-w-xl break-words relative z-20">
                  I create modern, responsive websites with great user experience.
                </p>

                {/* MOBILE BLOBS + IMAGE */}
                {/* <div className="md:hidden mt-6 flex justify-center"> */}
                

                   <div className="md:hidden mt-6 flex justify-center px-4 sm:px-6">
  <div className="relative w-full max-w-[220px]">

    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      
      <div className="w-[90%] h-[90%] bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300 opacity-20 blur-2xl rounded-full"></div>
      
      <div className="absolute w-[70%] h-[50%] bg-cyan-300 opacity-20 blur-2xl rounded-full"></div>
      
      <div className="absolute w-[40%] h-[40%] bg-pink-400 opacity-20 rounded-full bottom-2 right-2"></div>
      
      <div className="absolute w-[60%] h-[80%] bg-cyan-300 opacity-20 blur-2xl rounded-[60%_40%_55%_45%] -top-4 -left-4"></div>
      
      <div className="absolute w-[65%] h-[95%] bg-white/70 rounded-[80px] rotate-[-30deg] shadow-md"></div>
    </div>

    {/* Profile Image */}
    <div className="relative w-full aspect-[3/4] rounded-full overflow-hidden border-4 border-white z-10">
      <img 
        src="/portfoliologo.webp" 
        alt="Srinivas Pentakota - UI/UX Designer Portfolio"
        className="w-full h-full object-cover"
      />
    </div>

  </div>
</div>

                {/* BUTTONS */}
                {/* <div className="flex flex-wrap gap-4 mt-5 justify-center md:justify-start">

                  <Link href="/page-not-found" className="w-full sm:w-auto flex justify-center">
                    <button className="px-3 py-2 w-32 md:ml-10 bg-gradient-to-r from-[#06224C] to-[#1A5BBC] text-white rounded-lg text-sm transition transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                      Edit
                    </button>
                  </Link>

                  <Link href="/page-not-found" className="w-full sm:w-auto flex justify-center">
                    <button className="px-3 py-2 w-auto min-w-[9rem] bg-gradient-to-r from-[#06224C] to-[#1A5BBC] text-white rounded-lg text-sm transition transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                      View My Works
                    </button>
                  </Link>

                </div> */}
                <div className="flex flex-wrap gap-4 mt-5 justify-center md:justify-start">

                  <Link
                    href="/page-not-found"
                    className="w-40 md:ml-10 flex justify-center items-center px-3 py-2 
               bg-gradient-to-r from-[#06224C] to-[#1A5BBC] 
               text-white rounded-lg text-sm 
               transition transform hover:scale-105 active:scale-95 
               shadow-md hover:shadow-lg

               outline-none focus:outline-none

               focus-visible:ring-4 
               focus-visible:ring-yellow-300 
               focus-visible:ring-offset-2 
               focus-visible:ring-offset-[#06224C]"
                  >
                    Edit
                  </Link>

                  <Link
                    href="/page-not-found"
                    className="w-40 flex justify-center items-center px-3 py-2 
               bg-gradient-to-r from-[#06224C] to-[#1A5BBC] 
               text-white rounded-lg text-sm 
               transition transform hover:scale-105 active:scale-95 
               shadow-md hover:shadow-lg

               outline-none focus:outline-none

               focus-visible:ring-4 
               focus-visible:ring-yellow-300 
               focus-visible:ring-offset-2 
               focus-visible:ring-offset-[#06224C]"
                  >
                    View My Works
                  </Link>

                </div>
              </div>

              {/* STATS */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 mt-6 mb-2 w-full flex-wrap">
                {[
                  { value: "5+", label: "Years of Experience" },
                  { value: "120+", label: "Projects Done" },
                  { value: "98%", label: "Client Satisfaction" },
                ].map((item, i) => (
                  <div key={i} className="w-full max-w-[16rem] md:w-64 bg-white py-4 min-h-[6rem] px-4 rounded-lg shadow-md flex flex-col items-center justify-center text-gray-700 transition transform hover:-translate-y-2 hover:shadow-xl text-center">
                    <h5 className="text-2xl font-bold">{item.value}</h5>
                    <span className="text-sm mt-1 break-words">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DESKTOP BLOBS */}
            <div className="hidden md:block">
              <div className="absolute left-[55%] top-[25%] w-[300px] h-[300px] bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300 opacity-20 blur-2xl rounded-full animate-[float_6s_ease-in-out_infinite]"></div>

              <div className="absolute left-[65%] top-[22%] w-[200px] h-[150px] bg-cyan-300 opacity-20 blur-2xl rounded-full animate-[float_7s_ease-in-out_infinite]"></div>

              <div className="absolute left-[65%] top-[38%] w-[100px] h-[100px] bg-pink-400 opacity-20 rounded-full animate-[float_5s_ease-in-out_infinite]"></div>

              <div className="absolute left-[69%] top-[21%] w-[140px] h-[230px] bg-white/70 rounded-[80px] rotate-[-30deg] shadow-md animate-[float_6s_ease-in-out_infinite]"></div>

              <div className="absolute left-[68%] top-[21%] w-[165px] h-[245px] rounded-full overflow-hidden border-4 border-white z-20 animate-[float_6s_ease-in-out_infinite]">
                <img src="/portfoliologo.webp" alt="Srinivas Pentakota - UI/UX Designer Portfolio" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FLOAT ANIMATION */}
      <style jsx>{`
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}
`}</style>

      <footer className="grow bg-[#051b3b] text-white mt-16 py-12">
        <div className="max-w-[1200px] mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

            {/* Column 1 */}
            <div className="flex flex-col gap-8 md:col-span-1">


              <form
                onSubmit={handleEmailSubmit}
                className="max-w-[260px] flex flex-col items-start gap-1"
              >
                <div className="flex items-center gap-2 w-full">
                  {/* INPUT */}
                  <div className="flex-grow relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

                    <input
                      type="text"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-full bg-white text-black text-sm outline-none 
      placeholder-gray-700 border border-gray-700 shadow-sm
      focus:shadow-md focus:ring-2 
      ${emailError
                          ? "ring-2 ring-red-500 focus:ring-red-500 border-red-500"
                          : "focus:ring-blue-400 focus:border-blue-400"}`}
                    />
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    className="text-white hover:text-blue-300 transition group shrink-0"
                  >
                    <FaPaperPlane className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>
                {emailError && (
                  <span className="text-red-400 text-xs ml-3 font-medium">{emailError}</span>
                )}
              </form>

              {/* ADDRESS */}
              <div className="text-[13px] text-white/80 leading-relaxed space-y-1">
                <h4 className="font-bold text-white mb-3 text-[15px]">Headquarters</h4>
                <p>MMR Complex, Salem,</p>
                <p>Tamil Nadu 636008</p>
              </div>

            </div>

            {/* PRODUCT */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white text-[18px]">Product</h3>
              <ul className="flex flex-col gap-3 text-[15px] text-white">
                <Link href="/page-not-found" className="transition-all duration-300 hover:text-gray-300 hover:translate-x-1 cursor-pointer">
                  Features
                </Link>

                <Link href="/page-not-found" className="transition-all duration-300 hover:text-gray-300 hover:translate-x-1 cursor-pointer">
                  Templates
                </Link>
                <Link href="/page-not-found" className="transition-all duration-300 hover:text-gray-300 hover:translate-x-1 cursor-pointer">
                  Pricing
                </Link>
                <Link href="/page-not-found" className="transition-all duration-300 hover:text-gray-300 hover:translate-x-1 cursor-pointer">
                  Changelog
                </Link>
              </ul>

            </div>

            {/* RESOURCES */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white text-[18px]">Resources</h3>
              <ul className="flex flex-col gap-3 text-[15px] text-white">
                <Link href="/page-not-found" className="transition-all duration-300 hover:text-gray-300 hover:translate-x-1 cursor-pointer">
                  Documentation
                </Link>
                <Link href="/page-not-found" className="transition-all duration-300 hover:text-gray-300 hover:translate-x-1 cursor-pointer">
                  API Reference
                </Link>
                <Link href="/page-not-found" className="transition-all duration-300 hover:text-gray-300 hover:translate-x-1 cursor-pointer">
                  Blog
                </Link>
                <Link href="/page-not-found" className="transition-all duration-300 hover:text-gray-300 hover:translate-x-1 cursor-pointer">
                  Status
                </Link>
              </ul>
            </div>

            {/* COMPANY */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white text-[18px]">Company</h3>
              <ul className="flex flex-col gap-3 text-[15px] text-white">
                <Link href="/page-not-found" className="transition-all duration-300 hover:text-gray-300 hover:translate-x-1 cursor-pointer">
                  About
                </Link>
                <Link href="/page-not-found" className="transition-all duration-300 hover:text-gray-300 hover:translate-x-1 cursor-pointer">
                  Privacy Policy
                </Link>
                <Link href="/page-not-found" className="transition-all duration-300 hover:text-gray-300 hover:translate-x-1 cursor-pointer">
                  Terms of Service
                </Link>
                <Link href="/page-not-found" className="transition-all duration-300 hover:text-gray-300 hover:translate-x-1 cursor-pointer">
                  Contact
                </Link>
              </ul>
            </div>

            {/* LOGO + ABOUT */}
            <div className="flex flex-col gap-6 items-start md:items-end text-left md:text-right">
              <div className="flex flex-col gap-3">
                {/* <img src="/stackly-logo.webp" className="h-[20px]" /> */}
                <Link
                  href="/"
                  className="flex h-10 w-fit items-center justify-center rounded-[50%] bg-white px-4 transition hover:scale-105"
                >
                  <img src="/stackly-logo.webp" alt="Stackly logo" className="h-[18px] w-auto" />
                </Link>



              </div>


              <p className="text-[14px] text-white/70 max-w-[220px]">
                The <strong className="text-white">NO-CODE</strong> website builder for everyone. Powered by AWS infrastructure, built by  <strong className="text-white">The Stackly team.</strong>
              </p>
            </div>

          </div>

          {/* DIVIDER */}
          <div className="w-full h-px bg-white/10 mb-8"></div>

          {/* BOTTOM */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            {/* ✅ UPDATED SOCIAL ICONS */}
            <div className="bg-white rounded-full px-5 py-2.5 flex items-center gap-4 text-[#051b3b]">

              <a
                href="https://www.facebook.com/thestackly/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Stackly on Facebook"
                className="hover:scale-110 hover:text-blue-600 transition"
              >
                <FaFacebookF size={14} aria-hidden="true" />
              </a>

              <a
                href="https://www.youtube.com/@TheStackly"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Stackly on YouTube"
                className="hover:scale-110 hover:text-red-600 transition"
              >
                <FaYoutube size={14} aria-hidden="true" />
              </a>

              <a
                href="https://www.instagram.com/the_stackly/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Stackly on Instagram"
                className="hover:scale-110 hover:text-pink-600 transition"
              >
                <FaInstagram size={14} aria-hidden="true" />
              </a>

              <a
                href="https://x.com/the_stackly"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Stackly on X (Twitter)"
                className="hover:scale-110 hover:text-black transition"
              >
                <FaXTwitter size={14} aria-hidden="true" />
              </a>

              <a
                href="https://www.linkedin.com/company/the-stackly"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Stackly on LinkedIn"
                className="hover:scale-110 hover:text-blue-700 transition"
              >
                <FaLinkedinIn size={14} aria-hidden="true" />
              </a>

              <a
                href="https://www.thestackly.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Stackly website"
                className="hover:scale-110 hover:text-green-600 transition"
              >
                <FaGlobe size={14} aria-hidden="true" />
              </a>

            </div>

            {/* COPYRIGHT */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] text-white/70">
              <Link href="/page-not-found" className="hover:text-white transition">
                Terms of Use
              </Link>
              <Link href="/page-not-found" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <span>© 2018-2026 thestackly.com, Inc</span>
            </div>

          </div>

        </div>
      </footer>
    </main>
  );
}
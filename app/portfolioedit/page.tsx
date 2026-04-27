"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaBars,
  FaShoppingCart,
  FaSearch,
  FaMicrophone,
  FaImage,
  FaSquare,
  FaVideo,
  FaColumns,
  FaWindowMinimize,
  FaMap,
  FaBlog,
  FaRegFileAlt,
  FaChevronDown,
  FaChevronUp,
  FaArrowRight,
  FaLaptop,
  FaMobileAlt,
  FaTabletAlt,
  FaEnvelope,
  FaPaperPlane,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGlobe,
  FaYoutube
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEye, FaPen } from "react-icons/fa";

const NAV_ITEMS = [
  { id: "home" as const, label: "Home", href: "/" },
  { id: "about" as const, label: "About Us", href: "/page-not-found" },
  { id: "products" as const, label: "Our Products", href: "/page-not-found" },
  { id: "categories" as const, label: "Categories", href: "/page-not-found" },
  { id: "contact" as const, label: "Contact", href: "/page-not-found" },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [leftTab, setLeftTab] = useState("blocks");

  const [showBlocks, setShowBlocks] = useState(true);
  const [showLayout, setShowLayout] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(true);

  const [activeTab, setActiveTab] = useState("properties");
  const [activeNav, setActiveNav] = useState("Home");
  const [showImageSettings, setShowImageSettings] = useState(true);
  const [showPosition, setShowPosition] = useState(true);
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [innerMobileMenuOpen, setInnerMobileMenuOpen] = useState(false);
  const [emailError, setEmailError] = useState("");

  function toggleCart() {
    setCartCount((prev) => prev + 1);
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
    //     <main className="min-h-screen bg-[#FFF1F2]">

    //       {/* ✅ NAVBAR */}
    //       <nav className="sticky top-0 z-50 bg-[#06224C] px-4 md:px-8 py-3 flex items-center justify-between shadow-sm">

    //         {/* LEFT */}
    //         <div className="flex items-center gap-4">

    //           <button
    //             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    //             className="lg:hidden text-white"
    //           >
    //             <FaBars />
    //           </button>

    //           <Link
    //             href="/"
    //             className="bg-white px-5 py-3 rounded-[60%] shadow-md">

    //             <img
    //               src="/stackly-logo.webp"
    //               alt="logo"
    //               className="h-5"
    //             />
    //           </Link>

    //           <div className="hidden lg:flex gap-8 text-white text-sm font-bold">
    //             <Link href="/">Home</Link>
    //             <Link href="/about">About Us</Link>
    //             <Link href="/products"> Our Products</Link>
    //              <Link href="/products"> Categories</Link>
    //             <Link href="/contact">Contact</Link>
    //           </div>
    //         </div>

    //         {/* RIGHT */}
    //         <div className="flex items-center gap-4">

    //           {/* CART */}
    //           <button
    //             onClick={toggleCart}
    //             className="relative flex items-center gap-2 border border-white/30 px-3 py-1 rounded-full text-white text-xs"
    //           >
    //             <FaShoppingCart />
    //             <span className="hidden sm:inline">Cart</span>

    //             {cartCount > 0 && (
    //               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
    //                 {cartCount}
    //               </span>
    //             )}
    //           </button>

    //           {/* SEARCH */}
    //           <button
    //             onClick={() => setSearchOpen(!searchOpen)}
    //             className="w-8 h-8 flex items-center justify-center bg-white rounded-full"
    //           >
    //             <FaSearch className="text-[#06224C]" />
    //           </button>

    //           {/* PROFILE */}
    //           <div className="w-8 h-8 rounded-full overflow-hidden border">
    //             <img
    //               src="https://ui-avatars.com/api/?name=User"
    //               alt="user"
    //             />
    //           </div>
    //         </div>
    //       </nav>

    //       {/* ✅ MOBILE MENU */}
    //       {/* ✅ MOBILE MENU */}
    // {mobileMenuOpen && (
    //   <div className="lg:hidden border-t border-white/20 px-4 pb-3 pt-2 bg-[#06224C]">
    //     <div className="grid grid-cols-2 gap-2">
    //       {[  
    //         { name: "Home", path: "/" },
    //         { name: "About", path: "/about" },
    //         { name: "Products", path: "/products" },
    //         { name: "Categories", path: "/categories" },
    //         { name: "Contact", path: "/contact" },
    //       ].map((item, i) => (
    //         <Link
    //           key={i}
    //           href={item.path}
    //           onClick={() => {
    //             setActiveNav(item.name);
    //             setMobileMenuOpen(false);
    //           }}
    //           className={`rounded-md border px-3 py-2 text-xs transition ${
    //             activeNav === item.name
    //               ? "border-[#f0e6d4] bg-white/10 text-white"
    //               : "border-white/25 text-white hover:bg-white/10"
    //           }`}
    //         >
    //           {item.name}
    //         </Link>
    //       ))}
    //     </div>
    //   </div>
    // )}

    //       {/* ✅ SEARCH BAR */}
    //       {searchOpen && (
    //         <div className="bg-white p-6 border-b">
    //           <input
    //             type="text"
    //             placeholder="Search..."
    //             className="w-full border p-3 rounded-lg"
    //           />
    //         </div>
    //       )}
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

          <div className={`w-full lg:w-auto lg:min-w-0 lg:flex-1 lg:flex lg:items-center ${mobileMenuOpen ? 'block order-last mt-3 border-t border-white/20 pt-3 lg:order-none lg:mt-0 lg:border-t-0 lg:pt-0' : 'hidden'}`}>
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
                    className={`
                      text-center lg:text-left transition-colors text-white
                      ${activeNav === item.id
                        ? 'bg-white/10 lg:bg-transparent border lg:border-0 border-[#f0e6d4] lg:border-b-2 lg:font-medium'
                        : 'border border-white/25 lg:border-0 lg:border-b-2 lg:border-transparent hover:bg-white/10 lg:hover:bg-transparent lg:hover:text-white'}
                      rounded-md lg:rounded-none px-3 py-2 lg:px-0 lg:py-0 text-xs sm:text-sm lg:shrink-0 lg:pb-0.5
                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
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
              className="w-8 h-8 flex items-center justify-center bg-white rounded-full shrink-0"
              aria-label="Search"
            >
              <FaSearch className="text-[#06224C]" />
            </button>

            {/* PROFILE */}
            <Link
              href="/page-not-found"
              tabIndex={0}
              className="block w-8 h-8 rounded-full overflow-hidden border border-white/30 shrink-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#06224C] transition-transform hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="User profile menu"
            >
              <img
                src="https://ui-avatars.com/api/?name=User"
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

      {/* ====== MAIN BUILDER LAYOUT ====== */}
      <div className="flex flex-1">
        {/* LEFT TOGGLE BUTTON */}
        <button
          onClick={() => setShowLeftSidebar(true)}
          className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-[#06224C] text-white px-2 py-3 rounded-r-md shadow-md"
        >
          ▶
        </button>

        <aside
          className={`
            fixed lg:static top-0 left-0 h-full z-50 overflow-y-auto
            w-52 bg-[#06224C] text-white flex flex-col p-4 space-y-4 lg:rounded-tr-3xl
            transform transition-transform duration-300
            ${showLeftSidebar ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 lg:flex
          `}
        >
          <button
            onClick={() => setShowLeftSidebar(false)}
            className="lg:hidden text-white self-end mb-2"
          >
            ✕
          </button>

          {/* Tabs */}
          <div className="flex justify-center gap-6 text-sm font-semibold mt-6">

            <button
              onClick={() => setLeftTab("blocks")}
              className={`pb-1 border-b-2 ${leftTab === "blocks" ? "border-white" : "border-transparent"
                }`}
            >
              Blocks
            </button>

            <span>|</span>

            <button
              onClick={() => setLeftTab("pages")}
              className={`pb-1 border-b-2 ${leftTab === "pages" ? "border-white" : "border-transparent"
                }`}
            >
              Pages
            </button>
          </div>

          {/* Search */}
          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 pl-9 pr-9 rounded-full bg-white text-black text-sm outline-none"
            />

            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-sm" />
            <FaMicrophone className="absolute right-3 top-1/2 -translate-y-1/2 text-black text-sm cursor-pointer" />
          </div>

          {/* BLOCKS */}
          {leftTab === "blocks" && (
            <div className="mt-4 space-y-4">

              {/* BASIC */}
              <div>
                <div
                  onClick={() => setShowBlocks(!showBlocks)}
                  className="flex justify-between cursor-pointer mt-3 mb-2 items-center"
                >
                  <h3 className="text-sm pl-2">Basic Blocks</h3>
                  {showBlocks ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                </div>

                {showBlocks && (
                  <div className="grid grid-cols-3 grid-rows-2 h-28 justify-items-center content-between">

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs hover:bg-blue-100 transition">
                      <span className="font-bold text-gray-800 text-sm">T</span>
                      <span className="text-[8px] text-gray-800">Text</span>
                    </div>

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs">
                      <FaImage className="text-gray-800 text-sm" />
                      <span className="text-[8px] text-gray-800">Image</span>
                    </div>

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs">
                      <FaSquare className="text-gray-800 text-sm" />
                      <span className="text-[8px] text-gray-800">Button</span>
                    </div>

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs">
                      <FaVideo className="text-gray-800 text-sm" />
                      <span className="text-[8px] text-gray-800">Video</span>
                    </div>

                    <div className="bg-white w-10 h-10 rounded-md"></div>
                    <div className="bg-white w-10 h-10 rounded-md"></div>
                  </div>
                )}
              </div>

              {/* LAYOUT */}
              <div>
                <div
                  onClick={() => setShowLayout(!showLayout)}
                  className="flex justify-between cursor-pointer mb-2 items-center"
                >
                  <h3 className="text-sm pl-2">Layout Blocks</h3>
                  {showLayout ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                </div>

                {showLayout && (
                  <div className="grid grid-cols-3 grid-rows-2 h-28 justify-items-center content-between">

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs border-2 border-[#06224C]">
                      <span className="text-[8px] text-gray-800">Section</span>
                    </div>

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs">
                      <FaColumns className="text-gray-800 text-sm" />
                      <span className="text-[8px] text-gray-800">Columns</span>
                    </div>

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs">
                      <span className="text-gray-800 text-[10px] font-bold">H</span>
                      <span className="text-[8px] text-gray-800">Header</span>
                    </div>

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs">
                      <FaWindowMinimize className="text-gray-800 text-sm" />
                      <span className="text-[8px] text-gray-800">Footer</span>
                    </div>

                  </div>
                )}
              </div>

              {/* ADVANCED */}
              <div>
                <div
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex justify-between cursor-pointer mb-2 items-center"
                >
                  <h3 className="text-sm pl-2">Advanced</h3>
                  {showAdvanced ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                </div>

                {showAdvanced && (
                  <div className="grid grid-cols-3 grid-rows-2 h-28 justify-items-center content-between">

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs">
                      < FaRegFileAlt className="text-gray-800 text-sm" />
                      <span className="text-[8px] text-gray-800">Form</span>
                    </div>

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs">
                      <FaMap className="text-gray-800 text-sm" />
                      <span className="text-[8px] text-gray-800">Map</span>
                    </div>

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs">
                      <FaBlog className="text-gray-800 text-sm" />
                      <span className="text-[8px] text-gray-800">Blog</span>
                    </div>

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs">
                      <FaVideo className="text-gray-800 text-sm" />
                      <span className="text-[8px] text-gray-800">Video</span>
                    </div>

                  </div>
                )}
              </div>

            </div>
          )}

          {/* PAGES */}
          {leftTab === "pages" && (
            <div className="mt-6 space-y-4">
              {["Home Page", "About Me", "Contact", "Projects"].map((item) => (
                <div key={item} className="bg-white px-3 py-2 rounded-md flex justify-between text-sm">
                  <span className="text-gray-800">{item}</span>
                  <FaArrowRight className="text-gray-800" />
                </div>
              ))}
            </div>
          )}

        </aside>

        {/* MAIN CONTENT */}
        {/* MAIN CONTENT */}
        {/* <div className="flex-1 bg-white p-4 md:p-7 flex justify-center"> */}
        {/* <div className="flex-1 bg-white p-4 md:p-7 flex justify-center overflow-y-auto h-screen"> */}
        <div className="flex-1 bg-white p-4 md:p-7 flex justify-center min-w-0 overflow-hidden">
          {/* <div className="w-full max-w-[1200px] relative"> */}
          <div className="w-full max-w-[1200px] relative flex flex-col h-[calc(100vh-80px)] min-w-0">

            {/* Canvas Box */}
            {/* <div className="w-full min-h-[530px] bg-[#FFF1F2] rounded-xl border-2 border-gray-300 flex flex-col relative overflow-hidden"> */}
            <div className="flex-1 overflow-y-auto min-w-0">
              <div className="w-full min-h-[530px] bg-[#FFF1F2] rounded-xl border-2 border-gray-300 flex flex-col relative">

                <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 md:px-8 xl:flex-nowrap border-b border-gray-300 bg-[#06224C] rounded-t-xl">

                  {/* Mobile Header */}
                  <div className="flex items-center justify-between w-full lg:hidden gap-1 sm:gap-2">
                    <div className="flex shrink-0 justify-start">
                      {/* <Link href="/" className="flex h-8 w-[92px] max-w-full shrink items-center justify-center rounded-full bg-white px-2 hover:scale-105 transition overflow-hidden">
                    <img src="/stackly-logo.webp" alt="Stackly logo" className="h-[16px] max-w-full object-contain shrink" />
                     </Link> */}

                      <Link
                        href="/"
                        className="flex h-7 w-[64px] sm:h-8 sm:w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-[50%] bg-white px-1 sm:px-2 hover:scale-105 transition"
                      >
                        <img
                          src="/stackly-logo.webp"
                          alt="Stackly logo"
                          className="h-[12px] sm:h-[14px] object-contain"
                        />
                      </Link>
                    </div>

                    <div className="flex flex-1 min-w-0 justify-center px-1">
                      <span className="text-[15px] sm:text-lg font-semibold text-white text-center truncate w-full">
                        Portfolio
                      </span>
                    </div>

                    <div className="flex shrink-0 justify-end">
                      <button
                        onClick={() => setInnerMobileMenuOpen((v) => !v)}
                        className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 border border-white/25 text-white rounded-md hover:bg-white/10 transition flex items-center justify-center"
                      >
                        <FaBars className="text-[13px] sm:text-base" />
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
                      {["Home", "About Us", "Projects", "Contacts"].map((item, i) => (
                        <button key={i} className="relative text-white text-sm group shrink-0">
                          {item}
                          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </button>
                      ))}
                    </div>

                  </div>

                  <div className="hidden md:flex items-center gap-2 ml-4">

                    <div className="flex border border-gray-300 rounded-lg overflow-hidden text-sm whitespace-nowrap text-white">

                      <button className="px-3 py-1 hover:bg-gray-100 hover:text-black">
                        Save Draft
                      </button>

                      <div className="w-px bg-gray-300"></div>

                      <button className="px-3 py-1 hover:bg-gray-100 hover:text-black flex items-center gap-1">
                        Preview <FaEye />
                      </button>

                    </div>

                  </div>
                </div>

                {/* HERO SECTION WRAPPER */}
                <div className="relative w-full overflow-hidden flex flex-col min-h-[500px]">
                  {/* HERO CONTENT */}
                  <div className="flex-1 flex flex-col px-4 md:px-8 lg:px-12 pt-6 md:pt-10 relative z-10">

                    <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                      <div className="mb-2">Hello, I'm</div>
                      <div className="text-blue-600 mb-2">Srinivas Pentakota</div>
                      <div>UI/UX Designer</div>
                    </h1>

                    <p className="text-gray-600 mt-4 text-lg max-w-xl">
                      I create Modern, Responsive websites with great user experience.
                    </p>

                    {/* <div className="flex gap-4 mt-5">
                   

                      <button className="px-6 py-2 border border-gray-800 text-white-600 bg-blue-800 rounded-lg hover:bg-gray-700">
                        View My Works
                      </button>

                      <button className="px-6 py-2 border border-gray-800 text-blue-800 rounded-lg hover:bg-gray-700">
                        Watch Video
                      </button>
                    </div> */}
                    <div className="flex flex-wrap gap-4 mt-5 justify-center md:justify-start">

                      <Link href="/page-not-found" className="w-full sm:w-auto flex justify-center">
                        <button className="px-3 py-2 w-40 md:ml-10 bg-gradient-to-r from-[#06224C] to-[#1A5BBC] text-white rounded-lg text-sm transition transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                          View My Works
                        </button>
                      </Link>

                      <Link href="/page-not-found" className="w-full sm:w-auto flex justify-center">
                        <button className="px-3 py-2 w-40 bg-gradient-to-r from-[#06224C] to-[#1A5BBC] text-white rounded-lg text-sm transition transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                          Download CV
                        </button>
                      </Link>

                    </div>

                    {/* DEVICE CONTROLS (always visible) */}
                    {/* <div className="flex items-center gap-4 mt-6 border border-gray-300 rounded-lg p-2 bg-white shadow-sm w-fit">
                   <button className="px-3 py-2 border rounded hover:bg-gray-100">💻</button>
                   <button className="px-3 py-2 border rounded hover:bg-gray-100">📱</button>
                    <button className="px-3 py-2 border rounded hover:bg-gray-100">📟</button>
                   </div> */}

                    {/* STATS */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 mt-10 mb-2 w-full flex-wrap">
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

                  {/* BLOBS */}

                  <div className="absolute left-[60%] top-[20%] w-[300px] h-[300px] bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300 opacity-20 blur-2xl rounded-full"></div>

                  <div className="absolute left-[65%] top-[18%] w-[200px] h-[150px] bg-cyan-300 opacity-20 blur-2xl rounded-full"></div>

                  <div className="absolute left-[65%] top-[22%] w-[100px] h-[100px] bg-pink-400 opacity-20 rounded-full"></div>

                  {/* White shape */}
                  <div className="absolute left-[69%] top-[16%] w-[140px] h-[230px] bg-white/70 rounded-[80px] rotate-[-30deg] shadow-md"></div>
                  {/* CUSTOM SVG BLOB */}
                  <div className="absolute left-[64%] top-[10%] w-[250px] opacity-40 z-0">
                    <svg
                      viewBox="0 0 351 219"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-auto"
                    >
                      <path
                        d="M231.79 0.464298C204.255 2.97426 178.709 15.875 160.344 36.5443C151.236 46.8551 139.546 54.554 126.476 58.8493C113.406 63.1446 99.428 63.8813 85.979 60.9837C74.7497 58.5275 63.0913 58.8408 52.0101 61.8965C40.9289 64.9522 30.7577 70.6584 22.3742 78.5228C13.9908 86.3872 7.64695 96.1734 3.89021 107.037C0.133474 117.901 -0.923335 129.515 0.811016 140.878C2.54537 152.242 7.01877 163.012 13.8451 172.26C20.6715 181.509 29.6459 188.957 39.9936 193.962C50.3414 198.968 61.7517 201.38 73.2399 200.991C84.7281 200.602 95.9491 197.423 105.935 191.729C127.923 179.165 155.38 180.347 175.483 195.757C189.585 206.56 206.111 213.757 223.626 216.722C241.14 219.688 259.114 218.334 275.987 212.776C292.859 207.218 308.119 197.626 320.443 184.831C332.766 172.037 341.78 156.428 346.701 139.359C351.622 122.29 352.302 104.278 348.682 86.8868C345.062 69.4956 337.25 53.2511 325.927 39.5641C314.603 25.877 300.109 15.1613 283.704 8.34735C267.299 1.53344 249.478 -1.17257 231.79 0.464298Z"
                        fill="#40E6FF"
                        fillOpacity="0.2"
                      />
                    </svg>
                  </div>
                  {/* PROFILE IMAGE */}
                  <div className="absolute left-[68%] top-[14%] w-[165px] h-[245px] rounded-full overflow-hidden border-4 border-white z-20">
                    <img src="/portfolio.png" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* ABOUT SECTION */}
                <div className="w-full bg-white px-6 md:px-12 lg:px-20 py-16 md:py-24">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">About</h2>
                    <span className="bg-[#c4ff0b] text-gray-900 font-extrabold px-3 py-1 rounded-full text-2xl md:text-3xl tracking-tight leading-none">Me</span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-16 max-w-4xl leading-tight">
                    Described Briefly My Professional<br className="hidden md:block" /> Background Skills and Accomplishments
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 border-b border-white pb-6">
                    {/* Left: Image with Hire Me button */}
                    <div className="lg:col-span-4 relative mt-8 lg:mt-0">
                      <div className="rounded-3xl overflow-hidden aspect-[4/5] w-full relative bg-gray-100">
                        {/* background pattern/color for the image */}
                        <div className="absolute top-0 right-0 w-[80%] h-full bg-[#f9db79] [clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)] z-0"></div>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3" alt="Profile" className="w-full h-full object-cover relative z-10 mix-blend-multiply" />
                      </div>
                      {/* Hire Me Button */}
                      <button className="absolute -bottom-8 -left-6 md:-left-8 z-20 w-32 h-32 md:w-36 md:h-36 bg-[#c4ff0b] text-gray-900 font-semibold rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform hover:shadow-xl group">
                        <span className="border-b border-gray-900 leading-tight">Hire Me</span>
                        <span className="ml-1 text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform font-light">↗</span>
                      </button>
                    </div>

                    {/* Right: Info and Skills */}
                    <div className="lg:col-span-8 flex flex-col justify-center mt-10 lg:mt-0">
                      <p className="font-extrabold text-gray-800 text-xl md:text-2xl mb-6 leading-snug">
                        Hello ! I'm Professorial UI UX Designer Providing awesome cool design stuff for client. My vision is to satisfy my client
                      </p>
                      <p className="text-gray-500 font-medium mb-12 leading-loose text-lg">
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum.
                      </p>

                      {/* Progress Bars */}
                      <div className="space-y-8">
                        {[
                          { name: "Photoshop", value: 90 },
                          { name: "Figma", value: 80 },
                          { name: "HTML", value: 85 },
                          { name: "CSS", value: 75 },
                        ].map((skill) => (
                          <div key={skill.name}>
                            <div className="flex justify-between mb-3 border-b-2 border-transparent">
                              <span className="font-bold text-gray-800 text-lg">{skill.name}</span>
                              <span className="text-gray-500 font-medium">{skill.value}%</span>
                            </div>
                            <div className="w-full bg-gray-300 h-2 md:h-[6px] overflow-hidden relative">
                              <div className="bg-[#1a3636] h-full" style={{ width: `${skill.value}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* EDUCATION & EXPERIENCE SECTION */}
                <div className="w-full bg-white px-6 md:px-12 lg:px-20 pb-16 lg:pb-24">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    {/* Education Column */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Education</h3>

                      <div className="space-y-6">
                        {/* Item 1 */}
                        <div className="flex gap-6 items-center border-b border-gray-100 pb-6">
                          <div className="w-12 h-12 shrink-0 bg-[#1a3636] text-white rounded-full flex justify-center items-center font-bold text-sm">
                            01
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm mb-1 font-medium">March 2013 - 2016</p>
                            <h4 className="text-lg font-bold text-gray-800">Computer Science</h4>
                          </div>
                        </div>

                        {/* Item 2 */}
                        <div className="flex gap-6 items-center border-b border-gray-100 pb-6">
                          <div className="w-12 h-12 shrink-0 bg-[#1a3636] text-white rounded-full flex justify-center items-center font-bold text-sm">
                            02
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm mb-1 font-medium">March 2017 - 2018</p>
                            <h4 className="text-lg font-bold text-gray-800">Graphic Design</h4>
                          </div>
                        </div>

                        {/* Item 3 */}
                        <div className="flex gap-6 items-center border-b border-gray-100 pb-6">
                          <div className="w-12 h-12 shrink-0 bg-[#1a3636] text-white rounded-full flex justify-center items-center font-bold text-sm">
                            03
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm mb-1 font-medium">June 2019 - 2021</p>
                            <h4 className="text-lg font-bold text-gray-800">Web Development</h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Experience Column */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Experience</h3>

                      <div className="space-y-6">
                        {/* Item 1 */}
                        <div className="flex gap-6 items-center border-b border-gray-100 pb-6">
                          <div className="w-12 h-12 shrink-0 bg-[#1a3636] text-white rounded-full flex justify-center items-center font-bold text-sm">
                            01
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm mb-1 font-medium">January 2021 - 2022</p>
                            <h4 className="text-lg font-bold text-gray-800">Microsoft</h4>
                          </div>
                        </div>

                        {/* Item 2 */}
                        <div className="flex gap-6 items-center border-b border-gray-100 pb-6">
                          <div className="w-12 h-12 shrink-0 bg-[#1a3636] text-white rounded-full flex justify-center items-center font-bold text-sm">
                            02
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm mb-1 font-medium">March 2022 - 2023</p>
                            <h4 className="text-lg font-bold text-gray-800">Google Inc</h4>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}

                {/* MY SERVICES SECTION */}
                <div className="w-full bg-white px-6 md:px-12 lg:px-20 pb-16 lg:pb-24">
                  <div className="text-center mb-16">
                    <h2 className="text-base font-bold flex items-center justify-center gap-1 mb-4 text-gray-800 tracking-wide">
                      My <span className="bg-[#c4ff0b] text-gray-900 px-2 py-0.5 rounded text-sm font-extrabold ml-1">Services</span>
                    </h2>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 max-w-2xl mx-auto leading-tight">
                      Provide Wide Range of <br className="hidden md:block" /> Digital Services
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {[
                      { id: "01", title: "Web Development", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting." },
                      { id: "02", title: "UI / UX DESIGN", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting." },
                      { id: "03", title: "eCommerce Solution", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting." },
                      { id: "04", title: "CMS Development", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting." },
                      { id: "05", title: "Web Design", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting." },
                      { id: "06", title: "3D Printing", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting." },
                      { id: "07", title: "App Development", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting." },
                      { id: "08", title: "Marketing", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting." },
                    ].map((service) => (
                      <div key={service.id} className="border border-gray-200 rounded-[20px] p-6 lg:p-8 flex flex-col items-start transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white group hover:border-gray-300 cursor-pointer">
                        <div className="w-12 h-12 mb-6 flex items-center justify-center text-gray-800">
                          {service.id === "01" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>}
                          {service.id === "02" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>}
                          {service.id === "03" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>}
                          {service.id === "04" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><circle cx="12" cy="10" r="2"></circle></svg>}
                          {service.id === "05" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path></svg>}
                          {service.id === "06" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>}
                          {service.id === "07" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>}
                          {service.id === "08" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h1.76a1 1 0 0 1 .84.45l2.4 3.6a1 1 0 0 1-.84 1.55H11z"></path><path d="M18 10h-2V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4z"></path></svg>}
                        </div>
                        <h4 className="text-[17px] font-bold text-gray-900 mb-3">{service.title}</h4>
                        <p className="text-gray-500 text-[13px] leading-relaxed mb-8">
                          {service.desc}
                        </p>
                        <div className="mt-auto flex items-center gap-1.5 w-full">
                          <div className="w-[30px] h-[30px] rounded-full bg-[#1a3636] text-white flex items-center justify-center text-[11px] font-semibold shrink-0 group-hover:bg-[#c4ff0b] group-hover:text-gray-900 transition-colors">
                            {service.id}
                          </div>
                          <div className="flex items-center text-gray-300 group-hover:text-gray-900 transition-colors">
                            <span className="w-8 h-[1px] bg-current"></span>
                            <FaArrowRight size={10} className="-ml-[2px]" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MY PROJECTS SECTION */}

                <div className="w-full bg-white px-0 md:px-6 lg:px-12 pb-16 lg:pb-24 relative overflow-hidden">

                  <div className="px-6 md:px-6 lg:px-8 mb-12">
                    <h2 className="text-base font-bold flex items-center gap-1 mb-4 text-gray-800 tracking-wide w-max">
                      My <span className="bg-[#c4ff0b] text-gray-900 px-2 py-0.5 rounded-full text-sm font-extrabold ml-1 leading-none shadow-sm flex items-center h-6">Projects</span>
                    </h2>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 max-w-2xl leading-[1.15]">
                      Showcase Your Talent with our <br className="hidden md:block" /> Latest Works
                    </h3>
                  </div>


                  <div
                    id="projects-slider"
                    className="w-full overflow-x-auto flex gap-6 px-6 md:px-6 lg:px-8 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {[
                      {
                        tag: "Graphics Design",
                        title: "UI / UX Mobile App Design",
                        img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&h=500&fit=crop"
                      },
                      {
                        tag: "UI UX Design",
                        title: "Website Template Design",
                        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=500&fit=crop"
                      },
                      {
                        tag: "Programming",
                        title: "ISO App Development",
                        img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=500&fit=crop"
                      },
                      {
                        tag: "Graphics Design",
                        title: "HandCraft With Palm fan",
                        img: "https://images.unsplash.com/photo-1613588718956-62145e54d68d?w=500&h=500&fit=crop"
                      },
                      {
                        tag: "Marketing",
                        title: "Social Media Marketing",
                        img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop"
                      },
                      {
                        tag: "Development",
                        title: "Full Stack Web Application",
                        img: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=500&h=500&fit=crop"
                      }
                    ].map((proj, i) => (
                      <div key={i} className="flex flex-col flex-none w-[220px] md:w-[240px] shrink-0 snap-start cursor-pointer group">
                        <div className="w-full aspect-square rounded-[20px] overflow-hidden mb-5 relative border border-gray-100 shadow-sm">
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10 w-full h-full"></div>
                          <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="flex items-start mb-3">
                          <span className="bg-[#c4ff0b] border border-gray-900 text-gray-900 px-3.5 py-1.5 rounded-full text-[11px] font-semibold leading-none">
                            {proj.tag}
                          </span>
                        </div>
                        <h4 className="font-bold text-[15px] text-gray-900 leading-snug group-hover:text-[#1a3636] transition-colors mt-1">{proj.title}</h4>
                      </div>
                    ))}
                  </div>


                  <div className="flex items-center justify-center gap-6 mt-6 w-full relative">
                    <button
                      onClick={() => {
                        const slider = document.getElementById('projects-slider');
                        if (slider) slider.scrollBy({ left: -280, behavior: 'smooth' });
                      }}
                      className="flex items-center justify-center p-2 group hover:opacity-70 transition-opacity cursor-pointer"
                      aria-label="Slide Left"
                    >
                      <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 5L5 10L10 15M5 10H55" stroke="#1a3636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        const slider = document.getElementById('projects-slider');
                        if (slider) slider.scrollBy({ left: 280, behavior: 'smooth' });
                      }}
                      className="flex items-center justify-center p-2 group hover:opacity-70 transition-opacity cursor-pointer"
                      aria-label="Slide Right"
                    >
                      <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 5L55 10L50 15M55 10H5" stroke="#1a3636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <button
                      className="absolute right-6 md:right-8 bg-[#1a3636] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-transform"
                      aria-label="Scroll to top"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                    </button>
                  </div>
                </div>

                {/* CONTACT SECTION */}
                <div className="w-full bg-[#f8fafc] px-6 md:px-12 lg:px-20 py-16 lg:py-24 relative border-t border-gray-100">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    <div>
                      <h2 className="text-base font-bold flex items-center gap-1 mb-4 text-gray-800 tracking-wide w-max">
                        Get In <span className="bg-[#c4ff0b] text-gray-900 px-2 py-0.5 rounded-full text-sm font-extrabold ml-1 leading-none shadow-sm flex items-center h-6">Touch</span>
                      </h2>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 max-w-2xl leading-[1.15] mb-6">
                        Let’s build something <br className="hidden md:block" />  great together.
                      </h3>
                      <p className="text-gray-600 mb-8 max-w-md">
                        Fill out the form or reach out via email to discuss how we can work together to bring your ideas to life.
                      </p>

                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-[#1a3636]">
                            <FaEnvelope size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Email</p>
                            <p className="text-gray-900 font-bold">hello@example.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-[#1a3636]">
                            <FaMobileAlt size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Phone</p>
                            <p className="text-gray-900 font-bold">+1 (555) 000-0000</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Your Name</label>
                            <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4ff0b] focus:border-transparent transition-all" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Your Email</label>
                            <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4ff0b] focus:border-transparent transition-all" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Subject</label>
                          <input type="text" placeholder="Web Design Inquiry" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4ff0b] focus:border-transparent transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Message</label>
                          <textarea rows={4} placeholder="Tell us about your project..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4ff0b] focus:border-transparent transition-all resize-none"></textarea>
                        </div>
                        <button className="w-full bg-[#1a3636] hover:bg-gray-900 text-white font-bold rounded-xl px-4 py-3.5 text-sm transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-gray-900/20">
                          Send Message
                          <FaPaperPlane className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </form>
                    </div>

                  </div>
                </div>

                {/* PORTFOLIO FOOTER */}
                <footer className="w-full bg-[#1a3636] text-white py-12 px-6 md:px-12 lg:px-20 relative rounded-b-xl">
                  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-10">

                    <div className="flex flex-col items-center md:items-start gap-4">
                      <div className="text-xl font-black tracking-widest uppercase flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#c4ff0b] text-[#06224C] rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          S
                        </div>
                        Srinivas
                      </div>
                      <p className="text-sm text-gray-300 max-w-sm text-center md:text-left leading-relaxed">
                        A passionate UI/UX Designer crafting beautiful, engaging, and user-friendly digital experiences.
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {["Twitter", "LinkedIn", "Instagram", "Globe"].map((platform) => (
                        <a key={platform} href="#_" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#c4ff0b] hover:text-[#06224C] hover:border-[#c4ff0b] transition-all transform hover:-translate-y-1">
                          {platform === "Twitter" && <FaXTwitter size={14} />}
                          {platform === "LinkedIn" && <FaLinkedinIn size={14} />}
                          {platform === "Instagram" && <FaInstagram size={14} />}
                          {platform === "Globe" && <FaGlobe size={14} />}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-6 gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-6 font-medium">
                      <span className="hover:text-[#c4ff0b] cursor-pointer transition-colors">Home</span>
                      <span className="hover:text-[#c4ff0b] cursor-pointer transition-colors">About</span>
                      <span className="hover:text-[#c4ff0b] cursor-pointer transition-colors">Services</span>
                      <span className="hover:text-[#c4ff0b] cursor-pointer transition-colors">Projects</span>
                      <span className="hover:text-[#c4ff0b] cursor-pointer transition-colors">Contact</span>
                    </div>

                    <p>© 2026 Srinivas Pentakota. All rights reserved.</p>
                  </div>
                </footer>

              </div>
            </div>

            {/* <div className="w-full flex items-center justify-between mt-8 px-4"> */}
            <div className="w-full flex items-center justify-between px-4 py-3 border-t bg-white">


              <button className="h-10 px-4 rounded-lg flex items-center gap-2 text-blue-800 border border-blue-600 bg-transparent hover:bg-blue-50">
                Help
              </button>


              <div className="h-10 flex items-center justify-center rounded-lg px-3 gap-3 bg-transparent border border-blue-600">
                <button className="h-full px-3 rounded flex items-center text-blue-800 hover:bg-blue-50">
                  <FaLaptop />
                </button>
                <button className="h-full px-3 rounded flex items-center text-blue-800 hover:bg-blue-50">
                  <FaMobileAlt />
                </button>
                <button className="h-full px-3 rounded flex items-center text-blue-800 hover:bg-blue-50">
                  <FaTabletAlt />
                </button>
                <button className="h-full px-3 rounded flex items-center text-blue-800 hover:bg-blue-50">
                  <FaSearch />
                </button>
              </div>


              <button className="h-10 px-4 rounded-lg flex items-center gap-2 text-blue-800 border border-blue-600 bg-transparent hover:bg-blue-50">
                Zoom
              </button>

            </div>
          </div>


        </div>

        {/* RIGHT SIDEBAR */}
        {/* RIGHT TOGGLE BUTTON */}
        <button
          onClick={() => setShowRightSidebar(true)}
          className="lg:hidden fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#06224C] text-white px-2 py-3 rounded-l-md shadow-md"
        >
          ◀
        </button>

        <aside
          className={`
            fixed lg:static top-0 right-0 h-full z-50 overflow-y-auto shrink-0
            w-52 bg-[#06224C] text-white flex flex-col p-4 space-y-4
            transform transition-transform duration-300
            ${showRightSidebar ? "translate-x-0" : "translate-x-full"}
            lg:translate-x-0 lg:flex
          `}
        >
          <button
            onClick={() => setShowRightSidebar(false)}
            className="lg:hidden text-white self-end mb-2"
          >
            ✕
          </button>

          {/* Tabs */}
          <div className="flex justify-center gap-6 text-sm font-semibold mt-6">
            <button
              onClick={() => setActiveTab("properties")}
              className={`pb-1 border-b-2 ${activeTab === "properties" ? "border-white" : "border-transparent"
                }`}
            >
              Properties
            </button>

            <span className="select-none">|</span>

            <button
              onClick={() => setActiveTab("styles")}
              className={`pb-1 border-b-2 ${activeTab === "styles" ? "border-white" : "border-transparent"
                }`}
            >
              Styles
            </button>
          </div>

          {/* ================= PROPERTIES ================= */}
          {activeTab === "properties" && (
            <div>

              {/* Image Settings */}
              <div className="mb-6">
                <div
                  onClick={() => setShowImageSettings(!showImageSettings)}
                  className="flex justify-between cursor-pointer mb-4"
                >
                  <p className="text-sm font-semibold">Image Settings</p>
                  <FaChevronDown
                    className={`text-xs transition ${showImageSettings ? "rotate-180" : ""
                      }`}
                  />
                </div>

                {showImageSettings && (
                  <div className="space-y-5">

                    {/* Width */}
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-300 flex-1">Width</p>
                      <input
                        defaultValue="420 px"
                        className="w-[80px] bg-transparent border border-blue-400 rounded-full px-3 py-1 text-xs text-white text-center focus:outline-none"
                      />
                    </div>

                    {/* Height */}
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-300 flex-1">Height</p>
                      <input
                        defaultValue="520 px"
                        className="w-[80px] bg-transparent border border-blue-400 rounded-full px-3 py-1 text-xs text-white text-center focus:outline-none"
                      />
                    </div>

                    {/* Border Radius */}
                    <div>
                      <p className="text-sm text-gray-300 mb-2">Border Radius</p>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          className="w-20 h-1 bg-blue-200 rounded-lg cursor-pointer accent-blue-500"
                        />
                        <input
                          defaultValue="12 px"
                          className="w-20 bg-transparent border border-blue-400 rounded-full px-3 py-1 text-xs text-white text-center"
                        />
                      </div>
                    </div>

                    {/* Shadow Toggle */}
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-300">Shadow</p>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-8 h-4 bg-gray-400 rounded-full peer peer-checked:bg-blue-500
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                    after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all
                    peer-checked:after:translate-x-4">
                        </div>
                      </label>
                    </div>

                    {/* Border Radius again */}
                    <div>
                      <p className="text-sm text-gray-300 mb-2">Opacity</p>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          className="w-20 h-1 bg-blue-200 rounded-lg cursor-pointer accent-blue-500"
                        />
                        <input
                          defaultValue="12 px"
                          className="w-20 bg-transparent border border-blue-400 rounded-full px-3 py-1 text-xs text-white text-center"
                        />
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Position Section */}
              <div className="mb-6">
                <div
                  onClick={() => setShowPosition(!showPosition)}
                  className="flex justify-between cursor-pointer mb-4"
                >
                  <p className="text-sm font-semibold">Position</p>
                  <FaChevronDown
                    className={`text-xs transition ${showPosition ? "rotate-180" : ""
                      }`}
                  />
                </div>

                {showPosition && (
                  <div className="space-y-5">

                    {/* Position */}
                    <div>
                      <p className="text-sm text-gray-300 mb-2">Position</p>
                      <button className="w-full border border-white/30 rounded py-2 text-sm">
                        Center
                      </button>
                    </div>

                    {/* Margin */}
                    <div>
                      <p className="text-sm text-gray-300 mb-2">Margin</p>
                      <button className="w-full border border-white/30 rounded py-2 text-sm">
                        24px
                      </button>
                    </div>

                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= STYLES ================= */}
          {activeTab === "styles" && (
            <div>

              <p className="text-sm text-gray-300 mb-6">Style Settings</p>

              <div className="space-y-6">

                <div>
                  <p className="text-xs text-gray-300 mb-1">Margin</p>
                  <input
                    defaultValue="24px"
                    className="w-full rounded bg-[#081F40] p-2 text-white"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-300 mb-1">Padding</p>
                  <input className="w-full rounded bg-[#081F40] p-2 text-white" />
                </div>

                <div>
                  <p className="text-xs text-gray-300 mb-1">Background Color</p>
                  <input type="color" className="w-full h-10" />
                </div>

                <div>
                  <p className="text-xs text-gray-300 mb-1">Shadow</p>
                  <label className="flex gap-2">
                    <input type="checkbox" />
                    Enable
                  </label>
                </div>

              </div>
            </div>
          )}

        </aside>


      </div>
      <footer className="w-full bg-[#051b3b] text-white shrink-0 py-12 border-t-2 border-gray-300">
        <div className="max-w-[1200px] mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

            {/* Column 1 */}
            <div className="flex flex-col gap-8 md:col-span-1">

              {/* TITLE */}
              {/* <h3 className="text-white font-black text-sm uppercase tracking-wider">
    Subscribe to our Updates
  </h3> */}

              {/* FORM */}
              {/* <form className="max-w-[260px] flex items-center gap-2">
                <div className="flex-grow relative">

               
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white text-black text-sm outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

           
                <button
                  type="submit"
                  className="text-white hover:text-blue-300 transition group"
                >
                  <FaPaperPlane className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>

              </form> */}
              <form
                onSubmit={handleEmailSubmit}
                className="max-w-[260px] flex flex-col items-start gap-1"
              >
                <div className="flex items-center gap-2 w-full">
                  {/* INPUT */}
                  <div className="flex-grow relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                    <input
                      type="text"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      className={`w-full pl-11 pr-4 py-2.5 rounded-full bg-white text-black text-sm outline-none focus:ring-2 ${emailError ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-blue-400"}`}
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
                  <span className="text-red-400 text-xs ml-4 font-medium">{emailError}</span>
                )}
              </form>

              {/* ADDRESS */}
              <div className="text-[13px] text-white/80 leading-relaxed space-y-1">
                <h4 className="font-bold text-white mb-3 text-[15px]">Headquarters</h4>
                <p>MMR COMPLEX, SALEM,</p>
                <p>Tamil Nadu 636008</p>
              </div>

            </div>

            {/* PRODUCT */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white text-[15px]">Product</h3>
              <ul className="flex flex-col gap-3 text-[13px] text-white/70">
                <Link href="/page-not-found" className="hover:text-white cursor-pointer">
                  Features
                </Link>
                <Link href="/page-not-found" className="hover:text-white cursor-pointer">
                  Templates
                </Link>
                <Link href="/page-not-found" className="hover:text-white cursor-pointer">
                  Pricing
                </Link>
                <Link href="/page-not-found" className="hover:text-white cursor-pointer">
                  Changelog
                </Link>
              </ul>
            </div>

            {/* RESOURCES */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white text-[15px]">Resources</h3>
              <ul className="flex flex-col gap-3 text-[13px] text-white/70">
                <Link href="/page-not-found" className="hover:text-white cursor-pointer">
                  Documentation
                </Link>
                <Link href="/page-not-found" className="hover:text-white cursor-pointer">
                  API Reference
                </Link>
                <Link href="/page-not-found" className="hover:text-white cursor-pointer">
                  Blog
                </Link>
                <Link href="/page-not-found" className="hover:text-white cursor-pointer">
                  Status
                </Link>
              </ul>
            </div>

            {/* COMPANY */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white text-[15px]">Company</h3>
              <ul className="flex flex-col gap-3 text-[13px] text-white/70">
                <Link href="/page-not-found" className="hover:text-white cursor-pointer">
                  About
                </Link>
                <Link href="/page-not-found" className="hover:text-white cursor-pointer">
                  Privacy Policy
                </Link>
                <Link href="/page-not-found" className="hover:text-white cursor-pointer">
                  Terms of Service
                </Link>
                <Link href="/page-not-found" className="hover:text-white cursor-pointer">
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


              <p className="text-[12px] text-white/70 max-w-[220px]">
                The <strong className="text-white">NO-CODE</strong> website builder for everyone. Powered by AWS infrastructure, built by The <strong className="text-white">Stackly</strong> team.
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
                className="hover:scale-110 hover:text-blue-600 transition"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://www.youtube.com/@TheStackly"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 hover:text-red-600 transition"
              >
                <FaYoutube size={14} />
              </a>
              <a
                href="https://www.instagram.com/the_stackly/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 hover:text-pink-600 transition"
              >
                <FaInstagram size={14} />
              </a>

              <a
                href="https://x.com/the_stackly"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 hover:text-black transition"
              >
                <FaXTwitter size={14} />
              </a>

              <a
                href="https://www.linkedin.com/company/the-stackly"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 hover:text-blue-700 transition"
              >
                <FaLinkedinIn size={14} />
              </a>

              <a
                href="https://www.thestackly.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 hover:text-green-600 transition"
              >
                <FaGlobe size={14} />
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
    </main >
  );
}
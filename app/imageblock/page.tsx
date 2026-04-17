"use client";

import { useState } from "react";
import Link from "next/link";

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
  FaUser,
  FaChevronUp,
  FaArrowRight,
  FaLaptop,
  FaMobileAlt,
  FaTabletAlt,
} from "react-icons/fa";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { FaEye, FaPen } from "react-icons/fa";

export default function ImageBlock() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [leftTab, setLeftTab] = useState("blocks");

  const [showBlocks, setShowBlocks] = useState(true);
  const [showLayout, setShowLayout] = useState(true);
  const [showBasic, setShowBasic] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(true);

  const [activeTab, setActiveTab] = useState("properties");
  const [activeNav, setActiveNav] = useState("Home");
  const [showImageSettings, setShowImageSettings] = useState(true);
  const [showPosition, setShowPosition] = useState(true);
  const [shadowEnabled, setShadowEnabled] = useState(false);
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
const [showRightSidebar, setShowRightSidebar] = useState(false);

  function toggleCart() {
    setCartCount((prev) => prev + 1);
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
      {/* ✅ MOBILE MENU */}
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
                className={`rounded-md border px-3 py-2 text-xs transition ${activeNav === item.name
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
    fixed lg:static top-0 left-0 h-full z-50
    w-56 bg-[#06224C] text-white flex flex-col p-4 space-y-3
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
            <div className="mt-2 space-y-1">

              {/* BASIC */}
              <div>
                <div
                  onClick={() => setShowBlocks(!showBlocks)}
                  className="flex justify-between cursor-pointer py-1 mb-2 items-center"
                >
                  <h3 className="text-sm pl-2 mb-2
                  ">Basic Blocks</h3>
                  {showBlocks ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                </div>

                {showBlocks && (
                  <div className="grid grid-cols-3 grid-rows-3 auto-rows-min justify-items-center content-between gap-y-3">

                    {/* Row 1 */}
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

                    {/* Row 2 - Full Width Button */}
                    <div className="col-span-3 w-full px-2">
                      <div className="relative w-full h-10">

                        {/* Bottom slanted shape */}
                        <div
                          className="absolute inset-y-0 left-0 w-[72%] bg-white
                 [clip-path:polygon(0%_8%,3%_0%,70%_0%,100%_100%,3%_100%,0%_92%)]
                 rounded-sm flex items-center justify-center"
                        >
                          <span className="text-xs font-medium text-gray-800">
                            All Basic
                          </span>
                        </div>

                        {/* Right rectangle (same height) */}
                        <div
                          className="absolute top-0 right-0 h-full w-[51%] 
                 bg-white/60 rounded-sm flex items-center justify-center"
                        >
                          <span className="text-xs font-medium text-gray-800">
                            Next
                          </span>
                        </div>

                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* BASIC */}

              <div className="mt-1">
                <div
                  onClick={() => setShowBasic(!showBasic)}
                  className="flex justify-between cursor-pointer mb-2 items-center"
                >
                  <h3 className="text-sm pl-2">Basic Blocks 1</h3>
                  {showBasic ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                </div>

                {showBasic && (
                  <div className="grid grid-cols-3 grid-rows-2  justify-items-center content-between">

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs hover:bg-blue-100 transition">
                      <FaVideo className="text-gray-800 text-sm" />
                      <span className="text-[8px] text-gray-800">Video</span>
                    </div>

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs">
                      <FaImage className="text-gray-800 text-sm" />
                      <span className="text-[8px] text-gray-800">Image</span>
                    </div>

                    <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs">
                      <FaSquare className="text-gray-800 text-sm" />
                      <span className="text-[8px] text-gray-800">Button</span>
                    </div>

                    {/* 
                                        <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs">
                                            <FaVideo className="text-gray-800 text-sm" />
                                            <span className="text-[8px] text-gray-800">Video</span>
                                        </div>

                                        <div className="bg-white w-10 h-10 rounded-md"></div>
                                        <div className="bg-white w-10 h-10 rounded-md"></div> */}
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
                  <div className="grid grid-cols-3 grid-rows-2 justify-items-center content-between">

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

                    {/* <div className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs">
                                            <FaWindowMinimize className="text-gray-800 text-sm" />
                                            <span className="text-[8px] text-gray-800">Footer</span>
                                        </div> */}

                  </div>
                )}
              </div>

              {/* ADVANCED */}
              {/* <div>
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
                            </div> */}
              <div className="px-2 ">
                <button className="w-full h-10 bg-white border border-[#06224C]/20 rounded-md flex items-center justify-between px-3 hover:bg-gray-50 transition">

                  {/* Left text */}
                  <span className="text-sm text-gray-800 font-medium">
                    Help
                  </span>

                  {/* Right icon */}
                  <FaUser className="text-gray-700 text-sm" />

                </button>
              </div>

            </div>
          )}

          {/* PAGES */}
          {leftTab === "pages" && (
            <div className="mt-6 space-y-4">
              {["Home Page", "About Us", "Contact", "Projects"].map((item) => (
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
        <div className="flex-1 bg-white justify-center">
          <div className="w-full max-w-[1200px] relative">

            {/* Canvas Box */}

            {/* IMAGE BLOCKS PAGE */}
          {/* MAIN CONTENT */}
<div className="flex-1 bg-white flex flex-col h-[calc(100vh-64px)] overflow-hidden mt-3 px-2 sm:px-4">

  <div className="w-full max-w-[1200px] mx-auto flex flex-col h-full">

    {/* ===== STICKY HEADER ===== */}
    <div className="sticky top-0 z-20 bg-white border border-[#06224C]/20 rounded-xl px-3 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

      {/* LEFT */}
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-gray-800">My Website</h2>
        <FaChevronDown className="text-xs text-gray-600" />
      </div>

      {/* CENTER */}
     <div className="flex flex-wrap items-center gap-2 justify-start sm:justify-end"> 
        <button className="w-8 h-8 flex items-center justify-center border rounded-md text-gray-600">↶</button>
        <button className="w-8 h-8 flex items-center justify-center border rounded-md text-gray-600">↷</button>

        <button className="px-2 md:px-3 py-1 text-xs border rounded-md text-gray-700">
          Save Draft
        </button>

        <button className="px-2 md:px-3 py-1 text-xs border rounded-md text-gray-700">
          Preview
        </button>

        <button className="px-2 md:px-3 py-1 text-xs bg-[#06224C] text-white rounded-md">
          Publish
        </button>
      </div>
    </div>

    {/* ===== SCROLLABLE CONTENT ===== */}
<div className="flex-1 overflow-y-auto mt-4 
  [scrollbar-width:none] 
  [-ms-overflow-style:none] 
  [&::-webkit-scrollbar]:hidden">

      <div className="border border-[#06224C]/20 rounded-xl bg-white overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#06224C]/10">
          <h2 className="text-md font-semibold text-gray-800">Image Blocks</h2>
          <button className="text-xl font-bold text-gray-600">✕</button>
        </div>

        {/* CONTENT */}
        <div className="p-4 md:p-5">

          {/* IMAGE PANEL */}
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Image Panel
          </h3>

          {/* ✅ RESPONSIVE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

            {/* CARD */}
            <div className="w-full bg-white rounded-xl border border-gray-100 p-3 flex flex-col items-center hover:shadow-md transition">
              <div className="w-full h-32 sm:h-36 md:h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-xs">Image Placeholder</span>
              </div>

              <p className="text-xs mt-2 text-gray-600 text-center">
                Upload image thumbnail
              </p>

              <button className="mt-2 px-3 py-1 text-xs bg-blue-900 text-white rounded-md">
                Upload or Browse Library
              </button>
            </div>

            {/* CARD */}
            <div className="w-full bg-white rounded-xl border border-gray-100 p-3 flex flex-col items-center hover:shadow-md transition">
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-lg"
              />

              <p className="text-xs mt-2 text-gray-600 text-center">
                Upload image thumbnail
              </p>

              <button className="mt-2 px-3 py-1 text-xs border border-blue-900 text-blue-900 rounded-md">
                Upload or Browse Library
              </button>
            </div>

            {/* CARD */}
            <div className="w-full bg-white rounded-xl border border-gray-100 p-3 flex flex-col items-center hover:shadow-md transition">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-lg"
              />

              <p className="text-xs mt-2 text-gray-600 text-center">
                Upload image thumbnail
              </p>

              <button className="mt-2 px-3 py-1 text-xs border border-blue-900 text-blue-900 rounded-md">
                Upload or Browse Library
              </button>
            </div>

          </div>

          {/* IMAGE GALLERY */}
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Image Gallery
          </h3>

          <div className="bg-white rounded-lg p-4 border">

            {/* ✅ RESPONSIVE GALLERY GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <img
                  key={item}
                  src={`https://picsum.photos/200?random=${item}`}
                  className="w-full h-20 sm:h-24 object-cover rounded-md"
                />
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Add Your Heading Here
            </p>
          </div>

        </div>
      </div>

    </div>

  </div>
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
    fixed lg:static top-0 right-0 h-full z-50
    w-56 bg-white flex flex-col p-4 border-l border-[#06224C]/30 space-y-6 shadow-sm
    transform transition-transform duration-300
    ${showRightSidebar ? "translate-x-0" : "translate-x-full"}
    lg:translate-x-0 lg:flex
  `}
>
<button
  onClick={() => setShowRightSidebar(false)}
  className="lg:hidden text-[#06224C] self-end mb-2"
>
  ✕
</button>
          {/* Tabs */}
          <div className="flex justify-center gap-6 text-sm font-semibold text-[#06224C]">
            <button className="pb-1 border-b-2 border-[#06224C]">Button</button>
            <span className="text-gray-400">|</span>
            <button className="text-gray-400">Style</button>
          </div>

          {/* SECTION: Bitone */}

          <div className="flex justify-between items-center cursor-pointer mb-4 mt-2">
            <p className="text-sm text-[#06224C]">Bitone Settings</p>
            <FaChevronDown className="text-sm" />
          </div>


          {/* SECTION: Button Label */}
          <div className="border-b pb-4 space-y-2">
            <p className="text-sm text-[#06224C]">Button Label</p>
            <input
              defaultValue="Click Me!"
              className="w-full border border-[#06224C] rounded-md px-3 py-2 text-sm text-[#06224C] focus:outline-none focus:ring-1 focus:ring-[#06224C]"
            />
          </div>

          {/* SECTION: Button Link */}
          <div className="border-b pb-4 space-y-2">
            <p className="text-sm text-[#06224C]">Button Link</p>
            <div className="flex items-center gap-2">
              <input
                defaultValue="#"
                className="flex-1 border border-[#06224C] rounded-md px-3 py-2 text-sm text-[#06224C]"
              />
              <button className="border border-[#06224C] px-2 py-1 rounded-md text-sm text-[#06224C] hover:bg-[#06224C] hover:text-white">
                +
              </button>
            </div>
          </div>

          {/* SECTION: Style */}
          <div className="border-b border-[#06224C]/20 pb-4 space-y-3">
            <p className="text-sm text-[#06224C] font-medium">Style</p>

            <div className="
    flex items-center justify-between
    px-3 h-10
    bg-white
    rounded-lg
    border border-[#06224C]/70
    shadow-[0px_4px_8px_rgba(0,0,0,0.12)]
  ">

              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#06224C] text-white">
                ●
              </button>

              <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#06224C] hover:bg-[#06224C] hover:text-white">
                ▶
              </button>

              <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#06224C] hover:bg-[#06224C] hover:text-white">
                ▬
              </button>

              <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#06224C] hover:bg-[#06224C] hover:text-white">
                ◻
              </button>

            </div>
          </div>

          {/* SECTION: Opacity */}
          <div className="border-b border-[#06224C]/20 pb-4 space-y-2">
            <p className="text-sm text-[#06224C]">Opacity</p>

            <div className="flex items-center gap-2">

              {/* Range */}
              <input
                type="range"
                className="flex-1 accent-[#06224C]"
                defaultValue={100}
              />

              {/* Small value box */}
              <input
                defaultValue="100%"
                className="w-14 border border-[#06224C] rounded-md px-2 py-1 text-xs text-[#06224C] text-center"
              />

            </div>
          </div>

          {/* SECTION: Position */}
         <div className="space-y-3">
  
  {/* Header */}
  <div className="flex justify-between items-center">
    <p className="text-sm text-[#06224C]">Position</p>
    <FaChevronDown className="text-xs text-[#06224C]" />
  </div>

  {/* OUTER BOX (matches SVG) */}
  <div className="
    flex items-center justify-between
    px-3 h-10
    bg-white
    rounded-lg
    border border-[#06224C]/70
    shadow-[0px_4px_8px_rgba(0,0,0,0.12)]
  ">

    {/* LEFT INPUT */}
    <input
      defaultValue="20"
      className="
        w-12
        text-sm
        text-[#06224C]
        outline-none
        bg-transparent
      "
    />

    {/* RIGHT ICON GROUP */}
    <div className="flex items-center gap-3 text-[#06224C]">

      <button className="p-1 hover:bg-[#06224C]/10 rounded transition
        transition-all duration-300 ease-in-out">
        ≡
      </button>

      <button className="p-1 hover:bg-[#06224C]/10 rounded transition">
        ⤢
      </button>

      <button className="p-1 hover:bg-[#06224C]/10 rounded transition">
        ⤡
      </button>

    </div>

  </div>

</div>
        </aside>

      </div>
     

    </main>
  );
}
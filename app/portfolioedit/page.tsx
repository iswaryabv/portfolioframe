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
   FaRegFileAlt , 
  FaChevronDown,
  FaChevronUp,
  FaArrowRight,
  FaLaptop,
  FaMobileAlt,
  FaTabletAlt,
} from "react-icons/fa";
import { FaEye, FaPen } from "react-icons/fa";

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
{/* ====== MAIN BUILDER LAYOUT ====== */}
<div className="flex flex-1">
<aside className="hidden lg:flex w-52 bg-[#06224C] text-white flex-col p-4 space-y-4 rounded-tr-3xl">

  {/* Tabs */}
  <div className="flex justify-center gap-6 text-sm font-semibold mt-6">
    
    <button
      onClick={() => setLeftTab("blocks")}
      className={`pb-1 border-b-2 ${
        leftTab === "blocks" ? "border-white" : "border-transparent"
      }`}
    >
      Blocks
    </button>

    <span>|</span>

    <button
      onClick={() => setLeftTab("pages")}
      className={`pb-1 border-b-2 ${
        leftTab === "pages" ? "border-white" : "border-transparent"
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
              < FaRegFileAlt  className="text-gray-800 text-sm" />
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
 <div className="flex-1 bg-white p-4 md:p-7 flex justify-center">
  <div className="w-full max-w-[1200px] relative">

    {/* Canvas Box */}
    <div className="w-full min-h-[530px] bg-[#FFF1F2] rounded-xl border-2 border-gray-300 flex flex-col relative overflow-hidden">

      {/* NAVBAR */}
      <div className="flex items-center justify-between px-4 md:px-10 py-5 border-b border-gray-300 bg-[#06224C] rounded-t-xl">

        {/* Logo */}
        {/* <div className="flex items-center">
          <div className="bg-white px-5 py-3 rounded-[60%] shadow-md">
            <img src="/stackly-logo.webp" className="h-6" />
          </div>
        </div> */}

        {/* Title */}
        <div className="text-lg font-semibold text-white">
          Portfolio
        </div>

        {/* Links (always visible) */}
       <div className="flex items-center gap-6 text-white">

  <span className="hover:text-gray-300 cursor-pointer">Home</span>
  <span className="hover:text-gray-300 cursor-pointer">About Us</span>
  <span className="hover:text-gray-300 cursor-pointer">Projects</span>

  {/* ✅ NEW BUTTONS */}
  <div className="flex items-center gap-2 ml-4">

    {/* Save Draft / Preview */}
    <div className="flex border border-gray-300 rounded-lg overflow-hidden text-sm whitespace-nowrap text-white">

      <button className="px-3 py-1 hover:bg-gray-100 hover:text-black">
        Save Draft
      </button>

      <div className="w-px bg-gray-300"></div>

     <button className="px-3 py-1 hover:bg-gray-100 hover:text-black flex items-center gap-1">
  Preview <FaEye />
</button>

    </div>

    {/* Edit Button */}
   <button className="px-3 py-1 border border-gray-300 rounded-lg text-white hover:bg-blue-100 hover:text-black flex items-center gap-1">
  Edit <FaPen />
</button>

  </div>
</div>

      </div>

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

        <div className="flex gap-4 mt-5">
          {/* <button className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700">
            Edit
          </button> */}

          <button className="px-6 py-2 border border-gray-800 text-white-600 bg-blue-800 rounded-lg hover:bg-gray-700">
            View My Works
          </button>

          <button className="px-6 py-2 border border-gray-800 text-blue-800 rounded-lg hover:bg-gray-700">
            Watch Video
          </button>
        </div>

        {/* DEVICE CONTROLS (always visible) */}
        {/* <div className="flex items-center gap-4 mt-6 border border-gray-300 rounded-lg p-2 bg-white shadow-sm w-fit">
          <button className="px-3 py-2 border rounded hover:bg-gray-100">💻</button>
          <button className="px-3 py-2 border rounded hover:bg-gray-100">📱</button>
          <button className="px-3 py-2 border rounded hover:bg-gray-100">📟</button>
        </div> */}

        {/* STATS */}
      <div className="flex justify-between mt-8 mb-6 w-full">
  {[
    { value: "5+", label: "Years of Experience" },
    { value: "120+", label: "Projects Done" },
    { value: "98%", label: "Clients Satisfaction" },
  ].map((item, i) => (
    <div key={i} className="w-50 bg-white h-28 rounded-lg shadow-md flex flex-col items-center justify-center text-gray-700">
      <h5 className="text-2xl font-bold">{item.value}</h5>
      <span className="text-sm mt-1">{item.label}</span>
    </div>
  ))}
</div>

      </div>

      {/* BLOBS */}

      <div className="absolute left-[60%] top-[30%] w-[300px] h-[300px] bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300 opacity-20 blur-2xl rounded-full"></div>

      <div className="absolute left-[65%] top-[28%] w-[200px] h-[150px] bg-cyan-300 opacity-20 blur-2xl rounded-full"></div>

      <div className="absolute left-[65%] top-[43%] w-[100px] h-[100px] bg-pink-400 opacity-20 rounded-full"></div>

      {/* White shape */}
      <div className="absolute left-[69%] top-[26%] w-[140px] h-[230px] bg-white/70 rounded-[80px] rotate-[-30deg] shadow-md"></div>

      {/* PROFILE IMAGE */}
      <div className="absolute left-[68%] top-[26%] w-[165px] h-[245px] rounded-full overflow-hidden border-4 border-white z-20">
        <img src="/portfolio.png" className="w-full h-full object-cover" />
      </div>

    </div>

  <div className="w-full flex items-center justify-between mt-8 px-4">

  {/* Left: Help Button */}
  <button className="h-10 px-4 rounded-lg flex items-center gap-2 text-blue-800 border border-blue-600 bg-transparent hover:bg-blue-50">
    Help
  </button>

  {/* Center: Device Icons */}
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

  {/* Right: Zoom Button */}
  <button className="h-10 px-4 rounded-lg flex items-center gap-2 text-blue-800 border border-blue-600 bg-transparent hover:bg-blue-50">
    Zoom
  </button>

</div>
  </div>

  
</div>

  {/* RIGHT SIDEBAR */}
   <aside className="hidden lg:flex w-52 bg-[#06224C] text-white flex flex-col p-4 space-y-4">

    {/* Tabs */}
    <div className="flex justify-center gap-6 text-sm font-semibold mt-6">
      <button
        onClick={() => setActiveTab("properties")}
        className={`pb-1 border-b-2 ${
          activeTab === "properties" ? "border-white" : "border-transparent"
        }`}
      >
        Properties
      </button>

      <span className="select-none">|</span>

      <button
        onClick={() => setActiveTab("styles")}
        className={`pb-1 border-b-2 ${
          activeTab === "styles" ? "border-white" : "border-transparent"
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
              className={`text-xs transition ${
                showImageSettings ? "rotate-180" : ""
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
                    className="flex-1 h-1 bg-blue-200 rounded-lg cursor-pointer accent-blue-500"
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
                <p className="text-sm text-gray-300 mb-2">Border Radius</p>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    className="flex-1 h-1 bg-blue-200 rounded-lg cursor-pointer accent-blue-500"
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
              className={`text-xs transition ${
                showPosition ? "rotate-180" : ""
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
     
    </main>
  );
}
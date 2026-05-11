"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";
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
import { FaXTwitter,FaCartShopping, FaHeart, FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import {  FaChevronDown,FaChevronRight, FaPager,FaChartLine,FaBriefcase,FaPlane, FaUtensils,FaHouseChimney, FaBed,FaPenNib,
  FaCamera, FaGraduationCap, FaNewspaper,
  } from "react-icons/fa6";

const NAV_ITEMS = [
  { id: "home" as const, label: "Home", href: "/" },
  { id: "about" as const, label: "About Us", href: "/page-not-found" },
  { id: "products" as const, label: "Our Products", href: "/page-not-found" },
  { id: "categories" as const, label: "Categories", href: "/page-not-found" },
  { id: "contact" as const, label: "Contact", href: "/page-not-found" },
];

type NavId = (typeof NAV_ITEMS)[number]["id"];

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [innerMobileMenuOpen, setInnerMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeNav, setActiveNav] = useState<NavId>("home");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

    const [productsOpen, setProductsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);


    const [mobileOpen, setMobileOpen] = useState(false);

  const [categoriesOpen, setCategoriesOpen] = useState(false);

 
  // Mobile submenu state
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
 

    useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
        setCategoriesOpen(false);
        setProfileOpen(false);
      }
    }
 
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 
  const closeAll = () => {
    setProductsOpen(false);
    setCategoriesOpen(false);
    setProfileOpen(false);
    setMobileOpen(false);
    setMobileProductsOpen(false);
    setMobileCategoriesOpen(false);
    setExpandedCategory(null);
  };
 
  useEffect(() => {
    closeAll();
  }, [pathname]);
 
  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileOpen(prev => !prev);
    setProductsOpen(false);
    setCategoriesOpen(false);
    setProfileOpen(false);
  };
 
  const toggleProductsDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setProductsOpen(prev => !prev);
    setCategoriesOpen(false);
    setProfileOpen(false);
  };
 
  const toggleCategoriesDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCategoriesOpen(prev => !prev);
    setProductsOpen(false);
    setProfileOpen(false);
  };
 
  const toggleProfileMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setProfileOpen(prev => !prev);
    setProductsOpen(false);
    setCategoriesOpen(false);
  };
 
  const toggleCategoryExpansion = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedCategory(prev => prev === title ? null : title);
  };
 
  const handleMockNav = (e: React.MouseEvent) => {
    e.preventDefault();
    closeAll();
  };
 
  const categoriesData = [
    {
      title: "LANDING PAGE", icon: "fa-pager", items: [
        "Lead Generating Page", "Click-through Page", "Sales Page", "Product Page", "App Page", "Pre-launch Page", "Event Page", "Splash Page", "Others..."
      ]
    },
    {
      title: "DASHBOARD", icon: "fa-chart-line", items: [
        "Admin Analytics", "Overview", "User Profile", "Sales", "Marketing", "Finance"
      ]
    },
    {
      title: "PORTFOLIO", icon: "fa-briefcase", items: [
        "Designer", "Developer", "Agency", "Minimal", "Personal", "Freelancer", "Others"
      ]
    },
    {
      title: "FOOD", icon: "fa-utensils", items: [
        "Burger House", "Pizza Corner", "Fresh & Natural", "Food Stories", "Others"
      ]
    },
    {
      title: "TRAVEL", icon: "fa-plane", items: [
        "Adventure", "Luxury", "Leisure", "Solo Trip", "Family", "Group", "Others"
      ]
    },
    {
      title: "REAL ESTATE", icon: "fa-house-chimney", items: [
        "Luxury & Premium", "General", "Commercial", "Residential", "Vacation/Rental", "Modern & Startup", "Portal", "Others"
      ]
    },
    {
      title: "HOTEL", icon: "fa-bed", items: [
        "Resort & Vacation", "Luxury & Premium Style", "Nature & Eco", "Modern & Business", "Boutique & Unique", "Budget & Simple", "Others"
      ]
    },
    {
      title: "BLOG", icon: "fa-pen-nib", items: [
        "Corporate", "Travel & Life", "Food & Health", "Modern News", "Finance", "Education", "Portfolio", "Minimal", "Others"
      ]
    },
    {
      title: "EDUCATION", icon: "fa-graduation-cap", items: [
        "EduSpark", "LearnSphere", "Bright Future", "Skillbridge", "NextGen", "Others"
      ]
    },
    {
      title: "NEWSPAPER", icon: "fa-newspaper", items: [
        "Daily Pulse", "Global Times", "NextWave", "The Update Hub", "Prime Report", "Headline Express", "Insight News", "Others"
      ]
    },
    {
      title: "PHOTOGRAPHY", icon: "fa-camera", items: [
        "Wedding", "Baby & Kids", "Fashion", "Studio Personal", "General/Portfolio", "Travel", "Event", "Food", "Others"
      ]
    }
  ];

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
    <main className="flex flex-col min-h-screen bg-white pt-[70px]">
     
           {/* <nav className="fixed top-0 left-0 w-full z-[9999] bg-[#06224C] border-b border-white/10 px-3 md:px-12 py-3 shadow-sm">
            <div className="flex items-center justify-between">
      
            
              <div className="flex items-center gap-4">
      
          
                <button className="lg:hidden text-white">
                  <FaBars />
                </button>
      
        
                <div>
                  <a href="#" 
                    className="flex h-7 w-[80px] sm:h-9 sm:min-w-[104px] shrink-0 items-center justify-center overflow-hidden rounded-[50%] bg-white px-2 sm:px-3 transition-all">
                    <Image
                      src="/stackly-logo.webp"
                      alt="logo"
                      width={80}
                      height={30}
                      className="object-contain"
                    />
                  </a>
                </div>
      
        
                <div className="hidden lg:flex items-center gap-6 text-white text-sm font-bold uppercase">
      <Link href="/page-not-found" className="hover:text-blue-300">
        Home
      </Link>
      
      <Link href="/page-not-found" className="hover:text-blue-300">
        About
      </Link>
      
                 
                  <div className="relative">
                    <button
                      onClick={() => setProductsOpen(!productsOpen)}
                      className="flex items-center gap-1 hover:text-blue-300"
                    >
                      Our Products <FaChevronDown size={10} />
                    </button>
      
                    {productsOpen && (
                      <div className="absolute top-full mt-2 w-48 bg-white rounded-xl shadow-xl py-2 text-black  z-[9999">
                        <a className="block px-4 py-2 hover:bg-blue-50">Premium Templates</a>
                        <a className="block px-4 py-2 hover:bg-blue-50">UI Kits</a>
                        <a className="block px-4 py-2 hover:bg-blue-50">WordPress Themes</a>
                        <a className="block px-4 py-2 hover:bg-blue-50">Free Assets</a>
                      </div>
                    )}
                  </div>
      
               
                  <div className="relative">
                    <button
                      onClick={() => setCategoryOpen(!categoryOpen)}
                      className="flex items-center gap-1 hover:text-blue-300"
                    >
                      Categories <FaChevronDown size={10} />
                    </button>
      
                    {categoryOpen && (
                      <div className="absolute top-full mt-2 bg-white rounded-xl shadow-xl p-4 w-[220px] text-black">
                        <p className="font-bold text-sm mb-2">Landing Page</p>
                        <a className="block py-1 text-sm hover:text-blue-500">Sales Page</a>
                        <a className="block py-1 text-sm hover:text-blue-500">Product Page</a>
      
                        <p className="font-bold text-sm mt-3 mb-2">Dashboard</p>
                        <a className="block py-1 text-sm hover:text-blue-500">Analytics</a>
                        <a className="block py-1 text-sm hover:text-blue-500">Finance</a>
                      </div>
                    )}
                  </div>
      
                  <Link href="/page-not-found" className="hover:text-blue-300">
        Contact
      </Link>
                </div>
              </div>
      
              <div className="flex items-center gap-3">
      
             
                <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#06224C]">
                  <FaCartShopping size={14} />
                </button>
      
               
                <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-red-500">
                  <FaHeart size={14} />
                </button>
      
                <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#06224C]">
                  <FaMagnifyingGlass size={14} />
                </button>
      
            
                <div className="relative">
                  <button onClick={() => setProfileOpen(!profileOpen)}>
                    <Image
                      // src="/profile.webp"
                      src="/photo.png"
                      alt="profile"
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-white"
                    />
                  </button>
      
                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl text-sm">
                      <a className="block px-4 py-2 hover:bg-blue-50">Account</a>
                      <a className="block px-4 py-2 hover:bg-blue-50">Settings</a>
                      <a className="block px-4 py-2 text-red-500 hover:bg-red-50">Logout</a>
                    </div>
                  )}
                </div>
      
              </div>
            </div>
          </nav> */}
            {/* <nav ref={navRef} className="sticky top-0 z-50 bg-[#06224C] border-b border-white/10 px-2 md:px-12 py-3 shadow-sm flex items-center"> */}
             <nav ref={navRef}  className="fixed top-0 left-0 w-full z-[9999] bg-[#06224C] border-b border-white/10 px-3 md:px-12 py-3 shadow-sm">
      <div className="nav-container max-w-[1400px] mx-auto flex flex-col w-full relative">
        <div className="flex items-center justify-between gap-1 md:gap-8 w-full">
          <div className="flex items-center gap-2 md:gap-8 flex-1">
            {/* <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-white focus:outline-none p-1 cursor-pointer flex items-center justify-center w-8 h-8"
              type="button"
              aria-label="Open mobile menu"
            >
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-xl text-white hover:text-[#63e5ff] transition`}></i>
            </button> */}
            <button
  onClick={toggleMobileMenu}
  className="lg:hidden p-1 w-8 h-8 flex items-center justify-center text-white hover:text-[#63e5ff] transition focus:outline-none"
  type="button"
  aria-label="Open mobile menu"
>
  {/* <i
    className={`fa-solid ${
      mobileOpen ? 'fa-xmark' : 'fa-bars'
    } text-xl`}
  ></i> */}
           <FaBars />
</button>

     {/* <button className="lg:hidden text-white">
                  <FaBars />
                </button> */}
 
            <div className="flex-shrink-0">
              <Link
                href="/"
                tabIndex={-1}
                onClick={closeAll}
                className="bg-white px-2 md:px-4 py-2 md:py-3 rounded-[60%] flex items-center justify-center shadow-md transition hover:scale-95 min-w-[75px] md:min-w-[90px] aspect-[2/1]"
              >
                <img  src="/stackly-logo.webp" alt="Stackly Logo" className="h-3 md:h-5 w-auto object-contain" decoding="async" />
              </Link>
            </div>
 
            <div className="hidden lg:flex nav-primary-links text-[13px] font-bold text-white uppercase tracking-wide items-center gap-x-4 xl:gap-x-8">
              <Link href="/" className="nav-primary-link hover:text-blue-300 transition" onClick={closeAll}>Home</Link>
              <a href="#" className="nav-primary-link hover:text-blue-300 transition" onClick={handleMockNav}>About Us</a>
 
              <div className="relative dropdown-group flex items-center">
                <button
                  type="button"
                  id="products-dropdown-btn"
                  onClick={toggleProductsDropdown}
                  aria-haspopup="true"
                  aria-expanded={productsOpen}
                  className="flex items-center gap-1.5 hover:text-blue-300 transition whitespace-nowrap text-[13px] font-bold text-white uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-1 cursor-pointer"
                >
                  Our Products <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${productsOpen ? 'rotate-180' : ''}`}></i>
                </button>
                {productsOpen && (
                  <div id="products-menu" role="menu" className="absolute left-0 top-[calc(100%+14px)] w-48 bg-white rounded-xl shadow-2xl transition-all duration-300 z-[100] py-3 border border-gray-100">
                    <a href="#" onClick={handleMockNav} role="menuitem" className="block px-5 py-2.5 text-gray-800 text-[11px] font-black hover:bg-blue-50 hover:text-blue-600 border-b border-gray-50">PREMIUM TEMPLATES</a>
                    <a href="#" onClick={handleMockNav} role="menuitem" className="block px-5 py-2.5 text-gray-800 text-[11px] font-black hover:bg-blue-50 hover:text-blue-600 border-b border-gray-50">UI KITS</a>
                    <a href="#" onClick={handleMockNav} role="menuitem" className="block px-5 py-2.5 text-gray-800 text-[11px] font-black hover:bg-blue-50 hover:text-blue-600 border-b border-gray-50">WORDPRESS THEMES</a>
                    <a href="#" onClick={handleMockNav} role="menuitem" className="block px-5 py-2.5 text-gray-800 text-[11px] font-black hover:bg-blue-50 hover:text-blue-600">FREE ASSETS</a>
                  </div>
                )}
              </div>
 
              <div className="relative dropdown-group flex items-center">
                <button
                  type="button"
                  id="category-dropdown-btn"
                  onClick={toggleCategoriesDropdown}
                  aria-haspopup="true"
                  aria-expanded={categoriesOpen}
                  className="flex items-center gap-1.5 hover:text-blue-300 transition whitespace-nowrap text-[13px] font-bold text-white uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-1 cursor-pointer"
                >
                  Categories <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${categoriesOpen ? 'rotate-180' : ''}`}></i>
                </button>
                {categoriesOpen && (
                  <div id="category-menu" role="menu" className="absolute left-0 top-[calc(100%+14px)] bg-white rounded-xl shadow-2xl transition-all duration-300 z-[100] border border-gray-100 flex">
                    <div className="w-[220px] py-2 flex flex-col">
 
                      {/* Landing Page */}
                      <div className="submenu-parent group/item relative">
                        <a href="#" onClick={handleMockNav} role="menuitem" tabIndex={-1} className="flex items-center justify-between px-5 py-2.5 text-gray-900 text-[11px] font-black hover:bg-blue-50 border-b border-gray-50 transition-colors">
                          <span className="flex items-center gap-2"><i className="fa-solid fa-pager opacity-50 w-4 text-center"></i> LANDING PAGE</span>
                          <i className="fa-solid fa-chevron-right text-[8px] opacity-30 group-hover/item:opacity-100"></i>
                        </a>
                        <div className="flyout-menu hidden group-hover/item:block absolute left-full top-0 w-52 bg-white border border-gray-100 shadow-xl rounded-r-xl rounded-bl-xl overflow-hidden z-[101]">
                          <div className="px-5 py-3 text-[11px] font-black text-blue-600 border-b border-gray-200 bg-white">TYPES</div>
                          <div className="flex flex-col py-1">
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Lead Generating Page</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Click-through Page</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Sales Page</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Product Page</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">App Page</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Pre-launch Page</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Event Page</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Splash Page</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">Others...</a>
                          </div>
                        </div>
                      </div>
 
                      {/* Dashboard */}
                      <div className="submenu-parent group/item relative">
                        <a href="#" onClick={handleMockNav} role="menuitem" tabIndex={-1} className="flex items-center justify-between px-5 py-2.5 text-gray-900 text-[11px] font-black hover:bg-blue-50 border-b border-gray-50 transition-colors">
                          <span className="flex items-center gap-2"><i className="fa-solid fa-chart-line opacity-50 w-4 text-center"></i> DASHBOARD</span>
                          <i className="fa-solid fa-chevron-right text-[8px] opacity-30 group-hover/item:opacity-100"></i>
                        </a>
                        <div className="flyout-menu hidden group-hover/item:block absolute left-full top-0 w-52 bg-white border border-gray-100 shadow-xl rounded-r-xl rounded-bl-xl overflow-hidden z-[101]">
                          <div className="px-5 py-3 text-[11px] font-black text-blue-600 border-b border-gray-200 bg-white">STYLES</div>
                          <div className="flex flex-col py-1">
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Admin Analytics</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Overview</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">User Profile</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Sales</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Marketing</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Finance</a>
                          </div>
                        </div>
                      </div>
 
                      {/* Portfolio */}
                      <div className="submenu-parent group/item relative">
                        <a href="#" onClick={handleMockNav} role="menuitem" tabIndex={-1} className="flex items-center justify-between px-5 py-2.5 text-gray-900 text-[11px] font-black hover:bg-blue-50 border-b border-gray-50 transition-colors">
                          <span className="flex items-center gap-2"><i className="fa-solid fa-briefcase opacity-50 w-4 text-center"></i> PORTFOLIO</span>
                          <i className="fa-solid fa-chevron-right text-[8px] opacity-30 group-hover/item:opacity-100"></i>
                        </a>
                        <div className="flyout-menu hidden group-hover/item:block absolute left-full top-0 w-52 bg-white border border-gray-100 shadow-xl rounded-r-xl rounded-bl-xl overflow-hidden z-[101]">
                          <div className="px-5 py-3 text-[11px] font-black text-blue-600 border-b border-gray-200 bg-white">CREATIVES</div>
                          <div className="flex flex-col py-1">
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Designer</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Developer</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Agency</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Minimal</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Personal</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Freelancer</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Others</a>
                          </div>
                        </div>
                      </div>
 
                      {/* Food */}
                      <div className="submenu-parent group/item relative">
                        <a href="#" onClick={handleMockNav} role="menuitem" tabIndex={-1} className="flex items-center justify-between px-5 py-2.5 text-gray-900 text-[11px] font-black hover:bg-blue-50 border-b border-gray-50 transition-colors">
                          <span className="flex items-center gap-2"><i className="fa-solid fa-utensils opacity-50 w-4 text-center"></i> FOOD</span>
                          <i className="fa-solid fa-chevron-right text-[8px] opacity-30 group-hover/item:opacity-100"></i>
                        </a>
                        <div className="flyout-menu hidden group-hover/item:block absolute left-full top-0 w-52 bg-white border border-gray-100 shadow-xl rounded-r-xl rounded-bl-xl overflow-hidden z-[101]">
                          <div className="px-5 py-3 text-[11px] font-black text-blue-600 border-b border-gray-200 bg-white">RESTAURANTS</div>
                          <div className="flex flex-col py-1">
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Burger House</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Pizza Corner</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Fresh & Natural</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Food Stories</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Others</a>
                          </div>
                        </div>
                      </div>
 
                      {/* Travel */}
                      <div className="submenu-parent group/item relative">
                        <a href="#" onClick={handleMockNav} role="menuitem" tabIndex={-1} className="flex items-center justify-between px-5 py-2.5 text-gray-900 text-[11px] font-black hover:bg-blue-50 border-b border-gray-50 transition-colors">
                          <span className="flex items-center gap-2"><i className="fa-solid fa-plane opacity-50 w-4 text-center"></i> TRAVEL</span>
                          <i className="fa-solid fa-chevron-right text-[8px] opacity-30 group-hover/item:opacity-100"></i>
                        </a>
                        <div className="flyout-menu hidden group-hover/item:block absolute left-full top-0 w-52 bg-white border border-gray-100 shadow-xl rounded-r-xl rounded-bl-xl overflow-hidden z-[101]">
                          <div className="px-5 py-3 text-[11px] font-black text-blue-600 border-b border-gray-200 bg-white">DESTINATIONS</div>
                          <div className="flex flex-col py-1">
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Adventure</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Luxury</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Leisure</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Solo Trip</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Family</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Group</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Others</a>
                          </div>
                        </div>
                      </div>
 
                      {/* Real Estate */}
                      <div className="submenu-parent group/item relative">
                        <a href="#" onClick={handleMockNav} role="menuitem" tabIndex={-1} className="flex items-center justify-between px-5 py-2.5 text-gray-900 text-[11px] font-black hover:bg-blue-50 border-b border-gray-50 transition-colors">
                          <span className="flex items-center gap-2"><i className="fa-solid fa-house-chimney opacity-50 w-4 text-center"></i> REAL ESTATE</span>
                          <i className="fa-solid fa-chevron-right text-[8px] opacity-30 group-hover/item:opacity-100"></i>
                        </a>
                        <div className="flyout-menu hidden group-hover/item:block absolute left-full top-0 w-52 bg-white border border-gray-100 shadow-xl rounded-r-xl rounded-bl-xl overflow-hidden z-[101]">
                          <div className="px-5 py-3 text-[11px] font-black text-blue-600 border-b border-gray-200 bg-white">PROPERTIES</div>
                          <div className="flex flex-col py-1">
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Luxury & Premium</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">General</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Commercial</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Residential</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Vacation/Rental</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Modern & Startup</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Portal</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Others</a>
                          </div>
                        </div>
                      </div>
 
                      {/* Hotel */}
                      <div className="submenu-parent group/item relative">
                        <a href="#" onClick={handleMockNav} role="menuitem" tabIndex={-1} className="flex items-center justify-between px-5 py-2.5 text-gray-900 text-[11px] font-black hover:bg-blue-50 border-b border-gray-50 transition-colors">
                          <span className="flex items-center gap-2"><i className="fa-solid fa-bed opacity-50 w-4 text-center"></i> HOTEL</span>
                          <i className="fa-solid fa-chevron-right text-[8px] opacity-30 group-hover/item:opacity-100"></i>
                        </a>
                        <div className="flyout-menu hidden group-hover/item:block absolute left-full top-0 w-52 bg-white border border-gray-100 shadow-xl rounded-r-xl rounded-bl-xl overflow-hidden z-[101]">
                          <div className="px-5 py-3 text-[11px] font-black text-blue-600 border-b border-gray-200 bg-white">STAY</div>
                          <div className="flex flex-col py-1">
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Resort & Vacation</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Luxury & Premium Style</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Nature & Eco</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Modern & Business</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Boutique & Unique</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Budget & Simple</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Others</a>
                          </div>
                        </div>
                      </div>
 
                      {/* Blog */}
                      <div className="submenu-parent group/item relative">
                        <a href="#" onClick={handleMockNav} role="menuitem" tabIndex={-1} className="flex items-center justify-between px-5 py-2.5 text-gray-900 text-[11px] font-black hover:bg-blue-50 border-b border-gray-50 transition-colors">
                          <span className="flex items-center gap-2"><i className="fa-solid fa-pen-nib opacity-50 w-4 text-center"></i> BLOG</span>
                          <i className="fa-solid fa-chevron-right text-[8px] opacity-30 group-hover/item:opacity-100"></i>
                        </a>
                        <div className="flyout-menu hidden group-hover/item:block absolute left-full top-0 w-52 bg-white border border-gray-100 shadow-xl rounded-r-xl rounded-bl-xl overflow-hidden z-[101]">
                          <div className="px-5 py-3 text-[11px] font-black text-blue-600 border-b border-gray-200 bg-white">TOPICS</div>
                          <div className="flex flex-col py-1">
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Corporate</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Travel & Life</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Food & Health</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Modern News</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Finance</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Education</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Portfolio</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Minimal</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Others</a>
                          </div>
                        </div>
                      </div>
 
                      {/* Education */}
                      <div className="submenu-parent group/item relative">
                        <a href="#" onClick={handleMockNav} role="menuitem" tabIndex={-1} className="flex items-center justify-between px-5 py-2.5 text-gray-900 text-[11px] font-black hover:bg-blue-50 border-b border-gray-50 transition-colors">
                          <span className="flex items-center gap-2"><i className="fa-solid fa-graduation-cap opacity-50 w-4 text-center"></i> EDUCATION</span>
                          <i className="fa-solid fa-chevron-right text-[8px] opacity-30 group-hover/item:opacity-100"></i>
                        </a>
                        <div className="flyout-menu hidden group-hover/item:block absolute left-full top-0 w-52 bg-white border border-gray-100 shadow-xl rounded-r-xl rounded-bl-xl overflow-hidden z-[101]">
                          <div className="px-5 py-3 text-[11px] font-black text-blue-600 border-b border-gray-200 bg-white">LEARNING</div>
                          <div className="flex flex-col py-1">
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">EduSpark</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">LearnSphere</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Bright Future</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Skillbridge</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">NextGen</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Others</a>
                          </div>
                        </div>
                      </div>
 
                      {/* Newspaper */}
                      <div className="submenu-parent group/item relative">
                        <a href="#" onClick={handleMockNav} role="menuitem" tabIndex={-1} className="flex items-center justify-between px-5 py-2.5 text-gray-900 text-[11px] font-black hover:bg-blue-50 border-b border-gray-50 transition-colors">
                          <span className="flex items-center gap-2"><i className="fa-solid fa-newspaper opacity-50 w-4 text-center"></i> NEWSPAPER</span>
                          <i className="fa-solid fa-chevron-right text-[8px] opacity-30 group-hover/item:opacity-100"></i>
                        </a>
                        <div className="flyout-menu hidden group-hover/item:block absolute left-full top-0 w-52 bg-white border border-gray-100 shadow-xl rounded-r-xl rounded-bl-xl overflow-hidden z-[101]">
                          <div className="px-5 py-3 text-[11px] font-black text-blue-600 border-b border-gray-200 bg-white">NEWS DESK</div>
                          <div className="flex flex-col py-1">
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Daily Pulse</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Global Times</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">NextWave</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">The Update Hub</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Prime Report</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Headline Express</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Insight News</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Others</a>
                          </div>
                        </div>
                      </div>
 
                      {/* Photography */}
                      <div className="submenu-parent group/item relative">
                        <a href="#" onClick={handleMockNav} role="menuitem" tabIndex={-1} className="flex items-center justify-between px-5 py-2.5 text-gray-900 text-[11px] font-black hover:bg-blue-50 border-b border-gray-50 transition-colors">
                          <span className="flex items-center gap-2"><i className="fa-solid fa-camera opacity-50 w-4 text-center"></i> PHOTOGRAPHY</span>
                          <i className="fa-solid fa-chevron-right text-[8px] opacity-30 group-hover/item:opacity-100"></i>
                        </a>
                        <div className="flyout-menu hidden group-hover/item:block absolute left-full top-0 w-52 bg-white border border-gray-100 shadow-xl rounded-r-xl rounded-bl-xl overflow-hidden z-[101]">
                          <div className="px-5 py-3 text-[11px] font-black text-blue-600 border-b border-gray-200 bg-white">GALLERY</div>
                          <div className="flex flex-col py-1">
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Wedding</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Baby & Kids</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Fashion</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Studio Personal</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">General/Portfolio</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Travel</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Event</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Food</a>
                            <a href="#" onClick={handleMockNav} className="flyout-item block px-5 py-2 text-[11px] font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">Others</a>
                          </div>
                        </div>
                      </div>
 
                    </div>
                  </div>
                )}
              </div>
 
              <a href="#" onClick={handleMockNav} className="nav-primary-link hover:text-blue-300 transition">Contact</a>
            </div>
          </div>
 
          <div className="nav-actions-group flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* <button className="relative w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-white rounded-full text-[#06224C] hover:bg-gray-100 transition shadow-sm flex-shrink-0 cursor-pointer focus:outline-none" type="button" aria-label="Open cart">
              <i className="fa-solid fa-cart-shopping text-xs md:text-sm"></i>
              <span id="cartBadge" className="hidden absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white">0</span>
            </button>
 
            <button className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-white rounded-full text-red-500 hover:bg-gray-100 transition shadow-sm flex-shrink-0 cursor-pointer focus:outline-none" type="button" aria-label="Open wishlist">
              <i className="fa-solid fa-heart text-xs md:text-sm"></i>
            </button>
 
            <button className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-white rounded-full text-[#06224C] hover:bg-gray-200 transition shadow-sm flex-shrink-0 cursor-pointer focus:outline-none" type="button" aria-label="Open search">
              <i className="fa-solid fa-magnifying-glass text-xs md:text-sm"></i>
            </button> */}
            
                <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#06224C]">
                  <FaCartShopping size={14} />
                </button>
      
               
                <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-red-500">
                  <FaHeart size={14} />
                </button>
      
                <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#06224C]">
                  <FaMagnifyingGlass size={14} />
                </button>

            
 
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={toggleProfileMenu}
                id="profile-dropdown-btn"
                aria-label="User Profile"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white/40 overflow-hidden cursor-pointer relative focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              >
                <img src="/photo.png" alt="User Profile Picture" className="w-full h-full object-cover" />
              </button>
 
              {profileOpen && (
                <div id="profile-menu" className="absolute right-0 top-[calc(100%+14px)] w-48 bg-white rounded-xl shadow-2xl z-[100] py-2 border border-gray-100 text-left">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">User Menu</p>
                  </div>
                  <a href="#" onClick={handleMockNav} className="flex items-center gap-3 px-4 py-2.5 text-gray-700 text-[11px] font-black hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <i className="fa-solid fa-circle-user opacity-50 w-4 text-center"></i> ACCOUNT
                  </a>
                  <a href="#" onClick={handleMockNav} className="flex items-center gap-3 px-4 py-2.5 text-gray-700 text-[11px] font-black hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <i className="fa-solid fa-gear opacity-50 w-4 text-center"></i> SETTINGS
                  </a>
                  <div className="border-t border-gray-50 mt-1">
                    <a href="#" onClick={handleMockNav} className="flex items-center gap-3 px-4 py-2.5 text-red-500 text-[11px] font-black hover:bg-red-50 transition-colors">
                      <i className="fa-solid fa-right-from-bracket w-4 text-center"></i> LOGOUT
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
 
      {/* Mobile Menu rendered absolutely to prevent pushing down page layout */}
      {mobileOpen && (
        // <div className="absolute top-full left-0 w-full bg-[#06224C] lg:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-1 text-white text-sm font-semibold shadow-xl z-[60] max-h-[calc(100vh-60px)] overflow-y-auto">
          <div className="absolute top-full left-0 w-full bg-[#06224C] lg:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-1 text-white text-sm font-semibold shadow-xl z-[60] max-h-[calc(100vh-60px)] overflow-y-auto">
          <Link href="/" onClick={closeAll} className="px-2 py-2 hover:bg-white/10 rounded-md transition-colors">Home</Link>
          <a href="#" onClick={handleMockNav} className="px-2 py-2 hover:bg-white/10 rounded-md transition-colors">About Us</a>
 
          <div className="flex flex-col">
            <button
              type="button"
              className="text-left px-2 py-2 hover:bg-white/10 rounded-md flex justify-between items-center transition-colors cursor-pointer focus:outline-none"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMobileProductsOpen(prev => !prev); setMobileCategoriesOpen(false); }}
            >
              Our Products <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {mobileProductsOpen && (
              <div className="flex flex-col gap-2 pl-6 pr-2 py-2 bg-white/5 rounded-md mt-1 mb-1">
                <a href="#" onClick={handleMockNav} className="text-xs hover:text-blue-300 py-1">PREMIUM TEMPLATES</a>
                <a href="#" onClick={handleMockNav} className="text-xs hover:text-blue-300 py-1">UI KITS</a>
                <a href="#" onClick={handleMockNav} className="text-xs hover:text-blue-300 py-1">WORDPRESS THEMES</a>
                <a href="#" onClick={handleMockNav} className="text-xs hover:text-blue-300 py-1">FREE ASSETS</a>
              </div>
            )}
          </div>
 
          <div className="flex flex-col">
            <button
              type="button"
              className="text-left px-2 py-2 hover:bg-white/10 rounded-md flex justify-between items-center transition-colors cursor-pointer focus:outline-none"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMobileCategoriesOpen(prev => !prev); setMobileProductsOpen(false); }}
            >
              Categories <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${mobileCategoriesOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {mobileCategoriesOpen && (
              <div className="flex flex-col gap-1 pl-4 pr-2 py-2 bg-white/5 rounded-md mt-1 max-h-80 overflow-y-auto">
                {categoriesData.map((cat, idx) => (
                  <div key={idx} className="flex flex-col border-b border-white/5 last:border-0">
                    <button
                      type="button"
                      onClick={(e) => toggleCategoryExpansion(cat.title, e)}
                      className="text-xs hover:text-blue-300 flex items-center justify-between py-2.5 w-full text-left focus:outline-none cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <i className={`fa-solid ${cat.icon} w-4 text-center opacity-70`}></i> {cat.title}
                      </span>
                      <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${expandedCategory === cat.title ? 'rotate-180' : ''}`}></i>
                    </button>
                    {expandedCategory === cat.title && (
                      <div className="flex flex-col pl-7 pb-2 gap-2 mt-1">
                        {cat.items.map((item, itemIdx) => (
                          <a href="#" onClick={handleMockNav} key={itemIdx} className="text-[11px] text-gray-300 hover:text-white py-1">
                            {item}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
 
          <a href="#" onClick={handleMockNav} className="px-2 py-2 hover:bg-white/10 rounded-md transition-colors">Contact</a>
        </div>
      )}
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
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  FaChevronLeft,
  FaChevronRight,
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
  FaYoutube,
  FaThLarge,
  FaUserCircle,
  FaShareAlt,
  FaReply,
  FaCog,
  FaBell,
  FaEyeSlash,
  FaSave,
  FaQuestionCircle,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import { FaCartShopping, FaHeart, FaMagnifyingGlass } from "react-icons/fa6";
import { FaEye, FaPen } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const NAV_ITEMS = [
  { id: "home" as const, label: "Home", href: "/" },
  { id: "about" as const, label: "About Us", href: "/page-not-found" },
  { id: "products" as const, label: "Our Products", href: "/page-not-found" },
  { id: "categories" as const, label: "Categories", href: "/page-not-found" },
  { id: "contact" as const, label: "Contact", href: "/page-not-found" },
];

export default function Portfolioedit() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
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

  const mobilePanels = [
    { id: "basic_blocks", title: "Basic Blocks" },
    { id: "layout_blocks", title: "Layout Blocks" },
    { id: "advanced_blocks", title: "Advanced Blocks" },
    { id: "properties", title: "Properties" },
    { id: "styles", title: "Styles" },
    { id: "pages", title: "Pages" },
    { id: "icons", title: "Icons" }
  ];
  const [mobilePanelIndex, setMobilePanelIndex] = useState(0);

  const handleNextMobilePanel = () => setMobilePanelIndex((prev) => (prev + 1) % mobilePanels.length);
  const handlePrevMobilePanel = () => setMobilePanelIndex((prev) => (prev - 1 + mobilePanels.length) % mobilePanels.length);

  const [propertiesTab, setPropertiesTab] = useState('image');
  const [stylesTab, setStylesTab] = useState('appearance');

  const [heroImageProps, setHeroImageProps] = useState({
    width: 165,
    height: 245,
    borderRadius: 50, // 50% for full round
    shadow: false,
    opacity: 100,
    objectFit: 'cover'
  });

  const [heroSectionProps, setHeroSectionProps] = useState({
    alignment: 'center',
    margin: '16px 0',
    padding: '16px',
    backgroundColor: '#f2f2f2',
    headerBg: '#06224C',
    headerText: '#ffffff',
    footerBg: '#06224C',
    footerText: '#ffffff',
    shadow: false,
  });

  const [editingLayoutElement, setEditingLayoutElement] = useState<'main' | 'header' | 'footer' | 'text'>('main');

  const [isTextEditable, setIsTextEditable] = useState(false);
  const [isIconActive, setIsIconActive] = useState(false);
  const [textStyles, setTextStyles] = useState({
    color: '',
    fontSize: '',
    fontFamily: '',
  });

  const activeTextNodeRef = useRef<HTMLElement | null>(null);

  const rgbToHex = (rgb: string) => {
    if (!rgb) return '#000000';
    if (rgb.startsWith('#')) return rgb;
    const rgbaRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/;
    const result = rgbaRegex.exec(rgb);
    if (!result) return '#000000';
    const r = parseInt(result[1], 10).toString(16).padStart(2, '0');
    const g = parseInt(result[2], 10).toString(16).padStart(2, '0');
    const b = parseInt(result[3], 10).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  };

  const handleTextStyleChange = (property: 'color' | 'fontSize' | 'fontFamily', value: string) => {
    setTextStyles(prev => ({ ...prev, [property]: value }));
    if (activeTextNodeRef.current) {
      if (property === 'fontSize') {
        activeTextNodeRef.current.style.fontSize = value ? `${value}px` : '';
      } else if (property === 'color') {
        activeTextNodeRef.current.style.color = value;
      } else if (property === 'fontFamily') {
        activeTextNodeRef.current.style.fontFamily = value;
      }
    }
  };

  //animations for stats and progress bars
  const { ref: skillsRef, inView: skillsInView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  const stats = [
    { value: 5, suffix: "+", label: "Years of Experience" },
    { value: 120, suffix: "+", label: "Projects Done" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
  ];

  //progress bars animation state
  const [animate, setAnimate] = useState(false);


  const skills = [
    { name: "Photoshop", value: 90 },
    { name: "Figma", value: 80 },
    { name: "HTML", value: 85 },
    { name: "CSS", value: 75 },
  ];


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
  const bottomSheetRef = useRef<HTMLElement>(null);
  const pathname = usePathname();


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (navRef.current && !navRef.current.contains(target)) {
        setProductsOpen(false);
        setCategoriesOpen(false);
        setProfileOpen(false);
      }

      if (bottomSheetRef.current && !bottomSheetRef.current.contains(target)) {
        const targetElement = target as Element;
        if (targetElement.closest && !targetElement.closest('#mobile-toggle-btn')) {
          setShowLeftSidebar(false);
        }
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

  useEffect(() => {
    const canvas = document.getElementById('main-canvas-area');
    if (!canvas) return;

    const textTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LI', 'LABEL'];

    const handleTextClick = (e: Event) => {
      if (!isTextEditable || isPreviewMode) return;
      e.stopPropagation();
      const target = e.target as HTMLElement;
      activeTextNodeRef.current = target;

      document.querySelectorAll('.editable-text-active').forEach(el => el.classList.remove('editable-text-active'));
      target.classList.add('editable-text-active');

      const computedStyle = window.getComputedStyle(target);

      setTextStyles({
        color: rgbToHex(target.style.color || computedStyle.color),
        fontSize: target.style.fontSize.replace('px', '') || computedStyle.fontSize.replace('px', ''),
        fontFamily: target.style.fontFamily || computedStyle.fontFamily,
      });

      setActiveTab('styles');
      setShowRightSidebar(true);
    };

    const makeEditable = (node: Element) => {
      if (node.closest('.sticky.top-0')) return;

      if (textTags.includes(node.tagName)) {
        if (isTextEditable && !isPreviewMode) {
          node.setAttribute('contenteditable', 'true');
          (node as HTMLElement).addEventListener('click', handleTextClick);
        } else {
          node.removeAttribute('contenteditable');
          (node as HTMLElement).removeEventListener('click', handleTextClick);
          node.classList.remove('editable-text-active');
        }
      }
      Array.from(node.children).forEach(child => makeEditable(child));
    };

    Array.from(canvas.children).forEach(child => makeEditable(child));

    return () => {
      const removeListeners = (node: Element) => {
        if (textTags.includes(node.tagName)) {
          (node as HTMLElement).removeEventListener('click', handleTextClick);
        }
        Array.from(node.children).forEach(child => removeListeners(child));
      };
      Array.from(canvas.children).forEach(child => removeListeners(child));
    };
  }, [isTextEditable, heroSectionProps, isPreviewMode]);

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


  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (

    <main className="flex flex-col min-h-screen bg-white pt-[70px]">
      {/* ✅ NAVBAR */}

      <nav ref={navRef} className="fixed top-0 left-0 w-full z-[9999] bg-[#06224C] border-b border-white/10 px-3 md:px-12 py-3 shadow-sm">
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
                  <img src="/stackly-logo.webp" alt="Stackly Logo" className="h-3 md:h-5 w-auto object-contain" decoding="async" />
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
        {!showLeftSidebar && (
          <button
            id="mobile-toggle-btn"
            onClick={() => setShowLeftSidebar(true)}
            className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-[#06224C] text-white px-2 py-3 rounded-r-md shadow-md"
          >
            ▶
          </button>
        )}

        {/* DESKTOP LEFT SIDEBAR */}
        {!isPreviewMode && (
          <aside
            className="hidden lg:flex lg:static top-0 left-0 lg:h-auto lg:self-stretch z-50 overflow-y-auto w-52 bg-[#06224C] text-white flex-col p-4 space-y-4 lg:rounded-tr-3xl"
          >

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

                      <button onClick={() => {
                        const newState = !isTextEditable;
                        setIsTextEditable(newState);
                        if (newState) {
                          setEditingLayoutElement('text');
                          setActiveTab('styles');
                          setShowRightSidebar(true);
                        } else {
                          if (editingLayoutElement === 'text') {
                            setEditingLayoutElement('main');
                          }
                        }
                      }} className={`w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs transition cursor-pointer ${isTextEditable ? 'bg-[#63e5ff] ring-2 ring-white scale-105 shadow-lg' : 'bg-white hover:bg-[#63e5ff]'}`}>
                        <span className="font-bold text-gray-800 text-sm">T</span>
                        <span className="text-[8px] text-gray-800">Text</span>
                      </button>

                      <Link href="/page-not-found" className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] transition cursor-pointer">
                        <FaImage className="text-gray-800 text-sm" />
                        <span className="text-[8px] text-gray-800">Image</span>
                      </Link>

                      <Link href="/page-not-found" className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] transition cursor-pointer">
                        <FaSquare className="text-gray-800 text-sm" />
                        <span className="text-[8px] text-gray-800">Button</span>
                      </Link>

                      <Link href="/page-not-found" className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] transition cursor-pointer">
                        <FaVideo className="text-gray-800 text-sm" />
                        <span className="text-[8px] text-gray-800">Video</span>
                      </Link>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const newIsIconActive = !isIconActive;
                          setIsIconActive(newIsIconActive);
                          if (newIsIconActive) {
                            setActiveTab('icons');
                            setShowRightSidebar(true);
                          } else {
                            if (activeTab === 'icons') {
                              setShowRightSidebar(false);
                            }
                          }
                        }}
                        className={`w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs transition cursor-pointer ${isIconActive ? 'bg-[#63e5ff] ring-2 ring-white scale-105 shadow-lg' : 'bg-white hover:bg-[#63e5ff]'}`}
                      >
                        <FaThLarge className="text-gray-800 text-sm" />
                        <span className="text-[8px] text-gray-800">Icon</span>
                      </button>
                      <Link href="/page-not-found" className="bg-white w-10 h-10 rounded-md hover:bg-[#63e5ff] transition cursor-pointer"></Link>
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

                      <Link href="/page-not-found" className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs border-2 border-[#06224C] hover:bg-[#63e5ff] transition cursor-pointer">
                        <span className="text-[8px] text-gray-800">Section</span>
                      </Link>

                      <Link href="/page-not-found" className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] transition cursor-pointer">
                        <FaColumns className="text-gray-800 text-sm" />
                        <span className="text-[8px] text-gray-800">Columns</span>
                      </Link>

                      <button onClick={(e) => { e.preventDefault(); setEditingLayoutElement('header'); setActiveTab('styles'); setShowRightSidebar(true); }} className={`w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs transition cursor-pointer ${editingLayoutElement === 'header' ? 'bg-[#63e5ff] ring-2 ring-white scale-105 shadow-lg' : 'bg-white hover:bg-[#63e5ff]'}`}>
                        <span className="text-gray-800 text-[10px] font-bold">H</span>
                        <span className="text-[8px] text-gray-800">Header</span>
                      </button>

                      <button onClick={(e) => { e.preventDefault(); setEditingLayoutElement('footer'); setActiveTab('styles'); setShowRightSidebar(true); }} className={`w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs transition cursor-pointer ${editingLayoutElement === 'footer' ? 'bg-[#63e5ff] ring-2 ring-white scale-105 shadow-lg' : 'bg-white hover:bg-[#63e5ff]'}`}>
                        <FaWindowMinimize className="text-gray-800 text-sm" />
                        <span className="text-[8px] text-gray-800">Footer</span>
                      </button>

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

                      <Link href="/page-not-found" className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] transition cursor-pointer">
                        < FaRegFileAlt className="text-gray-800 text-sm" />
                        <span className="text-[8px] text-gray-800">Form</span>
                      </Link>

                      <Link href="/page-not-found" className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] transition cursor-pointer">
                        <FaMap className="text-gray-800 text-sm" />
                        <span className="text-[8px] text-gray-800">Map</span>
                      </Link>

                      <Link href="/page-not-found" className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] transition cursor-pointer">
                        <FaBlog className="text-gray-800 text-sm" />
                        <span className="text-[8px] text-gray-800">Blog</span>
                      </Link>

                      <Link href="/page-not-found" className="bg-white w-10 h-10 rounded-md flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] transition cursor-pointer">
                        <FaVideo className="text-gray-800 text-sm" />
                        <span className="text-[8px] text-gray-800">Video</span>
                      </Link>

                    </div>
                  )}
                </div>

              </div>
            )}

            {/* PAGES */}
            {leftTab === "pages" && (
              <div className="mt-6 space-y-4">
                {[
                  { name: "Home Page", id: "home" },
                  { name: "About Me", id: "about" },
                  { name: "Projects", id: "projects" },
                  { name: "Contact", id: "contact" }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="bg-white px-3 py-2 rounded-md flex justify-between text-sm hover:bg-[#63e5ff] transition cursor-pointer"
                  >
                    <span className="text-gray-800">{item.name}</span>
                    <FaArrowRight className="text-gray-800" />
                  </div>
                ))}
              </div>
            )}

          </aside>
        )}

        {/* MOBILE UNIFIED SIDEBAR (BOTTOM SHEET) */}
        {!isPreviewMode && (
          <aside
            ref={bottomSheetRef}
            className={`
            fixed lg:hidden bottom-0 left-0 w-full z-[100] max-h-[85vh] overflow-y-auto
            bg-[#06224C] text-white flex flex-col p-5 space-y-4
            rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.3)]
            transform transition-transform duration-300
            ${showLeftSidebar ? "translate-y-0" : "translate-y-full"}
          `}
          >
            <div className="flex items-center justify-between bg-[#041733] rounded-lg p-3 shadow-md mb-2 border border-white/5 relative">
              <button onClick={handlePrevMobilePanel} className="text-white hover:text-[#63e5ff] p-2 transition-transform hover:scale-110">
                <FaChevronLeft size={16} />
              </button>
              <h3 className="font-bold text-[15px] tracking-wide absolute left-1/2 -translate-x-1/2">{mobilePanels[mobilePanelIndex].title}</h3>
              <div className="flex items-center gap-2">
                <button onClick={handleNextMobilePanel} className="text-white hover:text-[#63e5ff] p-2 transition-transform hover:scale-110">
                  <FaChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-10">
              {mobilePanels[mobilePanelIndex].id === "basic_blocks" && (
                <div className="grid grid-cols-3 gap-4 justify-items-center mt-2">
                  <button onClick={() => { setIsTextEditable(!isTextEditable); setMobilePanelIndex(mobilePanels.findIndex(p => p.id === 'styles')); setStylesTab('text'); }} className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center text-xs transition-all cursor-pointer shadow-lg ${isTextEditable ? 'bg-[#63e5ff] ring-2 ring-white scale-105' : 'bg-white hover:bg-[#63e5ff] hover:scale-105'}`}>
                    <span className="font-bold text-gray-800 text-lg mb-1">T</span>
                    <span className="text-[10px] text-gray-800 font-semibold">Text</span>
                  </button>
                  <Link href="/page-not-found" className="bg-white w-16 h-16 rounded-xl flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] hover:scale-105 transition-all cursor-pointer shadow-lg">
                    <FaImage className="text-gray-800 text-lg mb-1" />
                    <span className="text-[10px] text-gray-800 font-semibold">Image</span>
                  </Link>
                  <Link href="/page-not-found" className="bg-white w-16 h-16 rounded-xl flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] hover:scale-105 transition-all cursor-pointer shadow-lg">
                    <FaSquare className="text-gray-800 text-lg mb-1" />
                    <span className="text-[10px] text-gray-800 font-semibold">Button</span>
                  </Link>
                  <Link href="/page-not-found" className="bg-white w-16 h-16 rounded-xl flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] hover:scale-105 transition-all cursor-pointer shadow-lg">
                    <FaVideo className="text-gray-800 text-lg mb-1" />
                    <span className="text-[10px] text-gray-800 font-semibold">Video</span>
                  </Link>
                  <button onClick={(e) => {
                    e.preventDefault();
                    const newIsIconActive = !isIconActive;
                    setIsIconActive(newIsIconActive);
                    if (newIsIconActive) {
                      setMobilePanelIndex(mobilePanels.findIndex(p => p.id === 'icons'));
                    } else {
                      setMobilePanelIndex(0); // Go back to basic_blocks
                    }
                  }} className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center text-xs transition-all cursor-pointer shadow-lg ${isIconActive ? 'bg-[#63e5ff] ring-2 ring-white scale-105' : 'bg-white hover:bg-[#63e5ff] hover:scale-105'}`}>
                    <FaThLarge className="text-gray-800 text-lg mb-1" />
                    <span className="text-[10px] text-gray-800 font-semibold">Icon</span>
                  </button>
                </div>
              )}

              {mobilePanels[mobilePanelIndex].id === "layout_blocks" && (
                <div className="grid grid-cols-3 gap-4 justify-items-center mt-2">
                  <Link href="/page-not-found" className="bg-white w-16 h-16 rounded-xl flex flex-col items-center justify-center text-xs border-2 border-[#06224C] hover:bg-[#63e5ff] hover:border-transparent hover:scale-105 transition-all cursor-pointer shadow-lg">
                    <span className="text-[10px] text-gray-800 font-semibold">Section</span>
                  </Link>
                  <Link href="/page-not-found" className="bg-white w-16 h-16 rounded-xl flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] hover:scale-105 transition-all cursor-pointer shadow-lg">
                    <FaColumns className="text-gray-800 text-lg mb-1" />
                    <span className="text-[10px] text-gray-800 font-semibold">Columns</span>
                  </Link>
                  <button onClick={(e) => { e.preventDefault(); setEditingLayoutElement('header'); setMobilePanelIndex(mobilePanels.findIndex(p => p.id === 'styles')); setStylesTab('appearance'); }} className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center text-xs transition-all cursor-pointer shadow-lg ${editingLayoutElement === 'header' ? 'bg-[#63e5ff] ring-2 ring-white scale-105' : 'bg-white hover:bg-[#63e5ff] hover:scale-105'}`}>
                    <span className="text-gray-800 text-sm font-bold mb-1">H</span>
                    <span className="text-[10px] text-gray-800 font-semibold">Header</span>
                  </button>
                  <button onClick={(e) => { e.preventDefault(); setEditingLayoutElement('footer'); setMobilePanelIndex(mobilePanels.findIndex(p => p.id === 'styles')); setStylesTab('appearance'); }} className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center text-xs transition-all cursor-pointer shadow-lg ${editingLayoutElement === 'footer' ? 'bg-[#63e5ff] ring-2 ring-white scale-105' : 'bg-white hover:bg-[#63e5ff] hover:scale-105'}`}>
                    <FaWindowMinimize className="text-gray-800 text-lg mb-1" />
                    <span className="text-[10px] text-gray-800 font-semibold">Footer</span>
                  </button>
                </div>
              )}

              {mobilePanels[mobilePanelIndex].id === "advanced_blocks" && (
                <div className="grid grid-cols-3 gap-4 justify-items-center mt-2">
                  <Link href="/page-not-found" className="bg-white w-16 h-16 rounded-xl flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] hover:scale-105 transition-all cursor-pointer shadow-lg">
                    <FaRegFileAlt className="text-gray-800 text-lg mb-1" />
                    <span className="text-[10px] text-gray-800 font-semibold">Form</span>
                  </Link>
                  <Link href="/page-not-found" className="bg-white w-16 h-16 rounded-xl flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] hover:scale-105 transition-all cursor-pointer shadow-lg">
                    <FaMap className="text-gray-800 text-lg mb-1" />
                    <span className="text-[10px] text-gray-800 font-semibold">Map</span>
                  </Link>
                  <Link href="/page-not-found" className="bg-white w-16 h-16 rounded-xl flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] hover:scale-105 transition-all cursor-pointer shadow-lg">
                    <FaBlog className="text-gray-800 text-lg mb-1" />
                    <span className="text-[10px] text-gray-800 font-semibold">Blog</span>
                  </Link>
                  <Link href="/page-not-found" className="bg-white w-16 h-16 rounded-xl flex flex-col items-center justify-center text-xs hover:bg-[#63e5ff] hover:scale-105 transition-all cursor-pointer shadow-lg">
                    <FaVideo className="text-gray-800 text-lg mb-1" />
                    <span className="text-[10px] text-gray-800 font-semibold">Video</span>
                  </Link>
                </div>
              )}

              {mobilePanels[mobilePanelIndex].id === "pages" && (
                <div className="space-y-2.5 mt-2">
                  {[
                    { name: "Home Page", id: "home" },
                    { name: "About Me", id: "about" },
                    { name: "Projects", id: "projects" },
                    { name: "Contact", id: "contact" }
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={(e) => { e.preventDefault(); scrollToSection(item.id); setShowLeftSidebar(false); }}
                      className="bg-[#041733] px-4 py-2.5 rounded-xl flex justify-between items-center text-[13px] hover:bg-[#63e5ff] hover:text-black transition cursor-pointer shadow-md border border-white/5 group"
                    >
                      <span className="font-semibold">{item.name}</span>
                      <FaArrowRight className="text-white/50 group-hover:text-black transition" />
                    </div>
                  ))}
                </div>
              )}

              {mobilePanels[mobilePanelIndex].id === "properties" && (
                <div className="flex flex-col mt-2">
                  <div className="flex justify-around border-b border-white/10 mb-4 pb-2">
                    <button
                      onClick={() => setPropertiesTab('image')}
                      className={`text-xs font-semibold pb-1 border-b-2 transition ${propertiesTab === 'image' ? 'text-[#63e5ff] border-[#63e5ff]' : 'text-gray-400 border-transparent hover:text-white'}`}
                    >
                      Image Settings
                    </button>
                    <button
                      onClick={() => setPropertiesTab('effects')}
                      className={`text-xs font-semibold pb-1 border-b-2 transition ${propertiesTab === 'effects' ? 'text-[#63e5ff] border-[#63e5ff]' : 'text-gray-400 border-transparent hover:text-white'}`}
                    >
                      Shadow & Opacity
                    </button>
                    <button
                      onClick={() => setPropertiesTab('position')}
                      className={`text-xs font-semibold pb-1 border-b-2 transition ${propertiesTab === 'position' ? 'text-[#63e5ff] border-[#63e5ff]' : 'text-gray-400 border-transparent hover:text-white'}`}
                    >
                      Position
                    </button>
                  </div>

                  {propertiesTab === 'image' && (
                    <div className="space-y-3 bg-[#041733] p-3 rounded-xl shadow-inner border border-white/5">
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-300 flex-1 font-medium">Width</p>
                        <input
                          type="number"
                          value={heroImageProps.width}
                          onChange={(e) => setHeroImageProps({ ...heroImageProps, width: Number(e.target.value) })}
                          className="w-[75px] bg-transparent border border-white/30 rounded-full px-3 py-1 text-xs text-white text-center focus:border-[#63e5ff] focus:ring-1 focus:ring-[#63e5ff] outline-none transition"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-300 flex-1 font-medium">Height</p>
                        <input
                          type="number"
                          value={heroImageProps.height}
                          onChange={(e) => setHeroImageProps({ ...heroImageProps, height: Number(e.target.value) })}
                          className="w-[75px] bg-transparent border border-white/30 rounded-full px-3 py-1 text-xs text-white text-center focus:border-[#63e5ff] focus:ring-1 focus:ring-[#63e5ff] outline-none transition"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-gray-300 mb-1 font-medium">Border Radius (%)</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0" max="50"
                            value={heroImageProps.borderRadius}
                            onChange={(e) => setHeroImageProps({ ...heroImageProps, borderRadius: Number(e.target.value) })}
                            className="flex-1 h-1.5 bg-white/20 rounded-lg cursor-pointer accent-[#63e5ff]"
                          />
                          <input
                            type="number"
                            min="0" max="50"
                            value={heroImageProps.borderRadius}
                            onChange={(e) => setHeroImageProps({ ...heroImageProps, borderRadius: Number(e.target.value) })}
                            className="w-[60px] bg-transparent border border-white/30 rounded-full px-2 py-1 text-xs text-white text-center focus:border-[#63e5ff] outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {propertiesTab === 'effects' && (
                    <div className="space-y-3 bg-[#041733] p-3 rounded-xl shadow-inner border border-white/5">
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-300 font-medium">Shadow</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={heroImageProps.shadow}
                            onChange={(e) => setHeroImageProps({ ...heroImageProps, shadow: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-white/20 rounded-full peer peer-checked:bg-[#63e5ff] transition-all
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                          after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all
                          peer-checked:after:translate-x-4 shadow-inner"></div>
                        </label>
                      </div>

                      <div>
                        <p className="text-xs text-gray-300 mb-1 font-medium">Opacity (%)</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0" max="100"
                            value={heroImageProps.opacity}
                            onChange={(e) => setHeroImageProps({ ...heroImageProps, opacity: Number(e.target.value) })}
                            className="flex-1 h-1.5 bg-white/20 rounded-lg cursor-pointer accent-[#63e5ff]"
                          />
                          <input
                            type="number"
                            min="0" max="100"
                            value={heroImageProps.opacity}
                            onChange={(e) => setHeroImageProps({ ...heroImageProps, opacity: Number(e.target.value) })}
                            className="w-[60px] bg-transparent border border-white/30 rounded-full px-2 py-1 text-xs text-white text-center focus:border-[#63e5ff] outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {propertiesTab === 'position' && (
                    <div className="space-y-3 bg-[#041733] p-3 rounded-xl shadow-inner border border-white/5">
                      <div>
                        <p className="text-xs text-gray-300 mb-1 font-medium">Alignment</p>
                        <select
                          value={heroSectionProps.alignment}
                          onChange={(e) => setHeroSectionProps({ ...heroSectionProps, alignment: e.target.value })}
                          className="w-full bg-[#06224C] border border-[#63e5ff]/30 rounded-lg py-1.5 px-2 text-xs font-semibold text-white outline-none hover:border-[#63e5ff] transition-all"
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>

                      <div>
                        <p className="text-xs text-gray-300 mb-1 font-medium">Object Fit</p>
                        <select
                          value={heroImageProps.objectFit}
                          onChange={(e) => setHeroImageProps({ ...heroImageProps, objectFit: e.target.value })}
                          className="w-full bg-[#06224C] border border-[#63e5ff]/30 rounded-lg py-1.5 px-2 text-xs font-semibold text-white outline-none hover:border-[#63e5ff] transition-all"
                        >
                          <option value="cover">Cover</option>
                          <option value="contain">Contain</option>
                          <option value="fill">Fill</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {mobilePanels[mobilePanelIndex].id === "styles" && (
                <div className="flex flex-col mt-2">
                  <div className="flex justify-around border-b border-white/10 mb-4 pb-2">
                    {/* <button
                      onClick={() => setStylesTab('spacing')}
                      className={`text-sm font-semibold pb-1 border-b-2 transition ${stylesTab === 'spacing' ? 'text-[#63e5ff] border-[#63e5ff]' : 'text-gray-400 border-transparent hover:text-white'}`}
                    >
                      Spacing
                    </button> */}
                    <button
                      onClick={() => setStylesTab('appearance')}
                      className={`text-sm font-semibold pb-1 border-b-2 transition ${stylesTab === 'appearance' ? 'text-[#63e5ff] border-[#63e5ff]' : 'text-gray-400 border-transparent hover:text-white'}`}
                    >
                      Appearance
                    </button>
                    <button
                      onClick={() => setStylesTab('text')}
                      className={`text-sm font-semibold pb-1 border-b-2 transition ${stylesTab === 'text' ? 'text-[#63e5ff] border-[#63e5ff]' : 'text-gray-400 border-transparent hover:text-white'}`}
                    >
                      Text
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {editingLayoutElement !== 'main' && (
                      <button onClick={() => setEditingLayoutElement('main')} className="text-white/50 hover:text-white">
                        <FaChevronLeft size={12} />
                      </button>
                    )}
                    <p className="text-xs text-white font-bold capitalize">
                      {editingLayoutElement === 'main' ? 'Main Container' : editingLayoutElement} Settings
                    </p>
                  </div>

                  {stylesTab === 'appearance' && (
                    <div className="space-y-3 bg-[#041733] p-3 rounded-xl shadow-inner border border-white/5">
                      {editingLayoutElement === 'main' && (
                        <>
                          <div>
                            <p className="text-xs text-gray-300 mb-1 font-medium">Background Color</p>
                            <div className="flex gap-2 items-center">
                              <input
                                type="color"
                                value={heroSectionProps.backgroundColor}
                                onChange={(e) => setHeroSectionProps({ ...heroSectionProps, backgroundColor: e.target.value })}
                                className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <span className="text-xs text-gray-400 font-mono">{heroSectionProps.backgroundColor}</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-gray-300 mb-1 font-medium">Shadow</p>
                            <label className="flex gap-2 items-center cursor-pointer bg-[#06224C] p-2 rounded-lg border border-white/10 hover:border-white/30 transition shadow-sm">
                              <input
                                type="checkbox"
                                checked={heroSectionProps.shadow}
                                onChange={(e) => setHeroSectionProps({ ...heroSectionProps, shadow: e.target.checked })}
                                className="w-3.5 h-3.5 rounded text-[#63e5ff] focus:ring-[#63e5ff] bg-transparent border-white/30"
                              />
                              <span className="text-xs font-semibold">Enable Shadow</span>
                            </label>
                          </div>
                        </>
                      )}
                      {editingLayoutElement === 'header' && (
                        <div>
                          <p className="text-xs text-gray-300 mb-1 font-medium">Background Color</p>
                          <div className="flex gap-2 items-center">
                            <input
                              type="color"
                              value={heroSectionProps.headerBg}
                              onChange={(e) => setHeroSectionProps({ ...heroSectionProps, headerBg: e.target.value })}
                              className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                            />
                            <span className="text-xs text-gray-400 font-mono">{heroSectionProps.headerBg}</span>
                          </div>
                        </div>
                      )}
                      {editingLayoutElement === 'footer' && (
                        <div>
                          <p className="text-xs text-gray-300 mb-1 font-medium">Background Color</p>
                          <div className="flex gap-2 items-center">
                            <input
                              type="color"
                              value={heroSectionProps.footerBg}
                              onChange={(e) => setHeroSectionProps({ ...heroSectionProps, footerBg: e.target.value })}
                              className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                            />
                            <span className="text-xs text-gray-400 font-mono">{heroSectionProps.footerBg}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {stylesTab === 'text' && (
                    <div className="space-y-3 bg-[#041733] p-3 rounded-xl shadow-inner border border-white/5">
                      {editingLayoutElement === 'main' && (
                        <>
                          <div>
                            <p className="text-xs text-gray-300 mb-1 font-medium">Text Color</p>
                            <div className="flex gap-2 items-center">
                              <input
                                type="color"
                                value={textStyles.color || '#000000'}
                                onChange={(e) => handleTextStyleChange('color', e.target.value)}
                                className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <span className="text-xs text-gray-400 font-mono">{textStyles.color || 'Default'}</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-gray-300 mb-1 font-medium">Font Size (px)</p>
                            <input
                              type="number"
                              value={textStyles.fontSize}
                              onChange={(e) => handleTextStyleChange('fontSize', e.target.value)}
                              placeholder="e.g. 16"
                              className="w-full rounded-lg bg-[#06224C] p-2 text-xs text-white border border-white/20 focus:border-[#63e5ff] focus:ring-1 focus:ring-[#63e5ff] outline-none transition"
                            />
                          </div>

                          <div>
                            <p className="text-xs text-gray-300 mb-1 font-medium">Font Family</p>
                            <select
                              value={textStyles.fontFamily}
                              onChange={(e) => handleTextStyleChange('fontFamily', e.target.value)}
                              className="w-full rounded-lg bg-[#06224C] p-2 text-xs text-white border border-white/20 focus:border-[#63e5ff] focus:ring-1 focus:ring-[#63e5ff] outline-none transition"
                            >
                              <option value="">Default</option>
                              <option value="Arial, sans-serif">Arial</option>
                              <option value="'Times New Roman', serif">Times New Roman</option>
                              <option value="'Courier New', monospace">Courier New</option>
                              <option value="Georgia, serif">Georgia</option>
                              <option value="Verdana, sans-serif">Verdana</option>
                            </select>
                          </div>
                        </>
                      )}
                      {editingLayoutElement === 'header' && (
                        <div>
                          <p className="text-xs text-gray-300 mb-1 font-medium">Header Text Color</p>
                          <div className="flex gap-2 items-center">
                            <input
                              type="color"
                              value={heroSectionProps.headerText}
                              onChange={(e) => setHeroSectionProps({ ...heroSectionProps, headerText: e.target.value })}
                              className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                            />
                            <span className="text-xs text-gray-400 font-mono">{heroSectionProps.headerText}</span>
                          </div>
                        </div>
                      )}
                      {editingLayoutElement === 'footer' && (
                        <div>
                          <p className="text-xs text-gray-300 mb-1 font-medium">Footer Text Color</p>
                          <div className="flex gap-2 items-center">
                            <input
                              type="color"
                              value={heroSectionProps.footerText}
                              onChange={(e) => setHeroSectionProps({ ...heroSectionProps, footerText: e.target.value })}
                              className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                            />
                            <span className="text-xs text-gray-400 font-mono">{heroSectionProps.footerText}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {mobilePanels[mobilePanelIndex].id === "icons" && (
                <div className="flex flex-col mt-2 px-1 pb-4">
                  {/* Search */}
                  <div className="relative mb-5">
                    <input type="text" placeholder="Search Icons..." className="w-full bg-[#041733] border border-white/20 rounded-lg py-2.5 px-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#63e5ff]" />
                  </div>

                  {/* Options Row */}
                  <div className="flex flex-col gap-2 mb-6 w-full">
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex items-center gap-1.5 bg-[#041733] border border-white/20 rounded-md px-2 py-2 cursor-pointer flex-1">
                        <div className="w-3 h-3 rounded-full bg-[#FFD700] border border-white/20 shrink-0"></div>
                        <span className="text-[11px] font-semibold text-gray-300 truncate">Color</span>
                        <FaChevronDown className="text-[8px] ml-auto text-gray-400 shrink-0" />
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#041733] border border-white/20 rounded-md px-2 py-2 cursor-pointer flex-1">
                        <span className="text-[12px] font-bold text-gray-300 shrink-0">T↕</span>
                        <span className="text-[11px] font-semibold text-gray-300 truncate">Size</span>
                        <FaChevronDown className="text-[8px] ml-auto text-gray-400 shrink-0" />
                      </div>
                    </div>
                    <button className="w-full bg-[#789BCA] text-white hover:bg-[#63e5ff] hover:text-[#06224C] transition font-semibold text-[11px] px-2 py-2.5 rounded-md shadow-sm">
                      Browser or Import
                    </button>
                  </div>

                  {/* Recently Used */}
                  <h4 className="text-xs font-bold mb-4 text-white">Recently Used</h4>
                  <div className="grid grid-cols-4 gap-y-6 gap-x-2 mb-8 justify-items-center">
                    <FaUserCircle size={26} className="cursor-pointer text-white hover:text-[#63e5ff] transition" />
                    <FaShareAlt size={26} className="cursor-pointer text-white hover:text-[#63e5ff] transition" />
                    <FaShoppingCart size={26} className="cursor-pointer text-white hover:text-[#63e5ff] transition" />
                    <FaReply size={26} className="cursor-pointer text-white hover:text-[#63e5ff] transition" />
                    <FaEnvelope size={26} className="cursor-pointer text-white hover:text-[#63e5ff] transition" />
                    <FaCog size={26} className="cursor-pointer text-white hover:text-[#63e5ff] transition" />
                    <FaBell size={26} className="cursor-pointer text-white hover:text-[#63e5ff] transition" />
                    <FaEyeSlash size={26} className="cursor-pointer text-white hover:text-[#63e5ff] transition" />
                    <FaSave size={26} className="cursor-pointer text-white hover:text-[#63e5ff] transition" />
                    <FaEye size={26} className="cursor-pointer text-white hover:text-[#63e5ff] transition" />
                    <FaFacebookF size={26} className="cursor-pointer text-white hover:text-[#63e5ff] transition" />
                    <FaQuestionCircle size={26} className="cursor-pointer text-white hover:text-[#63e5ff] transition" />
                  </div>

                  {/* Thickness */}
                  <h4 className="text-xs font-bold mb-3 text-white">Thickness</h4>
                  <div className="flex items-center gap-4">
                    <input type="range" min="10" max="100" defaultValue="58" className="flex-1 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#63e5ff]" />
                    <div className="bg-[#041733] border border-white/20 rounded px-2.5 py-1.5 text-[11px] font-semibold text-white">
                      58 px
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* MAIN CONTENT */}
        {/* <div className="flex-1 bg-white p-4 md:p-7 flex justify-center min-w-0 overflow-hidden"> */}
        <div className="flex-1 bg-white p-4 md:p-7 flex justify-center min-w-0">

          <div className="w-full max-w-[1200px] relative flex flex-col h-[calc(100vh-80px)] min-w-0">

            {/* Canvas Box */}

            {/* <div className="flex-1 overflow-y-auto min-w-0"> */}
            <div className="flex-1 overflow-y-auto min-w-0 relative z-0">
              <div id="main-canvas-area" className="w-full min-h-[530px] rounded-xl border-2 border-gray-300 flex flex-col relative" style={{ backgroundColor: heroSectionProps.backgroundColor }}>
                {isTextEditable && (
                  <style>{`
                    #main-canvas-area [contenteditable="true"]:hover {
                      outline: 1px dashed rgba(99, 229, 255, 0.5);
                      outline-offset: 2px;
                      cursor: text;
                    }
                    #main-canvas-area .editable-text-active {
                      outline: 2px dashed #63e5ff !important;
                      outline-offset: 4px;
                    }
                  `}</style>
                )}


                {/* <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 md:px-8 xl:flex-nowrap border-b border-gray-300 bg-[#06224C] rounded-t-xl"> */}
                <div className="sticky top-0 z-50 backdrop-blur-md flex w-full flex-wrap items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 md:px-8 xl:flex-nowrap border-b border-gray-300 rounded-t-xl" style={{ backgroundColor: heroSectionProps.headerBg, color: heroSectionProps.headerText }}>

                  {/* ✅ MOBILE LAYOUT */}
                  <div className="flex flex-col w-full lg:hidden gap-2">

                    {/* ROW 1 → Logo + Menu */}
                    {/* TOP ROW → Logo + Title + Menu */}
                    <div className="flex flex-wrap items-center justify-between w-full gap-2">

                      {/* LEFT → Logo */}
                      <Link
                        href="/"
                        className="flex h-7 w-[64px] sm:h-8 sm:w-[80px] items-center justify-center overflow-hidden rounded-[50%] bg-white px-1 sm:px-2 shrink-0"
                      >
                        <img
                          src="/stackly-logo.webp"
                          alt="Stackly logo"
                          className="h-[12px] sm:h-[14px] object-contain"
                        />
                      </Link>

                      {/* CENTER → Title */}
                      <span className="text-base sm:text-lg font-semibold text-center flex-1 min-w-[100px]" style={{ color: heroSectionProps.headerText }}>
                        Portfolio
                      </span>

                      {/* RIGHT → Menu */}
                      <button
                        onClick={() => setInnerMobileMenuOpen((v) => !v)}
                        className="h-8 w-8 border border-white/25 rounded-md hover:opacity-80 transition flex items-center justify-center shrink-0"
                        style={{ color: heroSectionProps.headerText, borderColor: heroSectionProps.headerText }}
                      >
                        <FaBars />
                      </button>

                    </div>

                    {/* ROW 3 → Actions (NOW VISIBLE ON MOBILE ✅) */}
                    <div className="flex justify-center">
                      <div className="flex flex-wrap justify-center gap-2 w-full max-w-[220px]">

                        {/* Save Draft */}
                        <button className="px-3 py-1 text-xs font-semibold border rounded-md hover:bg-white hover:text-black transition" style={{ color: heroSectionProps.headerText, borderColor: heroSectionProps.headerText }}>
                          Save Draft
                        </button>

                        {/* Preview */}
                        <button
                          onClick={() => setIsPreviewMode(!isPreviewMode)}
                          className={`px-3 py-1 text-xs font-semibold flex items-center gap-1 border rounded-md transition ${isPreviewMode ? 'bg-white text-black border-white' : 'hover:bg-white hover:text-black'}`}
                          style={isPreviewMode ? {} : { color: heroSectionProps.headerText, borderColor: heroSectionProps.headerText }}>
                          {isPreviewMode ? 'Exit Preview' : 'Preview'} <FaEye className="text-[10px]" />
                        </button>

                      </div>
                    </div>

                  </div>

                  {/* ✅ DESKTOP (unchanged) */}
                  <div className="hidden lg:flex w-full items-center justify-between">

                    <div className="flex shrink-0 justify-start">
                      <Link href="/" className="flex h-10 min-w-[92px] items-center justify-center rounded-[50%] bg-white px-3">
                        <img src="/stackly-logo.webp" alt="Stackly logo" className="h-[18px]" />
                      </Link>
                    </div>

                    <div className="flex flex-1 justify-center px-4">
                      <span className="text-lg font-semibold" style={{ color: heroSectionProps.headerText }}>Portfolio</span>
                    </div>


                    <div className="flex shrink-0 items-center gap-x-6">

                      {/* NAV LINKS */}
                      <div className="flex gap-x-6">
                        {[
                          { name: "Home", id: "home" },
                          { name: "About Me", id: "about" },
                          { name: "Projects", id: "projects" },
                          { name: "Contacts", id: "contact" },
                        ].map((item, i) => (
                          <button
                            key={i}
                            onClick={() => scrollToSection(item.id)}
                            className="relative text-sm group"
                            style={{ color: heroSectionProps.headerText }}
                          >
                            {item.name}
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-300 group-hover:w-full" style={{ backgroundColor: heroSectionProps.headerText }}></span>
                          </button>
                        ))}
                      </div>

                      {/* ACTION BUTTONS ✅ */}
                      <div className="flex border-2 rounded-md overflow-hidden text-xs font-bold" style={{ color: heroSectionProps.headerText, borderColor: heroSectionProps.headerText + '40' }}>

                        <button className="px-2 py-1 hover:bg-white hover:text-black transition">
                          Save Draft
                        </button>

                        <div className="w-px border-1" style={{ borderColor: heroSectionProps.headerText + '40' }}></div>

                        <button
                          onClick={() => setIsPreviewMode(!isPreviewMode)}
                          className={`px-2 py-1 flex items-center gap-1 transition ${isPreviewMode ? 'bg-white text-black font-semibold ' : 'hover:bg-white hover:text-black'}`}>
                          {isPreviewMode ? 'Exit Preview' : 'Preview'} <FaEye className="text-[10px]" />
                        </button>

                      </div>

                    </div>
                  </div>

                </div>

                {/* MOBILE MENU */}
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${innerMobileMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-3 pb-3 pt-2 grid grid-cols-2 gap-2" style={{ backgroundColor: heroSectionProps.headerBg }}>
                    {[
                      { name: "Home", id: "home" },
                      { name: "About Us", id: "about" },
                      { name: "Projects", id: "projects" },
                      { name: "Contact", id: "contact" },
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          scrollToSection(item.id);
                          setInnerMobileMenuOpen(false);
                        }}
                        className="border px-3 py-2 text-xs rounded-md transition hover:scale-105"
                        style={{ color: heroSectionProps.headerText, borderColor: heroSectionProps.headerText + '40', backgroundColor: 'transparent' }}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>


                {/* HERO SECTION WRAPPER */}
                <div id="home" className="relative w-full overflow-hidden flex flex-col">

                  {/* HERO CONTENT */}

                  <div className="flex-1 flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between w-full gap-8">

                      <div className="w-full lg:w-[50%] xl:w-[55%] shrink-0 flex flex-col relative z-30 text-center lg:text-left">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 md:mt-6 text-gray-800 leading-snug md:leading-normal break-words whitespace-normal">
                          <div className="mb-2">Hello, I'm</div>
                          <div className="text-[#63e5ff] mb-2 leading-snug break-words">Srinivas Pentakota</div>
                          <div className="leading-snug break-words">UI/UX Designer</div>
                        </h1>

                        <p className="text-gray-600 mt-4 md:mt-6 text-base md:text-lg max-w-xl mx-auto lg:mx-0 break-words relative z-20">
                          I create modern, responsive websites with great user experience.
                        </p>

                        {/* MOBILE BLOBS + IMAGE */}
                        <div className={`lg:hidden mt-8 mb-4 flex justify-center px-4 sm:px-6 w-full transition-transform duration-500 ${heroSectionProps.alignment === 'left' ? '-translate-x-6' :
                          heroSectionProps.alignment === 'right' ? 'translate-x-6' :
                            'translate-x-0'
                          }`}>
                          <div className="relative w-full max-w-[220px]">

                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                              <div className="w-[90%] h-[90%] bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300 opacity-20 blur-2xl rounded-full"></div>

                              <div className="absolute w-[70%] h-[50%] bg-cyan-300 opacity-20 blur-2xl rounded-full"></div>

                              <div className="absolute w-[40%] h-[40%] bg-pink-400 opacity-20 rounded-full bottom-2 right-2"></div>

                              <div className="absolute w-[60%] h-[80%] bg-cyan-300 opacity-20 blur-2xl rounded-[60%_40%_55%_45%] -top-4 -left-4"></div>

                              <div className="absolute w-[65%] h-[95%] bg-white/70 rounded-[80px] rotate-[-30deg] shadow-md"></div>
                            </div>

                            {/* Profile Image */}
                            <div className="relative overflow-hidden border-4 border-white z-10 transition-all duration-300 mx-auto"
                              style={{
                                width: `${heroImageProps.width}px`,
                                height: `${heroImageProps.height}px`,
                                maxWidth: '100%',
                                borderRadius: `${heroImageProps.borderRadius}%`,
                                boxShadow: heroImageProps.shadow ? '0 10px 25px rgba(0,0,0,0.3)' : 'none',
                                opacity: heroImageProps.opacity / 100
                              }}>
                              <img
                                src="/portfoliologo.webp"
                                alt="Srinivas Pentakota - UI/UX Designer Portfolio"
                                className="w-full h-full"
                                style={{ objectFit: heroImageProps.objectFit as any }}
                              />
                            </div>

                          </div>
                        </div>


                        <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">

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
                            Download CV
                          </Link>

                        </div>
                      </div>

                      {/* DESKTOP BLOBS */}
                      <div className={`hidden lg:flex lg:w-[45%] xl:w-[40%] items-center justify-center relative min-h-[400px] transition-transform duration-500 ${heroSectionProps.alignment === 'left' ? '-translate-x-12' :
                        heroSectionProps.alignment === 'right' ? 'translate-x-12' :
                          'translate-x-0'
                        }`}>
                        <div className="relative w-full max-w-[400px] h-full flex items-center justify-center">
                          <div className="absolute w-[300px] h-[300px] bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300 opacity-20 blur-2xl rounded-full animate-[float_6s_ease-in-out_infinite]"></div>
                          <div className="absolute w-[200px] h-[150px] right-10 top-10 bg-cyan-300 opacity-20 blur-2xl rounded-full animate-[float_7s_ease-in-out_infinite]"></div>
                          <div className="absolute w-[100px] h-[100px] left-17 bottom-22 bg-pink-400 opacity-20 rounded-full animate-[float_5s_ease-in-out_infinite]"></div>
                          <div className="absolute w-[140px] h-[230px] bg-white/70 rounded-[80px] rotate-[-30deg] shadow-md animate-[float_6s_ease-in-out_infinite]"></div>
                          <div className="relative overflow-hidden border-4 border-white z-20 animate-[float_6s_ease-in-out_infinite] transition-all duration-300"
                            style={{
                              width: `${heroImageProps.width}px`,
                              height: `${heroImageProps.height}px`,
                              borderRadius: `${heroImageProps.borderRadius}%`,
                              boxShadow: heroImageProps.shadow ? '0 10px 25px rgba(0,0,0,0.3)' : 'none',
                              opacity: heroImageProps.opacity / 100
                            }}>
                            <img src="/portfoliologo.webp" alt="Srinivas Pentakota - UI/UX Designer Portfolio" className="w-full h-full" style={{ objectFit: heroImageProps.objectFit as any }} />
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* STATS */}

                    <div ref={statsRef} className="flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-6 lg:gap-8 mt-12 md:mt-15 mb-2 w-full flex-wrap">
                      {stats.map((item, i) => (
                        <div
                          key={i}
                          className={`flex-1 min-w-[140px] sm:min-w-[160px] max-w-[280px] mx-auto sm:mx-0 bg-white py-4 min-h-[6rem] px-4 rounded-lg flex flex-col items-center justify-center text-gray-700 transition transform hover:-translate-y-2 text-center ${heroSectionProps.shadow ? 'shadow-md hover:shadow-xl' : ''}`}
                        >
                          <h5 className="text-2xl font-bold">
                            {statsInView ? (
                              <CountUp
                                key={statsInView ? "start" : "reset"} // 👈 important fix
                                start={0}
                                end={item.value}
                                duration={2}
                                suffix={item.suffix}
                              />
                            ) : (
                              "0"
                            )}
                          </h5>

                          <span className="text-sm mt-1 break-words">{item.label}</span>
                        </div>
                      ))}
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


                {/* ABOUT SECTION */}
                {/* <div className="w-full bg-[#F2F2F2] px-6 md:px-12 lg:px-20 py-16 md:py-24"> */}
                <div id="about" className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-10 md:py-16">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">About</h2>
                    <span className="bg-[#63e5ff] text-gray-900 font-extrabold px-3 py-1 rounded-full text-2xl md:text-3xl tracking-tight leading-none">Me</span>
                  </div>

                  <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-extrabold text-gray-800 mb-8 md:mb-16 max-w-full md:max-w-3xl leading-relaxed break-words text-center md:text-left">
                    Described Briefly My Professional Background Skills and Accomplishments
                  </h3>

                  {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 border-b border-white pb-6"> */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-b border-white pb-6">

                    {/* LEFT → TEXT */}
                    <div className="flex flex-col justify-center">

                      <p className="font-extrabold text-gray-800 text-lg md:text-2xl mb-4 md:mb-6 leading-snug">
                        Hello! I'm a UI/UX Designer providing awesome and modern design solutions for clients. My vision is to satisfy my clients.
                      </p>

                      <p className="text-gray-500 mb-6 md:mb-0 leading-relaxed text-sm md:text-lg">
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                      </p>

                    </div>


                    <div ref={skillsRef} className="space-y-6 md:space-y-8">
                      {skills.map((skill, index) => (
                        <div key={skill.name}>
                          <div className="flex justify-between mb-2 md:mb-3">
                            <span className="font-bold text-gray-800 text-sm md:text-lg">
                              {skill.name}
                            </span>
                            <span className="text-gray-500 text-xs md:text-sm">
                              {skill.value}%
                            </span>
                          </div>

                          <div className="w-full bg-gray-300 h-[4px] md:h-[6px] overflow-hidden">
                            <div
                              className="bg-[#1a3636] h-full transition-all duration-1000 ease-out"
                              style={{
                                width: skillsInView ? `${skill.value}%` : "0%",
                                transitionDelay: `${index * 150}ms`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* EDUCATION & EXPERIENCE SECTION */}
                <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 pb-12 md:pb-16 lg:pb-24">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">

                    {/* EDUCATION */}
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 border-b border-gray-200 pb-3">
                        Education
                      </h3>

                      <div className="space-y-5 md:space-y-6">

                        {[
                          { id: "01", date: "March 2013 - 2016", title: "Computer Science" },
                          { id: "02", date: "March 2017 - 2018", title: "Graphic Design" },
                          { id: "03", date: "June 2019 - 2021", title: "Web Development" },
                        ].map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start sm:items-center gap-4 sm:gap-6 border-b border-gray-200 pb-4 sm:pb-6"
                          >
                            {/* NUMBER */}
                            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-[#1a3636] text-white rounded-full flex justify-center items-center font-bold text-xs sm:text-sm">
                              {item.id}
                            </div>

                            {/* TEXT */}
                            <div className="flex-1">
                              <p className="text-gray-500 text-xs sm:text-sm mb-1 font-medium break-words">
                                {item.date}
                              </p>
                              <h4 className="text-base sm:text-lg font-bold text-gray-800 break-words">
                                {item.title}
                              </h4>
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>

                    {/* EXPERIENCE */}
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 border-b border-gray-200 pb-3">
                        Experience
                      </h3>

                      <div className="space-y-5 md:space-y-6">

                        {[
                          { id: "01", date: "January 2021 - 2022", title: "Microsoft" },
                          { id: "02", date: "March 2022 - 2023", title: "Google Inc" },
                        ].map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start sm:items-center gap-4 sm:gap-6 border-b border-gray-200 pb-4 sm:pb-6"
                          >
                            {/* NUMBER */}
                            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-[#1a3636] text-white rounded-full flex justify-center items-center font-bold text-xs sm:text-sm">
                              {item.id}
                            </div>

                            {/* TEXT */}
                            <div className="flex-1">
                              <p className="text-gray-500 text-xs sm:text-sm mb-1 font-medium break-words">
                                {item.date}
                              </p>
                              <h4 className="text-base sm:text-lg font-bold text-gray-800 break-words">
                                {item.title}
                              </h4>
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>

                  </div>
                </div>
                {/* </div> */}

                {/* MY SERVICES SECTION */}
                <div className="w-full px-6 md:px-12 lg:px-20 pb-16 lg:pb-24">
                  <div className="text-center mb-16">
                    {/* <h3 className="text-base font-bold flex items-center justify-center gap-1 mb-4 text-gray-800 tracking-wide"> */}
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">My</h2>
                      <span className="bg-[#63e5ff] text-gray-900 font-extrabold px-3 py-1 rounded-full text-2xl md:text-3xl tracking-tight leading-none">Services</span>
                    </div>
                    {/* <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 max-w-2xl mx-auto leading-tight"> */}

                    <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-extrabold text-gray-800 mb-8 md:mb-16 max-w-full md:max-w-3xl leading-relaxed break-words text-center md:text-left">
                      Provide Wide Range of  Digital Services
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
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
                      <div key={service.id} className={`border border-gray-200 rounded-[20px] p-5 sm:p-6 lg:p-8 flex flex-col items-start transition-all duration-300 hover:-translate-y-2 bg-white group hover:border-gray-300 cursor-pointer h-full ${heroSectionProps.shadow ? 'shadow-md hover:shadow-xl' : ''}`}>
                        <div className="w-12 h-12 mb-4 sm:mb-6 flex items-center justify-center text-gray-800 shrink-0">
                          {service.id === "01" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>}
                          {service.id === "02" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>}
                          {service.id === "03" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>}
                          {service.id === "04" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><circle cx="12" cy="10" r="2"></circle></svg>}
                          {service.id === "05" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path></svg>}
                          {service.id === "06" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>}
                          {service.id === "07" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>}
                          {service.id === "08" && <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h1.76a1 1 0 0 1 .84.45l2.4 3.6a1 1 0 0 1-.84 1.55H11z"></path><path d="M18 10h-2V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4z"></path></svg>}
                        </div>
                        <h4 className="text-[17px] font-bold text-gray-900 mb-2 sm:mb-3">{service.title}</h4>
                        <p className="text-gray-500 text-[13px] leading-relaxed mb-6 sm:mb-8 flex-1">
                          {service.desc}
                        </p>
                        <div className="mt-auto flex items-center gap-1.5 w-full shrink-0">
                          <div className="w-[30px] h-[30px] rounded-full bg-[#1a3636] text-white flex items-center justify-center text-[11px] font-semibold shrink-0 group-hover:bg-[#63e5ff] group-hover:text-gray-900 transition-colors">
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

                <div id="projects" className="w-full px-0 md:px-6 lg:px-12 pb-16 lg:pb-24 relative overflow-hidden">

                  {/* <div className="px-6 md:px-6 lg:px-8 mb-12">
                    <h2 className="text-base font-bold flex items-center gap-1 mb-4 text-gray-800 tracking-wide w-max">
                      My <span className="bg-[#c4ff0b] text-gray-900 px-2 py-0.5 rounded-full text-sm font-extrabold ml-1 leading-none shadow-sm flex items-center h-6">Projects</span>
                    </h2>
                    <h3 className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-gray-900 max-w-2xl leading-[1.15]">
                      Showcase Your Talent with our <br className="hidden md:block" /> Latest Works
                    </h3>
                  </div> */}
                  <div className="text-center mb-16">
                    {/* <h3 className="text-base font-bold flex items-center justify-center gap-1 mb-4 text-gray-800 tracking-wide"> */}
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">My</h2>
                      <span className="bg-[#63e5ff] text-gray-900 font-extrabold px-3 py-1 rounded-full text-2xl md:text-3xl tracking-tight leading-none">Projects</span>
                    </div>
                    {/* <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 max-w-2xl mx-auto leading-tight"> */}

                    <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-extrabold text-gray-800 mb-8 md:mb-16 max-w-full md:max-w-3xl leading-relaxed break-words text-center md:text-left">
                      Showcase Your Talent with our <br className="hidden md:block" /> Latest Works
                    </h3>
                  </div>


                  <div
                    id="projects-slider"
                    className="w-full overflow-x-auto flex gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden scroll-smooth"
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
                        img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&h=500&fit=crop"
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
                      <div key={i} className="flex flex-col flex-none w-[240px] sm:w-[260px] max-w-[80vw] shrink-0 snap-start cursor-pointer group">
                        <div className={`w-full aspect-square rounded-[20px] overflow-hidden mb-4 sm:mb-5 relative border border-gray-100 ${heroSectionProps.shadow ? 'shadow-sm hover:shadow-md' : ''}`}>
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10 w-full h-full"></div>
                          <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="flex items-start mb-3">
                          <span className="bg-[#63e5ff] border border-gray-900 text-gray-900 px-3.5 py-1.5 rounded-full text-[11px] font-semibold leading-none">
                            {proj.tag}
                          </span>
                        </div>
                        <h4 className="font-bold text-[15px] text-gray-900 leading-snug group-hover:text-[#1a3636] transition-colors mt-1">{proj.title}</h4>
                      </div>
                    ))}
                  </div>


                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 w-full relative px-4 sm:px-8">
                    <button
                      onClick={() => {
                        const slider = document.getElementById('projects-slider');
                        if (slider) slider.scrollBy({ left: -280, behavior: 'smooth' });
                      }}
                      className="flex items-center justify-center p-2 group hover:opacity-70 transition-opacity cursor-pointer"
                      aria-label="Slide Left"
                    >
                      <svg width="40" height="16" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] sm:w-[60px]">
                        <path d="M10 5L5 10L10 15M5 10H55" stroke="#1a3636" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
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
                      <svg width="40" height="16" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[40px] sm:w-[60px]">
                        <path d="M50 5L55 10L50 15M55 10H5" stroke="#1a3636" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* <button
                      className="md:absolute right-4 md:right-8 bg-[#1a3636] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-transform ml-auto md:ml-0 shrink-0"
                      aria-label="Scroll to top"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                    </button> */}
                  </div>
                </div>

                {/* CONTACT SECTION */}
                <div id="contact" className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 lg:py-24 relative border-t border-gray-100">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start lg:items-center">

                    <div>
                      {/* <h2 className="text-base font-bold flex items-center gap-1 mb-4 text-gray-800 tracking-wide w-max">
                        Get In <span className="bg-[#c4ff0b] text-gray-900 px-2 py-0.5 rounded-full text-sm font-extrabold ml-1 leading-none shadow-sm flex items-center h-6">Touch</span>
                      </h2> */}
                      <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Get In</h2>
                        <span className="bg-[#63e5ff] text-gray-900 font-extrabold px-3 py-1 rounded-full text-2xl md:text-3xl tracking-tight leading-none">Touch</span>
                      </div>
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

                    <div className={`bg-white rounded-2xl p-6 md:p-8 border border-gray-100 ${heroSectionProps.shadow ? 'shadow-xl shadow-gray-200/50' : ''}`}>
                      <form className="space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Your Name</label>
                            <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#63e5ff] focus:border-transparent transition-all" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Your Email</label>
                            <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#63e5ff] focus:border-transparent transition-all" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Subject</label>
                          <input type="text" placeholder="Web Design Inquiry" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#63e5ff] focus:border-transparent transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Message</label>
                          <textarea rows={4} placeholder="Tell us about your project..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#63e5ff] focus:border-transparent transition-all resize-none"></textarea>
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
                {/* <footer className="w-full bg-[#1a3636] text-white py-10 sm:py-12 px-4 sm:px-6 md:px-12 lg:px-20 relative rounded-b-xl">
                  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 sm:gap-8 border-b border-white/10 pb-8 sm:pb-10">

                    <div className="flex flex-col items-center md:items-start gap-4">
                      <div className="text-xl font-black tracking-widest uppercase flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#477892] text-[#06224C] rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
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

                  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center mt-6 gap-4 text-xs text-gray-400 text-center lg:text-left">
                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-6 font-medium">
                      <span className="hover:text-[#c4ff0b] cursor-pointer transition-colors">Home</span>
                      <span className="hover:text-[#c4ff0b] cursor-pointer transition-colors">About</span>
                      <span className="hover:text-[#c4ff0b] cursor-pointer transition-colors">Services</span>
                      <span className="hover:text-[#c4ff0b] cursor-pointer transition-colors">Projects</span>
                      <span className="hover:text-[#c4ff0b] cursor-pointer transition-colors">Contact</span>
                    </div>

                    <p>© 2026 Srinivas Pentakota. All rights reserved.</p>
                  </div>
                </footer> */}
                {/* MODERN FOOTER */}
                <footer className="w-full pt-14 pb-8 px-4 sm:px-6 md:px-12 lg:px-20 rounded-b-xl relative overflow-hidden" style={{ backgroundColor: heroSectionProps.footerBg, color: heroSectionProps.footerText }}>

                  {/* TOP SECTION */}
                  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b pb-10" style={{ borderColor: heroSectionProps.footerText + '20' }}>

                    {/* BRAND */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 bg-[#63e5ff] text-[#06224C] rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          S
                        </div>
                        <h2 className="text-xl font-bold tracking-wide">Srinivas</h2>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ opacity: 0.7 }}>
                        Crafting modern, user-friendly interfaces with a focus on clean design
                        and meaningful user experiences.
                      </p>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                      <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ opacity: 0.9 }}>
                        Quick Links
                      </h3>
                      <ul className="space-y-2 text-sm" style={{ opacity: 0.7 }}>
                        {["Home", "About", "Services", "Projects", "Contact"].map((item) => (
                          <li key={item}>
                            <a
                              href="#"
                              className="hover:text-[#c4ff0b] transition-colors"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* SERVICES */}
                    <div>
                      <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ opacity: 0.9 }}>
                        Services
                      </h3>
                      <ul className="space-y-2 text-sm" style={{ opacity: 0.7 }}>
                        <li className="hover:text-[#c4ff0b] cursor-pointer">UI/UX Design</li>
                        <li className="hover:text-[#c4ff0b] cursor-pointer">Web Design</li>
                        <li className="hover:text-[#c4ff0b] cursor-pointer">Mobile Design</li>
                        <li className="hover:text-[#c4ff0b] cursor-pointer">Branding</li>
                      </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                      <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ opacity: 0.9 }}>
                        Contact
                      </h3>
                      <ul className="space-y-2 text-sm" style={{ opacity: 0.7 }}>
                        <li>Email: yourmail@gmail.com</li>
                        <li>Phone: +91 98765 43210</li>
                        <li>Location: India</li>
                      </ul>

                      {/* SOCIAL ICONS */}
                      <div className="flex gap-3 mt-5">
                        <a className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#c4ff0b] hover:text-black transition" style={{ backgroundColor: heroSectionProps.footerText + '20' }}>
                          <FaXTwitter size={14} />
                        </a>
                        <a className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#c4ff0b] hover:text-black transition" style={{ backgroundColor: heroSectionProps.footerText + '20' }}>
                          <FaLinkedinIn size={14} />
                        </a>
                        <a className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#c4ff0b] hover:text-black transition" style={{ backgroundColor: heroSectionProps.footerText + '20' }}>
                          <FaInstagram size={14} />
                        </a>
                        <a className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#c4ff0b] hover:text-black transition" style={{ backgroundColor: heroSectionProps.footerText + '20' }}>
                          <FaGlobe size={14} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM BAR */}
                  <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row justify-between items-center text-xs gap-3 text-center md:text-left" style={{ opacity: 0.6 }}>
                    <p>© 2026 Srinivas Pentakota. All rights reserved.</p>

                    <div className="flex gap-4">
                      <span className="hover:text-[#c4ff0b] cursor-pointer">Privacy Policy</span>
                      <span className="hover:text-[#c4ff0b] cursor-pointer">Terms</span>
                    </div>
                  </div>

                  {/* BACKGROUND GLOW EFFECT */}
                  <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#c4ff0b]/10 rounded-full blur-3xl"></div>
                </footer>

              </div>
            </div>

            {/* <div className="w-full flex items-center justify-between mt-8 px-4"> */}
            <div className="w-full flex items-center justify-between px-4 py-3 mt-10 border-t bg-white">

              {/* 
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
              </button> */}

            </div>
          </div>


        </div>

        {/* RIGHT SIDEBAR */}
        {/* RIGHT TOGGLE BUTTON */}
        {/* RIGHT SIDEBAR TOGGLE BUTTON */}
        <button
          onClick={() => setShowRightSidebar(true)}
          className="hidden"
        >
          ◀
        </button>

        {/* DESKTOP RIGHT SIDEBAR */}
        {!isPreviewMode && (
          <aside
            className="hidden lg:flex lg:static top-0 right-0 lg:h-auto lg:self-stretch z-50 overflow-y-auto shrink-0 w-52 bg-white text-[#06224C] flex-col p-4 space-y-4 border-l border-[#06224C]/20"
          >
            {/* TABS */}
            <div className="flex justify-center gap-2 text-sm font-semibold mt-6">
              <button
                onClick={() => setActiveTab("properties")}
                className={`pb-1 border-b-2 transition-all duration-300
      ${activeTab === "properties"
                    ? "border-[#06224C]"
                    : "border-transparent hover:border-[#06224C]/40"
                  }`}
              >
                Properties
              </button>

              <span className="select-none text-[#06224C]/40">|</span>

              <button
                onClick={() => setActiveTab("styles")}
                className={`pb-1 border-b-2 transition-all duration-300
      ${activeTab === "styles"
                    ? "border-[#06224C]"
                    : "border-transparent hover:border-[#06224C]/40"
                  }`}
              >
                Styles
              </button>

              {isIconActive && (
                <>
                  <span className="select-none text-[#06224C]/40">|</span>

                  <button
                    onClick={() => setActiveTab("icons")}
                    className={`pb-1 border-b-2 transition-all duration-300
          ${activeTab === "icons"
                        ? "border-[#06224C]"
                        : "border-transparent hover:border-[#06224C]/40"
                      }`}
                  >
                    Icons
                  </button>
                </>
              )}
            </div>

            {/* ================= PROPERTIES ================= */}
            {activeTab === "properties" && (
              <div>
                {/* Image Settings */}
                <div className="mb-6">
                  <div
                    onClick={() => setShowImageSettings(!showImageSettings)}
                    className="flex justify-between cursor-pointer mb-4 
          transition hover:bg-[#06224C]/5 px-2 py-1 rounded"
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
                        <p className="text-sm text-[#06224C]/70 flex-1">Width</p>
                        <input
                          type="number"
                          value={heroImageProps.width}
                          onChange={(e) => setHeroImageProps({ ...heroImageProps, width: Number(e.target.value) })}
                          className="w-[80px] bg-transparent border border-[#06224C] rounded-full px-3 py-1 text-xs text-[#06224C] text-center
                transition-all duration-200 hover:border-[#06224C]/70 focus:border-[#06224C] focus:ring-1 focus:ring-[#06224C]/30"
                        />
                      </div>

                      {/* Height */}
                      <div className="flex items-center gap-4">
                        <p className="text-sm text-[#06224C]/70 flex-1">Height</p>
                        <input
                          type="number"
                          value={heroImageProps.height}
                          onChange={(e) => setHeroImageProps({ ...heroImageProps, height: Number(e.target.value) })}
                          className="w-[80px] bg-transparent border border-[#06224C] rounded-full px-3 py-1 text-xs text-[#06224C] text-center
                transition-all duration-200 hover:border-[#06224C]/70 focus:border-[#06224C] focus:ring-1 focus:ring-[#06224C]/30"
                        />
                      </div>

                      {/* Border Radius */}
                      <div>
                        <p className="text-sm text-[#06224C]/70 mb-2">Border Radius (%)</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0" max="50"
                            value={heroImageProps.borderRadius}
                            onChange={(e) => setHeroImageProps({ ...heroImageProps, borderRadius: Number(e.target.value) })}
                            className="w-20 h-1 bg-[#06224C]/20 rounded-lg cursor-pointer accent-[#06224C] 
                  transition hover:accent-[#041733]"
                          />
                          <input
                            type="number"
                            min="0" max="50"
                            value={heroImageProps.borderRadius}
                            onChange={(e) => setHeroImageProps({ ...heroImageProps, borderRadius: Number(e.target.value) })}
                            className="w-20 bg-transparent border border-[#06224C] rounded-full px-3 py-1 text-xs text-[#06224C] text-center
                  transition-all duration-200 hover:border-[#06224C]/70 focus:border-[#06224C]"
                          />
                        </div>
                      </div>

                      {/* Shadow Toggle */}
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-[#06224C]/70">Shadow</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={heroImageProps.shadow}
                            onChange={(e) => setHeroImageProps({ ...heroImageProps, shadow: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-gray-300 rounded-full peer 
                transition-all duration-300 peer-checked:bg-[#06224C] hover:shadow-sm
                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all
                peer-checked:after:translate-x-4"></div>
                        </label>
                      </div>

                      {/* Opacity */}
                      <div>
                        <p className="text-sm text-[#06224C]/70 mb-2">Opacity (%)</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0" max="100"
                            value={heroImageProps.opacity}
                            onChange={(e) => setHeroImageProps({ ...heroImageProps, opacity: Number(e.target.value) })}
                            className="w-20 h-1 bg-[#06224C]/20 rounded-lg cursor-pointer accent-[#06224C]
                  transition hover:accent-[#041733]"
                          />
                          <input
                            type="number"
                            min="0" max="100"
                            value={heroImageProps.opacity}
                            onChange={(e) => setHeroImageProps({ ...heroImageProps, opacity: Number(e.target.value) })}
                            className="w-20 bg-transparent border border-[#06224C] rounded-full px-3 py-1 text-xs text-[#06224C] text-center
                  transition-all duration-200 hover:border-[#06224C]/70 focus:border-[#06224C]"
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
                    className="flex justify-between cursor-pointer mb-4 
          transition hover:bg-[#06224C]/5 px-2 py-1 rounded"
                  >
                    <p className="text-sm font-semibold">Position</p>
                    <FaChevronDown
                      className={`text-xs transition ${showPosition ? "rotate-180" : ""
                        }`}
                    />
                  </div>

                  {showPosition && (
                    <div className="space-y-5">
                      <div>
                        <p className="text-sm text-[#06224C]/70 mb-2">Alignment</p>
                        <select
                          value={heroSectionProps.alignment}
                          onChange={(e) => setHeroSectionProps({ ...heroSectionProps, alignment: e.target.value })}
                          className="w-full border border-[#06224C]/30 rounded py-2 px-2 text-sm bg-transparent outline-none transition-all duration-300 hover:border-[#06224C] focus:border-[#06224C]"
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>

                      <div>
                        <p className="text-sm text-[#06224C]/70 mb-2">Object Fit</p>
                        <select
                          value={heroImageProps.objectFit}
                          onChange={(e) => setHeroImageProps({ ...heroImageProps, objectFit: e.target.value })}
                          className="w-full border border-[#06224C]/30 rounded py-2 px-2 text-sm bg-transparent outline-none transition-all duration-300 hover:border-[#06224C] focus:border-[#06224C]"
                        >
                          <option value="cover">Cover</option>
                          <option value="contain">Contain</option>
                          <option value="fill">Fill</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ================= STYLES ================= */}
            {activeTab === "styles" && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  {editingLayoutElement !== 'main' && (
                    <button onClick={() => setEditingLayoutElement('main')} className="text-[#06224C]/50 hover:text-[#06224C]">
                      <FaChevronLeft size={12} />
                    </button>
                  )}
                  <p className="text-sm text-[#06224C] font-bold capitalize">
                    {editingLayoutElement === 'main' ? 'Main Container' : editingLayoutElement} Style Settings
                  </p>
                </div>

                <div className="space-y-6">
                  {editingLayoutElement === 'main' && (
                    <>
                      <div>
                        <p className="text-xs text-[#06224C]/70 mb-1">Background Color</p>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={heroSectionProps.backgroundColor}
                            onChange={(e) => setHeroSectionProps({ ...heroSectionProps, backgroundColor: e.target.value })}
                            className="w-10 h-10 cursor-pointer bg-transparent border-0 p-0"
                          />
                          <span className="text-xs text-[#06224C]/70 font-mono">{heroSectionProps.backgroundColor}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-[#06224C]/70 mb-1">Box Shadow</p>
                        <label className="flex gap-2 items-center cursor-pointer text-sm">
                          <input
                            type="checkbox"
                            checked={heroSectionProps.shadow}
                            onChange={(e) => setHeroSectionProps({ ...heroSectionProps, shadow: e.target.checked })}
                          />
                          Enable
                        </label>
                      </div>

                    </>
                  )}

                  {editingLayoutElement === 'text' && (
                    <>
                      <div>
                        <p className="text-xs text-[#06224C]/70 mb-1">Color</p>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={textStyles.color || '#000000'}
                            onChange={(e) => handleTextStyleChange('color', e.target.value)}
                            className="w-10 h-10 cursor-pointer bg-transparent border-0 p-0"
                          />
                          <span className="text-xs text-[#06224C]/70 font-mono">{textStyles.color || 'Default'}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-[#06224C]/70 mb-1">Font Size (px)</p>
                        <input
                          type="number"
                          value={textStyles.fontSize}
                          onChange={(e) => handleTextStyleChange('fontSize', e.target.value)}
                          placeholder="e.g. 16"
                          className="w-full rounded bg-[#F4F6FA] p-2 text-[#06224C] border border-[#06224C]/20 transition-all focus:border-[#06224C]"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-[#06224C]/70 mb-1">Font Family</p>
                        <select
                          value={textStyles.fontFamily}
                          onChange={(e) => handleTextStyleChange('fontFamily', e.target.value)}
                          className="w-full rounded bg-[#F4F6FA] p-2 text-sm text-[#06224C] border border-[#06224C]/20 transition-all focus:border-[#06224C]"
                        >
                          <option value="">Default</option>
                          <option value="Arial, sans-serif">Arial</option>
                          <option value="'Times New Roman', serif">Times New Roman</option>
                          <option value="'Courier New', monospace">Courier New</option>
                          <option value="Georgia, serif">Georgia</option>
                          <option value="Verdana, sans-serif">Verdana</option>
                        </select>
                      </div>
                    </>
                  )}

                  {editingLayoutElement === 'header' && (
                    <>
                      <div>
                        <p className="text-xs text-[#06224C]/70 mb-1">Background Color</p>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={heroSectionProps.headerBg}
                            onChange={(e) => setHeroSectionProps({ ...heroSectionProps, headerBg: e.target.value })}
                            className="w-10 h-10 cursor-pointer bg-transparent border-0 p-0"
                          />
                          <span className="text-xs text-[#06224C]/70 font-mono">{heroSectionProps.headerBg}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-[#06224C]/70 mb-1">Text Color</p>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={heroSectionProps.headerText}
                            onChange={(e) => setHeroSectionProps({ ...heroSectionProps, headerText: e.target.value })}
                            className="w-10 h-10 cursor-pointer bg-transparent border-0 p-0"
                          />
                          <span className="text-xs text-[#06224C]/70 font-mono">{heroSectionProps.headerText}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {editingLayoutElement === 'footer' && (
                    <>
                      <div>
                        <p className="text-xs text-[#06224C]/70 mb-1">Background Color</p>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={heroSectionProps.footerBg}
                            onChange={(e) => setHeroSectionProps({ ...heroSectionProps, footerBg: e.target.value })}
                            className="w-10 h-10 cursor-pointer bg-transparent border-0 p-0"
                          />
                          <span className="text-xs text-[#06224C]/70 font-mono">{heroSectionProps.footerBg}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-[#06224C]/70 mb-1">Text Color</p>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={heroSectionProps.footerText}
                            onChange={(e) => setHeroSectionProps({ ...heroSectionProps, footerText: e.target.value })}
                            className="w-10 h-10 cursor-pointer bg-transparent border-0 p-0"
                          />
                          <span className="text-xs text-[#06224C]/70 font-mono">{heroSectionProps.footerText}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* ================= ICONS ================= */}
            {activeTab === "icons" && (
              <div className="mt-4">
                {/* Search */}
                <div className="relative mb-5">
                  <input type="text" placeholder="Search Icons..." className="w-full bg-[#F4F6FA] border border-[#06224C]/20 rounded-md py-2 px-3 text-xs text-[#06224C] placeholder-[#06224C]/50 focus:outline-none focus:border-[#06224C]" />
                </div>

                {/* Options Row */}
                <div className="flex flex-col gap-2 mb-5 w-full">
                  <div className="flex items-center gap-2 w-full">
                    <div className="flex items-center gap-1.5 bg-[#F4F6FA] border border-[#06224C]/20 rounded-md px-2 py-1.5 cursor-pointer flex-1">
                      <div className="w-3 h-3 rounded-full bg-[#FFD700] border border-[#06224C]/20 shrink-0"></div>
                      <span className="text-[10px] font-semibold truncate">Color</span>
                      <FaChevronDown className="text-[8px] ml-auto text-[#06224C]/50 shrink-0" />
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#F4F6FA] border border-[#06224C]/20 rounded-md px-2 py-1.5 cursor-pointer flex-1">
                      <span className="text-[11px] font-bold shrink-0">T↕</span>
                      <span className="text-[10px] font-semibold truncate">Size</span>
                      <FaChevronDown className="text-[8px] ml-auto text-[#06224C]/50 shrink-0" />
                    </div>
                  </div>
                  <button className="w-full bg-[#63e5ff] text-[#06224C] hover:bg-[#4ac5df] transition font-semibold text-[10px] px-2 py-2 rounded-md">
                    Browser or Import
                  </button>
                </div>

                {/* Recently Used */}
                <h4 className="text-xs font-bold mb-4">Recently Used</h4>
                <div className="grid grid-cols-4 gap-y-5 gap-x-2 mb-8 justify-items-center">
                  <FaUserCircle size={22} className="cursor-pointer hover:text-[#63e5ff] transition" />
                  <FaShareAlt size={22} className="cursor-pointer hover:text-[#63e5ff] transition" />
                  <FaShoppingCart size={22} className="cursor-pointer hover:text-[#63e5ff] transition" />
                  <FaReply size={22} className="cursor-pointer hover:text-[#63e5ff] transition" />
                  <FaEnvelope size={22} className="cursor-pointer hover:text-[#63e5ff] transition" />
                  <FaCog size={22} className="cursor-pointer hover:text-[#63e5ff] transition" />
                  <FaBell size={22} className="cursor-pointer hover:text-[#63e5ff] transition" />
                  <FaEyeSlash size={22} className="cursor-pointer hover:text-[#63e5ff] transition" />
                  <FaSave size={22} className="cursor-pointer hover:text-[#63e5ff] transition" />
                  <FaEye size={22} className="cursor-pointer hover:text-[#63e5ff] transition" />
                  <FaFacebookF size={22} className="cursor-pointer hover:text-[#63e5ff] transition" />
                  <FaQuestionCircle size={22} className="cursor-pointer hover:text-[#63e5ff] transition" />
                </div>

                {/* Thickness */}
                <h4 className="text-xs font-bold mb-3">Thickness</h4>
                <div className="flex items-center gap-3">
                  <input type="range" min="10" max="100" defaultValue="58" className="flex-1 h-1 bg-[#06224C]/20 rounded-lg appearance-none cursor-pointer accent-[#06224C]" />
                  <div className="bg-[#F4F6FA] border border-[#06224C]/20 rounded px-2 py-1 text-[10px] font-semibold">
                    58 px
                  </div>
                </div>
              </div>
            )}
          </aside>
        )}


      </div>
      <footer className="w-full bg-[#051b3b] text-white shrink-0 py-10 sm:py-12 border-t-2 border-gray-300">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">

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


              <p className="text-[12px] text-white/70 max-w-[220px]">
                The <strong className="text-white">NO-CODE</strong> website builder for everyone. Powered by AWS infrastructure, built by<strong className="text-white"> The Stackly team.</strong>
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
                aria-label="Visit Stackly website"
                className="hover:scale-110 hover:text-blue-600 transition"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://www.youtube.com/@TheStackly"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Stackly website"
                className="hover:scale-110 hover:text-red-600 transition"
              >
                <FaYoutube size={14} />
              </a>
              <a
                href="https://www.instagram.com/the_stackly/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Stackly website"
                className="hover:scale-110 hover:text-pink-600 transition"
              >
                <FaInstagram size={14} />
              </a>

              <a
                href="https://x.com/the_stackly"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Stackly website"
                className="hover:scale-110 hover:text-black transition"
              >
                <FaXTwitter size={14} />
              </a>

              <a
                href="https://www.linkedin.com/company/the-stackly"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Stackly website"
                className="hover:scale-110 hover:text-blue-700 transition"
              >
                <FaLinkedinIn size={14} />
              </a>

              <a
                href="https://www.thestackly.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Stackly website"
                className="hover:scale-110 hover:text-green-600 transition"
              >
                <FaGlobe size={14} />
              </a>

            </div>

            {/* COPYRIGHT */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[12px] text-white/70 text-center mt-6 md:mt-0">
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
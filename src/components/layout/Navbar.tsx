"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import OptimizedImage from "../ui/OptimizedImage";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Navbar Component
 *
 * This component represents the main navigation for the site.
 * It includes the logo, navigation links, language selector, and contact button.
 *
 * @returns {JSX.Element} The rendered Navbar component
 */
const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [isLoading, setIsLoading] = useState(false);

  // Dropdown states
  const [isSolutionsMenuOpen, setIsSolutionsMenuOpen] = useState(false);
  const [isIndustriesMenuOpen, setIsIndustriesMenuOpen] = useState(false);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Mobile submenu states
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  // Refs for handling click outside
  const navbarRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Check if the current path matches the link
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }

    // Special case for the More dropdown items
    if (path === '/about' || path === '/careers' || path === '/contact' || path === '/faq') {
      return location.pathname === path;
    }

    // For other paths, check if the current path starts with the given path
    return location.pathname.startsWith(path);
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close Solutions dropdown if clicked outside
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setIsSolutionsMenuOpen(false);
      }

      // Close Industries dropdown if clicked outside
      if (industriesRef.current && !industriesRef.current.contains(event.target as Node)) {
        setIsIndustriesMenuOpen(false);
      }

      // Close Resources dropdown if clicked outside
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesMenuOpen(false);
      }

      // Close More dropdown if clicked outside
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }

      // Close Language dropdown if clicked outside
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }

      // Close mobile menu if clicked outside
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
        setMobileSubmenuOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Handle window resize to close mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        setMobileSubmenuOpen(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Close all dropdowns on Escape key
      if (event.key === 'Escape') {
        setIsSolutionsMenuOpen(false);
        setIsIndustriesMenuOpen(false);
        setIsResourcesMenuOpen(false);
        setIsMoreMenuOpen(false);
        setIsLangMenuOpen(false);
        setMobileSubmenuOpen(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Dropdown menu items
  const solutionsItems = [
    { name: "Solver APIs", href: "/solutions/solver-apis" },
    { name: "Transportation Management Platform", href: "/solutions/transportation-management" },
    { name: "Routing Capabilities", href: "/solutions/routing-capabilities" },
    { name: "Consulting Services", href: "/solutions/consulting-services" },
  ];

  const industriesItems = [
    { name: "FMCG Distribution", href: "/industries/fmcg-distribution" },
    { name: "Last-Mile Delivery", href: "/industries/last-mile-delivery" },
    { name: "Cash Van Delivery", href: "/industries/cash-van-delivery" },
    { name: "Postal & Courier", href: "/industries/postal-courier" },
    { name: "Cold Chain & Pharma", href: "/industries/cold-chain-pharma" },
    { name: "EV Fleet Operations", href: "/industries/ev-fleet-operations" },
  ];

  const resourcesItems = [
    { name: "Blog", href: "/resources/blog" },
    { name: "Case Studies", href: "/resources/case-studies" },
    { name: "Whitepapers", href: "/resources/whitepapers" },
    { name: "Documentation", href: "/resources/documentation" },
  ];

  const moreItems = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  // Toggle functions for desktop dropdowns with improved accessibility
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const toggleLangMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLangMenuOpen(!isLangMenuOpen);
    // Close other dropdowns
    setIsSolutionsMenuOpen(false);
    setIsIndustriesMenuOpen(false);
    setIsResourcesMenuOpen(false);
    setIsMoreMenuOpen(false);
  }, [isLangMenuOpen]);

  const toggleSolutionsMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSolutionsMenuOpen(!isSolutionsMenuOpen);
    // Close other dropdowns
    setIsLangMenuOpen(false);
    setIsIndustriesMenuOpen(false);
    setIsResourcesMenuOpen(false);
    setIsMoreMenuOpen(false);
  }, [isSolutionsMenuOpen]);

  const toggleIndustriesMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsIndustriesMenuOpen(!isIndustriesMenuOpen);
    // Close other dropdowns
    setIsLangMenuOpen(false);
    setIsSolutionsMenuOpen(false);
    setIsResourcesMenuOpen(false);
    setIsMoreMenuOpen(false);
  }, [isIndustriesMenuOpen]);

  const toggleResourcesMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResourcesMenuOpen(!isResourcesMenuOpen);
    // Close other dropdowns
    setIsLangMenuOpen(false);
    setIsSolutionsMenuOpen(false);
    setIsIndustriesMenuOpen(false);
    setIsMoreMenuOpen(false);
  }, [isResourcesMenuOpen]);

  const toggleMoreMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMoreMenuOpen(!isMoreMenuOpen);
    // Close other dropdowns
    setIsLangMenuOpen(false);
    setIsSolutionsMenuOpen(false);
    setIsIndustriesMenuOpen(false);
    setIsResourcesMenuOpen(false);
  }, [isMoreMenuOpen]);

  // Toggle function for mobile submenu with improved accessibility
  const toggleMobileSubmenu = useCallback((menu: string) => {
    if (mobileSubmenuOpen === menu) {
      setMobileSubmenuOpen(null);
    } else {
      setMobileSubmenuOpen(menu);
    }
  }, [mobileSubmenuOpen]);

  // Animation variants for dropdowns
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.15
      }
    }
  };

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const switchLanguage = (lang: "en" | "ar") => {
    setIsLoading(true);
    setLanguage(lang);
    setIsLangMenuOpen(false);

    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <nav
      ref={navbarRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/90 backdrop-blur-md py-2"
          : "bg-transparent py-4"
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/80 backdrop-blur-sm">
          <div className="loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/">
            <OptimizedImage
              src="/logo.svg"
              alt="Vonoy"
              className="h-10"
              width={120}
              height={40}
              priority={true}
              loading="eager"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className={`relative transition-colors ${isActive('/')
              ? 'text-secondary font-medium nav-active'
              : 'text-white hover:text-secondary'}`}
          >
            Home
            {isActive('/') && <span className="nav-indicator"></span>}
          </Link>

          {/* Solutions Dropdown */}
          <div className="relative group" ref={solutionsRef}>
            <button
              onClick={toggleSolutionsMenu}
              className={`relative flex items-center transition-colors ${isActive('/solutions')
                ? 'text-secondary font-medium nav-active'
                : 'text-white hover:text-secondary'}`}
              aria-expanded={isSolutionsMenuOpen}
              aria-haspopup="true"
              aria-controls="solutions-dropdown"
            >
              Solutions
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                  isSolutionsMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              {isActive('/solutions') && <span className="nav-indicator"></span>}
            </button>

            {/* Solutions Dropdown Menu with Animation */}
            <AnimatePresence>
              {isSolutionsMenuOpen && (
                <motion.div
                  id="solutions-dropdown"
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white/90 backdrop-blur-md ring-1 ring-black/5 focus:outline-none z-10 border border-white/10"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {solutionsItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-4 py-2 text-sm hover:bg-white/50 ${isActive(item.href)
                          ? 'text-green-700 font-medium'
                          : 'text-gray-700'}`}
                        role="menuitem"
                        tabIndex={0}
                      >
                        {item.name}
                        {isActive(item.href) && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-green-500 inline-block" aria-hidden="true"></span>}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Industries Dropdown */}
          <div className="relative group" ref={industriesRef}>
            <button
              onClick={toggleIndustriesMenu}
              className={`relative flex items-center transition-colors ${isActive('/industries')
                ? 'text-secondary font-medium nav-active'
                : 'text-white hover:text-secondary'}`}
              aria-expanded={isIndustriesMenuOpen}
              aria-haspopup="true"
              aria-controls="industries-dropdown"
            >
              Industries we serve
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                  isIndustriesMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              {isActive('/industries') && <span className="nav-indicator"></span>}
            </button>

            {/* Industries Dropdown Menu with Animation */}
            <AnimatePresence>
              {isIndustriesMenuOpen && (
                <motion.div
                  id="industries-dropdown"
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white/90 backdrop-blur-md ring-1 ring-black/5 focus:outline-none z-10 border border-white/10"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {industriesItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-4 py-2 text-sm hover:bg-white/50 ${isActive(item.href)
                          ? 'text-green-700 font-medium'
                          : 'text-gray-700'}`}
                        role="menuitem"
                        tabIndex={0}
                      >
                        {item.name}
                        {isActive(item.href) && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-green-500 inline-block" aria-hidden="true"></span>}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resources Dropdown */}
          <div className="relative group" ref={resourcesRef}>
            <button
              onClick={toggleResourcesMenu}
              className={`relative flex items-center transition-colors ${isActive('/resources')
                ? 'text-secondary font-medium nav-active'
                : 'text-white hover:text-secondary'}`}
              aria-expanded={isResourcesMenuOpen}
              aria-haspopup="true"
              aria-controls="resources-dropdown"
            >
              Resources
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                  isResourcesMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              {isActive('/resources') && <span className="nav-indicator"></span>}
            </button>

            {/* Resources Dropdown Menu with Animation */}
            <AnimatePresence>
              {isResourcesMenuOpen && (
                <motion.div
                  id="resources-dropdown"
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white/90 backdrop-blur-md ring-1 ring-black/5 focus:outline-none z-10 border border-white/10"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {resourcesItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-4 py-2 text-sm hover:bg-white/50 ${isActive(item.href)
                          ? 'text-green-700 font-medium'
                          : 'text-gray-700'}`}
                        role="menuitem"
                        tabIndex={0}
                      >
                        {item.name}
                        {isActive(item.href) && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-green-500 inline-block" aria-hidden="true"></span>}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* More Dropdown */}
          <div className="relative group" ref={moreRef}>
            <button
              onClick={toggleMoreMenu}
              className={`relative flex items-center transition-colors ${isActive('/about') || isActive('/careers') || isActive('/contact') || isActive('/faq')
                ? 'text-secondary font-medium nav-active'
                : 'text-white hover:text-secondary'}`}
              aria-expanded={isMoreMenuOpen}
              aria-haspopup="true"
              aria-controls="more-dropdown"
            >
              More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                  isMoreMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              {(isActive('/about') || isActive('/careers') || isActive('/contact') || isActive('/faq')) && <span className="nav-indicator"></span>}
            </button>

            {/* More Dropdown Menu with Animation */}
            <AnimatePresence>
              {isMoreMenuOpen && (
                <motion.div
                  id="more-dropdown"
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white/90 backdrop-blur-md ring-1 ring-black/5 focus:outline-none z-10 border border-white/10"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {moreItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-4 py-2 text-sm hover:bg-white/50 ${isActive(item.href)
                          ? 'text-green-700 font-medium'
                          : 'text-gray-700'}`}
                        role="menuitem"
                        tabIndex={0}
                      >
                        {item.name}
                        {isActive(item.href) && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-green-500 inline-block" aria-hidden="true"></span>}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Removed individual links for Why Vonoy, Features, and About Us as they are now in dropdowns */}
        </div>

        {/* Language Switcher & Book a Demo Button - Only two buttons as specified */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative flex items-center" ref={langRef}>
            <button
              onClick={toggleLangMenu}
              className="text-white hover:text-white px-4 py-2 rounded-md flex items-center text-sm font-medium border border-white/30 hover:border-white/50 transition-all duration-300 bg-white/15 hover:bg-white/25 backdrop-blur-md shadow-md hover:shadow-lg"
              aria-expanded={isLangMenuOpen}
              aria-haspopup="true"
              aria-controls="language-dropdown"
            >
              <span className="text-white font-medium">{language === "en" ? "English" : "العربية"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-2 text-white transition-transform duration-200 ${
                  isLangMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Book a Demo Button */}
            <Link
              to="/demo"
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#00a79d] hover:bg-[#008f86] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a79d] transition-colors"
              aria-label="Book a Demo"
            >
              <span className="text-white">Book a Demo</span>
            </Link>

            {/* Language Dropdown with Animation */}
            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  id="language-dropdown"
                  className="absolute left-0 top-full mt-2 w-40 rounded-md shadow-lg bg-white/90 backdrop-blur-md border border-white/30 focus:outline-none z-10"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={() => switchLanguage("en")}
                      className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-white/50 flex items-center"
                      role="menuitem"
                      tabIndex={0}
                    >
                      {language === "en" && (
                        <span className="w-2 h-2 rounded-full bg-[#00a79d] mr-2" aria-hidden="true"></span>
                      )}
                      <span className="text-green-700 font-semibold drop-shadow-sm">English</span>
                    </button>
                    <button
                      onClick={() => switchLanguage("ar")}
                      className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-white/50 flex items-center"
                      role="menuitem"
                      tabIndex={0}
                    >
                      {language === "ar" && (
                        <span className="w-2 h-2 rounded-full bg-[#00a79d] mr-2" aria-hidden="true"></span>
                      )}
                      <span className="text-green-700 font-semibold drop-shadow-sm">العربية</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-secondary focus:outline-none focus:ring-2 focus:ring-white/30 rounded-md p-1"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="absolute top-full left-0 w-full mobile-menu shadow-lg md:hidden z-50 max-h-[calc(100vh-4rem)] overflow-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <div className="px-4 py-3 space-y-4">
            <Link
              to="/"
              className={`block py-2 text-lg mobile-menu-item rounded px-3 ${isActive('/')
                ? 'text-secondary font-medium bg-white/10'
                : 'text-white hover:text-secondary'}`}
            >
              Home
              {isActive('/') && <span className="mobile-nav-indicator"></span>}
            </Link>

            {/* Mobile Solutions Dropdown */}
            <div>
              <button
                onClick={() => toggleMobileSubmenu('solutions')}
                className={`flex justify-between items-center w-full py-2 text-lg mobile-menu-item rounded px-3 ${isActive('/solutions')
                  ? 'text-secondary font-medium bg-white/10'
                  : 'text-white hover:text-secondary'}`}
                aria-expanded={mobileSubmenuOpen === 'solutions'}
                aria-controls="mobile-solutions-submenu"
              >
                Solutions
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform duration-200 ${
                    mobileSubmenuOpen === 'solutions' ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isActive('/solutions') && <span className="mobile-nav-indicator"></span>}

              {/* Mobile Solutions Submenu - Premium design without background */}
              <AnimatePresence>
                {mobileSubmenuOpen === 'solutions' && (
                  <motion.div
                    id="mobile-solutions-submenu"
                    className="pl-4 space-y-2 mt-2 mobile-submenu"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                  {solutionsItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block py-2 mobile-menu-item px-3 border-l-2 ${isActive(item.href)
                        ? 'text-secondary font-medium border-secondary'
                        : 'text-white/80 hover:text-secondary border-transparent'}`}
                    >
                      {item.name}
                      {isActive(item.href) && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>}
                    </Link>
                  ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Industries Dropdown */}
            <div>
              <button
                onClick={() => toggleMobileSubmenu('industries')}
                className={`flex justify-between items-center w-full py-2 text-lg mobile-menu-item rounded px-3 ${isActive('/industries')
                  ? 'text-secondary font-medium bg-white/10'
                  : 'text-white hover:text-secondary'}`}
              >
                Industries we serve
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform duration-200 ${
                    mobileSubmenuOpen === 'industries' ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isActive('/industries') && <span className="mobile-nav-indicator"></span>}

              {/* Mobile Industries Submenu */}
              {mobileSubmenuOpen === 'industries' && (
                <div className="pl-4 space-y-2 mt-2 mobile-submenu">
                  {industriesItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block py-2 mobile-menu-item px-3 border-l-2 ${isActive(item.href)
                        ? 'text-secondary font-medium border-secondary'
                        : 'text-white/80 hover:text-secondary border-transparent'}`}
                    >
                      {item.name}
                      {isActive(item.href) && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Resources Dropdown */}
            <div>
              <button
                onClick={() => toggleMobileSubmenu('resources')}
                className={`flex justify-between items-center w-full py-2 text-lg mobile-menu-item rounded px-3 ${isActive('/resources')
                  ? 'text-secondary font-medium bg-white/10'
                  : 'text-white hover:text-secondary'}`}
              >
                Resources
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform duration-200 ${
                    mobileSubmenuOpen === 'resources' ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isActive('/resources') && <span className="mobile-nav-indicator"></span>}

              {/* Mobile Resources Submenu */}
              {mobileSubmenuOpen === 'resources' && (
                <div className="pl-4 space-y-2 mt-2 mobile-submenu">
                  {resourcesItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block py-2 mobile-menu-item px-3 border-l-2 ${isActive(item.href)
                        ? 'text-secondary font-medium border-secondary'
                        : 'text-white/80 hover:text-secondary border-transparent'}`}
                    >
                      {item.name}
                      {isActive(item.href) && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile More Dropdown */}
            <div>
              <button
                onClick={() => toggleMobileSubmenu('more')}
                className={`flex justify-between items-center w-full py-2 text-lg mobile-menu-item rounded px-3 ${isActive('/about') || isActive('/careers') || isActive('/contact') || isActive('/faq')
                  ? 'text-secondary font-medium bg-white/10'
                  : 'text-white hover:text-secondary'}`}
                aria-expanded={mobileSubmenuOpen === 'more'}
                aria-controls="mobile-more-submenu"
              >
                More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform duration-200 ${
                    mobileSubmenuOpen === 'more' ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {(isActive('/about') || isActive('/careers') || isActive('/contact') || isActive('/faq')) && <span className="mobile-nav-indicator"></span>}

              {/* Mobile More Submenu */}
              <AnimatePresence>
                {mobileSubmenuOpen === 'more' && (
                  <motion.div
                    id="mobile-more-submenu"
                    className="pl-4 space-y-2 mt-2 mobile-submenu"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                  {moreItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block py-2 mobile-menu-item px-3 border-l-2 ${isActive(item.href)
                        ? 'text-secondary font-medium border-secondary'
                        : 'text-white/80 hover:text-secondary border-transparent'}`}
                    >
                      {item.name}
                      {isActive(item.href) && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>}
                    </Link>
                  ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Removed individual links for Why Vonoy, Features, and About Us as they are now in dropdowns */}

            {/* Mobile Language Switcher */}
            <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
              <span className="text-[#00a79d] text-sm font-medium">Language</span>
              <div className="flex space-x-3">
                <button
                  onClick={() => switchLanguage("en")}
                  className={`px-4 py-2 rounded-md text-sm font-medium border border-white/30 transition-all duration-300 ${
                    language === "en"
                      ? "bg-[#00a79d] text-white border-[#00a79d]"
                      : "bg-white/15 text-[#00a79d] hover:bg-white/25 backdrop-blur-md"
                  }`}
                >
                  <span className={language === "en" ? "text-white" : "text-[#00a79d]"}>English</span>
                </button>
                <button
                  onClick={() => switchLanguage("ar")}
                  className={`px-4 py-2 rounded-md text-sm font-medium border border-white/30 transition-all duration-300 ${
                    language === "ar"
                      ? "bg-[#00a79d] text-white border-[#00a79d]"
                      : "bg-white/15 text-[#00a79d] hover:bg-white/25 backdrop-blur-md"
                  }`}
                >
                  <span className={language === "ar" ? "text-white" : "text-[#00a79d]"}>العربية</span>
                </button>
              </div>
            </div>

            {/* Mobile Book a Demo Button */}
            <Link
              to="/demo"
              className="block w-full bg-secondary hover:bg-secondary/90 text-white py-3 px-4 rounded-md text-center font-medium transition-all duration-300 ease-in-out transform hover:shadow-lg mt-4 flex items-center justify-center gap-2 group"
            >
              <span className="text-white">Book a Demo</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            {/* Mobile Glass Effect Button removed */}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

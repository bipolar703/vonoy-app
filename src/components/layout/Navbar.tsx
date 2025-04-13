"use client";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import OptimizedImage from "../ui/OptimizedImage";

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
  const [isSolutionsMenuOpen, setIsSolutionsMenuOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [isLoading, setIsLoading] = useState(false);

  // Check if the current path matches the link
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Handle window resize to close mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
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

  // Solutions dropdown items - Updated based on vonoy-edits.md
  const solutionsItems = [
    { name: "Solver APIs", href: "/solutions/solver-apis" },
    { name: "Transportation Management Platform", href: "/solutions/transportation-management" },
    { name: "Routing Capabilities", href: "/solutions/routing-capabilities" },
    { name: "Consulting Services", href: "/solutions/consulting-services" },
    { name: "Industries we serve", href: "/solutions/industries" },
  ];

  // Toggle functions
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLangMenu = () => setIsLangMenuOpen(!isLangMenuOpen);
  const toggleSolutionsMenu = () =>
    setIsSolutionsMenuOpen(!isSolutionsMenuOpen);
  const toggleMobileSubmenu = () =>
    setIsMobileSubmenuOpen(!isMobileSubmenuOpen);

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
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/90 backdrop-blur-md py-2"
          : "bg-transparent py-4"
      }`}
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
          <div className="relative group">
            <button
              onClick={toggleSolutionsMenu}
              className={`relative flex items-center transition-colors ${isActive('/solutions')
                ? 'text-secondary font-medium nav-active'
                : 'text-white hover:text-secondary'}`}
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

            {/* Solutions Dropdown Menu */}
            {isSolutionsMenuOpen && (
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white/90 backdrop-blur-md ring-1 ring-black/5 focus:outline-none z-10 border border-white/10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {solutionsItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block px-4 py-2 text-sm hover:bg-white/50 ${isActive(item.href)
                        ? 'text-green-700 font-medium'
                        : 'text-gray-700'}`}
                      role="menuitem"
                    >
                      {item.name}
                      {isActive(item.href) && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/why-vonoy"
            className={`relative transition-colors ${isActive('/why-vonoy')
              ? 'text-secondary font-medium nav-active'
              : 'text-white hover:text-secondary'}`}
          >
            Why Vonoy?
            {isActive('/why-vonoy') && <span className="nav-indicator"></span>}
          </Link>
          <Link
            to="/features"
            className={`relative transition-colors ${isActive('/features')
              ? 'text-secondary font-medium nav-active'
              : 'text-white hover:text-secondary'}`}
          >
            Features
            {isActive('/features') && <span className="nav-indicator"></span>}
          </Link>
          <Link
            to="/about"
            className={`relative transition-colors ${isActive('/about')
              ? 'text-secondary font-medium nav-active'
              : 'text-white hover:text-secondary'}`}
          >
            About Us
            {isActive('/about') && <span className="nav-indicator"></span>}
          </Link>
        </div>

        {/* Language Switcher & Book a Demo Button - Only two buttons as specified */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative flex items-center">
            <button
              onClick={toggleLangMenu}
              className="text-white hover:text-white px-4 py-2 rounded-md flex items-center text-sm font-medium border border-white/30 hover:border-white/50 transition-all duration-300 bg-white/15 hover:bg-white/25 backdrop-blur-md shadow-md hover:shadow-lg"
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
            <Link to="/demo" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#00a79d] hover:bg-[#008f86] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a79d] transition-colors">
              <span className="text-white">Book a Demo</span>
            </Link>

            {/* Glass Effect Button removed */}

            {/* Language Dropdown */}
            {isLangMenuOpen && (
              <div className="absolute left-0 top-full mt-2 w-40 rounded-md shadow-lg bg-white/90 backdrop-blur-md border border-white/30 focus:outline-none z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    onClick={() => switchLanguage("en")}
                    className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-white/50 flex items-center"
                    role="menuitem"
                  >
                    {language === "en" && (
                      <span className="w-2 h-2 rounded-full bg-[#00a79d] mr-2"></span>
                    )}
                    <span className="text-green-700 font-semibold drop-shadow-sm">English</span>
                  </button>
                  <button
                    onClick={() => switchLanguage("ar")}
                    className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-white/50 flex items-center"
                    role="menuitem"
                  >
                    {language === "ar" && (
                      <span className="w-2 h-2 rounded-full bg-[#00a79d] mr-2"></span>
                    )}
                    <span className="text-green-700 font-semibold drop-shadow-sm">العربية</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Contact Us button removed */}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-secondary focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full mobile-menu shadow-lg md:hidden z-50 max-h-[calc(100vh-4rem)] overflow-auto">
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
                onClick={toggleMobileSubmenu}
                className={`flex justify-between items-center w-full py-2 text-lg mobile-menu-item rounded px-3 ${isActive('/solutions')
                  ? 'text-secondary font-medium bg-white/10'
                  : 'text-white hover:text-secondary'}`}
              >
                Solutions
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isMobileSubmenuOpen ? "rotate-180" : ""
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
              {isActive('/solutions') && <span className="mobile-nav-indicator"></span>}

              {/* Mobile Solutions Submenu - Premium design without background */}
              {isMobileSubmenuOpen && (
                <div className="pl-4 space-y-2 mt-2 mobile-submenu">
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
                </div>
              )}
            </div>

            <Link
              to="/why-vonoy"
              className={`block py-2 text-lg mobile-menu-item rounded px-3 ${isActive('/why-vonoy')
                ? 'text-secondary font-medium bg-white/10'
                : 'text-white hover:text-secondary'}`}
            >
              Why Vonoy?
              {isActive('/why-vonoy') && <span className="mobile-nav-indicator"></span>}
            </Link>
            <Link
              to="/features"
              className={`block py-2 text-lg mobile-menu-item rounded px-3 ${isActive('/features')
                ? 'text-secondary font-medium bg-white/10'
                : 'text-white hover:text-secondary'}`}
            >
              Features
              {isActive('/features') && <span className="mobile-nav-indicator"></span>}
            </Link>
            <Link
              to="/about"
              className={`block py-2 text-lg mobile-menu-item rounded px-3 ${isActive('/about')
                ? 'text-secondary font-medium bg-white/10'
                : 'text-white hover:text-secondary'}`}
            >
              About Us
              {isActive('/about') && <span className="mobile-nav-indicator"></span>}
            </Link>

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
        </div>
      )}
    </nav>
  );
};

export default Navbar;

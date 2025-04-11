"use client";
import React, { useEffect, useState } from "react";

/**
 * Navbar Component
 *
 * This component represents the main navigation for the site.
 * It includes the logo, navigation links, language selector, and contact button.
 *
 * @returns {JSX.Element} The rendered Navbar component
 */
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isSolutionsMenuOpen, setIsSolutionsMenuOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [isLoading, setIsLoading] = useState(false);

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

  // Solutions dropdown items
  const solutionsItems = [
    { name: "Fleet Management", href: "/solutions/fleet-management" },
    { name: "Route Optimization", href: "/solutions/route-optimization" },
    { name: "Analytics", href: "/solutions/analytics" },
    { name: "Integrations", href: "/solutions/integrations" },
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
            <img
              src="/logo.svg"
              alt="Vonoy"
              className="h-10"
              width="120"
              height="40"
              fetchPriority="high"
              loading="lazy"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <a
            href="/"
            className="text-white hover:text-secondary transition-colors"
          >
            Home
          </a>

          {/* Solutions Dropdown */}
          <div className="relative group">
            <button
              onClick={toggleSolutionsMenu}
              className="text-white hover:text-secondary transition-colors flex items-center"
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
            </button>

            {/* Solutions Dropdown Menu */}
            {isSolutionsMenuOpen && (
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {solutionsItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            href="/why-vonoy"
            className="text-white hover:text-secondary transition-colors"
          >
            Why Vonoy?
          </a>
          <a
            href="/features"
            className="text-white hover:text-secondary transition-colors"
          >
            Features
          </a>
          {/* Contact Us and More buttons removed */}
        </div>

        {/* Language Switcher & Book a Demo Button */}
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
            <a href="/contact" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#00a79d] hover:bg-[#008f86] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a79d] transition-colors">
              <span className="text-white">Book a Demo</span>
            </a>

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
                    <span className="text-[#00a79d] font-semibold drop-shadow-sm">English</span>
                  </button>
                  <button
                    onClick={() => switchLanguage("ar")}
                    className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-white/50 flex items-center"
                    role="menuitem"
                  >
                    {language === "ar" && (
                      <span className="w-2 h-2 rounded-full bg-[#00a79d] mr-2"></span>
                    )}
                    <span className="text-[#00a79d] font-semibold drop-shadow-sm">العربية</span>
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
            <a
              href="/"
              className="block text-white hover:text-secondary py-2 text-lg mobile-menu-item rounded px-3"
            >
              Home
            </a>

            {/* Mobile Solutions Dropdown */}
            <div>
              <button
                onClick={toggleMobileSubmenu}
                className="flex justify-between items-center w-full text-white hover:text-secondary py-2 text-lg mobile-menu-item rounded px-3"
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

              {/* Mobile Solutions Submenu */}
              {isMobileSubmenuOpen && (
                <div className="pl-4 space-y-2 mt-2 mobile-submenu p-2 mx-2">
                  {solutionsItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block text-white hover:text-secondary py-1 mobile-menu-item px-3 rounded"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/why-vonoy"
              className="block text-white hover:text-secondary py-2 text-lg mobile-menu-item rounded px-3"
            >
              Why Vonoy?
            </a>
            <a
              href="/features"
              className="block text-white hover:text-secondary py-2 text-lg mobile-menu-item rounded px-3"
            >
              Features
            </a>
            {/* Contact Us button removed */}
            {/* More button removed */}

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
            <a
              href="/contact"
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
            </a>

            {/* Mobile Glass Effect Button removed */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

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
            <img src="/logo.svg" alt="Vonoy" className="h-10" />
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
          <a
            href="/contact"
            className="text-white hover:text-secondary transition-colors"
          >
            Contact Us
          </a>
          <div className="relative group">
            <a
              href="#"
              className="text-white hover:text-secondary transition-colors flex items-center"
            >
              More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
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
            </a>
          </div>
        </div>

        {/* Language Switcher & Contact Button */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={toggleLangMenu}
              className="text-white hover:text-secondary px-3 py-1.5 rounded-md flex items-center text-sm font-medium border border-white/20 hover:border-white/40 transition-colors"
            >
              {language === "en" ? "English" : "العربية"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform duration-200 ${
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

            {/* Language Dropdown */}
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    onClick={() => switchLanguage("en")}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      language === "en"
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    role="menuitem"
                  >
                    English
                  </button>
                  <button
                    onClick={() => switchLanguage("ar")}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      language === "ar"
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    role="menuitem"
                  >
                    العربية
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Green Contact Button */}
          <a
            href="/contact"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Contact Us
          </a>
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
            <a
              href="/contact"
              className="block text-white hover:text-secondary py-2 text-lg mobile-menu-item rounded px-3"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="block text-white hover:text-secondary py-2 text-lg mobile-menu-item rounded px-3"
            >
              More
            </a>

            {/* Mobile Language Switcher */}
            <div className="flex flex-col space-y-2 pt-2 border-t border-white/10">
              <span className="text-gray-400 text-sm">Language</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => switchLanguage("en")}
                  className={`px-3 py-1 rounded mobile-menu-item ${
                    language === "en"
                      ? "bg-white/20 text-white"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => switchLanguage("ar")}
                  className={`px-3 py-1 rounded mobile-menu-item ${
                    language === "ar"
                      ? "bg-white/20 text-white"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>

            {/* Mobile Contact Button */}
            <a
              href="/contact"
              className="block w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md text-center font-medium transition-colors mt-4"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

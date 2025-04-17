'use client';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OptimizedImage from '../ui/OptimizedImage';

// Define navigation structure - this makes it fully dynamic
const navigationItems = [
  {
    name: 'Home',
    path: '/',
    dropdown: false,
  },
  {
    name: 'Solutions',
    path: '/solutions',
    dropdown: true,
    items: [
      { name: 'Solver APIs', path: '/solutions/solver-apis' },
      { name: 'Transportation Management Platform', path: '/solutions/tms' },
      { name: 'Routing Capabilities', path: '/solutions/routing-capabilities' },
      { name: 'Consulting Services', path: '/solutions/consulting' },
    ],
  },
  {
    name: 'Industries we serve',
    path: '/industries',
    dropdown: true,
    items: [
      { name: 'FMCG Distribution', path: '/industries/fmcg' },
      { name: 'Last-Mile Delivery', path: '/industries/last-mile' },
      { name: 'Cash Van Delivery', path: '/industries/cash-van' },
      { name: 'Postal & Courier', path: '/industries/postal' },
      { name: 'Cold Chain & Pharma', path: '/industries/cold-chain' },
      { name: 'EV Fleet Operations', path: '/industries/ev-fleet' },
    ],
  },
  {
    name: 'Resources',
    path: '/resources',
    dropdown: true,
    items: [
      { name: 'Blog', path: '/resources/blog' },
      { name: 'Whitepapers', path: '/resources/whitepapers' },
      { name: 'Case Studies', path: '/resources/case-studies' },
      { name: 'Documentation', path: '/resources/documentation' },
      { name: 'Animations', path: '/animations' },
    ],
  },
  {
    name: 'More',
    path: '/more',
    dropdown: true,
    items: [
      { name: 'About Us', path: '/about' },
      { name: 'Request Demo', path: '/book-demo' },
    ],
  },
];

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  // Page loading is now handled by PageTransition component
  const [isLangLoading, setIsLangLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // --- Mobile menu state ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileMenuIndex, setOpenMobileMenuIndex] = useState<number | null>(null);
  const touchStartY = React.useRef<number | null>(null);
  const touchStartX = React.useRef<number | null>(null);

  // Check if the current path matches the link
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    // More precise matching to ensure proper highlighting
    if (
      path === '/about' ||
      path === '/demo' ||
      path === '/solutions' ||
      path === '/features' ||
      path === '/why-vonoy'
    ) {
      return location.pathname === path || location.pathname.startsWith(`${path}/`);
    }
    return location.pathname.startsWith(path);
  };

  // Check if the current path is in a dropdown
  const isInDropdown = (items: { name: string; path: string }[] | undefined) => {
    if (!items) return false;
    return items.some(
      (item) => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
    );
  };

  // Handle scroll to change navbar background and text contrast
  const [isDarkBackground, setIsDarkBackground] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled
      if (window.scrollY > 20) {
        setIsScrolled(true);
        setIsDarkBackground(true); // Dark background when scrolled
      } else {
        setIsScrolled(false);

        // Check if the hero section has a light background
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
          const bgColor = window.getComputedStyle(heroSection).backgroundColor;
          // Simple check if background is light
          const isLight = bgColor.includes('255') || bgColor.includes('rgb(2');
          setIsDarkBackground(!isLight);
        } else {
          setIsDarkBackground(true); // Default to dark background
        }
      }
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Set navbar height CSS variable for mobile menu
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`);
      }
    };

    // Update on mount, scroll, and window resize
    updateNavbarHeight();
    window.addEventListener('scroll', updateNavbarHeight);

    return () => {
      window.removeEventListener('scroll', updateNavbarHeight);
    };
  }, [isScrolled]); // Re-run when scroll state changes

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown')) {
        setOpenDropdown(null);
      }
      if (!target.closest('.lang-dropdown')) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Toggle functions
  const toggleLangMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLangMenuOpen(!isLangMenuOpen);
  };
  const toggleDropdown = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling

    // Only toggle if it's a different dropdown or closing the current one
    // This prevents re-triggering animations when clicking the same dropdown
    if (
      openDropdown !== path ||
      (e.target instanceof HTMLElement && e.target.closest('.dropdown-toggle'))
    ) {
      setOpenDropdown(openDropdown === path ? null : path);
    }
  };

  const switchLanguage = (lang: 'en' | 'ar') => {
    setIsLangLoading(true);
    setLanguage(lang);
    setIsLangMenuOpen(false);

    // Simulate loading time for language change
    setTimeout(() => {
      setIsLangLoading(false);
    }, 1000);
  };

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    }
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (
      e.target === e.currentTarget &&
      touchStartY.current !== null &&
      touchStartX.current !== null
    ) {
      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - endY;
      const deltaX = Math.abs(touchStartX.current - endX);
      if (deltaY > 60 && deltaX < 40) {
        setIsMenuOpen(false);
      }
      touchStartY.current = null;
      touchStartX.current = null;
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 font-satoshi ${
        isScrolled ? 'bg-primary/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      } ${isDarkBackground ? 'text-white' : 'text-gray-800'}`}
      style={{ fontFamily: 'Satoshi, sans-serif' }}
    >
      {/* Page loading is now handled by PageTransition component */}

      {isLangLoading && (
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
          <Link to="/">
            <OptimizedImage
              src="/logo.svg"
              alt="Vonoy"
              className="h-10"
              width={120}
              height={40}
              priority={true}
              loading="eager"
            />
          </Link>
        </div>

        {/* Desktop Navigation with Dropdowns */}
        <div className="hidden md:flex space-x-6 items-center justify-center flex-1">
          {navigationItems.map((item) => (
            <div key={item.path} className="relative group dropdown">
              {item.dropdown ? (
                <>
                  <div
                    onClick={(e) => toggleDropdown(item.path, e)}
                    className={`flex items-center cursor-pointer transition-colors py-2 px-3 rounded-lg dropdown-toggle ${
                      isActive(item.path) || isInDropdown(item.items)
                        ? 'text-secondary font-medium bg-white/5 backdrop-blur-sm'
                        : `${isDarkBackground ? 'text-white' : 'text-gray-800'} hover:text-secondary hover:bg-white/5`
                    } transition-all duration-200`}
                    aria-expanded={openDropdown === item.path}
                    aria-haspopup="true"
                  >
                    {item.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`ml-1 h-4 w-4 transition-transform ${
                        openDropdown === item.path ? 'transform rotate-180' : ''
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
                  </div>
                  {/* Dropdown Menu with enhanced styling and dynamics */}
                  {openDropdown === item.path && (
                    <div
                      className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-md shadow-xl rounded-lg opacity-100 transition-opacity duration-200 z-50 border border-gray-100 overflow-hidden"
                      style={{ transform: 'translateY(8px)' }}
                    >
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`flex items-center px-4 py-3 hover:bg-secondary/10 transition-colors relative ${
                            location.pathname === subItem.path ? 'bg-secondary/5' : ''
                          }`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span
                            className={
                              location.pathname === subItem.path
                                ? 'text-secondary font-medium'
                                : 'text-gray-800 hover:text-secondary'
                            }
                          >
                            {subItem.name}
                          </span>
                          {/* Removed active-indicator dot */}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`transition-colors py-2 px-3 rounded-lg ${
                    isActive(item.path)
                      ? 'text-secondary font-medium bg-white/5 backdrop-blur-sm'
                      : `${isDarkBackground ? 'text-white' : 'text-gray-800'} hover:text-secondary hover:bg-white/5`
                  } transition-all duration-200`}
                >
                  {item.name}
                </Link>
              )}
              {/* Removed active-indicator dot for main navigation items */}
            </div>
          ))}
        </div>

        {/* Language Switcher & Book Demo Button - Only visible on desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative lang-dropdown">
            <button
              onClick={toggleLangMenu}
              className={`${isDarkBackground ? 'text-white' : 'text-gray-800'} hover:text-secondary transition-colors flex items-center py-2 px-4 rounded-lg ${isDarkBackground ? 'bg-primary/60 border-white/20' : 'bg-white/60 border-gray-300/30'} backdrop-blur-sm border hover:bg-primary/80`}
              aria-haspopup="true"
              aria-expanded={isLangMenuOpen}
            >
              <span className="mr-1">{language === 'en' ? 'English' : 'العربية'}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${isLangMenuOpen ? 'transform rotate-180' : ''}`}
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
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-primary/95 backdrop-blur-md shadow-xl rounded-lg z-50 border border-gray-700 overflow-hidden">
                <button
                  onClick={() => switchLanguage('en')}
                  className={`flex items-center w-full text-left px-4 py-3 hover:bg-white/10 transition-colors ${
                    language === 'en' ? 'text-secondary font-medium bg-white/5' : 'text-white'
                  }`}
                >
                  {/* Removed active-indicator dot for language switcher */}
                  <span className={`ml-3 ${language === 'en' ? 'text-secondary' : ''}`}>
                    English
                  </span>
                </button>
                <button
                  onClick={() => switchLanguage('ar')}
                  className={`flex items-center w-full text-left px-4 py-3 hover:bg-white/10 transition-colors ${
                    language === 'ar' ? 'text-secondary font-medium bg-white/5' : 'text-white'
                  }`}
                >
                  {/* Removed active-indicator dot for language switcher */}
                  <span className={`ml-3 ${language === 'ar' ? 'text-secondary' : ''}`}>
                    العربية
                  </span>
                </button>
              </div>
            )}
          </div>

          <Link
            to="/book-demo"
            className="bg-[#58C0BE] hover:bg-[#4BAFAD] px-6 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-md flex items-center relative overflow-hidden group"
          >
            <span className="text-white relative z-10 font-medium">Book a Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#58C0BE] to-[#4BAFAD] group-hover:scale-105 transition-transform duration-300"></div>
          </Link>
        </div>
        {/* --- Mobile Menu Button --- */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden text-white hover:text-secondary transition-colors p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 mobile-menu-toggle"
          aria-label="Open menu"
        >
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
        </button>
      </div>
      {/* --- Mobile Menu Panel --- */}
      <div
        className={`fixed inset-0 z-[10000] bg-[rgba(12,29,44,0.98)] backdrop-blur-2xl md:hidden overflow-y-auto transition-all duration-300 flex flex-col ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto scale-100'
            : 'opacity-0 pointer-events-none scale-95'
        }`}
        role="dialog"
        aria-modal="true"
        style={{ WebkitBackdropFilter: 'blur(24px)', backdropFilter: 'blur(24px)' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Logo at the top, centered */}
        <div className="flex justify-center items-center pt-7 pb-3">
          <OptimizedImage
            src="/logo.svg"
            alt="Vonoy"
            className="h-10 w-auto"
            width={120}
            height={40}
            priority={true}
            loading="eager"
          />
        </div>
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-[10001] p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
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
        </button>
        {/* Mobile menu content with dynamic accordions */}
        <nav
          className="mobile-menu-container flex flex-col mt-20 px-4 gap-2"
          aria-label="Mobile Navigation"
        >
          {navigationItems.map((item, idx) => (
            <div key={item.path} className="w-full">
              {item.dropdown ? (
                <>
                  <button
                    className={`mobileMenuItem flex items-center justify-between w-full text-left py-3 px-4 rounded-lg text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-secondary min-h-[44px] transition-all duration-300 ${openMobileMenuIndex === idx ? 'bg-white/5' : ''}`}
                    aria-expanded={openMobileMenuIndex === idx}
                    aria-controls={`mobile-submenu-${idx}`}
                    onClick={() => setOpenMobileMenuIndex(openMobileMenuIndex === idx ? null : idx)}
                    style={{ fontSize: '1rem' }}
                  >
                    <span>{item.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ml-2 transition-transform duration-300 ${openMobileMenuIndex === idx ? 'rotate-180' : ''}`}
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
                  <div
                    id={`mobile-submenu-${idx}`}
                    className={`mobileSubmenu overflow-hidden transition-all duration-400 ease-in-out ${openMobileMenuIndex === idx ? 'max-h-96 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'}`}
                    aria-hidden={openMobileMenuIndex !== idx}
                  >
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="mobileSubmenuItem block py-3 pl-8 pr-4 text-base text-white rounded-lg hover:bg-white/10 min-h-[44px] transition-all duration-300"
                        style={{ fontSize: '1rem' }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.path}
                  className="mobileMenuItem block py-3 px-4 text-lg text-white rounded-lg hover:bg-white/10 font-semibold min-h-[44px] transition-all duration-300"
                  style={{ fontSize: '1rem' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        {/* Social & Contact section at the bottom */}
        <div className="mt-10 mb-6 flex flex-col items-center gap-4">
          <div className="flex gap-6 justify-center">
            <a
              href="https://www.youtube.com/@Vonoyplatform"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="bg-white/10 hover:bg-[#3dd598] text-white hover:text-[#0d1b2a] p-3 rounded-full transition-colors duration-200"
            >
              {/* YouTube SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.379 3.5 12 3.5 12 3.5s-7.379 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.2 0 12 0 12s0 3.8.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.621 20.5 12 20.5 12 20.5s7.379 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.8 24 12 24 12s0-3.8-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/vonoy/about/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="bg-white/10 hover:bg-[#3dd598] text-white hover:text-[#0d1b2a] p-3 rounded-full transition-colors duration-200"
            >
              {/* LinkedIn SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
          <a
            href="mailto:support@vonoy.co"
            className="flex items-center gap-2 text-white bg-white/10 hover:bg-[#3dd598] hover:text-[#0d1b2a] px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            support@vonoy.co
          </a>
        </div>
        {/* Visual hint for swipe up to close */}
        <div className="flex flex-col items-center mt-8 mb-4 opacity-60 select-none pointer-events-none">
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
          </svg>
          <span className="text-xs text-white">Swipe up to close</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

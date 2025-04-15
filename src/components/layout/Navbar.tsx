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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  // Page loading is now handled by PageTransition component
  const [isLangLoading, setIsLangLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isInitialMount = React.useRef(true);

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

  // Find the parent dropdown item for the current path
  const findActiveDropdownParent = () => {
    for (const item of navigationItems) {
      if (
        item.dropdown &&
        item.items &&
        item.items.some(
          (subItem) =>
            location.pathname === subItem.path || location.pathname.startsWith(`${subItem.path}/`)
        )
      ) {
        return item.path;
      }
    }
    return null;
  };

  // Handle window resize to close mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      window.removeEventListener('scroll', updateNavbarHeight);
      window.removeEventListener('resize', updateNavbarHeight);
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

  // Close mobile menu when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutsideMobileMenu = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // If the menu is open and the click is outside the menu and not on the toggle button
      if (
        isMenuOpen &&
        !target.closest('.mobile-menu-container') &&
        !target.closest('.mobile-menu-toggle')
      ) {
        setIsMenuOpen(false);
      }
    };

    // Close menu when scrolling
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutsideMobileMenu);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('click', handleClickOutsideMobileMenu);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  // Initial mount tracking and set active dropdown
  useEffect(() => {
    // Just mark initial mount as complete after a short delay
    const timer = setTimeout(() => {
      isInitialMount.current = false;
    }, 100);

    // Set active dropdown based on current path
    const activeParent = findActiveDropdownParent();
    if (activeParent) {
      setOpenDropdown(activeParent);
    }

    // Close all dropdowns and menus on route change for better UX
    setOpenDropdown(null);
    setIsLangMenuOpen(false);
    setIsMenuOpen(false);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Toggle functions
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLangMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLangMenuOpen(!isLangMenuOpen);
  };
  const toggleDropdown = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    setOpenDropdown(openDropdown === path ? null : path);
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
                    className={`flex items-center cursor-pointer transition-colors py-2 px-3 rounded-lg ${
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

        {/* Mobile Menu Button with improved animation */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-secondary transition-colors p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 mobile-menu-toggle"
          aria-label="Toggle menu"
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
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Mobile Menu with enhanced styling and animations */}
        <div
          className={`absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-xl md:hidden max-h-[80vh] overflow-y-auto shadow-xl mobile-menu-container fixed-when-visible z-40 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        >
          <div className="container mx-auto px-4 py-6 space-y-5">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative">
                {item.dropdown ? (
                  <>
                    <div
                      onClick={(e) => toggleDropdown(item.path, e)}
                      className={`flex items-center justify-between w-full cursor-pointer py-3 px-4 rounded-lg ${
                        isActive(item.path) || isInDropdown(item.items)
                          ? 'text-secondary font-medium bg-white/5'
                          : 'text-white hover:bg-white/5'
                      } transition-colors mobile-menu-toggle-dropdown`}
                      role="button"
                      aria-expanded={openDropdown === item.path}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          toggleDropdown(item.path, e as unknown as React.MouseEvent);
                        }
                      }}
                    >
                      <span>{item.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-transform ${
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
                    {/* Mobile Dropdown menu */}
                    {openDropdown === item.path && (
                      <div className="pl-4 mt-3 space-y-2 border-l-2 border-secondary/30 ml-2 mobile-submenu">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block py-2.5 px-4 rounded-lg relative pl-6 ${
                              location.pathname === subItem.path
                                ? 'text-secondary font-medium bg-white/5'
                                : 'text-white/90 hover:text-white hover:bg-white/5'
                            } transition-colors mobile-menu-item`}
                            onClick={() => {
                              setOpenDropdown(null);
                              setIsMenuOpen(false);
                            }}
                          >
                            {/* Removed active-indicator dot in mobile menu */}
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`block py-3 px-4 rounded-lg ${
                      isActive(item.path)
                        ? 'text-secondary font-medium bg-white/5'
                        : 'text-white hover:bg-white/5'
                    } transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-gray-700">
              <button
                onClick={() => switchLanguage(language === 'en' ? 'ar' : 'en')}
                className="flex items-center text-white hover:text-secondary transition-colors py-3 px-4 rounded-lg w-full bg-primary/60 hover:bg-primary/80 backdrop-blur-sm border border-white/20 mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                  />
                </svg>
                <span className="flex-1 text-left">
                  {language === 'en' ? 'Switch to العربية' : 'Switch to English'}
                </span>
              </button>

              <Link
                to="/book-demo"
                className="flex items-center justify-center w-full text-center bg-[#58C0BE] hover:bg-[#4BAFAD] px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md relative overflow-hidden group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-white relative z-10 font-medium">Book a Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#58C0BE] to-[#4BAFAD] group-hover:scale-105 transition-transform duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

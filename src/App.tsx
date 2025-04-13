import { lazy, Suspense, useEffect } from "react";

// Import critical components directly
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import LogoLoader from "./components/ui/LogoLoader";
import Preload from "./components/ui/Preload";
import PageTransition from "./components/layout/PageTransition";
import { initSectionAnimations } from "./utils/sectionAnimations";
import "./components/ui/LogoLoader.css";

// Lazy load non-critical components
const Footer = lazy(() => import("./components/layout/Footer"));
const WhyVonoySection = lazy(() => import("./components/sections/WhyVonoySection"));
const StatsSection = lazy(() => import("./components/sections/StatsSection"));
const CustomizationSection = lazy(() => import("./components/sections/CustomizationSection"));
const BenefitSection = lazy(() => import("./components/sections/BenefitSection"));
const VideoSection = lazy(() => import("./components/sections/VideoSection"));

/**
 * Main App component
 *
 * Assembles the modular components into the complete application
 * Sections organized according to the specified order in the Homepage Details
 *
 * @returns {JSX.Element} The rendered application
 */
/**
 * Loading component for suspense fallback
 * Uses the custom LogoLoader component for a branded loading experience
 */
// Use RouteTransition for full-page transitions and SectionLoader for in-page section loading
const SectionLoader = () => (
  <div className="flex justify-center items-center py-16">
    <LogoLoader />
  </div>
);

/**
 * Main App component
 *
 * Implements code splitting and lazy loading for better performance
 * Only critical components (Navbar, Hero) are loaded immediately
 * Other sections are loaded as the user scrolls down
 */
function App() {
  // Initialize all section animations
  useEffect(() => {
    // Initialize section animations after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initSectionAnimations();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Preload critical resources - optimized for MCP servers */}
      <Preload
        resources={[
          // Only preload the logo which is used immediately in the header
          { href: '/logo.svg', as: 'image', importance: 'high', immediateUse: true },
          // Use prefetch for other resources to avoid warnings
          { href: '/hero-bg.webp', as: 'image', importance: 'high', immediateUse: false },
          { href: '/fonts/inter-var.woff2', as: 'font', importance: 'low', immediateUse: false, crossOrigin: 'anonymous' }
          // YouTube thumbnail removed from preload to avoid CORS issues
        ]}
      />

      <PageTransition />
      <Navbar />
      <main className="flex-grow">
        {/* Section 1: Hero - Critical, load immediately */}
        <HeroSection />

        {/* Lazy load all non-critical sections */}
        <Suspense fallback={<SectionLoader />}>
          {/* Section 2: Why Choose Vonoy? */}
          <WhyVonoySection />

          {/* Section 3: Vonoy in Numbers */}
          <StatsSection />

          {/* Section 4: Customization */}
          <CustomizationSection />

          {/* Section 5: Who Can Benefit */}
          <BenefitSection />

          {/* Section 6: See Vonoy In Action */}
          <VideoSection />
        </Suspense>
      </main>

      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;

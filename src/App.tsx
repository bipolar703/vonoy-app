import "./App.css";

// Import modular components
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import BenefitSection from "./components/sections/BenefitSection";
import CustomizationSection from "./components/sections/CustomizationSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import HeroSection from "./components/sections/HeroSection";
import StatsSection from "./components/sections/StatsSection";
import VideoSection from "./components/sections/VideoSection";
import WhyVonoySection from "./components/sections/WhyVonoySection";

/**
 * Main App component
 *
 * Assembles the modular components into the complete application
 * Sections organized according to the specified order in the Homepage Details
 *
 * @returns {JSX.Element} The rendered application
 */
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Section 1: Hero */}
        <HeroSection />

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

        {/* Additional Features Section */}
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;

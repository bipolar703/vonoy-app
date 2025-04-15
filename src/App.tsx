// Main App component file

// Import all components directly
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import PageTransition from './components/layout/PageTransition';
import BenefitSection from './components/sections/BenefitSection';
import CustomizationSection from './components/sections/CustomizationSection';
import HeroSection from './components/sections/HeroSection';
import StatsSection from './components/sections/StatsSection';
import VideoSection from './components/sections/VideoSection';
import WhyVonoySection from './components/sections/WhyVonoySection';
import ScrollToTop from './components/utils/ScrollToTop';

/**
 * Main App component - Further simplified
 * Removed all animation initialization code
 */
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <PageTransition />
      <Navbar />

      <main className="flex-grow relative z-0">
        {/* Hero Section */}
        <HeroSection />

        {/* Why Choose Vonoy? */}
        <WhyVonoySection />

        {/* Customization */}
        <CustomizationSection />

        {/* Vonoy in Numbers */}
        <StatsSection />

        {/* Who Can Benefit */}
        <BenefitSection />

        {/* See Vonoy In Action */}
        <VideoSection />
      </main>


      <Footer />
    </div>
  );
}

export default App;

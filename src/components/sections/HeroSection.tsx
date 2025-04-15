import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { fadeInUp } from '../../utils/motionAnimations';
import styles from './HeroSection.module.css';

/**
 * HeroSection Component
 *
 * The main hero section at the top of the homepage.
 * Features a gradient background with the specified color (rgb(6 4 31)).
 * Grid effects have been removed as requested for a more compact, interactive UI.
 * Added a cinematic noise and grain filter overlay for modern aesthetic.
 *
 * Features:
 * - Anime.js animations for text and content
 * - More compact design with reduced details
 * - Interactive elements with hover effects
 * - Optimized performance with will-change properties
 * - Cinematic noise and grain filter for modern film-like effect
 *
 * @returns {JSX.Element} The rendered HeroSection component
 */
const HeroSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Optionally, you can keep the useEffect if you want to manipulate the heading directly
  useEffect(() => {
    const sectionElement = document.querySelector('.' + styles.heroSection);
    if (sectionElement) {
      sectionElement.id = 'hero-section';
    }
    // You can add heading animation logic here if needed
  }, []);

  return (
    <section className={styles.heroSection} id="hero-section">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-70"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Cinematic noise and grain filter overlay */}
      <div className={styles.cinematicOverlay}>
        <div className={styles.noiseFilter}></div>
        <div className={styles.grainFilter}></div>
        <div className={styles.colorGrading}></div>
      </div>

      {/* Regular overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,4,31,0.85)] to-[rgba(6,4,31,0.6)] z-1"></div>

      <div className={`${styles.heroContainer} pt-24 relative z-10`}>
        <div className={styles.container}>
          <div className={styles.content}>
            {/* Reserve space with min-height to prevent layout shift */}
            <div className="min-h-[120px] md:min-h-[160px] flex items-center">
              <h1 ref={headingRef} className={`${styles.heading} hero-title`}>
                Transform Your Fleet Operations with AI-Powered Efficiency
              </h1>
            </div>
            {/* Reserve space with min-height to prevent layout shift */}
            <div className="min-h-[80px] md:min-h-[100px] flex items-center">
              <motion.p
                className={`${styles.description} hero-subtitle`}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                Vonoy helps businesses optimize fleet utilization, reduce costs, and enhance
                delivery efficiency with data-driven, AI-powered solutions.
              </motion.p>
            </div>
            {/* Using the green button color as specified */}
            {/* Reserve space with min-height to prevent layout shift */}
            <div className="min-h-[50px] mt-4 flex items-center">
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" exit="exit">
                <a
                  href="/book-demo"
                  className="px-6 py-3 rounded-md font-semibold bg-[#58a49d] text-white hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#58a49d] focus:ring-opacity-50 inline-flex items-center"
                >
                  Book a Demo
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block ml-2"
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
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions panel removed as requested */}
    </section>
  );
};

export default HeroSection;

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fadeInUp, typeText } from '../../utils/animations';
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
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Initialize animations when component mounts
  useEffect(() => {
    // Add section ID for animation targeting
    const sectionElement = document.querySelector('.' + styles.heroSection);
    if (sectionElement) {
      sectionElement.id = 'hero-section';
    }

    // Safety check to ensure elements exist before animating
    const safeAnimate = () => {
      if (headingRef.current && descriptionRef.current && ctaRef.current) {
        try {
          // Typing animation for heading with safety checks
          const heading = headingRef.current;
          const originalText = heading.textContent || '';
          heading.textContent = '';

          // Add animated-element class for text quality
          heading.classList.add('animated-element');
          descriptionRef.current.classList.add('animated-element');
          ctaRef.current.classList.add('animated-element');

          // Use safer typing animation
          setTimeout(() => {
            if (headingRef.current) {
              typeText(heading, originalText, 30);
            }
          }, 300);

          // Fade in animations for description and CTA
          setTimeout(() => {
            if (descriptionRef.current) {
              fadeInUp(descriptionRef.current, 1000, 800);
            }
          }, 500);

          /* Remove CTA fade-in
          setTimeout(() => {
            fadeInUp(ctaRef.current, 1500, 800);
          }, 800);
          */
        } catch (error) {
          console.warn('Animation error:', error);
          // Fallback: ensure content is visible even if animation fails
          if (headingRef.current) headingRef.current.style.opacity = '1';
          if (descriptionRef.current) descriptionRef.current.style.opacity = '1';
          if (ctaRef.current) ctaRef.current.style.opacity = '1';
        }
      }
    };

    // Delay animation slightly to ensure DOM is ready
    const timer = setTimeout(safeAnimate, 100);

    return () => clearTimeout(timer);
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
              <p ref={descriptionRef} className={`${styles.description} hero-subtitle !opacity-100`}>
                Vonoy helps businesses optimize fleet utilization, reduce costs, and enhance
                delivery efficiency with data-driven, AI-powered solutions.
              </p>
            </div>
            {/* Button positioned closer to the description */}
            {/* Reserve space with min-height to prevent layout shift */}
            <div ref={ctaRef} className="min-h-[50px] mt-2 flex items-center">
              <Link
                to="/book-demo"
                className="px-6 py-3 rounded-md font-semibold bg-[#3dd598] hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3dd598] focus:ring-opacity-50 inline-flex items-center"
              >
                <span className="text-white">Book a Demo</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block ml-2 text-white"
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
            </div>
          </div>
        </div>
      </div>

      {/* Solutions panel removed as requested */}
    </section>
  );
};

export default HeroSection;

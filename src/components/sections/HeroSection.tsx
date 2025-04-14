import React, { useEffect, useRef } from "react";
import HeroAnimation from "./HeroAnimation";
import OptimizedImage from "../ui/OptimizedImage";
import styles from "./HeroSection.module.css";
import { typeText, fadeInUp } from "../../utils/animations";
import { heroSectionAnimation } from "../../utils/sectionAnimations";

/**
 * HeroSection Component
 *
 * The main hero section at the top of the homepage.
 * Features a gradient background with the specified color (rgb(6 4 31)).
 * Grid effects have been removed as requested for a more compact, interactive UI.
 *
 * Features:
 * - Anime.js animations for text and content
 * - More compact design with reduced details
 * - Interactive elements with hover effects
 * - Optimized performance with will-change properties
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
            typeText(heading, originalText, 30);
          }, 300);

          // Fade in animations for description and CTA
          setTimeout(() => {
            fadeInUp(descriptionRef.current, 1000, 800);
          }, 500);

          setTimeout(() => {
            fadeInUp(ctaRef.current, 1500, 800);
          }, 800);
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
      {/*
       * CRITICAL: Do not modify the hero section background styling without reviewing the animation
       * impact. The gradient and animation are carefully calibrated to work together.
       */}
      <div className={`${styles.heroContainer} pt-24`}>
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
              <p ref={descriptionRef} className={`${styles.description} hero-subtitle`}>
                Vonoy helps businesses optimize fleet utilization, reduce costs,
                and enhance delivery efficiency with data-driven, AI-powered
                solutions.
              </p>
            </div>
            {/* Using the green button color as specified */}
            {/* Reserve space with min-height to prevent layout shift */}
            <div className="min-h-[60px] flex items-center">
              <div ref={ctaRef} className="hero-cta opacity-0" style={{ minWidth: '180px', minHeight: '48px' }}>
                <a href="/book-demo" className={styles.button}>
                  Book a Demo
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.buttonIcon}
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
              </div>
            </div>
          </div>
        </div>

        {/* Background animation */}
        <HeroAnimation />

        {/* Simplified background effect - grid effects removed */}
        <div className="absolute top-0 right-0 w-full h-full -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[rgb(6,4,31)] to-transparent"></div>
          {/* Single glow effect instead of multiple circles */}
          <div
            className="absolute rounded-full opacity-20 bg-gradient-radial from-secondary/20 to-transparent"
            style={{
              top: "50%",
              right: "-30%",
              width: "1200px",
              height: "1200px",
              transform: "translate(0, -50%)",
              filter: "blur(80px)"
            }}
          ></div>
        </div>

        {/* Solutions panel removed as requested */}
      </div>
    </section>
  );
};

export default HeroSection;

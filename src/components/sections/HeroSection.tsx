import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

/**
 * HeroSection Component
 *
 * The main hero section at the top of the homepage.
 * Features a gradient background with the specified color (rgb(6 4 31)).
 * Uses smooth fade-in animations with Framer Motion.
 *
 * Features:
 * - Framer Motion animations for smooth fade-in effects
 * - More compact design with reduced details
 * - Interactive elements with hover effects
 * - Optimized performance with will-change properties
 * - Cinematic noise and grain filter for modern film-like effect
 */
const HeroSection: React.FC = () => {
  // Animation variants for staggered fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
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
        <motion.div
          className={styles.container}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className={styles.content}>
            {/* Heading with smooth fade-in */}
            <div className="min-h-[120px] md:min-h-[160px] flex items-center">
              <motion.h1
                className={`${styles.heading} hero-title`}
                variants={itemVariants}
              >
                Transform Your Fleet Operations with AI-Powered Efficiency
              </motion.h1>
            </div>

            {/* Description with smooth fade-in */}
            <div className="min-h-[80px] md:min-h-[100px] flex items-center">
              <motion.p
                className={`${styles.description} hero-subtitle`}
                variants={itemVariants}
              >
                Vonoy helps businesses optimize fleet utilization, reduce costs, and enhance
                delivery efficiency with data-driven, AI-powered solutions.
              </motion.p>
            </div>

            {/* CTA button with smooth fade-in */}
            <motion.div
              className="min-h-[50px] mt-4 flex items-center"
              variants={itemVariants}
            >
              <a
                href="/book-demo"
                className="px-6 py-3 rounded-md font-semibold bg-[#3dd598] text-white hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3dd598] focus:ring-opacity-50 inline-flex items-center"
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
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

import React from "react";
import HeroAnimation from "./HeroAnimation";
import OptimizedImage from "../ui/OptimizedImage";
import styles from "./HeroSection.module.css";

/**
 * HeroSection Component
 *
 * The main hero section at the top of the homepage.
 * Features a gradient background with the specified color (rgb(6 4 31)), and includes
 * animated gridlines with neon colors and glow effects.
 *
 * @returns {JSX.Element} The rendered HeroSection component
 */
const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection} id="hero-section">
      {/*
       * CRITICAL: Do not modify the hero section background styling without reviewing the animation
       * impact. The gradient and animation are carefully calibrated to work together.
       */}
      <div className={`${styles.heroContainer} pt-24`}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.heading}>
              Transform Your Fleet Operations with AI-Powered Efficiency
            </h1>
            <p className={styles.description}>
              Vonoy helps businesses optimize fleet utilization, reduce costs,
              and enhance delivery efficiency with data-driven, AI-powered
              solutions.
            </p>
            {/* Using the green button color as specified */}
            <button className={styles.button}>
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
            </button>
          </div>
        </div>

        {/* Background animation */}
        <HeroAnimation />

        {/*
         * CRITICAL: This background effect setup is essential for the gradient background
         * that works with the animation. Modifications may break the visual effect.
         */}
        <div className="absolute top-0 right-0 w-full h-full -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[rgb(6,4,31)] to-transparent"></div>
          {/* Background circles - complement the animation */}
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="absolute border border-gray-700 rounded-full opacity-20"
              style={{
                top: "50%",
                right: "-30%",
                width: `${1000 + index * 100}px`,
                height: `${1000 + index * 100}px`,
                transform: "translate(0, -50%)",
              }}
            ></div>
          ))}
        </div>

        {/* Solutions panel */}
        <div className={styles.solutionsPanel}>
          <h3 className={styles.solutionsPanelTitle}>Our Solutions</h3>
          <div className={styles.solutionsList}>
            {/* Solution 1: Fleet & Resource Management */}
            <a href="/solutions" className={`${styles.solutionItem} ${styles.staggerItem}`}>
              <div className={styles.solutionIconContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.solutionIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <div className={styles.solutionTitle}>
                Fleet & Resource Management
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.solutionArrow}
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

            {/* Solution 2: Order Processing & Delivery Optimization */}
            <a href="/solutions" className={`${styles.solutionItem} ${styles.staggerItem}`}>
              <div className={styles.solutionIconContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.solutionIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div className={styles.solutionTitle}>
                Order Processing & Delivery Optimization
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.solutionArrow}
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

            {/* Solution 3: Real-Time Tracking & Communication */}
            <a href="/solutions" className={`${styles.solutionItem} ${styles.staggerItem}`}>
              <div className={styles.solutionIconContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.solutionIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <div className={styles.solutionTitle}>
                Real-Time Tracking & Communication
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.solutionArrow}
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

            {/* Solution 4: Data-Driven Decision Making & Analytics */}
            <a href="/solutions" className={`${styles.solutionItem} ${styles.staggerItem}`}>
              <div className={styles.solutionIconContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.solutionIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className={styles.solutionTitle}>
                Data-Driven Decision Making & Analytics
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.solutionArrow}
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

            {/* Solution 5: Driver Mobile Application */}
            <a href="/solutions" className={`${styles.solutionItem} ${styles.staggerItem}`}>
              <div className={styles.solutionIconContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.solutionIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className={styles.solutionTitle}>
                Driver Mobile Application
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.solutionArrow}
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
    </section>
  );
};

export default HeroSection;

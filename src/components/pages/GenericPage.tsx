import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import styles from "./GenericPage.module.css";

/**
 * GenericPage Component
 * 
 * A modern, flexible page template that can be used for any route
 * that doesn't have a specific component yet. Follows 2025 web design trends
 * with glass morphism, subtle animations, and consistent styling.
 * 
 * @returns {JSX.Element} The rendered GenericPage
 */
const GenericPage: React.FC = () => {
  // Get the current route to display in the page
  const { "*": path } = useParams();
  const pageName = path?.split("/").pop() || "Page";
  const formattedPageName = pageName
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>{formattedPageName}</h1>
            <p className={styles.pageSubtitle}>
              This page is currently under development
            </p>
          </div>
          
          {/* Animated background elements */}
          <div className={styles.bgGrid}></div>
          <div className={styles.bgGlow1}></div>
          <div className={styles.bgGlow2}></div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.container}>
            <div className={styles.glassCard}>
              <div className={styles.iconContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              
              <h2 className={styles.cardTitle}>Coming Soon</h2>
              <p className={styles.cardDescription}>
                We're working hard to bring you this content. Our team is developing this page
                with the latest features and information about our services.
              </p>
              
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill}></div>
                </div>
                <span className={styles.progressText}>Development in progress</span>
              </div>
            </div>
            
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className={styles.featureTitle}>Fast Implementation</h3>
                <p className={styles.featureDescription}>
                  Quick integration with your existing systems
                </p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className={styles.featureTitle}>Secure & Reliable</h3>
                <p className={styles.featureDescription}>
                  Enterprise-grade security for your data
                </p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className={styles.featureTitle}>Cloud-Based</h3>
                <p className={styles.featureDescription}>
                  Access your data from anywhere, anytime
                </p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className={styles.featureTitle}>Advanced Analytics</h3>
                <p className={styles.featureDescription}>
                  Gain insights with powerful reporting tools
                </p>
              </div>
            </div>
            
            <div className={styles.ctaContainer}>
              <h2 className={styles.ctaTitle}>Want to learn more?</h2>
              <p className={styles.ctaDescription}>
                Schedule a demo to see how Vonoy can transform your logistics operations
              </p>
              <a href="/demo" className={styles.ctaButton}>
                Book a Demo
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.ctaButtonIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GenericPage;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import styles from "./NotFound.module.css";

/**
 * NotFound Page Component
 * 
 * A modern, animated 404 page that follows 2025 web design trends
 * with glass morphism, subtle animations, and helpful navigation options.
 * 
 * @returns {JSX.Element} The rendered NotFound page
 */
const NotFound: React.FC = () => {
  // Animation effect for particles
  useEffect(() => {
    const container = document.getElementById('particles-container');
    if (!container) return;

    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = styles.particle;
      
      // Random position, size and animation delay
      const size = Math.random() * 10 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      
      container.appendChild(particle);
    }

    // Cleanup
    return () => {
      if (container) {
        const particles = container.querySelectorAll(`.${styles.particle}`);
        particles.forEach(particle => container.removeChild(particle));
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-grow pt-24 ${styles.mainContent}`}>
        <div id="particles-container" className={styles.particlesContainer}></div>
        
        <div className={styles.container}>
          <div className={styles.glassCard}>
            <div className={styles.errorCode}>404</div>
            <h1 className={styles.title}>Page Not Found</h1>
            <p className={styles.description}>
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className={styles.suggestions}>
              <h2 className={styles.suggestionsTitle}>You might want to:</h2>
              <ul className={styles.suggestionsList}>
                <li>Check the URL for typos</li>
                <li>Go back to the previous page</li>
                <li>Visit our homepage</li>
                <li>Contact our support team</li>
              </ul>
            </div>
            
            <div className={styles.actions}>
              <button 
                onClick={() => window.history.back()} 
                className={`${styles.actionButton} ${styles.backButton}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.buttonIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Go Back
              </button>
              
              <Link to="/" className={`${styles.actionButton} ${styles.homeButton}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.buttonIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home Page
              </Link>
              
              <Link to="/demo" className={`${styles.actionButton} ${styles.demoButton}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.buttonIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                Book a Demo
              </Link>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className={styles.decorCircle1}></div>
          <div className={styles.decorCircle2}></div>
          <div className={styles.decorCircle3}></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

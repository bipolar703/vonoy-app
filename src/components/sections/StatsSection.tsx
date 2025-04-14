import React, { useEffect, useRef } from "react";
import styles from "./StatsSection.module.css";
import { scrollReveal, staggerAnimation } from "../../utils/animations";
import AnimatedCounter from "../../components/ui/AnimatedCounter";
import anime from "animejs";

/**
 * StatsSection Component
 *
 * The "Vonoy in Numbers" section that displays key statistics and metrics.
 * Uses the specified background color: rgb(32 60 91)
 * Incorporates modern 2025 web design trends with subtle animations and effects.
 *
 * Features:
 * - Removed grid effects as requested
 * - More compact and interactive UI
 * - Anime.js animations for statistics
 * - Scroll-triggered animations
 *
 * @returns {JSX.Element} The rendered StatsSection component
 */
const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);

  // Initialize animations when component mounts
  useEffect(() => {
    if (sectionRef.current && statsGridRef.current) {
      // Scroll reveal animation for the section
      scrollReveal(sectionRef.current, 0.1);

      // Staggered animation for stat cards
      const statCards = statsGridRef.current.querySelectorAll(`.${styles.statCard}`);
      staggerAnimation(statCards, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800
      }, 100);

      // Animate the visualization dots
      const dots = sectionRef.current.querySelectorAll(`.${styles.visualizationDot}`);
      dots.forEach((dot, index) => {
        anime({
          targets: dot,
          translateX: () => anime.random(-30, 30),
          translateY: () => anime.random(-30, 30),
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
          easing: 'easeInOutSine',
          duration: () => anime.random(3000, 5000),
          delay: index * 200,
          loop: true,
          direction: 'alternate'
        });
      });

      // Animate the visualization lines
      const lines = sectionRef.current.querySelectorAll(`.${styles.visualizationLine}`);
      lines.forEach((line, index) => {
        anime({
          targets: line,
          rotate: [index * 120, index * 120 + 360],
          easing: 'linear',
          duration: 20000 + (index * 5000),
          loop: true
        });
      });
    }
  }, []);
  return (
    <section ref={sectionRef} className={styles.statsSection}>
      {/* Grid lines removed as requested */}

      {/* Modern design elements: Floating accent circles */}
      <div className={styles.accentCircle1}></div>
      <div className={styles.accentCircle2}></div>
      <div className={styles.accentCircle3}></div>

      {/* Content container */}
      <div className={styles.container}>
        <div className={styles.contentLayout}>
          <div className={styles.textContent}>
            <div className={styles.header}>
              <h2 className={styles.headerTitle}>
                Vonoy in Numbers
              </h2>
              <p className={styles.headerDescription}>
                We plan to intensify our efforts to become pioneers in local and
                regional markets in this field, through the innovation and
                creativity that we have led from the beginning.
              </p>
            </div>

            <div ref={statsGridRef} className={styles.statsGrid}>
              {/* Stat Card - Cost Reduction */}
              <div className={styles.statCardWrapper}>
                <div className={styles.statCard}>
                  <div className={styles.iconContainer}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.statIcon}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className={styles.statValue}>
                    <AnimatedCounter value={31} suffix="%" duration={2500} />
                  </h3>
                  <p className={styles.statLabel}>Cost Reduction</p>
                </div>
              </div>

              {/* Stat Card - Fewer Vehicles */}
              <div className={styles.statCardWrapper}>
                <div className={styles.statCard}>
                  <div className={styles.iconContainer}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.statIcon}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  </div>
                  <h3 className={styles.statValue}>
                    <AnimatedCounter value={19.8} suffix="%" duration={2500} delay={200} />
                  </h3>
                  <p className={styles.statLabel}>Fewer Vehicles Required</p>
                </div>
              </div>

              {/* Stat Card - Efficiency */}
              <div className={styles.statCardWrapper}>
                <div className={styles.statCard}>
                  <div className={styles.iconContainer}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.statIcon}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <h3 className={styles.statValue}>
                    <AnimatedCounter value={10} suffix="%" duration={2500} delay={400} />
                  </h3>
                  <p className={styles.statLabel}>
                    Increase in Fleet Efficiency
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Modern stats visualization */}
          <div className={styles.statsAnimationContainer} id="stats-animation">
            <div className={styles.statsVisualization}>
              <div className={styles.visualizationCircle}></div>
              <div className={styles.visualizationLines}>
                <div className={styles.visualizationLine}></div>
                <div className={styles.visualizationLine}></div>
                <div className={styles.visualizationLine}></div>
              </div>
              <div className={styles.visualizationDots}>
                <div className={styles.visualizationDot}></div>
                <div className={styles.visualizationDot}></div>
                <div className={styles.visualizationDot}></div>
                <div className={styles.visualizationDot}></div>
                <div className={styles.visualizationDot}></div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section removed as requested */}
      </div>
    </section>
  );
};

export default StatsSection;

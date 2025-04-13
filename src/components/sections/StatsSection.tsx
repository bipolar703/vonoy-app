import React, { useEffect, useRef, useState } from "react";
import anime from 'animejs';
import styles from "./StatsSection.module.css";
import { scrollReveal, staggerAnimation } from "../../utils/animations";

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

  // State to track if counting animation has started
  const [countingStarted, setCountingStarted] = useState(false);
  const countingRef = useRef<{ [key: string]: any }>({});

  // Function to animate counting from 0 to target value
  const animateCountUp = (element: HTMLElement, targetValue: number) => {
    // Extract the numeric value (remove % sign if present)
    const isPercentage = element.textContent?.includes('%');
    const target = isPercentage ? targetValue : targetValue;

    // Create the counting animation
    const countAnimation = anime({
      targets: { value: 0 },
      value: target,
      duration: 2000,
      easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
      round: 1, // Round to nearest integer
      update: function(anim) {
        const currentValue = Math.round(anim.animations[0].currentValue);
        element.textContent = isPercentage ? `${currentValue}%` : `${currentValue}`;
      }
    });

    // Store the animation for cleanup
    const id = element.getAttribute('data-stat-id') || 'default';
    countingRef.current[id] = countAnimation;
  };

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

      // Set up intersection observer to trigger counting animation when in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !countingStarted) {
            setCountingStarted(true);

            // Start counting animations
            const statValues = statsGridRef.current?.querySelectorAll(`.${styles.statValue}`);
            if (statValues) {
              statValues.forEach((element, index) => {
                const el = element as HTMLElement;
                // Extract the target value from the element's text content
                const targetText = el.textContent || '';
                const targetValue = parseInt(targetText.replace('%', ''));
                // Set initial value to 0
                el.textContent = targetText.includes('%') ? '0%' : '0';
                // Set a data attribute for reference in cleanup
                el.setAttribute('data-stat-id', `stat-${index}`);
                // Start the animation with a slight delay for each stat
                setTimeout(() => {
                  animateCountUp(el, targetValue);
                }, index * 200);
              });
            }

            // Once triggered, disconnect the observer
            observer.disconnect();
          }
        });
      }, { threshold: 0.5 });

      // Observe the stats section
      observer.observe(sectionRef.current);

      return () => {
        // Clean up observer and animations
        observer.disconnect();
        Object.values(countingRef.current).forEach(animation => {
          if (animation && typeof animation.pause === 'function') {
            animation.pause();
          }
        });
      };
    }
  }, [countingStarted]);
  return (
    <section ref={sectionRef} className={styles.statsSection}>
      {/* Grid lines removed as requested */}

      {/* Modern design elements: Floating accent circles */}
      <div className={styles.accentCircle1}></div>
      <div className={styles.accentCircle2}></div>

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
                  <h3 className={styles.statValue}>31%</h3>
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
                  <h3 className={styles.statValue}>19.8%</h3>
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
                  <h3 className={styles.statValue}>10%</h3>
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

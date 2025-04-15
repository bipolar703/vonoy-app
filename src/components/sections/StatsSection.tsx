import React, { useEffect, useRef, useState } from 'react';
import { StatsAnimation } from './StatsAnimation';
import styles from './StatsSection.module.css';

/**
 * StatsSection Component - Enhanced with modern web design trends
 *
 * The "Vonoy in Numbers" section that displays key statistics and metrics.
 * Fully responsive with improved layout and animations:
 * - Count-up animations for stat values
 * - Stats cards on the left with animation on the right (desktop)
 * - Dynamic layout based on screen size
 */
const StatsSection: React.FC = () => {
  // Refs for the number elements
  const costValueRef = useRef<HTMLHeadingElement>(null);
  const vehiclesValueRef = useRef<HTMLHeadingElement>(null);
  const efficiencyValueRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Track if animation has run
  const [hasAnimated, setHasAnimated] = useState(false);

  // Function to animate counting up
  const animateValue = (
    element: HTMLElement,
    start: number,
    end: number,
    duration: number,
    suffix: string = ''
  ) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = `${value}${suffix}`;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Setup intersection observer to trigger animations when in view
  useEffect(() => {
    if (!sectionRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          // Start animations when in view
          if (costValueRef.current) {
            animateValue(costValueRef.current, 0, 31, 2000, '%');
          }
          if (vehiclesValueRef.current) {
            animateValue(vehiclesValueRef.current, 0, 19.8, 2000, '%');
          }
          if (efficiencyValueRef.current) {
            animateValue(efficiencyValueRef.current, 0, 10, 2000, '%');
          }
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className={`${styles.statsSection} vonoy-stats-section`}>
      {/* Background animation */}
      <div className={`${styles.backgroundAnimation} stats-bg-animation`}>
        <div className={`${styles.animatedCircle} ${styles.circle1} bg-circle bg-circle-1`}></div>
        <div className={`${styles.animatedCircle} ${styles.circle2} bg-circle bg-circle-2`}></div>
        <div className={`${styles.animatedCircle} ${styles.circle3} bg-circle bg-circle-3`}></div>
      </div>

      {/* Content container */}
      <div className={`${styles.container} stats-container`}>
        <div className={`${styles.sectionHeader} stats-header`}>
          <h2 className={`${styles.headerTitle} ${styles.headerTitleMobile} stats-title`}>Vonoy in Numbers</h2>
          <p className={`${styles.headerDescription} ${styles.headerDescriptionMobile} stats-description`}>
            We plan to intensify our efforts to become pioneers in local and regional markets in
            this field, through the innovation and creativity that we have led from the beginning.
          </p>
        </div>

        <div className={`${styles.contentLayout} stats-content-layout`}>
          <div className={`${styles.statsGrid} ${styles.statsGridMobile} stats-grid`}>
            {/* Stat Card - Cost Reduction */}
            <div className={`${styles.statCardWrapper} ${styles.statCardWrapperMobile} stat-card-item`}>
              <div className={`${styles.iconContainer} ${styles.iconContainerMobile} stat-icon-container`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles.statIcon} stat-icon cost-icon`}
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
              <div className={`${styles.statCard} ${styles.statCardMobile} stat-card cost-card`}>
                <h3 ref={costValueRef} className={`${styles.statValue} ${styles.statValueMobile} stat-value`}>
                  0%
                </h3>
                <p className={`${styles.statLabel} ${styles.statLabelMobile} stat-label`}>Cost Reduction</p>
              </div>
            </div>

            {/* Stat Card - Fewer Vehicles */}
            <div className={`${styles.statCardWrapper} ${styles.statCardWrapperMobile} stat-card-item`}>
              <div className={`${styles.iconContainer} ${styles.iconContainerMobile} stat-icon-container`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles.statIcon} stat-icon vehicles-icon`}
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
              <div className={`${styles.statCard} ${styles.statCardMobile} stat-card vehicles-card`}>
                <h3 ref={vehiclesValueRef} className={`${styles.statValue} ${styles.statValueMobile} stat-value`}>
                  0%
                </h3>
                <p className={`${styles.statLabel} ${styles.statLabelMobile} stat-label`}>Fewer Vehicles Required</p>
              </div>
            </div>

            {/* Stat Card - Efficiency */}
            <div className={`${styles.statCardWrapper} ${styles.statCardWrapperMobile} stat-card-item`}>
              <div className={`${styles.iconContainer} ${styles.iconContainerMobile} stat-icon-container`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles.statIcon} stat-icon efficiency-icon`}
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
              <div className={`${styles.statCard} ${styles.statCardMobile} stat-card efficiency-card`}>
                <h3 ref={efficiencyValueRef} className={`${styles.statValue} ${styles.statValueMobile} stat-value`}>
                  0%
                </h3>
                <p className={`${styles.statLabel} ${styles.statLabelMobile} stat-label`}>Increase in Fleet Efficiency</p>
              </div>
            </div>
          </div>

          {/* Animation container */}
          <div className={`${styles.statsImageContainer} ${styles.statsImageContainerMobile} stats-image-container`}>
            <StatsAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

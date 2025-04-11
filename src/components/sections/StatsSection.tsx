import React from "react";
import BulbAnimation from "./BulbAnimation";
import styles from "./StatsSection.module.css";

/**
 * StatsSection Component
 *
 * The "Vonoy in Numbers" section that displays key statistics and metrics.
 * Uses the specified background color: rgb(32 60 91)
 * Incorporates modern 2025 web design trends with subtle animations and effects.
 *
 * @returns {JSX.Element} The rendered StatsSection component
 */
const StatsSection: React.FC = () => {
  return (
    <section className={styles.statsSection}>
      {/* Modern design elements: Decorative grid lines */}
      <div className={styles.gridLines}>
        <div className={styles.gridLinesInner}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={styles.gridLine}
              style={{
                top: `${i * 10}%`,
              }}
            ></div>
          ))}
        </div>
      </div>

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

            <div className={styles.statsGrid}>
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

          {/* Light Bulb Animation */}
          <div className={styles.statsAnimationContainer} id="stats-animation">
            <BulbAnimation />
          </div>
        </div>

        {/* CTA section removed as requested */}
      </div>
    </section>
  );
};

export default StatsSection;

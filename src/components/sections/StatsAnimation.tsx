import React, { useEffect, useRef, useState } from "react";
import styles from "./StatsAnimation.module.css";

/**
 * StatsAnimation Component
 *
 * An animated light bulb with connected wires that illuminate progressively,
 * creating a high-end visual effect for the Stats section.
 */
const StatsAnimation: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.3,
      }
    );

    if (animationRef.current) {
      observer.observe(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        observer.unobserve(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={animationRef} className={styles.animationContainer}>
      <div className={`${styles.lightBulb} ${animate ? styles.animate : ""}`}>
        <svg
          width="100"
          height="160"
          viewBox="0 0 100 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={styles.bulbGlass}
            d="M74 60C74 76.9 60.3 90.6 50 105C40.1 90.6 26 77 26 60C26 42.9 39.9 29 50 29C60.3 29 74 42.9 74 60Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            className={styles.bulbBase}
            d="M59 110H41C39.9 110 39 109.1 39 108V105C39 103.9 39.9 103 41 103H59C60.1 103 61 103.9 61 105V108C61 109.1 60.1 110 59 110Z"
            fill="currentColor"
          />
          <path
            className={styles.bulbBase}
            d="M56 117H44C42.9 117 42 116.1 42 115V110C42 108.9 42.9 108 44 108H56C57.1 108 58 108.9 58 110V115C58 116.1 57.1 117 56 117Z"
            fill="currentColor"
          />
          <path
            className={styles.filament}
            d="M50 65V95"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className={styles.filament}
            d="M42 72H58"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className={styles.filament}
            d="M45 83L55 83"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <div
          className={`${styles.glow} ${animate ? styles.animateGlow : ""}`}
        ></div>
      </div>

      {/* Circuit wires container */}
      <div className={styles.circuitContainer}>
        {/* Top circuit */}
        <div
          className={`${styles.circuit} ${styles.circuitTop} ${
            animate ? styles.animateCircuitTop : ""
          }`}
        >
          <div className={styles.circuitLine}></div>
          <div className={styles.circuitNode}></div>
          <div className={styles.circuitPulse}></div>
        </div>

        {/* Right circuit */}
        <div
          className={`${styles.circuit} ${styles.circuitRight} ${
            animate ? styles.animateCircuitRight : ""
          }`}
        >
          <div className={styles.circuitLine}></div>
          <div className={styles.circuitNode}></div>
          <div className={styles.circuitPulse}></div>
        </div>

        {/* Bottom circuit */}
        <div
          className={`${styles.circuit} ${styles.circuitBottom} ${
            animate ? styles.animateCircuitBottom : ""
          }`}
        >
          <div className={styles.circuitLine}></div>
          <div className={styles.circuitNode}></div>
          <div className={styles.circuitPulse}></div>
        </div>

        {/* Left circuit */}
        <div
          className={`${styles.circuit} ${styles.circuitLeft} ${
            animate ? styles.animateCircuitLeft : ""
          }`}
        >
          <div className={styles.circuitLine}></div>
          <div className={styles.circuitNode}></div>
          <div className={styles.circuitPulse}></div>
        </div>
      </div>

      {/* Original wires */}
      <div className={styles.wiresContainer}>
        <div
          className={`${styles.wire} ${styles.wireLeft} ${
            animate ? styles.animateWireLeft : ""
          }`}
        ></div>
        <div
          className={`${styles.wire} ${styles.wireRight} ${
            animate ? styles.animateWireRight : ""
          }`}
        ></div>
        <div
          className={`${styles.wire} ${styles.wireBottom} ${
            animate ? styles.animateWireBottom : ""
          }`}
        ></div>

        {/* Wire Nodes */}
        <div
          className={`${styles.wireNode} ${styles.wireNodeLeft} ${
            animate ? styles.animateNodeLeft : ""
          }`}
        ></div>
        <div
          className={`${styles.wireNode} ${styles.wireNodeRight} ${
            animate ? styles.animateNodeRight : ""
          }`}
        ></div>
        <div
          className={`${styles.wireNode} ${styles.wireNodeBottom} ${
            animate ? styles.animateNodeBottom : ""
          }`}
        ></div>

        {/* Pulse animations */}
        <div
          className={`${styles.pulse} ${styles.pulseLeft} ${
            animate ? styles.animatePulseLeft : ""
          }`}
        ></div>
        <div
          className={`${styles.pulse} ${styles.pulseRight} ${
            animate ? styles.animatePulseRight : ""
          }`}
        ></div>
        <div
          className={`${styles.pulse} ${styles.pulseBottom} ${
            animate ? styles.animatePulseBottom : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

export default StatsAnimation;

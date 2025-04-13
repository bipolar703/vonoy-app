import React, { useEffect, useRef, useState } from "react";
import styles from "./WhyVonoySection.module.css";
import { scrollReveal } from "../../utils/animations";
import { whyVonoySectionAnimation } from "../../utils/sectionAnimations";
import ExpandableCard from "../../components/ui/ExpandableCard";

/**
 * Why Choose Vonoy Section
 *
 * Displays the key benefits of the Vonoy platform with modern design elements
 * and icons. Implements interactive animations and expandable cards.
 *
 * Features:
 * - Scroll-triggered animations
 * - Interactive expandable cards with click-to-expand functionality
 * - Only one card expanded at a time for cleaner UX
 * - Premium, subtle animations
 * - Modern glass morphism design
 */

// Card component with independent expansion
const FeatureCards: React.FC<{ features: any[] }> = ({ features }) => {
  // Track which cards are expanded with local state instead of context
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  // Handle card toggle with animation - each card expands independently
  const handleCardToggle = (id: string, isOpen: boolean) => {
    // Update only the clicked card's state
    setExpandedCards(prev => ({
      ...prev,
      [id]: isOpen
    }));
  };

  return (
    <div className={styles.featuresGrid}>
      {features.map((feature, index) => {
        const cardId = `feature-${index}`;
        // Check if this specific card is open
        const isOpen = !!expandedCards[cardId];

        return (
          <div key={index} className="card-container">
            <ExpandableCard
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              className={styles.featureCard}
              isOpen={isOpen}
              onToggle={(open) => handleCardToggle(cardId, open)}
            />
          </div>
        );
      })}
    </div>
  );
};

const WhyVonoySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Initialize animations when component mounts
  useEffect(() => {
    if (sectionRef.current) {
      // Basic scroll reveal for compatibility
      scrollReveal(sectionRef.current, 0.1);

      // Add section-specific premium animation
      sectionRef.current.id = 'why-vonoy-section';

      // Add animation classes to elements
      const title = sectionRef.current.querySelector('.' + styles.sectionTitle);
      if (title) title.classList.add('section-title');

      // Initialize the premium animation with IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              whyVonoySectionAnimation(sectionRef.current!);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(sectionRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);
  // Features data - Updated based on vonoy-edits.md
  const features = [
    {
      title: "Built on Science",
      description: "Our solutions are grounded in advanced operations research and real-world logistics modeling—designed by experts who've solved these problems at scale.",
      icon: (
        <svg
          className={styles.featureIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Customized for Your Operation",
      description: "We don't offer one-size-fits-all tools. Every algorithm, interface, and deployment is tailored to your exact business rules, constraints, and goals.",
      icon: (
        <svg
          className={styles.featureIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1V23"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Technology + Strategy Combined",
      description: "We deliver both the technical infrastructure (APIs, TMS, apps) and the strategic insight (network design, capacity planning) to help you transform your operations.",
      icon: (
        <svg
          className={styles.featureIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 8H8V16H16V8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 16H1V22H7V20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 8H1V2H7V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 16H23V22H17V20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 8H23V2H17V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Proven Track Record",
      description: "Led by former Amazon logistics experts and academic researchers, we've delivered measurable savings and operational improvements for enterprise clients across Europe, Middle East and North Africa.",
      icon: (
        <svg
          className={styles.featureIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 20V10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 20V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 20V14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sectionBg}>
        <div className={styles.glow}></div>
      </div>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.highlight}>Why Choose Vonoy?</span>
          </h2>
        </div>

        {/* Cards now expand independently */}
        <FeatureCards features={features} />
      </div>
    </section>
  );
};

export default WhyVonoySection;

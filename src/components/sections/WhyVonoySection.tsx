import React, { useState } from 'react';
import ExpandableCard from '../ui/ExpandableCard';
import styles from './WhyVonoySection.module.css';

/**
 * Why Choose Vonoy Section - Updated
 *
 * Displays the key benefits of the Vonoy platform with interactive expandable cards
 * Cards can now be independently opened and closed
 */

// Define types for the feature cards
interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const WhyVonoySection: React.FC = () => {
  // Track expanded cards in a Set to allow multiple cards to be expanded
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set([]));

  // Features data with updated icons
  const features: Feature[] = [
    {
      title: 'Built on Science',
      description:
        "Our solutions are grounded in advanced operations research and real-world logistics modeling—designed by experts who've solved these problems at scale.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.5 3.5L18 2L16.5 3.5L15 2L13.5 3.5L12 2L10.5 3.5L9 2L7.5 3.5L6 2L4.5 3.5L3 2V22L4.5 20.5L6 22L7.5 20.5L9 22L10.5 20.5L12 22L13.5 20.5L15 22L16.5 20.5L18 22L19.5 20.5L21 22V2L19.5 3.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 9H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 17H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Customized for Your Operation',
      description:
        "We don't offer one-size-fits-all tools. Every algorithm, interface, and deployment is tailored to your exact business rules, constraints, and goals.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: 'Technology + Strategy Combined',
      description:
        'We deliver both the technical infrastructure (APIs, TMS, apps) and the strategic insight (network design, capacity planning) to help you transform your operations.',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 12H18L15 21L9 3L6 12H2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: 'Proven Track Record',
      description:
        "Led by former Amazon logistics experts and academic researchers, we've delivered measurable savings and operational improvements for enterprise clients across Europe, Middle East and North Africa.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: 'Efficiency That Reduces Emissions',
      description:
        'Our optimization reduces not just cost and time—but carbon footprint. Fewer vehicles, shorter routes, and better fleet planning mean more sustainable operations from day one.',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3C17.5228 3 22 7.47715 22 13C22 18.5228 17.5228 23 12 23C6.47715 23 2 18.5228 2 13C2 7.47715 6.47715 3 12 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 13L12 18L17 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 18V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  // Card toggle handler - allow independent opening and closing
  const handleCardToggle = (id: string, isOpen: boolean) => {
    setExpandedCards((prev) => {
      const newExpandedCards = new Set(prev);

      if (isOpen) {
        newExpandedCards.add(id);
      } else {
        newExpandedCards.delete(id);
      }

      return newExpandedCards;
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Why Choose <span className={styles.highlight}>Vonoy</span>?
          </h2>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => {
            // Create a unique ID for each card
            const cardId = `feature-${index}`;
            // Check if this card is in the set of expanded cards
            const isOpen = expandedCards.has(cardId);

            return (
              <div key={index} className="card-container">
                <ExpandableCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  className={`${styles.featureCard} ${isOpen ? styles.expandedCard : ''}`}
                  isOpen={isOpen}
                  onToggle={(open) => handleCardToggle(cardId, open)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyVonoySection;

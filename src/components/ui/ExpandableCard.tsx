import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ExpandableCard.module.css';
import anime from 'animejs';

interface ExpandableCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

/**
 * ExpandableCard Component
 *
 * A premium, interactive card component that can expand to show more content.
 * Features smooth animations, glass morphism design, and hover effects.
 *
 * @param {string} title - The card title
 * @param {string} description - The card description (shown when expanded)
 * @param {ReactNode} icon - The icon to display
 * @param {string} className - Additional CSS classes
 * @param {boolean} isOpen - Whether the card is expanded
 * @param {function} onToggle - Callback when card is toggled
 */
const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  description,
  icon,
  className = '',
  isOpen = false,
  onToggle
}) => {
  // Local state for controlled or uncontrolled usage
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const cardRef = useRef<HTMLDivElement>(null);

  // Update local state when prop changes
  useEffect(() => {
    setIsExpanded(isOpen);
  }, [isOpen]);

  // Add subtle animation effects when component mounts
  useEffect(() => {
    if (cardRef.current) {
      // Add subtle hover animation
      const iconContainer = cardRef.current.querySelector(`.${styles.iconContainer}`);
      if (iconContainer) {
        anime({
          targets: iconContainer,
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9],
          easing: 'easeInOutSine',
          duration: 3000,
          loop: true
        });
      }
    }
  }, []);

  // Handle card click
  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);

    // Call onToggle callback if provided
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.card} ${className} ${isExpanded ? styles.expanded : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ translateY: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)' }}
      onClick={handleToggle}
    >
      <div className={styles.cardHeader}>
        <div className={styles.iconContainer}>
          {icon}
          <div className={styles.iconGlow} />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <motion.div
          className={styles.arrow}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.cardContent}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className={styles.description}>{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExpandableCard;

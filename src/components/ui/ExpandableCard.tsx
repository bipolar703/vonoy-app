import React, { memo, useEffect, useRef } from 'react';
import styles from './ExpandableCard.module.css';

// Remove the unused counter
// let uniqueCardId = 0;

interface ExpandableCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

/**
 * ExpandableCard Component - Enhanced version with smooth animations
 *
 * An interactive card component that can expand to show more content.
 * Uses CSS transitions for smooth animations and includes subtle hover effects.
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
  onToggle,
}) => {
  // Reference to content for height animation
  const contentRef = useRef<HTMLDivElement>(null);
  // Track if this is the initial render
  const isInitialRender = useRef(true);

  // Apply animation class only after initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    }
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onToggle) {
      onToggle(!isOpen);
    }
  };

  return (
    <div
      className={`${styles.card} ${className} ${isOpen ? styles.expanded : ''} ${
        !isInitialRender.current ? styles.animated : ''
      }`}
      onClick={handleToggle}
    >
      <div className={styles.cardHeader}>
        <div className={styles.iconContainer}>
          <div className={styles.icon}>{icon}</div>
          <div className={styles.iconGlow} />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <div className={`${styles.arrow} ${isOpen ? styles.arrowExpanded : ''}`}>
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
        </div>
      </div>

      {/* Content with height animation */}
      <div
        className={`${styles.cardContent} ${isOpen ? styles.contentVisible : ''}`}
        style={{
          maxHeight: isOpen
            ? contentRef.current
              ? `${contentRef.current.scrollHeight}px`
              : '500px'
            : '0px',
        }}
      >
        <div ref={contentRef} className={styles.contentWrapper}>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(ExpandableCard);

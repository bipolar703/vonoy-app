import React, { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import styles from './ExpandableCard.module.css';

interface ExpandableCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  children?: React.ReactNode;
}

/**
 * ExpandableCard Component
 *
 * A modern, interactive card that expands and collapses on click.
 * Implements 2025 design trends with subtle animations and glass morphism effects.
 *
 * Features:
 * - Click to expand/collapse
 * - Smooth animations with variable height
 * - Glass morphism effects
 * - Subtle hover states
 * - Accessible keyboard navigation
 */
const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  description,
  icon,
  className = '',
  isOpen: externalIsOpen,
  onToggle,
  children
}) => {
  // Use internal state if not controlled externally
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  // Refs for measuring content height
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  // Animate content height using Anime.js
  useEffect(() => {
    if (contentRef.current) {
      // Cancel any existing animations on this element
      anime.remove(contentRef.current);

      // Get the target height
      const targetHeight = isOpen ? contentRef.current.scrollHeight : 0;

      // Create animation timeline with Anime.js
      const timeline = anime.timeline({
        easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
        // Using Web Animation API differences from Anime.js documentation
        // https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/
        // Setting iterations to 1 (default) for a single animation
        // This is equivalent to the Web Animation API's iterations property
        loop: false,
        direction: 'normal',
        autoplay: true
      });

      // Add height animation
      timeline.add({
        targets: contentRef.current,
        height: targetHeight,
        duration: 600, // Slower, more premium animation
        complete: () => {
          // Set height to auto when animation completes and card is open
          // This allows content to adjust if its size changes
          if (isOpen && contentRef.current) {
            contentRef.current.style.height = 'auto';
          }
        }
      });

      // Add fade-in animation for content if opening
      if (isOpen && contentRef.current) {
        // Get only direct children of this specific card's content
        const contentElements = contentRef.current.querySelectorAll(':scope > *');

        // Cancel any existing animations on these elements
        contentElements.forEach(el => anime.remove(el));

        timeline.add({
          targets: contentElements,
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 500,
          delay: anime.stagger(50), // Staggered animation for child elements
          easing: 'cubicBezier(0.25, 0.1, 0.25, 1)'
        }, '-=400'); // Start before the height animation completes
      }
    }

    // Cleanup function to remove animations when component unmounts or updates
    return () => {
      if (contentRef.current) {
        anime.remove(contentRef.current);
        const contentElements = contentRef.current.querySelectorAll('*');
        contentElements.forEach(el => anime.remove(el));
      }
    };
  }, [isOpen, children, description]);

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current && isOpen) {
        // Set height to auto to accommodate content changes
        contentRef.current.style.height = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Toggle open/closed state
  const handleToggle = (e?: React.MouseEvent | React.KeyboardEvent) => {
    // Prevent event bubbling if event is provided
    if (e) {
      e.stopPropagation();
    }

    const newIsOpen = !isOpen;

    // Update internal state if not controlled
    if (externalIsOpen === undefined) {
      setInternalIsOpen(newIsOpen);
    }

    // Call external handler if provided
    if (onToggle) {
      onToggle(newIsOpen);
    }
  };

  return (
    <div
      className={`${styles.card} ${isOpen ? styles.open : ''} ${className}`}
      onClick={(e) => handleToggle(e)}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle(e);
        }
      }}
    >
      <div className={styles.header}>
        {icon && <div className={styles.iconContainer}>{icon}</div>}
        <h3 className={styles.title}>{title}</h3>
        <div className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
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

      <div
        ref={contentRef}
        className={styles.content}
        style={{ height: 0 }} // Start with height 0, Anime.js will animate this
      >
        <div className={styles.description}>{description}</div>
        {children && <div className={styles.children}>{children}</div>}
      </div>
    </div>
  );
};

export default ExpandableCard;

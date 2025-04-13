import anime from 'animejs';
import { createAnimation, createTimeline } from './animationSystem';

/**
 * Section Animations Utility
 *
 * A collection of premium, subtle animations for different sections of the homepage.
 * Each animation is optimized for performance and designed to be mobile-friendly.
 *
 * Based on the latest animation techniques for 2025.
 */

// Helper function to check if element is in viewport
export const isInViewport = (element: HTMLElement, offset = 0): boolean => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= 0
  );
};

// Base animation for all sections
export const baseScrollReveal = (element: HTMLElement, delay = 0): anime.AnimeInstance => {
  // Set initial styles
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.visibility = 'visible';

  // Use the enhanced createAnimation function from animationSystem
  return createAnimation({
    targets: element,
    opacity: [0, 1],
    translateY: [30, 0],
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
    duration: 800,
    delay
  });
};

// Hero section animation
export const heroSectionAnimation = (element: HTMLElement): void => {
  // Staggered animation for hero elements
  const title = element.querySelector('.hero-title');
  const subtitle = element.querySelector('.hero-subtitle');
  const cta = element.querySelector('.hero-cta');
  const image = element.querySelector('.hero-image');

  // Use the enhanced createTimeline function from animationSystem
  const animations = [];

  // Add animations to the array
  if (title) {
    animations.push({
      targets: title,
      properties: {
        opacity: [0, 1],
        translateY: [30, 0]
      },
      offset: 0
    });
  }

  if (subtitle) {
    animations.push({
      targets: subtitle,
      properties: {
        opacity: [0, 1],
        translateY: [20, 0]
      },
      offset: '-=600'
    });
  }

  if (cta) {
    animations.push({
      targets: cta,
      properties: {
        opacity: [0, 1],
        translateY: [20, 0]
      },
      offset: '-=600'
    });
  }

  if (image) {
    animations.push({
      targets: image,
      properties: {
        opacity: [0, 1],
        translateX: [30, 0]
      },
      offset: '-=800'
    });
  }

  // Create the timeline with proper cleanup
  createTimeline(animations, {
    duration: 800,
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)'
  });
};

// Features section animation with floating effect
export const featuresSectionAnimation = (element: HTMLElement): void => {
  const items = element.querySelectorAll('.feature-item');

  // Use the enhanced createAnimation function for initial animation
  const initialAnimation = createAnimation({
    targets: items,
    opacity: [0, 1],
    translateY: [40, 0],
    delay: anime.stagger(100),
    duration: 800,
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
    complete: () => {
      // Add subtle floating animation after items appear
      // This is a continuous animation, so we'll use createAnimation for proper cleanup
      createAnimation({
        targets: items,
        translateY: [0, -10, 0],
        duration: 3000,
        delay: anime.stagger(200),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
      });
    }
  });
};

// Why Vonoy section animation with card reveal
export const whyVonoySectionAnimation = (element: HTMLElement): void => {
  const title = element.querySelector('.section-title');
  const cards = element.querySelectorAll('.card-container');

  // Use the enhanced createTimeline function from animationSystem
  const animations = [];

  if (title) {
    animations.push({
      targets: title,
      properties: {
        opacity: [0, 1],
        translateY: [20, 0]
      },
      offset: 0
    });
  }

  animations.push({
    targets: cards,
    properties: {
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(150)
    },
    offset: '-=400'
  });

  // Create the timeline with proper cleanup
  createTimeline(animations, {
    duration: 800,
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)'
  });
};

// Stats section animation with counting effect
export const statsSectionAnimation = (element: HTMLElement): void => {
  const items = element.querySelectorAll('.stat-item');
  const numbers = element.querySelectorAll('.stat-number');

  // Reveal items with stagger using enhanced createAnimation
  createAnimation({
    targets: items,
    opacity: [0, 1],
    translateY: [30, 0],
    delay: anime.stagger(150),
    duration: 800,
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)'
  });

  // Animate numbers with counting effect
  numbers.forEach(number => {
    const target = number as HTMLElement;
    const value = parseInt(target.dataset.value || '0', 10);

    createAnimation({
      targets: target,
      innerHTML: [0, value],
      round: 1,
      duration: 2000,
      easing: 'easeInOutExpo',
      delay: 300
    });
  });
};

// Testimonials section animation with slide effect
export const testimonialsSectionAnimation = (element: HTMLElement): void => {
  const testimonials = element.querySelectorAll('.testimonial-item');

  // Use enhanced createAnimation for proper cleanup
  createAnimation({
    targets: testimonials,
    opacity: [0, 1],
    translateX: [50, 0],
    delay: anime.stagger(200),
    duration: 800,
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)'
  });
};

// CTA section animation with pulse effect
export const ctaSectionAnimation = (element: HTMLElement): void => {
  const content = element.querySelector('.cta-content');
  const button = element.querySelector('.cta-button');

  // Use the enhanced createTimeline function from animationSystem
  const animations = [];

  if (content) {
    animations.push({
      targets: content,
      properties: {
        opacity: [0, 1],
        translateY: [30, 0]
      },
      offset: 0
    });
  }

  if (button) {
    animations.push({
      targets: button,
      properties: {
        opacity: [0, 1],
        translateY: [20, 0]
      },
      offset: '-=400'
    });
  }

  // Create the timeline with proper cleanup
  const timeline = createTimeline(animations, {
    duration: 800,
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)'
  });

  // Add pulse animation to button after the timeline completes
  if (button) {
    timeline.finished.then(() => {
      // Add subtle pulse animation to button
      createAnimation({
        targets: button,
        scale: [1, 1.05, 1],
        boxShadow: [
          '0 4px 10px rgba(61, 213, 152, 0.2)',
          '0 7px 20px rgba(61, 213, 152, 0.4)',
          '0 4px 10px rgba(61, 213, 152, 0.2)'
        ],
        duration: 2000,
        loop: true,
        easing: 'easeInOutSine'
      });
    });
  }
};

// Initialize all section animations with enhanced performance and safety
export const initSectionAnimations = (): void => {
  // Store animation states to prevent duplicate animations
  const animatedSections = new Set<string>();

  // Use Intersection Observer for better performance
  const createSectionObserver = (sectionId: string, animationFn: (element: HTMLElement) => void) => {
    const section = document.querySelector(`#${sectionId}`) as HTMLElement;

    if (!section) {
      // If section doesn't exist yet, try again later
      setTimeout(() => createSectionObserver(sectionId, animationFn), 500);
      return;
    }

    // Create observer with appropriate threshold and rootMargin
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animatedSections.has(sectionId)) {
            try {
              // Add animated-element class to all text elements
              const textElements = section.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a');
              textElements.forEach(el => el.classList.add('animated-element'));

              // Run the animation
              animationFn(section);
              animatedSections.add(sectionId);

              // Disconnect after animation is triggered
              observer.disconnect();
            } catch (error) {
              console.warn(`Animation error in ${sectionId}:`, error);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(section);
    return observer;
  };

  // Initialize all section observers
  const observers = [];

  // Delay initialization slightly to ensure DOM is ready
  setTimeout(() => {
    // Create observers for each section
    observers.push(createSectionObserver('hero-section', heroSectionAnimation));
    observers.push(createSectionObserver('features-section', featuresSectionAnimation));
    observers.push(createSectionObserver('why-vonoy-section', whyVonoySectionAnimation));
    observers.push(createSectionObserver('stats-section', statsSectionAnimation));
    observers.push(createSectionObserver('testimonials-section', testimonialsSectionAnimation));
    observers.push(createSectionObserver('cta-section', ctaSectionAnimation));
    observers.push(createSectionObserver('video-section', (el) => {
      // Custom animation for video section using enhanced createAnimation
      createAnimation({
        targets: el.querySelectorAll('.video-content'),
        opacity: [0, 1],
        translateY: [30, 0],
        easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
        duration: 800
      });
    }));
  }, 300);

  // Cleanup function
  return () => {
    observers.forEach(observer => {
      if (observer) observer.disconnect();
    });
  };
};

export default {
  initSectionAnimations,
  heroSectionAnimation,
  featuresSectionAnimation,
  whyVonoySectionAnimation,
  statsSectionAnimation,
  testimonialsSectionAnimation,
  ctaSectionAnimation
};

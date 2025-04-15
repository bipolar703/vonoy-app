/**
 * Micro-interactions utility
 * Modern micro-interactions for form elements and UI components
 */

/**
 * Shake animation for form fields with errors
 * @param element - DOM element to animate
 */
export const shakeElement = (element: HTMLElement | null): void => {
  if (!element) return;

  element.animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(0)' },
    ],
    {
      duration: 400,
      easing: 'ease-in-out',
    }
  );
};

/**
 * Pulse animation for highlighting elements
 * @param element - DOM element to animate
 */
export const pulseElement = (element: HTMLElement | null): void => {
  if (!element) return;

  element.animate(
    [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(1.05)', opacity: 0.8 },
      { transform: 'scale(1)', opacity: 1 },
    ],
    {
      duration: 600,
      easing: 'ease-in-out',
    }
  );
};

/**
 * Fade in animation for elements
 * @param element - DOM element to animate
 * @param duration - Animation duration in ms
 */
export const fadeInElement = (
  element: HTMLElement | null,
  duration: number = 300
): void => {
  if (!element) return;

  element.animate(
    [
      { opacity: 0, transform: 'translateY(10px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    {
      duration,
      easing: 'ease-out',
      fill: 'forwards',
    }
  );
};

/**
 * Fade out animation for elements
 * @param element - DOM element to animate
 * @param duration - Animation duration in ms
 */
export const fadeOutElement = (
  element: HTMLElement | null,
  duration: number = 300
): void => {
  if (!element) return;

  element.animate(
    [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(10px)' },
    ],
    {
      duration,
      easing: 'ease-in',
      fill: 'forwards',
    }
  );
};

/**
 * Ripple effect for buttons
 * @param event - Mouse event
 * @param element - DOM element to animate
 * @param color - Ripple color
 */
export const createRippleEffect = (
  event: React.MouseEvent,
  element: HTMLElement | null,
  color: string = 'rgba(255, 255, 255, 0.3)'
): void => {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const ripple = document.createElement('span');
  ripple.style.position = 'absolute';
  ripple.style.backgroundColor = color;
  ripple.style.borderRadius = '50%';
  ripple.style.pointerEvents = 'none';
  ripple.style.width = '0';
  ripple.style.height = '0';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.transform = 'translate(-50%, -50%)';
  ripple.style.opacity = '1';

  element.appendChild(ripple);

  // Ensure element has position relative for absolute positioning of ripple
  const computedStyle = window.getComputedStyle(element);
  if (computedStyle.position === 'static') {
    element.style.position = 'relative';
  }
  element.style.overflow = 'hidden';

  // Animate the ripple
  const size = Math.max(rect.width, rect.height) * 2;
  ripple.animate(
    [
      { width: '0', height: '0', opacity: 0.5 },
      { width: `${size}px`, height: `${size}px`, opacity: 0 },
    ],
    {
      duration: 600,
      easing: 'ease-out',
      fill: 'forwards',
    }
  ).onfinish = () => {
    ripple.remove();
  };
};

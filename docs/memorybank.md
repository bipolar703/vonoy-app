# Vonoy App Memory Bank

## Core Design Principles
- **Brand Colors**: Primary #00a79d (teal), Secondary #121F2F (dark blue)
- **Typography**: Satoshi for headings, Inter for body text
- **Spacing System**: 4px base unit (0.25rem)
- **Border Radius**: 0.5rem (8px) for components, 0.25rem (4px) for buttons
- **Shadows**: Subtle shadows for depth, stronger for interactive elements

## UX Patterns
- **Loading States**: Logo-based animation for brand consistency
- **Transitions**: 300ms ease-in-out for most transitions
- **Hover Effects**: Scale 1.02-1.05 + shadow increase for clickable items
- **Focus States**: 2px outline with 2px offset in primary color
- **Mobile Gestures**: Swipe support for carousels, pull-to-refresh for data

## Responsive Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md-lg)
- **Desktop**: > 1024px (xl)
- **Large Desktop**: > 1280px (2xl)

## Performance Targets
- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Accessibility Standards
- **Color Contrast**: WCAG AA (4.5:1 for normal text, 3:1 for large text)
- **Keyboard Navigation**: Full support with visible focus states
- **Screen Readers**: ARIA labels for all interactive elements
- **Reduced Motion**: Support for prefers-reduced-motion
- **Font Sizing**: Minimum 16px for body text, relative units (rem) for scaling

## Code Patterns

### React Component Template
```jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ComponentName.module.css';

/**
 * ComponentName
 * 
 * @description Brief description of the component's purpose
 * @param {Object} props - Component props
 * @returns {JSX.Element}
 */
const ComponentName = ({ prop1, prop2, children }) => {
  // Hooks and state
  
  // Event handlers
  
  // Render helpers
  
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  children: PropTypes.node,
};

ComponentName.defaultProps = {
  prop2: 0,
};

export default ComponentName;
```

### Custom Hook Template
```js
import { useState, useEffect, useCallback } from 'react';

/**
 * useCustomHook
 * 
 * @description Brief description of the hook's purpose
 * @param {any} initialValue - Initial value description
 * @returns {Array} [value, setValue] - Return value description
 */
const useCustomHook = (initialValue) => {
  // State
  const [value, setValue] = useState(initialValue);
  
  // Memoized functions
  const handleChange = useCallback((newValue) => {
    // Logic
    setValue(newValue);
  }, []);
  
  // Side effects
  useEffect(() => {
    // Setup
    
    return () => {
      // Cleanup
    };
  }, []);
  
  return [value, handleChange];
};

export default useCustomHook;
```

### Animation Snippets
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fadeIn {
  animation: fadeIn 0.3s ease-in-out forwards;
}

/* Slide Up */
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.slideUp {
  animation: slideUp 0.4s ease-out forwards;
}

/* Pulse */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.pulse {
  animation: pulse 1.5s infinite ease-in-out;
}
```

### Responsive Mixins (SCSS)
```scss
@mixin mobile {
  @media (max-width: 639px) { @content; }
}

@mixin tablet {
  @media (min-width: 640px) and (max-width: 1023px) { @content; }
}

@mixin desktop {
  @media (min-width: 1024px) { @content; }
}

@mixin large-desktop {
  @media (min-width: 1280px) { @content; }
}

@mixin dark-mode {
  @media (prefers-color-scheme: dark) { @content; }
}

@mixin reduced-motion {
  @media (prefers-reduced-motion: reduce) { @content; }
}
```

## Optimization Techniques

### Image Optimization
- Use WebP with AVIF fallback
- Implement responsive images with srcset
- Lazy load below-the-fold images
- Use appropriate dimensions and compression

### Font Loading
- Use font-display: swap
- Preload critical fonts
- Subset fonts to include only used characters
- Use variable fonts where possible

### JavaScript Optimization
- Code splitting by route and component
- Tree shaking unused code
- Defer non-critical scripts
- Use requestIdleCallback for non-urgent tasks

### CSS Optimization
- Purge unused CSS
- Critical CSS inline in head
- Minimize specificity
- Use CSS variables for theming

## Testing Checklist
- Unit tests for utility functions
- Component tests for UI elements
- Integration tests for user flows
- Accessibility tests (axe-core)
- Performance tests (Lighthouse)
- Cross-browser testing
- Mobile device testing

## Deployment Strategy
- CI/CD pipeline with GitHub Actions
- Staging environment for QA
- Feature flags for gradual rollout
- Automated performance regression testing
- Error monitoring with Sentry

## Documentation Standards
- JSDoc for all functions and components
- README.md with setup and contribution guidelines
- CHANGELOG.md for version history
- Storybook for component documentation

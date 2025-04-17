# Styling Guide for Vonoy Application

This document outlines the styling system used in the Vonoy application, providing a clear understanding of how styles are organized and applied across the project. The goal is to maintain the current design and layout while ensuring the styling approach is maintainable and easy to understand.

## Overview of Styling System

The Vonoy application uses a combination of Tailwind CSS, custom CSS variables, and component-specific styles to create a cohesive and visually appealing design. The system integrates design tokens, utility classes, and animations to ensure consistency and flexibility.

- **Tailwind CSS**: Used for utility classes and responsive design, configured with custom colors and animations.
- **Design Tokens**: Defined in CSS files like `design-tokens.css` for colors, typography, spacing, and more.
- **Component-Specific Styles**: Custom CSS for components to handle specific styling needs.
- **Animations**: Defined in Tailwind configuration and custom CSS for smooth transitions and effects.

## Design Tokens

Design tokens are the foundation of our styling system, providing a single source of truth for design-related values. These are primarily defined in `src/styles/design-tokens.css` and include:

- **Colors**: Primary, secondary, dark, light, and specific colors for different sections (e.g., `hero-bg`, `stats-bg`).
- **Typography**: Font sizes, weights, and line heights for consistent text styling.
- **Spacing**: Padding and margin values for layout consistency.
- **Border Radius**: Values for rounded corners.
- **Transitions**: Timing and easing functions for animations.

**Example Usage**:

```css
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);
  border: none;
}
```

## Tailwind CSS Configuration

Tailwind CSS is configured in `tailwind.config.js` to extend the default theme with custom colors and animations that match our design tokens. This allows for the use of utility classes with our custom design system.

**Example Configuration**:

```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#121F2F',
        secondary: '#00a79d',
        // Additional custom colors
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-in-out',
        // Additional animations
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Additional keyframes
      },
    },
  },
  plugins: [],
};
```

## Component Styling

Components in the Vonoy application often combine Tailwind utility classes with custom CSS for specific needs. For example, the `Button` component uses a mix of base styles and variant-specific styles.

**Example: Button Component**

```jsx
// src/components/ui/Button/Button.jsx
const Button = ({ variant = 'primary', size = 'md', children, ...rest }) => {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    // Additional classes based on props
  ].join(' ');

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};
```

```css
/* src/components/ui/Button/Button.css */
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-normal) var(--transition-timing-default);
  cursor: pointer;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);
  border: none;
}

.btn-primary:hover:not(.btn-disabled) {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

## Animations

Animations are defined both in the Tailwind configuration for reusable effects and in custom CSS for more complex animations. Simple animations like fade-ins or slides are applied via Tailwind classes, while specific component animations are defined in component CSS or global styles.

**Example: FadeIn Component**

```jsx
// src/components/ui/FadeIn/FadeIn.jsx
const FadeIn = ({ children, direction = 'up', duration = 600, ...rest }) => {
  const animationName =
    direction === 'none'
      ? 'fadeIn'
      : `fadeIn${direction.charAt(0).toUpperCase() + direction.slice(1)}`;
  const { ref, style, isVisible } = useAnimation({
    animation: animationName,
    duration,
    // Additional animation props
  });

  return (
    <div
      ref={ref}
      className={`fade-in fade-in-${direction} ${isVisible ? 'is-visible' : ''}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};
```

## Responsive Design

Responsive design is handled using Tailwind's responsive prefixes. This allows for styles to adapt to different screen sizes easily.

**Example**:

```css
@media (max-width: 767px) {
  :root {
    --navbar-height: 4rem;
  }

  .mobile-menu-container {
    height: calc(100vh - var(--navbar-height));
    overflow-y: auto;
  }
}
```

## Global Styles

Global styles are included in `src/index.css`, which imports Tailwind, resets, design tokens, and utilities. It also defines custom styles for loaders, error fallbacks, and other global elements.

**Key Files**:

- `src/index.css`: Entry point for all styles.
- `src/styles/reset.css`: CSS reset for consistency across browsers.
- `src/styles/design-tokens.css`: Core design tokens.
- `src/styles/utilities.css`: Custom utility classes.

## Best Practices

1. **Use Tailwind First**: Leverage Tailwind utility classes for common styling needs to reduce custom CSS.
2. **Reference Design Tokens**: Always use CSS variables for colors, spacing, and other design values to maintain consistency.
3. **Minimize Custom CSS**: Keep custom CSS focused on component-specific needs that can't be handled by Tailwind.
4. **Keep Animations Simple**: Use predefined animation classes from Tailwind where possible, and only create custom animations when necessary.
5. **Respect User Preferences**: Account for `prefers-reduced-motion` and dark mode preferences in your styles.

## File Structure

The styling-related files are organized as follows:

```
src/
├── styles/
│   ├── reset.css              # CSS reset
│   ├── design-tokens.css      # Design tokens (colors, typography, etc.)
│   └── utilities.css          # Custom utility classes
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   │   ├── Button.jsx     # Button component
│   │   │   └── Button.css     # Button-specific styles
│   │   └── FadeIn/
│   │       ├── FadeIn.jsx     # FadeIn component
│   │       └── FadeIn.css     # FadeIn-specific styles
└── index.css                  # Main CSS file importing all styles
```

This guide ensures that the current styling system is well-documented without altering the existing design. Developers can refer to this guide to understand and maintain the styling approach in the Vonoy application.

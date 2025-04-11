# Vonoy Component Library

This document provides an overview of the Vonoy component library, including usage examples, best practices, and design principles.

## Table of Contents

- [Design System](#design-system)
- [Components](#components)
  - [Button](#button)
  - [Card](#card)
  - [ErrorBoundary](#errorboundary)
  - [FadeIn](#fadein)
  - [SkipLink](#skiplink)
  - [SwipeableView](#swipeableview)
- [Hooks](#hooks)
  - [useAnimation](#useanimation)
  - [useLazyImage](#uselazyimage)
  - [useScroll](#usescroll)
  - [useViewport](#useviewport)
- [Best Practices](#best-practices)

## Design System

The Vonoy design system is built on a set of design tokens that define colors, typography, spacing, and other visual elements. These tokens are defined in `src/styles/design-tokens.css` and can be accessed via CSS variables.

### Colors

```css
--color-primary: #00a79d;
--color-secondary: #121F2F;
--color-accent: #ff6b35;
```

### Typography

```css
--font-family-heading: 'Satoshi', sans-serif;
--font-family-body: 'Inter', sans-serif;
--font-size-md: 1rem;      /* 16px */
--font-weight-medium: 500;
```

### Spacing

```css
--space-4: 1rem;     /* 16px */
--space-8: 2rem;     /* 32px */
```

## Components

### Button

A versatile button component that supports different variants, sizes, and states.

#### Usage

```jsx
import Button from '@components/ui/Button';

// Primary button
<Button onClick={handleClick}>Click me</Button>

// Secondary button
<Button variant="secondary" size="lg">Large Button</Button>

// Outline button with icon
<Button 
  variant="outline" 
  leftIcon={<Icon name="arrow-left" />}
>
  Back
</Button>

// Loading state
<Button loading>Processing</Button>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link' | 'primary' | Button style variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| fullWidth | boolean | false | Whether the button should take full width |
| disabled | boolean | false | Whether the button is disabled |
| loading | boolean | false | Whether the button is in loading state |
| leftIcon | ReactNode | - | Icon to display on the left |
| rightIcon | ReactNode | - | Icon to display on the right |
| type | 'button' \| 'submit' \| 'reset' | 'button' | Button type attribute |
| className | string | '' | Additional CSS classes |
| onClick | function | - | Click handler |

### Card

A versatile card component that can be used to display content in a contained format.

#### Usage

```jsx
import Card from '@components/ui/Card';

// Basic card
<Card>
  <Card.Body>
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
  </Card.Body>
</Card>

// Card with header and footer
<Card variant="elevated">
  <Card.Header>
    <h3>Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here.</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>

// Interactive card with image
<Card 
  variant="interactive" 
  hoverable 
  onClick={handleCardClick}
>
  <Card.Image 
    src="/image.jpg" 
    alt="Card image" 
  />
  <Card.Body>
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
  </Card.Body>
</Card>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'elevated' \| 'outlined' \| 'interactive' | 'default' | Card style variant |
| hoverable | boolean | false | Whether the card should have hover effects |
| className | string | '' | Additional CSS classes |
| onClick | function | - | Click handler (makes the card interactive) |

### ErrorBoundary

A component that catches JavaScript errors anywhere in its child component tree, logs those errors, and displays a fallback UI.

#### Usage

```jsx
import ErrorBoundary from '@components/ui/ErrorBoundary';

// Basic usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary
  fallback={<CustomErrorComponent />}
  onError={(error) => logError(error)}
  onReset={() => resetState()}
>
  <MyComponent />
</ErrorBoundary>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Child components |
| fallback | ReactNode \| function | - | Custom fallback UI |
| onError | function | - | Error callback |
| onReset | function | - | Reset callback |

### FadeIn

A component that fades in its children when they enter the viewport.

#### Usage

```jsx
import FadeIn from '@components/ui/FadeIn';

// Basic fade in
<FadeIn>
  <p>This content will fade in when it enters the viewport.</p>
</FadeIn>

// Fade in from left with delay
<FadeIn 
  direction="left" 
  delay={300} 
  duration={800}
>
  <p>This content will fade in from the left with a delay.</p>
</FadeIn>

// Staggered fade in for list items
<ul>
  {items.map((item, index) => (
    <FadeIn 
      key={item.id} 
      delay={index * 100} 
      direction="up"
    >
      <li>{item.name}</li>
    </FadeIn>
  ))}
</ul>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| direction | 'up' \| 'down' \| 'left' \| 'right' \| 'none' | 'up' | Direction to fade from |
| duration | number | 600 | Animation duration in ms |
| delay | number | 0 | Animation delay in ms |
| timing | string | 'ease-out' | Animation timing function |
| className | string | '' | Additional CSS classes |
| rootMargin | string | '0px' | Root margin for IntersectionObserver |
| threshold | number | 0.1 | Threshold for IntersectionObserver |
| as | string | 'div' | HTML element to render |

### SkipLink

A component that allows keyboard users to skip to the main content, improving accessibility.

#### Usage

```jsx
import SkipLink from '@components/ui/SkipLink';

// Basic usage
<SkipLink />

// Custom target and label
<SkipLink 
  targetId="content" 
  label="Skip to content" 
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| targetId | string | 'main' | ID of the element to skip to |
| label | string | 'Skip to main content' | Text for the skip link |
| className | string | '' | Additional CSS classes |

### SwipeableView

A component that enables swipe gestures for mobile interactions.

#### Usage

```jsx
import SwipeableView from '@components/ui/SwipeableView';

// Basic usage
<SwipeableView
  onSwipeLeft={() => handleNext()}
  onSwipeRight={() => handlePrevious()}
>
  <div>Swipeable content</div>
</SwipeableView>

// With all swipe directions
<SwipeableView
  onSwipeLeft={() => console.log('Swiped left')}
  onSwipeRight={() => console.log('Swiped right')}
  onSwipeUp={() => console.log('Swiped up')}
  onSwipeDown={() => console.log('Swiped down')}
  threshold={75}
  preventScrollOnSwipe
>
  <div>Swipeable content</div>
</SwipeableView>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onSwipeLeft | function | - | Callback for left swipe |
| onSwipeRight | function | - | Callback for right swipe |
| onSwipeUp | function | - | Callback for up swipe |
| onSwipeDown | function | - | Callback for down swipe |
| threshold | number | 50 | Minimum distance to trigger swipe |
| preventScrollOnSwipe | boolean | false | Whether to prevent scrolling during swipe |
| className | string | '' | Additional CSS classes |

## Hooks

### useAnimation

A custom hook for managing animations.

#### Usage

```jsx
import useAnimation from '@hooks/useAnimation';

function AnimatedComponent() {
  const { ref, style, play, pause, reset } = useAnimation({
    animation: 'fadeIn',
    duration: 500,
    delay: 200,
    autoPlay: false,
  });

  return (
    <div>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
      
      <div ref={ref} style={style}>
        This content will animate.
      </div>
    </div>
  );
}
```

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| animation | string | 'fadeIn' | Animation name |
| duration | number | 300 | Animation duration in ms |
| delay | number | 0 | Animation delay in ms |
| timing | string | 'ease' | Animation timing function |
| infinite | boolean | false | Whether the animation should loop |
| autoPlay | boolean | true | Whether to play the animation automatically |
| observeIntersection | boolean | false | Whether to play animation when element enters viewport |
| rootMargin | string | '0px' | Root margin for IntersectionObserver |
| threshold | number | 0.1 | Threshold for IntersectionObserver |

### useLazyImage

A custom hook for lazy loading images with IntersectionObserver.

#### Usage

```jsx
import useLazyImage from '@hooks/useLazyImage';

function LazyImage({ src, alt, placeholder }) {
  const { isLoaded, currentSrc, imageRef } = useLazyImage(
    src,
    placeholder
  );

  return (
    <div ref={imageRef} className="image-container">
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={isLoaded ? 'loaded' : 'loading'}
        />
      )}
      {!isLoaded && <div className="placeholder">Loading...</div>}
    </div>
  );
}
```

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| src | string | - | The image source URL |
| placeholderSrc | string | '' | Optional placeholder image to show while loading |
| options.rootMargin | string | '200px' | Margin around the root |
| options.threshold | number | 0.1 | Threshold of intersection |

### useScroll

A custom hook for tracking scroll position and direction.

#### Usage

```jsx
import useScroll from '@hooks/useScroll';

function ScrollAwareComponent() {
  const { 
    y, 
    direction, 
    isAtTop, 
    isAtBottom,
    scrollToTop 
  } = useScroll();

  return (
    <div>
      <p>Scroll position: {y}px</p>
      <p>Scroll direction: {direction.y}</p>
      {!isAtTop && (
        <button onClick={scrollToTop}>
          Back to top
        </button>
      )}
    </div>
  );
}
```

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| threshold | number | 50 | Minimum scroll difference to trigger direction change |
| throttleMs | number | 100 | Throttle time in milliseconds |

### useViewport

A custom hook for responsive design that tracks viewport size.

#### Usage

```jsx
import useViewport from '@hooks/useViewport';

function ResponsiveComponent() {
  const { 
    width, 
    height, 
    isMobile, 
    isTablet, 
    isDesktop,
    isMin 
  } = useViewport();

  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
      
      {isMin('lg') && (
        <div>Only visible on large screens and up</div>
      )}
    </div>
  );
}
```

## Best Practices

### Accessibility

- Always provide alternative text for images
- Ensure sufficient color contrast (WCAG AA minimum)
- Support keyboard navigation
- Use semantic HTML elements
- Include ARIA attributes when necessary
- Test with screen readers

### Performance

- Lazy load images and components below the fold
- Use code splitting to reduce initial bundle size
- Optimize animations for 60fps
- Minimize layout shifts
- Implement proper caching strategies

### Responsive Design

- Use mobile-first approach
- Test on various device sizes
- Ensure touch targets are at least 44x44px
- Optimize for different pixel densities
- Consider reduced motion preferences

### Component Design

- Keep components focused on a single responsibility
- Use composition over inheritance
- Provide sensible defaults
- Document props and usage examples
- Write unit tests for components

import React, { useState } from 'react';
import styles from './AnimationDemo.module.css';
import MotionGroup from './MotionGroup';
import MotionTransition from './MotionTransition';
import { motion } from 'framer-motion';

/**
 * AnimationDemo Component
 *
 * A demo component showcasing various animations using Framer Motion
 */
const AnimationDemo: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState('fadeIn');
  const [selectedExitAnimation, setSelectedExitAnimation] = useState('fadeOut');
  const [groupAnimationIn, setGroupAnimationIn] = useState('fadeInUp');
  const [groupAnimationOut, setGroupAnimationOut] = useState('fadeOutDown');
  const [staggerDelay, setStaggerDelay] = useState(100);

  // Animation groups and their animations
  const animationOptions = {
    Attention: [
      'bounce',
      'flash',
      'pulse',
      'rubberBand',
      'shakeX',
      'shakeY',
      'headShake',
      'swing',
      'tada',
      'wobble',
      'jello',
      'heartBeat',
    ],
    Entering: [
      'backInDown',
      'backInLeft',
      'backInRight',
      'backInUp',
      'bounceIn',
      'bounceInDown',
      'bounceInLeft',
      'bounceInRight',
      'bounceInUp',
      'fadeIn',
      'fadeInDown',
      'fadeInLeft',
      'fadeInRight',
      'fadeInUp',
      'flipInX',
      'flipInY',
      'lightSpeedInRight',
      'lightSpeedInLeft',
      'rotateIn',
      'rotateInDownLeft',
      'rotateInDownRight',
      'rotateInUpLeft',
      'rotateInUpRight',
      'jackInTheBox',
      'rollIn',
      'zoomIn',
      'zoomInDown',
      'zoomInLeft',
      'zoomInRight',
      'zoomInUp',
      'slideInDown',
      'slideInLeft',
      'slideInRight',
      'slideInUp',
    ],
    Exiting: [
      'backOutDown',
      'backOutLeft',
      'backOutRight',
      'backOutUp',
      'bounceOut',
      'bounceOutDown',
      'bounceOutLeft',
      'bounceOutRight',
      'bounceOutUp',
      'fadeOut',
      'fadeOutDown',
      'fadeOutLeft',
      'fadeOutRight',
      'fadeOutUp',
      'flipOutX',
      'flipOutY',
      'lightSpeedOutRight',
      'lightSpeedOutLeft',
      'rotateOut',
      'rotateOutDownLeft',
      'rotateOutDownRight',
      'rotateOutUpLeft',
      'rotateOutUpRight',
      'hinge',
      'rollOut',
      'zoomOut',
      'zoomOutDown',
      'zoomOutLeft',
      'zoomOutRight',
      'zoomOutUp',
      'slideOutDown',
      'slideOutLeft',
      'slideOutRight',
      'slideOutUp',
    ],
  };

  // Create a set of card items for the group transition demo
  const cardItems = [
    { title: 'Card 1', content: 'This is the first card in the group.' },
    { title: 'Card 2', content: 'This is the second card in the group.' },
    { title: 'Card 3', content: 'This is the third card in the group.' },
    { title: 'Card 4', content: 'This is the fourth card in the group.' },
    { title: 'Card 5', content: 'This is the fifth card in the group.' },
    { title: 'Card 6', content: 'This is the sixth card in the group.' },
  ];

  const handleToggle = () => {
    setShowContent(!showContent);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Animation Demos with Framer Motion</h1>

      <section className="mb-12">
        <h2 className={styles.sectionHeading}>1. Basic Transitions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={styles.label}>Enter Animation</label>
            <select
              className={styles.select}
              value={selectedAnimation}
              onChange={(e) => setSelectedAnimation(e.target.value)}
            >
              {Object.entries(animationOptions).map(([group, animations]) => (
                <optgroup label={group} key={group}>
                  {animations.map(
                    (animation) =>
                      group !== 'Exiting' && (
                        <option key={animation} value={animation}>
                          {animation}
                        </option>
                      )
                  )}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className={styles.label}>Exit Animation</label>
            <select
              className={styles.select}
              value={selectedExitAnimation}
              onChange={(e) => setSelectedExitAnimation(e.target.value)}
            >
              {Object.entries(animationOptions).map(([group, animations]) => (
                <optgroup label={group} key={group}>
                  {animations.map(
                    (animation) =>
                      group !== 'Entering' && (
                        <option key={animation} value={animation}>
                          {animation}
                        </option>
                      )
                  )}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <button className={styles.button} onClick={handleToggle} style={{ marginBottom: '1.5rem' }}>
          {showContent ? 'Hide Content' : 'Show Content'}
        </button>

        <div className="border rounded p-4 min-h-[200px] flex items-center justify-center">
          <MotionTransition
            in={showContent}
            duration={1}
            animationType="fadeInUp"
          >
            <div className={styles.card}>
              <h2 className="text-xl font-semibold mb-3">Animated Content</h2>
              <p className="text-gray-700">
                This content block is using the{' '}
                <strong>fadeInUp</strong> animation
                from Framer Motion, with smooth transitions.
              </p>
            </div>
          </MotionTransition>
        </div>
      </section>

      <section className="mb-12">
        <h2 className={styles.sectionHeading}>2. Group Transitions with Staggered Animation</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className={styles.label}>Enter Animation</label>
            <select
              className={styles.select}
              value={groupAnimationIn}
              onChange={(e) => setGroupAnimationIn(e.target.value)}
            >
              {Object.entries(animationOptions).map(([group, animations]) => (
                <optgroup label={group} key={group}>
                  {animations.map(
                    (animation) =>
                      group !== 'Exiting' && (
                        <option key={animation} value={animation}>
                          {animation}
                        </option>
                      )
                  )}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className={styles.label}>Exit Animation</label>
            <select
              className={styles.select}
              value={groupAnimationOut}
              onChange={(e) => setGroupAnimationOut(e.target.value)}
            >
              {Object.entries(animationOptions).map(([group, animations]) => (
                <optgroup label={group} key={group}>
                  {animations.map(
                    (animation) =>
                      group !== 'Entering' && (
                        <option key={animation} value={animation}>
                          {animation}
                        </option>
                      )
                  )}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className={styles.label}>Stagger Delay (ms)</label>
            <input
              type="range"
              min="0"
              max="500"
              step="50"
              value={staggerDelay}
              onChange={(e) => setStaggerDelay(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center">{staggerDelay}ms</div>
          </div>
        </div>

        <div className="mt-4 mb-8">
          <p className="text-gray-700 mb-2">
            This example demonstrates staggered animations for a group of items. Click individual
            cards to toggle them or use the button to toggle all.
          </p>
        </div>

        <MotionGroup
          className="mt-4"
          animationIn="fadeInUp"
          staggerDelay={staggerDelay / 1000}
          duration={0.8}
        >
          {cardItems.map((card, index) => (
            <div key={index} className={styles.card}>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-700">{card.content}</p>
              <div className="mt-3 text-sm text-gray-500">Click to toggle</div>
            </div>
          ))}
        </MotionGroup>
      </section>

      <section className="mt-8">
        <h2 className={styles.sectionHeading}>How to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Basic Transition</h3>
            <pre className={styles.codeBlock}>
              {`import MotionTransition from './MotionTransition';

// In your component
const [isVisible, setIsVisible] = useState(false);

return (
  <MotionTransition
    in={isVisible}
    duration={1}
    animationType="fadeInUp"
  >
    <div>Your content here</div>
  </MotionTransition>
);`}
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Group Transition</h3>
            <pre className={styles.codeBlock}>
              {`import MotionGroup from './MotionGroup';

// In your component
return (
  <MotionGroup
    animationIn="fadeInUp"
    staggerDelay={${staggerDelay / 1000}}
    duration={0.8}
  >
    {itemsArray.map(item => (
      <div key={item.id}>
        {item.content}
      </div>
    ))}
  </MotionGroup>
);`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimationDemo;

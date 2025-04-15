import 'animate.css';
import React, { useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface GroupTransitionProps {
  children: React.ReactNode[];
  className?: string;
  animationIn?: string;
  animationOut?: string;
  staggerDelay?: number;
  duration?: number;
}

/**
 * GroupTransition Component
 *
 * A component that animates a group of child elements with staggered timing
 * Uses react-transition-group and animate.css for animations
 *
 * @param {React.ReactNode[]} children - Array of child elements to animate
 * @param {string} className - Optional CSS class for the container
 * @param {string} animationIn - animate.css class for entering (default: 'fadeInUp')
 * @param {string} animationOut - animate.css class for exiting (default: 'fadeOutDown')
 * @param {number} staggerDelay - Delay between each child animation in ms (default: 100)
 * @param {number} duration - Duration of each animation in ms (default: 500)
 */
const GroupTransition: React.FC<GroupTransitionProps> = ({
  children,
  className = '',
  animationIn = 'fadeInUp',
  animationOut = 'fadeOutDown',
  staggerDelay = 100,
  duration = 500,
}) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(children.length).fill(true));

  // Create an array of refs for each child
  const nodeRefs = useRef(
    Array(children.length)
      .fill(null)
      .map(() => React.createRef<HTMLDivElement>())
  );

  // Function to toggle visibility of all items
  const toggleAll = () => {
    const allVisible = visibleItems.every((item) => item);
    setVisibleItems(Array(children.length).fill(!allVisible));
  };

  // Function to toggle visibility of a specific item
  const toggleItem = (index: number) => {
    setVisibleItems((prev) => {
      const newItems = [...prev];
      newItems[index] = !newItems[index];
      return newItems;
    });
  };

  return (
    <div className={className}>
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={toggleAll}
        >
          {visibleItems.every((item) => item) ? 'Hide All' : 'Show All'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {children.map((child, index) => (
          <div key={index} onClick={() => toggleItem(index)}>
            <TransitionGroup component={null}>
              {visibleItems[index] && (
                <CSSTransition
                  nodeRef={nodeRefs.current[index]}
                  timeout={duration}
                  classNames={{
                    enter: 'animate__animated',
                    enterActive: `animate__${animationIn}`,
                    exit: 'animate__animated',
                    exitActive: `animate__${animationOut}`,
                  }}
                  style={{
                    animationDelay: `${index * staggerDelay}ms`,
                    animationDuration: `${duration}ms`,
                  }}
                >
                  <div ref={nodeRefs.current[index]}>{child}</div>
                </CSSTransition>
              )}
            </TransitionGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupTransition;

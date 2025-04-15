import 'animate.css';
import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

// Define props for the TransitionComponent
interface TransitionComponentProps {
  in: boolean;
  timeout?: number;
  classNames?: string; // Optional custom classNames for transitions
  animationIn?: string; // animate.css class for entering
  animationOut?: string; // animate.css class for exiting
  children: React.ReactNode;
  unmountOnExit?: boolean;
  mountOnEnter?: boolean;
  onExited?: () => void;
  onEntered?: () => void;
}

/**
 * TransitionComponent
 *
 * A component that wraps react-transition-group's CSSTransition with animate.css animations
 *
 * @param {boolean} in - Whether the component should be shown
 * @param {number} timeout - Transition duration in ms
 * @param {string} classNames - Custom transition class names
 * @param {string} animationIn - The animate.css class to use for entering (default: 'fadeIn')
 * @param {string} animationOut - The animate.css class to use for exiting (default: 'fadeOut')
 * @param {React.ReactNode} children - Child component(s) to animate
 * @param {boolean} unmountOnExit - Whether to unmount the component on exit
 * @param {boolean} mountOnEnter - Whether to mount the component on enter
 * @param {Function} onExited - Callback fired after the exit transition finishes
 * @param {Function} onEntered - Callback fired after the enter transition finishes
 */
const TransitionComponent: React.FC<TransitionComponentProps> = ({
  in: inProp,
  timeout = 300,
  classNames,
  animationIn = 'fadeIn',
  animationOut = 'fadeOut',
  children,
  unmountOnExit = true,
  mountOnEnter = true,
  onExited,
  onEntered,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  // If custom classNames are provided, use them
  // Otherwise, use the animate.css classes
  const transitionClassNames = classNames
    ? { classNames }
    : {
        enterActive: `animate__animated animate__${animationIn}`,
        exitActive: `animate__animated animate__${animationOut}`,
      };

  return (
    <CSSTransition
      in={inProp}
      timeout={timeout}
      {...transitionClassNames}
      nodeRef={nodeRef}
      unmountOnExit={unmountOnExit}
      mountOnEnter={mountOnEnter}
      onExited={onExited}
      onEntered={onEntered}
    >
      <div ref={nodeRef}>{children}</div>
    </CSSTransition>
  );
};

export default TransitionComponent;

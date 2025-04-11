import React from 'react';
import PropTypes from 'prop-types';
import './SkipLink.css';

/**
 * SkipLink Component
 * 
 * A component that allows keyboard users to skip to the main content,
 * improving accessibility for keyboard and screen reader users.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.targetId='main'] - ID of the element to skip to
 * @param {string} [props.label='Skip to main content'] - Text for the skip link
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element}
 */
const SkipLink = ({
  targetId = 'main',
  label = 'Skip to main content',
  className = '',
  ...rest
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Set tabindex to make the element focusable
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus();
      
      // Remove tabindex after blur
      targetElement.addEventListener('blur', () => {
        targetElement.removeAttribute('tabindex');
      }, { once: true });
    } else {
      console.warn(`SkipLink: Target element with id "${targetId}" not found.`);
    }
  };

  return (
    <a
      href={`#${targetId}`}
      className={`skip-link ${className}`.trim()}
      onClick={handleClick}
      {...rest}
    >
      {label}
    </a>
  );
};

SkipLink.propTypes = {
  targetId: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default SkipLink;

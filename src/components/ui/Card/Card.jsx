import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

/**
 * Card Component
 * 
 * A versatile card component that can be used to display content in a contained format.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='default'] - Card variant (default, elevated, outlined, interactive)
 * @param {boolean} [props.hoverable=false] - Whether the card should have hover effects
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Card content
 * @param {Function} [props.onClick] - Click handler (makes the card interactive)
 * @returns {JSX.Element}
 */
const Card = ({
  variant = 'default',
  hoverable = false,
  className = '',
  children,
  onClick,
  ...rest
}) => {
  // Determine if the card is interactive
  const isInteractive = !!onClick;
  
  // Combine all classes
  const cardClasses = [
    'card',
    `card-${variant}`,
    hoverable ? 'card-hoverable' : '',
    isInteractive ? 'card-interactive' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * Card.Header Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Header content
 * @returns {JSX.Element}
 */
const CardHeader = ({ className = '', children, ...rest }) => {
  const headerClasses = ['card-header', className].filter(Boolean).join(' ');
  
  return (
    <div className={headerClasses} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card.Body Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Body content
 * @returns {JSX.Element}
 */
const CardBody = ({ className = '', children, ...rest }) => {
  const bodyClasses = ['card-body', className].filter(Boolean).join(' ');
  
  return (
    <div className={bodyClasses} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card.Footer Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Footer content
 * @returns {JSX.Element}
 */
const CardFooter = ({ className = '', children, ...rest }) => {
  const footerClasses = ['card-footer', className].filter(Boolean).join(' ');
  
  return (
    <div className={footerClasses} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card.Image Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source
 * @param {string} props.alt - Image alt text
 * @param {string} [props.position='top'] - Image position (top, bottom)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element}
 */
const CardImage = ({ src, alt, position = 'top', className = '', ...rest }) => {
  const imageClasses = [
    'card-image',
    `card-image-${position}`,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={imageClasses}>
      <img src={src} alt={alt} {...rest} />
    </div>
  );
};

// Assign sub-components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;

// PropTypes
Card.propTypes = {
  variant: PropTypes.oneOf(['default', 'elevated', 'outlined', 'interactive']),
  hoverable: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

CardHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CardBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CardFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom']),
  className: PropTypes.string,
};

export default Card;

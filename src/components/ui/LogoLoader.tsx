import React, { useEffect, useState } from "react";

/**
 * LogoLoader Component
 *
 * A modern, high-end loading animation based on the Vonoy logo SVG.
 * This component extracts the key elements from the logo and animates them
 * to create a visually appealing loading indicator that matches the brand identity.
 *
 * Features:
 * - Modern animation with glow effects
 * - Responsive design
 * - Dark mode support
 * - Accessibility improvements
 *
 * @returns {JSX.Element} The rendered loading animation
 */
const LogoLoader: React.FC = () => {
  const [loadingText, setLoadingText] = useState("Initializing");

  // Cycle through different loading messages for a more engaging experience
  useEffect(() => {
    const messages = ["Initializing", "Loading", "Preparing", "Almost ready"];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      setLoadingText(messages[currentIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="logo-loader-container" role="status" aria-label="Loading content">
      <svg
        className="logo-loader"
        viewBox="0 0 60 60"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Animated hexagon shape from logo */}
        <g className="logo-loader-icon">
          {/* Green triangular elements */}
          <path
            className="logo-part logo-part-1"
            d="M30.48,51.55v-14.52c0-1.32,1.69-1.82,2.39-.71l7.77,12.37,5.82,9.26-5.58,1.67h0l-9.84-6.99c-.35-.24-.55-.65-.55-1.08Z"
          />
          <path
            className="logo-part logo-part-2"
            d="M36.2,26.69l12.61-8.17,8.99-5.82c.74,1.58,1.35,3.3,1.83,5.16l-7.37,10.7c-.24.35-.63.56-1.05.56h-14.3c-1.29,0-1.78-1.72-.7-2.43Z"
          />
          <path
            className="logo-part logo-part-3"
            d="M13.12,1.64c1.72-.73,3.58-1.28,5.59-1.64l9.86,7c.35.25.55.65.55,1.08v14.53c0,1.31-1.69,1.81-2.39.7l-7.78-12.39L13.12,1.64Z"
          />
          <path
            className="logo-part logo-part-4"
            d="M30.49,22.6l.02-12.59v-1.94c0-.43.2-.83.55-1.07L40.94,0l5.58,1.65-5.82,9.25-7.81,12.4c-.7,1.11-2.39.6-2.39-.71Z"
          />
          <path
            className="logo-part logo-part-5"
            d="M36.9,30.52l13.58.02h.71c.43,0,.82.21,1.06.56l7.31,10.65c-.5,1.87-1.11,3.59-1.87,5.18l-8.97-5.83-12.52-8.14c-1.09-.71-.59-2.42.7-2.42Z"
          />
          <path
            className="logo-part logo-part-6"
            d="M13.1,57.93l5.82-9.24,7.79-12.36c.7-1.11,2.39-.6,2.39.7l-.02,12.59v1.94c0,.43-.2.83-.55,1.08l-9.86,6.98h0l-5.57-1.68Z"
          />

          {/* White elements for contrast */}
          <path
            className="logo-part logo-part-white"
            d="M10.88,18.55c1.54-3.95,4.18-6.43,8.06-7.63L13.12,1.64C8.05,3.78,4.25,7.44,1.83,12.66l9.05,5.89ZM46.52,1.66,48.8,18.52l8.99-5.82c-2.42-5.23-6.22-8.9-11.27-11.04l-5.82,9.25c3.91,1.2,6.57,3.67,8.11,7.61ZM13.1,57.93,13.1,57.93l5.82-9.24c-3.85-1.22-6.48-3.72-8.02-7.65l-9.02,5.85c2.43,5.21,6.21,8.89,11.22,11.04ZM46.46,57.95c5.02-2.16,8.81-5.83,11.24-11.03l-8.97-5.83c-1.57,3.92-4.21,6.39-8.08,7.6l5.82,9.26Z"
            opacity="0.7"
          />
        </g>
      </svg>
      <div className="logo-loader-text">{loadingText}</div>
    </div>
  );
};

export default LogoLoader;

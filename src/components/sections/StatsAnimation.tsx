import React, { useEffect } from "react";

/**
 * StatsAnimation Component
 *
 * An animated light bulb with connected wires that illuminate progressively,
 * creating a high-end visual effect for the Stats section.
 */
const StatsAnimation: React.FC = () => {
  // Add animation styles directly to the document head
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement('style');
    styleEl.id = 'bulb-animation-styles';

    // Define all the animations
    styleEl.innerHTML = `
      @keyframes bulbFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(-2deg); }
        50% { transform: translateY(0) rotate(0deg); }
        75% { transform: translateY(-10px) rotate(2deg); }
      }

      @keyframes glowPulse {
        0% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
      }

      @keyframes rotateRays {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }

      @keyframes flickerFilament {
        0% { opacity: 0.7; }
        100% { opacity: 1; }
      }

      @keyframes pulsePath {
        0% { opacity: 0.7; box-shadow: 0 0 10px rgba(61, 213, 152, 0.5); }
        100% { opacity: 1; box-shadow: 0 0 20px rgba(61, 213, 152, 0.9); }
      }

      @keyframes nodePulse {
        0% { transform: scale(1); box-shadow: 0 0 15px rgba(61, 213, 152, 0.8); }
        100% { transform: scale(1.2); box-shadow: 0 0 20px rgba(61, 213, 152, 1); }
      }

      .bulb-container {
        position: relative;
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }

      .light-bulb {
        position: relative;
        z-index: 5;
        animation: bulbFloat 4s ease-in-out infinite;
      }

      .glow {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(61, 213, 152, 0.6) 0%, rgba(61, 213, 152, 0.2) 50%, rgba(61, 213, 152, 0) 70%);
        box-shadow: 0 0 30px rgba(61, 213, 152, 0.5);
        animation: glowPulse 3s infinite alternate;
        z-index: -1;
      }

      .rays {
        position: absolute;
        top: 45%;
        left: 50%;
        width: 150px;
        height: 150px;
        transform: translate(-50%, -50%);
        z-index: -2;
        opacity: 0.7;
        background-image: repeating-conic-gradient(
          transparent 0deg,
          transparent 9deg,
          rgba(61, 213, 152, 0.15) 10deg,
          transparent 11deg,
          transparent 19deg,
          rgba(61, 213, 152, 0.1) 20deg
        );
        animation: rotateRays 15s linear infinite;
        box-shadow: 0 0 30px rgba(61, 213, 152, 0.2);
      }

      .filament {
        opacity: 1;
        animation: flickerFilament 0.5s ease-in-out infinite alternate;
      }

      .circuit-path {
        position: absolute;
        background-color: rgba(61, 213, 152, 0.8);
        box-shadow: 0 0 15px rgba(61, 213, 152, 0.7);
        animation: pulsePath 2s infinite alternate;
      }

      .path-top {
        top: 0;
        left: 50%;
        width: 3px;
        height: 70px;
        transform: translateX(-50%);
      }

      .path-right {
        top: 50%;
        right: 0;
        width: 70px;
        height: 3px;
        transform: translateY(-50%);
        animation-delay: 0.5s;
      }

      .path-bottom {
        bottom: 0;
        left: 50%;
        width: 3px;
        height: 70px;
        transform: translateX(-50%);
        animation-delay: 1s;
      }

      .path-left {
        top: 50%;
        left: 0;
        width: 70px;
        height: 3px;
        transform: translateY(-50%);
        animation-delay: 1.5s;
      }

      .circuit-node {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: rgba(61, 213, 152, 1);
        border-radius: 50%;
        box-shadow: 0 0 15px rgba(61, 213, 152, 0.8), 0 0 5px rgba(255, 255, 255, 0.8) inset;
        animation: nodePulse 2s infinite alternate;
        z-index: 2;
      }

      .node-top-left {
        top: 0;
        left: 0;
      }

      .node-top-right {
        top: 0;
        right: 0;
        animation-delay: 0.5s;
      }

      .node-bottom-left {
        bottom: 0;
        left: 0;
        animation-delay: 1s;
      }

      .node-bottom-right {
        bottom: 0;
        right: 0;
        animation-delay: 1.5s;
      }
    `;

    // Add the style element to the document head
    document.head.appendChild(styleEl);

    // Clean up on component unmount
    return () => {
      const existingStyle = document.getElementById('bulb-animation-styles');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  return (
    <div className="bulb-container">
      {/* Circuit container with dynamic connections */}
      <div style={{ position: 'absolute', width: '260px', height: '260px', zIndex: 1 }}>
        {/* Main circuit paths */}
        <div className="circuit-path path-top"></div>
        <div className="circuit-path path-right"></div>
        <div className="circuit-path path-bottom"></div>
        <div className="circuit-path path-left"></div>

        {/* Connection nodes with pulsing effect */}
        <div className="circuit-node node-top-left"></div>
        <div className="circuit-node node-top-right"></div>
        <div className="circuit-node node-bottom-left"></div>
        <div className="circuit-node node-bottom-right"></div>
      </div>

      {/* Premium high-tech light bulb */}
      <div className="light-bulb">
        {/* Glow effect */}
        <div className="glow"></div>

        {/* Rays effect */}
        <div className="rays"></div>

        {/* Main bulb SVG with enhanced design */}
        <svg
          width="90"
          height="130"
          viewBox="0 0 90 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 0 15px rgba(61, 213, 152, 0.7))' }}
        >
          {/* Define gradients */}
          <defs>
            <linearGradient id="bulbGradient" x1="25" y1="15" x2="65" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#4eebc0" />
              <stop offset="1" stopColor="#2bb78f" />
            </linearGradient>

            <radialGradient id="bulbFill" cx="45" cy="45" r="30" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#4eebc0" stopOpacity="0.3" />
              <stop offset="1" stopColor="#2bb78f" stopOpacity="0.05" />
            </radialGradient>

            <linearGradient id="baseGradient" x1="32" y1="81" x2="58" y2="97" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#4eebc0" />
              <stop offset="1" stopColor="#2bb78f" />
            </linearGradient>

            <linearGradient id="filamentGradient" x1="40" y1="50" x2="50" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffcc80" />
              <stop offset="1" stopColor="#ff9100" />
            </linearGradient>
          </defs>

          {/* Premium glass bulb with gradient */}
          <path
            d="M65 45C65 62 50 75 45 85C40 75 25 62 25 45C25 28 33.5 15 45 15C56.5 15 65 28 65 45Z"
            stroke="url(#bulbGradient)"
            strokeWidth="2"
            fill="url(#bulbFill)"
          />

          {/* Metallic base with premium finish */}
          <path
            d="M55 90H35C33.3 90 32 88.7 32 87V84C32 82.3 33.3 81 35 81H55C56.7 81 58 82.3 58 84V87C58 88.7 56.7 90 55 90Z"
            fill="url(#baseGradient)"
          />
          <path
            d="M52 97H38C36.3 97 35 95.7 35 94V90C35 88.3 36.3 87 38 87H52C53.7 87 55 88.3 55 90V94C55 95.7 53.7 97 52 97Z"
            fill="url(#baseGradient)"
          />

          {/* Advanced filament design */}
          <path
            d="M45 50C45 50 40 55 45 65C50 75 45 70 45 70"
            stroke="url(#filamentGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="filament"
          />
          <path
            d="M45 50C45 50 50 55 45 65C40 75 45 70 45 70"
            stroke="url(#filamentGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="filament"
          />

          {/* Reflective highlights */}
          <path
            d="M35 40C35 40 40 35 45 40C50 45 55 40 55 40"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default StatsAnimation;

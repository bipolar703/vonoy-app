import React, { useRef } from 'react';

/**
 * HeroAnimation Component
 *
 * Creates a modern, dynamic canvas-based animation for the hero section.
 * Features a network of flowing particles with dynamic connections.
 * Uses Framer Motion for smoother animations and better performance.
 *
 * Features:
 * - Dynamic particle system with flowing motion
 * - Responsive connections between particles
 * - Subtle color transitions and glow effects
 * - Optimized performance with requestAnimationFrame
 *
 * @returns {JSX.Element} The rendered canvas animation
 */

const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Animation and particles logic removed to stop animation
  // Only render a static canvas, clipped at left and bottom

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{
        willChange: 'transform, opacity',
        filter: 'blur(0.5px)',
        position: 'absolute',
        top: 0,
        left: '-2vw', // clip a bit of the left edge
        width: '102vw', // extend width to allow left clip
        height: '98%', // clip a bit of the bottom edge
        overflow: 'hidden',
        clipPath: 'inset(0px 0px 2vw 2vw)', // further ensure left/bottom clip
      }}
    />
  );
};

export default HeroAnimation;

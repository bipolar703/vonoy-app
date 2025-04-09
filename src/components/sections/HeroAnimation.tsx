import React, { useEffect, useRef } from "react";

/**
 * HeroAnimation Component
 *
 * This component creates an animated grid background with neon colors and glow effects
 * for the hero section. It uses canvas to draw and animate the grid lines.
 *
 * CRITICAL: This animation is carefully calibrated for performance and visual appeal.
 * Modifications should be tested thoroughly to ensure they don't cause performance issues.
 *
 * @returns {JSX.Element} The rendered canvas animation
 */
const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize handler to make canvas responsive
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.8; // 80% of viewport height
    };

    // Initial sizing
    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation variables
    const gridSize = 50;
    const lineWidth = 1;
    const glowStrength = 10;
    const animationSpeed = 0.5;
    let time = 0;

    // Neon colors for the grid lines
    const colors = [
      { r: 0, g: 255, b: 200, a: 0.3 }, // Cyan
      { r: 120, g: 0, b: 255, a: 0.3 }, // Purple
      { r: 0, g: 200, b: 255, a: 0.3 }, // Blue
    ];

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update time
      time += animationSpeed;

      // Draw grid
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
          // Calculate wave offset
          const offsetX = Math.sin(time / 20 + y / 100) * 15;
          const offsetY = Math.cos(time / 20 + x / 100) * 15;

          // Calculate alpha based on position for fading effect
          const distanceFromCenter = Math.sqrt(
            Math.pow((x - canvas.width / 2) / canvas.width, 2) +
              Math.pow((y - canvas.height / 2) / canvas.height, 2)
          );
          const alpha = Math.max(0, 1 - distanceFromCenter * 2);

          // Pick a color based on position
          const colorIndex =
            Math.floor((x + y + time) / gridSize) % colors.length;
          const color = colors[colorIndex];

          // Set line style
          ctx.lineWidth = lineWidth;
          ctx.shadowBlur = glowStrength;
          ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${
            color.a * alpha
          })`;

          // Draw horizontal line
          if (y % (gridSize * 2) === 0) {
            ctx.beginPath();
            ctx.moveTo(x - offsetX, y);
            ctx.lineTo(x + gridSize + offsetX, y);
            ctx.stroke();
          }

          // Draw vertical line
          if (x % (gridSize * 2) === 0) {
            ctx.beginPath();
            ctx.moveTo(x, y - offsetY);
            ctx.lineTo(x, y + gridSize + offsetY);
            ctx.stroke();
          }
        }
      }

      // Continue animation
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};

export default HeroAnimation;

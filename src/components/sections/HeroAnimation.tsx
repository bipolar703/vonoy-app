import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

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

// Define Particle type at module scope
type Particle = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  baseRadius: number;
  color: string;
  vx: number;
  vy: number;
  angle: number;
  speed: number;
  oscillationSpeed: number;
  isGlowing: boolean;
  connections: number[];
  opacity: number;
};



const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controls = useAnimation();
  const particlesRef = useRef<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize particles with enhanced properties
    const initParticles = () => {
      const particles: Particle[] = [];
      const particleCount = 40;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          targetX: Math.random() * canvas.width,
          targetY: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          baseRadius: Math.random() * 2 + 1,
          color: i % 2 === 0 ? '#3dd598' : '#0a6dc2',
          vx: 0,
          vy: 0,
          angle: Math.random() * Math.PI * 2,
          speed: 0.1 + Math.random() * 0.2,
          oscillationSpeed: 0.001 + Math.random() * 0.002,
          isGlowing: Math.random() > 0.8,
          connections: [],
          opacity: 0.4 + Math.random() * 0.4,
        });
      }

      particlesRef.current = particles;
      return particles;
    };

    // Resize handler to make canvas responsive
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7; // 70% of viewport height for more compact design

      // Redraw particles when resizing
      const particles = initParticles();
      return particles;
    };

    // Initial sizing
    const particles = handleResize();
    window.addEventListener('resize', handleResize);

    // Enhanced connection drawing with gradient and flow effect
    const drawConnections = (p1: Particle, p2: Particle, distance: number) => {
      // Calculate opacity based on distance
      const maxDistance = 180;
      const opacity = Math.pow(1 - distance / maxDistance, 2) * 0.5;

      if (opacity > 0.05) {
        // Create gradient for connection
        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);

        // Use particle colors for gradient
        const color1 = p1.color === '#3dd598' ? 'rgba(61, 213, 152, ' : 'rgba(10, 109, 194, ';
        const color2 = p2.color === '#3dd598' ? 'rgba(61, 213, 152, ' : 'rgba(10, 109, 194, ';

        gradient.addColorStop(0, color1 + opacity + ')');
        gradient.addColorStop(1, color2 + opacity + ')');

        // Draw connection line
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.min(p1.radius, p2.radius) * 0.5;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Add connection to particle's connections list if not already there
        if (!p1.connections.includes(particles.indexOf(p2))) {
          p1.connections.push(particles.indexOf(p2));
        }
        if (!p2.connections.includes(particles.indexOf(p1))) {
          p2.connections.push(particles.indexOf(p1));
        }
      }
    };

    // Enhanced animation loop with flow field effect
    const animate = () => {
      // Clear canvas with subtle trail effect for smoother motion
      ctx.fillStyle = 'rgba(6, 4, 31, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update time for flow field
      const time = Date.now() * 0.001;

      // Reset connections
      particles.forEach((p) => (p.connections = []));

      // Update and draw particles
      particles.forEach((p, index) => {
        // Flow field movement - creates more organic motion
        const angle = p.angle + Math.sin(time * p.oscillationSpeed) * Math.PI;

        // Calculate movement toward target with slight randomness
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // If close to target, set new target
        if (dist < 50) {
          p.targetX = Math.random() * canvas.width;
          p.targetY = Math.random() * canvas.height;
        }

        // Update velocity with flow field and target direction
        p.vx = Math.cos(angle) * p.speed * 0.3 + (dx / (dist || 1)) * p.speed * 0.7;
        p.vy = Math.sin(angle) * p.speed * 0.3 + (dy / (dist || 1)) * p.speed * 0.7;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Contain within canvas with soft boundaries
        if (p.x < 0) p.x = 0;
        if (p.x > canvas.width) p.x = canvas.width;
        if (p.y < 0) p.y = 0;
        if (p.y > canvas.height) p.y = canvas.height;

        // Pulse radius for subtle breathing effect
        p.radius = p.baseRadius * (1 + 0.2 * Math.sin(time * 2 + index));

        // Draw particle with glow effect for some particles
        ctx.beginPath();

        if (p.isGlowing) {
          // Add glow effect
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
        }

        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color === '#3dd598'
            ? `rgba(61, 213, 152, ${p.opacity})`
            : `rgba(10, 109, 194, ${p.opacity})`;
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
      });

      // Draw connections after all particles are updated
      particles.forEach((p1, i) => {
        particles.forEach((p2, j) => {
          if (i < j) {
            // Avoid duplicate connections
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 180) {
              // Increased connection distance
              drawConnections(p1, p2, distance);
            }
          }
        });
      });

      // Request next frame
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Fade in canvas when animation starts
    setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      // No need to pause animations with Framer Motion
    };
  }, []);

  // Start animation when component mounts - handled by Framer Motion

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 0.3 : 0 }}
      transition={{
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{
        willChange: 'transform, opacity',
        filter: 'blur(0.5px)', // Subtle blur for softer effect
      }}
    />
  );
};

export default HeroAnimation;

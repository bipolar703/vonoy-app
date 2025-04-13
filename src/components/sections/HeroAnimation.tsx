import React, { useEffect, useRef, useState } from "react";
import anime from 'animejs';
import { createAnimation, createTimeline } from '../../utils/animationSystem';

/**
 * HeroAnimation Component
 *
 * Creates a premium, immersive 3D-like animation for the hero section.
 * Features a network of flowing particles with dynamic connections and depth effects.
 * Uses Anime.js and Framer Motion for smoother animations and better performance.
 *
 * Features:
 * - Dynamic particle system with flowing motion and 3D parallax effect
 * - Responsive connections between particles with depth perception
 * - Premium color transitions and enhanced glow effects
 * - Optimized performance with requestAnimationFrame and GPU acceleration
 * - Subtle depth and parallax effects for a more immersive experience
 *
 * @returns {JSX.Element} The rendered canvas animation
 */
const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<anime.AnimeInstance | null>(null);
  const particlesRef = useRef<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const lastMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Track mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Enhanced particle type with 3D and parallax properties
    type Particle = {
      x: number;
      y: number;
      z: number; // Depth for 3D effect
      targetX: number;
      targetY: number;
      radius: number;
      baseRadius: number;
      color: string;
      vx: number;
      vy: number;
      vz: number; // Z-axis velocity
      angle: number;
      speed: number;
      oscillationSpeed: number;
      isGlowing: boolean;
      pulseIntensity: number; // Controls pulse animation intensity
      connections: number[];
      opacity: number;
      parallaxFactor: number; // How much this particle responds to mouse movement
    };

    // Initialize particles with enhanced 3D properties
    const initParticles = () => {
      const particles: Particle[] = [];
      const particleCount = 60; // More particles for richer 3D effect

      for (let i = 0; i < particleCount; i++) {
        // Create particles with 3D and parallax properties
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 3, // Depth for 3D effect (0-3)
          targetX: Math.random() * canvas.width,
          targetY: Math.random() * canvas.height,
          radius: Math.random() * 2.5 + 1,
          baseRadius: Math.random() * 2.5 + 1,
          color: i % 3 === 0 ? '#3dd598' : (i % 3 === 1 ? '#0a6dc2' : '#ffffff'), // Enhanced color palette
          vx: 0,
          vy: 0,
          vz: 0, // Z-axis velocity
          angle: Math.random() * Math.PI * 2,
          speed: 0.1 + Math.random() * 0.3,
          oscillationSpeed: 0.001 + Math.random() * 0.003,
          isGlowing: Math.random() > 0.7, // More glowing particles
          pulseIntensity: 0.5 + Math.random() * 0.5, // Varied pulse intensity
          connections: [], // Track connections to other particles
          opacity: 0.4 + Math.random() * 0.6,
          parallaxFactor: 0.5 + Math.random() * 1.5 // Different parallax response for each particle
        });
      }

      // Store particles for anime.js animations
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
    window.addEventListener("resize", handleResize);

    // Premium connection drawing with 3D depth effect and enhanced gradients
    const drawConnections = (p1: Particle, p2: Particle, distance: number) => {
      // Calculate opacity based on distance and z-position (depth)
      const maxDistance = 180;
      const depthFactor = (6 - p1.z - p2.z) / 6; // Connections between particles closer to viewer are more visible
      const opacity = Math.pow(1 - distance / maxDistance, 2) * 0.5 * depthFactor;

      if (opacity > 0.03) { // Lower threshold for more connections
        // Create gradient for connection with depth consideration
        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);

        // Enhanced color handling for all possible particle colors
        let color1, color2;

        if (p1.color === '#3dd598') {
          color1 = 'rgba(61, 213, 152, ';
        } else if (p1.color === '#0a6dc2') {
          color1 = 'rgba(10, 109, 194, ';
        } else {
          color1 = 'rgba(255, 255, 255, ';
        }

        if (p2.color === '#3dd598') {
          color2 = 'rgba(61, 213, 152, ';
        } else if (p2.color === '#0a6dc2') {
          color2 = 'rgba(10, 109, 194, ';
        } else {
          color2 = 'rgba(255, 255, 255, ';
        }

        // Add gradient stops with depth-enhanced opacity
        gradient.addColorStop(0, color1 + opacity + ')');
        gradient.addColorStop(1, color2 + opacity + ')');

        // Calculate line width based on particle radius and depth
        const lineWidth = Math.min(p1.radius, p2.radius) * 0.5 * depthFactor;

        // Draw connection line with depth effect
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        // Add subtle glow to connections for premium effect
        if ((p1.isGlowing || p2.isGlowing) && depthFactor > 0.7) {
          ctx.shadowColor = p1.isGlowing ? p1.color : p2.color;
          ctx.shadowBlur = 5 * depthFactor;
        }

        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow

        // Add connection to particle's connections list if not already there
        if (!p1.connections.includes(particles.indexOf(p2))) {
          p1.connections.push(particles.indexOf(p2));
        }
        if (!p2.connections.includes(particles.indexOf(p1))) {
          p2.connections.push(particles.indexOf(p1));
        }
      }
    };

    // Premium animation loop with 3D parallax effect
    const animate = () => {
      // Clear canvas with subtle trail effect for smoother motion
      ctx.fillStyle = 'rgba(6, 4, 31, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update time for flow field
      const time = Date.now() * 0.001;

      // Calculate mouse movement for parallax effect
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const mouseX = mousePosition.current.x - centerX;
      const mouseY = mousePosition.current.y - centerY;

      // Smooth mouse movement for more natural parallax
      lastMousePosition.current.x += (mouseX - lastMousePosition.current.x) * 0.05;
      lastMousePosition.current.y += (mouseY - lastMousePosition.current.y) * 0.05;

      // Reset connections
      particles.forEach(p => p.connections = []);

      // Update and draw particles with 3D effect
      particles.forEach((p, index) => {
        // Flow field movement with 3D oscillation
        const angle = p.angle + Math.sin(time * p.oscillationSpeed) * Math.PI;

        // Apply parallax effect based on mouse position and particle depth
        const parallaxX = lastMousePosition.current.x * 0.01 * p.parallaxFactor * (3 - p.z);
        const parallaxY = lastMousePosition.current.y * 0.01 * p.parallaxFactor * (3 - p.z);

        // Calculate movement toward target with 3D effect
        const dx = p.targetX - p.x + parallaxX;
        const dy = p.targetY - p.y + parallaxY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // If close to target, set new target
        if (dist < 50) {
          p.targetX = Math.random() * canvas.width;
          p.targetY = Math.random() * canvas.height;
          // Occasionally change depth for more dynamic 3D effect
          if (Math.random() > 0.95) {
            p.z = Math.random() * 3;
          }
        }

        // Update velocity with flow field, target direction, and 3D movement
        p.vx = Math.cos(angle) * p.speed * 0.3 + (dx / (dist || 1)) * p.speed * 0.7;
        p.vy = Math.sin(angle) * p.speed * 0.3 + (dy / (dist || 1)) * p.speed * 0.7;
        p.vz = (Math.sin(time * 0.5 + index) * 0.01); // Subtle z-axis movement

        // Update position with 3D effect
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Keep z-value within bounds
        if (p.z < 0) p.z = 0;
        if (p.z > 3) p.z = 3;

        // Contain within canvas with soft boundaries
        if (p.x < 0) p.x = 0;
        if (p.x > canvas.width) p.x = canvas.width;
        if (p.y < 0) p.y = 0;
        if (p.y > canvas.height) p.y = canvas.height;

        // Scale based on z-position (depth) for 3D effect
        const scale = 1 - (p.z / 4); // Particles further away (higher z) appear smaller
        const scaledRadius = p.baseRadius * scale;

        // Pulse radius with custom intensity for premium effect
        p.radius = scaledRadius * (1 + p.pulseIntensity * 0.3 * Math.sin(time * 1.5 + index));

        // Draw particle with enhanced glow effect
        ctx.beginPath();

        if (p.isGlowing) {
          // Add enhanced glow effect based on z-position
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 15 * (1 - p.z / 3); // Closer particles glow more
        }

        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Enhanced color handling with depth-based opacity
        let fillOpacity = p.opacity * (1 - p.z / 4); // Particles further away are more transparent

        if (p.color === '#3dd598') {
          ctx.fillStyle = `rgba(61, 213, 152, ${fillOpacity})`;
        } else if (p.color === '#0a6dc2') {
          ctx.fillStyle = `rgba(10, 109, 194, ${fillOpacity})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${fillOpacity * 0.8})`; // White particles slightly more transparent
        }

        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
      });

      // Draw connections after all particles are updated
      particles.forEach((p1, i) => {
        particles.forEach((p2, j) => {
          if (i < j) { // Avoid duplicate connections
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 180) { // Increased connection distance
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

    // Use enhanced createAnimation for particle animations with proper cleanup
    animationRef.current = createAnimation({
      targets: particlesRef.current,
      opacity: (el: any) => [el.opacity, Math.min(el.opacity + 0.3, 1)],
      radius: (el: any) => [el.baseRadius, el.baseRadius * 1.5],
      easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
      duration: 3000,
      delay: anime.stagger(50),
      loop: true,
      direction: 'alternate',
      update: function(anim) {
        // Fade in canvas when animation starts
        if (anim.progress > 10 && !isVisible) {
          setIsVisible(true);
        }
      }
    });

    // Create a timeline for staggered entrance using enhanced createTimeline
    const animations = [
      {
        targets: canvas,
        properties: {
          opacity: [0, 0.3]
        },
        offset: 0
      }
    ];

    // Create the timeline with proper cleanup
    createTimeline(animations, {
      duration: 1000,
      easing: 'cubicBezier(0.25, 0.1, 0.25, 1)'
    });

    // Enhanced cleanup with all event listeners
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        // Use the enhanced remove method for proper cleanup
        animationRef.current.remove();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{
        opacity: isVisible ? 0.4 : 0, // Slightly higher opacity for better visibility
        willChange: 'transform, opacity',
        transition: 'opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)', // Slower fade-in for premium feel
        filter: 'blur(0.4px)', // Refined blur for premium effect
        transform: 'translateZ(0)', // Force GPU acceleration
        backfaceVisibility: 'hidden' // Performance optimization
      }}
    />
  );
};

export default HeroAnimation;

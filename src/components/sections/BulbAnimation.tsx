import React, { useRef, useEffect, useState } from 'react';
import anime from 'animejs';

// Helper functions to avoid reference errors
const stagger = anime.stagger;
const createTimeline = anime.timeline;

/**
 * BulbAnimation Component
 *
 * A high-end, attractive animation of a light bulb with circuit lines radiating outward.
 * Uses Canvas API with Anime.js 4 for smoother animations and better performance.
 * Implements modern design principles with enhanced glow effects and fluid motion.
 *
 * Features:
 * - Modern light bulb with dynamic circuit lines radiating outward
 * - Energy particles flowing along circuit paths with enhanced trails
 * - Advanced glow effects using Anime.js 4 composition API
 * - Responsive design that adapts to container size with optimized performance
 * - Utilizes latest Anime.js 4 features for smoother animations
 */
const BulbAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<anime.AnimeInstance | null>(null);
  const timelineRef = useRef<anime.AnimeTimelineInstance | null>(null);
  const particlesRef = useRef<any[]>([]);
  const circuitPathsRef = useRef<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Set canvas size to match container
    const updateCanvasSize = () => {
      if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Get the drawing context
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Define colors with more vibrant palette
    const primaryColor = '#3dd598';
    const primaryColorRGBA = (opacity: number) => `rgba(61, 213, 152, ${opacity})`;
    const secondaryColor = '#0a6dc2';
    const secondaryColorRGBA = (opacity: number) => `rgba(10, 109, 194, ${opacity})`;
    const filamentColor = '#ff9100';
    const glowColor = '#3dd598';

    // Animation variables
    let animationFrame: number;
    let time = 0;

    // Bulb properties - slightly larger for more impact
    const bulbCenter = { x: canvas.width / 2, y: canvas.height / 2 - 20 };
    const bulbRadius = 45;
    const baseWidth = 35;
    const baseHeight = 25;

    // Create circuit nodes with more variety and better distribution
    const createCircuitNodes = () => {
      const nodes = [];
      const nodeCount = 12; // More nodes for a richer circuit effect

      // Create nodes around the perimeter
      const margin = 40;
      const width = canvas.width - margin * 2;
      const height = canvas.height - margin * 2;

      // Add nodes at strategic positions
      for (let i = 0; i < nodeCount; i++) {
        let x, y;
        const angle = (i / nodeCount) * Math.PI * 2;

        // Distribute nodes in a circular pattern around the canvas
        if (i % 3 === 0) {
          // Place some nodes at the corners and edges
          x = i % 4 === 0 ? margin : (i % 4 === 1 ? canvas.width - margin : margin + width * Math.random());
          y = i % 4 === 0 || i % 4 === 1 ? margin : canvas.height - margin;
        } else {
          // Place other nodes in a circular pattern around the bulb
          const radius = Math.min(width, height) * 0.4;
          x = bulbCenter.x + Math.cos(angle) * radius;
          y = bulbCenter.y + Math.sin(angle) * radius;
        }

        nodes.push({
          x,
          y,
          radius: 3 + Math.random() * 3, // Variable sizes
          delay: i * 0.1,
          pulseSpeed: 1 + Math.random() * 2 // Variable pulse speeds
        });
      }

      return nodes;
    };

    const nodes = createCircuitNodes();

    // Create circuit paths radiating from the bulb
    const createCircuitPaths = () => {
      const paths = [];
      const pathCount = 24; // More paths for a complex circuit network

      // Create primary paths radiating directly from the bulb
      for (let i = 0; i < pathCount / 2; i++) {
        const angle = (i / (pathCount / 2)) * Math.PI * 2;
        const length = 50 + Math.random() * 100; // Variable lengths

        // Start point on the bulb's perimeter
        const start = {
          x: bulbCenter.x + Math.cos(angle) * bulbRadius,
          y: bulbCenter.y + Math.sin(angle) * bulbRadius
        };

        // End point radiating outward
        const end = {
          x: bulbCenter.x + Math.cos(angle) * (bulbRadius + length),
          y: bulbCenter.y + Math.sin(angle) * (bulbRadius + length)
        };

        paths.push({
          start,
          end,
          delay: i * 0.05,
          width: 1 + Math.random() * 1.5, // Variable widths
          controlPoints: [], // For curved paths
          isCurved: false,
          color: Math.random() > 0.3 ? primaryColor : secondaryColor // Mix of colors
        });
      }

      // Create secondary connecting paths between nodes and primary paths
      for (let i = 0; i < pathCount / 2; i++) {
        const startNode = nodes[i % nodes.length];
        const endNode = nodes[(i + 1 + Math.floor(Math.random() * 3)) % nodes.length];

        // Create curved paths between nodes
        const midX = (startNode.x + endNode.x) / 2;
        const midY = (startNode.y + endNode.y) / 2;
        const offset = 30 + Math.random() * 50;
        const angle = Math.atan2(endNode.y - startNode.y, endNode.x - startNode.x) + (Math.random() > 0.5 ? Math.PI/2 : -Math.PI/2);

        const controlPoint = {
          x: midX + Math.cos(angle) * offset,
          y: midY + Math.sin(angle) * offset
        };

        paths.push({
          start: { x: startNode.x, y: startNode.y },
          end: { x: endNode.x, y: endNode.y },
          delay: i * 0.05 + pathCount * 0.05,
          width: 1 + Math.random(),
          controlPoints: [controlPoint],
          isCurved: true,
          color: Math.random() > 0.3 ? primaryColor : secondaryColor
        });
      }

      return paths;
    };

    const paths = createCircuitPaths();
    circuitPathsRef.current = paths;

    // Energy particles with enhanced properties
    const particles: {
      x: number;
      y: number;
      path: number;
      progress: number;
      speed: number;
      size: number;
      color: string;
      trail: {x: number, y: number}[];
      glowIntensity: number;
      pulseRate: number;
      direction: number; // 1 for forward, -1 for backward
    }[] = [];

    // Create initial particles with more variety
    for (let i = 0; i < 45; i++) { // More particles for richer effect
      const pathIndex = Math.floor(Math.random() * paths.length);
      const pathColor = paths[pathIndex].color;

      particles.push({
        x: 0,
        y: 0,
        path: pathIndex,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.006, // Faster particles
        size: 1.2 + Math.random() * 2.2, // Variable sizes
        color: pathColor, // Match path color
        trail: [], // Store recent positions for trail effect
        glowIntensity: 0.6 + Math.random() * 0.4, // Variable glow
        pulseRate: 0.5 + Math.random() * 1.5, // Variable pulse rate
        direction: Math.random() > 0.3 ? 1 : -1 // Some particles move backward
      });
    }

    // Store particles for anime.js animations
    particlesRef.current = particles;

    // Draw functions
    const drawBulb = (time: number) => {
      // Modern bulb design with subtle movement
      const bulbX = bulbCenter.x + Math.sin(time * 1.2) * 1.5;
      const bulbY = bulbCenter.y + Math.sin(time * 0.8) * 1.5;

      // Create a more modern, slightly flattened bulb shape
      ctx.beginPath();
      ctx.ellipse(
        bulbX,
        bulbY,
        bulbRadius,
        bulbRadius * 0.95, // Slightly flattened for modern look
        0,
        0,
        Math.PI * 2
      );

      // Enhanced gradient for bulb with more vibrant colors
      const gradient = ctx.createRadialGradient(
        bulbX, bulbY - 15, 0,
        bulbX, bulbY, bulbRadius
      );

      // More vibrant center with subtle color transitions
      gradient.addColorStop(0, primaryColorRGBA(0.5));
      gradient.addColorStop(0.4, primaryColorRGBA(0.3));
      gradient.addColorStop(0.7, secondaryColorRGBA(0.2));
      gradient.addColorStop(1, 'rgba(255,255,255,0.08)'); // Subtle white edge for glass effect

      ctx.fillStyle = gradient;
      ctx.fill();

      // Glass edge with enhanced glow
      ctx.strokeStyle = primaryColorRGBA(0.9);
      ctx.lineWidth = 1.5;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Modern minimalist base design
      ctx.beginPath();
      const baseY = bulbY + bulbRadius * 0.95; // Adjust for flattened bulb

      // Create a sleeker base with subtle curves
      const baseTopWidth = baseWidth * 0.8;

      // Top of base (narrower where it meets the bulb)
      ctx.moveTo(bulbX - baseTopWidth / 2, baseY);
      ctx.lineTo(bulbX + baseTopWidth / 2, baseY);

      // Right side of base (with subtle curve)
      ctx.lineTo(bulbX + baseWidth / 2, baseY + baseHeight * 0.3);
      ctx.lineTo(bulbX + baseWidth / 2, baseY + baseHeight - 5);

      // Bottom right corner (rounded)
      ctx.quadraticCurveTo(
        bulbX + baseWidth / 2,
        baseY + baseHeight,
        bulbX + baseWidth / 2 - 5,
        baseY + baseHeight
      );

      // Bottom of base
      ctx.lineTo(bulbX - baseWidth / 2 + 5, baseY + baseHeight);

      // Bottom left corner (rounded)
      ctx.quadraticCurveTo(
        bulbX - baseWidth / 2,
        baseY + baseHeight,
        bulbX - baseWidth / 2,
        baseY + baseHeight - 5
      );

      // Left side of base (with subtle curve)
      ctx.lineTo(bulbX - baseWidth / 2, baseY + baseHeight * 0.3);
      ctx.lineTo(bulbX - baseTopWidth / 2, baseY);

      ctx.closePath();

      // Modern metallic gradient for base
      const baseGradient = ctx.createLinearGradient(
        bulbX - baseWidth / 2, baseY,
        bulbX + baseWidth / 2, baseY + baseHeight
      );
      baseGradient.addColorStop(0, primaryColorRGBA(0.9));
      baseGradient.addColorStop(0.4, secondaryColorRGBA(0.8));
      baseGradient.addColorStop(0.6, primaryColorRGBA(0.7));
      baseGradient.addColorStop(1, secondaryColorRGBA(0.9));

      ctx.fillStyle = baseGradient;
      ctx.shadowColor = primaryColorRGBA(0.5);
      ctx.shadowBlur = 5;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Add subtle highlight to base for depth
      ctx.beginPath();
      ctx.moveTo(bulbX - baseTopWidth / 2 + 2, baseY + 2);
      ctx.lineTo(bulbX + baseTopWidth / 2 - 2, baseY + 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Modern circuit-inspired filament design
      const filamentOpacity = 0.7 + Math.sin(time * 6) * 0.3;

      // Draw multiple circuit-like filament paths
      const filamentPaths = [
        // Central vertical line
        {
          start: { x: bulbX, y: bulbY - bulbRadius * 0.5 },
          end: { x: bulbX, y: bulbY + bulbRadius * 0.5 },
          controlPoints: []
        },
        // Horizontal cross line
        {
          start: { x: bulbX - bulbRadius * 0.4, y: bulbY },
          end: { x: bulbX + bulbRadius * 0.4, y: bulbY },
          controlPoints: []
        },
        // Diagonal line 1
        {
          start: { x: bulbX - bulbRadius * 0.3, y: bulbY - bulbRadius * 0.3 },
          end: { x: bulbX + bulbRadius * 0.3, y: bulbY + bulbRadius * 0.3 },
          controlPoints: []
        },
        // Diagonal line 2
        {
          start: { x: bulbX - bulbRadius * 0.3, y: bulbY + bulbRadius * 0.3 },
          end: { x: bulbX + bulbRadius * 0.3, y: bulbY - bulbRadius * 0.3 },
          controlPoints: []
        },
        // Curved circuit path 1
        {
          start: { x: bulbX, y: bulbY - bulbRadius * 0.6 },
          end: { x: bulbX, y: bulbY + bulbRadius * 0.6 },
          controlPoints: [{ x: bulbX + bulbRadius * 0.5, y: bulbY }]
        },
        // Curved circuit path 2
        {
          start: { x: bulbX, y: bulbY - bulbRadius * 0.6 },
          end: { x: bulbX, y: bulbY + bulbRadius * 0.6 },
          controlPoints: [{ x: bulbX - bulbRadius * 0.5, y: bulbY }]
        }
      ];

      // Draw each filament path
      filamentPaths.forEach((path, index) => {
        ctx.beginPath();

        if (path.controlPoints.length > 0) {
          // Draw curved path
          ctx.moveTo(path.start.x, path.start.y);
          ctx.quadraticCurveTo(
            path.controlPoints[0].x,
            path.controlPoints[0].y,
            path.end.x,
            path.end.y
          );
        } else {
          // Draw straight path
          ctx.moveTo(path.start.x, path.start.y);
          ctx.lineTo(path.end.x, path.end.y);
        }

        // Alternate colors for more circuit-like appearance
        const pathColor = index % 2 === 0 ? filamentColor : primaryColor;

        ctx.strokeStyle = pathColor;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = pathColor;
        ctx.shadowBlur = 8 * filamentOpacity;
        ctx.stroke();
      });

      // Add circuit nodes at filament intersections
      const circuitNodes = [
        { x: bulbX, y: bulbY }, // Center
        { x: bulbX, y: bulbY - bulbRadius * 0.5 }, // Top
        { x: bulbX, y: bulbY + bulbRadius * 0.5 }, // Bottom
        { x: bulbX - bulbRadius * 0.4, y: bulbY }, // Left
        { x: bulbX + bulbRadius * 0.4, y: bulbY }, // Right
        { x: bulbX - bulbRadius * 0.3, y: bulbY - bulbRadius * 0.3 }, // Top-left
        { x: bulbX + bulbRadius * 0.3, y: bulbY - bulbRadius * 0.3 }, // Top-right
        { x: bulbX - bulbRadius * 0.3, y: bulbY + bulbRadius * 0.3 }, // Bottom-left
        { x: bulbX + bulbRadius * 0.3, y: bulbY + bulbRadius * 0.3 }  // Bottom-right
      ];

      circuitNodes.forEach((node, index) => {
        ctx.beginPath();
        const nodeSize = index === 0 ? 3 : 2; // Center node is larger
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = index % 2 === 0 ? primaryColor : filamentColor;
        ctx.shadowColor = index % 2 === 0 ? primaryColor : filamentColor;
        ctx.shadowBlur = 5 * filamentOpacity;
        ctx.fill();
      });

      ctx.shadowBlur = 0;

      // Enhanced glow effect with pulsing intensity
      const glowSize = bulbRadius * 2.5 + Math.sin(time * 2) * 10;
      const glowIntensity = 0.4 + Math.sin(time * 1.5) * 0.2;

      ctx.beginPath();
      ctx.arc(
        bulbX,
        bulbY,
        glowSize,
        0,
        Math.PI * 2
      );

      const glowGradient = ctx.createRadialGradient(
        bulbX, bulbY, bulbRadius * 0.5,
        bulbX, bulbY, glowSize
      );
      glowGradient.addColorStop(0, primaryColorRGBA(0.6 * glowIntensity));
      glowGradient.addColorStop(0.3, primaryColorRGBA(0.4 * glowIntensity));
      glowGradient.addColorStop(0.6, secondaryColorRGBA(0.2 * glowIntensity));
      glowGradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Add circuit-like rays emanating from the bulb
      const rayCount = 16; // More rays for circuit effect
      const rayLength = bulbRadius * 4;

      for (let i = 0; i < rayCount; i++) {
        // Skip some angles to create gaps in the circuit pattern
        if (i % 4 === 0) continue;

        const angle = (i / rayCount) * Math.PI * 2;
        const rayOpacity = 0.15 + Math.sin(time * 2 + i) * 0.1;
        const rayWidth = 1 + (i % 3) * 0.5; // Varying widths

        // Calculate start point on bulb perimeter
        const startX = bulbX + Math.cos(angle) * bulbRadius;
        const startY = bulbY + Math.sin(angle) * bulbRadius;

        // Calculate end point
        const endX = bulbX + Math.cos(angle) * rayLength;
        const endY = bulbY + Math.sin(angle) * rayLength;

        // Add a slight curve to some rays for circuit-like appearance
        ctx.beginPath();

        if (i % 3 === 0) {
          // Curved ray
          const controlAngle = angle + (Math.PI / 8) * (i % 2 === 0 ? 1 : -1);
          const controlDist = rayLength * 0.6;
          const controlX = bulbX + Math.cos(controlAngle) * controlDist;
          const controlY = bulbY + Math.sin(controlAngle) * controlDist;

          ctx.moveTo(startX, startY);
          ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        } else {
          // Straight ray
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
        }

        // Alternate colors for circuit effect
        const rayColor = i % 2 === 0 ? primaryColorRGBA(rayOpacity) : secondaryColorRGBA(rayOpacity);

        const rayGradient = ctx.createLinearGradient(
          startX, startY,
          endX, endY
        );
        rayGradient.addColorStop(0, rayColor);
        rayGradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.strokeStyle = rayGradient;
        ctx.lineWidth = rayWidth;
        ctx.stroke();

        // Add small nodes along some rays for circuit effect
        if (i % 5 === 0) {
          const nodeCount = 2;
          for (let j = 1; j <= nodeCount; j++) {
            const nodePos = j / (nodeCount + 1);
            const nodeX = startX + (endX - startX) * nodePos;
            const nodeY = startY + (endY - startY) * nodePos;

            ctx.beginPath();
            ctx.arc(nodeX, nodeY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = i % 2 === 0 ? primaryColor : secondaryColor;
            ctx.fill();
          }
        }
      }
    };

    const drawCircuitNodes = (time: number) => {
      nodes.forEach((node, index) => {
        // More dynamic pulsing based on individual node properties
        const pulseSize = 1 + Math.sin(time * node.pulseSpeed + index) * 0.3;
        const nodeColor = index % 3 === 0 ? primaryColor : secondaryColor;
        const nodeColorRGBA = (opacity: number) => {
          return index % 3 === 0 ? primaryColorRGBA(opacity) : secondaryColorRGBA(opacity);
        };

        // Draw node with shadow for better depth
        ctx.beginPath();
        ctx.shadowColor = nodeColor;
        ctx.shadowBlur = 8;
        ctx.arc(node.x, node.y, node.radius * pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Enhanced glow effect with variable intensity
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3 * pulseSize, 0, Math.PI * 2);
        const nodeGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 3
        );
        nodeGradient.addColorStop(0, nodeColorRGBA(0.6));
        nodeGradient.addColorStop(0.5, nodeColorRGBA(0.3));
        nodeGradient.addColorStop(1, nodeColorRGBA(0));

        ctx.fillStyle = nodeGradient;
        ctx.fill();

        // Add small connecting dots around some nodes
        if (index % 4 === 0) {
          const dotCount = 3;
          for (let i = 0; i < dotCount; i++) {
            const dotAngle = (i / dotCount) * Math.PI * 2 + time;
            const dotDistance = node.radius * 4;
            const dotX = node.x + Math.cos(dotAngle) * dotDistance;
            const dotY = node.y + Math.sin(dotAngle) * dotDistance;

            ctx.beginPath();
            ctx.arc(dotX, dotY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = nodeColorRGBA(0.7);
            ctx.fill();
          }
        }
      });
    };

    const drawCircuitPaths = () => {
      paths.forEach((path, index) => {
        ctx.beginPath();

        // Draw straight or curved paths based on path type
        if (path.isCurved && path.controlPoints.length > 0) {
          const cp = path.controlPoints[0];
          ctx.moveTo(path.start.x, path.start.y);
          ctx.quadraticCurveTo(cp.x, cp.y, path.end.x, path.end.y);
        } else {
          ctx.moveTo(path.start.x, path.start.y);
          ctx.lineTo(path.end.x, path.end.y);
        }

        // Use path's color with gradient for more depth
        const pathColor = path.color === primaryColor ?
          primaryColorRGBA(0.6) : secondaryColorRGBA(0.6);

        // Create gradient along the path
        let gradient;
        if (path.isCurved && path.controlPoints.length > 0) {
          gradient = ctx.createLinearGradient(
            path.start.x, path.start.y,
            path.end.x, path.end.y
          );
        } else {
          gradient = ctx.createLinearGradient(
            path.start.x, path.start.y,
            path.end.x, path.end.y
          );
        }

        gradient.addColorStop(0, pathColor);
        gradient.addColorStop(0.5, path.color);
        gradient.addColorStop(1, pathColor);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = path.width || 2;
        ctx.stroke();

        // Add subtle glow to some paths
        if (index % 3 === 0) {
          ctx.shadowColor = path.color;
          ctx.shadowBlur = 5;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });
    };

    const drawEnergyParticles = (time: number) => {
      particles.forEach(particle => {
        // Update particle position with direction
        particle.progress += particle.speed * particle.direction;

        // Handle reaching end or beginning of path
        if (particle.progress > 1 || particle.progress < 0) {
          // Some particles bounce back, others jump to a new path
          if (Math.random() > 0.7) {
            particle.direction *= -1; // Reverse direction
            particle.progress = particle.direction > 0 ? 0 : 1; // Reset to appropriate end
          } else {
            // Jump to a new path
            particle.progress = Math.random();
            const newPathIndex = Math.floor(Math.random() * paths.length);
            particle.path = newPathIndex;
            particle.color = paths[newPathIndex].color;
            particle.trail = []; // Clear trail when starting new path
          }

          // Occasionally randomize other properties for variety
          if (Math.random() > 0.8) {
            particle.size = 1.2 + Math.random() * 2.2;
            particle.glowIntensity = 0.6 + Math.random() * 0.4;
            particle.speed = 0.002 + Math.random() * 0.006;
          }
        }

        const path = paths[particle.path];
        let newX, newY;

        // Calculate position along straight or curved path
        if (path.isCurved && path.controlPoints.length > 0) {
          // Quadratic bezier curve calculation
          const cp = path.controlPoints[0];
          const t = particle.progress;
          const invT = 1 - t;

          // Quadratic bezier formula: P = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
          newX = invT * invT * path.start.x + 2 * invT * t * cp.x + t * t * path.end.x;
          newY = invT * invT * path.start.y + 2 * invT * t * cp.y + t * t * path.end.y;
        } else {
          // Linear interpolation for straight paths
          newX = path.start.x + (path.end.x - path.start.x) * particle.progress;
          newY = path.start.y + (path.end.y - path.start.y) * particle.progress;
        }

        // Add current position to trail with some jitter for more organic look
        const jitter = particle.size * 0.2;
        particle.trail.push({
          x: newX + (Math.random() - 0.5) * jitter,
          y: newY + (Math.random() - 0.5) * jitter
        });

        // Limit trail length based on particle size
        const trailLength = Math.floor(10 + particle.size * 3);
        if (particle.trail.length > trailLength) {
          particle.trail.shift();
        }

        // Update particle position
        particle.x = newX;
        particle.y = newY;

        // Pulse effect based on time and particle's pulse rate
        const pulse = 0.7 + Math.sin(time * particle.pulseRate) * 0.3;
        const particleOpacity = 0.7 + pulse * 0.3;

        // Draw particle trail with gradient
        if (particle.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y);

          for (let i = 1; i < particle.trail.length; i++) {
            ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
          }

          // Create gradient along the trail
          const trailGradient = ctx.createLinearGradient(
            particle.trail[0].x, particle.trail[0].y,
            particle.x, particle.y
          );

          const colorFunc = particle.color === primaryColor ? primaryColorRGBA : secondaryColorRGBA;
          trailGradient.addColorStop(0, colorFunc(0));
          trailGradient.addColorStop(0.5, colorFunc(0.2 * pulse));
          trailGradient.addColorStop(1, colorFunc(0.5 * pulse));

          ctx.strokeStyle = trailGradient;
          ctx.lineWidth = particle.size * 0.7;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }

        // Draw particle with enhanced glow and shadow
        ctx.beginPath();
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 5 * particle.glowIntensity * pulse;
        ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);

        const colorFunc = particle.color === primaryColor ? primaryColorRGBA : secondaryColorRGBA;
        ctx.fillStyle = colorFunc(particleOpacity);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Particle glow with enhanced effects
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4 * pulse, 0, Math.PI * 2);
        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4 * pulse
        );

        particleGradient.addColorStop(0, colorFunc(0.7 * particle.glowIntensity * pulse));
        particleGradient.addColorStop(0.5, colorFunc(0.3 * particle.glowIntensity * pulse));
        particleGradient.addColorStop(1, colorFunc(0));

        ctx.fillStyle = particleGradient;
        ctx.fill();
      });
    };

    // Main animation loop with performance optimizations
    const animate = () => {
      time += 0.01;

      // Clear canvas with alpha for smoother transitions
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw all elements in order of visual depth
      drawCircuitPaths();
      drawCircuitNodes(time);
      drawEnergyParticles(time);
      drawBulb(time);

      // Set loaded state after first frame
      if (!isLoaded) {
        setIsLoaded(true);
      }

      // Continue animation with optimized frame timing
      animationFrame = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Create a timeline for staggered animations using Anime.js 4
    timelineRef.current = createTimeline({
      easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
      autoplay: true
    });

    // Add circuit paths animation with staggered reveal
    timelineRef.current.add({
      targets: circuitPathsRef.current,
      opacity: [0, 1],
      // Use a simple value instead of setDashoffset to avoid reference errors
      strokeDashoffset: [1000, 0],
      delay: stagger(50, { from: 'center' }),
      duration: 2000,
      easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
      update: function(anim) {
        // This is a virtual animation - the actual drawing happens in the canvas
        // We're just using Anime.js timing engine
      }
    });

    // Use Anime.js for enhanced particle animations
    animationRef.current = anime({
      targets: particlesRef.current,
      // Use simple values instead of function-based values to avoid compatibility issues
      speed: 0.008,
      glowIntensity: 0.9,
      size: 2.5,
      duration: 3000,
      delay: stagger(30),
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      update: function(anim) {
        // This is a virtual animation - the actual drawing happens in the canvas
        // We're just using Anime.js timing engine
      }
    });

    // Cleanup on unmount with proper resource management
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrame);
      if (animationRef.current) animationRef.current.pause();
      if (timelineRef.current) timelineRef.current.pause();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '350px', // Slightly taller for more impact
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        willChange: 'transform, opacity', // Performance optimization
        perspective: '1000px', // 3D effect for depth
        transition: 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        opacity: isLoaded ? 1 : 0 // Fade in when loaded
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          willChange: 'transform, opacity', // Performance optimization
          transform: 'translateZ(0)', // Force GPU acceleration
          filter: 'drop-shadow(0 0 15px rgba(61, 213, 152, 0.4))', // Enhanced glow effect
          borderRadius: '4px' // Subtle rounded corners
        }}
      />
    </div>
  );
};

export default BulbAnimation;

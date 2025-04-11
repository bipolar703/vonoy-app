import React, { useRef, useEffect } from 'react';

/**
 * BulbAnimation Component
 * 
 * A high-performance canvas-based animation of a light bulb with energy flows.
 * This implementation uses the Canvas API for better performance and to avoid
 * CSS animation conflicts.
 */
const BulbAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    
    // Define colors
    const primaryColor = '#3dd598';
    const primaryColorRGBA = (opacity: number) => `rgba(61, 213, 152, ${opacity})`;
    const secondaryColor = '#2bb78f';
    const filamentColor = '#ff9100';
    
    // Animation variables
    let animationFrame: number;
    let time = 0;
    
    // Bulb properties
    const bulbCenter = { x: canvas.width / 2, y: canvas.height / 2 - 20 };
    const bulbRadius = 40;
    const baseWidth = 30;
    const baseHeight = 20;
    
    // Circuit nodes
    const nodes = [
      { x: 50, y: 50, radius: 5, delay: 0 },
      { x: canvas.width - 50, y: 50, radius: 5, delay: 0.5 },
      { x: 50, y: canvas.height - 50, radius: 5, delay: 1 },
      { x: canvas.width - 50, y: canvas.height - 50, radius: 5, delay: 1.5 }
    ];
    
    // Circuit paths
    const paths = [
      { start: { x: bulbCenter.x, y: bulbCenter.y - bulbRadius }, end: { x: bulbCenter.x, y: 50 }, delay: 0 },
      { start: { x: bulbCenter.x, y: 50 }, end: { x: 50, y: 50 }, delay: 0.1 },
      { start: { x: bulbCenter.x, y: 50 }, end: { x: canvas.width - 50, y: 50 }, delay: 0.2 },
      { start: { x: 50, y: 50 }, end: { x: 50, y: canvas.height - 50 }, delay: 0.3 },
      { start: { x: canvas.width - 50, y: 50 }, end: { x: canvas.width - 50, y: canvas.height - 50 }, delay: 0.4 },
      { start: { x: 50, y: canvas.height - 50 }, end: { x: canvas.width - 50, y: canvas.height - 50 }, delay: 0.5 }
    ];
    
    // Energy particles
    const particles: { x: number; y: number; path: number; progress: number; speed: number }[] = [];
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: 0,
        y: 0,
        path: Math.floor(Math.random() * paths.length),
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003
      });
    }
    
    // Draw functions
    const drawBulb = (time: number) => {
      // Bulb glass
      ctx.beginPath();
      ctx.arc(
        bulbCenter.x + Math.sin(time * 2) * 3, 
        bulbCenter.y + Math.sin(time * 1.5) * 3, 
        bulbRadius, 
        0, 
        Math.PI * 2
      );
      
      // Create gradient for bulb
      const gradient = ctx.createRadialGradient(
        bulbCenter.x, bulbCenter.y - 10, 0,
        bulbCenter.x, bulbCenter.y, bulbRadius
      );
      gradient.addColorStop(0, primaryColorRGBA(0.3));
      gradient.addColorStop(1, primaryColorRGBA(0.05));
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Bulb base
      ctx.beginPath();
      ctx.rect(
        bulbCenter.x - baseWidth / 2,
        bulbCenter.y + bulbRadius,
        baseWidth,
        baseHeight
      );
      
      // Create gradient for base
      const baseGradient = ctx.createLinearGradient(
        bulbCenter.x - baseWidth / 2, bulbCenter.y + bulbRadius,
        bulbCenter.x + baseWidth / 2, bulbCenter.y + bulbRadius + baseHeight
      );
      baseGradient.addColorStop(0, primaryColor);
      baseGradient.addColorStop(1, secondaryColor);
      
      ctx.fillStyle = baseGradient;
      ctx.fill();
      
      // Filament
      ctx.beginPath();
      ctx.moveTo(bulbCenter.x, bulbCenter.y - 20);
      ctx.bezierCurveTo(
        bulbCenter.x - 15, bulbCenter.y,
        bulbCenter.x + 15, bulbCenter.y + 10,
        bulbCenter.x, bulbCenter.y + 20
      );
      
      ctx.strokeStyle = filamentColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Filament glow effect
      const filamentOpacity = 0.7 + Math.sin(time * 10) * 0.3;
      ctx.shadowColor = primaryColorRGBA(filamentOpacity);
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Glow effect
      ctx.beginPath();
      ctx.arc(
        bulbCenter.x, 
        bulbCenter.y, 
        bulbRadius * 1.5 + Math.sin(time * 3) * 5, 
        0, 
        Math.PI * 2
      );
      
      const glowGradient = ctx.createRadialGradient(
        bulbCenter.x, bulbCenter.y, 0,
        bulbCenter.x, bulbCenter.y, bulbRadius * 1.5
      );
      glowGradient.addColorStop(0, primaryColorRGBA(0.4));
      glowGradient.addColorStop(0.5, primaryColorRGBA(0.1));
      glowGradient.addColorStop(1, primaryColorRGBA(0));
      
      ctx.fillStyle = glowGradient;
      ctx.fill();
    };
    
    const drawCircuitNodes = (time: number) => {
      nodes.forEach((node, index) => {
        const pulseSize = 1 + Math.sin(time * 3 + index) * 0.2;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.fill();
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2 * pulseSize, 0, Math.PI * 2);
        const nodeGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 2
        );
        nodeGradient.addColorStop(0, primaryColorRGBA(0.5));
        nodeGradient.addColorStop(1, primaryColorRGBA(0));
        
        ctx.fillStyle = nodeGradient;
        ctx.fill();
      });
    };
    
    const drawCircuitPaths = () => {
      paths.forEach(path => {
        ctx.beginPath();
        ctx.moveTo(path.start.x, path.start.y);
        ctx.lineTo(path.end.x, path.end.y);
        ctx.strokeStyle = primaryColorRGBA(0.4);
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };
    
    const drawEnergyParticles = (time: number) => {
      particles.forEach(particle => {
        // Update particle position
        particle.progress += particle.speed;
        if (particle.progress > 1) {
          particle.progress = 0;
          particle.path = Math.floor(Math.random() * paths.length);
        }
        
        const path = paths[particle.path];
        particle.x = path.start.x + (path.end.x - path.start.x) * particle.progress;
        particle.y = path.start.y + (path.end.y - path.start.y) * particle.progress;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = primaryColorRGBA(0.8);
        ctx.fill();
        
        // Particle glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 6, 0, Math.PI * 2);
        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, 6
        );
        particleGradient.addColorStop(0, primaryColorRGBA(0.5));
        particleGradient.addColorStop(1, primaryColorRGBA(0));
        
        ctx.fillStyle = particleGradient;
        ctx.fill();
      });
    };
    
    // Main animation loop
    const animate = () => {
      time += 0.01;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw all elements
      drawCircuitPaths();
      drawCircuitNodes(time);
      drawEnergyParticles(time);
      drawBulb(time);
      
      // Continue animation
      animationFrame = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '300px', 
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'block', 
          width: '100%', 
          height: '100%' 
        }}
      />
    </div>
  );
};

export default BulbAnimation;

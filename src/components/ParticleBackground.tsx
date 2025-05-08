
import React, { useEffect, useRef } from 'react';
import { useJourney } from '@/context/JourneyContext';

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
};

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const { stage } = useJourney();

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Set initial canvas size
    handleResize();

    // Update canvas size when window resizes
    window.addEventListener('resize', handleResize);

    // Initialize particles
    particlesRef.current = Array(50).fill(0).map(() => createParticle(canvas.width, canvas.height));

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Adjust particle behavior based on current stage
      const particleIntensity = stage === 'reflection' ? 2 : 1;

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX * particleIntensity;
        particle.y += particle.speedY * particleIntensity;
        
        // Update opacity
        particle.opacity -= particle.fadeSpeed;

        // Reset particles that are too faded or out of bounds
        if (particle.opacity <= 0 || 
            particle.x < 0 || 
            particle.x > canvas.width || 
            particle.y < 0 || 
            particle.y > canvas.height) {
          particlesRef.current[index] = createParticle(canvas.width, canvas.height);
        }

        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = `rgba(191, 161, 129, ${particle.opacity})`;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [stage]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 opacity-60"
    />
  );
};

// Helper function to create a particle
const createParticle = (width: number, height: number): Particle => {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.5 + 0.3,
    fadeSpeed: 0.002 + Math.random() * 0.003,
  };
};

export default ParticleBackground;

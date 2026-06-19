'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
}

interface ValueText {
  text: string;
  x: number;
  y: number;
  opacity: number;
  fadeDirection: number; // 1 for fading in, -1 for fading out
  speed: number;
}

const VALUES = [
  'Innovation',
  'Intelligence',
  'Ethics',
  'Data-Driven',
  'Impact',
  'Vision',
  'Machine Learning',
  'Algorithms',
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Premium Color Palette: Cyan, Violet, Emerald
    const colors = ['rgba(6, 182, 212, 0.8)', 'rgba(139, 92, 246, 0.8)', 'rgba(16, 185, 129, 0.8)'];

    // State arrays
    const particles: Particle[] = [];
    const valueTexts: ValueText[] = [];

    // Mouse Interaction State
    let mouse = { x: -1000, y: -1000, radius: 180 };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Initialize Particles
    const initParticles = () => {
      particles.length = 0;
      // Adjust density based on screen size for performance
      const particleCount = Math.floor((width * height) / 9000); 

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    // Initialize Floating Values
    const initValues = () => {
      valueTexts.length = 0;
      const activeValuesCount = Math.min(4, Math.floor(width / 400)); // Max 4 values on screen
      for (let i = 0; i < activeValuesCount; i++) {
        spawnValue(true);
      }
    };

    const spawnValue = (randomOpacity = false) => {
      const text = VALUES[Math.floor(Math.random() * VALUES.length)];
      // Prevent overlapping too much by keeping them roughly separated
      valueTexts.push({
        text,
        x: Math.random() * (width - 200) + 100,
        y: Math.random() * (height - 100) + 50,
        opacity: randomOpacity ? Math.random() : 0,
        fadeDirection: 1,
        speed: (Math.random() * 0.2) + 0.1, // very slow vertical drift
      });
    };

    const updateAndDrawValues = () => {
      ctx.font = '500 16px "Inter", sans-serif';
      ctx.textAlign = 'center';
      
      for (let i = valueTexts.length - 1; i >= 0; i--) {
        const v = valueTexts[i];
        
        // Drift upwards
        v.y -= v.speed;

        // Fade logic
        if (v.fadeDirection === 1) {
          v.opacity += 0.002;
          if (v.opacity >= 0.4) v.fadeDirection = -1; // Max opacity 40%
        } else {
          v.opacity -= 0.002;
        }

        // Remove and respawn if fully faded out
        if (v.opacity <= 0 && v.fadeDirection === -1) {
          valueTexts.splice(i, 1);
          spawnValue();
          continue;
        }

        // Draw text with glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(6, 182, 212, 0.5)';
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, v.opacity)})`;
        ctx.fillText(v.text, v.x, v.y);
        ctx.shadowBlur = 0; // reset
      }
    };

    const animate = () => {
      // Create a smooth trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // adjust alpha for longer trails
      ctx.fillRect(0, 0, width, height);

      // Draw floating values
      updateAndDrawValues();

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Normal movement
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse Interaction - Repulsion & Parallax
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          // Push particles away smoothly
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * 5;
          const directionY = forceDirectionY * force * 5;

          p.x -= directionX;
          p.y -= directionY;
        }

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect particles (Neural Network effect)
        for (let j = i; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          // Connect if close enough
          if (distance2 < 110) {
            ctx.beginPath();
            ctx.strokeStyle = p.color.replace('0.8)', `${0.2 - distance2 / 550})`);
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialization sequence
    handleResize();
    initValues();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}

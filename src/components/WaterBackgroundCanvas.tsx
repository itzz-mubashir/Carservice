import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  pulseSpeed: number;
  maxAlpha: number;
}

export const WaterBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create water particles & ambient bubbles
    const particleCount = Math.min(Math.floor(width / 30), 45);
    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -(Math.random() * 0.4 + 0.1), // Gentle upward floating like micro bubbles
      alpha: Math.random() * 0.3 + 0.1,
      pulseSpeed: Math.random() * 0.01 + 0.005,
      maxAlpha: Math.random() * 0.4 + 0.15,
    }));

    let shimmerTime = 0;

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      shimmerTime += 0.005;

      // Draw subtle light reflection beams across top background
      const gradient = ctx.createLinearGradient(
        width * 0.2 + Math.sin(shimmerTime) * 100,
        0,
        width * 0.8 + Math.cos(shimmerTime) * 100,
        height * 0.6
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(31, 182, 255, 0.025)');
      gradient.addColorStop(1, 'rgba(38, 208, 206, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render floating micro water particles without expensive shadowBlur
      ctx.fillStyle = 'rgba(31, 182, 255, 0.25)';
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(shimmerTime + p.y * 0.01) * 0.2;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};

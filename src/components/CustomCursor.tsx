import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let trailingX = -100;
    let trailingY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      const aura = auraRef.current;
      if (aura) {
        if (
          target &&
          (target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.closest('button') ||
            target.closest('a') ||
            target.closest('[data-cursor-hover]'))
        ) {
          aura.classList.add('w-12', 'h-12', 'bg-sky-400/20', 'border-sky-300/60');
          aura.classList.remove('w-8', 'h-8', 'bg-sky-300/15', 'border-sky-300/30');
        } else {
          aura.classList.remove('w-12', 'h-12', 'bg-sky-400/20', 'border-sky-300/60');
          aura.classList.add('w-8', 'h-8', 'bg-sky-300/15', 'border-sky-300/30');
        }
      }
    };

    const render = () => {
      trailingX += (mouseX - trailingX) * 0.22;
      trailingY += (mouseY - trailingY) * 0.22;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${trailingX}px, ${trailingY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Trailing Soft Aqua Glow Aura */}
      <div
        ref={auraRef}
        className="absolute top-0 left-0 rounded-full transition-all duration-150 ease-out backdrop-blur-[1px] w-8 h-8 bg-sky-300/15 border border-sky-300/30 shadow-[0_0_15px_rgba(31,182,255,0.15)] pointer-events-none"
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />

      {/* Precision Core Cursor Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 rounded-full w-1.5 h-1.5 bg-sky-500 pointer-events-none"
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />
    </div>
  );
};

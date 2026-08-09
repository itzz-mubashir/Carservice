import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BEFORE_AFTER_DATA } from '../data/contentData';
import { Sparkles, SlidersHorizontal, CheckCircle2, Droplet } from 'lucide-react';

export const BeforeAfterSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState(BEFORE_AFTER_DATA[0].id);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activePair = BEFORE_AFTER_DATA.find((item) => item.id === activeTabId) || BEFORE_AFTER_DATA[0];

  // Handle Drag Move calculation
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 2) percentage = 2;
    if (percentage > 98) percentage = 98;
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMove]);

  // WATER RIPPLE CANVAS EFFECT WHEN DRAGGING SLIDER
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = containerRef.current.clientWidth);
    let height = (canvas.height = containerRef.current.clientHeight);

    let ripples: { x: number; y: number; r: number; maxR: number; alpha: number }[] = [];

    // Trigger ripple at slider position when dragging
    if (isDragging) {
      const sliderX = (sliderPos / 100) * width;
      ripples.push({
        x: sliderX,
        y: height / 2 + (Math.random() - 0.5) * (height * 0.6),
        r: 2,
        maxR: 45,
        alpha: 0.8,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const currentSliderX = (sliderPos / 100) * width;

      // Draw subtle vertical water glare beam at slider line
      const lineGlow = ctx.createLinearGradient(currentSliderX - 15, 0, currentSliderX + 15, height);
      lineGlow.addColorStop(0, 'rgba(31, 182, 255, 0)');
      lineGlow.addColorStop(0.5, 'rgba(38, 208, 206, 0.25)');
      lineGlow.addColorStop(1, 'rgba(31, 182, 255, 0)');
      ctx.fillStyle = lineGlow;
      ctx.fillRect(currentSliderX - 15, 0, 30, height);

      // Render expanding ripples
      ripples.forEach((r, idx) => {
        r.r += 1.8;
        r.alpha -= 0.02;

        if (r.alpha <= 0 || r.r >= r.maxR) {
          ripples.splice(idx, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(38, 208, 206, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [sliderPos, isDragging]);

  return (
    <section id="before-after" className="py-24 bg-[#F3F6F8]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/80 text-cyan-800 text-xs font-bold uppercase tracking-widest border border-cyan-200">
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-600" />
            <span>Interactive Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2F3640] tracking-tight font-sans">
            Before & After Transformation
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Slide horizontally to witness the mirror gloss paint correction and leather restoration in real-time.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          {BEFORE_AFTER_DATA.map((pair) => {
            const isActive = pair.id === activeTabId;
            return (
              <button
                key={pair.id}
                onClick={() => {
                  setActiveTabId(pair.id);
                  setSliderPos(50);
                }}
                className={`px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/20 scale-105'
                    : 'bg-white/90 text-slate-600 hover:text-sky-600 border border-slate-200/80'
                }`}
              >
                {pair.category}
              </button>
            );
          })}
        </div>

        {/* INTERACTIVE COMPARISON SLIDER STAGE */}
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="relative aspect-[16/9] sm:aspect-[16/9] w-full rounded-[28px] overflow-hidden select-none cursor-ew-resize shadow-[0_20px_50px_rgba(31,182,255,0.12)] border border-slate-200/80 bg-slate-900 group"
          >
            {/* AFTER IMAGE (UNDERNEATH FULL CANVAS) */}
            <img
              src={activePair.afterImage}
              alt={activePair.afterLabel}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* AFTER LABEL */}
            <div className="absolute top-6 right-6 z-20 px-4 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{activePair.afterLabel}</span>
            </div>

            {/* BEFORE IMAGE (CLIPPED BY SLIDER POSITION) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden z-10"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={activePair.beforeImage}
                alt={activePair.beforeLabel}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
              />

              {/* BEFORE LABEL */}
              <div className="absolute top-6 left-6 z-20 px-4 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{activePair.beforeLabel}</span>
              </div>
            </div>

            {/* WATER RIPPLE CANVAS EFFECT OVERLAY */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none z-20 w-full h-full"
            />

            {/* SLIDER HANDLE LINE & KNOB */}
            <div
              className="absolute inset-y-0 z-30 flex items-center justify-center transform -translate-x-1/2 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Vertical Glowing Water Line */}
              <div className="w-1 h-full bg-gradient-to-b from-sky-400 via-cyan-300 to-sky-400 shadow-[0_0_12px_rgba(38,208,206,0.9)]" />

              {/* Center Handle Knob */}
              <div className="absolute w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border-2 border-cyan-400 shadow-[0_0_20px_rgba(31,182,255,0.4)] flex items-center justify-center text-sky-600 transition-transform group-hover:scale-110">
                <div className="flex items-center gap-0.5">
                  <div className="w-0.5 h-4 bg-sky-500 rounded-full" />
                  <Droplet className="w-4 h-4 text-cyan-500 animate-pulse" />
                  <div className="w-0.5 h-4 bg-sky-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Drag Hint Banner */}
            <div className="absolute bottom-6 inset-x-0 mx-auto w-max z-20 px-4 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-slate-300 flex items-center gap-2">
              <SlidersHorizontal className="w-3 h-3 text-cyan-400 animate-spin-slow" />
              <span>Drag slider left or right to inspect finish</span>
            </div>

          </div>

          {/* METRICS & DESCRIPTION CARD */}
          <div className="bg-white/90 backdrop-blur-xl rounded-[24px] p-8 border border-slate-200/80 shadow-[0_10px_30px_rgba(47,54,64,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7 space-y-2">
              <h3 className="text-xl font-bold text-[#2F3640]">
                {activePair.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {activePair.description}
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-3 gap-3 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
              {activePair.metrics.map((m, idx) => (
                <div key={idx} className="text-center p-3 rounded-2xl bg-sky-50/50 border border-sky-100">
                  <p className="text-lg font-black text-sky-600">{m.value}</p>
                  <p className="text-[10px] font-semibold uppercase text-slate-500 mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

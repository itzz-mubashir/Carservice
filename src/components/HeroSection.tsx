import React, { useState, useEffect, useRef } from 'react';
import { HERO_CAR_IMAGE, HERO_STAGES } from '../data/contentData';
import { HeroStage } from '../types';
import { Sparkles, Shield, Star, Droplet, ChevronRight, Play, RefreshCw, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookClick, onExploreClick }) => {
  const [activeStage, setActiveStage] = useState<HeroStage['id']>('spray');
  const [isCarEntered, setIsCarEntered] = useState(false);
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger car entrance animation on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCarEntered(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle stages every 6 seconds if user doesn't interact
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => {
        if (prev === 'spray') return 'foam';
        if (prev === 'foam') return 'rinse';
        if (prev === 'rinse') return 'gloss';
        return 'spray';
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Canvas Water & Foam Animation Engine for the Hero Car
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pools for Spray, Water Droplets, Foam Bubbles, Gloss Rays
    interface SprayParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }

    interface DropletParticle {
      x: number;
      y: number;
      vy: number;
      size: number;
      alpha: number;
      trailLength: number;
    }

    interface FoamParticle {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      growth: number;
    }

    const sprayParticles: SprayParticle[] = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.4),
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 3 + 2,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const droplets: DropletParticle[] = Array.from({ length: 30 }).map(() => ({
      x: width * 0.15 + Math.random() * (width * 0.7),
      y: height * 0.3 + Math.random() * (height * 0.4),
      vy: Math.random() * 1.5 + 0.8,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.7 + 0.3,
      trailLength: Math.random() * 8 + 4,
    }));

    const foamBubbles: FoamParticle[] = Array.from({ length: 25 }).map(() => ({
      x: width * 0.2 + Math.random() * (width * 0.6),
      y: height * 0.35 + Math.random() * (height * 0.35),
      radius: Math.random() * 12 + 4,
      alpha: Math.random() * 0.5 + 0.2,
      growth: (Math.random() - 0.5) * 0.05,
    }));

    let glossAngle = 0;

    const render = () => {
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // --- STAGE 1: WATER SPRAY ANIMATION ---
      if (activeStage === 'spray' || activeStage === 'rinse') {
        sprayParticles.forEach((p) => {
          p.y += p.vy;
          p.x += p.vx;
          if (p.y > height * 0.8) {
            p.y = 0;
            p.x = Math.random() * width;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(31, 182, 255, ${p.alpha})`;
          ctx.fill();
        });
      }

      // --- STAGE 2: FOAM SPREADING & DISSOLVING ANIMATION ---
      if (activeStage === 'foam') {
        foamBubbles.forEach((b) => {
          b.radius += b.growth;
          if (b.radius > 20 || b.radius < 3) b.growth *= -1;

          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(243, 246, 248, ${b.alpha})`;
          ctx.fill();
        });
      }

      // --- REALISTIC WATER DROPLETS TRICKLING DOWN PAINTWORK ---
      droplets.forEach((d) => {
        d.y += d.vy;
        if (d.y > height * 0.85) {
          d.y = height * 0.25;
          d.x = width * 0.15 + Math.random() * (width * 0.7);
        }

        // Draw trickling droplet with trail
        ctx.beginPath();
        ctx.moveTo(d.x, d.y - d.trailLength);
        ctx.lineTo(d.x, d.y);
        ctx.strokeStyle = `rgba(38, 208, 206, ${d.alpha * 0.8})`;
        ctx.lineWidth = d.size * 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${d.alpha})`;
        ctx.fill();
      });

      // --- STAGE 4: CERAMIC DIAMOND REFLECTION SHINE RAYS ---
      if (activeStage === 'gloss') {
        glossAngle += 0.015;
        const beamX = width * 0.5 + Math.sin(glossAngle) * (width * 0.35);

        const shineGrad = ctx.createLinearGradient(beamX - 60, 0, beamX + 60, height);
        shineGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        shineGrad.addColorStop(0.5, 'rgba(38, 208, 206, 0.15)');
        shineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = shineGrad;
        ctx.fillRect(0, 0, width, height);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [activeStage]);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-32 lg:pb-24 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FCFCFC] via-[#F3F6F8]/70 to-[#FCFCFC]"
    >
      {/* Background Ambient Radial Light Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-sky-200/30 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-200/20 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: LUXURY HEADLINE & CONVERSION ACTIONS */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Google Reviews Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_20px_rgba(31,182,255,0.08)]">
              <div className="flex items-center text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <span className="text-xs font-bold text-slate-800">
                5.0 ★ Rating
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                • 450+ Supercar Reviews
              </span>
            </div>

            {/* Main Luxury Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#2F3640] leading-[1.08] font-sans">
                The Art Of <br />
                <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-600 bg-clip-text text-transparent">
                  Automotive Perfection
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                Where every vehicle is treated like a museum-grade masterpiece. Deionized precision hydro-washing, Swissvax leather feeding, and 9H nano-crystalline ceramic perfection.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider text-white rounded-2xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 shadow-[0_12px_30px_rgba(31,182,255,0.4)] hover:shadow-[0_18px_40px_rgba(31,182,255,0.55)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Book Service</span>
                  <ChevronRight className="w-4 h-4 text-cyan-100 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#2F3640] rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 hover:border-sky-300 hover:text-sky-600 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Services</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-sky-50 text-sky-600">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Master Certified</p>
                  <p className="text-[10px] text-slate-500">Master Detailers</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-cyan-50 text-cyan-600">
                  <Droplet className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Deionized Water</p>
                  <p className="text-[10px] text-slate-500">Zero Water Spots</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-blue-50 text-blue-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">100% Paint Safe</p>
                  <p className="text-[10px] text-slate-500">Zero Swirl Touch</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: CINEMATIC CAR ENTRANCE & LIVE DETAILING SIMULATION */}
          <div className="lg:col-span-6 relative">
            
            {/* Interactive Detailing Studio Simulator Control Switcher */}
            <div className="mb-4 bg-white/90 backdrop-blur-xl border border-sky-100 p-2 rounded-2xl shadow-[0_10px_30px_rgba(31,182,255,0.08)] flex items-center justify-between gap-1 overflow-x-auto">
              {HERO_STAGES.map((stage) => {
                const isActive = activeStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id)}
                    className={`flex-1 min-w-[110px] py-2 px-2.5 rounded-xl text-[11px] font-bold tracking-tight transition-all duration-300 text-center cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md scale-[1.02]'
                        : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/60'
                    }`}
                  >
                    <div>{stage.name.split('.')[1]}</div>
                    <div className={`text-[9px] font-medium opacity-80 ${isActive ? 'text-cyan-100' : 'text-slate-400'}`}>
                      {stage.badge}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main Luxury Sports Car Frame */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-200/60 shadow-[0_25px_60px_rgba(31,182,255,0.18)] group">
              
              {/* Headlight Beam Glow Effect Overlay */}
              <div
                className={`absolute top-1/2 left-4 w-40 h-40 rounded-full bg-cyan-300/30 blur-2xl transition-opacity duration-700 pointer-events-none z-20 ${
                  headlightsOn ? 'opacity-100 animate-pulse' : 'opacity-0'
                }`}
              />

              {/* Car Image with Slow Cinematic Push-In & Entrance Animation */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={HERO_CAR_IMAGE}
                  alt="AURA Ultra-Luxury Supercar Detailing"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-all duration-1000 ease-out transform ${
                    isCarEntered ? 'translate-x-0 scale-100' : 'translate-x-12 scale-105 opacity-90'
                  } group-hover:scale-105`}
                />

                {/* Animated Water & Foam Canvas Layer */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 pointer-events-none z-10 w-full h-full"
                />

                {/* Soft Atmospheric Base Mist */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent pointer-events-none z-10" />

                {/* Live Active Stage Indicator Banner */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-cyan-300 font-bold">Studio Mode:</span>
                  <span>{HERO_STAGES.find((s) => s.id === activeStage)?.name}</span>
                </div>

                {/* Headlight Toggle */}
                <button
                  onClick={() => setHeadlightsOn(!headlightsOn)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white hover:text-cyan-300 transition-colors cursor-pointer text-xs flex items-center gap-1.5 px-3"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{headlightsOn ? 'Headlights ON' : 'Headlights OFF'}</span>
                </button>
              </div>

              {/* Active Stage Description Footer */}
              <div className="p-4 bg-slate-950/90 text-white backdrop-blur-md flex items-center justify-between gap-4 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <p className="text-slate-300 text-[11px] sm:text-xs">
                    {HERO_STAGES.find((s) => s.id === activeStage)?.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveStage((prev) => {
                      if (prev === 'spray') return 'foam';
                      if (prev === 'foam') return 'rinse';
                      if (prev === 'rinse') return 'gloss';
                      return 'spray';
                    });
                  }}
                  className="shrink-0 flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold text-[11px] uppercase tracking-wider cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 animate-spin-slow" />
                  <span>Next Step</span>
                </button>
              </div>

            </div>

            {/* Reflection Shadow below Car Card */}
            <div className="h-6 mx-8 bg-sky-500/10 rounded-[100%] blur-xl pointer-events-none mt-2" />

          </div>

        </div>
      </div>
    </section>
  );
};

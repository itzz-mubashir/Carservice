import React, { useState, useEffect, useRef } from 'react';
import { PROCESS_STEPS } from '../data/contentData';
import { ClipboardCheck, ShowerHead, Sparkles, CheckCircle2, Droplet, ArrowRight } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto increment active step or update on scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const renderIcon = (name: string, active: boolean) => {
    const cls = `w-6 h-6 transition-colors ${active ? 'text-white' : 'text-sky-600'}`;
    switch (name) {
      case 'ClipboardCheck':
        return <ClipboardCheck className={cls} />;
      case 'ShowerHead':
        return <ShowerHead className={cls} />;
      case 'Sparkles':
        return <Sparkles className={cls} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={cls} />;
      default:
        return <Droplet className={cls} />;
    }
  };

  return (
    <section id="process" className="py-24 bg-[#F3F6F8]/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 text-sky-700 text-xs font-bold uppercase tracking-widest border border-sky-200">
            <Droplet className="w-3.5 h-3.5 text-sky-500 animate-bounce" />
            <span>Methodical Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2F3640] tracking-tight font-sans">
            Our 4-Stage Studio Process
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            From digital paint depth mapping to 120-point LED tunnel inspection, every step is connected by liquid precision.
          </p>
        </div>

        {/* HORIZONTAL TIMELINE CONTAINER */}
        <div ref={containerRef} className="relative max-w-6xl mx-auto">
          
          {/* Glowing Water Stream Flow Line (Desktop Behind Nodes) */}
          <div className="hidden lg:block absolute top-12 inset-x-12 h-2 bg-slate-200 rounded-full overflow-hidden z-0">
            {/* Animated Water Liquid Fill Bar */}
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400 shadow-[0_0_15px_rgba(38,208,206,0.8)] transition-all duration-700 ease-out relative"
              style={{ width: `${((activeStep + 1) / PROCESS_STEPS.length) * 100}%` }}
            >
              {/* Liquid Shimmer Flow */}
              <div className="absolute inset-0 bg-white/30 animate-pulse" />
            </div>
          </div>

          {/* Timeline Nodes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, index) => {
              const isActive = index === activeStep;
              const isPassed = index <= activeStep;

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStep(index)}
                  className={`group relative bg-white/90 backdrop-blur-xl rounded-[24px] p-6 border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'border-sky-400 shadow-[0_15px_40px_rgba(31,182,255,0.2)] -translate-y-2 ring-2 ring-sky-300/50'
                      : 'border-slate-200/80 shadow-[0_10px_25px_rgba(47,54,64,0.03)] hover:border-sky-200'
                  }`}
                >
                  <div className="space-y-4">
                    
                    {/* Node Circle & Step Tag */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isPassed
                            ? 'bg-gradient-to-tr from-sky-500 to-cyan-400 shadow-md shadow-sky-500/30'
                            : 'bg-sky-50 border border-sky-100'
                        }`}
                      >
                        {renderIcon(step.iconName, isPassed)}
                      </div>

                      <span className={`text-xs font-black tracking-wider ${isActive ? 'text-sky-600' : 'text-slate-400'}`}>
                        STAGE {step.stepNumber}
                      </span>
                    </div>

                    {/* Step Titles */}
                    <div>
                      <h3 className={`text-lg font-bold transition-colors ${isActive ? 'text-sky-600' : 'text-[#2F3640]'}`}>
                        {step.title}
                      </h3>
                      <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider mt-0.5">
                        {step.subtitle}
                      </p>
                      <p className="text-slate-600 text-xs mt-3 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                  </div>

                  {/* Bullet Checklist */}
                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-1.5">
                    {step.details.map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
                        <span className={`w-1.5 h-1.5 rounded-full ${isPassed ? 'bg-cyan-500' : 'bg-slate-300'}`} />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>

                  {/* Active Animated Pulse Indicator */}
                  {isActive && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cyan-400 animate-ping opacity-75" />
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

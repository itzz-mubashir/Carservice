import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/contentData';
import { ServiceItem } from '../types';
import {
  Droplets,
  Sparkles,
  ShieldCheck,
  Sparkle,
  Cpu,
  SunMedium,
  Check,
  Clock,
  ChevronRight,
  X,
  Droplet
} from 'lucide-react';

interface ServicesSectionProps {
  onBookService: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Helper icon mapper
  const renderIcon = (name: string, className: string = 'w-6 h-6') => {
    switch (name) {
      case 'Droplets':
        return <Droplets className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Sparkle':
        return <Sparkle className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'SunMedium':
        return <SunMedium className={className} />;
      default:
        return <Droplet className={className} />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#FCFCFC] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-sky-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 text-sky-700 text-xs font-bold uppercase tracking-widest border border-sky-200/60">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Handcrafted Studio Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2F3640] tracking-tight font-sans">
            Bespoke Automotive Detailing
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Every treatment is executed with uncompromised precision using deionized pure water, Swissvax organic formulas, and cleanroom 9H ceramic curing.
          </p>
        </div>

        {/* Services Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => {
            const isHovered = hoveredCardId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredCardId(service.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="group relative bg-white/90 backdrop-blur-xl rounded-[24px] p-8 border border-slate-200/80 shadow-[0_10px_30px_rgba(47,54,64,0.04)] hover:shadow-[0_20px_50px_rgba(31,182,255,0.18)] hover:border-sky-300 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                {/* --- SERVICE CARD WATER WASH & FOAM DISSOLVE HOVER EFFECT --- */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-700 z-10 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* Water Wash Flow Gradient Across Card */}
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-400/10 via-cyan-300/15 to-transparent animate-water-wash" />
                  
                  {/* Dissolving Foam Effect Particles */}
                  <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white/90 to-transparent backdrop-blur-[1px] animate-foam-dissolve" />

                  {/* Soft Blue Aqua Glow Border Shine */}
                  <div className="absolute inset-0 rounded-[24px] border-2 border-sky-400/40 shadow-[inset_0_0_20px_rgba(31,182,255,0.15)]" />
                </div>

                <div className="relative z-20 space-y-6">
                  
                  {/* Card Header Tag & Icon */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3.5 rounded-2xl bg-gradient-to-tr from-sky-50 to-cyan-50 text-sky-600 border border-sky-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      {renderIcon(service.iconName, 'w-6 h-6 text-sky-600')}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-sky-100 group-hover:text-sky-700 transition-colors">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-bold text-[#2F3640] group-hover:text-sky-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-sky-600/80 mt-1 uppercase tracking-wider">
                      {service.subtitle}
                    </p>
                    <p className="text-slate-600 text-sm mt-3 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Feature Bullets */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Card Footer */}
                <div className="relative z-20 pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{service.duration}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookService(service.title);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>Request Service</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* SERVICE DETAILS MODAL / INSPECTION DRAWER */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-[28px] max-w-2xl w-full p-6 sm:p-8 border border-sky-100 shadow-2xl relative space-y-6 animate-in zoom-in-95 duration-300">
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
                {renderIcon(selectedService.iconName, 'w-6 h-6')}
              </div>
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                  {selectedService.tag}
                </span>
                <h3 className="text-2xl font-bold text-[#2F3640]">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              {selectedService.description}
            </p>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Craftsmanship Inclusions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 text-xs font-semibold text-slate-800">
                    <Check className="w-4 h-4 text-cyan-500" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Estimated Time</p>
                <p className="text-sm font-bold text-slate-800">{selectedService.duration}</p>
              </div>

              <button
                onClick={() => {
                  const name = selectedService.title;
                  setSelectedService(null);
                  onBookService(name);
                }}
                className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 to-cyan-400 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Book This Service
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

import React from 'react';
import { WHY_US_DATA } from '../data/contentData';
import { Wrench, Leaf, ShieldAlert, Search, Award, Clock, Sparkles } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-sky-500" />;
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-emerald-500" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-blue-500" />;
      case 'Search':
        return <Search className="w-6 h-6 text-cyan-500" />;
      case 'Award':
        return <Award className="w-6 h-6 text-indigo-500" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-sky-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-sky-500" />;
    }
  };

  return (
    <section id="why-us" className="py-24 bg-[#FCFCFC] relative overflow-hidden">
      {/* Soft Glow Radial Backgrounds */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-100/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 text-sky-700 text-xs font-bold uppercase tracking-widest border border-sky-200">
            <Award className="w-3.5 h-3.5 text-sky-600" />
            <span>Unrivaled Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2F3640] tracking-tight font-sans">
            Why Discerning Owners Choose AURA
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            We operate at the pinnacle of luxury detailing. Zero shortcuts, cleanroom precision, and museum-grade care for every vehicle.
          </p>
        </div>

        {/* 6 Luxury Icon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_US_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white/90 backdrop-blur-xl rounded-[24px] p-8 border border-slate-200/80 shadow-[0_10px_30px_rgba(47,54,64,0.04)] hover:shadow-[0_20px_50px_rgba(31,182,255,0.12)] hover:border-sky-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-sky-50 to-cyan-50 border border-sky-100/80 group-hover:scale-110 transition-transform duration-300">
                    {renderIcon(item.iconName)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#2F3640] group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

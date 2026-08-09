import React from 'react';
import { Droplet, ArrowUp, Instagram, Youtube, Linkedin, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[#2F3640] text-slate-300 py-16 relative overflow-hidden">
      {/* Subtle Top Water Flow Accent Border */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-700/80">
          
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3 text-left">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 text-white shadow-lg">
              <Droplet className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  AURA
                </span>
                <span className="text-[10px] font-semibold tracking-widest uppercase rounded bg-sky-500/20 text-sky-400 border border-sky-400/30 px-1.5 py-0.5">
                  STUDIO
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Ultra-Luxury Car Wash & Auto Detailing
              </p>
            </div>
          </div>

          {/* Luxury Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-sky-400 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-sky-400 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-sky-400 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Scroll To Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-sky-400"
          >
            <span>Back To Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform text-cyan-400" />
          </button>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AURA Auto Detailing Studio Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Terms of Concierge</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Insurance Coverage</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

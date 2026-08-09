import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Shield, Droplet, Menu, X, PhoneCall, Sparkles } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isScrolledRef = useRef(false);
  const activeSectionRef = useRef('hero');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const nextIsScrolled = scrollY > 30;

          if (nextIsScrolled !== isScrolledRef.current) {
            isScrolledRef.current = nextIsScrolled;
            setIsScrolled(nextIsScrolled);
          }

          // Track active section without forcing heavy layout recalcs
          const sections = ['hero', 'services', 'before-after', 'why-us', 'process', 'reviews', 'contact'];
          const scrollPos = scrollY + 140;

          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPos >= top && scrollPos < top + height) {
                if (activeSectionRef.current !== sectionId) {
                  activeSectionRef.current = sectionId;
                  setActiveSection(sectionId);
                }
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Before & After', id: 'before-after' },
    { label: 'Why Choose Us', id: 'why-us' },
    { label: 'Our Process', id: 'process' },
    { label: 'Client Reviews', id: 'reviews' },
    { label: 'Contact Us', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FCFCFC]/95 border-b border-sky-100/60 shadow-[0_4px_20px_rgba(31,182,255,0.06)] py-3.5'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Mark */}
        <button
          onClick={() => scrollToSection('hero')}
          className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-sky-300 text-white shadow-[0_8px_20px_rgba(31,182,255,0.3)] group-hover:scale-105 transition-transform duration-300">
            <Droplet className="w-5 h-5 text-white" />
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-[#2F3640] font-sans">
                AURA
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase rounded bg-sky-100/80 text-sky-700 border border-sky-200">
                STUDIO
              </span>
            </div>
            <p className="text-[11px] tracking-wider uppercase text-slate-400 font-medium">
              Ultra-Detailing
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative text-sm font-medium transition-colors duration-200 py-1.5 cursor-pointer ${
                  isActive ? 'text-sky-600 font-semibold' : 'text-[#2F3640]/80 hover:text-sky-600'
                }`}
              >
                {link.label}
                {/* Underline Indicator */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:+18005552872"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-sky-600 transition-colors py-2 px-3 rounded-xl hover:bg-sky-50/60"
          >
            <PhoneCall className="w-3.5 h-3.5 text-sky-500" />
            <span>+1 (800) 555-AURA</span>
          </a>

          <button
            onClick={() => {
              onBookClick();
              scrollToSection('contact');
            }}
            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 shadow-[0_10px_25px_rgba(31,182,255,0.35)] hover:shadow-[0_15px_35px_rgba(31,182,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-100" />
              Book Service
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Navigation Menu"
          type="button"
          className="lg:hidden p-2.5 rounded-2xl bg-slate-100/90 text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors cursor-pointer touch-manipulation active:scale-95"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-sky-600" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white/98 border-b border-sky-100 shadow-xl p-6 transition-all duration-200 ease-out z-50">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="flex items-center justify-between text-left py-3 px-4 rounded-xl text-base font-medium text-slate-800 hover:text-sky-600 hover:bg-sky-50/80 transition-colors cursor-pointer active:bg-sky-100/60"
              >
                <span>{link.label}</span>
                <span className="w-2 h-2 rounded-full bg-sky-400/40" />
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
              <a
                href="tel:+18005552872"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100/80 active:bg-slate-200"
              >
                <PhoneCall className="w-4 h-4 text-sky-500" />
                <span>+1 (800) 555-AURA</span>
              </a>

              <button
                onClick={() => {
                  onBookClick();
                  scrollToSection('contact');
                }}
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <Sparkles className="w-4 h-4 text-cyan-100" />
                Book Service
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

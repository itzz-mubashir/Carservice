import React, { useState, useRef, useEffect } from 'react';
import { TESTIMONIALS_DATA } from '../data/contentData';
import { Star, ShieldCheck, Quote, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll animation for testimonial track with IntersectionObserver
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animId: number;
    let isVisible = true;
    const scrollSpeed = 0.8;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    const autoScroll = () => {
      if (!isPaused && isVisible && container) {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(autoScroll);
    };

    animId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [isPaused]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Duplicate list for infinite loop track
  const doubleTestimonials = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <section id="reviews" className="py-24 bg-[#FCFCFC] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-100/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 text-sky-700 text-xs font-bold uppercase tracking-widest border border-sky-200">
              <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
              <span>Verified Supercar Owners</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2F3640] tracking-tight font-sans">
              Client Endorsements
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Read uncensored feedback from collector, journalist, and executive vehicle owners who trust AURA with their prized automobiles.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleManualScroll('left')}
              className="p-3 rounded-2xl bg-white border border-slate-200/80 text-slate-700 hover:text-sky-600 hover:border-sky-300 shadow-sm transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="p-3 rounded-2xl bg-white border border-slate-200/80 text-slate-700 hover:text-sky-600 hover:border-sky-300 shadow-sm transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* FLOATING TESTIMONIALS HORIZONTAL AUTO-SCROLL TRACK */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-2 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {doubleTestimonials.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="min-w-[320px] sm:min-w-[400px] max-w-[420px] bg-white/90 backdrop-blur-xl rounded-[28px] p-8 border border-slate-200/80 shadow-[0_10px_30px_rgba(47,54,64,0.04)] hover:shadow-[0_20px_50px_rgba(31,182,255,0.15)] hover:border-sky-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shrink-0"
            >
              <div className="space-y-5">
                
                {/* Header Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400 gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-sky-200" />
                </div>

                {/* Testimonial Quote */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic font-sans">
                  "{item.quote}"
                </p>

              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-2xl object-cover border border-sky-200/80 shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-[#2F3640] truncate">
                      {item.name}
                    </h4>
                    {item.verified && (
                      <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-sky-600 truncate">
                    {item.vehicle}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {item.role} • {item.date}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

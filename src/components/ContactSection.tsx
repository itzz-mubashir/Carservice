import React, { useState, useEffect, useRef } from 'react';
import { ContactFormData } from '../types';
import {
  PhoneCall,
  Mail,
  Clock,
  Sparkles,
  Send,
  MessageCircle,
  CheckCircle2,
  Droplet,
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    serviceRequested: preselectedService || 'Exterior Wash',
    vehicleDetails: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [btnRipple, setBtnRipple] = useState<{ x: number; y: number } | null>(null);
  const [lineDrawProgress, setLineDrawProgress] = useState(0);

  const formCardRef = useRef<HTMLDivElement | null>(null);

  // Update preselected service if prop changes
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, serviceRequested: preselectedService }));
    }
  }, [preselectedService]);

  // Flowing water line drawing animation around form container on view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 0.05;
            if (progress >= 1) {
              progress = 1;
              clearInterval(interval);
            }
            setLineDrawProgress(progress);
          }, 30);
        }
      },
      { threshold: 0.2 }
    );

    if (formCardRef.current) {
      observer.observe(formCardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant liquid booking confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setBtnRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setTimeout(() => setBtnRipple(null), 600);
  };

  return (
    <section id="contact" className="py-24 bg-[#FCFCFC] relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 text-sky-700 text-xs font-bold uppercase tracking-widest border border-sky-200">
            <CalendarCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>White-Glove Concierge Reservation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2F3640] tracking-tight font-sans">
            Initiate Your Detailing Experience
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Complete the details below or message our Master Detailer directly via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: BUSINESS HOURS, CONTACT INFO & DIRECT WHATSAPP */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-white/90 backdrop-blur-xl rounded-[28px] p-8 border border-slate-200/80 shadow-[0_10px_30px_rgba(47,54,64,0.04)] space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[#2F3640] mb-2">
                  Studio Concierge
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Our private studio accommodates a limited number of vehicles daily to ensure museum-grade perfection.
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Phone</p>
                    <a href="tel:+18005552872" className="text-base font-bold text-slate-800 hover:text-sky-600 transition-colors">
                      +1 (800) 555-AURA
                    </a>
                    <p className="text-[11px] text-slate-500">Mon - Sat: 8:00 AM - 7:00 PM EST</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Concierge Email</p>
                    <a href="mailto:concierge@auradetailing.com" className="text-base font-bold text-slate-800 hover:text-sky-600 transition-colors">
                      concierge@auradetailing.com
                    </a>
                    <p className="text-[11px] text-slate-500">24-hour response guarantee</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Studio Hours</p>
                    <p className="text-sm font-bold text-slate-800">Mon – Fri: 8:00 AM – 7:00 PM</p>
                    <p className="text-sm font-bold text-slate-800">Saturday: 9:00 AM – 5:00 PM</p>
                    <p className="text-xs text-amber-600 font-semibold mt-0.5">Sunday: Private VIP Appointments Only</p>
                  </div>
                </div>

              </div>

              {/* Direct WhatsApp Button */}
              <div className="pt-6 border-t border-slate-100">
                <a
                  href="https://wa.me/18005552872?text=Hello%20AURA%20Studio,%20I%20would%20like%20to%20inquire%20about%20detailing%20my%20vehicle."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_10px_25px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.45)] transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Instant WhatsApp Concierge</span>
                </a>
              </div>

            </div>

            {/* Privacy & Guarantee Card */}
            <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-sky-600 shrink-0" />
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Your vehicle and personal contact details are kept strictly confidential. We provide fully insured white-glove enclosed valet pickup and dropoff.
              </p>
            </div>

          </div>

          {/* RIGHT: LUXURY CONTACT FORM WITH FLOWING WATER BORDER ANIMATION */}
          <div className="lg:col-span-7">
            
            <div
              ref={formCardRef}
              className="relative bg-white/95 backdrop-blur-2xl rounded-[32px] p-8 sm:p-10 shadow-[0_20px_60px_rgba(31,182,255,0.08)] border border-slate-200/80 overflow-hidden"
            >
              
              {/* FLOWING WATER LINE ANIMATED SVG BORDER */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <rect
                  x="2"
                  y="2"
                  width="99%"
                  height="99%"
                  rx="30"
                  fill="none"
                  stroke="url(#waterGrad)"
                  strokeWidth="3"
                  strokeDasharray="1000"
                  strokeDashoffset={1000 - lineDrawProgress * 1000}
                  className="transition-all duration-300"
                />
                <defs>
                  <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1FB6FF" />
                    <stop offset="50%" stopColor="#26D0CE" />
                    <stop offset="100%" stopColor="#1FB6FF" />
                  </linearGradient>
                </defs>
              </svg>

              {isSubmitted ? (
                /* CONFIRMATION STATE */
                <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-sky-300 text-white flex items-center justify-center shadow-2xl shadow-sky-400/40 animate-bounce">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-[#2F3640]">
                      Reservation Inquiry Received
                    </h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="font-bold text-sky-600">{formData.fullName}</span>. Our Master Concierge team is reviewing your vehicle details for <span className="font-bold text-slate-800">{formData.serviceRequested}</span> and will reach out within 2 hours.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          phone: '',
                          email: '',
                          serviceRequested: 'Exterior Wash',
                          vehicleDetails: '',
                          message: '',
                        });
                      }}
                      className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Submit Another Inky
                    </button>
                  </div>
                </div>
              ) : (
                /* FORM INPUTS */
                <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-2xl font-bold text-[#2F3640]">
                        Service Reservation
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Select your desired service and vehicle specifications.
                      </p>
                    </div>
                    <Droplet className="w-6 h-6 text-sky-500 animate-pulse hidden sm:block" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Lord Alexander Sterling"
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 focus:border-sky-400 focus:bg-white focus:outline-none text-slate-800 text-sm font-medium transition-all"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 focus:border-sky-400 focus:bg-white focus:outline-none text-slate-800 text-sm font-medium transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alexander@domain.com"
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 focus:border-sky-400 focus:bg-white focus:outline-none text-slate-800 text-sm font-medium transition-all"
                      />
                    </div>

                    {/* Desired Service */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                        Service Requested *
                      </label>
                      <select
                        name="serviceRequested"
                        value={formData.serviceRequested}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 focus:border-sky-400 focus:bg-white focus:outline-none text-slate-800 text-sm font-medium transition-all cursor-pointer"
                      >
                        <option value="Exterior Wash">Exterior Wash (Deionized Hydro-Wash)</option>
                        <option value="Interior Detailing">Interior Detailing (Swissvax Cabin)</option>
                        <option value="Ceramic Coating">Ceramic Coating (9H Silica Matrix)</option>
                        <option value="Paint Protection">Paint Protection (Self-Healing Film)</option>
                        <option value="Engine Bay Cleaning">Engine Bay Cleaning (Surgical Detail)</option>
                        <option value="Headlight Restoration">Headlight Restoration (Optical Lens)</option>
                      </select>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                      Vehicle Year, Make & Model
                    </label>
                    <input
                      type="text"
                      name="vehicleDetails"
                      value={formData.vehicleDetails}
                      onChange={handleChange}
                      placeholder="e.g. 2024 Porsche 911 GT3 RS (Chalk White)"
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 focus:border-sky-400 focus:bg-white focus:outline-none text-slate-800 text-sm font-medium transition-all"
                    />
                  </div>

                  {/* Special Requests / Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                      Specific Paint / Leather Concerns
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Mention any specific swirl marks, leather scuffs, or preferred dropoff timeline..."
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 focus:border-sky-400 focus:bg-white focus:outline-none text-slate-800 text-sm font-medium transition-all resize-none"
                    />
                  </div>

                  {/* LUXURY SUBMIT BUTTON WITH RIPPLE & DROPLET FALL ANIMATION */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleBtnClick}
                      className="relative w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-white font-bold text-xs uppercase tracking-wider overflow-hidden shadow-[0_12px_30px_rgba(31,182,255,0.35)] hover:shadow-[0_18px_40px_rgba(31,182,255,0.5)] transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-3"
                    >
                      {/* Click Ripple Effect */}
                      {btnRipple && (
                        <span
                          className="absolute bg-white/40 rounded-full animate-ping pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                          style={{
                            left: btnRipple.x,
                            top: btnRipple.y,
                            width: '120px',
                            height: '120px',
                          }}
                        />
                      )}

                      {/* Small Falling Water Droplet Animation */}
                      <span className="absolute top-0 animate-bounce">
                        <Droplet className="w-3.5 h-3.5 text-cyan-200" />
                      </span>

                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing Reservation...</span>
                        </div>
                      ) : (
                        <span className="relative z-10 flex items-center gap-2">
                          <Send className="w-4 h-4 text-cyan-100" />
                          <span>Request Booking</span>
                        </span>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

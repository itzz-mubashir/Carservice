import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { WaterBackgroundCanvas } from './components/WaterBackgroundCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>('');

  const handleBookService = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForBooking(serviceName);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactEl.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleExploreServices = () => {
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = servicesEl.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-[#2F3640] selection:bg-cyan-200 selection:text-sky-900 font-sans relative overflow-x-hidden">
      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Subtle Ambient Liquid Canvas Background */}
      <WaterBackgroundCanvas />

      {/* Sticky Glass Navbar */}
      <Navbar onBookClick={handleBookService} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection
          onBookClick={handleBookService}
          onExploreClick={handleExploreServices}
        />

        <ServicesSection onBookService={handleBookService} />

        <BeforeAfterSection />

        <WhyChooseUsSection />

        <ProcessTimeline />

        <ReviewsSection />

        <ContactSection preselectedService={selectedServiceForBooking} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

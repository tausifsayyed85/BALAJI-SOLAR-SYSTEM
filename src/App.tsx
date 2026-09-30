import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { LoadingScreen } from './components/common/LoadingScreen';
import { Toast } from './components/common/Toast';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileStickyBar } from './components/layout/MobileStickyBar';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { ScrollJourneyLine } from './components/common/ScrollJourneyLine';
import { useScrollReveal } from './hooks/useScrollReveal';

import { HeroSection } from './components/sections/HeroSection';
import { TrustBar } from './components/sections/TrustBar';
import { AboutSection } from './components/sections/AboutSection';
import { WhySolarSection } from './components/sections/WhySolarSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { SolarSolutionsSection } from './components/sections/SolarSolutionsSection';
import { TataPowerSection } from './components/sections/TataPowerSection';
import { ProductsSection } from './components/sections/ProductsSection';
import { PackagesSection } from './components/sections/PackagesSection';
import { CalculatorSection } from './components/sections/CalculatorSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { SafetySection } from './components/sections/SafetySection';
import { WhyBalajiSection } from './components/sections/WhyBalajiSection';
import { ProjectGallerySection } from './components/sections/ProjectGallerySection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { EducationalSection } from './components/sections/EducationalSection';
import { FaqSection } from './components/sections/FaqSection';
import { ContactSection } from './components/sections/ContactSection';
import { FinalCtaSection } from './components/sections/FinalCtaSection';

import { QuoteModal } from './components/modals/QuoteModal';
import { PackageDetailModal } from './components/modals/PackageDetailModal';
import { ArticleModal } from './components/modals/ArticleModal';
import { AdminCmsModal } from './components/modals/AdminCmsModal';
import { LegalModal } from './components/modals/LegalModal';

export default function App() {
  const [loading, setLoading] = useState(true);
  useScrollReveal();

  return (
    <AppProvider>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Sticky Premium Header */}
        <Header />

        {/* Animated Scroll Journey Progress Line */}
        <ScrollJourneyLine />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Cinematic Hero */}
          <HeroSection />

          {/* 2. Trust Indicators */}
          <TrustBar />

          {/* 3. About Balaji Solar Systems */}
          <AboutSection />

          {/* 4. Why Invest in Solar */}
          <WhySolarSection />

          {/* 5. Solar Solutions */}
          <SolarSolutionsSection />

          {/* 6. How Rooftop Solar Works */}
          <HowItWorksSection />

          {/* 7. Tata Power Solar Solutions */}
          <TataPowerSection />

          {/* 8. Products & Components Catalogue */}
          <ProductsSection />

          {/* 9. Solar Quotation Packages & Comparison */}
          <PackagesSection />

          {/* 10. Solar Quote Calculator */}
          <CalculatorSection />

          {/* 11. Safety & Engineering Rigor */}
          <SafetySection />

          {/* 12. 12-Step Installation Process */}
          <ProcessSection />

          {/* 13. Why Choose Balaji Solar Systems */}
          <WhyBalajiSection />

          {/* 14. Solar Project Gallery */}
          <ProjectGallerySection />

          {/* 15. Customer Testimonials Policy */}
          <TestimonialsSection />

          {/* 16. Educational Solar Knowledge Base */}
          <EducationalSection />

          {/* 17. Multilingual FAQ */}
          <FaqSection />

          {/* 18. Contact & Lead Consultation */}
          <ContactSection />

          {/* 19. Final Sunset CTA */}
          <FinalCtaSection />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Mobile Sticky Bottom CTA Bar */}
        <MobileStickyBar />

        {/* Desktop Floating WhatsApp Button */}
        <FloatingWhatsApp />

        {/* Dynamic Modals */}
        <QuoteModal />
        <PackageDetailModal />
        <ArticleModal />
        <AdminCmsModal />
        <LegalModal />

        {/* Toast Notifications */}
        <Toast />
      </div>
    </AppProvider>
  );
}

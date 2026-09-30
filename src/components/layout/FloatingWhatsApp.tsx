import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { businessSettings, language } = useApp();
  const [shouldBounce, setShouldBounce] = useState(false);

  // Trigger subtle bounce after 5 seconds of page load to draw user attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldBounce(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const waMessages = {
    en: "Hello Balaji Solar Systems, I am interested in a rooftop solar system. Please help me with a quotation.",
    hi: "नमस्ते Balaji Solar Systems, मुझे रूफटॉप सोलर सिस्टम में रुचि है। कृपया मुझे कोटेशन के बारे में जानकारी दें।",
    mr: "नमस्कार Balaji Solar Systems, मला रूफटॉप सोलर सिस्टममध्ये स्वारस्य आहे. कृपया मला कोटेशनची माहिती द्या.",
  };

  /**
   * Analytics event tracker for WhatsApp button engagement
   */
  const trackWhatsAppClick = (source: string) => {
    const eventPayload = {
      event_name: 'whatsapp_engagement_click',
      source,
      channel: 'floating_button',
      language,
      phone_target: businessSettings.whatsapp,
      timestamp: new Date().toISOString(),
      was_bouncing: shouldBounce,
      page_url: window.location.href,
      page_title: document.title,
    };

    // 1. Structured Console Logging for Real-Time Monitoring & Debugging
    console.group('%c[Analytics Event: WhatsApp Engagement Click]', 'color: #10b981; font-weight: bold;');
    console.log('Event Details:', eventPayload);
    console.log('Recipient:', `+91 ${businessSettings.whatsapp}`);
    console.log('Pre-filled Message:', waMessages[language]);
    console.groupEnd();

    // 2. Dispatch to Google Analytics / GTM if available on window
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'Engagement',
        event_label: `Floating WhatsApp Button (${language})`,
        value: 1,
        ...eventPayload,
      });
    }

    // 3. Dispatch to standard DataLayer if available
    if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push(eventPayload);
    }

    // 4. Dispatch a custom browser event for any listener or observability service
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('analytics:whatsapp_click', {
          detail: eventPayload,
        })
      );
    }
  };

  const openWhatsApp = () => {
    // Log event to analytics tracker
    trackWhatsAppClick('floating_desktop_widget');

    const text = encodeURIComponent(waMessages[language]);
    window.open(`https://wa.me/91${businessSettings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block group">
      <div className="relative">
        {/* Subtle glow / ping animation indicator when bouncing */}
        {shouldBounce && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
          </span>
        )}

        <button
          onClick={openWhatsApp}
          className={`flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
            shouldBounce ? 'animate-subtle-bounce' : ''
          }`}
          title="Chat with Balaji Solar Systems on WhatsApp"
          aria-label="Chat on WhatsApp (Click to start conversation)"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="tracking-wide">Chat on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};

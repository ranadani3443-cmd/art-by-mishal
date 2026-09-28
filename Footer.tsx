import React from 'react';
import { ArrowUp, Sliders } from 'lucide-react';
import { SiteContent } from '../types/art';

interface FooterProps {
  currentLang: 'EN' | 'UR';
  siteContent: SiteContent;
  onOpenCommission: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  siteContent,
  onOpenCommission,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#1C1B1A] text-white pt-16 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 sm:pb-16 border-b border-white/10 gap-6 sm:gap-8">
          <div>
            <span className="font-sans-gallery text-[10px] uppercase tracking-[0.28em] text-[#D4AF37] font-semibold block mb-2">
              Contemporary Art Atelier &amp; Gallery
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight">
              {siteContent.brandName}
            </h2>
            <p className="font-sans-gallery text-xs sm:text-sm text-white/60 uppercase tracking-[0.2em] mt-2">
              {siteContent.brandTagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenAdmin}
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-sans-gallery uppercase tracking-[0.14em] font-medium transition-all border border-white/15 flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Studio Admin</span>
            </button>
            <button
              onClick={onOpenCommission}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#B89B67] hover:bg-[#D4AF37] text-[#202020] text-xs font-sans-gallery uppercase tracking-[0.16em] font-semibold transition-all shadow-md active:scale-95"
            >
              Commission Bespoke Piece
            </button>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-Column Studio Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-white/10 text-xs font-sans-gallery text-white/70">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1.5 sm:mb-2">
              Atelier Coordinates
            </span>
            <p className="leading-relaxed">
              {siteContent.contactInfo.locations}
              <br />
              Private viewings arranged strictly through curatorial appointment.
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1.5 sm:mb-2">
              Provenance &amp; Certification
            </span>
            <p className="leading-relaxed">
              All physical canvases are registered in the Mishal Studio Ledger, verified with archival certificates, NFC microchips, and studio wax seals.
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1.5 sm:mb-2">
              Curatorial Inquiries &amp; WhatsApp
            </span>
            <p className="leading-relaxed">
              {siteContent.contactInfo.email}
              <br />
              Direct Studio Concierge: {siteContent.commissionSettings.whatsappNumber}
            </p>
          </div>
        </div>

        {/* Bottom Legal Note */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-sans-gallery text-white/40 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {siteContent.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <span>Archival Pure Pigments</span>
            <span>·</span>
            <span>24k Florentine Gold</span>
            <span>·</span>
            <span>Belgian Linen</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

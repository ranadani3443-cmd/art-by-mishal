import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { SiteContent } from '../types/art';

interface MeetMishaProps {
  currentLang: 'EN' | 'UR';
  siteContent: SiteContent;
  onOpenCommission: () => void;
}

export const MeetMisha: React.FC<MeetMishaProps> = ({
  currentLang,
  siteContent,
  onOpenCommission,
}) => {
  const [showStoryModal, setShowStoryModal] = useState(false);

  return (
    <section id="about-misha" className="w-full py-16 sm:py-24 md:py-28 px-4 sm:px-8 lg:px-16 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Large Portrait Composition */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -top-8 -left-8 w-60 h-60 bg-[#E9E1D5]/60 rounded-full blur-3xl pointer-events-none" />

            <div
              data-cursor="artwork"
              data-cursor-text="ATELIER"
              className="relative rounded-3xl overflow-hidden glass-card p-2.5 sm:p-3 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_28px_54px_-12px_rgba(32,32,32,0.14)]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#EFECE6]">
                <img
                  src={siteContent.artistProfile.portraitImage}
                  alt={`Portrait of artist ${siteContent.artistProfile.name} in atelier studio with paintbrush and palette`}
                  className="w-full h-full object-cover filter contrast-[0.98] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                />

                {/* Atelier Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/70 shadow-sm flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#B89B67] animate-pulse" />
                  <span className="font-sans-gallery text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-semibold text-[#202020]">
                    Atelier {siteContent.artistProfile.locations}
                  </span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3.5 sm:p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-sans-gallery text-[9px] sm:text-[10px] uppercase tracking-widest text-[#D4AF37] block">
                        Visual Artist &amp; Calligrapher
                      </span>
                      <h4 className="font-display text-lg sm:text-2xl font-normal text-white">
                        {siteContent.artistProfile.name}
                      </h4>
                    </div>
                    <span className="text-[10px] sm:text-xs font-sans-gallery uppercase tracking-widest text-white/70">
                      Pakistan · UK · UAE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Glass Information Panel & Biography */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89B67]" />
              <span className="font-sans-gallery text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#725B38] font-semibold">
                Artist Monograph
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#202020] tracking-tight font-normal leading-[1.1] mb-5 sm:mb-6">
              {currentLang === 'EN' ? `Meet ${siteContent.artistProfile.name}` : `${siteContent.artistProfile.name} کا تعارف`}
            </h2>

            {/* Core statement */}
            <div className="p-4 sm:p-6 rounded-2xl glass-panel border border-white/60 mb-5 sm:mb-6 shadow-sm">
              <p className="font-display text-lg sm:text-2xl text-[#202020] font-normal leading-relaxed">
                “{siteContent.artistProfile.philosophyQuote}”
              </p>
            </div>

            <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm font-sans-gallery text-[#4A4640] leading-relaxed font-light">
              <p>{siteContent.artistProfile.bioParagraph1}</p>
              <p>{siteContent.artistProfile.bioParagraph2}</p>
            </div>

            {/* Studio Metrics */}
            <div className="grid grid-cols-2 gap-4 my-6 sm:my-8 pt-4 sm:pt-6 border-t border-[#202020]/10 text-xs font-sans-gallery">
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#725B38] block">
                  Studio Locations
                </span>
                <span className="font-medium text-[#202020] text-xs sm:text-sm mt-0.5 block">
                  {siteContent.artistProfile.locations}
                </span>
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#725B38] block">
                  Private Collections
                </span>
                <span className="font-medium text-[#202020] text-xs sm:text-sm mt-0.5 block">
                  {siteContent.artistProfile.holdingsCount}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => setShowStoryModal(true)}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#202020] text-white hover:bg-[#3D322A] text-xs font-sans-gallery uppercase tracking-[0.16em] font-semibold transition-all shadow-md active:scale-95"
              >
                <span>Discover Her Story</span>
                <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={onOpenCommission}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/80 border border-black/10 text-[#202020] hover:bg-[#F4F0E8] text-xs font-sans-gallery uppercase tracking-[0.14em] font-medium transition-all"
              >
                Consult Studio Concierge
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-md"
            onClick={() => setShowStoryModal(false)}
          />

          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#FAF9F6] border border-white/60 p-5 sm:p-8 md:p-10 shadow-2xl z-10 no-scrollbar text-[#202020]">
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#202020]/10">
              <div>
                <span className="font-sans-gallery text-[10px] uppercase tracking-[0.24em] text-[#725B38] font-semibold">
                  Curatorial Monograph
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-[#202020] font-normal mt-1">
                  {siteContent.artistProfile.name}'s Creative Journey
                </h3>
              </div>
              <button
                onClick={() => setShowStoryModal(false)}
                className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-[#202020] hover:bg-black/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-6 space-y-5 text-xs sm:text-sm font-sans-gallery text-[#4A4640] leading-relaxed font-light">
              <div>
                <h4 className="font-display text-lg sm:text-xl text-[#202020] mb-1.5 font-normal">
                  The Sanctuary of Ink &amp; Wasli
                </h4>
                <p>
                  Immersed in Persian and Urdu poetry since early childhood, {siteContent.artistProfile.name} began hand-carving bamboo reed pens in Lahore, mastering the slow alchemy of walnut gall inks, handmade wasli papers, and 24-karat gold leaf illumination.
                </p>
              </div>

              <div>
                <h4 className="font-display text-lg sm:text-xl text-[#202020] mb-1.5 font-normal">
                  Contemporary Dialogues &amp; Tectonic Scale
                </h4>
                <p>
                  Her transition from manuscript vellums to monumental Belgian canvases allowed her to explore raw terrestrial textures: burnt sienna, riverbed ochres, powdered quartz, and luminous calligraphic cadences.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4F0E8] border border-black/5 flex items-center justify-between">
                <span className="text-xs font-sans-gallery font-medium text-[#202020]">
                  Strictly limited to 6 private commissions annually
                </span>
                <button
                  onClick={() => {
                    setShowStoryModal(false);
                    onOpenCommission();
                  }}
                  className="px-4 py-1.5 rounded-full bg-[#202020] text-white text-[10px] font-sans-gallery uppercase tracking-wider font-semibold"
                >
                  Commission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

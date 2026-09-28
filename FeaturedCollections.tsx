import React, { useState, useRef } from 'react';
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Collection } from '../types/art';

interface FeaturedCollectionsProps {
  collections: Collection[];
  onSelectCollection: (collection: Collection) => void;
  currentLang: 'EN' | 'UR';
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  collections,
  onSelectCollection,
  currentLang,
}) => {
  const [activeCycleIndex, setActiveCycleIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, clientWidth } = trackRef.current;
    const itemWidth = clientWidth * 0.84 + 16;
    const idx = Math.round(scrollLeft / itemWidth);
    setActiveCycleIndex(Math.min(Math.max(idx, 0), collections.length - 1));
  };

  const scrollToCycle = (idx: number) => {
    if (!trackRef.current) return;
    const targetIdx = Math.min(Math.max(idx, 0), collections.length - 1);
    const itemWidth = trackRef.current.clientWidth * 0.84 + 16;
    trackRef.current.scrollTo({
      left: targetIdx * itemWidth,
      behavior: 'smooth',
    });
    setActiveCycleIndex(targetIdx);
  };

  return (
    <section id="collections" className="w-full py-20 sm:py-28 px-4 sm:px-10 lg:px-16 bg-[#F4F0E8] relative">
      <div className="max-w-7xl mx-auto">
        {/* Curatorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#202020]/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89B67]" />
              <span className="font-sans-gallery text-[11px] uppercase tracking-[0.24em] text-[#725B38] font-semibold">
                Major Series
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#202020] tracking-tight font-normal">
              {currentLang === 'EN' ? 'The Collection' : 'فن پاروں کے مجموعے'}
            </h2>
          </div>
          <p className="font-sans-gallery text-sm text-[#4A4640] max-w-sm mt-4 md:mt-0 font-light leading-relaxed">
            {currentLang === 'EN'
              ? 'Three distinct creative cycles examining earthly matter, spiritual scripts, and transcendent pigments.'
              : 'تین منفرد سلسلوں پر مشتمل شاہکاروں کی عمیق نمائش۔'}
          </p>
        </div>

        {/* 3 Major Collection Portfolios with Touch-Swipe Support on Mobile */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-3 gap-6 sm:gap-8 pb-4 no-scrollbar touch-pan-x"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {collections.map((col) => (
            <article
              key={col.id}
              data-cursor="artwork"
              data-cursor-text="REVEAL SERIES"
              onClick={() => onSelectCollection(col)}
              className="group cursor-pointer shrink-0 w-[84vw] max-w-[340px] snap-center lg:w-auto rounded-2xl glass-card overflow-hidden flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_28px_54px_-12px_rgba(32,32,32,0.14)] active:scale-[0.99]"
            >
              {/* Immersive Cover Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFECE6]">
                <img
                  src={col.coverImage}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#B89B67]/0 via-[#B89B67]/10 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Cycle Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-[10px] font-sans-gallery uppercase tracking-[0.2em] font-semibold text-[#202020] shadow-sm">
                  CYCLE {col.cycle}
                </div>

                {/* Works Count Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-sans-gallery uppercase tracking-widest text-white">
                  {col.worksCount} Works
                </div>

                {/* Floating Title on image base */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="font-sans-gallery text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block mb-1">
                    {col.subtitle}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-white group-hover:text-[#F4F0E8] transition-colors">
                    {col.title}
                  </h3>
                  {col.titleUrdu && (
                    <span className="font-nastaliq text-lg text-white/90 block mt-0.5" dir="rtl">
                      {col.titleUrdu}
                    </span>
                  )}
                </div>
              </div>

              {/* Curatorial Card Footer */}
              <div className="p-6 flex flex-col justify-between flex-1 bg-white/80">
                <p className="font-sans-gallery text-xs sm:text-sm text-[#4A4640] leading-relaxed font-light mb-6">
                  {col.description}
                </p>

                <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs font-sans-gallery uppercase tracking-[0.16em] font-semibold text-[#202020] group-hover:text-[#725B38] transition-colors">
                  <span>Explore Collection</span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-black/5 flex items-center justify-center group-hover:bg-[#202020] group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile Swipe Navigation Controls & Dots */}
        <div className="lg:hidden flex flex-col items-center gap-2 mt-4">
          <div className="flex items-center justify-between w-full max-w-[320px] px-2">
            <button
              onClick={() => scrollToCycle(activeCycleIndex - 1)}
              disabled={activeCycleIndex === 0}
              className={`w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-white/70 shadow-xs flex items-center justify-center ${
                activeCycleIndex === 0 ? 'opacity-30 pointer-events-none' : 'text-[#202020] active:scale-90'
              }`}
              aria-label="Previous series"
            >
              <ChevronLeft className="w-4 h-4 text-[#202020]" />
            </button>

            <div className="flex items-center gap-2">
              {collections.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToCycle(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeCycleIndex ? 'w-6 bg-[#B89B67]' : 'w-1.5 bg-black/20'
                  }`}
                  aria-label={`Jump to cycle ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollToCycle(activeCycleIndex + 1)}
              disabled={activeCycleIndex === collections.length - 1}
              className={`w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-white/70 shadow-xs flex items-center justify-center ${
                activeCycleIndex === collections.length - 1 ? 'opacity-30 pointer-events-none' : 'text-[#202020] active:scale-90'
              }`}
              aria-label="Next series"
            >
              <ChevronRight className="w-4 h-4 text-[#202020]" />
            </button>
          </div>

          <div className="flex items-center gap-1 text-[9px] uppercase font-sans-gallery tracking-widest text-[#725B38]/80 font-medium">
            <ChevronLeft className="w-3 h-3 text-[#B89B67] animate-pulse" />
            <span>Swipe series to explore ({activeCycleIndex + 1} of {collections.length})</span>
            <ChevronRight className="w-3 h-3 text-[#B89B67] animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useRef } from 'react';
import { ArrowUpRight, Filter, Bookmark, Check, ChevronLeft, ChevronRight, LayoutGrid, Layers } from 'lucide-react';
import { Artwork, ArtworkCategory } from '../types/art';

interface SelectedWorksGalleryProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  currentLang: 'EN' | 'UR';
  savedArtworkIds: string[];
  onToggleSaveArtwork: (id: string) => void;
  onOpenAdmin?: () => void;
}

export const SelectedWorksGallery: React.FC<SelectedWorksGalleryProps> = ({
  artworks,
  onSelectArtwork,
  currentLang,
  savedArtworkIds,
  onToggleSaveArtwork,
  onOpenAdmin,
}) => {
  const [activeCategory, setActiveCategory] = useState<ArtworkCategory>('ALL');
  const [mobileViewMode, setMobileViewMode] = useState<'swipe' | 'grid'>('swipe');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const swipeTrackRef = useRef<HTMLDivElement>(null);

  const categories: ArtworkCategory[] = [
    'ALL',
    'PAINTINGS',
    'CALLIGRAPHY',
    'ABSTRACT',
    'PORTRAITS',
    'CUSTOM ART',
  ];

  const categoryLabelsUrdu: Record<ArtworkCategory, string> = {
    ALL: 'تمام فن پارے',
    PAINTINGS: 'تصاویر و مناظر',
    CALLIGRAPHY: 'خطاطی و کلام',
    ABSTRACT: 'تجریدی فن',
    PORTRAITS: 'شبیہہ',
    'CUSTOM ART': 'فرمائشی آرٹ',
  };

  const filteredArtworks =
    activeCategory === 'ALL'
      ? artworks
      : artworks.filter((item) => {
          if (activeCategory === 'PAINTINGS') return item.category === 'PAINTINGS';
          if (activeCategory === 'CALLIGRAPHY') return item.category === 'CALLIGRAPHY';
          if (activeCategory === 'ABSTRACT') return item.category === 'ABSTRACT';
          if (activeCategory === 'PORTRAITS') return item.category === 'PORTRAITS';
          if (activeCategory === 'CUSTOM ART') return item.category === 'CUSTOM ART';
          return true;
        });

  // Handle mobile swipe track scroll and snap calculation
  const handleSwipeScroll = () => {
    if (!swipeTrackRef.current) return;
    const { scrollLeft, clientWidth } = swipeTrackRef.current;
    const cardStep = clientWidth * 0.84 + 16;
    const index = Math.round(scrollLeft / cardStep);
    setActiveCardIndex(Math.min(Math.max(index, 0), filteredArtworks.length - 1));
  };

  const scrollToCard = (index: number) => {
    if (!swipeTrackRef.current) return;
    const targetIdx = Math.min(Math.max(index, 0), filteredArtworks.length - 1);
    const cardStep = swipeTrackRef.current.clientWidth * 0.84 + 16;
    swipeTrackRef.current.scrollTo({
      left: targetIdx * cardStep,
      behavior: 'smooth',
    });
    setActiveCardIndex(targetIdx);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(15);
      } catch (e) {}
    }
  };

  return (
    <section id="selected-works" className="w-full py-16 sm:py-24 md:py-28 px-4 sm:px-8 lg:px-16 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto">
        {/* Curatorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 pb-6 border-b border-[#202020]/10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89B67]" />
              <span className="font-sans-gallery text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#725B38] font-semibold">
                Curated Exhibition &amp; Acquisitions
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#202020] tracking-[-0.02em] font-normal leading-[1.1]">
              {currentLang === 'EN' ? 'Selected Works' : 'منتخب شاہکار'}
            </h2>
            <p className="font-sans-gallery text-xs sm:text-sm md:text-base text-[#4A4640] mt-2 sm:mt-3 font-light leading-relaxed max-w-xl">
              {currentLang === 'EN'
                ? 'An archive of tactile oil impastos, unprimed linen landscapes, and illuminated calligraphy deconstructions from the atelier.'
                : 'رنگ، مٹی اور مقدس رسم الخط کے ملاپ سے تراشے گئے منتخب شاہکار۔'}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3 text-[11px] sm:text-xs font-sans-gallery tracking-widest text-[#725B38] uppercase">
            <span>{filteredArtworks.length} CANVASES EXHIBITED</span>
            <span>·</span>
            <span>PRICES IN PKR</span>
          </div>
        </div>

        {/* Category Filter GUI: Soft glass pill buttons with horizontal scroll on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 sm:mb-14 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveCardIndex(0);
                  if (swipeTrackRef.current) swipeTrackRef.current.scrollLeft = 0;
                }}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-sans-gallery uppercase tracking-[0.14em] font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#202020] text-white shadow-[0_4px_16px_rgba(32,32,32,0.18)] scale-[1.02]'
                    : 'glass-pill text-[#4A4640] hover:text-[#202020] hover:bg-white/80'
                }`}
              >
                {currentLang === 'EN' ? cat : categoryLabelsUrdu[cat]}
              </button>
            );
          })}
        </div>

        {/* Mobile View Switcher (Touch Swipe Carousel vs Masonry Wall) */}
        <div className="md:hidden flex items-center justify-between mb-6 pb-3 border-b border-[#202020]/10">
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/80 backdrop-blur-md border border-white/70 shadow-xs">
            <button
              onClick={() => setMobileViewMode('swipe')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans-gallery uppercase tracking-[0.14em] font-semibold transition-all ${
                mobileViewMode === 'swipe'
                  ? 'bg-[#202020] text-white shadow-xs'
                  : 'text-[#4A4640] hover:text-[#202020]'
              }`}
            >
              <Layers className="w-3 h-3 text-[#B89B67]" />
              <span>Touch Swipe</span>
            </button>
            <button
              onClick={() => setMobileViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans-gallery uppercase tracking-[0.14em] font-semibold transition-all ${
                mobileViewMode === 'grid'
                  ? 'bg-[#202020] text-white shadow-xs'
                  : 'text-[#4A4640] hover:text-[#202020]'
              }`}
            >
              <LayoutGrid className="w-3 h-3 text-[#B89B67]" />
              <span>Wall Grid</span>
            </button>
          </div>

          <span className="text-[10px] font-sans-gallery uppercase tracking-widest text-[#725B38] font-semibold">
            {filteredArtworks.length} Canvases
          </span>
        </div>

        {/* MOBILE TOUCH-SWIPE CAROUSEL (Visible on mobile when in swipe mode) */}
        {mobileViewMode === 'swipe' && (
          <div className="md:hidden mb-12">
            {/* Horizontal Touch Swipe Track with Native Snapping */}
            <div
              ref={swipeTrackRef}
              onScroll={handleSwipeScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-5 px-1 no-scrollbar touch-pan-x"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {filteredArtworks.map((art) => {
                const isSaved = savedArtworkIds.includes(art.id);
                return (
                  <div
                    key={art.id}
                    className="shrink-0 w-[84vw] max-w-[340px] snap-center select-none active:scale-[0.98] transition-transform duration-200"
                    onClick={() => onSelectArtwork(art)}
                  >
                    <article
                      data-cursor="artwork"
                      data-cursor-text="REVEAL WORK"
                      className="rounded-[20px] p-[8px] glass-card shadow-lg transition-all"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#EFECE6]">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                        {/* Status badge */}
                        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/85 backdrop-blur-md text-[9px] font-sans-gallery tracking-widest uppercase font-semibold text-[#202020] flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              art.status === 'Available' ? 'bg-[#B89B67] animate-pulse' : 'bg-black/30'
                            }`}
                          />
                          <span>{art.status}</span>
                        </div>

                        {/* Bookmark Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSaveArtwork(art.id);
                          }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 backdrop-blur-md text-[#202020] flex items-center justify-center shadow-xs"
                          aria-label="Save to curated list"
                        >
                          {isSaved ? (
                            <Check className="w-3.5 h-3.5 text-[#B89B67]" />
                          ) : (
                            <Bookmark className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Inspect Tag */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#202020] text-[10px] font-sans-gallery uppercase tracking-[0.14em] font-semibold shadow-sm">
                          <span>Inspect</span>
                          <ArrowUpRight className="w-3 h-3 text-[#B89B67]" />
                        </div>
                      </div>

                      <div className="px-2 py-3 flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-sans-gallery text-[9px] uppercase tracking-[0.2em] text-[#725B38] font-semibold">
                            {art.category}
                          </span>
                          <span className="font-sans-gallery text-[10px] text-[#725B38]/80 font-medium">
                            {art.dimensions}
                          </span>
                        </div>
                        <h3 className="font-display text-lg text-[#202020] font-normal truncate">
                          {art.title}
                        </h3>
                        {art.titleUrdu && (
                          <span className="font-nastaliq text-base text-[#725B38] -mt-1 block" dir="rtl">
                            {art.titleUrdu}
                          </span>
                        )}
                        <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-black/5">
                          <span className="font-display text-sm font-semibold text-[#202020]">
                            {art.price}
                          </span>
                          <span className="font-sans-gallery text-[9px] uppercase tracking-wider text-[#B89B67] font-semibold">
                            TAP TO VIEW
                          </span>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>

            {/* Mobile Touch Navigation Controller & Dots */}
            <div className="flex flex-col items-center gap-2 mt-2">
              <div className="flex items-center justify-between w-full max-w-[340px] px-2">
                <button
                  onClick={() => scrollToCard(activeCardIndex - 1)}
                  disabled={activeCardIndex === 0}
                  className={`w-9 h-9 rounded-full bg-white/85 backdrop-blur-md border border-white/70 shadow-xs flex items-center justify-center transition-all ${
                    activeCardIndex === 0 ? 'opacity-30 pointer-events-none' : 'text-[#202020] active:scale-90'
                  }`}
                  aria-label="Previous artwork card"
                >
                  <ChevronLeft className="w-4 h-4 text-[#202020]" />
                </button>

                {/* Interactive Tactile Dot Indicators */}
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-[180px] py-1 no-scrollbar">
                  {filteredArtworks.map((_, i) => {
                    const isDotActive = i === activeCardIndex;
                    return (
                      <button
                        key={i}
                        onClick={() => scrollToCard(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          isDotActive
                            ? 'w-6 bg-[#B89B67]'
                            : 'w-1.5 bg-black/20 hover:bg-black/40'
                        }`}
                        aria-label={`Jump to artwork ${i + 1}`}
                      />
                    );
                  })}
                </div>

                <button
                  onClick={() => scrollToCard(activeCardIndex + 1)}
                  disabled={activeCardIndex === filteredArtworks.length - 1}
                  className={`w-9 h-9 rounded-full bg-white/85 backdrop-blur-md border border-white/70 shadow-xs flex items-center justify-center transition-all ${
                    activeCardIndex === filteredArtworks.length - 1 ? 'opacity-30 pointer-events-none' : 'text-[#202020] active:scale-90'
                  }`}
                  aria-label="Next artwork card"
                >
                  <ChevronRight className="w-4 h-4 text-[#202020]" />
                </button>
              </div>

              {/* Swipe Guidance Cue */}
              <div className="flex items-center gap-1 text-[9px] uppercase font-sans-gallery tracking-widest text-[#725B38]/80 font-medium">
                <ChevronLeft className="w-3 h-3 text-[#B89B67] animate-pulse" />
                <span>Swipe cards to navigate ({activeCardIndex + 1} of {filteredArtworks.length})</span>
                <ChevronRight className="w-3 h-3 text-[#B89B67] animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Editorial Masonry Wall Layout (Desktop default, or mobile grid mode) */}
        <div
          className={`${
            mobileViewMode === 'swipe' ? 'hidden md:grid' : 'grid'
          } grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-start`}
        >
          {filteredArtworks.map((art) => {
            const isSaved = savedArtworkIds.includes(art.id);

            // Determine layout column spans
            let colSpan = 'lg:col-span-6';
            let aspectClass = 'aspect-[4/3]';

            if (art.layoutRatio === 'large') {
              colSpan = 'lg:col-span-7';
              aspectClass = 'aspect-[3/4]';
            } else if (art.layoutRatio === 'tall') {
              colSpan = 'lg:col-span-5';
              aspectClass = 'aspect-[3/4]';
            } else if (art.layoutRatio === 'wide') {
              colSpan = 'lg:col-span-8';
              aspectClass = 'aspect-[16/10]';
            } else if (art.layoutRatio === 'square') {
              colSpan = 'lg:col-span-4';
              aspectClass = 'aspect-square';
            }

            return (
              <div
                key={art.id}
                className={`${colSpan} group cursor-pointer`}
                onClick={() => onSelectArtwork(art)}
              >
                {/* Artwork Card with Cursor Reveal Attribute */}
                <article
                  data-cursor="artwork"
                  data-cursor-text="REVEAL WORK"
                  className="rounded-[20px] p-[8px] sm:p-[10px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:shadow-[0_24px_50px_-12px_rgba(32,32,32,0.12)]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.65)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(255, 255, 255, 0.70)',
                    boxShadow: '0 16px 40px -12px rgba(32, 32, 32, 0.08)',
                  }}
                >
                  {/* Artwork Image Container */}
                  <div
                    className={`relative w-full ${aspectClass} overflow-hidden rounded-[14px] bg-[#EFECE6]`}
                  >
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      loading="lazy"
                    />

                    {/* Subtle warm reveal sheen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#B89B67]/0 via-[#B89B67]/10 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Status Pip Badge */}
                    <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/70 shadow-sm flex items-center gap-1.5 text-[9px] sm:text-[10px] font-sans-gallery tracking-widest uppercase font-semibold text-[#202020]">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          art.status === 'Available'
                            ? 'bg-[#B89B67] animate-pulse'
                            : 'bg-black/30'
                        }`}
                      />
                      <span>{art.status}</span>
                    </div>

                    {/* Bookmark / Save */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSaveArtwork(art.id);
                      }}
                      className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 backdrop-blur-md text-[#202020] hover:text-[#B89B67] hover:bg-white flex items-center justify-center transition-all duration-300 shadow-sm focus:outline-none"
                      aria-label="Save to curated list"
                    >
                      {isSaved ? (
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B89B67]" />
                      ) : (
                        <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </button>

                    {/* View Artwork Button */}
                    <div className="absolute bottom-3 right-3 sm:bottom-3.5 sm:right-3.5 flex items-center gap-1 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#202020] text-[10px] sm:text-[11px] font-sans-gallery uppercase tracking-[0.14em] font-medium opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-md">
                      <span>View</span>
                      <ArrowUpRight className="w-3 h-3 text-[#B89B67]" />
                    </div>
                  </div>

                  {/* Card Metadata Details */}
                  <div className="px-2 sm:px-3 py-3 sm:py-3.5 flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-sans-gallery text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#725B38] font-semibold">
                        {art.category}
                      </span>
                      <span className="font-sans-gallery text-[10px] sm:text-[11px] text-[#725B38]/80 font-medium">
                        {art.dimensions}
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-2xl text-[#202020] tracking-[-0.01em] font-normal group-hover:text-[#725B38] transition-colors truncate">
                      {art.title}
                    </h3>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5 text-xs font-sans-gallery text-[#4A4640]">
                      <span className="truncate pr-2">{art.year} · {art.medium}</span>
                      <span className="font-semibold text-[#202020] shrink-0 font-display text-sm text-[#725B38]">
                        {art.price || 'P.O.A.'}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

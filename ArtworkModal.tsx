import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Volume2,
  Share2,
  Bookmark,
  Check,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { Artwork } from '../types/art';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onOpenInquiry: (artwork: Artwork) => void;
  onOpenCommission: (prefillMedium?: string) => void;
  currentLang: 'EN' | 'UR';
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({
  artwork,
  onClose,
  onNext,
  onPrev,
  onOpenInquiry,
  onOpenCommission,
  currentLang,
  isSaved,
  onToggleSave,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Mobile Touch Swipe Navigation
  const [touchOffsetX, setTouchOffsetX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    setIsZoomed(false);
    setIsPlayingAudio(false);
    setTouchOffsetX(0);
  }, [artwork?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  // Touch gesture listeners for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isZoomed || e.touches.length !== 1) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || isZoomed || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - touchStartRef.current.x;
    const dy = e.touches[0].clientY - touchStartRef.current.y;

    if (Math.abs(dx) > Math.abs(dy) + 5) {
      setIsSwiping(true);
      setTouchOffsetX(dx * 0.45);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current && !isZoomed) {
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      const dt = Date.now() - touchStartRef.current.time;

      if ((Math.abs(dx) > 38 || (Math.abs(dx) > 20 && dt < 280)) && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
          onNext();
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try { navigator.vibrate(18); } catch (err) {}
          }
        } else {
          onPrev();
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try { navigator.vibrate(18); } catch (err) {}
          }
        }
      }
    }
    setTouchOffsetX(0);
    setIsSwiping(false);
    touchStartRef.current = null;
  };

  if (!artwork) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 animate-in fade-in duration-300">
      {/* Darkened Translucent Museum Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Glassmorphic Modal Window */}
      <div
        className="relative w-full max-w-5xl max-h-[94vh] overflow-y-auto rounded-3xl bg-[#FAF9F6] border border-white/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] flex flex-col z-10 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#202020]/8">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="font-sans-gallery text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#725B38] font-semibold whitespace-nowrap">
              Archival Record
            </span>
            <span className="text-[#202020]/20">/</span>
            <span className="font-sans-gallery text-[11px] text-[#4A4640] tracking-wider uppercase truncate">
              {artwork.code}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onToggleSave(artwork.id)}
              className="p-2 rounded-full hover:bg-black/5 text-[#202020] transition-colors"
              title="Bookmark artwork"
            >
              {isSaved ? (
                <Check className="w-4 h-4 text-[#B89B67]" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-black/5 text-[#202020] transition-colors"
              title="Copy link"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-[#B89B67]" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
            <div className="h-4 w-px bg-black/10 mx-1" />
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 text-[#202020] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1">
          {/* Left: Large Artwork Viewer with Touch-Swipe Support */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            className="lg:col-span-7 bg-[#EFECE6] p-4 sm:p-8 flex flex-col items-center justify-center relative min-h-[300px] sm:min-h-[460px] select-none touch-pan-y"
          >
            <div
              className={`relative overflow-hidden rounded-xl shadow-2xl transition-all duration-300 ease-out cursor-zoom-in ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 max-h-[60vh]'
              }`}
              style={{
                transform: !isZoomed && touchOffsetX !== 0 ? `translateX(${touchOffsetX}px)` : undefined,
                transition: isSwiping ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-contain max-h-[55vh] select-none pointer-events-none"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
                className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-sans-gallery uppercase tracking-[0.14em] flex items-center gap-1.5 shadow-md"
              >
                {isZoomed ? (
                  <>
                    <ZoomOut className="w-3 h-3" />
                    <span>Reset</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-3 h-3" />
                    <span>Inspect</span>
                  </>
                )}
              </button>
            </div>

            {/* Previous / Next Arrow Floaters */}
            <div className="absolute inset-x-2 sm:inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="pointer-events-auto w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/85 backdrop-blur-md border border-white/70 shadow-lg text-[#202020] hover:text-[#B89B67] flex items-center justify-center transition-all active:scale-90"
                aria-label="Previous artwork"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="pointer-events-auto w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/85 backdrop-blur-md border border-white/70 shadow-lg text-[#202020] hover:text-[#B89B67] flex items-center justify-center transition-all active:scale-90"
                aria-label="Next artwork"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Touch Swipe Indicator Guidance */}
            <div className="lg:hidden flex items-center justify-center gap-1.5 mt-3 py-1 px-3 rounded-full bg-black/5 text-[9px] font-sans-gallery uppercase tracking-[0.16em] text-[#725B38] font-medium">
              <ChevronLeft className="w-3 h-3 text-[#B89B67] animate-pulse" />
              <span>Swipe left / right to navigate</span>
              <ChevronRight className="w-3 h-3 text-[#B89B67] animate-pulse" />
            </div>

            <div className="w-full mt-3 hidden sm:flex items-center justify-between text-[10px] font-sans-gallery text-[#725B38] tracking-widest uppercase">
              <span>Art by Mishal Atelier</span>
              <span>Belgian Linen &amp; 24k Gold</span>
            </div>
          </div>

          {/* Right: Curatorial Information Panel */}
          <div className="lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between bg-[#FAF9F6]">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans-gallery text-[10px] uppercase tracking-[0.24em] text-[#725B38] font-semibold">
                  {artwork.category} · {artwork.year}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E9E1D5]/60 text-[10px] font-sans-gallery uppercase tracking-widest text-[#202020] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B89B67]" />
                  {artwork.status}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-display text-2xl sm:text-3xl text-[#202020] tracking-tight font-normal leading-snug">
                {artwork.title}
              </h2>
              {artwork.titleUrdu && (
                <div className="font-nastaliq text-lg sm:text-xl text-[#725B38] mt-1 text-right" dir="rtl">
                  {artwork.titleUrdu}
                </div>
              )}

              {/* Price & Acquisition Strip in PKR */}
              <div className="mt-3 p-3.5 rounded-xl bg-white/80 border border-black/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-sans-gallery uppercase tracking-wider text-[#725B38] block">
                    Pakistani Rupee Price
                  </span>
                  <span className="font-display text-xl sm:text-2xl text-[#202020] font-semibold text-[#725B38]">
                    {artwork.price || 'Price Upon Request'}
                  </span>
                </div>
                <span className="text-[9px] font-sans-gallery uppercase tracking-wider text-[#4A4640]/70 text-right">
                  Insured Pakistan &amp; Global Transit
                </span>
              </div>

              {/* Specifications Definition Grid */}
              <div className="mt-4 space-y-2.5 text-xs font-sans-gallery pb-4 border-b border-[#202020]/10">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-[#725B38]">Medium</span>
                  <span className="text-[#202020] font-medium mt-0.5">{artwork.medium}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-[#725B38]">Dimensions</span>
                  <span className="text-[#202020] font-medium mt-0.5">{artwork.dimensions}</span>
                </div>
                {artwork.provenance && (
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-[#725B38]">Provenance</span>
                    <span className="text-[#4A4640] mt-0.5">{artwork.provenance}</span>
                  </div>
                )}
              </div>

              {/* Curatorial Essay Excerpt */}
              <div className="mt-4">
                <h4 className="font-sans-gallery text-[10px] uppercase tracking-[0.2em] text-[#725B38] font-semibold mb-1">
                  Curatorial Statement
                </h4>
                <p className="text-xs sm:text-sm font-sans-gallery text-[#4A4640] leading-relaxed font-light">
                  {artwork.description}
                </p>
                {artwork.curatorNote && (
                  <blockquote className="mt-2.5 p-3 rounded-lg bg-[#F4F0E8] border-l-2 border-[#B89B67] text-xs font-editorial italic text-[#202020] leading-relaxed">
                    “{artwork.curatorNote}”
                  </blockquote>
                )}
              </div>

              {/* Audio Commentary Module */}
              {artwork.audioGuide && (
                <div className="mt-4 p-3.5 rounded-xl bg-[#F4F0E8]/70 border border-black/5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#B89B67]/20 flex items-center justify-center text-[#725B38]">
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-sans-gallery font-medium text-[#202020]">
                        {artwork.audioGuide.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-sans-gallery text-[#725B38]">
                      {artwork.audioGuide.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={toggleAudio}
                      className="px-3 py-1 rounded-full bg-[#202020] text-white text-[10px] uppercase font-sans-gallery tracking-wider"
                    >
                      {isPlayingAudio ? 'Pause Audio' : 'Play Commentary'}
                    </button>
                    <div className="flex-1 bg-black/10 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-[#B89B67] h-full transition-all duration-300"
                        style={{ width: isPlayingAudio ? '65%' : '15%' }}
                      />
                    </div>
                  </div>

                  {isPlayingAudio && (
                    <p className="text-xs font-editorial italic text-[#4A4640] pt-2 border-t border-black/5 animate-in fade-in">
                      “{artwork.audioGuide.transcript}”
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Direct Collector Action Directives */}
            <div className="mt-6 pt-4 border-t border-[#202020]/10 flex flex-col gap-2">
              <button
                onClick={() => onOpenInquiry(artwork)}
                className="w-full py-3 px-6 rounded-full bg-[#202020] text-white hover:bg-[#3D322A] text-xs font-sans-gallery uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>Enquire About Artwork</span>
              </button>

              <button
                onClick={() => onOpenCommission(artwork.category)}
                className="w-full py-2.5 px-6 rounded-full bg-white border border-black/10 text-[#202020] hover:bg-[#F4F0E8] text-xs font-sans-gallery uppercase tracking-[0.14em] font-medium transition-all"
              >
                Commission Similar Artwork
              </button>

              <div className="flex items-center justify-center gap-1.5 pt-1 text-[10px] font-sans-gallery text-[#725B38]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B89B67]" />
                <span>Certificate of Authenticity Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Sparkles, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Artwork, SiteContent } from '../types/art';

interface WordsAsArtCalligraphyProps {
  calligraphyArtworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  currentLang: 'EN' | 'UR';
  siteContent: SiteContent;
  onOpenCommission: (medium: string) => void;
}

export const WordsAsArtCalligraphy: React.FC<WordsAsArtCalligraphyProps> = ({
  calligraphyArtworks,
  onSelectArtwork,
  currentLang,
  siteContent,
  onOpenCommission,
}) => {
  const [selectedSpecimen, setSelectedSpecimen] = useState<'jali' | 'nastaliq' | 'diwani'>('jali');

  const specimens = {
    jali: {
      title: 'Jali Thuluth (جلی ثلث)',
      quoteUrdu: 'حُسْنُ الْخَطِّ لِسَانُ الْيَدِ',
      translation: '“Beauty of script is the tongue of the hand.” — Classical Canon',
      desc: 'Executed with wide hand-cut bamboo qalam pens up to 25mm in width. The letters carry architectural mass, bold vertical ascenders, and delicate hairline finials.',
      nuqta: '3-Nuqta Rhombic Scale',
      absorption: '0.18mm Wasli Deckle',
    },
    nastaliq: {
      title: 'Lahori Nastaliq (لاہوری نستعلیق)',
      quoteUrdu: 'مقام فیض کوئی راہ میں جچا ہی نہیں',
      translation: '“No stage along the path enticed Faiz...” — Verses of Faiz Ahmad Faiz',
      desc: 'Known as the bride of calligraphic styles. Fluid, hanging curves reminiscent of a bird settling on water, executed in organic walnut gall ink on aged wasli vellum.',
      nuqta: '5-Nuqta Hanging Arc',
      absorption: '0.12mm Aged Vellum',
    },
    diwani: {
      title: 'Diwani Jali Solar (دیوانی جلی)',
      quoteUrdu: 'اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ',
      translation: '“God is the light of the heavens and the earth.” — Surah An-Nur',
      desc: 'Intertwined curvilinear script rendered inside concentric orbital mandalas with suspended 22k shell gold and natural pulverized lapis lazuli pigment.',
      nuqta: 'Concentric Solar Geometry',
      absorption: '0.22mm Indigo Ground',
    },
  };

  const currentSpecimen = specimens[selectedSpecimen];

  return (
    <section id="calligraphy" className="w-full py-16 sm:py-24 md:py-28 px-4 sm:px-8 lg:px-16 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto">
        {/* Curatorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#202020]/10">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89B67]" />
              <span className="font-sans-gallery text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#725B38] font-semibold">
                Sacred &amp; Poetic Scripts
              </span>
            </div>
            <div className="flex items-baseline gap-3 sm:gap-4">
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#202020] tracking-tight font-normal">
                {siteContent.calligraphySection.title}
              </h2>
              <span className="font-nastaliq text-2xl sm:text-4xl text-[#725B38]" dir="rtl">
                خطاطی
              </span>
            </div>
          </div>
          <p className="font-sans-gallery text-xs sm:text-sm text-[#4A4640] max-w-sm mt-3 md:mt-0 font-light leading-relaxed">
            {siteContent.calligraphySection.subtitle}
          </p>
        </div>

        {/* Calligraphy Featured Works Grid (Touch-swipeable on mobile) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-8 sm:mb-20 pb-4 no-scrollbar touch-pan-x">
          {calligraphyArtworks.slice(0, 3).map((art, idx) => (
            <div
              key={art.id}
              className={`shrink-0 w-[84vw] max-w-[340px] snap-center lg:w-auto ${
                idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
              } group cursor-pointer active:scale-[0.99] transition-transform`}
              onClick={() => onSelectArtwork(art)}
            >
              <article
                data-cursor="artwork"
                data-cursor-text="REVEAL SCRIPT"
                className="h-full rounded-2xl glass-card p-3 sm:p-4 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_24px_50px_-12px_rgba(32,32,32,0.12)]"
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-xl bg-[#EFECE6] mb-3 sm:mb-4">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#B89B67]/0 via-[#B89B67]/10 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="absolute top-3 left-3 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/85 backdrop-blur-md text-[9px] sm:text-[10px] font-sans-gallery uppercase tracking-widest text-[#202020] font-semibold">
                    {art.dimensions}
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#202020]/80 backdrop-blur-md text-[#D4AF37] text-[10px] sm:text-xs font-semibold font-display shadow-sm">
                    {art.price}
                  </div>
                </div>

                <div className="flex flex-col justify-between flex-1 px-1 sm:px-2 pb-1 sm:pb-2">
                  <div>
                    <span className="font-sans-gallery text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#725B38] font-semibold">
                      {art.year} · {art.category}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl text-[#202020] font-normal mt-1 truncate">
                      {art.title}
                    </h3>
                    {art.titleUrdu && (
                      <span className="font-nastaliq text-base sm:text-xl text-[#725B38] block mt-1" dir="rtl">
                        {art.titleUrdu}
                      </span>
                    )}
                    <p className="font-sans-gallery text-xs sm:text-sm text-[#4A4640] font-light mt-1.5 line-clamp-2">
                      {art.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-black/5 flex items-center justify-between text-xs font-sans-gallery text-[#725B38] uppercase tracking-wider">
                    <span className="truncate pr-2">{art.medium.split(',')[0]}</span>
                    <span className="font-bold text-[#202020] shrink-0">{art.price || 'Inquiry'}</span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Mobile Touch Swipe Indicator Guidance */}
        <div className="lg:hidden flex items-center justify-center gap-1.5 mb-10 -mt-4 text-[9px] uppercase font-sans-gallery tracking-widest text-[#725B38]/80 font-medium">
          <ChevronLeft className="w-3 h-3 text-[#B89B67] animate-pulse" />
          <span>Swipe script canvases</span>
          <ChevronRight className="w-3 h-3 text-[#B89B67] animate-pulse" />
        </div>

        {/* Interactive Specimen & Qalam (Reed Pen) Anatomical Viewport */}
        <div className="rounded-3xl bg-[#F4F0E8] border border-black/5 p-5 sm:p-8 md:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start justify-between">
            {/* Left: Script Discipline Selector */}
            <div className="max-w-md w-full">
              <span className="font-sans-gallery text-[10px] uppercase tracking-[0.22em] text-[#725B38] font-semibold block mb-2">
                Script Specimen &amp; Tactility
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#202020] font-normal">
                The Anatomy of the Reed (Qalam)
              </h3>
              <p className="font-sans-gallery text-xs sm:text-sm text-[#4A4640] font-light mt-2 leading-relaxed">
                Mishal hand-carves bamboo pens harvested in the Punjab foothills, bevelled at precise 35° angles to balance feather-thin ligatures with rich velvet-black baselines.
              </p>

              {/* Script Mode Tabs */}
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSpecimen('jali')}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-sans-gallery tracking-wider uppercase transition-all ${
                    selectedSpecimen === 'jali'
                      ? 'bg-[#202020] text-white shadow-sm'
                      : 'bg-white/70 text-[#4A4640] hover:bg-white'
                  }`}
                >
                  Jali Thuluth
                </button>
                <button
                  onClick={() => setSelectedSpecimen('nastaliq')}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-sans-gallery tracking-wider uppercase transition-all ${
                    selectedSpecimen === 'nastaliq'
                      ? 'bg-[#202020] text-white shadow-sm'
                      : 'bg-white/70 text-[#4A4640] hover:bg-white'
                  }`}
                >
                  Lahori Nastaliq
                </button>
                <button
                  onClick={() => setSelectedSpecimen('diwani')}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-sans-gallery tracking-wider uppercase transition-all ${
                    selectedSpecimen === 'diwani'
                      ? 'bg-[#202020] text-white shadow-sm'
                      : 'bg-white/70 text-[#4A4640] hover:bg-white'
                  }`}
                >
                  Diwani Jali
                </button>
              </div>

              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => onOpenCommission('Calligraphy')}
                  className="px-5 py-2.5 rounded-full bg-[#202020] text-white hover:bg-[#3D322A] text-xs font-sans-gallery uppercase tracking-[0.14em] font-semibold transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Commission Sacred Calligraphy</span>
                </button>
              </div>
            </div>

            {/* Right: Dynamic Script Visualizer */}
            <div className="w-full lg:max-w-lg rounded-2xl bg-white p-5 sm:p-8 border border-black/5 shadow-sm">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-black/5">
                <span className="font-sans-gallery text-xs uppercase tracking-widest text-[#725B38] font-semibold">
                  {currentSpecimen.title}
                </span>
                <span className="text-[10px] font-sans-gallery uppercase tracking-wider text-black/40">
                  Magnification 8×
                </span>
              </div>

              {/* Arabic / Urdu Calligraphic Display */}
              <div className="my-4 sm:my-6 py-4 sm:py-6 px-3 sm:px-4 bg-[#FAF9F6] rounded-xl border border-black/5 flex flex-col items-center justify-center text-center">
                <p className="font-nastaliq text-xl sm:text-3xl text-[#202020] leading-loose" dir="rtl">
                  {currentSpecimen.quoteUrdu}
                </p>
                <p className="font-editorial italic text-xs sm:text-sm text-[#4A4640] mt-2">
                  {currentSpecimen.translation}
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <p className="font-sans-gallery text-xs text-[#4A4640] leading-relaxed font-light">
                  {currentSpecimen.desc}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-black/5 text-[11px] font-sans-gallery">
                  <div>
                    <span className="text-black/40 uppercase tracking-wider block text-[10px]">
                      Proportional Unit
                    </span>
                    <span className="font-medium text-[#202020] mt-0.5 block">
                      {currentSpecimen.nuqta}
                    </span>
                  </div>
                  <div>
                    <span className="text-black/40 uppercase tracking-wider block text-[10px]">
                      Ink Absorption
                    </span>
                    <span className="font-medium text-[#202020] mt-0.5 block">
                      {currentSpecimen.absorption}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

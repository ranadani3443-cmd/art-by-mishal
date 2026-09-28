import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, ArrowDown } from 'lucide-react';
import { Artwork, SiteContent } from '../types/art';

interface HeroCinematicProps {
  onArtworkClick: (artwork: Artwork) => void;
  featuredArtworks: Artwork[];
  currentLang: 'EN' | 'UR';
  siteContent: SiteContent;
  onHoverArtworkChange?: (isHovering: boolean, text?: string) => void;
}

interface PaintingPair {
  id: string;
  primary: Artwork;
  revealed: Artwork;
}

interface RippleWave {
  x: number;
  y: number;
  born: number;
  maxRadius: number;
  duration: number;
  intensity: number;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({
  onArtworkClick,
  featuredArtworks,
  siteContent,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Featured pair 1: Terracotta Canvas × Sacred Gold Thuluth Calligraphy
  const defaultArt1: Artwork = featuredArtworks[0] || {
    id: 'resonance-in-terracotta',
    code: 'MISHAL-2026-08',
    title: 'Resonance in Terracotta',
    titleUrdu: 'مٹی کی گونج اور خالص سونا',
    category: 'ABSTRACT',
    year: '2026',
    medium: 'Oil, earth pigments & 24k gold leaf on stretched Belgian linen',
    dimensions: '180 × 140 cm',
    image: 'https://lh3.googleusercontent.com/d/19xmN-h2gdaBlGIwnZfz9OpVPjCon5vBG',
    status: 'Museum Exhibition',
    price: 'PKR 850,000',
    description:
      'A seismic meditation on tectonic displacement and spiritual calligraphy, layered through raw burnt sienna, calcified clay, and celestial leaf.',
    curatorNote:
      'Mishal captures the quiet tension between terrestrial stability and transcendent illumination.',
    layoutRatio: 'large',
    collectionId: 'beyond-color',
  };

  const defaultArt2: Artwork = featuredArtworks[2] || {
    id: 'huwal-haq',
    code: 'MISHAL-2026-04',
    title: 'Huwal Haq (He is the Truth)',
    titleUrdu: 'هُوَ الْحَقُّ — نورٌ علَىٰ نور',
    category: 'CALLIGRAPHY',
    year: '2026',
    medium: '24k Florentine gold leaf & charred sumi ink on handmade deckle-edge mulberry paper',
    dimensions: '200 × 150 cm',
    image: 'https://lh3.googleusercontent.com/d/1znWC4nl2GBS1YZSJ_31p4CVa-i-u46_W',
    status: 'Available',
    price: 'PKR 1,250,000',
    description:
      'A monumental calligraphic composition fusing classical Jali Thuluth cadence with explosive gestural abstraction.',
    curatorNote:
      'The sacred verse unfolds not as rigid script, but as architectural architecture of devotion.',
    layoutRatio: 'tall',
    collectionId: 'silent-letters',
  };

  const defaultArt3: Artwork = featuredArtworks[1] || {
    id: 'whispers-of-the-dune',
    code: 'MISHAL-2025-14',
    title: 'Whispering Silt & Dawn',
    titleUrdu: 'صبح کے ریت کی سرگوشی',
    category: 'PAINTINGS',
    year: '2025',
    medium: 'Layered mineral pigments, powdered quartz & sand on raw linen',
    dimensions: '120 × 90 cm',
    image: 'https://lh3.googleusercontent.com/d/12_4RW3HizTxY2bOLQo6O5vVh5PPqZHkj',
    status: 'Available',
    price: 'PKR 480,000',
    description:
      'An ethereal landscape rendered in soft terracotta, dusty rose, and sun-bleached sand tones.',
    curatorNote:
      'Natural mineral pigments gather into ridges like tidal sediment.',
    layoutRatio: 'wide',
    collectionId: 'whispers',
  };

  const defaultArt4: Artwork = featuredArtworks[3] || {
    id: 'breath-across-still-water',
    code: 'MISHAL-2026-03',
    title: 'Breath Across Still Water',
    titleUrdu: 'ساکت پانی پر سانس',
    category: 'ABSTRACT',
    year: '2026',
    medium: 'Chinese ink, shell gold & gum arabic on distressed linen',
    dimensions: '100 × 100 cm',
    image: 'https://lh3.googleusercontent.com/d/1COjWvYt9XL7xb_32Vk4YSkbxHCFyGfvP',
    status: 'Reserved',
    price: 'PKR 380,000',
    description:
      'Monochromatic gestural sweeps executed in meditative intervals.',
    curatorNote:
      'A quiet bridge between Eastern sumi-e tradition and Sufi devotional rhythm.',
    layoutRatio: 'tall',
    collectionId: 'whispers',
  };

  const defaultArt5: Artwork = featuredArtworks[4] || {
    id: 'nur-divine-radiance',
    code: 'MISHAL-2026-11',
    title: 'Nūr (Divine Radiance Mandala)',
    titleUrdu: 'نور — اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ',
    category: 'CALLIGRAPHY',
    year: '2026',
    medium: 'Pure lapis lazuli pigment, cobalt & 24k gold leaf on stretched Belgian linen',
    dimensions: '120 × 120 cm',
    image: 'https://lh3.googleusercontent.com/d/1mJu-D8pMha2phlsTG1J-UmEMX1aH7QdN',
    status: 'Available',
    price: 'PKR 650,000',
    description:
      'Lapis lazuli and incandescent gold leaf reflecting radiant cosmic luminescence.',
    curatorNote:
      'Celestial blues and mineral pigments capturing divine geometry and illumination.',
    layoutRatio: 'square',
    collectionId: 'silent-letters',
  };

  const pairs: PaintingPair[] = [
    {
      id: 'pair-1',
      primary: defaultArt1,
      revealed: defaultArt2,
    },
    {
      id: 'pair-2',
      primary: defaultArt3,
      revealed: defaultArt4,
    },
    {
      id: 'pair-3',
      primary: defaultArt1,
      revealed: defaultArt5,
    },
  ];

  const [activePairIndex, setActivePairIndex] = useState(0);
  const [isInverted, setIsInverted] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [smoothCursor, setSmoothCursor] = useState({ x: -999, y: -999 });
  const [displacementScale, setDisplacementScale] = useState(0);
  const [revealRadius, setRevealRadius] = useState(230);

  const activePair = pairs[activePairIndex];
  const primaryPainting = isInverted ? activePair.revealed : activePair.primary;
  const revealedPainting = isInverted ? activePair.primary : activePair.revealed;

  // Scroll progress for subtle magazine-editorial opacity fade
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const totalHeight = rect.height || window.innerHeight;
      const progress = Math.min(Math.max(scrolled / totalHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ripple waves pool
  const ripplesRef = useRef<RippleWave[]>([]);
  const targetPosRef = useRef({ x: -999, y: -999 });
  const currentPosRef = useRef({ x: -999, y: -999 });
  const lastRipplePosRef = useRef({ x: -999, y: -999 });
  const lastRippleTimeRef = useRef(0);
  const targetDisplacementRef = useRef(0);
  const currentDisplacementRef = useRef(0);
  const targetRadiusRef = useRef(230);
  const currentRadiusRef = useRef(230);

  // Initial center position when container mounts
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      targetPosRef.current = { x: cx, y: cy };
      currentPosRef.current = { x: cx, y: cy };
      setSmoothCursor({ x: cx, y: cy });
    }
  }, []);

  // Spawn organic ripple wave
  const addRipple = (x: number, y: number, intensity = 1.0) => {
    const now = performance.now();
    const dx = x - lastRipplePosRef.current.x;
    const dy = y - lastRipplePosRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Throttle to create pleasant, rhythmic waves rather than noisy clumping
    if (dist < 28 && now - lastRippleTimeRef.current < 110) return;

    lastRipplePosRef.current = { x, y };
    lastRippleTimeRef.current = now;

    const maxR = Math.min(
      Math.max(containerRef.current?.clientWidth || 600, 320) * 0.24,
      190
    );

    ripplesRef.current.push({
      x,
      y,
      born: now,
      maxRadius: maxR,
      duration: 1350,
      intensity: Math.min(Math.max(intensity, 0.4), 1.2),
    });

    if (ripplesRef.current.length > 6) {
      ripplesRef.current.shift();
    }
  };

  // Main Canvas animation & Physics loop
  useEffect(() => {
    let animId: number;

    const renderLoop = (now: number) => {
      // 1. Inertial position smoothing
      if (targetPosRef.current.x !== -999) {
        currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * 0.14;
        currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * 0.14;

        setSmoothCursor({
          x: Math.round(currentPosRef.current.x * 10) / 10,
          y: Math.round(currentPosRef.current.y * 10) / 10,
        });
      }

      // 2. Optical wave displacement damping
      targetDisplacementRef.current *= 0.92;
      if (targetDisplacementRef.current < 0.05) targetDisplacementRef.current = 0;
      currentDisplacementRef.current +=
        (targetDisplacementRef.current - currentDisplacementRef.current) * 0.12;
      setDisplacementScale(Math.round(currentDisplacementRef.current * 100) / 100);

      // 3. Radius breathing
      currentRadiusRef.current +=
        (targetRadiusRef.current - currentRadiusRef.current) * 0.1;
      setRevealRadius(Math.round(currentRadiusRef.current));

      // 4. Render water ripples on 2D canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;

          if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
          }

          ctx.save();
          ctx.scale(dpr, dpr);
          ctx.clearRect(0, 0, width, height);

          // Update & draw ripples
          ripplesRef.current = ripplesRef.current.filter((ripple) => {
            const age = (now - ripple.born) / ripple.duration;
            if (age >= 1) return false;

            // Fluid ease-out expansion curve
            const ease = 1 - Math.pow(1 - age, 2.7);
            const radius = ripple.maxRadius * ease;

            // Sine wave amplitude with exponential decay
            const amp = Math.sin(age * Math.PI) * Math.exp(-age * 2.4) * ripple.intensity;

            if (amp > 0.005) {
              // Primary crest: soft warm ivory refraction
              ctx.beginPath();
              ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(246, 238, 222, ${amp * 0.28})`;
              ctx.lineWidth = 1.6 + age * 2.2;
              ctx.stroke();

              // Subtle trough: soft natural shadow
              if (radius > 12) {
                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, radius - 12, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(16, 14, 12, ${amp * 0.12})`;
                ctx.lineWidth = 1.4;
                ctx.stroke();
              }

              // Secondary harmonic wave: subtle gold shimmer
              if (radius > 26) {
                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, radius - 26, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(212, 175, 55, ${amp * 0.15})`;
                ctx.lineWidth = 1.0;
                ctx.stroke();
              }

              // Soft central water glint
              const glintRadius = Math.max(12, radius * 0.65);
              const grad = ctx.createRadialGradient(
                ripple.x,
                ripple.y,
                0,
                ripple.x,
                ripple.y,
                glintRadius
              );
              grad.addColorStop(0, `rgba(255, 250, 240, ${amp * 0.08})`);
              grad.addColorStop(0.5, `rgba(212, 175, 55, ${amp * 0.03})`);
              grad.addColorStop(1, 'transparent');

              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(ripple.x, ripple.y, glintRadius, 0, Math.PI * 2);
              ctx.fill();
            }

            return true;
          });

          ctx.restore();
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePointerInteraction = (clientX: number, clientY: number, isInitial = false) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Calculate motion delta for subtle displacement
    const dx = x - targetPosRef.current.x;
    const dy = y - targetPosRef.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    targetPosRef.current = { x, y };

    if (!isInteracting) {
      setIsInteracting(true);
      if (isInitial) {
        currentPosRef.current = { x, y };
        setSmoothCursor({ x, y });
      }
    }

    // Modulate displacement & radius gently with touch velocity
    targetDisplacementRef.current = Math.min(3.8, targetDisplacementRef.current + speed * 0.05);
    targetRadiusRef.current = Math.min(270, 220 + speed * 0.6);

    // Emit natural water wave ripples
    addRipple(x, y, isInitial ? 1.1 : Math.min(1.0, 0.5 + speed * 0.02));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handlePointerInteraction(e.clientX, e.clientY);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    handlePointerInteraction(e.clientX, e.clientY, true);
  };

  const handleMouseLeave = () => {
    setIsInteracting(false);
    targetDisplacementRef.current = 0;
    targetRadiusRef.current = 220;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    handlePointerInteraction(touch.clientX, touch.clientY, true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    handlePointerInteraction(touch.clientX, touch.clientY, false);
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
    targetDisplacementRef.current = 0;
    targetRadiusRef.current = 220;
  };

  const handleSwapPaintings = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInverted(!isInverted);
    // Add a gentle ripple at center when swapping
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      addRipple(rect.width / 2, rect.height / 2, 1.2);
    }
  };

  const scrollToGallery = () => {
    const el = document.getElementById('selected-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero-experience"
      data-hero-experience="true"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[90vh] sm:h-[94vh] min-h-[580px] max-h-[1050px] bg-[#141210] overflow-hidden select-none cursor-default touch-none"
    >
      {/* ========================================================================= */}
      {/* SVG FILTER: GENTLE ORGANIC WATER / PAPER DISPLACEMENT                      */}
      {/* ========================================================================= */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="water-touch-distortion" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.024 0.038"
              numOctaves="2"
              result="waveNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="waveNoise"
              scale={displacementScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ========================================================================= */}
      {/* LAYER 1: BASE FULL-BLEED PAINTING (NO FRAMES, NO BORDERS, NO MARGINS)     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          src={primaryPainting.image}
          alt={primaryPainting.title}
          className="w-full h-full object-cover object-center scale-[1.01]"
          loading="eager"
        />
        {/* Subtle tonal gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/40 pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 2: REVEALED PAINTING (SOFT FEATHERED ORGANIC WATER-TOUCH REVEAL)    */}
      {/* NO HARD CIRCLES, NO RINGS — SOFT GRADIENT DISSIPATION LIKE WATER/PAPER    */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden transition-opacity duration-500 ease-out"
        style={{
          maskImage: `radial-gradient(circle ${revealRadius}px at ${smoothCursor.x}px ${smoothCursor.y}px, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.84) 28%, rgba(0,0,0,0.50) 56%, rgba(0,0,0,0.12) 80%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${revealRadius}px at ${smoothCursor.x}px ${smoothCursor.y}px, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.84) 28%, rgba(0,0,0,0.50) 56%, rgba(0,0,0,0.12) 80%, transparent 100%)`,
          opacity: isInteracting ? 1 : 0.65,
          filter: displacementScale > 0.08 ? 'url(#water-touch-distortion)' : undefined,
        }}
      >
        <img
          src={revealedPainting.image}
          alt={revealedPainting.title}
          className="w-full h-full object-cover object-center scale-[1.01]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 3: INTERACTIVE WATER RIPPLE / WAVE CANVAS (DELICATE, LIGHTWEIGHT)  */}
      {/* ========================================================================= */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* ========================================================================= */}
      {/* REFINED, MINIMAL EDITORIAL OVERLAY                                        */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 md:p-14 pointer-events-none">
        {/* TOP: Clean & Discreet Switcher */}
        <div
          className="flex items-center justify-end pointer-events-auto transition-opacity duration-300"
          style={{
            opacity: Math.max(0.3, 1 - scrollProgress * 1.5),
          }}
        >
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-xs text-white shadow-lg">
            <button
              onClick={() => setActivePairIndex(activePairIndex === 0 ? 1 : 0)}
              className="text-[11px] font-playfair uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors"
            >
              Pair 0{activePairIndex + 1}
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={handleSwapPaintings}
              className="flex items-center gap-1.5 text-[11px] font-playfair uppercase tracking-[0.16em] text-[#D4AF37] hover:text-white transition-colors"
              title="Invert paintings"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Swap</span>
            </button>
          </div>
        </div>

        {/* CENTER: Elegant, Iconic Printed Masthead */}
        <div
          className="flex flex-col items-center justify-center text-center my-auto px-4 max-w-4xl mx-auto transition-transform duration-200 ease-out"
          style={{
            transform: `translateY(-${scrollProgress * 30}px)`,
          }}
        >
          <h1
            className="font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-normal tracking-[0.18em] sm:tracking-[0.24em] lg:tracking-[0.28em] uppercase leading-[1.05] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] transition-opacity duration-300 ease-out"
            style={{ opacity: Math.max(0.15, 1 - scrollProgress * 1.4) }}
          >
            {siteContent.heroWordmark || 'ART BY MISHAL'}
          </h1>

          <p
            className="font-playfair italic text-sm sm:text-lg md:text-xl text-[#F4E8D1]/90 tracking-[0.14em] uppercase font-light mt-3 sm:mt-4 drop-shadow-md transition-opacity duration-300 ease-out"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 1.8) }}
          >
            Contemporary Painter &amp; Calligrapher
          </p>
        </div>

        {/* BOTTOM: Minimal Quiet Artwork Caption & Scroll Down */}
        <div
          className="flex items-center justify-between text-white/80 text-xs pointer-events-auto border-t border-white/10 pt-4 transition-opacity duration-300"
          style={{
            opacity: Math.max(0.2, 1 - scrollProgress * 1.2),
          }}
        >
          {/* Subtle Artwork Caption */}
          <div
            onClick={() => onArtworkClick(primaryPainting)}
            className="cursor-pointer hover:text-white transition-colors font-playfair text-[11px] sm:text-xs tracking-[0.14em] uppercase"
          >
            <span className="text-white/60">Canvas: </span>
            <span className="text-[#D4AF37]">{primaryPainting.title}</span>
            <span className="hidden sm:inline text-white/40"> · {revealedPainting.title}</span>
          </div>

          {/* Minimal Scroll Down Prompt */}
          <button
            onClick={scrollToGallery}
            className="flex items-center gap-1.5 font-playfair text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <span>Explore Works</span>
            <ArrowDown className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  );
};

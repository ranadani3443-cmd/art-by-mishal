import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Eye } from 'lucide-react';

interface CustomCursorProps {
  cursorText?: string;
  isHoveringArtwork?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  cursorText = 'REVEAL WORK',
  isHoveringArtwork = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [hoverType, setHoverType] = useState<'default' | 'artwork' | 'interactive'>('default');
  const [activeText, setActiveText] = useState(cursorText);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Direct mouse coordinates (zero latency)
  const mousePosRef = useRef({ x: -100, y: -100 });
  // Lerped smooth coordinates for trailing reveal ring and spotlight
  const smoothPosRef = useRef({ x: -100, y: -100 });

  // DOM node references for direct 60/120fps GPU transform updates
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Sync prop changes
  useEffect(() => {
    if (isHoveringArtwork) {
      setHoverType('artwork');
      setActiveText(cursorText || 'REVEAL WORK');
    } else if (hoverType === 'artwork') {
      setHoverType('default');
    }
  }, [isHoveringArtwork, cursorText]);

  useEffect(() => {
    // Disable completely on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    let isRunning = true;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      if (!visible) {
        setVisible(true);
        smoothPosRef.current = { x: e.clientX, y: e.clientY };
      }

      // Update precision dot immediately on GPU thread
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Global listener to detect hoverable artwork cards, images, buttons, and links
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Inside the hero section, keep cursor minimal and never show large circular inspection lens
      const heroEl = target.closest('#hero-experience, [data-hero-experience="true"]');
      if (heroEl) {
        setHoverType('default');
        return;
      }

      const artworkEl = target.closest(
        '[data-cursor="artwork"], article, .group\\/artwork, [data-artwork-card="true"]'
      );
      const interactiveEl = target.closest(
        'button, a, input, select, textarea, [role="button"], .cursor-pointer'
      );

      if (artworkEl) {
        setHoverType('artwork');
        const customLabel =
          artworkEl.getAttribute('data-cursor-text') || cursorText || 'REVEAL WORK';
        setActiveText(customLabel);
      } else if (interactiveEl && !artworkEl) {
        setHoverType('interactive');
      } else {
        setHoverType('default');
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);

      // Remove after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);
    };

    // Smooth Lerp loop for trailing ring and gallery reveal spotlight
    const renderLoop = () => {
      if (!isRunning) return;

      const targetX = mousePosRef.current.x;
      const targetY = mousePosRef.current.y;

      // Linear interpolation with damping factor (0.16) for butter-smooth inertia
      const dx = targetX - smoothPosRef.current.x;
      const dy = targetY - smoothPosRef.current.y;

      smoothPosRef.current.x += dx * 0.16;
      smoothPosRef.current.y += dy * 0.16;

      const curX = smoothPosRef.current.x;
      const curY = smoothPosRef.current.y;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(420px circle at ${curX}px ${curY}px, rgba(212, 175, 55, 0.08) 0%, rgba(184, 155, 103, 0.035) 45%, transparent 75%)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    animId = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [visible, cursorText]);

  if (isTouch) return null;

  return (
    <>
      {/* 1. ATMOSPHERIC GALLERY CURSOR REVEAL SPOTLIGHT
          Cast a soft, warm radial luminescence over background surfaces and canvases */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-700 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 2. CLICK REVEAL RIPPLES */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 animate-ripple-reveal pointer-events-none"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* 3. SHARP PRECISION FOCAL DOT */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: 0,
          top: 0,
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        <div
          className={`rounded-full transition-all duration-300 ease-out ${
            hoverType === 'artwork'
              ? 'w-1.5 h-1.5 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]'
              : hoverType === 'interactive'
              ? 'w-2 h-2 bg-[#202020] scale-125'
              : 'w-1.5 h-1.5 bg-[#B89B67]'
          }`}
        />
      </div>

      {/* 4. SMOOTH TRAILING REVEAL LENS / HALO */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: 0,
          top: 0,
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        {hoverType === 'artwork' ? (
          /* LUXURY CURATORIAL REVEAL LENS FOR ARTWORKS */
          <div className="relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/85 backdrop-blur-md border border-[#D4AF37]/60 shadow-[0_16px_36px_rgba(32,32,32,0.16)] text-[#202020] transition-all duration-500 ease-out scale-100 animate-in fade-in zoom-in-90">
            {/* Fine outer glowing orbital border */}
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/30 animate-pulse pointer-events-none" />

            <div className="flex items-center gap-1 mb-1 text-[#B89B67]">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <Eye className="w-3 h-3 text-[#202020]" />
            </div>

            <span className="font-sans-gallery text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-bold text-center leading-tight px-3 text-[#202020]">
              {activeText}
            </span>

            <span className="font-sans-gallery text-[7px] tracking-[0.2em] uppercase font-medium text-[#725B38] mt-0.5">
              INSPECT
            </span>
          </div>
        ) : hoverType === 'interactive' ? (
          /* EXPANDED INTERACTIVE RING ON BUTTONS & LINKS */
          <div className="w-11 h-11 rounded-full border border-[#B89B67]/70 bg-[#B89B67]/10 backdrop-blur-[2px] transition-all duration-300 ease-out scale-100" />
        ) : (
          /* SUBTLE AMBIENT TRAILING CIRCLE */
          <div className="w-8 h-8 rounded-full border border-[#B89B67]/40 bg-[#B89B67]/5 transition-all duration-300 ease-out scale-100" />
        )}
      </div>
    </>
  );
};

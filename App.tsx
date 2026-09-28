import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { CustomCursor } from './components/CustomCursor';
import { HeroCinematic } from './components/HeroCinematic';
import { SelectedWorksGallery } from './components/SelectedWorksGallery';
import { FeaturedCollections } from './components/FeaturedCollections';
import { WordsAsArtCalligraphy } from './components/WordsAsArtCalligraphy';
import { MeetMisha } from './components/MeetMisha';
import { CommissionSection } from './components/CommissionSection';
import { CuratorialCatalog } from './components/CuratorialCatalog';
import { ArtworkModal } from './components/ArtworkModal';
import { InquiryModal } from './components/InquiryModal';
import { CuratorialDrawer } from './components/CuratorialDrawer';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import {
  DEFAULT_ARTWORKS_DATA,
  DEFAULT_COLLECTIONS_DATA,
  DEFAULT_SITE_CONTENT,
} from './data/artworks';
import { Artwork, Collection, SiteContent } from './types/art';

const STORAGE_KEY_ARTWORKS = 'art_by_mishal_artworks_v3';
const STORAGE_KEY_COLLECTIONS = 'art_by_mishal_collections_v3';
const STORAGE_KEY_SITE_CONTENT = 'art_by_mishal_site_content_v3';

export default function App() {
  const [currentLang, setCurrentLang] = useState<'EN' | 'UR'>('EN');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeArtwork, setActiveArtwork] = useState<Artwork | null>(null);
  const [inquiryArtwork, setInquiryArtwork] = useState<Artwork | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [prefillMedium, setPrefillMedium] = useState<string>('Painting');
  const [savedArtworkIds, setSavedArtworkIds] = useState<string[]>(['resonance-in-terracotta']);
  const [cursorState, setCursorState] = useState<{ isHovering: boolean; text?: string }>({
    isHovering: false,
    text: 'REVEAL WORK',
  });

  // Synchronized state across all files with persistent localStorage
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ARTWORKS);
      return saved ? JSON.parse(saved) : DEFAULT_ARTWORKS_DATA;
    } catch {
      return DEFAULT_ARTWORKS_DATA;
    }
  });

  const [collections, setCollections] = useState<Collection[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COLLECTIONS);
      return saved ? JSON.parse(saved) : DEFAULT_COLLECTIONS_DATA;
    } catch {
      return DEFAULT_COLLECTIONS_DATA;
    }
  });

  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SITE_CONTENT);
      return saved ? JSON.parse(saved) : DEFAULT_SITE_CONTENT;
    } catch {
      return DEFAULT_SITE_CONTENT;
    }
  });

  // Save changes to localStorage whenever updated via Admin Panel
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ARTWORKS, JSON.stringify(artworks));
    } catch (e) {
      console.error(e);
    }
  }, [artworks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COLLECTIONS, JSON.stringify(collections));
    } catch (e) {
      console.error(e);
    }
  }, [collections]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SITE_CONTENT, JSON.stringify(siteContent));
    } catch (e) {
      console.error(e);
    }
  }, [siteContent]);

  const handleResetToDefaults = () => {
    setArtworks(DEFAULT_ARTWORKS_DATA);
    setCollections(DEFAULT_COLLECTIONS_DATA);
    setSiteContent(DEFAULT_SITE_CONTENT);
    try {
      localStorage.removeItem(STORAGE_KEY_ARTWORKS);
      localStorage.removeItem(STORAGE_KEY_COLLECTIONS);
      localStorage.removeItem(STORAGE_KEY_SITE_CONTENT);
    } catch (e) {}
  };

  // Web Audio Context for quiet museum atmosphere
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorNodesRef = useRef<any[]>([]);

  const toggleAudio = () => {
    if (!isAudioPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        const freqs = [82.41, 123.47, 196.0];
        const nodes: any[] = [];

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.015 / (idx + 1), now + 3);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          nodes.push({ osc, gain });
        });

        oscillatorNodesRef.current = nodes;
        setIsAudioPlaying(true);
      } catch (e) {
        setIsAudioPlaying(true);
      }
    } else {
      if (oscillatorNodesRef.current.length > 0) {
        const now = audioCtxRef.current?.currentTime || 0;
        oscillatorNodesRef.current.forEach(({ osc, gain }) => {
          try {
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
            setTimeout(() => osc.stop(), 1100);
          } catch (e) {}
        });
        oscillatorNodesRef.current = [];
      }
      setIsAudioPlaying(false);
    }
  };

  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'EN' ? 'UR' : 'EN'));
  };

  const handleToggleSaveArtwork = (id: string) => {
    setSavedArtworkIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNextArtwork = () => {
    if (!activeArtwork) return;
    const currentIndex = artworks.findIndex((a) => a.id === activeArtwork.id);
    const nextIndex = (currentIndex + 1) % artworks.length;
    setActiveArtwork(artworks[nextIndex]);
  };

  const handlePrevArtwork = () => {
    if (!activeArtwork) return;
    const currentIndex = artworks.findIndex((a) => a.id === activeArtwork.id);
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    setActiveArtwork(artworks[prevIndex]);
  };

  const handleOpenCommission = (medium?: string) => {
    if (medium) setPrefillMedium(medium);
    const commissionEl = document.getElementById('commissions');
    if (commissionEl) {
      commissionEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCollection = (col: Collection) => {
    const worksEl = document.getElementById('selected-works');
    if (worksEl) {
      worksEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const calligraphyArtworks = artworks.filter((a) => a.category === 'CALLIGRAPHY');

  return (
    <div
      className={`min-h-screen bg-[#FAF9F6] text-[#202020] ${
        currentLang === 'UR' ? 'font-nastaliq' : 'font-sans-gallery'
      }`}
      dir={currentLang === 'UR' ? 'rtl' : 'ltr'}
    >
      {/* Custom Minimal Glass Cursor (Desktop) */}
      <CustomCursor
        cursorText={cursorState.text}
        isHoveringArtwork={cursorState.isHovering}
      />

      {/* Top Fixed Bar with Admin Access */}
      <Header
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
        onOpenCommission={() => handleOpenCommission()}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        siteContent={siteContent}
      />

      <main className="relative w-full">
        {/* 1. Cinematic Scroll-Driven Hero Artwork Experience */}
        <HeroCinematic
          onArtworkClick={(art) => setActiveArtwork(art)}
          featuredArtworks={artworks}
          currentLang={currentLang}
          siteContent={siteContent}
          onHoverArtworkChange={(isHovering, text) =>
            setCursorState({ isHovering, text: text || 'REVEAL WORK' })
          }
        />

        {/* 2. Selected Works Editorial Masonry Gallery with Pakistani Prices */}
        <SelectedWorksGallery
          artworks={artworks}
          onSelectArtwork={(art) => setActiveArtwork(art)}
          currentLang={currentLang}
          savedArtworkIds={savedArtworkIds}
          onToggleSaveArtwork={handleToggleSaveArtwork}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 3. The 3 Major Collections */}
        <FeaturedCollections
          collections={collections}
          onSelectCollection={handleSelectCollection}
          currentLang={currentLang}
        />

        {/* 4. Words As Art: Dedicated Calligraphy & Qalam Reed Pen Section */}
        <WordsAsArtCalligraphy
          calligraphyArtworks={calligraphyArtworks}
          onSelectArtwork={(art) => setActiveArtwork(art)}
          currentLang={currentLang}
          siteContent={siteContent}
          onOpenCommission={(medium) => handleOpenCommission(medium)}
        />

        {/* 5. Meet Mishal: Artist Profile & Monograph */}
        <MeetMisha
          currentLang={currentLang}
          siteContent={siteContent}
          onOpenCommission={() => handleOpenCommission()}
        />

        {/* 6. Complete Archive Catalog PDF Dispatch Banner */}
        <CuratorialCatalog currentLang={currentLang} />

        {/* 7. Bespoke Private Commission Studio with Pakistani PKR Guidance */}
        <CommissionSection
          currentLang={currentLang}
          initialMedium={prefillMedium}
          siteContent={siteContent}
        />
      </main>

      {/* Museum Footer */}
      <Footer
        currentLang={currentLang}
        siteContent={siteContent}
        onOpenCommission={() => handleOpenCommission()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Artwork Full Viewport Modal with Macro Zoom & PKR Pricing */}
      <ArtworkModal
        artwork={activeArtwork}
        onClose={() => setActiveArtwork(null)}
        onNext={handleNextArtwork}
        onPrev={handlePrevArtwork}
        onOpenInquiry={(art) => setInquiryArtwork(art)}
        onOpenCommission={(medium) => {
          setActiveArtwork(null);
          handleOpenCommission(medium);
        }}
        currentLang={currentLang}
        isSaved={activeArtwork ? savedArtworkIds.includes(activeArtwork.id) : false}
        onToggleSave={handleToggleSaveArtwork}
      />

      {/* Acquisition Inquiry Scrim Modal */}
      <InquiryModal
        artwork={inquiryArtwork}
        isOpen={!!inquiryArtwork}
        onClose={() => setInquiryArtwork(null)}
        currentLang={currentLang}
      />

      {/* Mobile Curatorial Drawer */}
      <CuratorialDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        onOpenCommission={() => handleOpenCommission()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        siteContent={siteContent}
      />

      {/* Universal Connected Studio Admin Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        artworks={artworks}
        setArtworks={setArtworks}
        collections={collections}
        setCollections={setCollections}
        siteContent={siteContent}
        setSiteContent={setSiteContent}
        onResetToDefaults={handleResetToDefaults}
      />
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Sparkles,
  LayoutGrid,
  FileText,
  User,
  Sliders,
  DollarSign,
  Image,
  Check,
  Palette,
  ExternalLink,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  KeyRound,
} from 'lucide-react';
import { Artwork, Collection, SiteContent, ArtworkCategory, ArtworkStatus } from '../types/art';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  artworks: Artwork[];
  setArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>;
  collections: Collection[];
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
  siteContent: SiteContent;
  setSiteContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  onResetToDefaults: () => void;
}

const ADMIN_PASSWORD = 'MISHAL786';
const ADMIN_AUTH_KEY = 'art_by_mishal_admin_auth_v1';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  artworks,
  setArtworks,
  collections,
  setCollections,
  siteContent,
  setSiteContent,
  onResetToDefaults,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'artworks' | 'content' | 'collections' | 'commissions'>('artworks');
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [isCreatingArtwork, setIsCreatingArtwork] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !isAuthenticated) {
      setPasswordInput('');
      setAuthError(null);
      const timer = setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isAuthenticated]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = passwordInput.trim();
    if (trimmed === ADMIN_PASSWORD || trimmed.toUpperCase() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch (err) {
        console.error(err);
      }
      setAuthError(null);
      showToast('Studio Admin authorized. Welcome, Mishal.');
    } else {
      setAuthError('Incorrect studio password. Access denied.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleLockStudio = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    } catch (err) {
      console.error(err);
    }
    setPasswordInput('');
    setAuthError(null);
    showToast('Studio Admin locked.');
  };

  // Artworks handlers
  const handleSaveArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArtwork) return;

    if (isCreatingArtwork) {
      setArtworks((prev) => [editingArtwork, ...prev]);
      showToast(`Artwork "${editingArtwork.title}" added successfully!`);
    } else {
      setArtworks((prev) =>
        prev.map((art) => (art.id === editingArtwork.id ? editingArtwork : art))
      );
      showToast(`Artwork "${editingArtwork.title}" updated across the website!`);
    }
    setEditingArtwork(null);
    setIsCreatingArtwork(false);
  };

  const handleDeleteArtwork = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}" from the gallery?`)) {
      setArtworks((prev) => prev.filter((a) => a.id !== id));
      showToast(`Removed "${title}" from the gallery.`);
    }
  };

  const handleStartNewArtwork = () => {
    const newId = `artwork-${Date.now()}`;
    setEditingArtwork({
      id: newId,
      code: `MISHAL-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 89)}`,
      title: 'New Canvas Piece',
      titleUrdu: 'نیا شاہکار',
      category: 'PAINTINGS',
      year: `${new Date().getFullYear()}`,
      medium: 'Oil and 24k gold leaf on stretched Belgian linen',
      dimensions: '120 × 90 cm',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCLRvMliR3NdIidINUUL4LJ9S-l1Jc8XT3VnSn91it3vHr4lEAg5gBKMW8vmZZBee4BiW7hREGfkdK431s8hXAcluqXCqx9YUcRoXmWIZH2G-ZG4L5ULWlaU8MYGanKKIjSBuIsJ6Kr3rF2lwJ___aAy-gvEkbktkUGTO-NSSlN_R5awNWe_17SyTrlp4rguSfH1a-Ct-NRX9SeETYzHhwsMHZguPAkQCpcgzv5WktPc2fiSNMsvZ8bpQ',
      status: 'Available',
      price: 'PKR 350,000',
      description: 'Handcrafted contemporary exploration of color, space, and spiritual energy.',
      curatorNote: 'Detailed surface texture reflecting ambient gallery light.',
      layoutRatio: 'large',
      collectionId: 'whispers',
      materials: ['Belgian Linen', 'Oil Pigment', '24k Gold Leaf'],
      provenance: 'Direct from Mishal Studio, Lahore.',
    });
    setIsCreatingArtwork(true);
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

        {/* Password Modal */}
        <div
          className={`relative w-full max-w-md bg-[#181716] text-[#FAF9F6] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 z-10 overflow-hidden ${
            isShaking ? 'animate-shake' : ''
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute -top-24 -right-24 w-52 h-52 rounded-full bg-[#B89B67]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-52 h-52 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Monogram / Header */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#8C6D37] flex items-center justify-center text-[#181716] shadow-xl mb-4 border border-white/20">
              <Lock className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-[#D4AF37]/30 text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-sans-gallery font-semibold mb-2">
              <KeyRound className="w-3 h-3 text-[#D4AF37]" />
              <span>Restricted Studio Access</span>
            </div>

            <h2 className="font-display text-2xl tracking-[0.06em] text-white font-medium">
              STUDIO ADMIN ACCESS
            </h2>
            <p className="font-arabic text-sm text-[#D4AF37]/90 mt-1 mb-2" dir="rtl">
              اسٹوڈیو ایڈمن — پاس ورڈ درکار ہے
            </p>

            <p className="text-xs text-white/60 font-sans-gallery leading-relaxed max-w-xs mb-6">
              Enter the studio master password to edit paintings, exhibition collections, Pakistani Rupee prices, and archive records.
            </p>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-white/60 font-medium">
                  Studio Password
                </label>
                <span className="text-[10px] font-sans-gallery tracking-wider text-[#D4AF37]/80">
                  SECURE PASSCODE
                </span>
              </div>
              <div className="relative">
                <input
                  ref={passwordInputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(null);
                  }}
                  placeholder="Enter studio password..."
                  className={`w-full px-4 py-3.5 pr-11 rounded-xl bg-white/5 border ${
                    authError
                      ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/40'
                      : 'border-white/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]'
                  } text-white text-sm font-sans-gallery placeholder:text-white/30 outline-none transition-all`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {authError && (
                <div className="mt-2.5 px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 font-sans-gallery flex items-center gap-2 animate-in fade-in">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89B67] hover:from-[#DFC24C] hover:to-[#C6A874] text-[#181716] font-sans-gallery text-xs uppercase tracking-widest font-bold shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Authorize &amp; Enter Studio</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-white/5 text-white/50 hover:text-white text-xs font-sans-gallery transition-colors text-center cursor-pointer"
              >
                Cancel &amp; Return to Gallery
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-[10px] text-white/40 font-sans-gallery tracking-wider uppercase">
              Archival Monograph System · Lahore Atelier
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      {/* Main Admin Card */}
      <div
        className="relative w-full max-w-5xl h-[94vh] bg-[#FAF9F6] rounded-3xl border border-white/60 shadow-2xl flex flex-col overflow-hidden z-10 text-[#202020]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Admin Header */}
        <div className="px-6 py-4 bg-[#202020] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#B89B67] flex items-center justify-center text-[#202020] font-bold text-xs">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg text-white font-medium">
                  Art by Mishal — Studio Control Panel
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] uppercase font-sans-gallery tracking-wider text-[#D4AF37]">
                  Live Synchronized
                </span>
              </div>
              <p className="text-[11px] font-sans-gallery text-white/60">
                Any edits made here update the hero, gallery, modals, calligraphy &amp; prices immediately.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLockStudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-sans-gallery transition-colors cursor-pointer"
              title="Lock Studio Admin"
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Lock Studio</span>
            </button>
            <button
              onClick={() => {
                if (confirm('Reset all website edits back to studio original defaults?')) {
                  onResetToDefaults();
                  showToast('Reset all data to studio defaults!');
                }
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-sans-gallery transition-colors"
              title="Reset all content to original defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close Admin"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 px-6 py-3 bg-[#FAF9F6] border-b border-[#202020]/10 overflow-x-auto shrink-0 no-scrollbar">
          <button
            onClick={() => {
              setActiveTab('artworks');
              setEditingArtwork(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans-gallery uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
              activeTab === 'artworks'
                ? 'bg-[#202020] text-white shadow-sm'
                : 'bg-white/70 text-[#4A4640] hover:bg-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Artworks &amp; PKR Prices ({artworks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans-gallery uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
              activeTab === 'content'
                ? 'bg-[#202020] text-white shadow-sm'
                : 'bg-white/70 text-[#4A4640] hover:bg-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Brand, Hero &amp; Artist Story</span>
          </button>

          <button
            onClick={() => setActiveTab('commissions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans-gallery uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
              activeTab === 'commissions'
                ? 'bg-[#202020] text-white shadow-sm'
                : 'bg-white/70 text-[#4A4640] hover:bg-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Pakistani Commission Rates</span>
          </button>

          <button
            onClick={() => setActiveTab('collections')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans-gallery uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
              activeTab === 'collections'
                ? 'bg-[#202020] text-white shadow-sm'
                : 'bg-white/70 text-[#4A4640] hover:bg-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>3 Major Collections</span>
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 no-scrollbar bg-[#FAF9F6]">
          {/* TAB 1: ARTWORKS MANAGEMENT */}
          {activeTab === 'artworks' && (
            <div>
              {editingArtwork ? (
                /* Edit or Create Artwork Form */
                <form onSubmit={handleSaveArtwork} className="max-w-3xl mx-auto space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-black/10">
                    <div>
                      <span className="text-[10px] font-sans-gallery uppercase tracking-widest text-[#725B38] font-semibold">
                        {isCreatingArtwork ? 'Create New Canvas' : 'Edit Live Artwork Record'}
                      </span>
                      <h3 className="font-display text-2xl font-normal text-[#202020]">
                        {editingArtwork.title || 'Untitled Artwork'}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingArtwork(null)}
                      className="px-4 py-1.5 rounded-full bg-black/5 hover:bg-black/10 text-xs font-sans-gallery text-[#202020]"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                        Artwork Title
                      </label>
                      <input
                        type="text"
                        required
                        value={editingArtwork.title}
                        onChange={(e) =>
                          setEditingArtwork({ ...editingArtwork, title: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm font-sans-gallery text-[#202020] focus:ring-1 focus:ring-[#202020]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                        Urdu Script Title
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={editingArtwork.titleUrdu || ''}
                        onChange={(e) =>
                          setEditingArtwork({ ...editingArtwork, titleUrdu: e.target.value })
                        }
                        placeholder="عنوان اردو میں"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm font-nastaliq text-[#202020] focus:ring-1 focus:ring-[#202020]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                        Price (Pakistani Rupees - PKR)
                      </label>
                      <input
                        type="text"
                        required
                        value={editingArtwork.price || ''}
                        onChange={(e) =>
                          setEditingArtwork({ ...editingArtwork, price: e.target.value })
                        }
                        placeholder="PKR 450,000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm font-sans-gallery font-semibold text-[#202020] focus:ring-1 focus:ring-[#202020]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                        Category
                      </label>
                      <select
                        value={editingArtwork.category}
                        onChange={(e) =>
                          setEditingArtwork({
                            ...editingArtwork,
                            category: e.target.value as Artwork['category'],
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm font-sans-gallery text-[#202020] focus:ring-1 focus:ring-[#202020]"
                      >
                        <option value="PAINTINGS">PAINTINGS</option>
                        <option value="CALLIGRAPHY">CALLIGRAPHY</option>
                        <option value="ABSTRACT">ABSTRACT</option>
                        <option value="PORTRAITS">PORTRAITS</option>
                        <option value="CUSTOM ART">CUSTOM ART</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                        Acquisition Status
                      </label>
                      <select
                        value={editingArtwork.status}
                        onChange={(e) =>
                          setEditingArtwork({
                            ...editingArtwork,
                            status: e.target.value as ArtworkStatus,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm font-sans-gallery text-[#202020] focus:ring-1 focus:ring-[#202020]"
                      >
                        <option value="Available">Available</option>
                        <option value="Private Collection">Private Collection</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Museum Exhibition">Museum Exhibition</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                        Medium &amp; Materials
                      </label>
                      <input
                        type="text"
                        value={editingArtwork.medium}
                        onChange={(e) =>
                          setEditingArtwork({ ...editingArtwork, medium: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm font-sans-gallery text-[#202020] focus:ring-1 focus:ring-[#202020]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        value={editingArtwork.dimensions}
                        onChange={(e) =>
                          setEditingArtwork({ ...editingArtwork, dimensions: e.target.value })
                        }
                        placeholder="180 × 140 cm"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-sm font-sans-gallery text-[#202020] focus:ring-1 focus:ring-[#202020]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                      Artwork Image URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        required
                        value={editingArtwork.image}
                        onChange={(e) =>
                          setEditingArtwork({ ...editingArtwork, image: e.target.value })
                        }
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-xs font-sans-gallery text-[#202020] focus:ring-1 focus:ring-[#202020]"
                      />
                      {editingArtwork.image && (
                        <div className="w-11 h-11 rounded-lg overflow-hidden border border-black/10 shrink-0">
                          <img
                            src={editingArtwork.image}
                            alt="preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                      Curatorial Description
                    </label>
                    <textarea
                      rows={3}
                      value={editingArtwork.description}
                      onChange={(e) =>
                        setEditingArtwork({ ...editingArtwork, description: e.target.value })
                      }
                      className="w-full p-3 rounded-xl bg-white border border-black/15 text-xs sm:text-sm font-sans-gallery text-[#202020] focus:ring-1 focus:ring-[#202020] resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                      Curator Monograph Quote
                    </label>
                    <textarea
                      rows={2}
                      value={editingArtwork.curatorNote || ''}
                      onChange={(e) =>
                        setEditingArtwork({ ...editingArtwork, curatorNote: e.target.value })
                      }
                      className="w-full p-3 rounded-xl bg-white border border-black/15 text-xs sm:text-sm font-sans-gallery text-[#202020] focus:ring-1 focus:ring-[#202020] resize-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingArtwork(null)}
                      className="px-5 py-2.5 rounded-full bg-black/5 hover:bg-black/10 text-xs font-sans-gallery uppercase tracking-wider text-[#202020]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-2.5 rounded-full bg-[#202020] hover:bg-[#3D322A] text-white text-xs font-sans-gallery uppercase tracking-wider font-semibold shadow-md flex items-center gap-2"
                    >
                      <Save className="w-4 h-4 text-[#D4AF37]" />
                      <span>{isCreatingArtwork ? 'Create Artwork' : 'Save Live Changes'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Artworks List */
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
                    <div>
                      <h3 className="font-display text-2xl text-[#202020] font-normal">
                        Exhibition Inventory ({artworks.length})
                      </h3>
                      <p className="text-xs font-sans-gallery text-[#4A4640] mt-0.5">
                        Manage titles, medium, Pakistani Rupee prices, and category tags.
                      </p>
                    </div>

                    <button
                      onClick={handleStartNewArtwork}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#202020] hover:bg-[#3D322A] text-white text-xs font-sans-gallery uppercase tracking-wider font-semibold shadow-md"
                    >
                      <Plus className="w-4 h-4 text-[#D4AF37]" />
                      <span>Add New Artwork</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {artworks.map((art) => (
                      <div
                        key={art.id}
                        className="p-4 rounded-2xl bg-white border border-black/10 shadow-sm flex items-start gap-4 hover:border-black/25 transition-all"
                      >
                        <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#EFECE6] shrink-0 border border-black/5">
                          <img
                            src={art.image}
                            alt={art.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-sans-gallery uppercase tracking-widest text-[#725B38] font-semibold">
                              {art.code}
                            </span>
                            <span className="text-[10px] font-sans-gallery px-2 py-0.5 rounded-full bg-[#F4F0E8] text-[#202020]">
                              {art.status}
                            </span>
                          </div>

                          <h4 className="font-display text-base font-normal text-[#202020] truncate mt-0.5">
                            {art.title}
                          </h4>

                          <p className="text-[11px] font-sans-gallery text-[#4A4640] truncate">
                            {art.medium}
                          </p>

                          <div className="mt-2 pt-2 border-t border-black/5 flex items-center justify-between">
                            <span className="font-sans-gallery text-xs font-bold text-[#202020]">
                              {art.price || 'P.O.A.'}
                            </span>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  setEditingArtwork(art);
                                  setIsCreatingArtwork(false);
                                }}
                                className="p-1.5 rounded-lg hover:bg-black/5 text-[#202020]"
                                title="Edit this artwork"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteArtwork(art.id, art.title)}
                                className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"
                                title="Delete artwork"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BRAND & HERO & ARTIST CONTENT */}
          {activeTab === 'content' && (
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Brand identity */}
              <div className="p-6 rounded-2xl bg-white border border-black/10 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B89B67]" />
                  <h3 className="font-display text-xl font-normal text-[#202020]">
                    Brand Identity &amp; Hero Typography
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                      Brand Name (Navbar &amp; Title)
                    </label>
                    <input
                      type="text"
                      value={siteContent.brandName}
                      onChange={(e) =>
                        setSiteContent({ ...siteContent, brandName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-black/15 text-sm font-sans-gallery text-[#202020]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                      Hero Monumental Watermark Text
                    </label>
                    <input
                      type="text"
                      value={siteContent.heroWordmark}
                      onChange={(e) =>
                        setSiteContent({ ...siteContent, heroWordmark: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-black/15 text-sm font-sans-gallery uppercase text-[#202020]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={siteContent.brandTagline}
                    onChange={(e) =>
                      setSiteContent({ ...siteContent, brandTagline: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-black/15 text-sm font-sans-gallery text-[#202020]"
                  />
                </div>
              </div>

              {/* Hero Scroll 4-Story Stages */}
              <div className="p-6 rounded-2xl bg-white border border-black/10 space-y-4">
                <h3 className="font-display text-xl font-normal text-[#202020]">
                  Hero Scroll Narrative (4 Exhibition Phases)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAF9F6] border border-black/5">
                    <span className="font-bold text-[#725B38] block mb-1">State 01 (Genesis)</span>
                    <input
                      type="text"
                      value={siteContent.heroStoryStates.state1Title}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          heroStoryStates: {
                            ...siteContent.heroStoryStates,
                            state1Title: e.target.value,
                          },
                        })
                      }
                      className="w-full px-2 py-1.5 rounded bg-white border border-black/10 mb-1"
                    />
                    <input
                      type="text"
                      value={siteContent.heroStoryStates.state1Sub}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          heroStoryStates: {
                            ...siteContent.heroStoryStates,
                            state1Sub: e.target.value,
                          },
                        })
                      }
                      className="w-full px-2 py-1.5 rounded bg-white border border-black/10"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF9F6] border border-black/5">
                    <span className="font-bold text-[#725B38] block mb-1">State 02 (Color &amp; Emotion)</span>
                    <input
                      type="text"
                      value={siteContent.heroStoryStates.state2Title}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          heroStoryStates: {
                            ...siteContent.heroStoryStates,
                            state2Title: e.target.value,
                          },
                        })
                      }
                      className="w-full px-2 py-1.5 rounded bg-white border border-black/10 mb-1"
                    />
                    <input
                      type="text"
                      value={siteContent.heroStoryStates.state2Sub}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          heroStoryStates: {
                            ...siteContent.heroStoryStates,
                            state2Sub: e.target.value,
                          },
                        })
                      }
                      className="w-full px-2 py-1.5 rounded bg-white border border-black/10"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF9F6] border border-black/5">
                    <span className="font-bold text-[#725B38] block mb-1">State 03 (Words as Art)</span>
                    <input
                      type="text"
                      value={siteContent.heroStoryStates.state3Title}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          heroStoryStates: {
                            ...siteContent.heroStoryStates,
                            state3Title: e.target.value,
                          },
                        })
                      }
                      className="w-full px-2 py-1.5 rounded bg-white border border-black/10 mb-1"
                    />
                    <input
                      type="text"
                      value={siteContent.heroStoryStates.state3Sub}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          heroStoryStates: {
                            ...siteContent.heroStoryStates,
                            state3Sub: e.target.value,
                          },
                        })
                      }
                      className="w-full px-2 py-1.5 rounded bg-white border border-black/10"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF9F6] border border-black/5">
                    <span className="font-bold text-[#725B38] block mb-1">State 04 (Selected Works)</span>
                    <input
                      type="text"
                      value={siteContent.heroStoryStates.state4Title}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          heroStoryStates: {
                            ...siteContent.heroStoryStates,
                            state4Title: e.target.value,
                          },
                        })
                      }
                      className="w-full px-2 py-1.5 rounded bg-white border border-black/10 mb-1"
                    />
                    <input
                      type="text"
                      value={siteContent.heroStoryStates.state4Sub}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          heroStoryStates: {
                            ...siteContent.heroStoryStates,
                            state4Sub: e.target.value,
                          },
                        })
                      }
                      className="w-full px-2 py-1.5 rounded bg-white border border-black/10"
                    />
                  </div>
                </div>
              </div>

              {/* Artist Biography Details */}
              <div className="p-6 rounded-2xl bg-white border border-black/10 space-y-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#B89B67]" />
                  <h3 className="font-display text-xl font-normal text-[#202020]">
                    Meet Mishal — Artist Bio &amp; Monograph
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                      Artist Display Name
                    </label>
                    <input
                      type="text"
                      value={siteContent.artistProfile.name}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          artistProfile: {
                            ...siteContent.artistProfile,
                            name: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-black/15 text-sm font-sans-gallery text-[#202020]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                      Studio Locations
                    </label>
                    <input
                      type="text"
                      value={siteContent.artistProfile.locations}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          artistProfile: {
                            ...siteContent.artistProfile,
                            locations: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-black/15 text-sm font-sans-gallery text-[#202020]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                    Editable Philosophy Quote
                  </label>
                  <textarea
                    rows={2}
                    value={siteContent.artistProfile.philosophyQuote}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        artistProfile: {
                          ...siteContent.artistProfile,
                          philosophyQuote: e.target.value,
                        },
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-black/15 text-xs sm:text-sm font-sans-gallery text-[#202020] resize-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                    Biography Paragraph 1
                  </label>
                  <textarea
                    rows={3}
                    value={siteContent.artistProfile.bioParagraph1}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        artistProfile: {
                          ...siteContent.artistProfile,
                          bioParagraph1: e.target.value,
                        },
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-black/15 text-xs sm:text-sm font-sans-gallery text-[#202020] resize-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                    Biography Paragraph 2
                  </label>
                  <textarea
                    rows={3}
                    value={siteContent.artistProfile.bioParagraph2}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        artistProfile: {
                          ...siteContent.artistProfile,
                          bioParagraph2: e.target.value,
                        },
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-black/15 text-xs sm:text-sm font-sans-gallery text-[#202020] resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Content settings updated successfully!')}
                  className="px-8 py-3 rounded-full bg-[#202020] text-white text-xs font-sans-gallery uppercase tracking-wider font-semibold shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#D4AF37]" />
                  <span>Update All Content</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PAKISTANI COMMISSION SETTINGS */}
          {activeTab === 'commissions' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-black/10 space-y-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#B89B67]" />
                  <h3 className="font-display text-xl font-normal text-[#202020]">
                    Pakistani Rupee (PKR) Commission Pricing &amp; WhatsApp Concierge
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                      Direct WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={siteContent.commissionSettings.whatsappNumber}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          commissionSettings: {
                            ...siteContent.commissionSettings,
                            whatsappNumber: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-black/15 text-sm font-sans-gallery text-[#202020]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                      Calendar Allocation Status
                    </label>
                    <input
                      type="text"
                      value={siteContent.commissionSettings.openSlots}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          commissionSettings: {
                            ...siteContent.commissionSettings,
                            openSlots: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-black/15 text-sm font-sans-gallery text-[#202020]"
                    />
                  </div>
                </div>

                {/* Tier 1 */}
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-black/5 space-y-2">
                  <span className="font-sans-gallery text-xs font-semibold text-[#202020]">
                    Tier 1: Intimate / Manuscript Scale (Wasli)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={siteContent.commissionSettings.tier1Price}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          commissionSettings: {
                            ...siteContent.commissionSettings,
                            tier1Price: e.target.value,
                          },
                        })
                      }
                      placeholder="PKR 150,000 – PKR 350,000"
                      className="px-3 py-2 rounded-lg bg-white border border-black/10 text-xs font-sans-gallery font-semibold"
                    />
                    <input
                      type="text"
                      value={siteContent.commissionSettings.tier1Label}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          commissionSettings: {
                            ...siteContent.commissionSettings,
                            tier1Label: e.target.value,
                          },
                        })
                      }
                      className="px-3 py-2 rounded-lg bg-white border border-black/10 text-xs font-sans-gallery"
                    />
                  </div>
                </div>

                {/* Tier 2 */}
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-black/5 space-y-2">
                  <span className="font-sans-gallery text-xs font-semibold text-[#202020]">
                    Tier 2: Signature Atelier Canvas (120–180cm)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={siteContent.commissionSettings.tier2Price}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          commissionSettings: {
                            ...siteContent.commissionSettings,
                            tier2Price: e.target.value,
                          },
                        })
                      }
                      placeholder="PKR 450,000 – PKR 950,000"
                      className="px-3 py-2 rounded-lg bg-white border border-black/10 text-xs font-sans-gallery font-semibold"
                    />
                    <input
                      type="text"
                      value={siteContent.commissionSettings.tier2Label}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          commissionSettings: {
                            ...siteContent.commissionSettings,
                            tier2Label: e.target.value,
                          },
                        })
                      }
                      className="px-3 py-2 rounded-lg bg-white border border-black/10 text-xs font-sans-gallery"
                    />
                  </div>
                </div>

                {/* Tier 3 */}
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-black/5 space-y-2">
                  <span className="font-sans-gallery text-xs font-semibold text-[#202020]">
                    Tier 3: Monumental Architectural Installation
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={siteContent.commissionSettings.tier3Price}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          commissionSettings: {
                            ...siteContent.commissionSettings,
                            tier3Price: e.target.value,
                          },
                        })
                      }
                      placeholder="PKR 1,200,000+"
                      className="px-3 py-2 rounded-lg bg-white border border-black/10 text-xs font-sans-gallery font-semibold"
                    />
                    <input
                      type="text"
                      value={siteContent.commissionSettings.tier3Label}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          commissionSettings: {
                            ...siteContent.commissionSettings,
                            tier3Label: e.target.value,
                          },
                        })
                      }
                      className="px-3 py-2 rounded-lg bg-white border border-black/10 text-xs font-sans-gallery"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Commission tiers updated in Pakistani Rupees!')}
                  className="px-8 py-3 rounded-full bg-[#202020] text-white text-xs font-sans-gallery uppercase tracking-wider font-semibold shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#D4AF37]" />
                  <span>Save Pakistani Pricing Tiers</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: COLLECTIONS MANAGEMENT */}
          {activeTab === 'collections' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <h3 className="font-display text-2xl font-normal text-[#202020]">
                The 3 Major Studio Collections
              </h3>

              {collections.map((col, idx) => (
                <div key={col.id} className="p-6 rounded-2xl bg-white border border-black/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-sans-gallery text-xs font-bold text-[#725B38] uppercase tracking-wider">
                      Cycle {col.cycle} · {col.id}
                    </span>
                    <span className="text-xs text-[#4A4640]">{col.worksCount} Artworks</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                        Collection Title
                      </label>
                      <input
                        type="text"
                        value={col.title}
                        onChange={(e) => {
                          const updated = [...collections];
                          updated[idx].title = e.target.value;
                          setCollections(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF9F6] border border-black/15 text-sm font-sans-gallery"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                        Urdu Script Title
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={col.titleUrdu || ''}
                        onChange={(e) => {
                          const updated = [...collections];
                          updated[idx].titleUrdu = e.target.value;
                          setCollections(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF9F6] border border-black/15 text-sm font-nastaliq"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                      Subtitle / Materials Focus
                    </label>
                    <input
                      type="text"
                      value={col.subtitle}
                      onChange={(e) => {
                        const updated = [...collections];
                        updated[idx].subtitle = e.target.value;
                        setCollections(updated);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F6] border border-black/15 text-sm font-sans-gallery"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold block mb-1">
                      Curatorial Description
                    </label>
                    <textarea
                      rows={2}
                      value={col.description}
                      onChange={(e) => {
                        const updated = [...collections];
                        updated[idx].description = e.target.value;
                        setCollections(updated);
                      }}
                      className="w-full p-2.5 rounded-xl bg-[#FAF9F6] border border-black/15 text-xs font-sans-gallery resize-none"
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Collections updated!')}
                  className="px-8 py-3 rounded-full bg-[#202020] text-white text-xs font-sans-gallery uppercase tracking-wider font-semibold shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#D4AF37]" />
                  <span>Save Collections</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Floating Success Toast */}
        {toastMessage && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-[#202020] text-white text-xs font-sans-gallery tracking-wider uppercase font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <Check className="w-4 h-4 text-[#D4AF37]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

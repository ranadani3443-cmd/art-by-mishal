import React from 'react';
import { Volume2, VolumeX, Menu, Sliders, Shield } from 'lucide-react';
import { SiteContent } from '../types/art';

interface HeaderProps {
  currentLang: 'EN' | 'UR';
  onToggleLang: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenCommission: () => void;
  onOpenMobileMenu: () => void;
  onOpenAdmin: () => void;
  siteContent: SiteContent;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleLang,
  isAudioPlaying,
  onToggleAudio,
  onOpenCommission,
  onOpenMobileMenu,
  onOpenAdmin,
  siteContent,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-xl border-b border-[#202020]/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-8 md:px-10 flex items-center justify-between">
        {/* Left: Mobile Drawer Trigger + Brand Wordmark */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 -ml-2 text-[#202020] hover:text-[#B89B67] transition-colors focus:outline-none"
            aria-label="Open Exhibition Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <a href="#" className="flex flex-col group">
            <span className="font-display text-lg sm:text-2xl tracking-[-0.02em] font-normal text-[#202020] group-hover:text-[#B89B67] transition-colors whitespace-nowrap">
              {siteContent.brandName}
            </span>
            <span className="font-sans-gallery text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-[#725B38] -mt-0.5 truncate max-w-[170px] sm:max-w-none">
              {siteContent.brandTagline}
            </span>
          </a>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] xl:text-[13px] tracking-[0.1em] font-medium uppercase font-sans-gallery text-[#4A4640]">
          <a
            href="#hero-experience"
            className="hover:text-[#202020] hover:underline underline-offset-8 decoration-[#B89B67] transition-all"
          >
            {currentLang === 'EN' ? 'Gallery' : 'نگارخانہ'}
          </a>
          <a
            href="#selected-works"
            className="hover:text-[#202020] hover:underline underline-offset-8 decoration-[#B89B67] transition-all"
          >
            {currentLang === 'EN' ? 'Selected Works' : 'منتخب شاہکار'}
          </a>
          <a
            href="#collections"
            className="hover:text-[#202020] hover:underline underline-offset-8 decoration-[#B89B67] transition-all"
          >
            {currentLang === 'EN' ? 'Collections' : 'مجموعے'}
          </a>
          <a
            href="#calligraphy"
            className="hover:text-[#202020] hover:underline underline-offset-8 decoration-[#B89B67] transition-all"
          >
            {currentLang === 'EN' ? 'Calligraphy' : 'خطاطی'}
          </a>
          <a
            href="#about-misha"
            className="hover:text-[#202020] hover:underline underline-offset-8 decoration-[#B89B67] transition-all"
          >
            {currentLang === 'EN' ? 'About Mishal' : 'تعارف'}
          </a>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Admin Panel Trigger Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#B89B67]/15 border border-[#B89B67]/40 text-[#725B38] hover:bg-[#B89B67] hover:text-white transition-all text-[10px] sm:text-[11px] font-sans-gallery uppercase tracking-wider font-semibold active:scale-95 shadow-sm"
            title="Studio Admin Panel (Live Edit All Files & PKR Prices)"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Admin</span>
          </button>

          {/* Ambient Audio Guide Toggle */}
          <button
            onClick={onToggleAudio}
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full border transition-all text-[11px] font-sans-gallery tracking-wider uppercase ${
              isAudioPlaying
                ? 'bg-[#B89B67]/15 border-[#B89B67] text-[#725B38]'
                : 'bg-white/70 border-black/5 text-[#4A4640] hover:bg-white hover:text-[#202020]'
            }`}
            title="Gallery Ambient Atmosphere"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#B89B67] animate-pulse" />
                <span className="hidden md:inline">Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-50" />
                <span className="hidden md:inline">Audio Guide</span>
              </>
            )}
          </button>

          {/* Bilingual Language Switcher */}
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1 rounded-full bg-white/70 border border-black/5 text-[11px] font-sans-gallery tracking-wider font-semibold text-[#4A4640] hover:text-[#202020] hover:bg-white transition-all"
            aria-label="Switch Language"
          >
            {currentLang === 'EN' ? 'اردو' : 'EN'}
          </button>

          {/* Commission CTA Button */}
          <button
            onClick={onOpenCommission}
            className="px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-[#202020] text-white hover:bg-[#3D322A] text-[10px] sm:text-xs font-sans-gallery uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold transition-all shadow-[0_4px_16px_rgba(32,32,32,0.12)] active:scale-95 whitespace-nowrap"
          >
            <span className="hidden sm:inline">{currentLang === 'EN' ? 'Commission Art' : 'فرمائشی فن'}</span>
            <span className="sm:hidden">{currentLang === 'EN' ? 'Inquire' : 'فرمائش'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

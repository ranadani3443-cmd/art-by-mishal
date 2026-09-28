import React from 'react';
import { X, Sliders } from 'lucide-react';
import { SiteContent } from '../types/art';

interface CuratorialDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: 'EN' | 'UR';
  onToggleLang: () => void;
  onOpenCommission: () => void;
  onOpenAdmin: () => void;
  siteContent: SiteContent;
}

export const CuratorialDrawer: React.FC<CuratorialDrawerProps> = ({
  isOpen,
  onClose,
  currentLang,
  onToggleLang,
  onOpenCommission,
  onOpenAdmin,
  siteContent,
}) => {
  if (!isOpen) return null;

  const links = [
    { href: '#hero-experience', label: currentLang === 'EN' ? 'Hero Gallery' : 'نگارخانہ' },
    { href: '#selected-works', label: currentLang === 'EN' ? 'Selected Works' : 'منتخب شاہکار' },
    { href: '#collections', label: currentLang === 'EN' ? 'Collections' : 'مجموعے' },
    { href: '#calligraphy', label: currentLang === 'EN' ? 'Words as Art' : 'خطاطی' },
    { href: '#about-misha', label: currentLang === 'EN' ? `About ${siteContent.artistProfile.name}` : 'تعارف' },
    { href: '#commissions', label: currentLang === 'EN' ? 'Private Commissions' : 'فرمائشی فن پارے' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />

      <aside className="relative w-4/5 max-w-sm bg-[#FAF9F6] h-full p-6 sm:p-8 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-300">
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-[#202020]/10">
            <div className="flex flex-col">
              <span className="font-display text-xl text-[#202020]">{siteContent.brandName}</span>
              <span className="font-sans-gallery text-[9px] uppercase tracking-[0.2em] text-[#725B38]">
                Curatorial Index
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-[#202020]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 pt-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="font-display text-xl sm:text-2xl text-[#202020] hover:text-[#725B38] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#202020]/10 flex flex-col gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenAdmin();
            }}
            className="w-full py-2.5 rounded-full bg-[#B89B67]/20 border border-[#B89B67]/40 text-[#725B38] text-xs font-sans-gallery uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Open Studio Admin Panel</span>
          </button>

          <div className="flex items-center justify-between">
            <span className="text-xs font-sans-gallery text-[#725B38] uppercase tracking-wider">
              Language
            </span>
            <button
              onClick={onToggleLang}
              className="px-3 py-1 rounded-full bg-white border border-black/10 text-xs font-sans-gallery font-semibold text-[#202020]"
            >
              {currentLang === 'EN' ? 'اردو زبان' : 'English'}
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenCommission();
            }}
            className="w-full py-3 rounded-full bg-[#202020] text-white text-xs font-sans-gallery uppercase tracking-[0.16em] font-semibold text-center"
          >
            Commission Artwork (PKR)
          </button>

          <p className="text-[10px] font-sans-gallery text-[#4A4640]/70 text-center tracking-wider">
            {siteContent.contactInfo.locations}
          </p>
        </div>
      </aside>
    </div>
  );
};

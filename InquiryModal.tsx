import React, { useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';
import { Artwork } from '../types/art';

interface InquiryModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  currentLang: 'EN' | 'UR';
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  artwork,
  isOpen,
  onClose,
  currentLang,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [intent, setIntent] = useState('Acquisition & Valuation');
  const [destination, setDestination] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !artwork) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#FAF9F6] border border-white/60 p-5 sm:p-8 shadow-2xl z-10 text-[#202020] max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-3 sm:pb-4 border-b border-[#202020]/10">
          <div>
            <span className="font-sans-gallery text-[10px] uppercase tracking-[0.24em] text-[#725B38] font-semibold">
              Curatorial Advisory
            </span>
            <h3 className="font-display text-xl sm:text-2xl text-[#202020] font-normal mt-0.5">
              Acquisition Inquiry
            </h3>
            <p className="font-sans-gallery text-xs text-[#4A4640] mt-0.5 truncate max-w-[280px] sm:max-w-sm">
              {artwork.title} · {artwork.code}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#202020] hover:bg-black/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight Pakistani Price */}
        <div className="mt-3 p-3 rounded-xl bg-white border border-black/5 flex items-center justify-between">
          <span className="text-xs font-sans-gallery text-[#725B38] uppercase tracking-wider font-semibold">
            Catalog Valuation
          </span>
          <span className="font-display text-lg font-bold text-[#202020]">
            {artwork.price || 'Inquire'}
          </span>
        </div>

        {isSubmitted ? (
          <div className="py-10 flex flex-col items-center text-center animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-[#B89B67]/20 flex items-center justify-center text-[#725B38] mb-3">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="font-display text-xl sm:text-2xl text-[#202020] mb-1 font-normal">
              Inquiry Dispatched
            </h4>
            <p className="font-sans-gallery text-xs text-[#4A4640] max-w-xs leading-relaxed font-light">
              Your inquiry has been logged with Mishal's studio director. A private advisor will contact you within 4 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 pt-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold">
                Your Full Name / Collector
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Zainab Malik"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/10 text-xs sm:text-sm font-sans-gallery text-[#202020] focus:outline-none focus:ring-1 focus:ring-[#202020]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="zainab@collection.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/10 text-xs sm:text-sm font-sans-gallery text-[#202020] focus:outline-none focus:ring-1 focus:ring-[#202020]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold">
                Primary Advisory Purpose
              </label>
              <select
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/10 text-xs sm:text-sm font-sans-gallery text-[#202020] focus:outline-none focus:ring-1 focus:ring-[#202020]"
              >
                <option>Acquisition &amp; Valuation Report (PKR)</option>
                <option>Condition Report &amp; High-Res Macro Scan</option>
                <option>Private Atelier Viewing (Lahore / London / Dubai)</option>
                <option>Museum Loan / Curatorial Proposal</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold">
                Preferred Destination (City / Country)
              </label>
              <input
                type="text"
                placeholder="e.g. Lahore / Karachi / Islamabad / London"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/10 text-xs sm:text-sm font-sans-gallery text-[#202020] focus:outline-none focus:ring-1 focus:ring-[#202020]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold">
                Confidential Notes / Custom Float Framing
              </label>
              <textarea
                rows={2}
                placeholder="Inquire about custom float frame finishes, transport timeline, or escrow..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-black/10 text-xs sm:text-sm font-sans-gallery text-[#202020] focus:outline-none focus:ring-1 focus:ring-[#202020] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 mt-2 rounded-full bg-[#202020] text-white hover:bg-[#3D322A] text-xs font-sans-gallery uppercase tracking-[0.16em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Transmitting Dossier...</span>
              ) : (
                <>
                  <span>Transmit Archival Inquiry</span>
                  <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

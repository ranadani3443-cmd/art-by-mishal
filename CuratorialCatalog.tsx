import React, { useState } from 'react';
import { BookOpen, Download, CheckCircle, ArrowRight } from 'lucide-react';

interface CuratorialCatalogProps {
  currentLang: 'EN' | 'UR';
}

export const CuratorialCatalog: React.FC<CuratorialCatalogProps> = ({
  currentLang,
}) => {
  const [email, setEmail] = useState('');
  const [isDispatched, setIsDispatched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDispatched(true);
    }, 900);
  };

  return (
    <section className="w-full py-20 px-6 sm:px-10 lg:px-16 bg-[#FAF9F6] relative">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl bg-[#202020] text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Decorative Contours */}
          <div className="absolute -right-10 -bottom-10 w-96 h-96 rounded-full bg-[#B89B67]/20 blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#D4AF37]/15 to-transparent rounded-bl-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-sans-gallery text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] font-semibold">
                Archival Publications
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight font-normal leading-tight mb-4">
              Request Complete Archive Catalog (PDF)
            </h3>

            <p className="font-sans-gallery text-xs sm:text-sm text-white/80 leading-relaxed font-light mb-8 max-w-xl">
              Receive the full 84-page curatorial catalog including private collector holdings, high-resolution canvas macro details, artist statements, and verified provenance records.
            </p>

            {isDispatched ? (
              <div className="p-4 rounded-xl bg-white/10 border border-[#B89B67]/40 flex items-center gap-3 text-white">
                <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span className="text-xs sm:text-sm font-sans-gallery">
                  Archival catalog dispatch initiated. Please check your inbox at <strong>{email}</strong> shortly.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="collector@institution.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-sm font-sans-gallery text-white placeholder:text-white/40 focus:outline-none focus:bg-white/15 focus:border-[#D4AF37] transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-full bg-[#B89B67] hover:bg-[#D4AF37] text-[#202020] text-xs font-sans-gallery uppercase tracking-[0.16em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Preparing Dossier...</span>
                  ) : (
                    <>
                      <span>Dispatch Archival Portfolio</span>
                      <Download className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

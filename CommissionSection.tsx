import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  MessageCircle,
  CheckCircle,
  Send,
} from 'lucide-react';
import { CommissionBrief, SiteContent } from '../types/art';

interface CommissionSectionProps {
  currentLang: 'EN' | 'UR';
  initialMedium?: string;
  siteContent: SiteContent;
}

export const CommissionSection: React.FC<CommissionSectionProps> = ({
  currentLang,
  initialMedium = 'Painting',
  siteContent,
}) => {
  const [formData, setFormData] = useState<CommissionBrief>({
    fullName: '',
    email: '',
    phone: '',
    medium: (initialMedium as any) || 'Painting',
    targetSpace: '',
    dimensions: '',
    budgetTier: 'tier2',
    narrative: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const whatsappDirectUrl = `https://wa.me/${siteContent.commissionSettings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Art by Mishal Atelier, I would like to inquire about commissioning a bespoke ${formData.medium || 'artwork'}.`
  )}`;

  return (
    <section id="commissions" className="w-full py-16 sm:py-24 md:py-28 px-4 sm:px-8 lg:px-16 bg-[#F4F0E8] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Philosophical Intro & Studio Guarantee */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89B67]" />
                <span className="font-sans-gallery text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#725B38] font-semibold">
                  Atelier Concierge &amp; Bespoke Works
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#202020] tracking-tight font-normal leading-[1.08] mb-3 sm:mb-4">
                {siteContent.commissionSettings.heading.includes('.') ? (
                  <>
                    {siteContent.commissionSettings.heading.split('.')[0]}.
                    <br />
                    <span className="italic text-[#725B38]">
                      {siteContent.commissionSettings.heading.split('.')[1]}.
                    </span>
                  </>
                ) : (
                  siteContent.commissionSettings.heading
                )}
              </h2>

              <p className="font-sans-gallery text-xs sm:text-sm md:text-base text-[#4A4640] leading-relaxed font-light mb-6 sm:mb-8 max-w-md">
                {siteContent.commissionSettings.subheading}
              </p>

              {/* 4-Step Process Micro-Roadmap */}
              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/70 border border-black/5 flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#202020] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-sans-gallery text-xs font-semibold text-[#202020] uppercase tracking-wider">
                      Space &amp; Light Consultation
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#4A4640] font-light mt-0.5">
                      Review of your interior architecture, daylight exposure, and spatial energy.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white/70 border border-black/5 flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#202020] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-sans-gallery text-xs font-semibold text-[#202020] uppercase tracking-wider">
                      Composition Sketches &amp; Gold Swatches
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#4A4640] font-light mt-0.5">
                      Hand-drawn variations paired with mineral pigment and gold leaf samples.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white/70 border border-black/5 flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#202020] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-sans-gallery text-xs font-semibold text-[#202020] uppercase tracking-wider">
                      Atelier Creation Dispatches
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#4A4640] font-light mt-0.5">
                      Bi-weekly private photo monographs capturing ink preparation and layers.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white/70 border border-black/5 flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#202020] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-sans-gallery text-xs font-semibold text-[#202020] uppercase tracking-wider">
                      White-Glove Installation
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#4A4640] font-light mt-0.5">
                      Museum-grade crating and certified hanging supervised across Pakistan &amp; internationally.
                    </p>
                  </div>
                </div>
              </div>

              {/* Studio Guarantee Box with WhatsApp Direct */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#202020] text-white flex flex-col gap-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-sans-gallery text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                    Artist Studio Guarantee
                  </span>
                  <span className="text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 text-white font-medium">
                    {siteContent.commissionSettings.openSlots}
                  </span>
                </div>
                <p className="font-display text-base sm:text-lg text-white font-normal leading-snug">
                  {siteContent.commissionSettings.announcement}
                </p>

                <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition-colors font-medium"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Concierge: {siteContent.commissionSettings.whatsappNumber}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Commission Brief Builder with Pakistani Pricing */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-panel p-5 sm:p-8 md:p-10 shadow-xl bg-white/90">
              <div className="mb-6 sm:mb-8">
                <span className="font-sans-gallery text-[10px] uppercase tracking-[0.22em] text-[#725B38] font-semibold block mb-1">
                  Commission Dossier
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-[#202020] font-normal">
                  Initiate Bespoke Commission
                </h3>
                <p className="font-sans-gallery text-xs text-[#4A4640] mt-1">
                  Provide introductory specifications for Mishal's curatorial office.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F6] border border-[#B89B67]/30 flex flex-col items-center text-center animate-in fade-in">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#B89B67]/20 flex items-center justify-center text-[#725B38] mb-3 sm:mb-4">
                    <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h4 className="font-display text-xl sm:text-2xl text-[#202020] mb-2 font-normal">
                    Commission Request Received
                  </h4>
                  <p className="font-sans-gallery text-xs sm:text-sm text-[#4A4640] max-w-md leading-relaxed font-light mb-6">
                    Thank you, {formData.fullName || 'Collector'}. Your confidential commission dossier has been submitted directly to Mishal's curatorial advisory. A private associate will respond via email or WhatsApp within 4 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        medium: 'Painting',
                        targetSpace: '',
                        dimensions: '',
                        budgetTier: 'tier2',
                        narrative: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#202020] text-white text-xs font-sans-gallery uppercase tracking-wider font-semibold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] sm:text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold">
                      Full Name &amp; Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Tariq Mansoor / Fatima Jamil"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/10 text-xs sm:text-sm font-sans-gallery text-[#202020] placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-[#202020] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] sm:text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="collector@domain.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/10 text-xs sm:text-sm font-sans-gallery text-[#202020] placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-[#202020] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] sm:text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold">
                        WhatsApp / Contact Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/10 text-xs sm:text-sm font-sans-gallery text-[#202020] placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-[#202020] transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] sm:text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold">
                      Commission Medium
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        'Painting',
                        'Calligraphy',
                        'Mixed Media',
                        'Architectural Installation',
                      ].map((med) => {
                        const isSelected = formData.medium === med;
                        return (
                          <button
                            type="button"
                            key={med}
                            onClick={() =>
                              setFormData({ ...formData, medium: med as any })
                            }
                            className={`py-2 px-2.5 rounded-xl text-[11px] font-sans-gallery font-medium tracking-wider uppercase transition-all truncate text-center ${
                              isSelected
                                ? 'bg-[#202020] text-white shadow-sm'
                                : 'bg-white border border-black/10 text-[#4A4640] hover:bg-[#FAF9F6]'
                            }`}
                          >
                            {med}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] sm:text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold">
                        Target Space
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. DHA Villa Salon, Lahore"
                        value={formData.targetSpace}
                        onChange={(e) =>
                          setFormData({ ...formData, targetSpace: e.target.value })
                        }
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/10 text-xs sm:text-sm font-sans-gallery text-[#202020] placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-[#202020] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] sm:text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 180 × 140 cm or 6 × 4 ft"
                        value={formData.dimensions}
                        onChange={(e) =>
                          setFormData({ ...formData, dimensions: e.target.value })
                        }
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/10 text-xs sm:text-sm font-sans-gallery text-[#202020] placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-[#202020] transition-all"
                      />
                    </div>
                  </div>

                  {/* Budget Guidance in PKR */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] sm:text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold">
                      Budget Guidance (Pakistani Rupees)
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          tier: 'tier1',
                          range: siteContent.commissionSettings.tier1Price,
                          label: siteContent.commissionSettings.tier1Label,
                        },
                        {
                          tier: 'tier2',
                          range: siteContent.commissionSettings.tier2Price,
                          label: siteContent.commissionSettings.tier2Label,
                        },
                        {
                          tier: 'tier3',
                          range: siteContent.commissionSettings.tier3Price,
                          label: siteContent.commissionSettings.tier3Label,
                        },
                      ].map((item) => (
                        <label
                          key={item.tier}
                          className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                            formData.budgetTier === item.tier
                              ? 'bg-[#FAF9F6] border-[#202020] shadow-sm'
                              : 'bg-white border-black/10 hover:bg-[#FAF9F6]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="budgetTier"
                              value={item.tier}
                              checked={formData.budgetTier === item.tier}
                              onChange={() =>
                                setFormData({
                                  ...formData,
                                  budgetTier: item.tier as any,
                                })
                              }
                              className="accent-[#202020]"
                            />
                            <span className="font-sans-gallery text-xs sm:text-sm font-semibold text-[#202020]">
                              {item.range}
                            </span>
                          </div>
                          <span className="text-[10px] sm:text-[11px] font-sans-gallery text-[#725B38] font-light pl-6 sm:pl-0 mt-0.5 sm:mt-0">
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] sm:text-[11px] font-sans-gallery uppercase tracking-wider text-[#725B38] font-semibold">
                      Personal Vision &amp; Narratives
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Detail any specific calligraphy verses (Surahs, Faiz poetry), sacred color recollections, or family narratives..."
                      value={formData.narrative}
                      onChange={(e) =>
                        setFormData({ ...formData, narrative: e.target.value })
                      }
                      className="w-full p-3.5 rounded-xl bg-white border border-black/10 text-xs sm:text-sm font-sans-gallery text-[#202020] placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-[#202020] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 rounded-full bg-[#202020] text-white hover:bg-[#3D322A] text-xs font-sans-gallery uppercase tracking-[0.16em] sm:tracking-[0.18em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Curatorial Brief...</span>
                    ) : (
                      <>
                        <span>Submit Confidential Commission Brief</span>
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-sans-gallery text-[#725B38]">
                    <Lock className="w-3 h-3 text-[#B89B67]" />
                    <span>Curatorial Confidentiality Guaranteed</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

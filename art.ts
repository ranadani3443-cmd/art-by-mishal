export type ArtworkCategory =
  | 'ALL'
  | 'PAINTINGS'
  | 'CALLIGRAPHY'
  | 'ABSTRACT'
  | 'PORTRAITS'
  | 'CUSTOM ART';

export type ArtworkStatus =
  | 'Available'
  | 'Private Collection'
  | 'Reserved'
  | 'Museum Exhibition';

export interface Artwork {
  id: string;
  code: string;
  title: string;
  titleUrdu?: string;
  category: 'PAINTINGS' | 'CALLIGRAPHY' | 'ABSTRACT' | 'PORTRAITS' | 'CUSTOM ART';
  year: string;
  medium: string;
  dimensions: string;
  image: string;
  status: ArtworkStatus;
  price?: string; // in PKR e.g. "PKR 450,000"
  description: string;
  curatorNote?: string;
  exhibitions?: string[];
  audioGuide?: {
    title: string;
    duration: string;
    transcript: string;
  };
  layoutRatio: 'large' | 'tall' | 'wide' | 'square';
  collectionId: 'whispers' | 'silent-letters' | 'beyond-color';
  materials?: string[];
  provenance?: string;
}

export interface Collection {
  id: 'whispers' | 'silent-letters' | 'beyond-color';
  cycle: string;
  title: string;
  titleUrdu?: string;
  subtitle: string;
  description: string;
  worksCount: number;
  coverImage: string;
  mediumHighlight: string;
}

export interface SiteContent {
  brandName: string;
  brandTagline: string;
  heroWordmark: string;
  heroStoryStates: {
    state1Title: string;
    state1Sub: string;
    state2Title: string;
    state2Sub: string;
    state3Title: string;
    state3Sub: string;
    state4Title: string;
    state4Sub: string;
  };
  artistProfile: {
    name: string;
    title: string;
    philosophyQuote: string;
    bioParagraph1: string;
    bioParagraph2: string;
    locations: string;
    holdingsCount: string;
    portraitImage: string;
  };
  calligraphySection: {
    title: string;
    subtitle: string;
    quoteArabic: string;
    quoteTranslation: string;
  };
  commissionSettings: {
    heading: string;
    subheading: string;
    announcement: string;
    openSlots: string;
    whatsappNumber: string;
    currency: string;
    tier1Price: string;
    tier1Label: string;
    tier2Price: string;
    tier2Label: string;
    tier3Price: string;
    tier3Label: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    locations: string;
  };
}

export interface CommissionBrief {
  fullName: string;
  email: string;
  phone: string;
  medium: 'Painting' | 'Calligraphy' | 'Mixed Media' | 'Architectural Installation';
  targetSpace: string;
  dimensions: string;
  budgetTier: 'tier1' | 'tier2' | 'tier3';
  narrative: string;
}

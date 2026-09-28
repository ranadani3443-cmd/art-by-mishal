import { Artwork, Collection, SiteContent } from '../types/art';

export const DEFAULT_SITE_CONTENT: SiteContent = {
  brandName: 'Art by Mishal',
  brandTagline: 'Painter · Calligrapher · Visual Artist',
  heroWordmark: 'ART BY MISHAL',
  heroStoryStates: {
    state1Title: 'ART BY MISHAL',
    state1Sub: 'Painter · Calligrapher',
    state2Title: 'WHERE COLOR BECOMES EMOTION',
    state2Sub: 'Tectonic mineral pigments & 24k gold leaf alchemy',
    state3Title: 'WHERE WORDS BECOME ART',
    state3Sub: 'Monumental Arabic & Urdu calligraphic cadences',
    state4Title: 'SELECTED WORKS',
    state4Sub: 'Step into the permanent collection',
  },
  artistProfile: {
    name: 'Mishal',
    title: 'Contemporary Painter & Calligrapher',
    philosophyQuote:
      'Mishal is a painter and calligrapher exploring emotion, identity, color and expression through traditional and contemporary artistic forms.',
    bioParagraph1:
      'Trained in the classical Naskh and Nastaliq traditions under master calligraphers in Lahore before graduating with distinctions in contemporary fine art, Mishal merges the ancient discipline of reed penmanship with monumental Western abstract expressionism.',
    bioParagraph2:
      'Her practice is defined by alchemical mineral sourcing—ground terracotta clays, Florentine 24-karat gold leaf, raw wasli vellums, and crushed lapis lazuli—creating artworks that resonate with sacred cadence and modern spatial presence.',
    locations: 'Lahore · London · Dubai',
    holdingsCount: 'Over 140 works globally',
    portraitImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ3p6YNV8tOLW_yKWR6f2joJkGKBs8lgqqjJVmuXODZ_0wP22z8lek7YuiP4SRM1vfXDZ9mb2baNFdht1EyZl9AAt_pcEmOh_3X0yEC0Dn5pGUCZJGDbjrPV8CrogHOILK-BiciwEQ04-NUERGH0Aynmw5BnizcxkEbeyCM05wp3EM-csQPhpDMNx4R_M7ILe12iZap7PSfk8zSlQ02kTqhEUjmpO0nJ9fNvQSv0jQDSe9GAsoxBVTGQ',
  },
  calligraphySection: {
    title: 'Words as Art',
    subtitle:
      'Where language transcends semantic structure to become monumental form, sacred breath, and contemporary architectural presence.',
    quoteArabic: 'حُسْنُ الْخَطِّ لِسَانُ الْيَدِ',
    quoteTranslation: '“Beauty of script is the tongue of the hand.” — Classical Canon',
  },
  commissionSettings: {
    heading: 'YOUR IDEA. HER ART.',
    subheading:
      'Commission an original painting or calligraphy piece created specifically for your space, occasion, or personal story.',
    announcement:
      'Strictly limited to 6 private commissions per calendar year to preserve archival purity.',
    openSlots: '2026 Calendar Allocation Open',
    whatsappNumber: '+92 300 8452199',
    currency: 'PKR',
    tier1Price: 'PKR 150,000 – PKR 350,000',
    tier1Label: 'Intimate Wasli / Manuscript Scale',
    tier2Price: 'PKR 450,000 – PKR 950,000',
    tier2Label: 'Signature Atelier Canvas (120–180cm)',
    tier3Price: 'PKR 1,200,000+',
    tier3Label: 'Monumental Architectural Installation',
  },
  contactInfo: {
    email: 'inquiries@artbymishal.gallery',
    phone: '+92 42 3578 9120',
    locations: 'Gulberg Atelier, Lahore · Mayfair, London · Alserkal, Dubai',
  },
};

export const DEFAULT_COLLECTIONS_DATA: Collection[] = [
  {
    id: 'whispers',
    cycle: '01',
    title: 'Whispers',
    titleUrdu: 'سرگوشیاں',
    subtitle: 'Quiet Horizons & Mineral Silt',
    description:
      'Atmospheric desert dunes, morning mist, and powdered minerals on unprimed Belgian linen that dissolve the boundary between stillness and light.',
    worksCount: 8,
    coverImage: 'https://lh3.googleusercontent.com/d/12_4RW3HizTxY2bOLQo6O5vVh5PPqZHkj',
    mediumHighlight: 'Layered Mineral Pigments, Sand & Tempera',
  },
  {
    id: 'silent-letters',
    cycle: '02',
    title: 'Silent Letters',
    titleUrdu: 'حروفِ خاموشی',
    subtitle: 'Sacred Thuluth, Diwani & Nastaliq',
    description:
      'Classical calligraphic discipline deconstructed into monumental kinetic sweeps, suspended 24k gold leaf, and walnut gall ink on 70-year aged wasli paper.',
    worksCount: 12,
    coverImage: 'https://lh3.googleusercontent.com/d/1znWC4nl2GBS1YZSJ_31p4CVa-i-u46_W',
    mediumHighlight: 'Hand-carved Reed Qalam & 24k Florentine Leaf',
  },
  {
    id: 'beyond-color',
    cycle: '03',
    title: 'Beyond Color',
    titleUrdu: 'رنگ سے پرے',
    subtitle: 'Tectonic Impasto & Terracotta Alchemy',
    description:
      'Raw earthy ochres, burnt sienna, and natural resin glazes celebrating the raw tactile weight of mortal soil paired with radiant celestial gold.',
    worksCount: 10,
    coverImage: 'https://lh3.googleusercontent.com/d/19xmN-h2gdaBlGIwnZfz9OpVPjCon5vBG',
    mediumHighlight: 'Oil, Earth Oxides & 24k Japanese Gold',
  },
];

export const DEFAULT_ARTWORKS_DATA: Artwork[] = [
  {
    id: 'resonance-in-terracotta',
    code: 'MISHAL-2026-08',
    title: 'Resonance in Terracotta',
    titleUrdu: 'مٹی کی گونج اور خالص سونا',
    category: 'ABSTRACT',
    year: '2026',
    medium: 'Oil, earth pigments & 24k gold leaf on stretched Belgian linen',
    dimensions: '180 × 140 cm (70.8 × 55.1 in)',
    image: 'https://lh3.googleusercontent.com/d/19xmN-h2gdaBlGIwnZfz9OpVPjCon5vBG',
    status: 'Museum Exhibition',
    price: 'PKR 850,000',
    description:
      'A seismic meditation on tectonic displacement and spiritual calligraphy, layered through raw burnt sienna, calcified clay, and celestial leaf.',
    curatorNote:
      'Mishal captures the quiet tension between terrestrial stability and transcendent illumination. Sweeps of raw sienna anchor the composition while fractured veins of 24k gold emerge organically.',
    exhibitions: [
      'Alhamra Arts Council, Lahore (Solo Survey 2026)',
      'Alserkal Avenue, Dubai (Contemporary Masters Pavilion 2026)',
      'Venice Biennale Collateral, Palazzo Mora (Luminous Earth 2025)',
    ],
    audioGuide: {
      title: 'Mishal on Terracotta & Transcendence',
      duration: '01:42',
      transcript:
        'Terracotta represents our rooted mortality—the earthen mud of Lahore and the dry clays of the Indus Valley. By counter-posing it with fragile 24-karat gold leaf, I sought to explore the fleeting spark of divinity that illuminates mortal ground.',
    },
    layoutRatio: 'large',
    collectionId: 'beyond-color',
    materials: ['Belgian Linen', 'Burnt Sienna', '24k Japanese Gold Leaf', 'Rabbit-skin Sizing'],
    provenance: 'Direct from Mishal Atelier Lahore; registered with Archival Certificate #MISHAL-2026-08',
  },
  {
    id: 'whispers-of-the-dune',
    code: 'MISHAL-2025-14',
    title: 'Whispering Silt & Dawn',
    titleUrdu: 'صبح کے ریت کی سرگوشی',
    category: 'PAINTINGS',
    year: '2025',
    medium: 'Layered mineral pigments, powdered quartz & sand on raw linen',
    dimensions: '120 × 90 cm (47.2 × 35.4 in)',
    image: 'https://lh3.googleusercontent.com/d/12_4RW3HizTxY2bOLQo6O5vVh5PPqZHkj',
    status: 'Available',
    price: 'PKR 480,000',
    description:
      'An ethereal landscape rendered in soft terracotta, dusty rose, and sun-bleached sand tones, capturing the gentle hush of twilight crossing Cholistan and Thar dunes.',
    curatorNote:
      'Natural mineral pigments gather into ridges like tidal sediment. The unprimed linen breathes through the pigment layers, granting warmth without synthetic opacity.',
    exhibitions: ['Lahore Biennale Collateral Exhibition (2025)'],
    audioGuide: {
      title: 'Silence in the High Dunes',
      duration: '02:08',
      transcript:
        'When dawn touches the high desert, there is a moment before sound exists. That silence has a color: somewhere between blush clay and cold morning quartz.',
    },
    layoutRatio: 'wide',
    collectionId: 'whispers',
    materials: ['Raw French Linen', 'Powdered Quartz', 'Natural Tempera', 'Bespoke Oak Float Frame'],
    provenance: 'Available for acquisition via studio concierge; includes archival transit crate.',
  },
  {
    id: 'huwal-haq',
    code: 'MISHAL-2026-04',
    title: 'Huwal Haq (He is the Truth)',
    titleUrdu: 'هُوَ الْحَقُّ — نورٌ علَىٰ نور',
    category: 'CALLIGRAPHY',
    year: '2026',
    medium: '24k Florentine gold leaf & charred sumi ink on handmade deckle-edge mulberry paper',
    dimensions: '200 × 150 cm (78.7 × 59.1 in)',
    image: 'https://lh3.googleusercontent.com/d/1znWC4nl2GBS1YZSJ_31p4CVa-i-u46_W',
    status: 'Available',
    price: 'PKR 1,250,000',
    description:
      'A monumental calligraphic composition fusing classical Jali Thuluth cadence with explosive gestural abstraction. Gold strokes dance like divine breath against raw wasli fibers.',
    curatorNote:
      'The sacred verse unfolds not as rigid script, but as architectural architecture of devotion. The 24-karat Florentine gold shimmers in natural gallery light, changing tone with the sun.',
    exhibitions: [
      'Sharjah Calligraphy Biennial 2026',
      'Islamic Arts Biennale, Jeddah (Curated Selection)',
    ],
    audioGuide: {
      title: 'The Breath of the Qalam',
      duration: '02:30',
      transcript:
        'In calligraphy, the pen does not write—it breathes. Every elongation of the letter Ha carries the breath of life. Working on 2-meter sheets requires physical immersion.',
    },
    layoutRatio: 'tall',
    collectionId: 'silent-letters',
    materials: ['Mulberry Deckle Wasli', 'Charred Lampblack Ink', '24k Gold Suspension', 'Brushed Steel Float Frame'],
    provenance: 'Featured centerpiece of the 2026 Archival Survey.',
  },
  {
    id: 'breath-across-still-water',
    code: 'MISHAL-2026-03',
    title: 'Breath Across Still Water',
    titleUrdu: 'ساکت پانی پر سانس',
    category: 'ABSTRACT',
    year: '2026',
    medium: 'Chinese ink, shell gold & gum arabic on distressed linen',
    dimensions: '100 × 100 cm (39.4 × 39.4 in)',
    image: 'https://lh3.googleusercontent.com/d/1COjWvYt9XL7xb_32Vk4YSkbxHCFyGfvP',
    status: 'Reserved',
    price: 'PKR 380,000',
    description:
      'Monochromatic gestural sweeps executed in meditative intervals. Calligraphic brush weight dissolves into atmospheric negative space.',
    curatorNote:
      'A quiet bridge between Eastern sumi-e tradition and Sufi devotional rhythm, featuring delicate specks of 22k gold dust on hand-loomed ground.',
    exhibitions: ['Lahore Atelier Private View (Feb 2026)'],
    audioGuide: {
      title: 'Subtle Geometry of Silence',
      duration: '01:15',
      transcript:
        'When the mind settles, the hand acts without hesitation. One single breath across the canvas leaves a trace that cannot be repeated.',
    },
    layoutRatio: 'square',
    collectionId: 'silent-letters',
    materials: ['Distressed Linen', 'Pure Lampblack', 'Shell Gold Dust', 'Ashwood Float Frame'],
    provenance: 'Reserved for private collection (Islamabad, Pakistan).',
  },
  {
    id: 'solitude-at-thirteenth-dusk',
    code: 'MISHAL-2025-22',
    title: 'Solitude at Thirteenth Dusk',
    titleUrdu: 'تیرہویں شام کی تنہائی',
    category: 'PAINTINGS',
    year: '2025',
    medium: 'Diptych, oil & natural lacquer on aged walnut panel',
    dimensions: '60 × 130 cm overall (23.6 × 51.2 in)',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBVPKHZ4Avkz05FpD_l-EG3uc6Nb-5oicFqOqqpaFJH1rvAxeee0v1EpEz0Fzcti92HISouwguNLT5Bo7tODCbUeNHQrZkDxwmnECmZt37qJaWV86zTMTOPe5d_N2MANCQ6MMfSMPhtjdK_U04KrvKVc9oolKMqgVuhe_ME22H7CZXngq2qnf3fRROgLB-nKgoqatEPsN0qPgP_pGy8klyro0bo6WfiyO8m2PF-_UINeKk7HplSAcny6w',
    status: 'Available',
    price: 'PKR 490,000',
    description:
      'Lyrical horizontal diptych depicting desert twilight dunes in tones of warm dusty rose, soft apricot, oxidized iron, and pale slate blue.',
    curatorNote:
      'Split across two connected panels, the horizon unbrokenly glides through delicate ridges of natural lacquer and mineral impasto.',
    exhibitions: ['Dubai Design District (D3) Curated Salon 2025'],
    audioGuide: {
      title: 'The Dual Horizon',
      duration: '01:50',
      transcript:
        'Diptychs create a caesura—a musical pause in the visual song. The viewer’s eye bridges the space between the panels, completing the landscape internally.',
    },
    layoutRatio: 'wide',
    collectionId: 'whispers',
    materials: ['Solid Walnut Wood', 'Oil & Lacquer', 'Mineral Oxides', 'Brass Cleat Hanging'],
    provenance: 'Direct from studio collection; condition report verified March 2026.',
  },
  {
    id: 'nur-divine-radiance',
    code: 'MISHAL-2026-11',
    title: 'Nūr (Divine Radiance Mandala)',
    titleUrdu: 'نور — اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ',
    category: 'CALLIGRAPHY',
    year: '2026',
    medium: 'Circular Diwani Jali, 22k shell gold & lapis pigment on dark wasli',
    dimensions: '120 × 120 cm (47.2 × 47.2 in)',
    image: 'https://lh3.googleusercontent.com/d/1mJu-D8pMha2phlsTG1J-UmEMX1aH7QdN',
    status: 'Available',
    price: 'PKR 650,000',
    description:
      'A concentric solar orbital geometry rendering the opening verse of Surah An-Nur in fluid Diwani Jali, radiating light outward from a dense core of devotion.',
    curatorNote:
      'Shell gold pulverized with natural gum arabic illuminates the dark indigo wasli paper, capturing cosmic harmony and acoustic vibration.',
    exhibitions: ['Kalam & Light Solo Tour (Lahore / Doha 2026)'],
    audioGuide: {
      title: 'Solar Geometry in Arabic Calligraphy',
      duration: '02:00',
      transcript:
        'The circle is the symbol of infinity, unity, and divine perfection. Here, the words curl like solar flares, reminding us that light is not static—it expands.',
    },
    layoutRatio: 'square',
    collectionId: 'silent-letters',
    materials: ['Dark Indigo Wasli', '22k Shell Gold Powder', 'Natural Lapis Lazuli', 'Museum UV Glazing'],
    provenance: 'Acquisition dossier available upon curatorial request.',
  },
  {
    id: 'kalam-and-silence',
    code: 'MISHAL-2025-09',
    title: 'Kalam & Silence (Poetry of Faiz)',
    titleUrdu: 'مقامِ فیض کوئی راہ میں جچا ہی نہیں',
    category: 'CALLIGRAPHY',
    year: '2025',
    medium: 'Fluid Lahori Nastaliq, organic walnut ink on 70-year aged wasli',
    dimensions: '140 × 110 cm (55.1 × 43.3 in)',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBceyBOkCVAONHpI6Sx0oyP0tkSUjD_Hts4exjepF_4At4egMe4dtKgbRdSPcXFYS7X1I6EQ9O_VyMMjuF-FlGsy7Sfxbmky7Kt0T0NEFps43sO-32IpqxgI39NCvOqs4fhzvIbgs7gWOGpo2CU0tCmgkvcmUk5804LVMd3ftnpYAXnZVrM3Qy4EYo3WRJKSe6hBlRPI5O2cJ80SQBwwRXHbn_9Jc_FZOT6FDmrB3R-PQLy2v0e2dz1xQ',
    status: 'Private Collection',
    price: 'PKR 520,000',
    description:
      'Verses of renowned Pakistani poet Faiz Ahmad Faiz rendered with hand-carved Punjab bamboo reed pens. A balance of poetic urgency with vast contemplative margins.',
    curatorNote:
      'Nastaliq is renowned as the bride of Islamic calligraphy. Mishal preserves its classical hanging weight while introducing contemporary editorial spacing.',
    exhibitions: ['Alhamra Arts Council Retrospective (Lahore 2025)'],
    audioGuide: {
      title: 'The Bride of Calligraphy: Nastaliq',
      duration: '01:45',
      transcript:
        'Urdu poetry carries a melancholy that requires the pen to glide like a bird coming to rest on water. The aged paper adds its own historic resonance.',
    },
    layoutRatio: 'tall',
    collectionId: 'silent-letters',
    materials: ['Aged Wasli Vellum', 'Walnut Gall Ink', 'Bamboo Qalam', 'Raw Silk Backing'],
    provenance: 'Acquired into Private Collection (Lahore).',
  },
  {
    id: 'opus-v-nocturne-gold',
    code: 'MISHAL-2026-17',
    title: 'Opus V: Nocturne Gold',
    titleUrdu: 'نوکٹرن گولڈ — شاہکار پنجم',
    category: 'ABSTRACT',
    year: '2026',
    medium: 'Oil, terracotta impasto & pure gold flecks on Belgian linen',
    dimensions: '160 × 130 cm (63 × 51.2 in)',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQZFnTH-_st43RlT9ePKKSY8D7BzwylcpQRohZUxBxDPR-oSRBy9CMrlrIuKOfMjg2bDmRdZbHLl3-2Siy5n7gAYcsHJXhWLgQLAi86hmT8Dhq-ZRunfDiimIZl1CA8GnA50oU7qpeHNyV3DDE34fQHuVQ6LzUXR8NTBgaVCh0iOcgmTNI10ZcH1rZIqxDnN1VS3Yz2yvwGVphMIrzo0U0k_1IKUWA3EbP8YZyLpTeHTSHKW8d4wz_lQ',
    status: 'Available',
    price: 'PKR 980,000',
    description:
      'Bold terracotta strokes paired with delicate gold leaf flecks and textured ivory impasto, reflecting architectural shadows under museum spotlighting.',
    curatorNote:
      'The surface creates an active relief that catches changing daylight throughout the day, evolving from warm rust at sunrise to luminous ember at dusk.',
    exhibitions: ['Art Dubai Modern & Contemporary 2026'],
    audioGuide: {
      title: 'Sculptural Pigment & Texture',
      duration: '01:30',
      transcript:
        'Paint is not just color—it is physical matter. The thick impasto creates its own shadows on the canvas, so the painting never stays the same as the sun moves across your room.',
    },
    layoutRatio: 'large',
    collectionId: 'beyond-color',
    materials: ['Heavy Belgian Linen', 'Mineral Pigment', '24k Gold Foil', 'Natural Resin Glaze'],
    provenance: 'Available for private studio acquisition.',
  },
  {
    id: 'wasli-fragment-vii',
    code: 'MISHAL-2025-31',
    title: 'Wasli Fragment VII: Ochre Veins',
    titleUrdu: 'وصلی ورق — خاک و زر',
    category: 'CUSTOM ART',
    year: '2025',
    medium: 'Chinese ink, shell gold & mineral washes on archival wasli',
    dimensions: '80 × 60 cm (31.5 × 23.6 in)',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCKUDAWIdqkm1k35nNL7DM0IJ-MfSxJtlFV3DnajC--4jtitNdbaSMfnE-MjTlESppxFaWYYYolr3iH-EclMZ1xyGYuWnoqbMl1WBDg8CHeoCGl9L4ufaU8zktlSFLRmz9hmarx2YSzudBJIYlcDLqO3XK8nts_CuIStFUZdL9AbYX6szH9ipex3xBYA-SNaYMkzULkLgHkR8WvG6gQYUkrA-Wq0p0ZIsdTO25MKnyWYZ4ICe-E2SPYeg',
    status: 'Available',
    price: 'PKR 240,000',
    description:
      'An intimate study exploring negative space, raw mineral veining, and hand-beaten gold accents framed inside an unlacquered oak museum box.',
    curatorNote:
      'Ideal for private collectors seeking an intimate, focused expression of Mishal’s signature material alchemy.',
    exhibitions: ['Monographs in Miniature (Lahore Atelier 2025)'],
    audioGuide: {
      title: 'The Intimate Scale',
      duration: '01:10',
      transcript:
        'In smaller works, every millimetre is magnified. A single drop of shell gold on unbleached wasli holds as much power as a two-meter mural.',
    },
    layoutRatio: 'tall',
    collectionId: 'whispers',
    materials: ['Handmade Wasli Sheet', 'Burnt Ochre', 'Shell Gold', 'Oak Museum Box'],
    provenance: 'Studio release, ready for immediate installation.',
  },
];

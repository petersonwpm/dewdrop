// DewDrop Flavors & Mineral Master Data
const DEWDROP_FLAVORS = [
  {
    id: 'yuzu-mint',
    number: '01',
    name: 'Yuzu & Mountain Mint',
    shortName: 'Yuzu Mint',
    tagline: 'Vibrant Japanese citrus with crisp alpine wild peppermint.',
    description: 'Cold-pressed Shikoku yuzu peel blended with wild-harvested Swiss alpine mint. Uplifting, crystalline, and delicately floral with an exhilarating frosty finish.',
    color: '#E5A93C',
    colorDark: '#926315',
    colorLight: '#FAF5E8',
    colorRgb: '229, 169, 60',
    canAccent: '#EAB34D',
    gradient: 'linear-gradient(145deg, #FFF9ED 0%, #F5E5C0 100%)',
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(229, 169, 60, 0.16) 0%, rgba(255, 255, 255, 0) 70%)',
    botanicalOrigin: 'Shikoku Island, Japan · Valais Alps, Switzerland',
    tastingNotes: {
      top: 'High-elevation yuzu zest, floral citrus mist',
      heart: 'Crushed mountain peppermint, alpine morning dew',
      finish: 'Pure crystalline basalt minerality with fine effervescence'
    },
    pairing: 'Raw hamachi crudo, grilled asparagus, focused afternoon thinking',
    specs: {
      ph: '7.8',
      tds: '182 mg/L',
      magnesium: '19 mg/L',
      silica: '44 mg/L',
      calcium: '32 mg/L',
      sugar: '0g',
      calories: '0'
    },
    badges: ['Award of Excellence 2026', 'Zero Sugar', 'Organic Botanicals']
  },
  {
    id: 'white-peach',
    number: '02',
    name: 'White Peach & Wild Rosemary',
    shortName: 'White Peach',
    tagline: 'Sun-ripened stone fruit with aromatic Tuscan rosemary dew.',
    description: 'Delicately harvested white peaches from Alto Adige married with vapor-distilled young rosemary sprigs. Velvety, soothing, and subtly herbaceous with extraordinary aromatic depth.',
    color: '#E58367',
    colorDark: '#A24832',
    colorLight: '#FCF2EE',
    colorRgb: '229, 131, 103',
    canAccent: '#EA8F75',
    gradient: 'linear-gradient(145deg, #FFF5F0 0%, #F6DDD2 100%)',
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(229, 131, 103, 0.16) 0%, rgba(255, 255, 255, 0) 70%)',
    botanicalOrigin: 'Val Venosta, Italy · Chianti Hills, Tuscany',
    tastingNotes: {
      top: 'White peach blossom, ripe summer orchard nectar',
      heart: 'Fresh needle rosemary, warm pine resin undertone',
      finish: 'Soft limestone minerality, rounded mouthfeel'
    },
    pairing: 'Truffled burrata, sourdough tartine, golden hour reverie',
    specs: {
      ph: '7.6',
      tds: '178 mg/L',
      magnesium: '18 mg/L',
      silica: '41 mg/L',
      calcium: '36 mg/L',
      sugar: '0g',
      calories: '0'
    },
    badges: ['Sommelier Choice', 'Zero Sugar', 'Organic Botanicals']
  },
  {
    id: 'glacier-cucumber',
    number: '03',
    name: 'Glacier Cucumber & Thyme',
    shortName: 'Glacier Cucumber',
    tagline: 'Hydrating crisp cucumber with French mountain thyme.',
    description: 'Hydro-distilled organic field cucumbers paired with wild high-mountain thyme. Deeply cooling, cleansing, and restorative—like stepping into a mountain spring mist at daybreak.',
    color: '#4A9B75',
    colorDark: '#276045',
    colorLight: '#EEF6F2',
    colorRgb: '74, 155, 117',
    canAccent: '#59AB85',
    gradient: 'linear-gradient(145deg, #F2F9F5 0%, #D8EDE1 100%)',
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(74, 155, 117, 0.16) 0%, rgba(255, 255, 255, 0) 70%)',
    botanicalOrigin: 'Provence, France · Berner Oberland, Switzerland',
    tastingNotes: {
      top: 'Cool morning cucumber rain, fresh melon peel snap',
      heart: 'Wild French thyme flower, green botanic aroma',
      finish: 'Ultra-clean glacial finish, crisp dry sparkle'
    },
    pairing: 'Mediterranean mezze, post-yoga hydration, summer oysters',
    specs: {
      ph: '7.9',
      tds: '185 mg/L',
      magnesium: '21 mg/L',
      silica: '46 mg/L',
      calcium: '35 mg/L',
      sugar: '0g',
      calories: '0'
    },
    badges: ['Purity Gold Medal', 'Zero Sugar', 'Organic Botanicals']
  },
  {
    id: 'lingonberry-spruce',
    number: '04',
    name: 'Nordic Lingonberry & Spruce',
    shortName: 'Lingonberry Spruce',
    tagline: 'Subarctic wild berries with tender young conifer needles.',
    description: 'Hand-foraged subarctic lingonberries steeped with steam-extracted early spring spruce tips. Brightly tart, earthy, and forest-scented with an invigorating northern aura.',
    color: '#C74360',
    colorDark: '#841E34',
    colorLight: '#FBF0F2',
    colorRgb: '199, 67, 96',
    canAccent: '#D3536F',
    gradient: 'linear-gradient(145deg, #FCF3F5 0%, #F5D9DF 100%)',
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(199, 67, 96, 0.16) 0%, rgba(255, 255, 255, 0) 70%)',
    botanicalOrigin: 'Norrland, Sweden · Black Forest, Germany',
    tastingNotes: {
      top: 'Wild crimson lingonberry snap, tart mountain red currant',
      heart: 'Fresh green spruce tip, crisp conifer resin',
      finish: 'Flinty volcanic rock minerality, persistent lively bead'
    },
    pairing: 'Artisan aged cheeses, dark 85% single-origin cacao, twilight dining',
    specs: {
      ph: '7.5',
      tds: '180 mg/L',
      magnesium: '17 mg/L',
      silica: '42 mg/L',
      calcium: '34 mg/L',
      sugar: '0g',
      calories: '0'
    },
    badges: ['Nordic Design Award', 'Zero Sugar', 'Organic Botanicals']
  },
  {
    id: 'blood-orange',
    number: '05',
    name: 'Moro Blood Orange & Bergamot',
    shortName: 'Blood Orange',
    tagline: 'Sun-drenched Sicilian volcanic citrus with Calabrian bergamot.',
    description: 'Volcanic Moro blood oranges grown on the slopes of Mount Etna balanced with essential oils of Calabrian bergamot. Rich, bittersweet, complex, and luminous.',
    color: '#D95A2B',
    colorDark: '#8E3211',
    colorLight: '#FDF1EB',
    colorRgb: '217, 90, 43',
    canAccent: '#E3693B',
    gradient: 'linear-gradient(145deg, #FDF4EE 0%, #F7DBCF 100%)',
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(217, 90, 43, 0.16) 0%, rgba(255, 255, 255, 0) 70%)',
    botanicalOrigin: 'Mount Etna, Sicily · Reggio Calabria, Italy',
    tastingNotes: {
      top: 'Moro crimson blood orange juice, bittersweet zest',
      heart: 'Aromatic Earl Grey bergamot petal, solar warmth',
      finish: 'Silky mineral effervescence, clean dry botanical finish'
    },
    pairing: 'Shaved fennel citrus salad, grilled sea bass, sunset negroni substitute',
    specs: {
      ph: '7.7',
      tds: '181 mg/L',
      magnesium: '20 mg/L',
      silica: '43 mg/L',
      calcium: '33 mg/L',
      sugar: '0g',
      calories: '0'
    },
    badges: ['Editor’s Selection', 'Zero Sugar', 'Organic Botanicals']
  }
];

// Mineral Matrix Reference Data
const MINERAL_COMPARISON = [
  {
    name: 'Silica (SiO₂)',
    dewdrop: '44 mg/L',
    standard: '4 mg/L',
    sanpellegrino: '7 mg/L',
    lacroix: '0 mg/L',
    benefit: 'Supports cellular hydration, collagen synthesis, and smooth velvety mouthfeel.'
  },
  {
    name: 'Magnesium (Mg²⁺)',
    dewdrop: '19 mg/L',
    standard: '3 mg/L',
    sanpellegrino: '52 mg/L (Bitter)',
    lacroix: '0 mg/L',
    benefit: 'Neurological equilibrium and muscle recovery without metallic aftertaste.'
  },
  {
    name: 'Calcium (Ca²⁺)',
    dewdrop: '34 mg/L',
    standard: '12 mg/L',
    sanpellegrino: '164 mg/L (Chalky)',
    lacroix: '0 mg/L',
    benefit: 'Optimal mineral density and crisp structural clarity on the palate.'
  },
  {
    name: 'Bicarbonates (HCO₃⁻)',
    dewdrop: '120 mg/L',
    standard: '25 mg/L',
    sanpellegrino: '243 mg/L',
    lacroix: '0 mg/L',
    benefit: 'Natural alkaline buffer that neutralizes botanical acidity smoothly.'
  },
  {
    name: 'TDS (Total Dissolved Solids)',
    dewdrop: '180 mg/L (Silky Ideal)',
    standard: '45 mg/L (Empty)',
    sanpellegrino: '860 mg/L (Heavy)',
    lacroix: '5 mg/L (Distilled)',
    benefit: 'The golden median of fine water: rich complexity without heaviness.'
  }
];

// Testimonials & Sommelier Endorsements
const TESTIMONIALS = [
  {
    quote: "DewDrop solves what fine dining has wrestled with for decades: a sparkling mineral water that enhances delicate ingredients rather than masking them with harsh industrial carbonation.",
    author: "Elena Laurent",
    role: "Head Sommelier, Restaurant L’Éther (3 Michelin Stars, Zurich)",
    avatar: "EL"
  },
  {
    quote: "The Yuzu & Mountain Mint is an architectural feat in beverage craft. The bubble size is extraordinarily tight, micro-effervescent, reminiscent of vintage blanc de blancs.",
    author: "Marcus Vance",
    role: "Beverage Director & Author of 'The Terroir of Water'",
    avatar: "MV"
  },
  {
    quote: "Finally, an artesian water in sustainable matte aluminum that treats botanicals with the reverence of fine perfumery. Nothing synthetic, zero sugar, total sensory clarity.",
    author: "Sophie Dahl-Chen",
    role: "Editor-at-Large, Monocle & Gastronomie Moderne",
    avatar: "SD"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEWDROP_FLAVORS, MINERAL_COMPARISON, TESTIMONIALS };
}

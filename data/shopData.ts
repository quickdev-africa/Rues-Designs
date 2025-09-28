'use client';

export interface Category {
  id: string;
  name: string;
  count: number;
  slug?: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  priceType: 'day' | 'week' | 'event';
  categoryId: string;
  subCategoryId?: string;
  images: string[];
  featured: boolean;
  available: boolean;
  minRentalDays: number;
}

// Categories data for shop filters
export const categories = [
  { id: 'tabletop', name: 'Tabletop', count: 28, slug: 'tabletop', imageUrl: '/images/stock/category-tabletop.jpg' },
  { id: 'linen', name: 'Linen', count: 22, slug: 'linen', imageUrl: '/images/stock/category-linen.jpg' },
  { id: 'draping', name: 'Draping', count: 15, slug: 'draping', imageUrl: '/images/stock/category-draping.jpg' },
  { id: 'candles', name: 'Candelabras & Candle Holders', count: 18, slug: 'candles', imageUrl: '/images/stock/category-candles.jpg' },
  { id: 'pedestals', name: 'Pedestals', count: 12, slug: 'pedestals', imageUrl: '/images/stock/category-pedestals.jpg' },
  { id: 'tables', name: 'Tables', count: 24, slug: 'tables', imageUrl: '/images/stock/category-tables.jpg' },
  { id: 'dining-chairs', name: 'Dining Chairs', count: 20, slug: 'dining-chairs', imageUrl: '/images/stock/category-dining-chairs.jpg' },
  { id: 'bar-cocktail', name: 'Bar Stools & Cocktail Tables', count: 16, slug: 'bar-cocktail', imageUrl: '/images/stock/category-bar-cocktail.jpg' },
  { id: 'shelves-bars', name: 'Shelves & Bars', count: 14, slug: 'shelves-bars', imageUrl: '/images/stock/category-shelves-bars.jpg' },
  { id: 'accent-chairs', name: 'Accent Chairs', count: 18, slug: 'accent-chairs', imageUrl: '/images/stock/category-accent-chairs.jpg' },
  { id: 'sofas', name: 'Sofas', count: 12, slug: 'sofas', imageUrl: '/images/stock/category-sofas.jpg' },
  { id: 'banquet-sofas', name: 'Banquet Sofas', count: 10, slug: 'banquet-sofas', imageUrl: '/images/stock/category-banquet-sofas.jpg' },
  { id: 'coffee-side', name: 'Coffee & Side Tables', count: 16, slug: 'coffee-side', imageUrl: '/images/stock/category-coffee-side.jpg' },
  { id: 'backdrops', name: 'Backdrops', count: 18, slug: 'backdrops', imageUrl: '/images/stock/category-backdrops.jpg' },
  { id: 'props', name: 'Props', count: 22, slug: 'props', imageUrl: '/images/stock/category-props.jpg' }
];

// Sub-categories for shop filters
export const subCategories: Record<string, Array<{ id: string, name: string, count: number }>> = {
  tabletop: [
    { id: 'plates', name: 'Plates', count: 10 },
    { id: 'cutlery', name: 'Cutlery', count: 8 },
    { id: 'glasses', name: 'Glasses', count: 12 },
    { id: 'napkins', name: 'Napkins', count: 6 }
  ],
  linen: [
    { id: 'tablecloths', name: 'Tablecloths', count: 12 },
    { id: 'runners', name: 'Table Runners', count: 8 },
    { id: 'napkins', name: 'Napkins', count: 10 },
    { id: 'chair-covers', name: 'Chair Covers', count: 6 }
  ],
  draping: [
    { id: 'ceiling-drapes', name: 'Ceiling Drapes', count: 5 },
    { id: 'wall-drapes', name: 'Wall Drapes', count: 6 },
    { id: 'backdrop-drapes', name: 'Backdrop Drapes', count: 4 }
  ],
  candles: [
    { id: 'taper-holders', name: 'Taper Holders', count: 8 },
    { id: 'pillar-candles', name: 'Pillar Candles', count: 6 },
    { id: 'votives', name: 'Votives', count: 10 },
    { id: 'candelabras', name: 'Candelabras', count: 4 }
  ],
  pedestals: [
    { id: 'tall', name: 'Tall Pedestals', count: 6 },
    { id: 'medium', name: 'Medium Pedestals', count: 4 },
    { id: 'small', name: 'Small Pedestals', count: 8 }
  ],
  tables: [
    { id: 'round-tables', name: 'Round Tables', count: 10 },
    { id: 'rectangular', name: 'Rectangular Tables', count: 8 },
    { id: 'square', name: 'Square Tables', count: 6 }
  ],
  'dining-chairs': [
    { id: 'chiavari', name: 'Chiavari Chairs', count: 12 },
    { id: 'ghost', name: 'Ghost Chairs', count: 8 },
    { id: 'folding', name: 'Folding Chairs', count: 8 }
  ],
  'bar-cocktail': [
    { id: 'bar-stools', name: 'Bar Stools', count: 8 },
    { id: 'cocktail-tables', name: 'Cocktail Tables', count: 6 },
    { id: 'high-tables', name: 'High Tables', count: 4 }
  ],
  'shelves-bars': [
    { id: 'display-shelves', name: 'Display Shelves', count: 6 },
    { id: 'bar-units', name: 'Bar Units', count: 8 }
  ],
  'accent-chairs': [
    { id: 'lounge-chairs', name: 'Lounge Chairs', count: 10 },
    { id: 'armchairs', name: 'Armchairs', count: 8 }
  ],
  sofas: [
    { id: 'two-seater', name: '2-Seater Sofas', count: 6 },
    { id: 'three-seater', name: '3-Seater Sofas', count: 6 }
  ],
  'banquet-sofas': [
    { id: 'long-sofas', name: 'Long Sofas', count: 5 },
    { id: 'modular', name: 'Modular Units', count: 5 }
  ],
  'coffee-side': [
    { id: 'coffee-tables', name: 'Coffee Tables', count: 8 },
    { id: 'side-tables', name: 'Side Tables', count: 8 }
  ],
  backdrops: [
    { id: 'fabric', name: 'Fabric Backdrops', count: 6 },
    { id: 'flower-walls', name: 'Flower Walls', count: 5 },
    { id: 'geometric', name: 'Geometric Backdrops', count: 4 },
    { id: 'custom', name: 'Custom Backdrops', count: 3 }
  ],
  props: [
    { id: 'signage', name: 'Signage', count: 8 },
    { id: 'centerpieces', name: 'Centerpieces', count: 10 },
    { id: 'decorative', name: 'Decorative Items', count: 12 }
  ]
};

// Price ranges
export const priceRanges = [
  { id: '0-25', name: '$0 - $25', min: 0, max: 25 },
  { id: '25-50', name: '$25 - $50', min: 25, max: 50 },
  { id: '50-100', name: '$50 - $100', min: 50, max: 100 },
  { id: '100-200', name: '$100 - $200', min: 100, max: 200 },
  { id: '200+', name: '$200+', min: 200, max: null }
];

// Sample products data
export const products: Product[] = [
  {
    id: 'gold-charger-plate',
    name: 'Gold Rim Charger Plate',
    slug: 'gold-rim-charger-plate',
    description: 'Elegant gold-rimmed glass charger plate, perfect for formal dinners and weddings.',
    price: 3.50,
    priceType: 'event',
    categoryId: 'tabletop',
    subCategoryId: 'plates',
    images: ['/images/stock/products/tabletop/gold-charger-1.jpg', '/images/stock/products/tabletop/gold-charger-2.jpg'],
    featured: true,
    available: true,
    minRentalDays: 2
  },
  {
    id: 'white-dinner-plate',
    name: 'Classic White Dinner Plate',
    slug: 'classic-white-dinner-plate',
    description: 'Timeless white porcelain dinner plate with a subtle raised rim. Versatile for any event.',
    price: 2.00,
    priceType: 'event',
    categoryId: 'tabletop',
    subCategoryId: 'plates',
    images: ['/images/stock/products/tabletop/white-plate-1.jpg'],
    featured: false,
    available: true,
    minRentalDays: 2
  },
  {
    id: 'crystal-wine-glass',
    name: 'Crystal Wine Glass',
    slug: 'crystal-wine-glass',
    description: 'Elegant crystal wine glass perfect for fine dining events and upscale weddings.',
    price: 2.25,
    priceType: 'event',
    categoryId: 'tabletop',
    subCategoryId: 'glassware',
    images: ['/images/stock/products/tabletop/wine-glass-1.jpg', '/images/stock/products/tabletop/wine-glass-2.jpg'],
    featured: true,
    available: true,
    minRentalDays: 2
  },
  {
    id: 'champagne-flute',
    name: 'Classic Champagne Flute',
    slug: 'classic-champagne-flute',
    description: 'Traditional champagne flute with a long stem for toasts and celebrations.',
    price: 1.75,
    priceType: 'event',
    categoryId: 'tabletop',
    subCategoryId: 'glassware',
    images: ['/images/stock/products/tabletop/champagne-flute-1.jpg'],
    featured: false,
    available: true,
    minRentalDays: 2
  },
  {
    id: 'gold-flatware-set',
    name: 'Gold Flatware Set',
    slug: 'gold-flatware-set',
    description: 'Luxurious gold-plated flatware set including knife, fork, and spoon. Adds elegance to any table setting.',
    price: 4.50,
    priceType: 'event',
    categoryId: 'tabletop',
    subCategoryId: 'flatware',
    images: ['/images/stock/products/tabletop/gold-flatware-1.jpg', '/images/stock/products/tabletop/gold-flatware-2.jpg'],
    featured: true,
    available: true,
    minRentalDays: 2
  },
  {
    id: 'ivory-tablecloth',
    name: 'Ivory Satin Tablecloth',
    slug: 'ivory-satin-tablecloth',
    description: 'Luxurious ivory satin tablecloth for round tables. Adds an elegant sheen to your event tables.',
    price: 15.00,
    priceType: 'event',
    categoryId: 'linen',
    subCategoryId: 'tablecloths',
    images: ['/images/stock/products/linen/ivory-tablecloth-1.jpg', '/images/stock/products/linen/ivory-tablecloth-2.jpg'],
    featured: true,
    available: true,
    minRentalDays: 3
  },
  {
    id: 'navy-table-runner',
    name: 'Navy Velvet Table Runner',
    slug: 'navy-velvet-table-runner',
    description: 'Rich navy velvet table runner that adds texture and depth to table settings.',
    price: 8.50,
    priceType: 'event',
    categoryId: 'linen',
    subCategoryId: 'runners',
    images: ['/images/stock/products/linen/navy-runner-1.jpg'],
    featured: false,
    available: true,
    minRentalDays: 3
  },
  {
    id: 'chiavari-gold',
    name: 'Gold Chiavari Chair',
    slug: 'gold-chiavari-chair',
    description: 'Classic gold Chiavari chair with optional cushion. Elegant seating for weddings and formal events.',
    price: 8.00,
    priceType: 'event',
    categoryId: 'dining-chairs',
    subCategoryId: 'chiavari',
    images: ['/images/stock/products/chairs/gold-chiavari-1.jpg', '/images/stock/products/chairs/gold-chiavari-2.jpg'],
    featured: true,
    available: true,
    minRentalDays: 3
  },
  {
    id: 'ghost-chair',
    name: 'Clear Ghost Chair',
    slug: 'clear-ghost-chair',
    description: 'Modern transparent acrylic chair that adds a contemporary touch to any event.',
    price: 12.00,
    priceType: 'event',
    categoryId: 'dining-chairs',
    subCategoryId: 'ghost',
    images: ['/images/stock/products/chairs/ghost-chair-1.jpg'],
    featured: true,
    available: true,
    minRentalDays: 3
  },
  {
    id: 'velvet-sofa-blue',
    name: 'Royal Blue Velvet Sofa',
    slug: 'royal-blue-velvet-sofa',
    description: 'Luxurious royal blue velvet sofa perfect for lounge areas and photo opportunities.',
    price: 185.00,
    priceType: 'event',
    categoryId: 'sofas',
    images: ['/images/stock/products/furniture/blue-sofa-1.jpg', '/images/stock/products/furniture/blue-sofa-2.jpg'],
    featured: true,
    available: true,
    minRentalDays: 3
  }
];

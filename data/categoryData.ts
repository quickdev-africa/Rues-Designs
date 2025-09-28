'use client';

import { categories, subCategories } from './shopData';

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  heroImage: string;
  bannerImage: string;
  quickFacts: {
    icon: string;
    title: string;
    description: string;
  }[];
  usageTips: string[];
  guidelines: string[];
  metaDescription: string;
  subCategories: Array<{ id: string; name: string; count: number }>;
}

// Create a comprehensive category information object
export const categoryInfo: Record<string, CategoryInfo> = {
  'tabletop': {
    id: 'tabletop',
    name: 'Tabletop',
    description: 'Transform your event tables with our premium tabletop rentals. From elegant dinner settings to casual gatherings, our tabletop collection offers plates, cutlery, glassware, and accessories to elevate any dining experience.',
    heroImage: '/images/stock/hero-tabletop.jpg',
    bannerImage: '/images/stock/banner-tabletop.jpg',
    quickFacts: [
      {
        icon: 'package',
        title: 'Place Settings',
        description: 'Available in sets of 8, 10, or 12'
      },
      {
        icon: 'sparkles',
        title: 'Materials',
        description: 'Fine china, crystal, silver, and gold-plated options'
      },
      {
        icon: 'palette',
        title: 'Design Styles',
        description: 'Modern, classic, vintage, and themed collections'
      },
      {
        icon: 'star',
        title: 'Most Popular',
        description: 'Gold-rimmed charger plates and crystal glassware'
      }
    ],
    usageTips: [
      'Allow 24" of table space per guest for comfortable dining',
      'For formal events, include all utensils needed for every course',
      'Consider chargers for elegant presentations under dinner plates',
      'Match glassware to your beverage service needs'
    ],
    guidelines: [
      'All items must be rinsed and free of food debris before return',
      'Broken items will be charged at replacement cost',
      'Minimum order of 8 place settings per style',
      'Special cleaning requirements apply for gold and silver items'
    ],
    metaDescription: 'Rent premium tabletop items including plates, cutlery, glassware, and serving pieces for your next event. Wide selection of styles from classic to modern.',
    subCategories: subCategories.tabletop || []
  },
  'linen': {
    id: 'linen',
    name: 'Linen',
    description: 'Set the foundation for your event design with our premium linen collection. From luxurious tablecloths to elegant napkins, our fabrics come in a variety of colors, textures, and sizes to match any theme or occasion.',
    heroImage: '/images/stock/hero-linen.jpg',
    bannerImage: '/images/stock/banner-linen.jpg',
    quickFacts: [
      {
        icon: 'ruler',
        title: 'Sizes Available',
        description: 'Standard and custom sizes for all table types'
      },
      {
        icon: 'palette',
        title: 'Color Range',
        description: 'Over 40 colors in stock with custom options available'
      },
      {
        icon: 'scissors',
        title: 'Fabric Types',
        description: 'Cotton, polyester, satin, velvet, sequin, and specialty blends'
      },
      {
        icon: 'refresh',
        title: 'Cleaning',
        description: 'Professional cleaning included in rental price'
      }
    ],
    usageTips: [
      'For floor-length tablecloths, measure from table top to floor and add 1"',
      'Layering different textures creates visual interest and depth',
      'Consider napkin folds that complement your event style',
      'Request linen samples to confirm colors match your palette perfectly'
    ],
    guidelines: [
      'Candle wax and wine stains require special cleaning fees',
      'All linens must be returned dry to prevent mildew',
      'No pins, tape, or adhesives should be used on linens',
      'Special handling required for sequined and delicate fabrics'
    ],
    metaDescription: 'Rent premium quality linens for events including tablecloths, napkins, runners, and chair covers in a wide range of colors, textures, and sizes.',
    subCategories: subCategories.linen || []
  },
  'draping': {
    id: 'draping',
    name: 'Draping',
    description: 'Transform any venue with our elegant draping solutions. Create stunning backdrops, ceiling treatments, and space dividers that add drama and sophistication to your event space. Available in sheer, opaque, and specialty fabrics.',
    heroImage: '/images/stock/hero-draping.jpg',
    bannerImage: '/images/stock/banner-draping.jpg',
    quickFacts: [
      {
        icon: 'layers',
        title: 'Fabric Options',
        description: 'Sheer voile, velvet, satin, and specialty textiles'
      },
      {
        icon: 'ruler',
        title: 'Standard Heights',
        description: '8ft, 10ft, 12ft, 14ft, and 16ft panels available'
      },
      {
        icon: 'tool',
        title: 'Installation',
        description: 'Professional installation and removal included'
      },
      {
        icon: 'lightbulb',
        title: 'Lighting Compatible',
        description: 'Can be paired with our lighting systems'
      }
    ],
    usageTips: [
      'Layer different fabrics for more dimension and texture',
      'Add lighting to enhance the draping effects',
      'Consider ceiling draping to lower high ceilings and create intimacy',
      'Use pipe and drape systems for quick room divisions'
    ],
    guidelines: [
      'Venue approval required before installation',
      'No pins, staples, or tape should be used on fabrics',
      'Fire retardant certification available upon request',
      'Minimum 48-hour advance notice required for installation'
    ],
    metaDescription: 'Create stunning event spaces with our premium draping services. Wall drapes, ceiling treatments, and backdrops available in various fabrics and colors.',
    subCategories: subCategories.draping || []
  },
  'candles': {
    id: 'candles',
    name: 'Candelabras & Candle Holders',
    description: 'Add warmth and ambiance to your event with our extensive collection of candelabras and candle holders. From elegant taper candle holders to modern geometric designs, we have options to suit any style and budget.',
    heroImage: '/images/stock/hero-candles.jpg',
    bannerImage: '/images/stock/banner-candles.jpg',
    quickFacts: [
      {
        icon: 'flame',
        title: 'Candle Types',
        description: 'Holders for tapers, pillars, votives, and floating candles'
      },
      {
        icon: 'zap',
        title: 'Flameless Options',
        description: 'LED candles available for venues with fire restrictions'
      },
      {
        icon: 'minimize-2',
        title: 'Heights',
        description: 'Range from 3" to 36" tall for varied displays'
      },
      {
        icon: 'droplet',
        title: 'Materials',
        description: 'Crystal, brass, gold, silver, and modern acrylic'
      }
    ],
    usageTips: [
      'Mix heights of candle holders for dynamic tablescapes',
      'Use LED candles when working with flammable materials like draping',
      'For outdoor events, consider hurricane holders to protect flames',
      'Arrange candles in odd-numbered groupings for visual appeal'
    ],
    guidelines: [
      'All candelabras must be returned clean and free of wax',
      'Special cleaning fee applies for excessive wax buildup',
      'Candles are not included with most candle holder rentals',
      'Venue fire regulations must be followed at all times'
    ],
    metaDescription: 'Create magical ambiance with our candelabra and candle holder rentals. Elegant options in crystal, metal, and contemporary designs for events and weddings.',
    subCategories: subCategories.candles || []
  },
  'pedestals': {
    id: 'pedestals',
    name: 'Pedestals',
    description: 'Elevate your event decor with our stylish collection of pedestals. Perfect for displaying floral arrangements, sculptures, or commemorative items, our pedestals add height, drama, and sophistication to any space.',
    heroImage: '/images/stock/hero-pedestals.jpg',
    bannerImage: '/images/stock/banner-pedestals.jpg',
    quickFacts: [
      {
        icon: 'arrow-up',
        title: 'Height Range',
        description: 'From 24" to 48" tall to suit different displays'
      },
      {
        icon: 'square',
        title: 'Surface Sizes',
        description: '8", 12", and 16" square or round tops available'
      },
      {
        icon: 'package',
        title: 'Materials',
        description: 'Acrylic, metal, wood, and marble-look finishes'
      },
      {
        icon: 'weight',
        title: 'Weight Capacity',
        description: 'Support up to 50lbs depending on model'
      }
    ],
    usageTips: [
      'Use varying heights to create visual interest in your space',
      'Consider pedestal material that complements your event theme',
      'Add uplighting around pedestals for dramatic effect',
      'Group pedestals in odd numbers for aesthetic appeal'
    ],
    guidelines: [
      'Inspect pedestals upon delivery for any damage',
      'Do not drag pedestals across floors to prevent damage',
      'Secure top-heavy arrangements to prevent tipping',
      'Some models may require professional installation'
    ],
    metaDescription: 'Rent elegant display pedestals for events in various heights, styles and materials. Perfect for floral arrangements, sculptures, and statement pieces.',
    subCategories: subCategories.pedestals || []
  },
  'tables': {
    id: 'tables',
    name: 'Tables',
    description: 'Find the perfect tables for your event from our extensive collection. We offer dining tables, buffet tables, cocktail tables, and specialty designs to accommodate any event layout and guest count.',
    heroImage: '/images/stock/hero-tables.jpg',
    bannerImage: '/images/stock/banner-tables.jpg',
    quickFacts: [
      {
        icon: 'users',
        title: 'Seating Capacity',
        description: 'Options from intimate 2-person to banquet tables for 12'
      },
      {
        icon: 'circle',
        title: 'Shapes Available',
        description: 'Round, rectangular, square, oval, and specialty shapes'
      },
      {
        icon: 'maximize',
        title: 'Size Range',
        description: 'Standard heights and sizes for all event needs'
      },
      {
        icon: 'tool',
        title: 'Setup Included',
        description: 'Professional delivery and arrangement'
      }
    ],
    usageTips: [
      'Round tables promote better conversation among guests',
      'Allow 24" per person for comfortable dining space',
      'Consider table height when selecting chairs (standard height is 30")',
      'For cocktail events, plan 1 high top table per 4-6 guests'
    ],
    guidelines: [
      'Tables must be protected from heat, moisture, and stains',
      'Do not sit, stand, or place extremely heavy items on tables',
      'All tables should be cleared of items before breakdown',
      'Damage beyond normal wear will incur replacement fees'
    ],
    metaDescription: 'Rent dining tables, cocktail tables, buffet tables and specialty tables for your event. Multiple sizes, shapes and styles available to suit any occasion.',
    subCategories: subCategories.tables || []
  },
  'dining-chairs': {
    id: 'dining-chairs',
    name: 'Dining Chairs',
    description: 'Complete your dining setup with our comfortable and stylish dining chairs. From classic Chiavari chairs to modern designs, we offer seating options that complement any table arrangement and event aesthetic.',
    heroImage: '/images/stock/hero-dining-chairs.jpg',
    bannerImage: '/images/stock/banner-dining-chairs.jpg',
    quickFacts: [
      {
        icon: 'maximize',
        title: 'Styles Available',
        description: 'Chiavari, cross-back, ghost, folding, and upholstered options'
      },
      {
        icon: 'palette',
        title: 'Color Options',
        description: 'Multiple finishes and cushion colors to match your theme'
      },
      {
        icon: 'box',
        title: 'Cushion Options',
        description: 'Standard, premium, and custom cushions available'
      },
      {
        icon: 'shield',
        title: 'Weight Capacity',
        description: 'All chairs safely support up to 300lbs'
      }
    ],
    usageTips: [
      'Order 5-10% extra chairs for unexpected guests',
      'Chiavari chairs look elegant with or without chair covers',
      'Consider chair height relative to your table height (standard is 18")',
      'Add chair caps or sashes for easy color coordination'
    ],
    guidelines: [
      'Do not stack chairs unless designed for stacking',
      'Chairs should be used on level surfaces only',
      'Return chairs free of decorations, tape, and other attachments',
      'Notify staff immediately of any broken chairs for safety reasons'
    ],
    metaDescription: 'Rent stylish dining chairs for weddings and events including Chiavari chairs, ghost chairs, folding chairs and more in various colors and styles.',
    subCategories: subCategories['dining-chairs'] || []
  },
  'bar-cocktail': {
    id: 'bar-cocktail',
    name: 'Bar Stools & Cocktail Tables',
    description: 'Create elegant cocktail areas with our bar stools and high-top tables. Perfect for networking events, cocktail hours, or casual receptions, these pieces encourage mingling while providing comfortable perching spots.',
    heroImage: '/images/stock/hero-bar-cocktail.jpg',
    bannerImage: '/images/stock/banner-bar-cocktail.jpg',
    quickFacts: [
      {
        icon: 'arrow-up',
        title: 'Standard Heights',
        description: '42" cocktail tables with 30" bar stools'
      },
      {
        icon: 'circle',
        title: 'Table Shapes',
        description: 'Round, square, and specialty shapes available'
      },
      {
        icon: 'users',
        title: 'Capacity',
        description: 'Tables accommodate 2-4 guests comfortably'
      },
      {
        icon: 'package',
        title: 'Materials',
        description: 'Metal, wood, acrylic, and upholstered options'
      }
    ],
    usageTips: [
      'Plan for 1 cocktail table per 4-6 guests for comfortable mingling',
      'Add linens to high-top tables for a more formal look',
      'Mix seating and standing tables for guest comfort',
      'Consider backless stools for space efficiency, backed stools for comfort'
    ],
    guidelines: [
      'Bar stools are for sitting only - not standing or climbing',
      'Keep cocktail tables away from dance floors to prevent tipping',
      'Standard weight capacity is 250lbs per stool',
      'Do not move tables with glassware still on them'
    ],
    metaDescription: 'Rent bar stools and cocktail tables for your next event. High-quality options in various styles to create perfect mingling spaces for receptions and parties.',
    subCategories: subCategories['bar-cocktail'] || []
  },
  'shelves-bars': {
    id: 'shelves-bars',
    name: 'Shelves & Bars',
    description: 'Elevate your event\'s beverage service with our stylish bars and display shelves. From elegant bar units to modern shelving for product displays, these versatile pieces add function and style to any event.',
    heroImage: '/images/stock/hero-shelves-bars.jpg',
    bannerImage: '/images/stock/banner-shelves-bars.jpg',
    quickFacts: [
      {
        icon: 'layout',
        title: 'Bar Styles',
        description: 'Standard, circular, LED, rustic, and modular options'
      },
      {
        icon: 'grid',
        title: 'Shelf Types',
        description: 'Etageres, backlit shelves, geometric, and tiered designs'
      },
      {
        icon: 'maximize',
        title: 'Dimensions',
        description: 'Bars: 4ft-8ft wide; Shelves: various configurations'
      },
      {
        icon: 'tool',
        title: 'Setup Required',
        description: 'Professional installation included for complex units'
      }
    ],
    usageTips: [
      'Allow 2ft of bar space per bartender for efficient service',
      'Use shelving to create visual interest and display products',
      'Add lighting to shelves to highlight special items or brand elements',
      'Consider bar backs or shelving behind bars for additional storage'
    ],
    guidelines: [
      'Bars must be placed on level surfaces',
      'No cutting directly on bar surfaces',
      'Weight limits vary by shelf unit - confirm before loading',
      'Bar units must be properly dried if exposed to liquids'
    ],
    metaDescription: 'Rent premium bar units and display shelving for events. Create stylish beverage stations and product displays with our selection of modern, classic, and illuminated options.',
    subCategories: subCategories['shelves-bars'] || []
  },
  'accent-chairs': {
    id: 'accent-chairs',
    name: 'Accent Chairs',
    description: 'Add style and comfortable seating to your event with our curated collection of accent chairs. Perfect for lounge areas, photo corners, or special guest seating, these distinctive pieces make a design statement.',
    heroImage: '/images/stock/hero-accent-chairs.jpg',
    bannerImage: '/images/stock/banner-accent-chairs.jpg',
    quickFacts: [
      {
        icon: 'layout',
        title: 'Styles Available',
        description: 'Wingback, armchair, slipper, barrel, tub, and modern designs'
      },
      {
        icon: 'feather',
        title: 'Upholstery Options',
        description: 'Velvet, leather, linen, and performance fabrics'
      },
      {
        icon: 'package',
        title: 'Coordinating Pieces',
        description: 'Matching ottomans and side tables available'
      },
      {
        icon: 'palette',
        title: 'Color Range',
        description: 'Neutrals, jewel tones, pastels, and statement colors'
      }
    ],
    usageTips: [
      'Create conversation areas with chairs facing each other',
      'Use accent chairs to define zones within larger spaces',
      'Add side tables between chairs for drinks and personal items',
      'Select chair styles that complement your overall event aesthetic'
    ],
    guidelines: [
      'Special care required for delicate fabrics like velvet',
      'Do not drag chairs across flooring',
      'Food and beverage stains may incur cleaning fees',
      'Some specialty chairs have lower weight capacities - please inquire'
    ],
    metaDescription: 'Rent stylish accent chairs for event lounges and special seating areas. Choose from modern, classic, and statement pieces in a variety of colors and upholstery options.',
    subCategories: subCategories['accent-chairs'] || []
  },
  'sofas': {
    id: 'sofas',
    name: 'Sofas',
    description: 'Create comfortable lounge areas with our collection of stylish sofas. From modern designs to classic styles, our sofas provide elegant seating for conversation areas, VIP sections, or relaxation zones at your event.',
    heroImage: '/images/stock/hero-sofas.jpg',
    bannerImage: '/images/stock/banner-sofas.jpg',
    quickFacts: [
      {
        icon: 'users',
        title: 'Seating Capacity',
        description: '2-seater and 3-seater options available'
      },
      {
        icon: 'maximize',
        title: 'Dimensions',
        description: '2-seater: 60" wide, 3-seater: 84" wide on average'
      },
      {
        icon: 'feather',
        title: 'Upholstery Types',
        description: 'Velvet, leather, linen, microfiber, and specialty fabrics'
      },
      {
        icon: 'layout',
        title: 'Styles',
        description: 'Modern, mid-century, tufted, sectional, and classic designs'
      }
    ],
    usageTips: [
      'Create conversation areas with sofas and accent chairs facing each other',
      'Add coffee tables in front of sofas (allow 18" clearance)',
      'Consider traffic flow when placing sofas in your floor plan',
      'Use throw pillows to add color accents to neutral sofas'
    ],
    guidelines: [
      'No standing, jumping, or sleeping on rental sofas',
      'Food and red wine stains may incur additional cleaning fees',
      'Some venues require floor protection under sofa legs',
      'Delivery fees may be higher for larger sofa pieces'
    ],
    metaDescription: 'Rent luxurious sofas for event lounges and VIP areas. Select from modern, classic, and statement sofas in a variety of colors, sizes, and upholstery options.',
    subCategories: subCategories.sofas || []
  },
  'banquet-sofas': {
    id: 'banquet-sofas',
    name: 'Banquet Sofas',
    description: 'Create sophisticated banquet-style seating with our collection of modular banquet sofas. Perfect for large events, these versatile pieces can be arranged in various configurations to maximize both seating and style.',
    heroImage: '/images/stock/hero-banquet-sofas.jpg',
    bannerImage: '/images/stock/banner-banquet-sofas.jpg',
    quickFacts: [
      {
        icon: 'users',
        title: 'Seating Capacity',
        description: 'Modular sections seat 2-3 guests each'
      },
      {
        icon: 'grid',
        title: 'Configuration Options',
        description: 'Straight runs, U-shapes, circles, and custom layouts'
      },
      {
        icon: 'feather',
        title: 'Upholstery Options',
        description: 'Velvet, leather, and performance fabrics'
      },
      {
        icon: 'tool',
        title: 'Setup',
        description: 'Professional installation included'
      }
    ],
    usageTips: [
      'Allow 24" of seating width per person for comfort',
      'Consider table height when selecting banquette seating',
      'Combine with dining chairs on opposite sides of tables',
      'Add pillows for color accents and additional back support'
    ],
    guidelines: [
      'Custom configurations must be finalized 7 days before event',
      'Minimum rental periods may apply for custom setups',
      'Special cleaning procedures required for upholstered pieces',
      'Not suitable for outdoor use unless specifically noted'
    ],
    metaDescription: 'Create elegant banquet seating with our modular sofa systems. Custom configurations available for weddings, galas, and special events requiring sophisticated seating arrangements.',
    subCategories: subCategories['banquet-sofas'] || []
  },
  'coffee-side': {
    id: 'coffee-side',
    name: 'Coffee & Side Tables',
    description: 'Complete your lounge areas with our stylish coffee and side tables. These functional pieces not only provide surfaces for drinks and personal items but also enhance your overall design aesthetic.',
    heroImage: '/images/stock/hero-coffee-side.jpg',
    bannerImage: '/images/stock/banner-coffee-side.jpg',
    quickFacts: [
      {
        icon: 'maximize',
        title: 'Dimensions',
        description: 'Coffee tables: 18-20"H, Side tables: 22-26"H'
      },
      {
        icon: 'circle',
        title: 'Shapes Available',
        description: 'Round, square, rectangular, oval, and specialty shapes'
      },
      {
        icon: 'package',
        title: 'Materials',
        description: 'Glass, wood, metal, marble, and mixed media'
      },
      {
        icon: 'grid',
        title: 'Nesting Options',
        description: 'Sets of 2-3 nesting tables available for flexible use'
      }
    ],
    usageTips: [
      'Position coffee tables 18" from sofas for comfortable reach',
      'Use side tables between chairs for shared access to drinks',
      'Consider table height relative to seating (coffee tables should be slightly lower than seat height)',
      'Mix materials and shapes for visual interest in lounge groupings'
    ],
    guidelines: [
      'Use coasters for all drinks to prevent damage',
      'Glass tops should be handled with care during setup',
      'Do not stand or sit on tables',
      'Maximum weight limits vary by style - please inquire'
    ],
    metaDescription: 'Rent stylish coffee tables and side tables for your event lounge areas. Choose from modern, classic, and luxury designs in various materials and finishes.',
    subCategories: subCategories['coffee-side'] || []
  },
  'backdrops': {
    id: 'backdrops',
    name: 'Backdrops',
    description: 'Create stunning focal points with our collection of event backdrops. Perfect for ceremonies, photo opportunities, or stage settings, our backdrops provide beautiful backgrounds that elevate your event design.',
    heroImage: '/images/stock/hero-backdrops.jpg',
    bannerImage: '/images/stock/banner-backdrops.jpg',
    quickFacts: [
      {
        icon: 'maximize',
        title: 'Standard Sizes',
        description: '8ft x 8ft, 8ft x 10ft, 10ft x 10ft, and custom dimensions'
      },
      {
        icon: 'grid',
        title: 'Styles Available',
        description: 'Floral walls, geometric designs, fabric, LED, and custom prints'
      },
      {
        icon: 'tool',
        title: 'Installation',
        description: 'Professional setup and removal included'
      },
      {
        icon: 'zap',
        title: 'Lighting Options',
        description: 'Integrated or supplemental lighting available'
      }
    ],
    usageTips: [
      'Consider the backdrop location relative to natural light sources',
      'Allow 3-4 feet of depth for photo opportunities in front of backdrops',
      'Add floor elements (like rugs or floral pieces) to complete the scene',
      'Consider backdrop height based on your tallest guests or design elements'
    ],
    guidelines: [
      'Venue approval required for installation methods',
      'Additional fees may apply for custom sizing or printing',
      'Outdoor use limited to certain backdrop types and weather conditions',
      'Some backdrops require power sources for lighting features'
    ],
    metaDescription: 'Rent stunning backdrops for ceremonies, photo booths, and stage designs. Choose from floral walls, custom prints, fabric draping, and illuminated backdrop options.',
    subCategories: subCategories.backdrops || []
  },
  'props': {
    id: 'props',
    name: 'Props',
    description: 'Add personality and visual interest to your event with our diverse collection of props. From signage to decorative elements, these finishing touches help tell your event story and create memorable moments.',
    heroImage: '/images/stock/hero-props.jpg',
    bannerImage: '/images/stock/banner-props.jpg',
    quickFacts: [
      {
        icon: 'grid',
        title: 'Categories',
        description: 'Signage, centerpieces, photo props, themed decor'
      },
      {
        icon: 'type',
        title: 'Custom Signage',
        description: 'Personalized welcome signs, seating charts, and directional signs'
      },
      {
        icon: 'package',
        title: 'Materials',
        description: 'Acrylic, wood, metal, neon, and mixed media'
      },
      {
        icon: 'camera',
        title: 'Photo Moments',
        description: 'Frames, backdrops, and interactive installations'
      }
    ],
    usageTips: [
      'Use signage to guide guests through your event experience',
      'Create vignettes with grouped props for visual impact',
      'Consider prop scale relative to your space',
      'Mix heights, textures, and materials for dimensional interest'
    ],
    guidelines: [
      'Handle delicate props with care to prevent damage',
      'Custom signage orders require 2-week advance notice',
      'All props must be returned in their original condition',
      'Some large props may require professional installation'
    ],
    metaDescription: 'Rent event props including custom signage, decorative elements, photo booth accessories, and themed décor pieces to add personality to your special occasion.',
    subCategories: subCategories.props || []
  }
};

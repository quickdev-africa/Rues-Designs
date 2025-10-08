// Placeholder images for products, events, testimonials
export const PLACEHOLDER_PRODUCT = '/assets/placeholders/product-placeholder.webp';
export const PLACEHOLDER_EVENT = '/assets/placeholders/event-placeholder.webp';
export const PLACEHOLDER_TESTIMONIAL = '/assets/placeholders/testimonial-placeholder.webp';

/**
 * Function to handle placeholder images
 * This is useful for development when actual images aren't available
 */
export function placeholderImage(path: string): string {
  // Always show real category images for these specific category files
  const allowedCategoryImages = [
    'category-tabletop.jpg',
    'category-linen.jpg',
    'category-draping.jpg',
    'category-candles.jpg',
    'category-pedestals.jpg',
    'category-tables.jpg',
    'category-dining-chairs.jpg',
    'category-bar-cocktail.jpg',
    'category-shelves-bars.jpg',
    'category-accent-chairs.jpg',
    'category-sofas.jpg',
    'category-banquet-sofas.jpg',
    'category-coffee-side.jpg',
    'category-backdrops.jpg',
    'category-props.jpg',
  ];
  for (const file of allowedCategoryImages) {
    if (path.endsWith(file)) {
      return path;
    }
  }
  // For production, return the path
  if (process.env.NODE_ENV === 'production') {
    return path;
  }
  // For other cases, use placeholders
  if (path.includes('/banner-') || path.includes('-hero')) {
    return '/assets/placeholders/banner-placeholder.svg';
  }
  if (path.includes('/products/')) {
    return '/assets/placeholders/product-placeholder.svg';
  }
  // Default fallback
  return '/assets/placeholders/product-placeholder.svg';
}

/**
 * Default image placeholder for products
 */
export const defaultProductImage = '/images/stock/product-placeholder.jpg';

/**
 * Default image placeholder for categories
 */
export const defaultCategoryImage = '/images/stock/category-placeholder.jpg';

/**
 * Default hero banner image
 */
export const defaultHeroImage = '/images/stock/banner-placeholder.jpg';

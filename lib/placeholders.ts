// Placeholder images for products, events, testimonials
export const PLACEHOLDER_PRODUCT = '/assets/placeholders/product-placeholder.webp';
export const PLACEHOLDER_EVENT = '/assets/placeholders/event-placeholder.webp';
export const PLACEHOLDER_TESTIMONIAL = '/assets/placeholders/testimonial-placeholder.webp';

/**
 * Function to handle placeholder images
 * This is useful for development when actual images aren't available
 */
export function placeholderImage(path: string): string {
  // For production, we'd just return the path
  if (process.env.NODE_ENV === 'production') {
    return path;
  }
  
  // For development, use static placeholder images instead of trying to append .html
  // This is a simplified approach until real images are available
  if (path.includes('/category-')) {
    return '/assets/placeholders/product-placeholder.svg';
  }
  
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

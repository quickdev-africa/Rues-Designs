# Image Requirements for Rues Design & Rental

This document outlines the image requirements for the Rues Design & Rental website.

## Image Placeholders and Sizes

### Hero Section
- **Path**: `/images/stock/party-hero.jpg`
- **Size**: 1200px × 800px
- **Type**: High-quality event/party setup photo
- **Used in**: HeroSection.tsx and page.tsx metadata

### Product Categories
- **Base Path**: `/images/stock/category-*.png`
- **Size**: 160px × 120px
- **Type**: Clear product category representations
- **Used in**: ProductCategoriesSection.tsx
- **Required Images**:
  - `/images/stock/category-tabletop.png`
  - `/images/stock/category-linen.png`
  - `/images/stock/category-draping.png`
  - `/images/stock/category-candle.png` (Candelabras and Candle Holders)
  - `/images/stock/category-pedestals.png`
  - `/images/stock/category-tables.png`
  - `/images/stock/category-dining-chairs.png`
  - `/images/stock/category-bar-cocktail.png` (Bar Stools and Cocktail Tables)
  - `/images/stock/category-shelves-bars.png`
  - `/images/stock/category-accent-chairs.png`
  - `/images/stock/category-sofas.png`
  - `/images/stock/category-banquet-sofas.png`
  - `/images/stock/category-coffee-side.png` (Coffee and Side Tables)
  - `/images/stock/category-backdrops.png`
  - `/images/stock/category-props.png`

### Featured Packages
- **Base Path**: `/images/stock/featured-*.jpg`
- **Size**: 600px × 400px
- **Type**: High-quality event package photos
- **Used in**: FeaturedPackagesSection.tsx
- **Required Images**:
  - `/images/stock/featured-bbq.jpg` (Large Barbecue & Champagne Spritzer)
  - `/images/stock/featured-lounge.jpg` (Summer Breeze Lounge & Dine)
  - `/images/stock/featured-wedding.jpg` (Wedding Worlds)
  - `/images/stock/featured-festival.jpg` (OMR Festival)

### Rent The Look
- **Base Path**: `/images/stock/look-*.jpg`
- **Size**: 600px × 400px
- **Type**: Styled event setups for inspiration
- **Used in**: RentTheLookSection.tsx
- **Required Images**:
  - `/images/stock/look-lounge.jpg` (Modern Lounge)
  - `/images/stock/look-dining.jpg` (Elegant Dining)
  - `/images/stock/look-outdoor.jpg` (Outdoor Chic)

### Highlights
- **Base Path**: `/images/stock/highlight-*.jpg`
- **Size**: 300px × 300px
- **Type**: Product photos on white/neutral background
- **Used in**: HighlightsSection.tsx
- **Required Images**:
  - `/images/stock/highlight-bowl.jpg` (Dip Bowl Pearl)
  - `/images/stock/highlight-plate.jpg` (Side Plate Pearl)
  - `/images/stock/highlight-chair.jpg` (Freistil 173 Chair)
  - `/images/stock/highlight-table.jpg` (Slit Table Mirror)

### Favicon
- **Path**: `/favicon.ico`
- **Size**: 32px × 32px and 16px × 16px (multi-size ICO file)
- **Type**: Company logo in icon format
- **Used in**: layout.tsx

### Logo Images
- **Path**: `/assets/logos/`
- **Size**: Various, primary logo at least 200px × 80px
- **Type**: Company logo in different formats (full color, white, etc.)

## Image Format Recommendations

- Use `.webp` format for better web performance with `.jpg` fallbacks for older browsers
- Optimize all images for web using tools like TinyPNG or ImageOptim
- Consider lazy loading for images below the fold
- Use responsive image techniques for better performance on mobile

## Image Directory Structure

```
public/
  images/
    stock/
      party-hero.jpg
      category-*.png
      featured-*.jpg
      look-*.jpg
      highlight-*.jpg
  assets/
    logos/
      logo-full.svg
      logo-white.svg
      logo-icon.svg
  favicon.ico
```

## Accessibility Guidelines

- Always include descriptive `alt` text for all images
- Use appropriate contrast ratios for text overlaid on images
- Consider users with slow connections by providing low-resolution placeholders

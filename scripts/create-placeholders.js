const fs = require('fs');
const path = require('path');

// Create public/images/stock directory if it doesn't exist
const stockImagesDir = path.join(__dirname, '../public/images/stock');
if (!fs.existsSync(stockImagesDir)) {
  fs.mkdirSync(stockImagesDir, { recursive: true });
}

// Create a simple HTML placeholder image for testing
function createPlaceholderHtml(width, height, text, bgColor = '#31473A', textColor = '#fff') {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Placeholder Image</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      width: ${width}px;
      height: ${height}px;
      background-color: ${bgColor};
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial, sans-serif;
    }
    .placeholder-text {
      color: ${textColor};
      font-size: 20px;
      text-align: center;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="placeholder-text">${text}</div>
</body>
</html>
  `;
  
  return html;
}

// Generate category image placeholders
const categories = [
  'tabletop',
  'linen',
  'draping',
  'candles',
  'pedestals',
  'tables',
  'dining-chairs',
  'bar-cocktail',
  'shelves-bars',
  'accent-chairs',
  'sofas',
  'banquet-sofas',
  'coffee-side',
  'backdrops',
  'props'
];

// Generate general placeholders
const generalPlaceholders = [
  { filename: 'categories-hero.jpg', text: 'Categories Hero Image' },
  { filename: 'banner-tabletop.jpg', text: 'Tabletop Banner' },
  { filename: 'banner-linen.jpg', text: 'Linen Banner' },
  { filename: 'banner-draping.jpg', text: 'Draping Banner' },
  { filename: 'banner-candles.jpg', text: 'Candles Banner' },
  { filename: 'banner-pedestals.jpg', text: 'Pedestals Banner' },
  { filename: 'banner-tables.jpg', text: 'Tables Banner' },
  { filename: 'banner-dining-chairs.jpg', text: 'Dining Chairs Banner' },
  { filename: 'banner-bar-cocktail.jpg', text: 'Bar & Cocktail Banner' },
  { filename: 'banner-shelves-bars.jpg', text: 'Shelves & Bars Banner' },
  { filename: 'banner-accent-chairs.jpg', text: 'Accent Chairs Banner' },
  { filename: 'banner-sofas.jpg', text: 'Sofas Banner' },
  { filename: 'banner-banquet-sofas.jpg', text: 'Banquet Sofas Banner' },
  { filename: 'banner-coffee-side.jpg', text: 'Coffee & Side Tables Banner' },
  { filename: 'banner-backdrops.jpg', text: 'Backdrops Banner' },
  { filename: 'banner-props.jpg', text: 'Props Banner' }
];

// Create category placeholders
categories.forEach(category => {
  const filename = `category-${category}.jpg`;
  const html = createPlaceholderHtml(800, 800, `${category.charAt(0).toUpperCase() + category.slice(1)} Category`);
  fs.writeFileSync(path.join(stockImagesDir, filename + '.html'), html);
  console.log(`Created placeholder: ${filename}.html`);
});

// Create general placeholders
generalPlaceholders.forEach(placeholder => {
  const html = createPlaceholderHtml(1200, 600, placeholder.text);
  fs.writeFileSync(path.join(stockImagesDir, placeholder.filename + '.html'), html);
  console.log(`Created placeholder: ${placeholder.filename}.html`);
});

// Create products folder for product images
const productsDir = path.join(stockImagesDir, 'products');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
  
  // Create category subfolders for products
  categories.forEach(category => {
    const categoryDir = path.join(productsDir, category);
    fs.mkdirSync(categoryDir, { recursive: true });
    console.log(`Created directory: products/${category}`);
  });
}

console.log('Placeholder images created successfully!');
console.log('Note: These are HTML files with .jpg.html extension for testing purposes.');
console.log('For production, replace these with actual JPG images.');

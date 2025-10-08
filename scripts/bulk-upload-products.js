// Bulk product uploader for Cloudinary images and category assignment
// Usage: node scripts/bulk-upload-products.js

const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const IMAGE_DIR = '/Users/user/Rues Designs/images'; // Absolute path to your images folder
// Supabase config
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const category = [
  'tabletop', 'linen', 'draping', 'candles', 'pedestals', 'tables', 'dining-chairs',
  'bar-cocktail', 'shelves-bars', 'accent-chairs', 'sofas', 'banquet-sofas',
  'coffee-side', 'backdrops', 'props'
];

// Short description generator
// Slug generator
function getSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
function getDescription(name) {
  return `Premium ${name.replace(/-/g, ' ')} for events, parties, and celebrations. Stylish, high-quality, and perfect for your next occasion.`;
}

// Assign category based on product name
function assignCategory(name, usedCategories) {
  const lower = name.toLowerCase();
  for (const cat of category) {
    if (lower.includes(cat.replace(/-/g, ' '))) return cat;
  }
  // Fallback: assign to least-used category
  let minCount = Infinity, chosen = category[0];
  for (const cat of category) {
    if ((usedCategories[cat] || 0) < minCount) {
      minCount = usedCategories[cat] || 0;
      chosen = cat;
    }
  }
  return chosen;
}

async function main() {
  // Fetch existing slugs from Supabase
  const { data: existingProducts, error: fetchError } = await supabase.from('products').select('slug');
  if (fetchError) {
    console.error('Error fetching existing slugs:', fetchError);
    process.exit(1);
  }
  const existingSlugs = new Set((existingProducts || []).map(p => p.slug));
  // Debug: check if folder exists
  if (!fs.existsSync(IMAGE_DIR)) {
    console.error('Image folder does not exist:', IMAGE_DIR);
    process.exit(1);
  }
  console.log('Image folder found:', IMAGE_DIR);
  const imageFiles = fs.readdirSync(IMAGE_DIR).filter(f => /\.(jpg|jpeg)$/i.test(f));
  if (imageFiles.length === 0) {
    console.error('No JPG/JPEG images found in:', IMAGE_DIR);
    process.exit(1);
  }
  console.log('Found images:', imageFiles);
  const usedCategories = {};
  const products = [];

  for (const file of imageFiles) {
    const name = path.basename(file, path.extname(file));
    const category = assignCategory(name, usedCategories);
    usedCategories[category] = (usedCategories[category] || 0) + 1;
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(path.join(IMAGE_DIR, file), {
      folder: 'products',
      public_id: name,
    });
    const slug = getSlug(name);
    if (existingSlugs.has(slug)) {
      console.log(`Skipping duplicate slug: ${slug}`);
      continue;
    }
    const product = {
      id: uuidv4(),
      name,
      slug,
      description: getDescription(name),
      daily_rate: 0,
      security_deposit: 0,
      images: [result.secure_url],
      specifications: {},
      quantity_available: 1,
      category,
      tags: [],
      is_active: true,
      requires_delivery: false,
      setup_time_minutes: 0,
      popularity_score: 0,
      pricing: {},
      // Optional fields below (add if needed):
      // weight_lbs: null,
      // dimensions: null,
      // care_instructions: null,
      // replacement_cost: null,
      // brand: null,
      // model: null,
      // condition: null,
    };
    products.push(product);
    console.log(`Uploaded and prepared: ${name}`);
  }

  // Insert products one-by-one to avoid batch duplicate errors
  let successCount = 0;
  for (const product of products) {
    const { error, data } = await supabase.from('products').insert(product);
    if (error) {
      if (error.code === '23505') {
        console.warn(`Duplicate key error for slug or unique field: ${product.slug}`);
      } else {
        console.error('Supabase insert error:', error);
      }
    } else {
      successCount++;
      console.log(`Inserted: ${product.name}`);
    }
  }
  console.log(`Bulk product upload complete. Inserted: ${successCount}`);
}

main().catch(console.error);

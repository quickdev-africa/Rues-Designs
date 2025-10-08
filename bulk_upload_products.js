// Bulk product uploader for RuesDesignl
// Requirements: node-fetch, form-data, @supabase/supabase-js, dotenv
// Usage: node bulk_upload_products.js

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');
const { createClient } = require('@supabase/supabase-js');

// === CONFIG ===
const IMAGES_DIR = './bulk_upload_images'; // Folder with product images
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET; // Optional, if using unsigned upload
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const CATEGORY_KEYWORDS = [
  { keyword: 'table', category: 'Tables' },
  { keyword: 'chair', category: 'Dining Chairs' },
  { keyword: 'sofa', category: 'Sofas' },
  { keyword: 'banquet', category: 'Banquet Sofas' },
  { keyword: 'coffee', category: 'Coffee & Side Tables' },
  { keyword: 'side', category: 'Coffee & Side Tables' },
  { keyword: 'linen', category: 'Linen' },
  { keyword: 'draping', category: 'Draping' },
  { keyword: 'candle', category: 'Candelabras & Candle Holders' },
  { keyword: 'pedestal', category: 'Pedestals' },
  { keyword: 'bar', category: 'Bar Stools & Cocktail Tables' },
  { keyword: 'shelf', category: 'Shelves & Bars' },
  { keyword: 'accent', category: 'Accent Chairs' },
  { keyword: 'backdrop', category: 'Backdrops' },
  { keyword: 'prop', category: 'Props' },
  { keyword: 'tabletop', category: 'Tabletop' },
];

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

function extractName(filename) {
  return filename
    .replace(/_result/i, '')
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function assignCategory(name) {
  const lower = name.toLowerCase();
  for (const { keyword, category } of CATEGORY_KEYWORDS) {
    if (lower.includes(keyword)) return category;
  }
  return 'Miscellaneous';
}

function generateInfo(name) {
  // Simple template, can be improved
  return `High quality ${name.toLowerCase()} for event and venue styling.`;
}

async function uploadToCloudinary(filePath, productName) {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));
  form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  form.append('folder', 'products');
  form.append('public_id', productName.replace(/\s+/g, '-').toLowerCase());
  const res = await fetch(CLOUDINARY_UPLOAD_URL, { method: 'POST', body: form });
  const data = await res.json();
  if (!data.secure_url) throw new Error('Cloudinary upload failed: ' + JSON.stringify(data));
  return data.secure_url;
}

async function main() {
  const files = fs.readdirSync(IMAGES_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  for (const file of files) {
    const name = extractName(file);
    const category = assignCategory(name);
    const info = generateInfo(name);
    const imagePath = path.join(IMAGES_DIR, file);
    console.log(`Uploading: ${name} [${category}]`);
    let imageUrl;
    try {
      imageUrl = await uploadToCloudinary(imagePath, name);
    } catch (e) {
      console.error('Image upload failed for', file, e);
      continue;
    }
    // Insert into Supabase
    const { error } = await supabase.from('products').insert({
      name,
      categories: [category],
      description: info,
      images: [imageUrl],
      pricing: { price: 0 }, // Set price as needed
      status: 'active',
    });
    if (error) {
      console.error('Supabase insert failed for', name, error);
    } else {
      console.log('Uploaded and inserted:', name);
    }
  }
}

main().catch(console.error);

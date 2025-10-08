// Bulk update product descriptions in Supabase
// Usage: node scripts/bulk-update-product-descriptions.js

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Example: Map product names to descriptions
const productDescriptions = {
  'Wire Pedestal Stand Gold': 'Elegant wire pedestal stand in gold, perfect for floral arrangements and event decor.',
  'Wave Velvet Ottoman Black': 'Luxurious black velvet ottoman for stylish seating at events and parties.',
  'Wave Velvet Ottoman - Multiple Colors': 'Versatile velvet ottoman available in multiple colors, ideal for modern event setups.',
  'Tufted Coffee Table White and Black': 'Premium Round Coffee Table Black Top White Base for events, parties, and celebrations. Stylish, high-quality, and perfect for your next occasion.',
  'Textured Glass Charger Plate Gold Rim': 'Textured glass charger plate with gold rim, adds elegance to any table setting.',
  // Add more mappings as needed
};

async function updateDescriptions() {
  for (const [name, description] of Object.entries(productDescriptions)) {
    const { data, error } = await supabase
      .from('products')
      .update({ description })
      .eq('name', name);
    if (error) {
      console.error(`Error updating ${name}:`, error.message);
    } else {
      console.log(`Updated description for: ${name}`);
    }
  }
  console.log('Bulk update complete.');
}

updateDescriptions();

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const env = {};
envContent.split('\n').forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      const key = trimmed.substring(0, idx).trim();
      const val = trimmed.substring(idx + 1).trim();
      env[key] = val;
    }
  }
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(url, key);

async function seed() {
  console.log('Seeding Doutare Agro Farm database...\n');

  // 1. Categories
  console.log('1. Seeding categories...');
  const categories = [
    { id: 'cat-plantain', slug: 'plantain', name: 'Plantain Plantation & Suckers', description: 'Bio-treated sword and maiden head suckers, green plantain bunches', icon: 'Sprout', display_order: 1 },
    { id: 'cat-garri', slug: 'garri', name: 'Cassava & Yellow Garri Processing', description: 'Delta yellow garri fried with organic palm oil, bio-fortified', icon: 'Wheat', display_order: 2 },
    { id: 'cat-catfish', slug: 'catfish', name: 'Aquaculture & Fisheries', description: 'Live earthen-pond and kiln-smoked African catfish (Clarias)', icon: 'Fish', display_order: 3 },
    { id: 'cat-maize', slug: 'maize', name: 'Grains & Arable Farming', description: 'Shelled yellow maize, feeds and human consumption', icon: 'Sun', display_order: 4 },
    { id: 'cat-poultry', slug: 'poultry', name: 'Poultry & Livestock', description: 'Commercial table eggs, jumbo crates direct from pen', icon: 'Egg', display_order: 5 }
  ];

  const { error: catErr } = await supabase.from('categories').upsert(categories, { onConflict: 'id' });
  if (catErr) console.error('Categories error:', catErr);
  else console.log('  ✓ 5 Categories seeded');

  // 2. Products
  console.log('2. Seeding products...');
  const products = [
    {
      id: 'prod-suckers-01',
      title: 'High-Yield Plantain Suckers (Bio-Treated)',
      slug: 'plantain-suckers-bio-treated',
      category_id: 'cat-plantain',
      category_label: 'Plantain Plantation',
      short_description: 'Giant French & False Horn jumbo suckers, bio-treated against nematodes & weevils.',
      description: 'Sourced directly from our Ayakoromo nursery in Burutu LGA. Our suckers undergo strict hot-water & biological sanitization, ensuring 95%+ field survival, thick pseudo-stems, and heavy fruit bunch emergence in 10-12 months.',
      image_url: '/images/plantain-suckers-pile.jpg',
      unit: 'sucker',
      is_featured: true,
      in_stock: true
    },
    {
      id: 'prod-garri-01',
      title: 'Doutare Crispy Yellow Garri (Vitamin-A Bio-Fortified)',
      slug: 'doutare-yellow-garri',
      category_id: 'cat-garri',
      category_label: 'Cassava & Agro-Processing',
      short_description: 'Stone-free, sand-free, well-sifted, dry crispy Delta yellow garri fried with organic palm oil.',
      description: 'Processed from mature cassava harvested from Ayakoromo riverine loam soils. Naturally fermented for 72 hours, hydraulically dewatered, and fried with red palm oil to deliver high crispiness, zero grit, and great swelling ratio.',
      image_url: '/images/yellow-garri-bowl.jpg',
      unit: 'bag',
      is_featured: true,
      in_stock: true
    },
    {
      id: 'prod-catfish-01',
      title: 'Freshwater Delta African Catfish (Live & Smoked)',
      slug: 'freshwater-catfish',
      category_id: 'cat-catfish',
      category_label: 'Aquaculture & Fisheries',
      short_description: 'Organically raised Clarias gariepinus from our clean riverine flow-through earthen ponds.',
      description: 'Grown in pure freshwater delta currents at Ayakoromo. Free from mud odor. Available live in aeration tanks or hardwood-smoked in hygienic smoking kilns with zero chemical preservatives.',
      image_url: '/images/smoked-catfish.jpg',
      unit: 'kg',
      is_featured: true,
      in_stock: true
    },
    {
      id: 'prod-maize-01',
      title: 'Clean Shelled Yellow Feed Maize (100kg Bag)',
      slug: 'shelled-yellow-maize',
      category_id: 'cat-maize',
      category_label: 'Grains & Feed Agro',
      short_description: 'Sun-dried, machine-cleaned, high-protein yellow maize with <12% moisture content.',
      description: 'Cultivated in fertile alluvial soils of Burutu LGA. Threshed, winnowed, and fumigated for pest-free storage. Ideal for poultry and fish feed compounding, livestock, or industrial millers.',
      image_url: '/images/maize-harvest.jpg',
      unit: 'bag',
      is_featured: false,
      in_stock: true
    },
    {
      id: 'prod-eggs-01',
      title: 'Fresh Farm Table Eggs (Wholesale Crates)',
      slug: 'fresh-table-eggs',
      category_id: 'cat-poultry',
      category_label: 'Poultry Production',
      short_description: 'Farm-fresh brown eggs with deep yellow yolks from healthy, grain-fed ISA Brown layers.',
      description: 'Collected twice daily from our Ayakoromo pens. Inspected, graded, and packed in reinforced paper crates. High yolk-to-white ratio with thick albumen and strong eggshells.',
      image_url: '/images/table-eggs.jpg',
      unit: 'crate',
      is_featured: false,
      in_stock: true
    }
  ];

  const { error: prodErr } = await supabase.from('products').upsert(products, { onConflict: 'id' });
  if (prodErr) console.error('Products error:', prodErr);
  else console.log('  ✓ 5 Products seeded');

  // 3. Product Variants
  console.log('3. Seeding product variants...');
  const variants = [
    { id: 'var-suck-sword', product_id: 'prod-suckers-01', sku: 'SCK-SWORD', title: 'Sword Sucker (Premium Vigorous)', price: 400.00, compare_at_price: 500.00, weight_kg: 2.50, in_stock: true },
    { id: 'var-suck-maiden', product_id: 'prod-suckers-01', sku: 'SCK-MAIDEN', title: 'Maiden Head Corm Sucker', price: 350.00, compare_at_price: 450.00, weight_kg: 3.00, in_stock: true },
    { id: 'var-suck-peeper', product_id: 'prod-suckers-01', sku: 'SCK-PEEPER', title: 'Nursery Peeper Seedling', price: 300.00, compare_at_price: 380.00, weight_kg: 1.50, in_stock: true },
    { id: 'var-garri-50kg', product_id: 'prod-garri-01', sku: 'GAR-50KG', title: '50kg Woven Sack', price: 45000.00, compare_at_price: 50000.00, weight_kg: 50.00, in_stock: true },
    { id: 'var-garri-100kg', product_id: 'prod-garri-01', sku: 'GAR-100KG', title: '100kg Jute Export Bag', price: 88000.00, compare_at_price: 95000.00, weight_kg: 100.00, in_stock: true },
    { id: 'var-garri-paint', product_id: 'prod-garri-01', sku: 'GAR-PAINT', title: 'Paint Rubber Bucket (4 Litres)', price: 4000.00, compare_at_price: 4500.00, weight_kg: 3.50, in_stock: true },
    { id: 'var-fish-live-1kg', product_id: 'prod-catfish-01', sku: 'FSH-LIVE-1KG', title: 'Live Table Size (1kg - 1.5kg)', price: 3200.00, compare_at_price: 3500.00, weight_kg: 1.20, in_stock: true },
    { id: 'var-fish-smoke-ctn', product_id: 'prod-catfish-01', sku: 'FSH-SMK-CTN', title: 'Smoked Dried (5kg Carton)', price: 38000.00, compare_at_price: 42000.00, weight_kg: 5.00, in_stock: true },
    { id: 'var-maize-100kg', product_id: 'prod-maize-01', sku: 'MZ-100KG', title: '100kg Standard Burlap Bag', price: 62000.00, compare_at_price: 68000.00, weight_kg: 100.00, in_stock: true },
    { id: 'var-maize-50kg', product_id: 'prod-maize-01', sku: 'MZ-50KG', title: '50kg Sifter Feed Bag', price: 32000.00, compare_at_price: 35000.00, weight_kg: 50.00, in_stock: true },
    { id: 'var-egg-crate-single', product_id: 'prod-eggs-01', sku: 'EGG-CRATE', title: 'Single Crate (30 Large Eggs)', price: 4800.00, compare_at_price: 5200.00, weight_kg: 1.80, in_stock: true },
    { id: 'var-egg-bundle-5', product_id: 'prod-eggs-01', sku: 'EGG-BNDL-5', title: 'Wholesale Bundle (5 Crates)', price: 23500.00, compare_at_price: 26000.00, weight_kg: 9.00, in_stock: true }
  ];

  const { error: varErr } = await supabase.from('product_variants').upsert(variants, { onConflict: 'sku' });
  if (varErr) console.error('Variants error:', varErr);
  else console.log('  ✓ 12 Product variants seeded');

  // 4. Wholesale Tiers
  console.log('4. Seeding wholesale tiers...');
  const tiers = [
    { product_id: 'prod-suckers-01', min_qty: 100, discounted_price: 320.00 },
    { product_id: 'prod-suckers-01', min_qty: 500, discounted_price: 280.00 },
    { product_id: 'prod-suckers-01', min_qty: 1000, discounted_price: 250.00 },
    { product_id: 'prod-garri-01', min_qty: 10, discounted_price: 41000.00 },
    { product_id: 'prod-garri-01', min_qty: 30, discounted_price: 38500.00 },
    { product_id: 'prod-garri-01', min_qty: 50, discounted_price: 36000.00 },
    { product_id: 'prod-catfish-01', min_qty: 10, discounted_price: 34000.00 },
    { product_id: 'prod-catfish-01', min_qty: 25, discounted_price: 31000.00 },
    { product_id: 'prod-maize-01', min_qty: 10, discounted_price: 58000.00 },
    { product_id: 'prod-maize-01', min_qty: 50, discounted_price: 54000.00 },
    { product_id: 'prod-eggs-01', min_qty: 20, discounted_price: 4400.00 },
    { product_id: 'prod-eggs-01', min_qty: 50, discounted_price: 4100.00 }
  ];

  const { error: tierErr } = await supabase.from('wholesale_tiers').insert(tiers);
  if (tierErr) console.error('Tiers error:', tierErr);
  else console.log('  ✓ 12 Wholesale tiers seeded');

  // 5. Orders
  console.log('5. Seeding initial wholesale orders...');
  const orders = [
    {
      id: 'b0000001-0000-0000-0000-000000000001',
      order_number: 'DTO-2026-8812',
      customer_name: 'Engr. Kenneth Ebi',
      customer_phone: '+234 803 456 7890',
      customer_email: 'k.ebi@oilserv.com',
      shipping_address_line: 'Wharf Road, Marine Jetty Loading Bay',
      shipping_city: 'Warri',
      shipping_state: 'Delta State',
      shipping_method: 'Boat Cargo (Burutu Waterway)',
      subtotal_amount: 540000.00,
      shipping_fee: 25000.00,
      total_amount: 565000.00,
      status: 'harvesting',
      payment_status: 'paid',
      notes: 'Priority cargo boat departure from Ayakoromo Waterfront at 07:00 AM.'
    },
    {
      id: 'b0000001-0000-0000-0000-000000000002',
      order_number: 'DTO-2026-8813',
      customer_name: 'Madam Tariere Clark',
      customer_phone: '+234 812 345 6789',
      customer_email: 'tariere.clark@yahoo.com',
      shipping_address_line: 'Mile 12 Agro Commodity Terminal',
      shipping_city: 'Lagos',
      shipping_state: 'Lagos State',
      shipping_method: 'Interstate Road Haulage',
      subtotal_amount: 2000000.00,
      shipping_fee: 50000.00,
      total_amount: 2050000.00,
      status: 'in_transit',
      payment_status: 'paid',
      notes: 'Loaded into 15-ton refrigerated truck at Warri transit hub.'
    },
    {
      id: 'b0000001-0000-0000-0000-000000000003',
      order_number: 'DTO-2026-8814',
      customer_name: 'Pastor David Opubo',
      customer_phone: '+234 807 112 2334',
      customer_email: 'd.opubo@gmail.com',
      shipping_address_line: 'Ayakoromo Farm Waterfront Jetty',
      shipping_city: 'Burutu LGA',
      shipping_state: 'Delta State',
      shipping_method: 'Farm-Gate Pickup',
      subtotal_amount: 191000.00,
      shipping_fee: 0.00,
      total_amount: 191000.00,
      status: 'ready_for_pickup',
      payment_status: 'paid',
      notes: 'Self collection via motorized river boat.'
    }
  ];

  const { error: ordErr } = await supabase.from('orders').upsert(orders, { onConflict: 'order_number' });
  if (ordErr) console.error('Orders error:', ordErr);
  else console.log('  ✓ 3 Wholesale orders seeded');

  // 6. Sucker Reservations
  console.log('6. Seeding plantain nursery reservations...');
  const suckers = [
    {
      batch_code: 'SCK-AYK-2026-B01',
      customer_name: 'Engr. Kenneth Ebi',
      customer_phone: '+234 803 456 7890',
      variety: 'Giant French Plantain',
      sucker_type: 'Sword Sucker',
      quantity: 500,
      nursery_bed: 'Nursery Bed 1 (Ayakoromo Central)',
      bio_sanitization_temp_c: 54.0,
      sanitization_status: 'sanitized',
      collection_jetty: 'Ayakoromo Marine Jetty (Burutu LGA)',
      notes: 'Hot-water dipped at 54°C for 20 minutes to eliminate plantain nematodes and weevil eggs.'
    },
    {
      batch_code: 'SCK-AYK-2026-B02',
      customer_name: 'Pastor David Opubo',
      customer_phone: '+234 807 112 2334',
      variety: 'False Horn Plantain (Agbagba)',
      sucker_type: 'Maiden Head Corm',
      quantity: 100,
      nursery_bed: 'Nursery Bed 2 (Ayakoromo Creek)',
      bio_sanitization_temp_c: 54.0,
      sanitization_status: 'sanitized',
      collection_jetty: 'Ayakoromo Marine Jetty (Burutu LGA)',
      notes: 'High suckering rate, pre-hardened for immediate field transplanting.'
    }
  ];

  const { error: sckErr } = await supabase.from('sucker_reservations').upsert(suckers, { onConflict: 'batch_code' });
  if (sckErr) console.error('Sucker reservations error:', sckErr);
  else console.log('  ✓ 2 Sucker nursery reservations seeded');

  console.log('\n🎉 Database seeding complete!');
}

seed();


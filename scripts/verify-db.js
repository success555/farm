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

if (!url || !key) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(url, key);

async function runCheck() {
  console.log('\n========================================');
  console.log('   DOUTARE AGRO FARM - SUPABASE STATUS   ');
  console.log('========================================\n');
  console.log(`Connecting to: ${url}\n`);

  // 1. Check Storage Buckets
  console.log('--- STORAGE BUCKETS ---');
  const { data: buckets, error: bErr } = await supabase.storage.listBuckets();
  if (bErr) {
    console.error('❌ Storage Error:', bErr.message);
  } else {
    buckets.forEach((b) => {
      console.log(`  ✓ Bucket: [${b.name}] (public: ${b.public})`);
    });
  }

  // 2. Check Database Tables
  console.log('\n--- DATABASE TABLES ---');
  const tables = [
    'categories',
    'products',
    'product_variants',
    'wholesale_tiers',
    'orders',
    'order_items',
    'sucker_reservations',
    'delivery_locations',
    'profiles',
  ];

  let missingCount = 0;
  for (const table of tables) {
    const { data, count, error } = await supabase
      .from(table)
      .select('*')
      .limit(1);

    if (error) {
      console.log(`  ❌ ${table}: ${error.message}`);
      missingCount++;
    } else {
      console.log(`  ✓ ${table}: Ready`);
    }
  }

  console.log('\n========================================');
  if (missingCount === 0) {
    console.log('  🎉 ALL TABLES & BUCKETS FULLY OPERATIONAL!');
  } else {
    console.log(`  ⚠️  ${missingCount} tables need schema initialization.`);
    console.log('  Run the SQL script at: supabase/schema.sql in your Supabase SQL editor:');
    console.log(`  https://supabase.com/dashboard/project/${url.replace('https://', '').replace('.supabase.co', '')}/sql/new`);
  }
  console.log('========================================\n');
}

runCheck();

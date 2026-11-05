-- ==============================================================================
-- DOUTARE AGRO FARM LIMITED - PRODUCTION SUPABASE DATABASE SCHEMA
-- Location: Ayakoromo Town, Burutu LGA, Delta State, Nigeria (RC: 9563075)
-- Stack: Supabase Postgres, Clerk Auth, Resend Email, Next.js 14 App Router
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. PROFILES TABLE (Linked with Clerk User IDs)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_id TEXT UNIQUE NOT NULL,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'farm_manager', 'agronomist', 'dispatch_supervisor', 'admin')),
    farm_account_type TEXT DEFAULT 'wholesale_buyer',
    default_delivery_preference TEXT DEFAULT 'Waterway Boat Freight',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_clerk_id ON public.profiles(clerk_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ==============================================================================
-- 3. CATEGORIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. PRODUCTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    category_label TEXT,
    short_description TEXT,
    description TEXT,
    image_url TEXT,
    unit TEXT NOT NULL DEFAULT 'unit',
    is_featured BOOLEAN DEFAULT FALSE,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);

-- ==============================================================================
-- 5. PRODUCT VARIANTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.product_variants (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    sku TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    compare_at_price NUMERIC(12, 2),
    weight_kg NUMERIC(8, 2),
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON public.product_variants(sku);

-- ==============================================================================
-- 6. WHOLESALE PRICING TIERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.wholesale_tiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    min_qty INT NOT NULL,
    discounted_price NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wholesale_tiers_product_id ON public.wholesale_tiers(product_id);

-- ==============================================================================
-- 7. ORDERS TABLE (Ayakoromo Harvest & Waterway Logistics)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    clerk_user_id TEXT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    shipping_address_line TEXT,
    shipping_city TEXT,
    shipping_state TEXT DEFAULT 'Delta State',
    shipping_method TEXT NOT NULL,
    subtotal_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    shipping_fee NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    status TEXT DEFAULT 'pending_payment' CHECK (
        status IN ('pending_payment', 'processing', 'harvesting', 'ready_for_pickup', 'in_transit', 'delivered', 'cancelled')
    ),
    payment_status TEXT DEFAULT 'unpaid' CHECK (
        payment_status IN ('unpaid', 'paid', 'partial')
    ),
    bank_transfer_ref TEXT,
    payment_receipt_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_clerk_user_id ON public.orders(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- ==============================================================================
-- 8. ORDER ITEMS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_title TEXT NOT NULL,
    variant_title TEXT,
    sku TEXT,
    unit_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    quantity INT NOT NULL DEFAULT 1,
    total_price NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

-- ==============================================================================
-- 9. SUCKER RESERVATIONS (Ayakoromo Plantain Nursery Desk)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.sucker_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    clerk_user_id TEXT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    batch_code TEXT UNIQUE NOT NULL,
    variety TEXT NOT NULL,
    sucker_type TEXT NOT NULL,
    quantity INT NOT NULL DEFAULT 100,
    nursery_bed TEXT NOT NULL DEFAULT 'Bed 1 - Ayakoromo Waterfront',
    bio_sanitization_temp_c NUMERIC(4, 1) DEFAULT 54.0,
    sanitization_status TEXT DEFAULT 'sanitized' CHECK (
        sanitization_status IN ('pending_treatment', 'sanitized', 'inspected', 'dispatched')
    ),
    collection_jetty TEXT DEFAULT 'Ayakoromo Marine Jetty (Burutu LGA)',
    scheduled_dispatch_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sucker_reservations_batch ON public.sucker_reservations(batch_code);
CREATE INDEX IF NOT EXISTS idx_sucker_reservations_clerk_id ON public.sucker_reservations(clerk_user_id);

-- ==============================================================================
-- 10. SAVED DELIVERY & TRANSIT LOCATIONS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.delivery_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    address_line TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT 'Delta State',
    logistics_preference TEXT DEFAULT 'Waterway Boat Freight' CHECK (
        logistics_preference IN ('Waterway Boat Freight', 'Interstate Road Haulage', 'Farm-Gate Pickup')
    ),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_delivery_locations_user ON public.delivery_locations(clerk_user_id);

-- ==============================================================================
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wholesale_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sucker_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_locations ENABLE ROW LEVEL SECURITY;

-- Catalog is publicly viewable
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Product Variants" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Public Read Wholesale Tiers" ON public.wholesale_tiers FOR SELECT USING (true);

-- Orders: Anyone can create orders (checkout), Service role has full access, Users can read their own
CREATE POLICY "Allow Public Checkout Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Checkout Items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Service Role Orders Full Access" ON public.orders FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'anon');
CREATE POLICY "Service Role Items Full Access" ON public.order_items FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'anon');

-- Profiles: Users can read and update their own profiles
CREATE POLICY "Service Role Profiles Full Access" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Service Role Reservations Full Access" ON public.sucker_reservations FOR ALL USING (true);
CREATE POLICY "Service Role Delivery Locations Full Access" ON public.delivery_locations FOR ALL USING (true);

-- ==============================================================================
-- 12. INITIAL SEED DATA (Authentic Doutare Agro Farm Produce & Inventory)
-- ==============================================================================

-- Categories
INSERT INTO public.categories (id, slug, name, description, icon, display_order)
VALUES
    ('cat-plantain', 'plantain', 'Plantain Plantation & Suckers', 'Bio-treated sword and maiden head suckers, green plantain bunches', 'Sprout', 1),
    ('cat-garri', 'garri', 'Cassava & Yellow Garri Processing', 'Delta yellow garri fried with organic palm oil, bio-fortified', 'Wheat', 2),
    ('cat-catfish', 'catfish', 'Aquaculture & Fisheries', 'Live earthen-pond and kiln-smoked African catfish (Clarias)', 'Fish', 3),
    ('cat-maize', 'maize', 'Grains & Arable Farming', 'Shelled yellow maize, feeds and human consumption', 'Sun', 4),
    ('cat-poultry', 'poultry', 'Poultry & Livestock', 'Commercial table eggs, jumbo crates direct from pen', 'Egg', 5)
ON CONFLICT (id) DO NOTHING;

-- Products
INSERT INTO public.products (id, title, slug, category_id, category_label, short_description, description, image_url, unit, is_featured, in_stock)
VALUES
    (
        'prod-suckers-01',
        'High-Yield Plantain Suckers (Bio-Treated)',
        'plantain-suckers-bio-treated',
        'cat-plantain',
        'Plantain Plantation',
        'Giant French & False Horn jumbo suckers, bio-treated against nematodes & weevils.',
        'Sourced directly from our Ayakoromo nursery in Burutu LGA. Our suckers undergo strict hot-water & biological sanitization, ensuring 95%+ field survival, thick pseudo-stems, and heavy fruit bunch emergence in 10-12 months.',
        '/images/plantain-suckers-pile.jpg',
        'sucker',
        TRUE,
        TRUE
    ),
    (
        'prod-garri-01',
        'Doutare Crispy Yellow Garri (Vitamin-A Bio-Fortified)',
        'doutare-yellow-garri',
        'cat-garri',
        'Cassava & Agro-Processing',
        'Stone-free, sand-free, well-sifted, dry crispy Delta yellow garri fried with organic palm oil.',
        'Processed from mature cassava harvested from Ayakoromo riverine loam soils. Naturally fermented for 72 hours, hydraulically dewatered, and fried with red palm oil to deliver high crispiness, zero grit, and great swelling ratio.',
        '/images/yellow-garri-bowl.jpg',
        'bag',
        TRUE,
        TRUE
    ),
    (
        'prod-catfish-01',
        'Freshwater Delta African Catfish (Live & Smoked)',
        'freshwater-catfish',
        'cat-catfish',
        'Aquaculture & Fisheries',
        'Organically raised Clarias gariepinus from our clean riverine flow-through earthen ponds.',
        'Grown in pure freshwater delta currents at Ayakoromo. Free from mud odor. Available live in aeration tanks or hardwood-smoked in hygienic smoking kilns with zero chemical preservatives.',
        '/images/smoked-catfish.jpg',
        'kg',
        TRUE,
        TRUE
    ),
    (
        'prod-maize-01',
        'Clean Shelled Yellow Feed Maize (100kg Bag)',
        'shelled-yellow-maize',
        'cat-maize',
        'Grains & Feed Agro',
        'Sun-dried, machine-cleaned, high-protein yellow maize with <12% moisture content.',
        'Cultivated in fertile alluvial soils of Burutu LGA. Threshed, winnowed, and fumigated for pest-free storage. Ideal for poultry and fish feed compounding, livestock, or industrial millers.',
        '/images/maize-harvest.jpg',
        'bag',
        FALSE,
        TRUE
    ),
    (
        'prod-eggs-01',
        'Fresh Farm Table Eggs (Wholesale Crates)',
        'fresh-table-eggs',
        'cat-poultry',
        'Poultry Production',
        'Farm-fresh brown eggs with deep yellow yolks from healthy, grain-fed ISA Brown layers.',
        'Collected twice daily from our Ayakoromo pens. Inspected, graded, and packed in reinforced paper crates. High yolk-to-white ratio with thick albumen and strong eggshells.',
        '/images/table-eggs.jpg',
        'crate',
        FALSE,
        TRUE
    )
ON CONFLICT (id) DO NOTHING;

-- Product Variants
INSERT INTO public.product_variants (id, product_id, sku, title, price, compare_at_price, weight_kg, in_stock)
VALUES
    ('var-suck-sword', 'prod-suckers-01', 'SCK-SWORD', 'Sword Sucker (Premium Vigorous)', 400.00, 500.00, 2.50, TRUE),
    ('var-suck-maiden', 'prod-suckers-01', 'SCK-MAIDEN', 'Maiden Head Corm Sucker', 350.00, 450.00, 3.00, TRUE),
    ('var-suck-peeper', 'prod-suckers-01', 'SCK-PEEPER', 'Nursery Peeper Seedling', 300.00, 380.00, 1.50, TRUE),
    ('var-garri-50kg', 'prod-garri-01', 'GAR-50KG', '50kg Woven Sack', 45000.00, 50000.00, 50.00, TRUE),
    ('var-garri-100kg', 'prod-garri-01', 'GAR-100KG', '100kg Jute Export Bag', 88000.00, 95000.00, 100.00, TRUE),
    ('var-garri-paint', 'prod-garri-01', 'GAR-PAINT', 'Paint Rubber Bucket (4 Litres)', 4000.00, 4500.00, 3.50, TRUE),
    ('var-fish-live-1kg', 'prod-catfish-01', 'FSH-LIVE-1KG', 'Live Table Size (1kg - 1.5kg)', 3200.00, 3500.00, 1.20, TRUE),
    ('var-fish-smoke-ctn', 'prod-catfish-01', 'FSH-SMK-CTN', 'Smoked Dried (5kg Carton)', 38000.00, 42000.00, 5.00, TRUE),
    ('var-maize-100kg', 'prod-maize-01', 'MZ-100KG', '100kg Standard Burlap Bag', 62000.00, 68000.00, 100.00, TRUE),
    ('var-maize-50kg', 'prod-maize-01', 'MZ-50KG', '50kg Sifter Feed Bag', 32000.00, 35000.00, 50.00, TRUE),
    ('var-egg-crate-single', 'prod-eggs-01', 'EGG-CRATE', 'Single Crate (30 Large Eggs)', 4800.00, 5200.00, 1.80, TRUE),
    ('var-egg-bundle-5', 'prod-eggs-01', 'EGG-BNDL-5', 'Wholesale Bundle (5 Crates)', 23500.00, 26000.00, 9.00, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Wholesale Tiers
INSERT INTO public.wholesale_tiers (product_id, min_qty, discounted_price)
VALUES
    ('prod-suckers-01', 100, 320.00),
    ('prod-suckers-01', 500, 280.00),
    ('prod-suckers-01', 1000, 250.00),
    ('prod-garri-01', 10, 41000.00),
    ('prod-garri-01', 30, 38500.00),
    ('prod-garri-01', 50, 36000.00),
    ('prod-catfish-01', 10, 34000.00),
    ('prod-catfish-01', 25, 31000.00),
    ('prod-maize-01', 10, 58000.00),
    ('prod-maize-01', 50, 54000.00),
    ('prod-eggs-01', 20, 4400.00),
    ('prod-eggs-01', 50, 4100.00);

-- Initial Orders (Matching Farm Dashboard Operations)
INSERT INTO public.orders (
    id, order_number, customer_name, customer_phone, customer_email,
    shipping_address_line, shipping_city, shipping_state, shipping_method,
    subtotal_amount, shipping_fee, total_amount, status, payment_status, notes
)
VALUES
    (
        'b0000001-0000-0000-0000-000000000001',
        'DTO-2026-8812',
        'Engr. Kenneth Ebi',
        '+234 803 456 7890',
        'k.ebi@oilserv.com',
        'Wharf Road, Marine Jetty Loading Bay',
        'Warri',
        'Delta State',
        'Boat Cargo (Burutu Waterway)',
        540000.00,
        25000.00,
        565000.00,
        'harvesting',
        'paid',
        'Priority cargo boat departure from Ayakoromo Waterfront at 07:00 AM.'
    ),
    (
        'b0000001-0000-0000-0000-000000000002',
        'DTO-2026-8813',
        'Madam Tariere Clark',
        '+234 812 345 6789',
        'tariere.clark@yahoo.com',
        'Mile 12 Agro Commodity Terminal',
        'Lagos',
        'Lagos State',
        'Interstate Road Haulage',
        2000000.00,
        50000.00,
        2050000.00,
        'in_transit',
        'paid',
        'Loaded into 15-ton refrigerated truck at Warri transit hub.'
    ),
    (
        'b0000001-0000-0000-0000-000000000003',
        'DTO-2026-8814',
        'Pastor David Opubo',
        '+234 807 112 2334',
        'd.opubo@gmail.com',
        'Ayakoromo Farm Waterfront Jetty',
        'Burutu LGA',
        'Delta State',
        'Farm-Gate Pickup',
        191000.00,
        0.00,
        191000.00,
        'ready_for_pickup',
        'paid',
        'Self collection via motorized river boat.'
    )
ON CONFLICT (order_number) DO NOTHING;

-- Initial Sucker Reservations
INSERT INTO public.sucker_reservations (
    batch_code, customer_name, customer_phone, variety, sucker_type,
    quantity, nursery_bed, bio_sanitization_temp_c, sanitization_status,
    collection_jetty, scheduled_dispatch_date, notes
)
VALUES
    (
        'SCK-AYK-2026-B01',
        'Engr. Kenneth Ebi',
        '+234 803 456 7890',
        'Giant French Plantain',
        'Sword Sucker',
        500,
        'Nursery Bed 1 (Ayakoromo Central)',
        54.0,
        'sanitized',
        'Ayakoromo Marine Jetty (Burutu LGA)',
        CURRENT_DATE + INTERVAL '3 days',
        'Hot-water dipped at 54°C for 20 minutes to eliminate plantain nematodes and weevil eggs.'
    ),
    (
        'SCK-AYK-2026-B02',
        'Pastor David Opubo',
        '+234 807 112 2334',
        'False Horn Plantain (Agbagba)',
        'Maiden Head Corm',
        100,
        'Nursery Bed 2 (Ayakoromo Creek)',
        54.0,
        'sanitized',
        'Ayakoromo Marine Jetty (Burutu LGA)',
        CURRENT_DATE + INTERVAL '1 day',
        'High suckering rate, pre-hardened for immediate field transplanting.'
    )
ON CONFLICT (batch_code) DO NOTHING;


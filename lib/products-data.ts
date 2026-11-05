export interface ProductVariant {
  id: string;
  sku: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  weightKg?: number;
  inStock: boolean;
}

export interface WholesaleTier {
  minQty: number;
  discountedPrice: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: 'plantain' | 'garri' | 'catfish' | 'maize' | 'poultry';
  categoryLabel: string;
  shortDescription: string;
  description: string;
  image: string;
  unit: string;
  variants: ProductVariant[];
  wholesaleTiers: WholesaleTier[];
  isFeatured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-suckers-01',
    title: 'High-Yield Plantain Suckers (Bio-Treated)',
    slug: 'plantain-suckers-bio-treated',
    category: 'plantain',
    categoryLabel: 'Plantain Plantation',
    shortDescription: 'Giant French & False Horn jumbo suckers, bio-treated against nematodes & weevils.',
    description: 'Sourced directly from our Ayakoromo nursery in Burutu LGA. Our suckers undergo strict hot-water & biological sanitization, ensuring 95%+ field survival, thick pseudo-stems, and heavy fruit bunch emergence in 10-12 months.',
    image: '/images/plantain-suckers-pile.jpg',
    unit: 'sucker',
    variants: [
      { id: 'var-suck-sword', sku: 'SCK-SWORD', title: 'Sword Sucker (Premium Vigorous)', price: 400, compareAtPrice: 500, weightKg: 2.5, inStock: true },
      { id: 'var-suck-maiden', sku: 'SCK-MAIDEN', title: 'Maiden Head Corm Sucker', price: 350, compareAtPrice: 450, weightKg: 3.0, inStock: true },
      { id: 'var-suck-peeper', sku: 'SCK-PEEPER', title: 'Nursery Peeper Seedling', price: 300, compareAtPrice: 380, weightKg: 1.5, inStock: true },
    ],
    wholesaleTiers: [
      { minQty: 100, discountedPrice: 320 },
      { minQty: 500, discountedPrice: 280 },
      { minQty: 1000, discountedPrice: 250 },
    ],
    isFeatured: true,
  },
  {
    id: 'prod-garri-01',
    title: 'Doutare Crispy Yellow Garri (Vitamin-A Bio-Fortified)',
    slug: 'doutare-yellow-garri',
    category: 'garri',
    categoryLabel: 'Cassava & Agro-Processing',
    shortDescription: 'Stone-free, sand-free, well-sifted, dry crispy Delta yellow garri fried with organic palm oil.',
    description: 'Processed in our Ayakoromo processing center from freshly harvested mature cassava tubers. Fermented to optimal acidity, hydraulically dewatered, thoroughly sifted, and pan-fried to crisp perfection. Swells exceptionally well.',
    image: '/images/cassava-farming.jpg',
    unit: 'bag',
    variants: [
      { id: 'var-garri-50kg', sku: 'GAR-YEL-50KG', title: '50kg Wholesale Bag', price: 42000, compareAtPrice: 46000, weightKg: 50, inStock: true },
      { id: 'var-garri-100kg', sku: 'GAR-YEL-100KG', title: '100kg Jute Bag', price: 82000, compareAtPrice: 90000, weightKg: 100, inStock: true },
      { id: 'var-garri-25kg', sku: 'GAR-YEL-25KG', title: '25kg Family Sack', price: 22000, compareAtPrice: 24000, weightKg: 25, inStock: true },
    ],
    wholesaleTiers: [
      { minQty: 10, discountedPrice: 39500 },
      { minQty: 50, discountedPrice: 37500 },
    ],
    isFeatured: true,
  },
  {
    id: 'prod-fish-01',
    title: 'Oven-Smoked Dried Catfish (Vacuum Sealed)',
    slug: 'smoked-catfish-vacuum-pack',
    category: 'catfish',
    categoryLabel: 'Aquaculture Desk',
    shortDescription: 'Kiln-smoked with aromatic hardwood, sand-free, zero preservatives, 100% insect-proof packaging.',
    description: 'Freshly harvested from our Burutu fresh water ponds, gutted, salted with sea salt, and slowly dried in modern bio-secure kilns. Lasts 6+ months without refrigeration. Perfect for homes, restaurants, and export.',
    image: '/images/fish-farming.jpg',
    unit: 'pack',
    variants: [
      { id: 'var-fish-1kg', sku: 'CFS-SMK-1KG', title: '1kg Jumbo Fish Pack (3-4 Big Fish)', price: 8500, compareAtPrice: 9500, weightKg: 1.0, inStock: true },
      { id: 'var-fish-carton', sku: 'CFS-SMK-CTN', title: '10kg Wholesale Master Carton', price: 78000, compareAtPrice: 88000, weightKg: 10.0, inStock: true },
    ],
    wholesaleTiers: [
      { minQty: 5, discountedPrice: 74000 },
      { minQty: 20, discountedPrice: 70000 },
    ],
    isFeatured: true,
  },
  {
    id: 'prod-fish-live',
    title: 'Live Table-Size Freshwater Catfish (Farm-Gate)',
    slug: 'live-freshwater-catfish-table-size',
    category: 'catfish',
    categoryLabel: 'Aquaculture Desk',
    shortDescription: 'Table-size healthy African catfish (1.0kg - 1.8kg average weight).',
    description: 'Raised in flowing freshwater earthen and concrete ponds in Ayakoromo, fed high-protein floating feeds. Firm flesh, high omega-3 profile, and minimal fat content. Available for live boat dispatch or farm-gate pickup.',
    image: '/images/fish-farming.jpg',
    unit: 'kg',
    variants: [
      { id: 'var-live-kg', sku: 'CFS-LIVE-KG', title: 'Per Kilogram (Live Harvest)', price: 3200, compareAtPrice: 3600, weightKg: 1.0, inStock: true },
    ],
    wholesaleTiers: [
      { minQty: 100, discountedPrice: 2900 },
      { minQty: 500, discountedPrice: 2700 },
    ],
    isFeatured: false,
  },
  {
    id: 'prod-maize-01',
    title: 'Dry Shelled Yellow Maize (High-Grade Grain)',
    slug: 'shelled-yellow-maize-grain',
    category: 'maize',
    categoryLabel: 'Crop Farming',
    shortDescription: 'Thoroughly dried (under 12% moisture), weevil-free, clean yellow maize grains.',
    description: 'Mechanically harvested and shelled from our Delta State maize fields. Highly sought-after by feed millers, poultry farmers, and food processors. Guarantees long shelf stability and high starch yield.',
    image: '/images/maize-mature-inspection.jpg',
    unit: 'bag',
    variants: [
      { id: 'var-maize-50kg', sku: 'MAZ-YEL-50KG', title: '50kg Bag', price: 34000, compareAtPrice: 38000, weightKg: 50, inStock: true },
      { id: 'var-maize-100kg', sku: 'MAZ-YEL-100KG', title: '100kg Wholesale Sack', price: 66000, compareAtPrice: 74000, weightKg: 100, inStock: true },
    ],
    wholesaleTiers: [
      { minQty: 20, discountedPrice: 31500 },
      { minQty: 100, discountedPrice: 29500 },
    ],
    isFeatured: false,
  },
  {
    id: 'prod-poultry-eggs',
    title: 'Fresh Farm Table Eggs (Jumbo & Medium Crates)',
    slug: 'fresh-farm-table-eggs-crates',
    category: 'poultry',
    categoryLabel: 'Poultry & Livestock',
    shortDescription: 'Brown-shell nutritious farm eggs, daily collection from bio-secure layer batteries.',
    description: 'Gathered daily from healthy, vaccinated Isa Brown laying hens fed balanced grains and minerals. Thick shells, rich golden yolks, and superior freshness for wholesale retailers and bakeries.',
    image: '/images/poultry-farming.jpg',
    unit: 'crate',
    variants: [
      { id: 'var-eggs-jumbo', sku: 'EGG-CRATE-JUMBO', title: 'Crate of 30 Jumbo Eggs', price: 4800, compareAtPrice: 5200, weightKg: 2.0, inStock: true },
      { id: 'var-eggs-medium', sku: 'EGG-CRATE-MED', title: 'Crate of 30 Medium Eggs', price: 4300, compareAtPrice: 4700, weightKg: 1.8, inStock: true },
    ],
    wholesaleTiers: [
      { minQty: 50, discountedPrice: 4400 },
      { minQty: 200, discountedPrice: 4100 },
    ],
    isFeatured: false,
  },
];


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, Product } from '@/lib/products-data';
import { ShoppingBag, ArrowRight, Sparkles, Filter, Check } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Farm Produce' },
    { id: 'plantain', label: 'Plantain Suckers' },
    { id: 'garri', label: 'Yellow Garri' },
    { id: 'catfish', label: 'Catfish Aquaculture' },
    { id: 'maize', label: 'Shelled Maize' },
    { id: 'poultry', label: 'Poultry & Eggs' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleQuickAdd = (p: Product) => {
    addToCart(p, p.variants[0], 1);
    setAddedItem(p.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Store Header */}
      <div className="bg-farm-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Direct Farm-Gate Wholesale & Retail
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Farm Produce Store
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Order fresh agricultural commodities and bio-treated propagation materials directly from our plantation and aquaculture facilities in Burutu LGA, Delta State.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-farm-800 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <Image
                  src={prod.image}
                  alt={prod.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-farm-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                  {prod.categoryLabel}
                </div>

                {prod.wholesaleTiers.length > 0 && (
                  <div className="absolute bottom-4 right-4 bg-emerald-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Bulk Tiers Available</span>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-extrabold text-xl text-gray-900 group-hover:text-farm-700 transition">
                  <Link href={`/store/${prod.slug}`}>{prod.title}</Link>
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {prod.shortDescription}
                </p>

                {/* Available Packaging Variants */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {prod.variants.map((v) => (
                    <span
                      key={v.id}
                      className="bg-gray-100 text-gray-700 text-[11px] font-semibold px-2.5 py-1 rounded-md"
                    >
                      {v.title.split('(')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-gray-400 block font-semibold">From</span>
                <span className="text-lg font-black text-farm-900">
                  ₦{prod.variants[0].price.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500"> / {prod.unit}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickAdd(prod)}
                  className="p-2.5 rounded-xl border border-gray-300 hover:border-farm-700 text-gray-700 hover:text-farm-700 transition"
                  title="Quick Add to Cart"
                >
                  {addedItem === prod.id ? (
                    <Check className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <ShoppingBag className="w-5 h-5" />
                  )}
                </button>

                <Link
                  href={`/store/${prod.slug}`}
                  className="bg-farm-800 hover:bg-farm-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


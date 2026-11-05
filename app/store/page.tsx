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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
      {/* Store Header */}
      <div className="bg-farm-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3 sm:space-y-4">
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Direct Farm-Gate Wholesale & Retail
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Farm Produce Store
          </h1>
          <p className="text-gray-300 text-xs sm:text-base leading-relaxed">
            Order fresh agricultural commodities and bio-treated propagation materials directly from our plantation and aquaculture facilities in Burutu LGA, Delta State.
          </p>
        </div>
      </div>

      {/* Category Tabs (Smooth touch scroll for mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition shrink-0 ${selectedCategory === cat.id
              ? 'bg-farm-800 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-gray-100">
                <Image
                  src={prod.image}
                  alt={prod.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-farm-900/80 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full">
                  {prod.categoryLabel}
                </div>

                {prod.wholesaleTiers.length > 0 && (
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-emerald-600 text-white text-[10px] sm:text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Bulk Tiers Available</span>
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-6 space-y-2.5 sm:space-y-3">
                <h3 className="font-extrabold text-lg sm:text-xl text-gray-900 group-hover:text-farm-700 transition">
                  <Link href={`/store/${prod.slug}`}>{prod.title}</Link>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {prod.shortDescription}
                </p>

                {/* Available Packaging Variants */}
                <div className="pt-1 flex flex-wrap gap-1.5">
                  {prod.variants.map((v) => (
                    <span
                      key={v.id}
                      className="bg-gray-100 text-gray-700 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md"
                    >
                      {v.title.split('(')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between gap-2 sm:gap-3">
              <div>
                <span className="text-[10px] sm:text-[11px] text-gray-400 block font-semibold">From</span>
                <span className="text-base sm:text-lg font-black text-farm-900">
                  ₦{prod.variants[0].price.toLocaleString()}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500"> / {prod.unit}</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickAdd(prod)}
                  className="p-2 sm:p-2.5 rounded-xl border border-gray-300 hover:border-farm-700 text-gray-700 hover:text-farm-700 transition"
                  title="Quick Add to Cart"
                  aria-label="Quick Add to Cart"
                >
                  {addedItem === prod.id ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  ) : (
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>

                <Link
                  href={`/store/${prod.slug}`}
                  className="bg-farm-800 hover:bg-farm-900 text-white font-bold text-xs px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition shadow-sm whitespace-nowrap"
                >
                  Details &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

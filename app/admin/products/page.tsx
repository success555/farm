'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS, Product, ProductVariant } from '@/lib/products-data';
import { Package, Plus, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function DashboardProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const filtered =
    selectedCategory === 'all'
      ? productsList
      : productsList.filter((p) => p.category === selectedCategory);

  const handleStockToggle = (productId: string, variantId: string) => {
    setProductsList((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          return {
            ...prod,
            variants: prod.variants.map((v) =>
              v.id === variantId ? { ...v, inStock: !v.inStock } : v
            ),
          };
        }
        return prod;
      })
    );
    setSavedNotice('Stock availability updated.');
    setTimeout(() => setSavedNotice(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Produce & Stock Inventory
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage packaging variants, wholesale price tiers, and farm warehouse availability.
          </p>
        </div>

        {savedNotice && (
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{savedNotice}</span>
          </span>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Items' },
          { id: 'plantain', label: 'Plantain Suckers' },
          { id: 'garri', label: 'Cassava / Garri' },
          { id: 'catfish', label: 'Catfish Aquaculture' },
          { id: 'maize', label: 'Maize Grain' },
          { id: 'poultry', label: 'Eggs & Poultry' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-farm-800 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products & Variants List */}
      <div className="space-y-4">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4"
          >
            {/* Product Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                  <Image src={prod.image} alt={prod.title} fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {prod.categoryLabel}
                    </span>
                    <span className="text-xs text-gray-400">Unit: {prod.unit}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-gray-900 mt-1">{prod.title}</h3>
                </div>
              </div>

              {/* Wholesale Tiers Overview */}
              {prod.wholesaleTiers.length > 0 && (
                <div className="flex items-center gap-2 text-[11px] bg-emerald-50 text-emerald-800 font-bold px-3 py-1.5 rounded-xl border border-emerald-100">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    Bulk Tiers Active: {prod.wholesaleTiers.map((t) => `${t.minQty}+: ₦${t.discountedPrice.toLocaleString()}`).join(' | ')}
                  </span>
                </div>
              )}
            </div>

            {/* Variants Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-gray-400 uppercase font-semibold text-[10px] border-b border-gray-100">
                  <tr>
                    <th className="py-2 px-3">SKU</th>
                    <th className="py-2 px-3">Variant / Packaging</th>
                    <th className="py-2 px-3">Retail Price</th>
                    <th className="py-2 px-3">Average Weight</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {prod.variants.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-50/50">
                      <td className="py-3 px-3 font-mono font-bold text-gray-600">{v.sku}</td>
                      <td className="py-3 px-3 font-bold text-gray-900">{v.title}</td>
                      <td className="py-3 px-3 font-black text-farm-900">
                        ₦{v.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-gray-500">
                        {v.weightKg ? `${v.weightKg} kg` : 'N/A'}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            v.inStock
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {v.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleStockToggle(prod.id, v.id)}
                          className={`px-3 py-1 rounded-lg text-[11px] font-bold transition border ${
                            v.inStock
                              ? 'bg-white border-gray-200 text-red-600 hover:bg-red-50'
                              : 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {v.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


'use client';

import React, { useState } from 'react';
import { PRODUCTS, Product } from '@/lib/products-data';
import { useCart } from '@/lib/cart-context';
import { Calculator, ShoppingCart, MessageSquare, Check, Sparkles } from 'lucide-react';

export default function WholesaleEstimator() {
  const { addToCart } = useCart();
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(PRODUCTS[0].variants[0].id);
  const [quantity, setQuantity] = useState<number>(50);
  const [addedToast, setAddedToast] = useState(false);

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const variant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  // Calculate pricing & bulk discount
  let unitPrice = variant.price;
  let hasDiscount = false;
  if (product.wholesaleTiers && product.wholesaleTiers.length > 0) {
    const matchedTier = [...product.wholesaleTiers]
      .sort((a, b) => b.minQty - a.minQty)
      .find((t) => quantity >= t.minQty);
    if (matchedTier) {
      unitPrice = matchedTier.discountedPrice;
      hasDiscount = true;
    }
  }

  const estimatedTotal = unitPrice * quantity;
  const regularTotal = variant.price * quantity;
  const totalSavings = regularTotal - estimatedTotal;

  const handleProductChange = (prodId: string) => {
    setSelectedProductId(prodId);
    const p = PRODUCTS.find((x) => x.id === prodId);
    if (p && p.variants.length > 0) {
      setSelectedVariantId(p.variants[0].id);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, variant, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const getWhatsAppOrderUrl = () => {
    const text = encodeURIComponent(
      `Hello Doutare Agro Farm, I would like to place a wholesale inquiry:\n` +
      `Product: ${product.title}\n` +
      `Variant: ${variant.title}\n` +
      `Quantity: ${quantity} ${product.unit}s\n` +
      `Estimated Price: ₦${estimatedTotal.toLocaleString()}\n` +
      `Delivery Location: Delta / Interstate\n` +
      `Please confirm stock availability and transit schedule.`
    );
    return `https://wa.me/qr/IFALUE5YG2W5N1?text=${text}`;
  };

  return (
    <div id="calculator" className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-farm-900 to-farm-800 text-white p-5 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Wholesale Estimator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">Calculate Bulk Produce Orders</h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Real-time farm-gate pricing with automatic bulk volume discount tiers.
          </p>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] sm:text-xs text-gold-400 font-semibold block uppercase">Farm-Gate & Cargo</span>
          <span className="text-xs sm:text-sm text-gray-200">Ayakoromo &bull; Burutu LGA</span>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
        {/* Step 1: Choose Product */}
        <div>
          <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
            1. Select Produce
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
            {PRODUCTS.map((p) => {
              const isSelected = p.id === selectedProductId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleProductChange(p.id)}
                  className={`text-left p-2.5 sm:p-3 rounded-xl border text-xs transition ${
                    isSelected
                      ? 'border-farm-700 bg-emerald-50/80 font-bold text-farm-900 shadow-sm ring-1 ring-farm-600'
                      : 'border-gray-200 bg-gray-50/60 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <p className="truncate font-semibold text-[11px] sm:text-xs">{p.title.split('(')[0]}</p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 capitalize">{p.category}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Choose Variant & Input Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-1">
          {/* Variant Selector */}
          <div>
            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5 sm:mb-2">
              2. Packaging / Grade Variant
            </label>
            <select
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-farm-600 focus:bg-white transition"
            >
              {product.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title} &mdash; ₦{v.price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5 sm:mb-2">
              <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-600">
                3. Desired Quantity ({product.unit}s)
              </label>
              <span className="text-[11px] sm:text-xs text-farm-700 font-semibold">Min: 1 {product.unit}</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-farm-600 focus:bg-white transition"
              />
              <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase px-2 shrink-0">{product.unit}s</span>
            </div>
          </div>
        </div>

        {/* Pricing Breakdown Card */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] sm:text-xs text-emerald-800 font-bold uppercase tracking-wider">
                Effective Farm-Gate Unit Rate:
              </span>
              {hasDiscount && (
                <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Wholesale Discount Applied</span>
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-black text-gray-900">
                ₦{unitPrice.toLocaleString()}
              </span>
              <span className="text-xs sm:text-sm text-gray-500">/ {product.unit}</span>
              {hasDiscount && (
                <span className="text-xs sm:text-sm line-through text-gray-400">
                  ₦{variant.price.toLocaleString()}
                </span>
              )}
            </div>
            {hasDiscount && totalSavings > 0 && (
              <p className="text-xs font-bold text-emerald-700 mt-1">
                You save ₦{totalSavings.toLocaleString()} on this order!
              </p>
            )}
          </div>

          <div className="text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-emerald-200/60 w-full sm:w-auto">
            <span className="text-[11px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider block">
              Estimated Total
            </span>
            <span className="text-2xl sm:text-3xl font-black text-farm-900">
              ₦{estimatedTotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 bg-farm-800 hover:bg-farm-900 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition text-sm sm:text-base"
          >
            {addedToast ? (
              <>
                <Check className="w-5 h-5 text-emerald-400" />
                <span>Added to Shopping Cart!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Add {quantity} {product.unit}s to Cart</span>
              </>
            )}
          </button>

          <a
            href={getWhatsAppOrderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition text-sm sm:text-base"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Direct WhatsApp Inquiry</span>
          </a>
        </div>
      </div>
    </div>
  );
}

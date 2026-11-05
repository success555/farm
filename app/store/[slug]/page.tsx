'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, Product, ProductVariant } from '@/lib/products-data';
import { useCart } from '@/lib/cart-context';
import {
  ShieldCheck,
  Truck,
  Check,
  ShoppingCart,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  Package,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);

  // Determine effective unit price based on quantity & wholesale tiers
  let unitPrice = selectedVariant.price;
  let activeTierDiscount = false;
  if (product.wholesaleTiers && product.wholesaleTiers.length > 0) {
    const matched = [...product.wholesaleTiers]
      .sort((a, b) => b.minQty - a.minQty)
      .find((t) => quantity >= t.minQty);
    if (matched) {
      unitPrice = matched.discountedPrice;
      activeTierDiscount = true;
    }
  }

  const subtotal = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const getWhatsAppInquiryUrl = () => {
    const msg = encodeURIComponent(
      `Hello Doutare Agro Farm, I want to order:\n` +
      `Product: ${product.title}\n` +
      `Variant: ${selectedVariant.title}\n` +
      `Quantity: ${quantity} ${product.unit}(s)\n` +
      `Total: ₦${subtotal.toLocaleString()}\n` +
      `Please confirm current farm-gate availability & transit schedule from Burutu LGA.`
    );
    return `https://wa.me/qr/IFALUE5YG2W5N1?text=${msg}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Button */}
      <Link
        href="/store"
        className="inline-flex items-center gap-2 text-sm font-bold text-farm-800 hover:text-farm-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Store Produce</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Product Image & Badges */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative h-96 sm:h-[480px] w-full rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-md">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4 bg-farm-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
              {product.categoryLabel}
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <p className="text-xs text-emerald-900 font-medium leading-relaxed">
              <strong>Quality Guaranteed:</strong> Harvested and processed directly at Doutare Agro Farm Limited, Ayakoromo, Burutu LGA, Delta State. 100% authentic agribusiness produce.
            </p>
          </div>
        </div>

        {/* Right: Product Details, Variant Selection & Order Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-farm-700 block mb-1">
              Farm-Gate Wholesale & Retail
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
              {product.title}
            </h1>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Pricing Display */}
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
              Unit Price
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-farm-900">
                ₦{unitPrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 font-medium">/ {product.unit}</span>
              {activeTierDiscount && (
                <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  Volume Discount Active
                </span>
              )}
            </div>
            {selectedVariant.compareAtPrice && (
              <p className="text-xs text-gray-400 line-through">
                Regular: ₦{selectedVariant.compareAtPrice.toLocaleString()}
              </p>
            )}
          </div>

          {/* Variant Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Select Grade / Packaging Option
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.variants.map((v) => {
                const isSelected = v.id === selectedVariant.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`p-3.5 rounded-xl border text-left text-xs transition ${
                      isSelected
                        ? 'border-farm-700 bg-emerald-50 text-farm-950 font-bold ring-2 ring-farm-600'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{v.title}</span>
                      <span className="text-farm-700 font-bold">₦{v.price.toLocaleString()}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wholesale Bulk Tier Table */}
          {product.wholesaleTiers.length > 0 && (
            <div className="bg-white border border-emerald-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-farm-800 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Bulk Volume Discount Tiers</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {product.wholesaleTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl border ${
                      quantity >= tier.minQty
                        ? 'bg-emerald-100/70 border-emerald-400 font-bold text-farm-900'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    <p className="text-[11px] text-gray-500 font-medium">Buy {tier.minQty}+ {product.unit}s</p>
                    <p className="font-bold text-emerald-800 text-sm mt-0.5">
                      ₦{tier.discountedPrice.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Live Total */}
          <div className="flex items-center gap-4 pt-2">
            <div className="w-32">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-base font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
              />
            </div>
            <div className="flex-1">
              <span className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Order Total
              </span>
              <p className="text-2xl font-black text-farm-900">
                ₦{subtotal.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full bg-farm-800 hover:bg-farm-900 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
            >
              {addedToast ? (
                <>
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>Added to Shopping Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add {quantity} {product.unit}(s) to Cart</span>
                </>
              )}
            </button>

            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Inquire via WhatsApp Desk</span>
            </a>
          </div>

          {/* Logistics Note */}
          <div className="pt-4 border-t border-gray-200 flex items-center gap-3 text-xs text-gray-500">
            <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Logistics options: Farm-gate pickup in Ayakoromo, Burutu waterway boat cargo, or heavy truck haulage across Nigeria.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


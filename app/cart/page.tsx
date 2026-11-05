'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, MessageSquare } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useCart();

  const getWhatsAppCartUrl = () => {
    const lines = items.map(
      (item) => `• ${item.product.title} (${item.variant.title}) x ${item.quantity} = ₦${(item.effectiveUnitPrice * item.quantity).toLocaleString()}`
    );
    const msg = encodeURIComponent(
      `Hello Doutare Agro Farm, I want to confirm my cart order:\n\n` +
      lines.join('\n') +
      `\n\nEstimated Total: ₦${subtotal.toLocaleString()}\n` +
      `Please provide delivery logistics options and account payment details.`
    );
    return `https://wa.me/qr/IFALUE5YG2W5N1?text=${msg}`;
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center space-y-5 sm:space-y-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 text-farm-700 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Your Cart is Currently Empty</h1>
        <p className="text-gray-500 max-w-md mx-auto text-xs sm:text-sm leading-relaxed px-2">
          You haven&apos;t added any agricultural produce or plantain suckers to your cart yet. Explore our farm-gate wholesale offerings.
        </p>
        <Link
          href="/store"
          className="inline-flex items-center gap-2 bg-farm-800 hover:bg-farm-900 text-white font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl transition shadow-md text-sm sm:text-base"
        >
          <span>Browse Store Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 border-b border-gray-200 pb-4 sm:pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Shopping Cart</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
            Review your produce order quantities before proceeding to checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline pt-1 sm:pt-0"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Items Table */}
        <div className="lg:col-span-8 space-y-3 sm:space-y-4">
          {items.map((item) => (
            <div
              key={item.variant.id}
              className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5 shadow-sm"
            >
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-extrabold text-sm sm:text-base text-gray-900 truncate">
                    <Link href={`/store/${item.product.slug}`} className="hover:text-farm-700">
                      {item.product.title}
                    </Link>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 font-semibold truncate">{item.variant.title}</p>
                  <p className="text-[11px] sm:text-xs text-farm-700 font-bold mt-0.5">
                    ₦{item.effectiveUnitPrice.toLocaleString()} / {item.product.unit}
                  </p>
                </div>
              </div>

              {/* Quantity Controls, Total Price & Delete Icon */}
              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  <button
                    onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                    className="px-3 py-1.5 text-gray-700 hover:bg-gray-200 font-bold text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 font-bold text-sm text-gray-900 bg-white min-w-[28px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                    className="px-3 py-1.5 text-gray-700 hover:bg-gray-200 font-bold text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-sm sm:text-base font-black text-gray-900">
                    ₦{(item.effectiveUnitPrice * item.quantity).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.variant.id)}
                  className="text-gray-400 hover:text-red-500 p-1.5 transition ml-1"
                  title="Remove item"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          ))}

          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-farm-800 hover:underline pt-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping for More Produce</span>
          </Link>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-5 sm:p-6 space-y-5 sm:space-y-6 shadow-md">
          <h2 className="text-lg sm:text-xl font-black text-gray-900 pb-3 border-b border-gray-100">
            Order Summary
          </h2>

          <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Total Produce Items</span>
              <span className="font-bold text-gray-900">{totalItems} units</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-extrabold text-gray-900">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Logistics / Freight</span>
              <span className="text-xs font-semibold text-farm-700">Calculated at Checkout</span>
            </div>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-gray-200 flex justify-between items-baseline">
            <span className="text-sm sm:text-base font-bold text-gray-900">Estimated Total</span>
            <span className="text-xl sm:text-2xl font-black text-farm-900">
              ₦{subtotal.toLocaleString()}
            </span>
          </div>

          <div className="space-y-2.5 sm:space-y-3 pt-1">
            <Link
              href="/checkout"
              className="w-full bg-farm-800 hover:bg-farm-900 text-white font-bold py-3.5 sm:py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition text-sm sm:text-base"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={getWhatsAppCartUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 sm:py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition text-sm sm:text-base"
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Checkout via WhatsApp Desk</span>
            </a>
          </div>

          <div className="bg-emerald-50 rounded-xl p-3 flex items-center gap-2.5 text-[11px] sm:text-xs text-emerald-900">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
            <span>Bank transfer verification & official invoice provided upon placement.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

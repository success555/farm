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
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-farm-700 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">Your Cart is Currently Empty</h1>
        <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
          You haven&apos;t added any agricultural produce or plantain suckers to your cart yet. Explore our farm-gate wholesale offerings.
        </p>
        <Link
          href="/store"
          className="inline-flex items-center gap-2 bg-farm-800 hover:bg-farm-900 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-md"
        >
          <span>Browse Store Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Shopping Cart</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review your produce order quantities before proceeding to checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Items Table */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.variant.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">
                    <Link href={`/store/${item.product.slug}`} className="hover:text-farm-700">
                      {item.product.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-500 font-semibold">{item.variant.title}</p>
                  <p className="text-xs text-farm-700 font-bold mt-1">
                    ₦{item.effectiveUnitPrice.toLocaleString()} / {item.product.unit}
                  </p>
                </div>
              </div>

              {/* Quantity Controls & Total */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  <button
                    onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                    className="px-3 py-1.5 text-gray-700 hover:bg-gray-200 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 font-bold text-sm text-gray-900 bg-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                    className="px-3 py-1.5 text-gray-700 hover:bg-gray-200 font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                <div className="text-right min-w-[100px]">
                  <p className="text-base font-black text-gray-900">
                    ₦{(item.effectiveUnitPrice * item.quantity).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.variant.id)}
                  className="text-gray-400 hover:text-red-500 p-1 transition"
                  title="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-sm font-bold text-farm-800 hover:underline pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping for More Produce</span>
          </Link>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-200 p-6 space-y-6 shadow-md">
          <h2 className="text-xl font-black text-gray-900 pb-3 border-b border-gray-100">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
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

          <div className="pt-4 border-t border-gray-200 flex justify-between items-baseline">
            <span className="text-base font-bold text-gray-900">Estimated Total</span>
            <span className="text-2xl font-black text-farm-900">
              ₦{subtotal.toLocaleString()}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/checkout"
              className="w-full bg-farm-800 hover:bg-farm-900 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={getWhatsAppCartUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Checkout via WhatsApp Desk</span>
            </a>
          </div>

          <div className="bg-emerald-50 rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Bank transfer verification & official invoice provided upon placement.</span>
          </div>
        </div>
      </div>
    </div>
  );
}


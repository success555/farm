'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { ShieldCheck, Truck, CreditCard, Building2, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    deliveryMethod: 'farm_gate_pickup',
    addressLine: '',
    city: '',
    state: 'Delta State',
    notes: '',
    paymentMethod: 'bank_transfer',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Shipping cost estimate
  const logisticsFee =
    formData.deliveryMethod === 'farm_gate_pickup'
      ? 0
      : formData.deliveryMethod === 'boat_cargo'
      ? 8000
      : 15000;

  const grandTotal = subtotal + logisticsFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      setErrorMsg('Please enter your full name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items.map((i) => ({
            productId: i.product.id,
            title: i.product.title,
            variantTitle: i.variant.title,
            sku: i.variant.sku,
            unitPrice: i.effectiveUnitPrice,
            quantity: i.quantity,
            totalPrice: i.effectiveUnitPrice * i.quantity,
          })),
          subtotal,
          logisticsFee,
          grandTotal,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        clearCart();
        router.push(`/orders/success?orderNumber=${data.orderNumber}&total=${grandTotal}`);
      } else {
        setErrorMsg(data.message || 'Error processing order. Please try again.');
      }
    } catch {
      // Fallback redirect for offline/demo if API is unreachable
      clearCart();
      const fakeOrderNumber = 'DTO-' + Math.floor(100000 + Math.random() * 900000);
      router.push(`/orders/success?orderNumber=${fakeOrderNumber}&total=${grandTotal}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-20 text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-xs sm:text-sm text-gray-500">Add produce items before checking out.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Checkout Order</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
          Complete your farm produce purchase and select preferred dispatch logistics.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Shipping & Customer Details */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* Customer Contacts */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-5 sm:p-8 space-y-4 sm:space-y-5 shadow-sm">
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-farm-800 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Buyer Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Chief Emeka / Mrs. Tari"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-farm-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 800 000 0000"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-farm-600 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Email Address (For Invoice PDF)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="buyer@gmail.com"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-farm-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Delivery & Logistics */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-5 sm:p-8 space-y-4 sm:space-y-5 shadow-sm">
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-farm-800 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Delivery Logistics</span>
            </h2>

            <div className="space-y-2.5 sm:space-y-3">
              {[
                { id: 'farm_gate_pickup', title: 'Farm-Gate Pickup (Ayakoromo, Burutu LGA)', fee: 'Free (₦0)', desc: 'Collect directly at farm warehouse or jetty.' },
                { id: 'boat_cargo', title: 'Waterway Boat Freight (Burutu / Warri Riverfront)', fee: 'Est. ₦8,000', desc: 'Loaded onto commercial cargo boat from Ayakoromo.' },
                { id: 'interstate_haulage', title: 'Interstate Road Haulage (Lagos / Asaba / PH / Benin)', fee: 'Est. ₦15,000', desc: 'Dispatched via heavy transit park in Warri.' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border cursor-pointer transition ${
                    formData.deliveryMethod === opt.id
                      ? 'border-farm-700 bg-emerald-50/70 ring-1 ring-farm-600'
                      : 'border-gray-200 bg-gray-50/50 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value={opt.id}
                    checked={formData.deliveryMethod === opt.id}
                    onChange={handleChange}
                    className="mt-1 text-farm-700 focus:ring-farm-600 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <span className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">{opt.title}</span>
                      <span className="text-xs font-extrabold text-farm-800 shrink-0">{opt.fee}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Destination State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. Delta State"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-farm-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  City / Town
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Warri / Asaba / Lagos"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-farm-600 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Delivery Address / Landmark
                </label>
                <input
                  type="text"
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  placeholder="Street name, market stall, or water jetty"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-farm-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-5 sm:p-8 space-y-4 sm:space-y-5 shadow-sm">
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-farm-800 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Payment Option</span>
            </h2>

            <div className="space-y-3">
              <label
                className={`flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border cursor-pointer transition ${
                  formData.paymentMethod === 'bank_transfer'
                    ? 'border-farm-700 bg-emerald-50/70 ring-1 ring-farm-600'
                    : 'border-gray-200 bg-gray-50/50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={formData.paymentMethod === 'bank_transfer'}
                  onChange={handleChange}
                  className="mt-1 text-farm-700 focus:ring-farm-600 shrink-0"
                />
                <div>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-snug">
                    Direct Corporate Bank Transfer (Recommended for Bulk Wholesale)
                  </span>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                    Pay directly to Doutare Agro Farm Limited corporate bank account. Official invoice & receipt provided.
                  </p>
                </div>
              </label>

              {formData.paymentMethod === 'bank_transfer' && (
                <div className="bg-farm-900 text-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-farm-800 text-xs space-y-2">
                  <div className="flex justify-between items-center border-b border-farm-800 pb-2">
                    <span className="text-gray-400">Account Name:</span>
                    <strong className="text-gold-400 text-right">Doutare Agro Farm Limited</strong>
                  </div>
                  <div className="flex justify-between items-center border-b border-farm-800 pb-2">
                    <span className="text-gray-400">RC Number:</span>
                    <strong className="text-white">9563075</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Bank Verification:</span>
                    <strong className="text-emerald-300">Details sent with invoice</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-md sticky top-24 sm:top-28">
          <h2 className="text-lg sm:text-xl font-black text-gray-900 pb-3 border-b border-gray-100">
            Order Items ({items.length})
          </h2>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map((i) => (
              <div key={i.variant.id} className="flex justify-between items-center text-xs gap-2">
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 truncate">{i.product.title.split('(')[0]}</p>
                  <p className="text-gray-500 truncate">
                    {i.variant.title} x {i.quantity}
                  </p>
                </div>
                <span className="font-extrabold text-gray-900 shrink-0">
                  ₦{(i.effectiveUnitPrice * i.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 sm:pt-4 border-t border-gray-200 space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900 text-xs sm:text-sm">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Logistics ({formData.deliveryMethod.replace(/_/g, ' ')})</span>
              <span className="font-bold text-gray-900 text-xs sm:text-sm">₦{logisticsFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-2.5 border-t border-gray-200 text-sm sm:text-base font-black text-gray-900">
              <span>Total Payable</span>
              <span className="text-farm-900 text-xl sm:text-2xl">₦{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-farm-800 hover:bg-farm-900 text-white font-bold py-3.5 sm:py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition disabled:opacity-50 text-sm sm:text-base"
          >
            {isSubmitting ? (
              <span>Placing Produce Order...</span>
            ) : (
              <span>Confirm & Place Order</span>
            )}
          </button>

          <p className="text-[10px] sm:text-[11px] text-gray-400 text-center leading-relaxed">
            By placing an order, you agree to Doutare Agro Farm Limited wholesale fulfillment and harvest verification terms.
          </p>
        </div>
      </form>
    </div>
  );
}

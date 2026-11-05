'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, MessageSquare, ArrowRight, Building2, Phone, ShieldCheck } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'DTO-2026-ONLINE';
  const total = searchParams.get('total') || '0';

  const getWhatsAppNotifyUrl = () => {
    const msg = encodeURIComponent(
      `Hello Doutare Agro Farm, I have placed an order on the e-commerce portal:\n` +
      `Order Reference: ${orderNumber}\n` +
      `Total Payable: ₦${parseInt(total).toLocaleString()}\n` +
      `I am ready to upload my bank transfer payment receipt for confirmation and dispatch schedule.`
    );
    return `https://wa.me/qr/IFALUE5YG2W5N1?text=${msg}`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-16 text-center space-y-6 sm:space-y-8">
      {/* Icon & Heading */}
      <div className="space-y-2.5 sm:space-y-3">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-farm-700 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
          Order Received
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Thank You For Your Order!
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed px-2">
          Your order has been recorded in our farm dispatch manifest. An invoice summary has been generated for your record.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-5 sm:p-8 text-left space-y-5 sm:space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3.5 sm:pb-4 border-b border-gray-100 gap-2">
          <div>
            <span className="text-[11px] sm:text-xs text-gray-400 font-semibold uppercase block">Order Reference</span>
            <span className="text-lg sm:text-xl font-black text-farm-900">{orderNumber}</span>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[11px] sm:text-xs text-gray-400 font-semibold uppercase block">Total Amount</span>
            <span className="text-lg sm:text-xl font-black text-gray-900">₦{parseInt(total).toLocaleString()}</span>
          </div>
        </div>

        {/* Corporate Bank Details */}
        <div className="bg-farm-900 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3.5 sm:space-y-4">
          <div className="flex items-center gap-2 text-gold-400 font-bold text-xs uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Corporate Bank Deposit Details</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-farm-800 pb-1.5">
              <span className="text-gray-400">Account Name:</span>
              <strong className="text-white text-right">Doutare Agro Farm Limited</strong>
            </div>
            <div className="flex justify-between border-b border-farm-800 pb-1.5">
              <span className="text-gray-400">Corporate RC:</span>
              <strong className="text-gold-400">9563075 (CAC Nigeria)</strong>
            </div>
            <div className="flex justify-between border-b border-farm-800 pb-1.5">
              <span className="text-gray-400">Payment Reference:</span>
              <strong className="text-emerald-300">{orderNumber}</strong>
            </div>
          </div>

          <p className="text-[11px] text-gray-300 leading-relaxed pt-1">
            Please include your Order Reference <strong>{orderNumber}</strong> in the transfer remarks. Once transferred, send receipt to WhatsApp for instant clearance.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <a
            href={getWhatsAppNotifyUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition text-xs sm:text-sm text-center"
          >
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span>Notify WhatsApp Desk with Receipt</span>
          </a>

          <Link
            href="/store"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition text-xs sm:text-sm text-center"
          >
            <span>Back to Store Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="text-center pt-1">
          <Link
            href="/dashboard"
            className="text-xs font-bold text-farm-700 hover:text-farm-900 hover:underline inline-flex items-center gap-1"
          >
            <span>Track order fulfillment in My Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-sm font-semibold text-gray-500">Loading confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

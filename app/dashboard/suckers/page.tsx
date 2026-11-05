'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sprout,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Thermometer,
  Anchor,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

export default function UserSuckersPage() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            My Sucker Nursery Reservations
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            View propagation certificates, biological sanitization logs, and scheduled dispatch dates.
          </p>
        </div>

        <Link
          href="/store/plantain-suckers-bio-treated"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
        >
          <Sprout className="w-4 h-4" />
          <span>Reserve Another Sucker Batch</span>
        </Link>
      </div>

      {/* Sucker Reservation Certificate Card */}
      <div className="bg-white rounded-3xl border-2 border-emerald-500/80 p-6 sm:p-10 shadow-lg space-y-8 relative overflow-hidden">
        {/* Certificate Watermark / Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-farm-800 text-gold-400 flex items-center justify-center font-black text-xl border border-farm-700">
              DA
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                Official Agro Propagation Certificate
              </span>
              <h2 className="text-xl font-black text-gray-900">
                Batch Allocation: SCK-AYK-2026-B01
              </h2>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>95%+ Survival Rate Guaranteed</span>
          </div>
        </div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <span className="text-gray-400 block font-semibold">Reserved Variety</span>
            <strong className="text-gray-900 font-extrabold text-sm block mt-1">
              Giant French Plantain
            </strong>
            <span className="text-emerald-700 font-bold text-[11px]">Sword Suckers</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <span className="text-gray-400 block font-semibold">Allocated Quantity</span>
            <strong className="text-gray-900 font-extrabold text-sm block mt-1">
              500 Healthy Suckers
            </strong>
            <span className="text-gray-500 text-[11px]">Nursery Bed 1 (Ayakoromo)</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <span className="text-gray-400 block font-semibold">Bio-Treatment Date</span>
            <strong className="text-gray-900 font-extrabold text-sm block mt-1">
              November 02, 2026
            </strong>
            <span className="text-emerald-700 font-bold text-[11px]">54°C Thermal Sanitized</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <span className="text-gray-400 block font-semibold">Collection Jetty</span>
            <strong className="text-gray-900 font-extrabold text-sm block mt-1">
              Ayakoromo Marine Jetty
            </strong>
            <span className="text-gray-500 text-[11px]">Burutu LGA Waterway Freight</span>
          </div>
        </div>

        {/* Photos & SOP */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-5">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-emerald-300">
            <Image
              src="/images/plantain-sucker-treatment-tub.jpg"
              alt="Bio-treatment tub"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-1.5 flex-1 text-xs">
            <h4 className="font-extrabold text-emerald-950 text-sm">
              Bio-Sanitization & Nursery Protocol Verified
            </h4>
            <p className="text-emerald-900 leading-relaxed">
              Your suckers have undergone full root paring and hot-water thermal immersion to eradicate banana weevil borer (<em>Cosmopolites sordidus</em>) and root-knot nematodes before nursery staging.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Need to adjust collection date or arrange direct riverine boat freight?
          </span>

          <a
            href="https://wa.me/qr/IFALUE5YG2W5N1?text=Hello%20Doutare%20Agro%20Farm,%20I%20am%20inquiring%20about%20my%20sucker%20batch%20SCK-AYK-2026-B01..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-farm-800 hover:bg-farm-900 text-white font-bold text-xs px-5 py-3 rounded-xl transition shadow-md"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Connect with Nursery Agronomist on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}


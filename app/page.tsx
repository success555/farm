'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Phone,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  Truck,
  Leaf,
  Users,
  Anchor,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PRODUCTS } from '@/lib/products-data';
import WholesaleEstimator from '@/components/WholesaleEstimator';

const FIELD_GALLERY = [
  { src: '/images/plantain-suckers-pile.jpg', caption: 'High-yield bio-treated plantain suckers ready for field planting.' },
  { src: '/images/plantain-sucker-treatment-tub.jpg', caption: 'Biological sanitization & hot-water treatment tub for weevil eradication.' },
  { src: '/images/plantain-plantation-rows-estate.jpg', caption: 'Commercial plantain grove in Ayakoromo, Burutu LGA.' },
  { src: '/images/wholesale-plantain-harvest-bunches.jpg', caption: 'Freshly harvested mature plantain bunches staged for boat freight.' },
  { src: '/images/plantain-harvest-carry.jpg', caption: 'Youth field worker hauling jumbo bunches during peak harvest.' },
  { src: '/images/plantain-bunch.jpg', caption: 'Heavy giant French plantain bunch on the tree.' },
  { src: '/images/plantain-tree-blossom.jpg', caption: 'Vigorous floral emergence and finger formation.' },
  { src: '/images/plantain-grove-supervisor.jpg', caption: 'Field supervisor evaluating tree spacing and leaf health.' },
  { src: '/images/cassava-farming.jpg', caption: 'Commercial cassava plantation ready for garri processing.' },
  { src: '/images/fish-farming.jpg', caption: 'Freshwater catfish aquaculture ponds in Ayakoromo.' },
  { src: '/images/poultry-farming.jpg', caption: 'Biosecure layer poultry pens with fresh daily egg collection.' },
  { src: '/images/maize-mature-inspection.jpg', caption: 'Mature yellow maize cobs ready for mechanical shelling.' },
  { src: '/images/irrigation-crop-inspection.jpg', caption: 'Overhead sprinkler irrigation system during the dry season.' },
  { src: '/images/respirator-sprayer-operator.jpg', caption: 'Full PPE protective crop spraying and biosecurity operations.' },
  { src: '/images/doutare-farm-youth-team.jpg', caption: 'Doutare youth harvest and planting team in Ayakoromo.' },
  { src: '/images/doutare-branded-vest-team.jpg', caption: 'Supervisory agronomists on routine block inspection.' },
];

export default function HomePage() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  return (
    <div className="space-y-12 sm:space-y-20 lg:space-y-24 pb-12 sm:pb-20">
      {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-farm-950 via-farm-900 to-farm-950 text-white pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-emerald-500 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gold-500 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 bg-farm-800/90 border border-farm-700/80 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Delta State Agribusiness &bull; RC: 9563075</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                Commercial Farming & <span className="text-emerald-400">Wholesale Produce</span> E-Commerce
              </h1>

              <p className="text-sm sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
                Doutare Agro Farm Limited is your direct farm-gate source for bio-treated plantain suckers, crispy Delta yellow garri, freshwater catfish, maize, and poultry. Dispatched across Nigeria via riverine boat cargo & interstate road haulage.
              </p>

              {/* Action Buttons: Full Width Stack on Mobile, Inline on Tablet/Desktop */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/store"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-900/40 transition group w-full sm:w-auto text-sm sm:text-base text-center"
                >
                  <span>Shop Produce Wholesale</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition" />
                </Link>

                <a
                  href="#calculator"
                  className="bg-farm-800 hover:bg-farm-700 border border-farm-600 text-white font-bold px-6 py-3.5 sm:py-4 rounded-xl transition w-full sm:w-auto text-center text-sm sm:text-base"
                >
                  Price Estimator
                </a>

                <a
                  href="https://wa.me/qr/IFALUE5YG2W5N1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-emerald-400 hover:text-emerald-300 text-xs sm:text-sm font-semibold transition px-3 py-2.5 rounded-xl border border-farm-700/60 sm:border-0"
                >
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>

              {/* Trust Badges: Safe Layout for 360px Mobile Screens */}
              <div className="pt-5 sm:pt-6 border-t border-farm-800/80 grid grid-cols-3 gap-2 sm:gap-4">
                <div className="bg-farm-900/40 p-2 sm:p-0 rounded-lg sm:rounded-none">
                  <p className="text-xl sm:text-2xl font-black text-white">95%+</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium leading-tight mt-0.5">Sucker Survival</p>
                </div>
                <div className="bg-farm-900/40 p-2 sm:p-0 rounded-lg sm:rounded-none">
                  <p className="text-xl sm:text-2xl font-black text-white truncate">Burutu LGA</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium leading-tight mt-0.5">Ayakoromo Farm</p>
                </div>
                <div className="bg-farm-900/40 p-2 sm:p-0 rounded-lg sm:rounded-none">
                  <p className="text-xl sm:text-2xl font-black text-gold-400">100% Direct</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium leading-tight mt-0.5">Farm-Gate Wholesale</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-farm-700 shadow-2xl group">
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                  <Image
                    src="/images/plantain-suckers-pile.jpg"
                    alt="Doutare Farm Bio-Treated Plantain Suckers"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-farm-950 via-farm-950/40 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 space-y-1.5 sm:space-y-2">
                  <span className="bg-gold-500 text-farm-950 text-[10px] sm:text-xs font-black px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider inline-block">
                    Featured Asset
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">Bio-Treated Plantain Corms & Suckers</h3>
                  <p className="text-xs text-gray-300 line-clamp-2">
                    Propagated under strict agricultural protocols in Ayakoromo, Delta State. High bunch yield guarantee.
                  </p>
                  <div className="pt-1 flex justify-between items-center text-xs text-emerald-300 font-bold">
                    <span>From ₦250/sucker bulk</span>
                    <Link href="/store/plantain-suckers-bio-treated" className="underline hover:text-white">
                      Order Batch &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRODUCE CATEGORY SHOWCASE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-6 sm:mb-10">
          <div>
            <span className="text-farm-700 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider block mb-1">
              Direct From The Farm
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Featured Commercial Produce
            </h2>
          </div>
          <Link
            href="/store"
            className="text-farm-700 hover:text-farm-900 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition"
          >
            <span>View All Store Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRODUCTS.slice(0, 3).map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={prod.image}
                    alt={prod.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-farm-900/80 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full">
                    {prod.categoryLabel}
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-2 sm:space-y-3">
                  <h3 className="font-extrabold text-lg sm:text-xl text-gray-900 group-hover:text-farm-700 transition">
                    <Link href={`/store/${prod.slug}`}>{prod.title}</Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {prod.shortDescription}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs text-gray-400 block font-semibold">Starting from</span>
                  <span className="text-base sm:text-lg font-black text-farm-900">
                    ₦{prod.variants[0].price.toLocaleString()}
                  </span>
                  <span className="text-[11px] sm:text-xs text-gray-500"> / {prod.unit}</span>
                </div>

                <Link
                  href={`/store/${prod.slug}`}
                  className="bg-farm-800 hover:bg-farm-900 text-white font-bold text-xs px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition shadow-sm"
                >
                  Configure & Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE WHOLESALE ESTIMATOR COMPONENT
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WholesaleEstimator />
      </section>

      {/* =========================================================================
          AUTHENTIC FIELD GALLERY (Photos from Burutu LGA)
          ========================================================================= */}
      <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <span className="text-farm-700 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider block">
            Transparent On-Site Operations
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Authentic Field Gallery (Ayakoromo, Delta State)
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-2">
            Real photos showing our plantain plantations, high-yield sucker bio-treatment tubs, mechanized sprinkler irrigation, youth harvest teams, and biosecure operations.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {FIELD_GALLERY.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActivePhotoIndex(idx)}
              className="relative h-40 sm:h-56 lg:h-60 rounded-xl sm:rounded-2xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-farm-600"
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition"></div>
              <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 text-left">
                <p className="text-white text-[11px] sm:text-xs font-semibold line-clamp-2 leading-tight">
                  {item.caption}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox Modal (Responsive for Mobile Screens) */}
        {activePhotoIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-3 sm:p-6">
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-300 p-2 z-50 bg-black/50 rounded-full"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <button
              onClick={() =>
                setActivePhotoIndex((prev) => (prev! > 0 ? prev! - 1 : FIELD_GALLERY.length - 1))
              }
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 sm:p-3 z-50 bg-black/50 rounded-full"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <div className="relative max-w-4xl max-h-[85vh] w-full h-[320px] sm:h-[480px] lg:h-[600px] flex flex-col items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={FIELD_GALLERY[activePhotoIndex].src}
                  alt={FIELD_GALLERY[activePhotoIndex].caption}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white text-center text-xs sm:text-sm font-semibold mt-3 px-4">
                {FIELD_GALLERY[activePhotoIndex].caption} ({activePhotoIndex + 1} of {FIELD_GALLERY.length})
              </p>
            </div>

            <button
              onClick={() =>
                setActivePhotoIndex((prev) => (prev! < FIELD_GALLERY.length - 1 ? prev! + 1 : 0))
              }
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 sm:p-3 z-50 bg-black/50 rounded-full"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>
        )}
      </section>

      {/* =========================================================================
          THREE PILLARS & COMMUNITY COMMITMENT
          ========================================================================= */}
      <section id="about" className="bg-farm-900 text-white py-12 sm:py-20 rounded-2xl sm:rounded-3xl mx-3 sm:mx-6 lg:mx-8 px-5 sm:px-12">
        <div className="max-w-5xl mx-auto text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <span className="text-gold-400 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider block">
            Our Agribusiness Mission
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            Grow Food &bull; Grow People &bull; Grow Wealth
          </h2>
          <p className="text-gray-300 text-xs sm:text-base leading-relaxed">
            Doutare Agro Farm Limited was established with a clear mandate: to modernize agriculture across Burutu LGA, create sustainable youth employment, and ensure reliable food security across Southern Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-farm-950/60 p-6 sm:p-8 rounded-2xl border border-farm-800 space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">1. Grow Food</h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Cultivating high-yield crops with bio-treatment, integrated pest management, and advanced water sprinkler irrigation systems.
            </p>
          </div>

          <div className="bg-farm-950/60 p-6 sm:p-8 rounded-2xl border border-farm-800 space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">2. Grow People</h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Empowering local youths in Ayakoromo and riverine Delta communities through practical agronomist training, farm safety, and paid employment.
            </p>
          </div>

          <div className="bg-farm-950/60 p-6 sm:p-8 rounded-2xl border border-farm-800 space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">3. Grow Wealth</h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Helping farmers across Nigeria achieve sustainable returns by supplying high-survival propagation material and reliable wholesale commodities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

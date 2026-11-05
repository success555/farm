import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-farm-950 text-gray-300 pt-16 pb-12 border-t border-farm-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-farm-800 text-gold-400 flex items-center justify-center font-bold text-lg border border-farm-700">
                DA
              </div>
              <span className="text-white font-extrabold text-lg tracking-tight">
                Doutare Agro Farm Ltd
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Premier Nigerian agribusiness committed to sustainable commercial crop production, high-yield plantain sucker propagation, catfish aquaculture, and youth empowerment in Ayakoromo, Burutu LGA, Delta State.
            </p>
            <div className="inline-flex items-center gap-2 bg-farm-900/80 px-3 py-1.5 rounded-lg border border-farm-800 text-xs text-gold-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>CAC RC: 9563075</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-emerald-500 pl-3">
              Wholesale Produce
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/store" className="hover:text-emerald-400 transition">
                  Bio-Treated Plantain Suckers
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-emerald-400 transition">
                  Crispy Delta Yellow Garri (50kg/100kg)
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-emerald-400 transition">
                  Freshwater Catfish (Live & Oven-Smoked)
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-emerald-400 transition">
                  Dry Shelled Yellow Maize
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-emerald-400 transition">
                  Farm Table Eggs (30-Egg Crates)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Logistics & Locations */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-emerald-500 pl-3">
              Waterway & Road Cargo
            </h4>
            <p className="text-sm text-gray-400 mb-3 leading-relaxed">
              We dispatch bulk agro produce nationwide via direct riverine boat freight from Ayakoromo Riverfront and heavy haulage road trucks to Warri, Asaba, Benin, Port Harcourt, and Lagos.
            </p>
            <div className="bg-farm-900/50 p-3 rounded-lg border border-farm-800 text-xs space-y-1">
              <p className="text-emerald-400 font-semibold">&bull; Ayakoromo Waterfront Jetty</p>
              <p className="text-gray-400">&bull; Burutu LGA Deepwater Route</p>
              <p className="text-gray-400">&bull; Warri Commercial Haulage Park</p>
            </div>
          </div>

          {/* Col 4: Contact & Inquiries */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-emerald-500 pl-3">
              Direct Inquiries
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="https://wa.me/qr/IFALUE5YG2W5N1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-300 transition"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Fast Response Desk</p>
                  <p className="font-semibold text-emerald-200">WhatsApp Instant Chat &rarr;</p>
                </div>
              </a>

              <a
                href="tel:+2348073553976"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+234 807 355 3976</span>
              </a>

              <a
                href="mailto:doutareagro@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>doutareagro@gmail.com</span>
              </a>

              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Ayakoromo town, Burutu LGA, Delta State, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-farm-900 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Doutare Agro Farm Limited (RC: 9563075). All Rights Reserved.</p>
          <p className="flex items-center gap-2">
            <span>Delta State Agribusiness</span>
            <span>&bull;</span>
            <span>Sustainable Food Security</span>
            <span>&bull;</span>
            <span className="text-gold-400 font-semibold">Grow Food, Grow People, Grow Wealth</span>
          </p>
        </div>
      </div>
    </footer>
  );
}


'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Sprout,
  MapPin,
  ArrowLeft,
  ShieldCheck,
  User,
  LayoutDashboard,
  MessageSquare,
} from 'lucide-react';
import { UserButton, SignedIn, useUser } from '@clerk/nextjs';

export default function UserAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUser();

  const customerNav = [
    { label: 'My Orders & Deliveries', href: '/dashboard', icon: ShoppingBag },
    { label: 'Sucker Reservations', href: '/dashboard/suckers', icon: Sprout },
    { label: 'Saved Delivery Locations', href: '/dashboard/addresses', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Customer Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        {/* Top Info Bar */}
        <div className="bg-farm-900 text-white text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span>Doutare Agro Farm Limited &bull; Customer Wholesale Portal</span>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/qr/IFALUE5YG2W5N1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300 flex items-center gap-1"
              >
                <MessageSquare className="w-3 h-3 text-emerald-400" />
                <span>WhatsApp Desk</span>
              </a>
              <span className="text-gray-500">|</span>
              <span className="text-gold-400 font-semibold">RC: 9563075</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-farm-800 text-gold-400 flex items-center justify-center font-bold text-lg border border-farm-700 shadow-sm">
                DA
              </div>
              <div>
                <span className="font-extrabold text-lg text-gray-900 tracking-tight block">
                  DOUTARE AGRO
                </span>
                <span className="text-xs text-farm-700 font-bold">Buyer Account Portal</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {user?.publicMetadata?.role === 'admin' || user?.publicMetadata?.role === 'farm_manager' ? (
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 bg-farm-900 hover:bg-farm-950 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-sm"
                title="Open Backend Admin Portal"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-gold-400" />
                <span>Switch to Admin &rarr;</span>
              </Link>
            ) : null}

            <Link
              href="/store"
              className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-2 rounded-xl transition"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span>Shop More Produce</span>
            </Link>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto border-t border-gray-100 py-2 scrollbar-none">
          {customerNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-farm-800 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>&copy; {new Date().getFullYear()} Doutare Agro Farm Limited (RC: 9563075). Ayakoromo, Burutu LGA, Delta State.</p>
          <div className="flex items-center gap-4 text-emerald-700 font-semibold">
            <Link href="/store" className="hover:underline">Store Catalog</Link>
            <a href="https://wa.me/qr/IFALUE5YG2W5N1" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}


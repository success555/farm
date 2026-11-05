'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Phone, MessageSquare, User, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';

export default function Navbar() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin' || user?.publicMetadata?.role === 'farm_manager';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Top Bar for Location & Direct Contact */}
      <div className="bg-farm-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Ayakoromo town, Burutu LGA, Delta State &bull; <strong className="text-gold-400">RC: 9563075</strong></span>
          </div>
          <div className="flex items-center gap-4 text-gray-200">
            <a
              href="https://wa.me/qr/IFALUE5YG2W5N1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 flex items-center gap-1 transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Desk</span>
            </a>
            <span className="text-gray-500">|</span>
            <a href="tel:+2348073553976" className="hover:text-emerald-300 flex items-center gap-1 transition">
              <Phone className="w-3.5 h-3.5" />
              <span>+234 807 355 3976</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl bg-farm-800 text-gold-400 flex items-center justify-center font-bold text-xl shadow-md border border-farm-700 group-hover:scale-105 transition">
            DA
          </div>
          <div>
            <div className="font-extrabold text-xl text-gray-900 tracking-tight leading-tight flex items-center gap-1.5">
              <span>DOUTARE</span>
              <span className="text-farm-700">AGRO</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">Farm Limited &bull; E-Commerce Portal</p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
          <Link href="/" className="hover:text-farm-700 transition">
            Home
          </Link>
          <Link href="/store" className="hover:text-farm-700 transition flex items-center gap-1.5">
            <span>Store Catalog</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Wholesale
            </span>
          </Link>
          <Link href="/#calculator" className="hover:text-farm-700 transition">
            Order Estimator
          </Link>
          <Link href="/#gallery" className="hover:text-farm-700 transition">
            Field Gallery
          </Link>
          <Link href="/#about" className="hover:text-farm-700 transition">
            About Farm
          </Link>
          <Link href="/dashboard" className="hover:text-farm-700 transition font-medium">
            My Dashboard
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="text-emerald-950 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-300 text-xs font-black transition flex items-center gap-1 shadow-sm"
            >
              <span>Backend Admin</span>
            </Link>
          )}
        </div>

        {/* Action Controls (Cart + Clerk Auth) */}
        <div className="flex items-center gap-4">
          {/* Shopping Cart Button */}
          <Link
            href="/cart"
            className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-farm-700 border border-gray-200 transition"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-farm-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Clerk Auth Component */}
          <div className="hidden sm:block">
            {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('placeholder') ? (
              <>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="flex items-center gap-2 text-sm font-semibold bg-farm-800 hover:bg-farm-900 text-white px-4 py-2 rounded-xl transition shadow-sm">
                      <User className="w-4 h-4" />
                      <span>Sign In</span>
                    </button>
                  </SignInButton>
                </SignedOut>
              </>
            ) : (
              <Link
                href="/store"
                className="flex items-center gap-2 text-sm font-semibold bg-farm-800 hover:bg-farm-900 text-white px-4 py-2 rounded-xl transition shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Shop Wholesale</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-5 space-y-4 shadow-xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-gray-800 hover:text-farm-700"
          >
            Home
          </Link>
          <Link
            href="/store"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-gray-800 hover:text-farm-700"
          >
            Produce Catalog & Wholesale
          </Link>
          <Link
            href="/#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-gray-800 hover:text-farm-700"
          >
            Price Estimator
          </Link>
          <Link
            href="/#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-gray-800 hover:text-farm-700"
          >
            Authentic Field Gallery (23 Photos)
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-gray-800 hover:text-farm-700"
          >
            User Dashboard & Orders
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold text-emerald-900 bg-emerald-100 px-3 py-2 rounded-lg"
            >
              Backend Admin Portal
            </Link>
          )}
          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-base font-semibold text-farm-800 bg-emerald-50 p-3 rounded-lg"
          >
            <span>View Shopping Cart</span>
            <span className="bg-farm-700 text-white px-2 py-0.5 rounded-full text-xs font-bold">
              {totalItems} items
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}


'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/navigation';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Sprout,
  Users,
  Settings,
  ExternalLink,
  Menu,
  X,
  Bell,
  Search,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { UserButton, SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Client-side access guard: Regular users are strictly redirected to /dashboard
  useEffect(() => {
    if (isLoaded && user) {
      const role = user.publicMetadata?.role;
      if (role !== 'admin' && role !== 'farm_manager') {
        router.replace('/dashboard');
      }
    }
  }, [isLoaded, user, router]);

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Orders & Dispatch', href: '/admin/orders', icon: ShoppingBag, badge: '5' },
    { label: 'Produce Inventory', href: '/admin/products', icon: Package },
    { label: 'Sucker Nursery Desk', href: '/admin/suckers', icon: Sprout, badge: 'High Yield' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 bg-[#072413] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-[#0f3d24] shadow-xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-[#0f3d24] flex items-center justify-between">
            <NextLink href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-farm-800 text-gold-400 flex items-center justify-center font-bold text-lg border border-farm-700 shadow-sm">
                DA
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block">
                  DOUTARE AGRO
                </span>
                <span className="text-[11px] text-slate-300 font-medium">Merchant Dashboard</span>
              </div>
            </NextLink>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Farm Status */}
          <div className="px-6 py-4 border-b border-[#0f3d24] bg-[#0c361e]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Ayakoromo Farm</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">RC: 9563075 &bull; Burutu LGA</p>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <NextLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-200 hover:bg-[#14532d] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-emerald-800 text-white'
                          : 'bg-[#14532d] text-emerald-300 border border-emerald-700/60'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NextLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-[#0f3d24] bg-[#051c0f] space-y-2">
          <NextLink
            href="/dashboard"
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#0c361e] hover:bg-[#14532d] text-slate-200 hover:text-white text-xs font-semibold transition border border-[#14532d]"
          >
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gold-400" />
              <span>User Dashboard</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </NextLink>

          <NextLink
            href="/"
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#0c361e] hover:bg-[#14532d] text-slate-200 hover:text-white text-xs font-semibold transition border border-[#14532d]"
          >
            <span>View Public Store</span>
            <ExternalLink className="w-4 h-4 text-emerald-400" />
          </NextLink>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                M
              </div>
              <div>
                <p className="text-xs font-bold text-white">Farm Manager</p>
                <p className="text-[10px] text-slate-400">Ayakoromo Desk</p>
              </div>
            </div>

            {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('placeholder') ? (
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            ) : null}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-1.5 text-xs text-gray-500 w-64">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders, suckers, buyers..."
                className="bg-transparent border-none outline-none w-full text-gray-800 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NextLink
              href="/dashboard"
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg transition"
              title="View User Dashboard"
            >
              <Users className="w-3.5 h-3.5 text-slate-600" />
              <span>User Dashboard</span>
            </NextLink>

            <NextLink
              href="/store"
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-lg transition"
            >
              <span>+ New Wholesale Sale</span>
            </NextLink>

            <NextLink
              href="/admin/orders"
              className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </NextLink>
          </div>
        </header>

        {/* Page Body */}
        <main className="p-4 sm:p-8 flex-1 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingBag,
  Sprout,
  Package,
  ArrowUpRight,
  Truck,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { INITIAL_ORDERS } from '@/lib/dashboard-data';
import { PRODUCTS } from '@/lib/products-data';

export default function DashboardOverviewPage() {
  const totalRevenue = INITIAL_ORDERS.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const paidOrders = INITIAL_ORDERS.filter((o) => o.paymentStatus === 'paid').length;
  const pendingOrders = INITIAL_ORDERS.filter((o) => o.status === 'pending_payment').length;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Welcome & Context */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-farm-800 uppercase tracking-wider bg-emerald-100/80 px-2.5 py-1 rounded-md mb-1 sm:mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-farm-800 shrink-0" />
            <span>Ayakoromo Central Farm Operations &bull; RC: 9563075</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Farm Operations & Sales Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Real-time harvest manifests, customer wholesale dispatch, and nursery inventory tracking.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link
            href="/admin/orders"
            className="flex-1 sm:flex-none justify-center bg-farm-800 hover:bg-farm-900 text-white font-bold text-xs px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition shadow-sm flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Manage Orders</span>
          </Link>

          <Link
            href="/admin/suckers"
            className="flex-1 sm:flex-none justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition shadow-sm flex items-center gap-1.5"
          >
            <Sprout className="w-4 h-4" />
            <span>Sucker Desk</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards (2 Columns on mobile, 4 on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Card 1: Gross Revenue */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <span className="truncate">Gross Sales</span>
            <span className="p-1.5 sm:p-2 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <p className="text-lg sm:text-2xl font-black text-gray-900 truncate">
            ₦{totalRevenue.toLocaleString()}
          </p>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-emerald-700 font-bold">
            <ArrowUpRight className="w-3 h-3" />
            <span>{paidOrders} orders paid</span>
          </div>
        </div>

        {/* Card 2: Active Orders */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <span className="truncate">Wholesale</span>
            <span className="p-1.5 sm:p-2 rounded-xl bg-blue-50 text-blue-700 shrink-0">
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <p className="text-lg sm:text-2xl font-black text-gray-900">
            {INITIAL_ORDERS.length} Active
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500 truncate">
            {pendingOrders} awaiting transfer
          </p>
        </div>

        {/* Card 3: Plantain Sucker Propagation */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <span className="truncate">Sucker Nursery</span>
            <span className="p-1.5 sm:p-2 rounded-xl bg-gold-50 text-gold-600 shrink-0">
              <Sprout className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <p className="text-lg sm:text-2xl font-black text-gray-900 truncate">
            2,100 Units
          </p>
          <p className="text-[10px] sm:text-xs text-emerald-700 font-bold truncate">
            100% Bio-Treated
          </p>
        </div>

        {/* Card 4: Waterway & Haulage Logistics */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <span className="truncate">Cargo Freight</span>
            <span className="p-1.5 sm:p-2 rounded-xl bg-purple-50 text-purple-700 shrink-0">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <p className="text-lg sm:text-2xl font-black text-gray-900">
            3 Dispatches
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500 truncate">
            Burutu Boat & Haulage
          </p>
        </div>
      </div>

      {/* Main Grid: Recent Orders Feed + Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left: Recent Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">Recent Wholesale Orders</h2>
              <p className="text-[11px] sm:text-xs text-gray-500">Incoming buyer orders requiring harvesting or dispatch clearance</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-farm-700 hover:text-farm-900 flex items-center gap-1 shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Card List for Orders */}
          <div className="block md:hidden divide-y divide-gray-100 p-2">
            {INITIAL_ORDERS.slice(0, 4).map((order) => (
              <div key={order.id} className="p-3.5 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-black text-gray-900 block">{order.orderNumber}</span>
                    <span className="text-xs font-bold text-gray-800">{order.customerName}</span>
                    <span className="text-[10px] text-gray-400 block">{order.destination.split(',')[0]}</span>
                  </div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      order.status === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.status === 'in_transit'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'harvesting'
                        ? 'bg-gold-100 text-gold-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <p className="text-[11px] text-gray-600 truncate">{order.itemsSummary}</p>

                <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                  <span className="text-sm font-black text-gray-900">₦{order.totalAmount.toLocaleString()}</span>
                  <a
                    href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(order.customerName)},%20regarding%20your%20Doutare%20Agro%20order%20${order.orderNumber}...`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase font-bold text-[11px] border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-5">Order Ref</th>
                  <th className="py-3.5 px-5">Customer</th>
                  <th className="py-3.5 px-5">Produce Summary</th>
                  <th className="py-3.5 px-5">Amount</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {INITIAL_ORDERS.slice(0, 4).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-4 px-5 font-black text-gray-900">{order.orderNumber}</td>
                    <td className="py-4 px-5">
                      <p className="font-bold text-gray-900">{order.customerName}</p>
                      <p className="text-gray-400 text-[11px]">{order.destination.split(',')[0]}</p>
                    </td>
                    <td className="py-4 px-5 text-gray-600 max-w-xs truncate">
                      {order.itemsSummary}
                    </td>
                    <td className="py-4 px-5 font-black text-gray-900">
                      ₦{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          order.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'in_transit'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'harvesting'
                            ? 'bg-gold-100 text-gold-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <a
                        href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(order.customerName)},%20regarding%20your%20Doutare%20Agro%20order%20${order.orderNumber}...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Produce Inventory & Nursery Alerts */}
        <div className="lg:col-span-4 space-y-5 sm:space-y-6">
          {/* Sucker Desk Quick Monitor */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>Plantain Sucker Desk</span>
              </h3>
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Ayakoromo
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sword Suckers Available:</span>
                <strong className="text-gray-900 font-bold">1,250 units</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Maiden Head Corms:</span>
                <strong className="text-gray-900 font-bold">850 units</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Reserved / Ordered:</span>
                <strong className="text-gold-600 font-bold">600 units</strong>
              </div>
            </div>

            <div className="pt-1">
              <Link
                href="/admin/suckers"
                className="block text-center w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-farm-800 font-bold text-xs rounded-xl transition border border-gray-200"
              >
                Open Full Sucker Desk &rarr;
              </Link>
            </div>
          </div>

          {/* Quick Production Health */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-farm-700" />
              <span>Agro Inventory Status</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-900">Yellow Garri (50kg)</p>
                  <p className="text-[11px] text-gray-400">Ayakoromo Processing Centre</p>
                </div>
                <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                  35 Bags (Low)
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-900">Smoked Catfish (1kg)</p>
                  <p className="text-[11px] text-gray-400">Kiln-Dried Master Packs</p>
                </div>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  120 Packs
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-900">Fresh Eggs (Crates of 30)</p>
                  <p className="text-[11px] text-gray-400">Daily Morning Collection</p>
                </div>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  85 Crates
                </span>
              </div>
            </div>

            <Link
              href="/admin/products"
              className="block text-center w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-farm-800 font-bold text-xs rounded-xl transition border border-gray-200"
            >
              Update Produce Inventory &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

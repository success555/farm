'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Sprout,
  ExternalLink,
} from 'lucide-react';
import { INITIAL_ORDERS, DashboardOrder } from '@/lib/dashboard-data';
import { useUser } from '@clerk/nextjs';

export default function UserAccountOrdersPage() {
  const { user } = useUser();
  const myOrders = INITIAL_ORDERS.slice(0, 3);
  const activeOrder = myOrders[0];

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-farm-900 via-farm-800 to-farm-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-2.5 sm:space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>Verified Wholesale Buyer Account</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Welcome back, {user?.firstName || 'Valued Farm Partner'}!
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Track your farm produce harvests, check riverine boat cargo waybills, view payment confirmations, and manage plantain sucker reservations in Burutu LGA.
          </p>
        </div>
      </div>

      {/* Customer Quick Stats (2 Columns on mobile, 4 on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Total Orders
          </span>
          <p className="text-xl sm:text-2xl font-black text-gray-900">{myOrders.length} Orders</p>
          <p className="text-[10px] sm:text-[11px] text-emerald-700 font-bold truncate">Ayakoromo Farm Direct</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Active Dispatches
          </span>
          <p className="text-xl sm:text-2xl font-black text-farm-700">1 In Harvest</p>
          <p className="text-[10px] sm:text-[11px] text-gray-500 truncate">Burutu waterway freight</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Bio-Treated Suckers
          </span>
          <p className="text-xl sm:text-2xl font-black text-emerald-700">500 Reserved</p>
          <p className="text-[10px] sm:text-[11px] text-gray-500 truncate">Nursery Bed 1</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Wholesale Value
          </span>
          <p className="text-xl sm:text-2xl font-black text-gray-900 truncate">
            ₦{myOrders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
          </p>
          <p className="text-[10px] sm:text-[11px] text-emerald-700 font-bold truncate">100% Verified Receipts</p>
        </div>
      </div>

      {/* Live Order Fulfillment Tracker */}
      {activeOrder && (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-emerald-200 p-5 sm:p-8 shadow-md space-y-5 sm:space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-4">
            <div>
              <span className="text-[10px] sm:text-xs font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-100/70 px-2.5 py-1 rounded-full">
                Active Order Tracking
              </span>
              <h2 className="text-lg sm:text-xl font-black text-gray-900 mt-2">
                Order Ref: {activeOrder.orderNumber}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Destination: <strong>{activeOrder.destination}</strong> via {activeOrder.deliveryMethod}
              </p>
            </div>

            <a
              href={`https://wa.me/qr/IFALUE5YG2W5N1?text=Hello%20Doutare%20Agro%20Farm,%20checking%20status%20on%20my%20order%20${activeOrder.orderNumber}...`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire on WhatsApp Desk</span>
            </a>
          </div>

          {/* Stepper Progress */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 pt-1">
            {[
              { step: '1', title: 'Payment Confirmed', desc: 'Bank wire verified & receipt logged', done: true },
              { step: '2', title: 'Field Harvest & Sorting', desc: 'Suckers lifted & bio-treated in Ayakoromo', done: true },
              { step: '3', title: 'Riverine / Haulage Freight', desc: 'Loaded onto cargo boat at waterfront', done: false, active: true },
              { step: '4', title: 'Delivered & Accepted', desc: 'Waybill signed by buyer', done: false },
            ].map((s, idx) => (
              <div
                key={idx}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border ${
                  s.done
                    ? 'bg-emerald-50/80 border-emerald-300'
                    : s.active
                    ? 'bg-white border-farm-700 shadow-sm ring-2 ring-farm-600'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <span
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      s.done
                        ? 'bg-emerald-600 text-white'
                        : s.active
                        ? 'bg-farm-900 text-white animate-pulse'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {s.done ? '✓' : s.step}
                  </span>
                  <span className="font-extrabold text-xs text-gray-900">{s.title}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-200 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-2">
            <span className="text-gray-600">
              Produce in this manifest: <strong className="text-gray-900">{activeOrder.itemsSummary}</strong>
            </span>
            <span className="font-black text-farm-900 text-sm sm:text-base">
              ₦{activeOrder.totalAmount.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Orders History Section */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-base sm:text-lg font-black text-gray-900">Order & Waybill History</h3>
            <p className="text-[11px] sm:text-xs text-gray-500">Your past commercial agricultural orders from Doutare Agro Farm</p>
          </div>
          <Link
            href="/store"
            className="text-xs font-bold text-farm-700 hover:text-farm-900 flex items-center gap-1 shrink-0"
          >
            <span>Order More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile View: Clean Card Stack for Small Screens */}
        <div className="block md:hidden divide-y divide-gray-100 p-2">
          {myOrders.map((ord) => (
            <div key={ord.id} className="p-3.5 space-y-2.5">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-black text-gray-900 block">{ord.orderNumber}</span>
                  <span className="text-[11px] text-gray-500">{ord.destination}</span>
                </div>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    ord.status === 'delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : ord.status === 'in_transit'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gold-100 text-gold-800'
                  }`}
                >
                  {ord.status.replace(/_/g, ' ')}
                </span>
              </div>

              <p className="text-xs text-gray-700 font-medium">{ord.itemsSummary}</p>

              <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                <span className="text-sm font-black text-gray-900">₦{ord.totalAmount.toLocaleString()}</span>
                <a
                  href={`https://wa.me/qr/IFALUE5YG2W5N1?text=Hello%20Doutare%20Agro%20Farm,%20I%20would%20like%20to%20repeat%20or%20track%20order%20${ord.orderNumber}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-2.5 py-1.5 rounded-lg text-xs transition"
                >
                  <Receipt className="w-3.5 h-3.5 text-farm-700" />
                  <span>Invoice / Chat</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Full Responsive Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 uppercase font-bold text-[11px] border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-5">Order Ref</th>
                <th className="py-3.5 px-5">Produce Items</th>
                <th className="py-3.5 px-5">Dispatch Route</th>
                <th className="py-3.5 px-5">Amount</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-4 px-5 font-black text-gray-900">{ord.orderNumber}</td>
                  <td className="py-4 px-5 font-medium text-gray-800 max-w-xs truncate">
                    {ord.itemsSummary}
                  </td>
                  <td className="py-4 px-5 text-gray-600">
                    <span className="block font-semibold">{ord.destination.split(',')[0]}</span>
                    <span className="text-[10px] text-gray-400">{ord.deliveryMethod}</span>
                  </td>
                  <td className="py-4 px-5 font-black text-gray-900">
                    ₦{ord.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        ord.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.status === 'in_transit'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gold-100 text-gold-800'
                      }`}
                    >
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <a
                      href={`https://wa.me/qr/IFALUE5YG2W5N1?text=Hello%20Doutare%20Agro%20Farm,%20I%20would%20like%20to%20repeat%20or%20track%20order%20${ord.orderNumber}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-3 py-1.5 rounded-lg transition"
                    >
                      <Receipt className="w-3.5 h-3.5 text-farm-700" />
                      <span>Invoice / Support</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

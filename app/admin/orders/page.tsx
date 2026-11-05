'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  MessageSquare,
  Eye,
  X,
  CreditCard,
  Building2,
  ChevronDown,
} from 'lucide-react';
import { INITIAL_ORDERS, DashboardOrder } from '@/lib/dashboard-data';

export default function DashboardOrdersPage() {
  const [orders, setOrders] = useState<DashboardOrder[]>(INITIAL_ORDERS);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<DashboardOrder | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery) ||
      order.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (
    orderId: string,
    newStatus: DashboardOrder['status']
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleTogglePayment = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, paymentStatus: o.paymentStatus === 'paid' ? 'unpaid' : 'paid' }
          : o
      )
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        paymentStatus: selectedOrder.paymentStatus === 'paid' ? 'unpaid' : 'paid',
      });
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Orders & Wholesale Dispatch
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Track produce orders, boat waybills, payment verifications, and customer communications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">
            Total Orders: <strong className="text-gray-900">{filteredOrders.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-3.5 sm:p-4 space-y-3 sm:space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2.5 sm:gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order, buyer, phone, or town..."
              className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-4 py-2 text-base sm:text-xs focus:outline-none focus:ring-2 focus:ring-farm-600 focus:bg-white"
            />
          </div>

          {/* Quick status tabs (Smooth scrolling on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All' },
              { id: 'pending_payment', label: 'Unpaid' },
              { id: 'harvesting', label: 'Harvesting' },
              { id: 'ready_for_pickup', label: 'Ready' },
              { id: 'in_transit', label: 'In Transit' },
              { id: 'delivered', label: 'Delivered' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition shrink-0 ${
                  statusFilter === tab.id
                    ? 'bg-farm-800 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Mobile View: Clean Card List */}
        <div className="block md:hidden divide-y divide-gray-100 p-2">
          {filteredOrders.length === 0 ? (
            <p className="py-8 text-center text-xs text-gray-400">No orders match filter.</p>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="p-3.5 space-y-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-black text-gray-900 block">{order.orderNumber}</span>
                    <span className="text-xs font-bold text-gray-800">{order.customerName}</span>
                    <span className="text-[10px] text-gray-400 block">{order.customerPhone} &bull; {order.destination}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <button
                      onClick={() => handleTogglePayment(order.id)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase transition ${
                        order.paymentStatus === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.paymentStatus}
                    </button>
                    <span className="text-[10px] text-gray-500 font-semibold">{order.deliveryMethod}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded-lg font-medium">{order.itemsSummary}</p>

                <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Total</span>
                    <span className="text-sm font-black text-gray-900">₦{order.totalAmount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleUpdateStatus(order.id, e.target.value as DashboardOrder['status'])
                      }
                      className="bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-bold text-gray-800 focus:outline-none"
                    >
                      <option value="pending_payment">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="harvesting">Harvesting</option>
                      <option value="ready_for_pickup">Ready</option>
                      <option value="in_transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                    </select>

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <a
                      href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(order.customerName)},%20this%20is%20Doutare%20Agro%20Farm%20Limited.%20Regarding%20your%20order%20${order.orderNumber}...`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                      title="Chat on WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Full Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 uppercase font-bold text-[11px] border-b border-gray-200">
              <tr>
                <th className="py-4 px-5">Order Ref</th>
                <th className="py-4 px-5">Buyer</th>
                <th className="py-4 px-5">Produce Items</th>
                <th className="py-4 px-5">Delivery Method</th>
                <th className="py-4 px-5">Total</th>
                <th className="py-4 px-5">Payment</th>
                <th className="py-4 px-5">Fulfillment</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/80 transition">
                    <td className="py-4 px-5 font-black text-gray-900">{order.orderNumber}</td>
                    <td className="py-4 px-5">
                      <p className="font-bold text-gray-900">{order.customerName}</p>
                      <p className="text-gray-400 text-[11px]">{order.customerPhone}</p>
                    </td>
                    <td className="py-4 px-5 text-gray-700 max-w-xs truncate font-medium">
                      {order.itemsSummary}
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-gray-600 block">{order.deliveryMethod}</span>
                      <span className="text-gray-400 text-[10px]">{order.destination}</span>
                    </td>
                    <td className="py-4 px-5 font-black text-gray-900">
                      ₦{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-4 px-5">
                      <button
                        onClick={() => handleTogglePayment(order.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase transition ${
                          order.paymentStatus === 'paid'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                        title="Click to toggle payment status"
                      >
                        <span>{order.paymentStatus}</span>
                      </button>
                    </td>
                    <td className="py-4 px-5">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleUpdateStatus(order.id, e.target.value as DashboardOrder['status'])
                        }
                        className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-farm-600"
                      >
                        <option value="pending_payment">Pending Payment</option>
                        <option value="processing">Processing</option>
                        <option value="harvesting">Harvesting</option>
                        <option value="ready_for_pickup">Ready for Pickup</option>
                        <option value="in_transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-5 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition"
                        title="View Order Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <a
                        href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(order.customerName)},%20this%20is%20Doutare%20Agro%20Farm%20Limited.%20Regarding%20your%20order%20${order.orderNumber}...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal (Responsive for Mobile Screens) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-8 space-y-4 sm:space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-600 p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div>
              <span className="text-[11px] sm:text-xs font-bold text-farm-700 uppercase tracking-wider block mb-0.5 sm:mb-1">
                Wholesale Order Specification
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                {selectedOrder.orderNumber}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs bg-gray-50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-200">
              <div>
                <span className="text-gray-400 block font-semibold text-[11px]">Buyer Name</span>
                <span className="font-bold text-gray-900">{selectedOrder.customerName}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold text-[11px]">Contact Phone</span>
                <span className="font-bold text-gray-900">{selectedOrder.customerPhone}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold text-[11px]">Delivery Logistics</span>
                <span className="font-bold text-gray-900">{selectedOrder.deliveryMethod}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-semibold text-[11px]">Destination</span>
                <span className="font-bold text-gray-900">{selectedOrder.destination}</span>
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Ordered Produce Items
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 bg-emerald-50/50 p-3 sm:p-3.5 rounded-xl border border-emerald-100">
                {selectedOrder.itemsSummary}
              </p>
            </div>

            <div className="flex justify-between items-baseline pt-2 border-t border-gray-100">
              <span className="text-xs sm:text-sm font-bold text-gray-600">Total Order Value:</span>
              <span className="text-xl sm:text-2xl font-black text-farm-900">
                ₦{selectedOrder.totalAmount.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={() => handleTogglePayment(selectedOrder.id)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition text-center"
              >
                Mark as {selectedOrder.paymentStatus === 'paid' ? 'Unpaid' : 'Paid'}
              </button>

              <a
                href={`https://wa.me/${selectedOrder.customerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedOrder.customerName)},%20update%20on%20your%20Doutare%20Agro%20order%20${selectedOrder.orderNumber}:%20Current%20status%20is%20${selectedOrder.status.replace(/_/g, ' ')}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Dispatch Update</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

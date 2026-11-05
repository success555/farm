'use client';

import React, { useState } from 'react';
import { MapPin, Plus, Trash2, CheckCircle2, Truck, Anchor } from 'lucide-react';

interface SavedAddress {
  id: string;
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  logisticsPreference: 'Waterway Boat Freight' | 'Interstate Road Haulage' | 'Farm-Gate Pickup';
  isDefault: boolean;
}

const INITIAL_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-1',
    name: 'Engr. Kenneth Ebi',
    phone: '+234 803 456 7890',
    addressLine: 'Wharf Road, Marine Jetty Loading Bay',
    city: 'Warri',
    state: 'Delta State',
    logisticsPreference: 'Waterway Boat Freight',
    isDefault: true,
  },
  {
    id: 'addr-2',
    name: 'Kenneth Ebi (Asaba Depot)',
    phone: '+234 803 456 7890',
    addressLine: 'Benin-Asaba Expressway Agriculture Depot',
    city: 'Asaba',
    state: 'Delta State',
    logisticsPreference: 'Interstate Road Haulage',
    isDefault: false,
  },
];

export default function UserAddressesPage() {
  const [addresses, setAddresses] = useState<SavedAddress[]>(INITIAL_ADDRESSES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: '',
    phone: '',
    addressLine: '',
    city: '',
    state: 'Delta State',
    logisticsPreference: 'Waterway Boat Freight' as SavedAddress['logisticsPreference'],
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.name || !newAddr.addressLine) return;
    const item: SavedAddress = {
      id: 'addr-' + Date.now(),
      ...newAddr,
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, item]);
    setShowAddForm(false);
    setNewAddr({
      name: '',
      phone: '',
      addressLine: '',
      city: '',
      state: 'Delta State',
      logisticsPreference: 'Waterway Boat Freight',
    });
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Saved Delivery & Transit Locations
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Configure riverine boat cargo terminals, haulage drop-off parks, or warehouse pickup spots.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 bg-farm-800 hover:bg-farm-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Location</span>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-5 shadow-md">
          <h3 className="font-extrabold text-base text-gray-900">Add Destination Location</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Recipient / Business Name
              </label>
              <input
                type="text"
                required
                value={newAddr.name}
                onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                placeholder="e.g. Chief Okon / Delta Farms"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-farm-600 focus:bg-white text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                required
                value={newAddr.phone}
                onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                placeholder="+234 800 000 0000"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-farm-600 focus:bg-white text-gray-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Address / Waterway Jetty / Haulage Park Landmark
              </label>
              <input
                type="text"
                required
                value={newAddr.addressLine}
                onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                placeholder="Specific jetty name, warehouse gate, or motor park bay"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-farm-600 focus:bg-white text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                City / Town
              </label>
              <input
                type="text"
                required
                value={newAddr.city}
                onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                placeholder="e.g. Warri, Asaba, Port Harcourt"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-farm-600 focus:bg-white text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Preferred Logistics Route
              </label>
              <select
                value={newAddr.logisticsPreference}
                onChange={(e) =>
                  setNewAddr({
                    ...newAddr,
                    logisticsPreference: e.target.value as SavedAddress['logisticsPreference'],
                  })
                }
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-farm-600 focus:bg-white text-gray-900 font-semibold"
              >
                <option value="Waterway Boat Freight">Waterway Boat Freight (Burutu / Warri Riverfront)</option>
                <option value="Interstate Road Haulage">Interstate Road Haulage (Truck Transit)</option>
                <option value="Farm-Gate Pickup">Farm-Gate Pickup (Ayakoromo Waterfront)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-farm-800 hover:bg-farm-900 text-white shadow-sm"
            >
              Save Destination
            </button>
          </div>
        </form>
      )}

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4 shadow-sm hover:shadow-md transition relative flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-extrabold text-base text-gray-900">{addr.name}</h3>
                </div>

                {addr.isDefault && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </div>

              <div className="text-xs text-gray-600 space-y-1 mt-3">
                <p className="font-semibold text-gray-900">{addr.addressLine}</p>
                <p>{addr.city}, {addr.state}</p>
                <p className="text-gray-400">Phone: {addr.phone}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-farm-800">
                {addr.logisticsPreference === 'Waterway Boat Freight' ? (
                  <Anchor className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Truck className="w-4 h-4 text-emerald-600" />
                )}
                <span>{addr.logisticsPreference}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => handleDelete(addr.id)}
                className="text-xs text-gray-400 hover:text-red-600 flex items-center gap-1 font-semibold transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


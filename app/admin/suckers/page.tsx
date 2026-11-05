'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sprout,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Thermometer,
  Truck,
  Plus,
} from 'lucide-react';

interface SuckerBatch {
  id: string;
  batchCode: string;
  nurseryBed: string;
  grade: 'Sword Sucker' | 'Maiden Head Corm' | 'Peeper';
  quantityHarvested: number;
  availableStock: number;
  treatmentDate: string;
  protocol: string;
  status: 'Ready for Dispatch' | 'In Bio-Treatment' | 'Reserved';
}

const INITIAL_BATCHES: SuckerBatch[] = [
  {
    id: 'sck-b1',
    batchCode: 'SCK-AYK-2026-B01',
    nurseryBed: 'Nursery Bed 1 (Ayakoromo Central)',
    grade: 'Sword Sucker',
    quantityHarvested: 800,
    availableStock: 300,
    treatmentDate: '2026-11-02',
    protocol: 'Hot-water dip (54°C) + Biological Nematicide',
    status: 'Ready for Dispatch',
  },
  {
    id: 'sck-b2',
    batchCode: 'SCK-AYK-2026-B02',
    nurseryBed: 'Nursery Bed 2 (Riverfront Plot)',
    grade: 'Maiden Head Corm',
    quantityHarvested: 650,
    availableStock: 500,
    treatmentDate: '2026-11-04',
    protocol: 'Biological Trichoderma bio-coating',
    status: 'Ready for Dispatch',
  },
  {
    id: 'sck-b3',
    batchCode: 'SCK-AYK-2026-B03',
    nurseryBed: 'Nursery Bed 3 (Perimeter Block)',
    grade: 'Sword Sucker',
    quantityHarvested: 1000,
    availableStock: 1000,
    treatmentDate: '2026-11-05',
    protocol: 'Thermal sanitization & paring',
    status: 'In Bio-Treatment',
  },
];

export default function DashboardSuckersPage() {
  const [batches, setBatches] = useState<SuckerBatch[]>(INITIAL_BATCHES);

  const totalAvailable = batches.reduce((sum, b) => sum + b.availableStock, 0);
  const totalHarvested = batches.reduce((sum, b) => sum + b.quantityHarvested, 0);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-farm-800 uppercase tracking-wider bg-emerald-100/80 px-2.5 py-1 rounded-md mb-1.5">
            <Sprout className="w-3.5 h-3.5" />
            <span>High-Yield Plantain Propagation Division</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Plantain Sucker Nursery Desk
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Ayakoromo nursery beds, biological sanitization tubs, and commercial field reservations.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
          <div className="text-xs">
            <span className="font-extrabold text-emerald-950 block">Bio-Treatment Guarantee</span>
            <span className="text-emerald-700 font-semibold">95%+ Field Survival Verified</span>
          </div>
        </div>
      </div>

      {/* Top Nursery Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Total Sucker Nursery Capacity
          </span>
          <p className="text-3xl font-black text-farm-900">{totalHarvested.toLocaleString()} units</p>
          <p className="text-xs text-gray-500">Across 3 active propagation beds</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Ready For Immediate Dispatch
          </span>
          <p className="text-3xl font-black text-emerald-700">{totalAvailable.toLocaleString()} units</p>
          <p className="text-xs text-emerald-700 font-bold">Sword suckers & Maiden heads</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Reserved / Staged For Boat Cargo
          </span>
          <p className="text-3xl font-black text-gold-600">
            {(totalHarvested - totalAvailable).toLocaleString()} units
          </p>
          <p className="text-xs text-gray-500">Scheduled for Warri & Port Harcourt off-takers</p>
        </div>
      </div>

      {/* Bio-Treatment Protocols Banner */}
      <div className="bg-gradient-to-r from-farm-900 to-farm-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-md">
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0 border border-farm-700 shadow-md">
          <Image
            src="/images/plantain-sucker-treatment-tub.jpg"
            alt="Bio treatment tub"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-2 flex-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-400 uppercase tracking-wider">
            <Thermometer className="w-3.5 h-3.5" />
            <span>Standard Operating Procedure (SOP)</span>
          </div>
          <h3 className="text-xl font-black text-white">Three-Tier Bio-Sanitization Protocol</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Every sucker harvested from Doutare Agro Farm undergoes (1) Root paring to expose clean corm tissue, (2) Hot water thermal immersion at 54°C to destroy weevil larvae, and (3) Bio-antagonist dip to inoculate against soil-borne nematodes.
          </p>
        </div>
      </div>

      {/* Sucker Batches Manifest Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-black text-gray-900 tracking-tight">Active Sucker Harvest Batches</h2>
            <p className="text-xs text-gray-500">Track treatment timelines, nursery bed origin, and stock reservations</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 uppercase font-bold text-[11px] border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-5">Batch Code</th>
                <th className="py-3.5 px-5">Sucker Grade</th>
                <th className="py-3.5 px-5">Nursery Bed</th>
                <th className="py-3.5 px-5">Harvested</th>
                <th className="py-3.5 px-5">Available</th>
                <th className="py-3.5 px-5">Treatment Protocol</th>
                <th className="py-3.5 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-4 px-5 font-mono font-bold text-gray-900">{batch.batchCode}</td>
                  <td className="py-4 px-5 font-black text-farm-900">{batch.grade}</td>
                  <td className="py-4 px-5 text-gray-600 font-medium">{batch.nurseryBed}</td>
                  <td className="py-4 px-5 font-bold text-gray-800">{batch.quantityHarvested}</td>
                  <td className="py-4 px-5 font-black text-emerald-700 text-sm">{batch.availableStock}</td>
                  <td className="py-4 px-5 text-gray-500 max-w-xs truncate">{batch.protocol}</td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        batch.status === 'Ready for Dispatch'
                          ? 'bg-emerald-100 text-emerald-800'
                          : batch.status === 'In Bio-Treatment'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {batch.status}
                    </span>
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


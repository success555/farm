export interface DashboardOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryMethod: string;
  destination: string;
  itemsSummary: string;
  totalAmount: number;
  status: 'pending_payment' | 'processing' | 'harvesting' | 'ready_for_pickup' | 'in_transit' | 'delivered' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'partial';
  createdAt: string;
}

export const INITIAL_ORDERS: DashboardOrder[] = [
  {
    id: 'ord-01',
    orderNumber: 'DTO-2026-8812',
    customerName: 'Engr. Kenneth Ebi',
    customerPhone: '+234 803 456 7890',
    customerEmail: 'k.ebi@oilserv.com',
    deliveryMethod: 'Boat Cargo (Burutu Waterway)',
    destination: 'Warri Marine Jetty, Delta State',
    itemsSummary: '500x Bio-Treated Sword Suckers, 10x Yellow Garri (50kg)',
    totalAmount: 565000,
    status: 'harvesting',
    paymentStatus: 'paid',
    createdAt: '2026-11-05T09:30:00Z',
  },
  {
    id: 'ord-02',
    orderNumber: 'DTO-2026-8813',
    customerName: 'Madam Tariere Clark',
    customerPhone: '+234 812 345 6789',
    customerEmail: 'tariere.clark@yahoo.com',
    deliveryMethod: 'Interstate Road Haulage',
    destination: 'Mile 12 Market, Lagos',
    itemsSummary: '25x Crispy Yellow Garri (100kg Bags)',
    totalAmount: 2050000,
    status: 'in_transit',
    paymentStatus: 'paid',
    createdAt: '2026-11-04T14:15:00Z',
  },
  {
    id: 'ord-03',
    orderNumber: 'DTO-2026-8814',
    customerName: 'Pastor David Opubo',
    customerPhone: '+234 807 112 2334',
    customerEmail: 'd.opubo@gmail.com',
    deliveryMethod: 'Farm-Gate Pickup',
    destination: 'Ayakoromo Farm Waterfront',
    itemsSummary: '100x Maiden Head Corm Suckers, 2x Smoked Catfish Cartons',
    totalAmount: 191000,
    status: 'ready_for_pickup',
    paymentStatus: 'paid',
    createdAt: '2026-11-05T11:45:00Z',
  },
  {
    id: 'ord-04',
    orderNumber: 'DTO-2026-8815',
    customerName: 'Mrs. Blessing Akpan',
    customerPhone: '+234 805 998 7766',
    customerEmail: 'akpan.blessing@hotmail.com',
    deliveryMethod: 'Interstate Road Haulage',
    destination: 'Asaba Food Depot, Delta State',
    itemsSummary: '20x Crates of Jumbo Farm Eggs, 4x Smoked Catfish (1kg)',
    totalAmount: 122000,
    status: 'pending_payment',
    paymentStatus: 'unpaid',
    createdAt: '2026-11-05T13:20:00Z',
  },
  {
    id: 'ord-05',
    orderNumber: 'DTO-2026-8816',
    customerName: 'Delta State Agribusiness Off-taker',
    customerPhone: '+234 802 334 5566',
    customerEmail: 'procure@deltaagro.gov.ng',
    deliveryMethod: 'Interstate Road Haulage',
    destination: 'Benin-Asaba Expressway Depot',
    itemsSummary: '1,500x Bio-Treated Plantain Suckers',
    totalAmount: 3750000,
    status: 'processing',
    paymentStatus: 'paid',
    createdAt: '2026-11-03T16:00:00Z',
  },
];


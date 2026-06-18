// =============================================
// Tipos do Painel Administrativo — Anacli
// =============================================

// --- Auth ---
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  avatar?: string;
}

// --- Pedidos (estende conceito de Order do usuario/types) ---
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'credit_card' | 'debit_card' | 'pix' | 'boleto' | 'cash';
export type CollectionType = 'home' | 'lab';

export interface AdminOrderItem {
  id: string;
  examName: string;
  category: string;
  price: number;
  quantity: number;
}

export interface AdminOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: AdminOrderItem[];
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  collectionType: CollectionType;
  scheduledDate?: string;
  collectorId?: string;
  collectorName?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Agendamentos / Coletas ---
export type ScheduleStatus =
  | 'scheduled'
  | 'collector_assigned'
  | 'en_route'
  | 'collecting'
  | 'collected'
  | 'in_lab'
  | 'processing'
  | 'ready'
  | 'delivered';

export interface CollectionAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface CollectionSchedule {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  collectorId?: string;
  collectorName?: string;
  date: string;
  timeSlot: string;     // e.g. "07:00 - 07:30"
  collectionType: CollectionType;
  address?: CollectionAddress;
  status: ScheduleStatus;
  examCount: number;
  notes?: string;
  createdAt: string;
}

// --- Profissionais Coletadores ---
export type CollectorStatus = 'available' | 'collecting' | 'unavailable' | 'vacation';

export interface Collector {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  activeRegions: string[];
  maxDailyCollections: number;
  collectionsToday: number;
  status: CollectorStatus;
  rating: number;
  totalCollections: number;
  createdAt: string;
}

// --- Clientes ---
export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

// --- Dashboard KPIs ---
export interface DashboardKPI {
  revenue: number;
  revenueTrend: number;        // % vs período anterior
  totalOrders: number;
  ordersTrend: number;
  avgTicket: number;
  avgTicketTrend: number;
  collectionsToday: number;
  collectionsPending: number;
}

// --- Charts ---
export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface CategoryRevenue {
  category: string;
  revenue: number;
  count: number;
}

export interface TopExam {
  name: string;
  count: number;
  revenue: number;
}

export interface PaymentMethodStat {
  method: string;
  count: number;
  total: number;
}

// --- Notificações Admin ---
export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'schedule' | 'system';
  read: boolean;
  createdAt: string;
}

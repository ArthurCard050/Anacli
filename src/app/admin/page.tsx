'use client';

import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CalendarClock,
  ExternalLink,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  mockKPIs,
  mockRevenueData,
  mockCategoryRevenue,
  mockTopExams,
  mockOrders,
  mockSchedules,
  ORDER_STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
  SCHEDULE_STATUS_LABELS,
  RESULTS_URL,
} from './data/mock-data';
import Link from 'next/link';

/* ─── brand color for charts ─── */
const ACCENT = 'hsl(var(--brand-accent))';
const ACCENT_HEX = '#00bcd4'; // fallback for recharts

// ─── KPI Card ───
function KPICard({ title, value, trend, icon: Icon, prefix = '', suffix = '' }: {
  title: string; value: string; trend: number; icon: React.ElementType; prefix?: string; suffix?: string;
}) {
  const positive = trend >= 0;
  return (
    <div className="bg-card-clean border border-border-clean rounded-card-clean p-5 hover:border-gray-300 transition-colors"
      style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-button-clean bg-brand-accent/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-brand-accent" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
        }`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(trend)}%
        </div>
      </div>
      <p className="text-text-secondary-clean text-sm mb-1">{title}</p>
      <p className="text-text-primary-clean text-2xl font-bold">{prefix}{value}{suffix}</p>
    </div>
  );
}

// ─── Status Badge ───
function StatusBadge({ status, type = 'order' }: { status: string; type?: 'order' | 'schedule' }) {
  const labels = type === 'order' ? ORDER_STATUS_LABELS : SCHEDULE_STATUS_LABELS;
  const colorMap: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-600 border-amber-200',
    confirmed: 'bg-blue-50 text-blue-600 border-blue-200',
    processing: 'bg-orange-50 text-orange-600 border-orange-200',
    completed: 'bg-green-50 text-green-600 border-green-200',
    cancelled: 'bg-gray-100 text-gray-500 border-gray-200',
    scheduled: 'bg-blue-50 text-blue-600 border-blue-200',
    collector_assigned: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    en_route: 'bg-amber-50 text-amber-600 border-amber-200',
    collecting: 'bg-orange-50 text-orange-600 border-orange-200',
    collected: 'bg-green-50 text-green-600 border-green-200',
    in_lab: 'bg-purple-50 text-purple-600 border-purple-200',
    ready: 'bg-green-50 text-green-600 border-green-200',
    delivered: 'bg-gray-100 text-gray-500 border-gray-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colorMap[status] || colorMap.pending}`}>
      {labels[status] || status}
    </span>
  );
}

export default function AdminDashboard() {
  const recentOrders = mockOrders.slice(0, 5);
  const todaySchedules = mockSchedules.filter(
    s => s.date === new Date().toISOString().split('T')[0]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary-clean">Dashboard</h1>
          <p className="text-text-secondary-clean text-sm mt-1">
            Visão geral do seu laboratório · {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <a
          href={RESULTS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-button-clean bg-brand-accent hover:bg-brand-accent/90 text-white text-sm font-medium transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Resultados de Exames
        </a>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Receita (30 dias)"
          value={mockKPIs.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          trend={mockKPIs.revenueTrend}
          icon={DollarSign}
          prefix="R$ "
        />
        <KPICard
          title="Pedidos"
          value={mockKPIs.totalOrders.toString()}
          trend={mockKPIs.ordersTrend}
          icon={ShoppingBag}
        />
        <KPICard
          title="Ticket Médio"
          value={mockKPIs.avgTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          trend={mockKPIs.avgTicketTrend}
          icon={TrendingUp}
          prefix="R$ "
        />
        <KPICard
          title="Coletas Hoje"
          value={`${mockKPIs.collectionsToday}`}
          trend={0}
          icon={MapPin}
          suffix={` / ${mockKPIs.collectionsPending} pendentes`}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Chart */}
        <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <h3 className="text-text-primary-clean font-semibold mb-4">Receita (últimos 30 dias)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={ACCENT_HEX} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={ACCENT_HEX} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="date" tick={{ fill: '#666666', fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: '#666666', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => `R$${v}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', color: '#333333', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}
                  labelStyle={{ color: '#666666' }}
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Receita']}
                />
                <Area type="monotone" dataKey="revenue" stroke={ACCENT_HEX} strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Chart */}
        <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <h3 className="text-text-primary-clean font-semibold mb-4">Vendas por Categoria</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCategoryRevenue} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#666666', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => `R$${v}`} />
                <YAxis dataKey="category" type="category" tick={{ fill: '#333333', fontSize: 12 }} tickLine={false} axisLine={false} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', color: '#333333', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Receita']}
                />
                <Bar dataKey="revenue" fill={ACCENT_HEX} radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Exams */}
        <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-text-primary-clean font-semibold">Exames Mais Vendidos</h3>
            <Link href="/admin/relatorios" className="text-brand-accent text-xs hover:underline font-medium">Ver todos</Link>
          </div>
          <div className="space-y-3">
            {mockTopExams.slice(0, 7).map((exam, i) => (
              <div key={exam.name} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-text-secondary-clean">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary-clean truncate">{exam.name}</p>
                  <p className="text-xs text-text-secondary-clean">{exam.count} vendas</p>
                </div>
                <p className="text-sm font-semibold text-brand-accent">
                  R$ {exam.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-text-primary-clean font-semibold">Pedidos Recentes</h3>
            <Link href="/admin/pedidos" className="text-brand-accent text-xs hover:underline font-medium">Ver todos</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center gap-3 p-3 rounded-button-clean bg-gray-50 hover:bg-gray-100 transition-colors border border-border-clean">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-text-primary-clean">{order.id}</p>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="text-xs text-text-secondary-clean truncate">{order.customerName} · {order.items.length} {order.items.length === 1 ? 'exame' : 'exames'}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-text-primary-clean">R$ {order.total.toFixed(2)}</p>
                  <p className="text-xs text-text-secondary-clean">{PAYMENT_METHOD_LABELS[order.paymentMethod]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-brand-accent" />
            <h3 className="text-text-primary-clean font-semibold">Agenda de Hoje</h3>
            <span className="bg-brand-accent/10 text-brand-accent text-xs font-semibold px-2 py-0.5 rounded-full">
              {todaySchedules.length} coletas
            </span>
          </div>
          <Link href="/admin/agendamentos" className="text-brand-accent text-xs hover:underline font-medium">Ver agenda completa</Link>
        </div>
        {todaySchedules.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {todaySchedules.map(s => (
              <div key={s.id} className="p-4 rounded-card-clean bg-gray-50 border border-border-clean hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-text-secondary-clean" />
                    <span className="text-text-primary-clean font-medium text-sm">{s.timeSlot}</span>
                  </div>
                  <StatusBadge status={s.status} type="schedule" />
                </div>
                <p className="text-sm text-text-primary-clean mb-1">{s.customerName}</p>
                <p className="text-xs text-text-secondary-clean">
                  {s.collectionType === 'home' ? `🏠 ${s.address?.neighborhood}` : '🏥 No laboratório'}
                  {' · '}{s.examCount} exame{s.examCount > 1 ? 's' : ''}
                </p>
                {s.collectorName && (
                  <p className="text-xs text-brand-accent/70 mt-1">👩‍⚕️ {s.collectorName}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CalendarClock className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-text-secondary-clean text-sm">Nenhuma coleta agendada para hoje</p>
          </div>
        )}
      </div>
    </div>
  );
}

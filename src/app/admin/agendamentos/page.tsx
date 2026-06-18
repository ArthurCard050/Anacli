'use client';

import { useState, useMemo } from 'react';
import { CalendarClock, Clock, MapPin, User, Phone, Search } from 'lucide-react';
import { mockSchedules, SCHEDULE_STATUS_LABELS, mockCollectors } from '../data/mock-data';

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    scheduled: 'bg-blue-50 text-blue-600 border-blue-200',
    collector_assigned: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    en_route: 'bg-amber-50 text-amber-600 border-amber-200',
    collecting: 'bg-orange-50 text-orange-600 border-orange-200',
    collected: 'bg-green-50 text-green-600 border-green-200',
    in_lab: 'bg-purple-50 text-purple-600 border-purple-200',
    processing: 'bg-violet-50 text-violet-600 border-violet-200',
    ready: 'bg-green-50 text-green-600 border-green-200',
    delivered: 'bg-gray-100 text-gray-500 border-gray-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colorMap[status] || 'bg-gray-100 text-gray-500 border-gray-200'}`}>
      {SCHEDULE_STATUS_LABELS[status] || status}
    </span>
  );
}

export default function AgendamentosPage() {
  const today = new Date().toISOString().split('T')[0];
  const [dateFilter, setDateFilter] = useState(today);
  const [typeFilter, setTypeFilter] = useState<'all' | 'home' | 'lab'>('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = mockSchedules;
    if (dateFilter) list = list.filter(s => s.date === dateFilter);
    if (typeFilter !== 'all') list = list.filter(s => s.collectionType === typeFilter);
    if (statusFilter !== 'all') list = list.filter(s => s.status === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => s.customerName.toLowerCase().includes(q) || s.collectorName?.toLowerCase().includes(q));
    }
    return list.sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
  }, [dateFilter, typeFilter, statusFilter, search]);

  const homeCount = filtered.filter(s => s.collectionType === 'home').length;
  const labCount = filtered.filter(s => s.collectionType === 'lab').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary-clean">Agendamentos & Coletas</h1>
        <p className="text-text-secondary-clean text-sm mt-1">{mockSchedules.length} agendamentos no total</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Filtradas', value: filtered.length, color: 'text-text-primary-clean' },
          { label: '🏠 Domiciliares', value: homeCount, color: 'text-cyan-600' },
          { label: '🏥 Laboratório', value: labCount, color: 'text-brand-accent' },
          { label: 'Profissionais em Campo', value: mockCollectors.filter(c => c.status === 'collecting').length, color: 'text-amber-600' },
        ].map(s => (
          <div key={s.label} className="bg-card-clean border border-border-clean rounded-card-clean p-4" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
            <p className="text-text-secondary-clean text-xs mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-card-clean border border-border-clean rounded-card-clean p-4" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
            className="px-3 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent" />
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as 'all' | 'home' | 'lab')}
            className="px-3 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20">
            <option value="all">Todos os tipos</option>
            <option value="home">🏠 Domiciliar</option>
            <option value="lab">🏥 Laboratório</option>
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20">
            <option value="all">Todos os status</option>
            {Object.entries(SCHEDULE_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary-clean" />
            <input type="search" placeholder="Buscar cliente ou profissional..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean placeholder:text-text-secondary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent" />
          </div>
        </div>
      </div>

      {/* Schedule cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(s => (
            <div key={s.id} className="bg-card-clean border border-border-clean rounded-card-clean p-5 hover:border-gray-300 transition-colors" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-accent" />
                  <span className="text-text-primary-clean font-semibold text-sm">{s.timeSlot}</span>
                </div>
                <StatusBadge status={s.status} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-text-secondary-clean" />
                <span className="text-text-primary-clean text-sm">{s.customerName}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-4 h-4 text-text-secondary-clean" />
                <span className="text-text-secondary-clean text-xs">{s.customerPhone}</span>
              </div>
              <div className="flex items-start gap-2 mb-3 p-3 rounded-button-clean bg-gray-50 border border-border-clean">
                <MapPin className="w-4 h-4 text-text-secondary-clean mt-0.5 flex-shrink-0" />
                {s.collectionType === 'home' && s.address ? (
                  <div>
                    <p className="text-xs text-text-primary-clean">🏠 Coleta domiciliar</p>
                    <p className="text-xs text-text-secondary-clean mt-0.5">{s.address.street}, {s.address.number}{s.address.complement ? ` - ${s.address.complement}` : ''}, {s.address.neighborhood}</p>
                    <p className="text-xs text-text-secondary-clean">{s.address.city} - {s.address.state}</p>
                  </div>
                ) : <p className="text-xs text-text-primary-clean">🏥 No laboratório</p>}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary-clean">{s.examCount} exame{s.examCount > 1 ? 's' : ''}</span>
                {s.collectorName
                  ? <span className="text-brand-accent/80">👩‍⚕️ {s.collectorName}</span>
                  : <span className="text-amber-600">⚠️ Sem profissional</span>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card-clean border border-border-clean rounded-card-clean p-12 text-center" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <CalendarClock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-text-secondary-clean text-sm">Nenhum agendamento encontrado para os filtros selecionados</p>
        </div>
      )}
    </div>
  );
}

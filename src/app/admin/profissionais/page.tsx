'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Star, Calendar, TrendingUp } from 'lucide-react';
import { mockCollectors } from '../data/mock-data';
import type { CollectorStatus } from '../types';

function StatusIndicator({ status }: { status: CollectorStatus }) {
  const config: Record<CollectorStatus, { label: string; color: string; dot: string }> = {
    available: { label: 'Disponível', color: 'text-green-600', dot: 'bg-green-500' },
    collecting: { label: 'Em coleta', color: 'text-amber-600', dot: 'bg-amber-500' },
    unavailable: { label: 'Indisponível', color: 'text-red-500', dot: 'bg-red-500' },
    vacation: { label: 'Férias', color: 'text-blue-600', dot: 'bg-blue-500' },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${c.color}`}>
      <span className={`w-2 h-2 rounded-full ${c.dot} animate-pulse`} />
      {c.label}
    </span>
  );
}

export default function ProfissionaisPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | CollectorStatus>('all');
  const filtered = statusFilter === 'all' ? mockCollectors : mockCollectors.filter(c => c.status === statusFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary-clean">Profissionais Coletadores</h1>
        <p className="text-text-secondary-clean text-sm mt-1">{mockCollectors.length} profissionais cadastrados</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {([
          { key: 'all' as const, label: 'Total', value: mockCollectors.length, color: 'text-text-primary-clean' },
          { key: 'available' as const, label: 'Disponíveis', value: mockCollectors.filter(c => c.status === 'available').length, color: 'text-green-600' },
          { key: 'collecting' as const, label: 'Em Coleta', value: mockCollectors.filter(c => c.status === 'collecting').length, color: 'text-amber-600' },
          { key: 'unavailable' as const, label: 'Indisponíveis', value: mockCollectors.filter(c => c.status === 'unavailable' || c.status === 'vacation').length, color: 'text-red-500' },
        ]).map(s => (
          <button key={s.key} onClick={() => setStatusFilter(s.key)}
            className={`bg-card-clean border rounded-card-clean p-4 text-left transition-colors ${statusFilter === s.key ? 'border-brand-accent' : 'border-border-clean hover:border-gray-300'}`}
            style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
            <p className="text-text-secondary-clean text-xs mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(col => (
          <div key={col.id} className="bg-card-clean border border-border-clean rounded-card-clean p-5 hover:border-gray-300 transition-colors" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent font-bold text-lg flex-shrink-0">
                {col.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-text-primary-clean font-semibold text-sm truncate">{col.name}</h3>
                <StatusIndicator status={col.status} />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-text-secondary-clean"><Phone className="w-3.5 h-3.5" /><span>{col.phone}</span></div>
              <div className="flex items-center gap-2 text-xs text-text-secondary-clean"><Mail className="w-3.5 h-3.5" /><span className="truncate">{col.email}</span></div>
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-1.5 mb-2"><MapPin className="w-3.5 h-3.5 text-text-secondary-clean" /><span className="text-xs text-text-secondary-clean">Regiões de atendimento</span></div>
              <div className="flex flex-wrap gap-1.5">
                {col.activeRegions.map(r => (
                  <span key={r} className="px-2 py-0.5 rounded-full bg-gray-100 text-text-secondary-clean text-xs border border-border-clean">{r}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 p-3 rounded-button-clean bg-gray-50 border border-border-clean">
              <div className="text-center"><Calendar className="w-3 h-3 text-text-secondary-clean mx-auto mb-0.5" /><p className="text-text-primary-clean font-semibold text-sm">{col.collectionsToday}/{col.maxDailyCollections}</p><p className="text-text-secondary-clean text-[10px]">Hoje</p></div>
              <div className="text-center"><TrendingUp className="w-3 h-3 text-text-secondary-clean mx-auto mb-0.5" /><p className="text-text-primary-clean font-semibold text-sm">{col.totalCollections}</p><p className="text-text-secondary-clean text-[10px]">Total</p></div>
              <div className="text-center"><Star className="w-3 h-3 text-amber-500 mx-auto mb-0.5" /><p className="text-text-primary-clean font-semibold text-sm">{col.rating}</p><p className="text-text-secondary-clean text-[10px]">Avaliação</p></div>
            </div>
            <div className="mt-4 flex gap-2">
              <a href={`https://api.whatsapp.com/send?phone=55${col.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="flex-1 py-2 rounded-button-clean bg-green-50 text-green-600 text-xs font-medium text-center hover:bg-green-100 transition-colors border border-green-200">WhatsApp</a>
              <button className="flex-1 py-2 rounded-button-clean bg-gray-50 text-text-secondary-clean text-xs font-medium text-center hover:bg-gray-100 transition-colors border border-border-clean">Ver Agenda</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

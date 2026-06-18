'use client';

import { useState, useMemo } from 'react';
import { Search, Mail, Phone, ShoppingBag, DollarSign, Calendar, User, X } from 'lucide-react';
import { mockCustomers, mockOrders } from '../data/mock-data';
import type { AdminCustomer } from '../types';

export default function ClientesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);

  const filtered = useMemo(() => {
    let list = mockCustomers;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q) || c.cpf?.includes(q));
    }
    if (statusFilter !== 'all') list = list.filter(c => c.status === statusFilter);
    return list.sort((a, b) => b.totalSpent - a.totalSpent);
  }, [search, statusFilter]);

  const customerOrders = useMemo(() => {
    if (!selectedCustomer) return [];
    return mockOrders.filter(o => o.customerId === selectedCustomer.id);
  }, [selectedCustomer]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary-clean">Gestão de Clientes</h1>
        <p className="text-text-secondary-clean text-sm mt-1">{mockCustomers.length} clientes cadastrados</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Clientes', value: mockCustomers.length.toString(), color: 'text-text-primary-clean' },
          { label: 'Receita Total', value: `R$ ${mockCustomers.reduce((s, c) => s + c.totalSpent, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, color: 'text-brand-accent' },
          { label: 'Pedidos Totais', value: mockCustomers.reduce((s, c) => s + c.totalOrders, 0).toString(), color: 'text-text-primary-clean' },
          { label: 'Ticket Médio', value: `R$ ${(mockCustomers.reduce((s, c) => s + c.totalSpent, 0) / Math.max(1, mockCustomers.reduce((s, c) => s + c.totalOrders, 0))).toFixed(2)}`, color: 'text-cyan-600' },
        ].map(s => (
          <div key={s.label} className="bg-card-clean border border-border-clean rounded-card-clean p-4" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
            <p className="text-text-secondary-clean text-xs mb-1">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card-clean border border-border-clean rounded-card-clean p-4 flex flex-col sm:flex-row gap-3" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary-clean" />
          <input type="search" placeholder="Buscar por nome, e-mail, telefone ou CPF..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean placeholder:text-text-secondary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent" />
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-button-clean text-xs font-medium transition-colors ${statusFilter === s ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/30' : 'bg-gray-50 text-text-secondary-clean border border-border-clean hover:text-text-primary-clean'}`}>
              {s === 'all' ? 'Todos' : s === 'active' ? 'Ativos' : 'Inativos'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card-clean border border-border-clean rounded-card-clean overflow-hidden" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-clean bg-gray-50">
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3">Cliente</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3 hidden md:table-cell">Contato</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3">Pedidos</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3">Total Gasto</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Último Pedido</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Status</th>
                <th className="text-right text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-clean">
              {filtered.map(cust => (
                <tr key={cust.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent text-xs font-bold flex-shrink-0">{cust.name.charAt(0)}</div>
                      <div><p className="text-sm font-medium text-text-primary-clean">{cust.name}</p>{cust.cpf && <p className="text-xs text-text-secondary-clean">{cust.cpf}</p>}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell"><p className="text-xs text-text-secondary-clean">{cust.email}</p><p className="text-xs text-text-secondary-clean">{cust.phone}</p></td>
                  <td className="px-4 py-3"><p className="text-sm font-semibold text-text-primary-clean">{cust.totalOrders}</p></td>
                  <td className="px-4 py-3"><p className="text-sm font-semibold text-brand-accent">R$ {cust.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p></td>
                  <td className="px-4 py-3 hidden lg:table-cell"><p className="text-xs text-text-secondary-clean">{cust.lastOrderDate ? new Date(cust.lastOrderDate).toLocaleDateString('pt-BR') : '—'}</p></td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${cust.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cust.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />{cust.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right"><button onClick={() => setSelectedCustomer(cust)} className="p-2 rounded-button-clean hover:bg-gray-100 text-text-secondary-clean hover:text-text-primary-clean"><User className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelectedCustomer(null)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-card-clean border-l border-border-clean z-50 overflow-y-auto" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-primary-clean">Perfil do Cliente</h2>
                <button onClick={() => setSelectedCustomer(null)} className="p-2 rounded-button-clean hover:bg-gray-100 text-text-secondary-clean"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent text-2xl font-bold">{selectedCustomer.name.charAt(0)}</div>
                <div><h3 className="text-text-primary-clean text-lg font-semibold">{selectedCustomer.name}</h3><p className="text-text-secondary-clean text-sm">{selectedCustomer.email}</p><p className="text-text-secondary-clean text-xs mt-0.5">Cliente desde {new Date(selectedCustomer.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</p></div>
              </div>
              <div className="bg-gray-50 border border-border-clean rounded-card-clean p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-text-secondary-clean" /><span className="text-text-primary-clean">{selectedCustomer.phone}</span></div>
                <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-text-secondary-clean" /><span className="text-text-primary-clean">{selectedCustomer.email}</span></div>
                {selectedCustomer.cpf && <div className="flex items-center gap-2 text-sm"><User className="w-4 h-4 text-text-secondary-clean" /><span className="text-text-primary-clean">CPF: {selectedCustomer.cpf}</span></div>}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 border border-border-clean rounded-card-clean p-3 text-center"><ShoppingBag className="w-4 h-4 text-text-secondary-clean mx-auto mb-1" /><p className="text-text-primary-clean font-bold text-lg">{selectedCustomer.totalOrders}</p><p className="text-text-secondary-clean text-xs">Pedidos</p></div>
                <div className="bg-gray-50 border border-border-clean rounded-card-clean p-3 text-center"><DollarSign className="w-4 h-4 text-brand-accent mx-auto mb-1" /><p className="text-brand-accent font-bold text-lg">R$ {selectedCustomer.totalSpent.toFixed(0)}</p><p className="text-text-secondary-clean text-xs">Total</p></div>
                <div className="bg-gray-50 border border-border-clean rounded-card-clean p-3 text-center"><Calendar className="w-4 h-4 text-text-secondary-clean mx-auto mb-1" /><p className="text-text-primary-clean font-bold text-sm">{selectedCustomer.lastOrderDate ? new Date(selectedCustomer.lastOrderDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : '—'}</p><p className="text-text-secondary-clean text-xs">Último</p></div>
              </div>
              <div>
                <h4 className="text-text-primary-clean font-semibold text-sm mb-3">Histórico de Pedidos</h4>
                {customerOrders.length > 0 ? (
                  <div className="space-y-2">
                    {customerOrders.map(o => (
                      <div key={o.id} className="flex items-center justify-between p-3 rounded-button-clean bg-gray-50 border border-border-clean">
                        <div><p className="text-sm text-text-primary-clean font-medium">{o.id}</p><p className="text-xs text-text-secondary-clean">{o.items.length} exames · {new Date(o.createdAt).toLocaleDateString('pt-BR')}</p></div>
                        <p className="text-sm font-semibold text-brand-accent">R$ {o.total.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-text-secondary-clean text-sm">Nenhum pedido encontrado</p>}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

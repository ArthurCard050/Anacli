'use client';

import { useState, useMemo } from 'react';
import {
  Search, Eye, Package, X, CreditCard, User, MapPin, Clock, FileText,
} from 'lucide-react';
import { mockOrders, ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS } from '../data/mock-data';
import type { AdminOrder } from '../types';

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-600 border-amber-200',
    confirmed: 'bg-blue-50 text-blue-600 border-blue-200',
    processing: 'bg-orange-50 text-orange-600 border-orange-200',
    completed: 'bg-green-50 text-green-600 border-green-200',
    cancelled: 'bg-gray-100 text-gray-500 border-gray-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colorMap[status] || colorMap.pending}`}>
      {ORDER_STATUS_LABELS[status] || status}
    </span>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const color = status === 'paid' ? 'text-green-600' : status === 'pending' ? 'text-amber-600' : status === 'refunded' ? 'text-blue-600' : 'text-red-500';
  const labels: Record<string, string> = { pending: 'Pendente', paid: 'Pago', failed: 'Falhou', refunded: 'Reembolsado' };
  return <span className={`text-xs font-medium ${color}`}>{labels[status] || status}</span>;
}

export default function PedidosPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const perPage = 10;

  const filtered = useMemo(() => {
    let list = mockOrders;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') list = list.filter(o => o.status === statusFilter);
    if (paymentFilter !== 'all') list = list.filter(o => o.paymentStatus === paymentFilter);
    return list;
  }, [search, statusFilter, paymentFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const statusCounts = {
    all: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    confirmed: mockOrders.filter(o => o.status === 'confirmed').length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    completed: mockOrders.filter(o => o.status === 'completed').length,
    cancelled: mockOrders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary-clean">Gestão de Pedidos</h1>
        <p className="text-text-secondary-clean text-sm mt-1">{mockOrders.length} pedidos no total</p>
      </div>

      {/* Filters */}
      <div className="bg-card-clean border border-border-clean rounded-card-clean p-4 space-y-4" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
        <div className="flex flex-wrap gap-2">
          {Object.entries(statusCounts).map(([key, count]) => (
            <button key={key} onClick={() => { setStatusFilter(key); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-button-clean text-xs font-medium transition-colors ${
                statusFilter === key
                  ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/30'
                  : 'bg-gray-50 text-text-secondary-clean border border-border-clean hover:text-text-primary-clean'
              }`}>
              {key === 'all' ? 'Todos' : ORDER_STATUS_LABELS[key]} ({count})
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary-clean" />
            <input type="search" placeholder="Buscar por ID, nome ou e-mail..." value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean placeholder:text-text-secondary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent" />
          </div>
          <select value={paymentFilter} onChange={e => { setPaymentFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20">
            <option value="all">Todos pagamentos</option>
            <option value="pending">Pgto Pendente</option>
            <option value="paid">Pgto Confirmado</option>
            <option value="failed">Pgto Falhou</option>
            <option value="refunded">Reembolsado</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card-clean border border-border-clean rounded-card-clean overflow-hidden" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-clean bg-gray-50">
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3">Pedido</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3">Cliente</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3 hidden md:table-cell">Itens</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3">Total</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Pagamento</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Data</th>
                <th className="text-right text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-clean">
              {paginated.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-text-primary-clean">{order.id}</p>
                    <p className="text-xs text-text-secondary-clean">{order.collectionType === 'home' ? '🏠 Domiciliar' : '🏥 Laboratório'}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-text-primary-clean truncate max-w-[150px]">{order.customerName}</p>
                    <p className="text-xs text-text-secondary-clean truncate max-w-[150px]">{order.customerPhone}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-sm text-text-secondary-clean">{order.items.length} exame{order.items.length > 1 ? 's' : ''}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-text-primary-clean">R$ {order.total.toFixed(2)}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="text-xs text-text-secondary-clean">{PAYMENT_METHOD_LABELS[order.paymentMethod]}</p>
                    <PaymentBadge status={order.paymentStatus} />
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <p className="text-xs text-text-secondary-clean">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setSelectedOrder(order)} className="p-2 rounded-button-clean hover:bg-gray-100 text-text-secondary-clean hover:text-text-primary-clean transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border-clean bg-gray-50">
            <p className="text-xs text-text-secondary-clean">Mostrando {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} de {filtered.length}</p>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-button-clean text-xs font-medium transition-colors ${
                    currentPage === i + 1 ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/30' : 'text-text-secondary-clean hover:bg-gray-100'
                  }`}>{i + 1}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Sheet */}
      {selectedOrder && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelectedOrder(null)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-card-clean border-l border-border-clean z-50 overflow-y-auto" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-text-primary-clean">{selectedOrder.id}</h2>
                  <p className="text-sm text-text-secondary-clean mt-0.5">{new Date(selectedOrder.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-button-clean hover:bg-gray-100 text-text-secondary-clean hover:text-text-primary-clean"><X className="w-5 h-5" /></button>
              </div>
              <StatusBadge status={selectedOrder.status} />

              {/* Customer */}
              <div className="bg-gray-50 border border-border-clean rounded-card-clean p-4 space-y-2">
                <div className="flex items-center gap-2 text-brand-accent mb-2"><User className="w-4 h-4" /><h3 className="text-sm font-semibold">Cliente</h3></div>
                <p className="text-text-primary-clean text-sm">{selectedOrder.customerName}</p>
                <p className="text-text-secondary-clean text-xs">{selectedOrder.customerEmail}</p>
                <p className="text-text-secondary-clean text-xs">{selectedOrder.customerPhone}</p>
              </div>

              {/* Items */}
              <div className="bg-gray-50 border border-border-clean rounded-card-clean p-4">
                <div className="flex items-center gap-2 text-brand-accent mb-3"><Package className="w-4 h-4" /><h3 className="text-sm font-semibold">Exames ({selectedOrder.items.length})</h3></div>
                <div className="space-y-2">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-border-clean last:border-0">
                      <div><p className="text-sm text-text-primary-clean">{item.examName}</p><p className="text-xs text-text-secondary-clean">{item.category} · Qtd: {item.quantity}</p></div>
                      <p className="text-sm font-medium text-text-primary-clean">R$ {item.price.toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-300">
                    <p className="text-sm font-semibold text-text-primary-clean">Total</p>
                    <p className="text-lg font-bold text-brand-accent">R$ {selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-gray-50 border border-border-clean rounded-card-clean p-4 space-y-2">
                <div className="flex items-center gap-2 text-brand-accent mb-2"><CreditCard className="w-4 h-4" /><h3 className="text-sm font-semibold">Pagamento</h3></div>
                <div className="flex justify-between text-sm"><span className="text-text-secondary-clean">Método</span><span className="text-text-primary-clean">{PAYMENT_METHOD_LABELS[selectedOrder.paymentMethod]}</span></div>
                <div className="flex justify-between text-sm"><span className="text-text-secondary-clean">Status</span><PaymentBadge status={selectedOrder.paymentStatus} /></div>
              </div>

              {/* Collection */}
              <div className="bg-gray-50 border border-border-clean rounded-card-clean p-4 space-y-2">
                <div className="flex items-center gap-2 text-brand-accent mb-2"><MapPin className="w-4 h-4" /><h3 className="text-sm font-semibold">Coleta</h3></div>
                <div className="flex justify-between text-sm"><span className="text-text-secondary-clean">Tipo</span><span className="text-text-primary-clean">{selectedOrder.collectionType === 'home' ? '🏠 Domiciliar' : '🏥 No laboratório'}</span></div>
                {selectedOrder.scheduledDate && <div className="flex justify-between text-sm"><span className="text-text-secondary-clean">Agendada</span><span className="text-text-primary-clean">{new Date(selectedOrder.scheduledDate).toLocaleDateString('pt-BR')}</span></div>}
                {selectedOrder.collectorName && <div className="flex justify-between text-sm"><span className="text-text-secondary-clean">Profissional</span><span className="text-text-primary-clean">{selectedOrder.collectorName}</span></div>}
              </div>

              {selectedOrder.notes && (
                <div className="bg-gray-50 border border-border-clean rounded-card-clean p-4">
                  <div className="flex items-center gap-2 text-brand-accent mb-2"><FileText className="w-4 h-4" /><h3 className="text-sm font-semibold">Observações</h3></div>
                  <p className="text-sm text-text-secondary-clean">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Timeline */}
              <div className="bg-gray-50 border border-border-clean rounded-card-clean p-4">
                <div className="flex items-center gap-2 text-brand-accent mb-3"><Clock className="w-4 h-4" /><h3 className="text-sm font-semibold">Histórico</h3></div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-brand-accent mt-1.5 flex-shrink-0" /><div><p className="text-sm text-text-primary-clean">Pedido realizado</p><p className="text-xs text-text-secondary-clean">{new Date(selectedOrder.createdAt).toLocaleString('pt-BR')}</p></div></div>
                  {selectedOrder.paymentStatus === 'paid' && <div className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" /><div><p className="text-sm text-text-primary-clean">Pagamento confirmado</p><p className="text-xs text-text-secondary-clean">{new Date(selectedOrder.updatedAt).toLocaleString('pt-BR')}</p></div></div>}
                  {selectedOrder.status === 'completed' && <div className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" /><div><p className="text-sm text-text-primary-clean">Pedido concluído</p><p className="text-xs text-text-secondary-clean">{new Date(selectedOrder.updatedAt).toLocaleString('pt-BR')}</p></div></div>}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

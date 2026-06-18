'use client';

import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Download } from 'lucide-react';
import {
  mockRevenueData, mockCategoryRevenue, mockTopExams, mockPaymentMethodStats, mockOrders, mockSchedules,
} from '../data/mock-data';

const TABS = ['Financeiro', 'Operacional', 'Comercial'];
const PIE_COLORS = ['#00bcd4', '#06b6d4', '#f59e0b', '#8b5cf6'];
const ACCENT_HEX = '#00bcd4';

export default function RelatoriosPage() {
  const [activeTab, setActiveTab] = useState(0);
  const collectionsByType = [
    { name: 'Domiciliar', value: mockSchedules.filter(s => s.collectionType === 'home').length },
    { name: 'Laboratório', value: mockSchedules.filter(s => s.collectionType === 'lab').length },
  ];
  const ordersByMonth = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(); d.setMonth(d.getMonth() - (5 - i));
    const month = d.toLocaleDateString('pt-BR', { month: 'short' });
    const count = 6 + Math.floor(Math.random() * 12);
    return { month, pedidos: count, novosClientes: Math.floor(count * 0.3) };
  });
  const handleExportCSV = () => {
    const headers = 'ID,Cliente,Total,Status,Pagamento,Data\n';
    const rows = mockOrders.map(o => `${o.id},${o.customerName},${o.total},${o.status},${o.paymentMethod},${new Date(o.createdAt).toLocaleDateString('pt-BR')}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob);
    link.download = `anacli-pedidos-${new Date().toISOString().split('T')[0]}.csv`; link.click();
  };

  const tooltipStyle = { backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', color: '#333333', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary-clean">Relatórios & Análises</h1>
          <p className="text-text-secondary-clean text-sm mt-1">Dados consolidados do seu laboratório</p>
        </div>
        <button onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm font-medium hover:bg-gray-100 transition-colors">
          <Download className="w-4 h-4" /> Exportar CSV
        </button>
      </div>

      <div className="flex gap-1 bg-card-clean border border-border-clean rounded-card-clean p-1" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
        {TABS.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            className={`flex-1 py-2.5 rounded-button-clean text-sm font-medium transition-colors ${activeTab === i ? 'bg-brand-accent/10 text-brand-accent' : 'text-text-secondary-clean hover:text-text-primary-clean'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
              <h3 className="text-text-primary-clean font-semibold mb-4">Receita Diária (30 dias)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockRevenueData}>
                    <defs><linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={ACCENT_HEX} stopOpacity={0.2} /><stop offset="95%" stopColor={ACCENT_HEX} stopOpacity={0} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis dataKey="date" tick={{ fill: '#666666', fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: '#666666', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `R$${v}`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`R$ ${v.toFixed(2)}`, 'Receita']} />
                    <Area type="monotone" dataKey="revenue" stroke={ACCENT_HEX} strokeWidth={2} fill="url(#revGrad2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
              <h3 className="text-text-primary-clean font-semibold mb-4">Receita por Método de Pagamento</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={mockPaymentMethodStats as any[]} dataKey="total" nameKey="method" cx="50%" cy="50%" outerRadius={90} label={((props: any) => `${props.method} ${(props.percent * 100).toFixed(0)}%`) as any}>
                      {mockPaymentMethodStats.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`R$ ${v.toFixed(2)}`]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
            <h3 className="text-text-primary-clean font-semibold mb-4">Receita por Categoria de Exame</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockCategoryRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis dataKey="category" tick={{ fill: '#333333', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#666666', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `R$${v}`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`R$ ${v.toFixed(2)}`]} />
                  <Bar dataKey="revenue" fill={ACCENT_HEX} radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
            <h3 className="text-text-primary-clean font-semibold mb-4">Coletas: Domiciliar vs Laboratório</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={collectionsByType as any[]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={((props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`) as any}>
                    <Cell fill="#06b6d4" /><Cell fill="#00bcd4" />
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
            <h3 className="text-text-primary-clean font-semibold mb-4">Pedidos por Mês</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis dataKey="month" tick={{ fill: '#333333', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#666666', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="pedidos" name="Pedidos" fill={ACCENT_HEX} radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="novosClientes" name="Novos Clientes" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={30} />
                  <Legend wrapperStyle={{ color: '#666666', fontSize: 12 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="bg-card-clean border border-border-clean rounded-card-clean p-5" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
          <h3 className="text-text-primary-clean font-semibold mb-4">Top 10 Exames Mais Vendidos</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border-clean">
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase px-3 py-2">#</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase px-3 py-2">Exame</th>
                <th className="text-right text-xs font-medium text-text-secondary-clean uppercase px-3 py-2">Vendas</th>
                <th className="text-right text-xs font-medium text-text-secondary-clean uppercase px-3 py-2">Receita</th>
                <th className="text-right text-xs font-medium text-text-secondary-clean uppercase px-3 py-2">% Total</th>
              </tr></thead>
              <tbody className="divide-y divide-border-clean">
                {mockTopExams.map((exam, i) => {
                  const totalRev = mockTopExams.reduce((s, e) => s + e.revenue, 0);
                  return (
                    <tr key={exam.name} className="hover:bg-gray-50">
                      <td className="px-3 py-2.5"><span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-text-secondary-clean">{i + 1}</span></td>
                      <td className="px-3 py-2.5 text-sm text-text-primary-clean">{exam.name}</td>
                      <td className="px-3 py-2.5 text-sm text-text-secondary-clean text-right">{exam.count}</td>
                      <td className="px-3 py-2.5 text-sm text-brand-accent font-semibold text-right">R$ {exam.revenue.toFixed(2)}</td>
                      <td className="px-3 py-2.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden"><div className="h-full bg-brand-accent rounded-full" style={{ width: `${(exam.revenue / totalRev * 100)}%` }} /></div>
                          <span className="text-xs text-text-secondary-clean">{(exam.revenue / totalRev * 100).toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

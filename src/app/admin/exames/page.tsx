'use client';

import { useState, useMemo } from 'react';
import {
  Search, Plus, Pencil, Trash2, X, TestTube, Star, TrendingUp, Tag, Clock, ChevronDown,
} from 'lucide-react';
import { mockExams as initialExams, examCategories } from '../../loja/data/mock-products';
import type { Exam, ExamCategory } from '../../loja/types';

const CATEGORY_LABELS: Record<string, string> = {
  'check-up': 'Check-up',
  hormonal: 'Hormonal',
  vitaminas: 'Vitaminas',
  cardiaco: 'Cardíaco',
  hepatico: 'Hepático',
  renal: 'Renal',
  tireoide: 'Tireoide',
  diabetes: 'Diabetes',
  alergias: 'Alergias',
  dst: 'DST',
  outros: 'Outros',
};

const ALL_CATEGORIES: ExamCategory[] = [
  'check-up', 'hormonal', 'vitaminas', 'cardiaco', 'hepatico', 'renal', 'tireoide', 'diabetes', 'alergias', 'dst', 'outros',
];

const EMPTY_EXAM: Omit<Exam, 'id'> = {
  name: '',
  slug: '',
  description: '',
  shortDescription: '',
  price: 0,
  originalPrice: undefined,
  category: 'check-up',
  deliveryTime: '24h',
  featured: false,
  popular: false,
  preparationInfo: [],
  tags: [],
};

export default function ExamesAdminPage() {
  const [exams, setExams] = useState<Exam[]>([...initialExams]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState<Omit<Exam, 'id'>>(EMPTY_EXAM);
  const [prepInput, setPrepInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const filtered = useMemo(() => {
    let list = exams;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(e => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.tags?.some(t => t.toLowerCase().includes(q)));
    }
    if (categoryFilter !== 'all') list = list.filter(e => e.category === categoryFilter);
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [exams, search, categoryFilter]);

  const stats = {
    total: exams.length,
    featured: exams.filter(e => e.featured).length,
    popular: exams.filter(e => e.popular).length,
    avgPrice: exams.length ? (exams.reduce((s, e) => s + e.price, 0) / exams.length) : 0,
  };

  // Handlers
  const openCreate = () => {
    setEditingExam(null);
    setForm({ ...EMPTY_EXAM });
    setPrepInput('');
    setTagInput('');
    setShowModal(true);
  };

  const openEdit = (exam: Exam) => {
    setEditingExam(exam);
    setForm({
      name: exam.name,
      slug: exam.slug,
      description: exam.description,
      shortDescription: exam.shortDescription || '',
      price: exam.price,
      originalPrice: exam.originalPrice,
      category: exam.category,
      deliveryTime: exam.deliveryTime,
      featured: exam.featured || false,
      popular: exam.popular || false,
      preparationInfo: exam.preparationInfo || [],
      tags: exam.tags || [],
    });
    setPrepInput('');
    setTagInput('');
    setShowModal(true);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (name: string) => {
    setForm(f => ({
      ...f,
      name,
      slug: editingExam ? f.slug : generateSlug(name),
    }));
  };

  const addPrep = () => {
    if (prepInput.trim()) {
      setForm(f => ({ ...f, preparationInfo: [...(f.preparationInfo || []), prepInput.trim()] }));
      setPrepInput('');
    }
  };

  const removePrep = (i: number) => {
    setForm(f => ({ ...f, preparationInfo: (f.preparationInfo || []).filter((_, idx) => idx !== i) }));
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setForm(f => ({ ...f, tags: [...(f.tags || []), tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (i: number) => {
    setForm(f => ({ ...f, tags: (f.tags || []).filter((_, idx) => idx !== i) }));
  };

  const handleSave = () => {
    if (!form.name || !form.slug || form.price <= 0) return;

    if (editingExam) {
      setExams(prev => prev.map(e => e.id === editingExam.id ? { ...e, ...form } : e));
    } else {
      const newExam: Exam = { ...form, id: form.slug } as Exam;
      setExams(prev => [...prev, newExam]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setExams(prev => prev.filter(e => e.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary-clean">Catálogo de Exames</h1>
          <p className="text-text-secondary-clean text-sm mt-1">Gerencie os exames disponíveis na loja</p>
        </div>
        <button onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-button-clean bg-brand-accent hover:bg-brand-accent/90 text-white text-sm font-semibold transition-colors">
          <Plus className="w-4 h-4" /> Novo Exame
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total de Exames', value: stats.total, icon: TestTube, color: 'text-text-primary-clean' },
          { label: 'Em Destaque', value: stats.featured, icon: Star, color: 'text-amber-600' },
          { label: 'Populares', value: stats.popular, icon: TrendingUp, color: 'text-brand-accent' },
          { label: 'Preço Médio', value: `R$ ${stats.avgPrice.toFixed(2)}`, icon: Tag, color: 'text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-card-clean border border-border-clean rounded-card-clean p-4" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-4 h-4 text-text-secondary-clean" />
              <p className="text-text-secondary-clean text-xs">{s.label}</p>
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-card-clean border border-border-clean rounded-card-clean p-4" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary-clean" />
            <input type="search" placeholder="Buscar exame por nome, descrição ou tag..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean placeholder:text-text-secondary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent" />
          </div>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20">
            <option value="all">Todas categorias</option>
            {ALL_CATEGORIES.map(cat => <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card-clean border border-border-clean rounded-card-clean overflow-hidden" style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-clean bg-gray-50">
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3">Exame</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3 hidden md:table-cell">Categoria</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3">Preço</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Prazo</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Flags</th>
                <th className="text-left text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Tags</th>
                <th className="text-right text-xs font-medium text-text-secondary-clean uppercase tracking-wider px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-clean">
              {filtered.map(exam => (
                <tr key={exam.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-button-clean bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                        <TestTube className="w-4 h-4 text-brand-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text-primary-clean truncate">{exam.name}</p>
                        <p className="text-xs text-text-secondary-clean truncate max-w-[200px]">{exam.shortDescription || exam.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-text-secondary-clean border border-border-clean">
                      {CATEGORY_LABELS[exam.category] || exam.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-text-primary-clean">R$ {exam.price.toFixed(2)}</p>
                      {exam.originalPrice && (
                        <p className="text-xs text-text-secondary-clean line-through">R$ {exam.originalPrice.toFixed(2)}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-text-secondary-clean" />
                      <span className="text-sm text-text-secondary-clean">{exam.deliveryTime}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex gap-1.5">
                      {exam.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200">
                          <Star className="w-3 h-3" /> Destaque
                        </span>
                      )}
                      {exam.popular && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">
                          <TrendingUp className="w-3 h-3" /> Popular
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-[180px]">
                      {exam.tags?.slice(0, 3).map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-text-secondary-clean text-[10px] border border-border-clean">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(exam)}
                        className="p-2 rounded-button-clean hover:bg-blue-50 text-text-secondary-clean hover:text-blue-600 transition-colors" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteConfirm(exam.id)}
                        className="p-2 rounded-button-clean hover:bg-red-50 text-text-secondary-clean hover:text-red-500 transition-colors" title="Excluir">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <TestTube className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-text-secondary-clean text-sm">Nenhum exame encontrado</p>
          </div>
        )}
        <div className="px-4 py-3 border-t border-border-clean bg-gray-50">
          <p className="text-xs text-text-secondary-clean">Mostrando {filtered.length} de {exams.length} exames</p>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowModal(false)} />
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 px-4 overflow-y-auto">
            <div className="bg-card-clean border border-border-clean rounded-card-clean w-full max-w-2xl mb-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-clean">
                <h2 className="text-lg font-bold text-text-primary-clean">
                  {editingExam ? 'Editar Exame' : 'Novo Exame'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-button-clean hover:bg-gray-100 text-text-secondary-clean"><X className="w-5 h-5" /></button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Name & Slug */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-1.5">Nome do Exame *</label>
                    <input type="text" value={form.name} onChange={e => handleNameChange(e.target.value)}
                      placeholder="Ex: Hemograma Completo"
                      className="w-full px-3 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-1.5">Slug (URL)</label>
                    <input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                      placeholder="hemograma-completo"
                      className="w-full px-3 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-secondary-clean text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent" />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-text-primary-clean mb-1.5">Descrição *</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={3} placeholder="Descrição detalhada do exame..."
                    className="w-full px-3 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent" />
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium text-text-primary-clean mb-1.5">Descrição Curta</label>
                  <input type="text" value={form.shortDescription || ''} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))}
                    placeholder="Ex: Análise completa do sangue"
                    className="w-full px-3 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent" />
                </div>

                {/* Price, Original Price, Category, Delivery */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-1.5">Preço (R$) *</label>
                    <input type="number" step="0.01" min="0" value={form.price || ''} onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))}
                      placeholder="45.90"
                      className="w-full px-3 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-1.5">Preço Original</label>
                    <input type="number" step="0.01" min="0" value={form.originalPrice || ''} onChange={e => setForm(f => ({ ...f, originalPrice: parseFloat(e.target.value) || undefined }))}
                      placeholder="69.90"
                      className="w-full px-3 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-1.5">Categoria *</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as ExamCategory }))}
                      className="w-full px-3 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20">
                      {ALL_CATEGORIES.map(cat => <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary-clean mb-1.5">Prazo</label>
                    <select value={form.deliveryTime} onChange={e => setForm(f => ({ ...f, deliveryTime: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20">
                      <option value="24h">24h</option>
                      <option value="48h">48h</option>
                      <option value="72h">72h</option>
                      <option value="5 dias">5 dias</option>
                      <option value="7 dias">7 dias</option>
                    </select>
                  </div>
                </div>

                {/* Flags */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.featured || false} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                      className="w-4 h-4 rounded border-border-clean text-brand-accent focus:ring-brand-accent/20" />
                    <span className="text-sm text-text-primary-clean">Em destaque</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.popular || false} onChange={e => setForm(f => ({ ...f, popular: e.target.checked }))}
                      className="w-4 h-4 rounded border-border-clean text-brand-accent focus:ring-brand-accent/20" />
                    <span className="text-sm text-text-primary-clean">Popular</span>
                  </label>
                </div>

                {/* Preparation Info */}
                <div>
                  <label className="block text-sm font-medium text-text-primary-clean mb-1.5">Informações de Preparo</label>
                  <div className="flex gap-2 mb-2">
                    <input type="text" value={prepInput} onChange={e => setPrepInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addPrep())}
                      placeholder="Ex: Jejum de 8 horas"
                      className="flex-1 px-3 py-2 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent" />
                    <button onClick={addPrep} className="px-3 py-2 rounded-button-clean bg-brand-accent/10 text-brand-accent text-sm font-medium hover:bg-brand-accent/20 transition-colors">
                      Adicionar
                    </button>
                  </div>
                  {(form.preparationInfo || []).length > 0 && (
                    <div className="space-y-1.5">
                      {form.preparationInfo!.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-button-clean bg-gray-50 border border-border-clean">
                          <span className="text-sm text-text-primary-clean flex-1">{p}</span>
                          <button onClick={() => removePrep(i)} className="text-text-secondary-clean hover:text-red-500 transition-colors"><X className="w-3.5 h-3.5" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-text-primary-clean mb-1.5">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Ex: Jejum 4h"
                      className="flex-1 px-3 py-2 rounded-button-clean bg-gray-50 border border-border-clean text-text-primary-clean text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent" />
                    <button onClick={addTag} className="px-3 py-2 rounded-button-clean bg-brand-accent/10 text-brand-accent text-sm font-medium hover:bg-brand-accent/20 transition-colors">
                      Adicionar
                    </button>
                  </div>
                  {(form.tags || []).length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {form.tags!.map((t, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-medium">
                          {t}
                          <button onClick={() => removeTag(i)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border-clean bg-gray-50 rounded-b-card-clean">
                <button onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-button-clean bg-card-clean border border-border-clean text-text-secondary-clean text-sm font-medium hover:bg-gray-100 transition-colors">
                  Cancelar
                </button>
                <button onClick={handleSave}
                  disabled={!form.name || !form.slug || form.price <= 0}
                  className="px-4 py-2.5 rounded-button-clean bg-brand-accent hover:bg-brand-accent/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors">
                  {editingExam ? 'Salvar Alterações' : 'Criar Exame'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setDeleteConfirm(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="bg-card-clean border border-border-clean rounded-card-clean w-full max-w-sm p-6 text-center" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-text-primary-clean mb-2">Excluir Exame?</h3>
              <p className="text-text-secondary-clean text-sm mb-2">
                <strong className="text-text-primary-clean">{exams.find(e => e.id === deleteConfirm)?.name}</strong>
              </p>
              <p className="text-text-secondary-clean text-sm mb-6">
                Esta ação não pode ser desfeita. O exame será removido do catálogo.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2.5 rounded-button-clean bg-card-clean border border-border-clean text-text-secondary-clean text-sm font-medium hover:bg-gray-100 transition-colors">
                  Cancelar
                </button>
                <button onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 py-2.5 rounded-button-clean bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors">
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

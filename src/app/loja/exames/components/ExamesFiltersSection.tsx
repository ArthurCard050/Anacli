'use client';

import { useState, useEffect } from 'react';
import { Filter, Grid, List, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalResults: number;
}

export interface FilterState {
  category: string[];
  priceRange: string;
  deliveryTime: string[];
  preparation: string[];
  search: string;
}

export default function ExamesFiltersSection({ onFiltersChange, onViewModeChange, totalResults }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    priceRange: '',
    deliveryTime: [],
    preparation: [],
    search: ''
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = [
    { value: 'sangue', label: 'Exames de Sangue' },
    { value: 'urina', label: 'Exames de Urina' },
    { value: 'imagem', label: 'Exames de Imagem' },
    { value: 'cardiologia', label: 'Cardiologia' },
    { value: 'hormonal', label: 'Hormônios' },
    { value: 'checkup', label: 'Check-ups' }
  ];

  const priceRanges = [
    { value: '0-50', label: 'Até R$ 50' },
    { value: '50-100', label: 'R$ 50 - R$ 100' },
    { value: '100-200', label: 'R$ 100 - R$ 200' },
    { value: '200+', label: 'Acima de R$ 200' }
  ];

  const deliveryTimes = [
    { value: '24h', label: '24 horas' },
    { value: '48h', label: '48 horas' },
    { value: '72h', label: '72 horas' }
  ];

  const preparations = [
    { value: 'sem-jejum', label: 'Sem jejum' },
    { value: 'jejum-8h', label: 'Jejum 8h' },
    { value: 'jejum-12h', label: 'Jejum 12h' }
  ];

  // Notificar mudanças nos filtros quando necessário
  const handleCategoryChange = (category: string) => {
    const newFilters = {
      ...filters,
      category: filters.category.includes(category)
        ? filters.category.filter(c => c !== category)
        : [...filters.category, category]
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeChange = (range: string) => {
    const newFilters = {
      ...filters,
      priceRange: filters.priceRange === range ? '' : range
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDeliveryTimeChange = (time: string) => {
    const newFilters = {
      ...filters,
      deliveryTime: filters.deliveryTime.includes(time)
        ? filters.deliveryTime.filter(t => t !== time)
        : [...filters.deliveryTime, time]
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePreparationChange = (prep: string) => {
    const newFilters = {
      ...filters,
      preparation: filters.preparation.includes(prep)
        ? filters.preparation.filter(p => p !== prep)
        : [...filters.preparation, prep]
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const newFilters = {
      category: [],
      priceRange: '',
      deliveryTime: [],
      preparation: [],
      search: ''
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    onViewModeChange(mode);
  };

  const getActiveFiltersCount = () => {
    return filters.category.length + 
           (filters.priceRange ? 1 : 0) + 
           filters.deliveryTime.length + 
           filters.preparation.length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {totalResults} exames encontrados
              </h2>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Limpar filtros ({activeFiltersCount})
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Visualização:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleViewModeChange('grid')}
                  className="h-8 px-3"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleViewModeChange('list')}
                  className="h-8 px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-4 gap-6">
            {/* Categoria */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Categoria</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(category.value)}
                      onChange={() => handleCategoryChange(category.value)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preço */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Preço</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceRange === range.value}
                      onChange={() => handlePriceRangeChange(range.value)}
                      className="border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tempo de Resultado */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Resultado</h3>
              <div className="space-y-2">
                {deliveryTimes.map((time) => (
                  <label key={time.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.deliveryTime.includes(time.value)}
                      onChange={() => handleDeliveryTimeChange(time.value)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">{time.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preparo */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Preparo</h3>
              <div className="space-y-2">
                {preparations.map((prep) => (
                  <label key={prep.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.preparation.includes(prep.value)}
                      onChange={() => handlePreparationChange(prep.value)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">{prep.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="lg:hidden py-3">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge className="ml-1 h-5 min-w-5 text-xs bg-primary text-white">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{totalResults} exames</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleViewModeChange('grid')}
                  className="h-8 px-3"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleViewModeChange('list')}
                  className="h-8 px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.category.map((cat) => (
                <Badge key={cat} className="bg-primary text-white flex items-center gap-1">
                  {categories.find(c => c.value === cat)?.label}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleCategoryChange(cat)}
                  />
                </Badge>
              ))}
              {filters.priceRange && (
                <Badge className="bg-primary text-white flex items-center gap-1">
                  {priceRanges.find(p => p.value === filters.priceRange)?.label}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handlePriceRangeChange(filters.priceRange)}
                  />
                </Badge>
              )}
              {filters.deliveryTime.map((time) => (
                <Badge key={time} className="bg-primary text-white flex items-center gap-1">
                  {deliveryTimes.find(t => t.value === time)?.label}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleDeliveryTimeChange(time)}
                  />
                </Badge>
              ))}
              {filters.preparation.map((prep) => (
                <Badge key={prep} className="bg-primary text-white flex items-center gap-1">
                  {preparations.find(p => p.value === prep)?.label}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handlePreparationChange(prep)}
                  />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-500 hover:text-gray-700 h-6"
              >
                Limpar todos
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Filter Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filtros</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Categoria Mobile */}
                  <div>
                    <h4 className="font-medium mb-3">Categoria</h4>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <label key={category.value} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.category.includes(category.value)}
                            onChange={() => handleCategoryChange(category.value)}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-gray-700">{category.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preço Mobile */}
                  <div>
                    <h4 className="font-medium mb-3">Preço</h4>
                    <div className="space-y-3">
                      {priceRanges.map((range) => (
                        <label key={range.value} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="priceRangeMobile"
                            checked={filters.priceRange === range.value}
                            onChange={() => handlePriceRangeChange(range.value)}
                            className="border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-gray-700">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Tempo Mobile */}
                  <div>
                    <h4 className="font-medium mb-3">Tempo de Resultado</h4>
                    <div className="space-y-3">
                      {deliveryTimes.map((time) => (
                        <label key={time.value} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.deliveryTime.includes(time.value)}
                            onChange={() => handleDeliveryTimeChange(time.value)}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-gray-700">{time.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preparo Mobile */}
                  <div>
                    <h4 className="font-medium mb-3">Preparo</h4>
                    <div className="space-y-3">
                      {preparations.map((prep) => (
                        <label key={prep.value} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.preparation.includes(prep.value)}
                            onChange={() => handlePreparationChange(prep.value)}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-gray-700">{prep.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={clearAllFilters}
                    className="flex-1"
                  >
                    Limpar Filtros
                  </Button>
                  <Button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Aplicar Filtros
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
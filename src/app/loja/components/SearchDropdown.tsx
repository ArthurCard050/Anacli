'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Package, TestTube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchProducts } from '../data/mock-products';
import { useCart } from '../context/CartContext';
import type { Exam, ExamPackage } from '../types';

export default function SearchDropdown() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<(Exam | ExamPackage)[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  // Buscar produtos
  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchProducts(query);
      setResults(searchResults.slice(0, 5)); // Limita a 5 resultados
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navegação por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectResult(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  // Selecionar resultado
  const handleSelectResult = (item: Exam | ExamPackage) => {
    const isPackage = 'title' in item;
    const type = isPackage ? 'package' : 'exam';
    addItem(item.id, type);
    setQuery('');
    setIsOpen(false);
  };

  // Verificar se é pacote
  const isPackage = (item: Exam | ExamPackage): item is ExamPackage => {
    return 'title' in item;
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-gray-400" />
        <Input
          type="search"
          placeholder="Buscar exames..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-12 md:pl-14 pr-4 md:pr-6 h-14 md:h-16 text-base md:text-lg rounded-xl md:rounded-2xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-white"
        />
      </div>

      {/* Dropdown de Resultados */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-96 overflow-y-auto">
            {results.map((item, index) => {
              const isPkg = isPackage(item);
              const name = isPkg ? item.title : item.name;
              const description = isPkg ? item.description : item.shortDescription || item.description;
              const price = item.price;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectResult(item)}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left ${
                    index === selectedIndex ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isPkg ? 'bg-accent/10' : 'bg-primary/10'
                  }`}>
                    {isPkg ? (
                      <Package className={`h-6 w-6 ${isPkg ? 'text-accent' : 'text-primary'}`} />
                    ) : (
                      <TestTube className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900 truncate">{name}</p>
                      {isPkg && (
                        <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                          Pacote
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-primary">R$ {price.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Adicionar</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Use ↑ ↓ para navegar, Enter para selecionar
            </p>
          </div>
        </div>
      )}

      {/* Sem resultados */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 p-6 text-center z-50">
          <p className="text-gray-600">Nenhum exame encontrado para "{query}"</p>
          <p className="text-sm text-gray-500 mt-2">Tente buscar por outro termo</p>
        </div>
      )}
    </div>
  );
}

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '../types';
import { getPackageById } from '../data/mock-products';
import axios from 'axios';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  addItem: (id: string, type: 'exam' | 'package') => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'anacli-cart';
const SHIPPING_THRESHOLD = 200; // Frete grátis acima de R$ 200
const SHIPPING_COST = 15; // Custo do frete

// Cache para exames da API
let examsCache: any[] = [];
let examsCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Função para buscar exame da API
async function getExamFromAPI(id: string) {
  try {
    // Verificar se o cache ainda é válido
    const now = Date.now();
    if (examsCache.length === 0 || now - examsCacheTime > CACHE_DURATION) {
      const apiUrl = process.env.NEXT_PUBLIC_VARIAVEL_API_URL;
      const response = await axios.get(`${apiUrl}`);
      if (response.data && Array.isArray(response.data)) {
        examsCache = response.data;
        examsCacheTime = now;
      }
    }

    // Buscar exame no cache
    return examsCache.find(exam => exam.id === id);
  } catch (error) {
    console.error('Erro ao buscar exame da API:', error);
    return null;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [items]);

  // Adicionar item ao carrinho
  const addItem = async (id: string, type: 'exam' | 'package') => {
    // Verificar se já existe
    const existing = items.find(item => item.id === id && item.type === type);
    
    if (existing) {
      // Incrementa quantidade
      setItems(prev =>
        prev.map(item =>
          item.id === id && item.type === type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      setIsOpen(true);
      return;
    }

    // Busca informações do produto
    let name = '';
    let price = 0;
    let image = '';

    if (type === 'exam') {
      const exam = await getExamFromAPI(id);
      if (exam) {
        name = exam.name;
        price = exam.price;
        image = exam.image || '';
      } else {
        console.error('Exame não encontrado:', id);
        return;
      }
    } else {
      const pkg = getPackageById(id);
      if (pkg) {
        name = pkg.title;
        price = pkg.price;
        image = pkg.image || '';
      } else {
        console.error('Pacote não encontrado:', id);
        return;
      }
    }

    // Adiciona novo item
    setItems(prev => [...prev, { id, type, name, price, quantity: 1, image }]);

    // Abre o carrinho automaticamente
    setIsOpen(true);
  };

  // Remover item do carrinho
  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Atualizar quantidade
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Limpar carrinho
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Calcular totais
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  // Controle do drawer
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shipping,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

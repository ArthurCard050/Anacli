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
  addPackageItems: (examIds: string[]) => Promise<void>;
  addItemsByName: (examNames: string[]) => Promise<{ found: number; notFound: string[] }>;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'anacli-cart';
const SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 15;

// Função para buscar exame da API por ID
async function getExamFromAPI(id: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_VARIAVEL_API_URL;
    const response = await axios.get(`${apiUrl}`);
    let idNumber = parseInt(id);
    return response.data.find((exam: any) => exam.id === idNumber);
  } catch (error) {
    console.error('Erro ao buscar exame da API:', error);
    return null;
  }
}

// Função para buscar todos os exames da API
async function getAllExamsFromAPI(): Promise<any[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_VARIAVEL_API_URL;
    const response = await axios.get(`${apiUrl}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Erro ao buscar exames da API:', error);
    return [];
  }
}

// Normaliza string para comparação (remove acentos, lowercase)
function normalizeStr(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Carregar carrinho do localStorage
  useEffect(() => {
    if (!isClient) return;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, [isClient]);

  // Salvar carrinho no localStorage
  useEffect(() => {
    if (!isClient) return;
    
    if (items.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [items, isClient]);

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

  // Adicionar todos os exames de um pacote ao carrinho
  const addPackageItems = async (examIds: string[]) => {
    if (!examIds || examIds.length === 0) {
      console.error('Nenhum exame fornecido');
      return;
    }
    
    try {
      // Buscar informações de todos os exames
      const examPromises = examIds.map(id => getExamFromAPI(id));

      const exams = await Promise.all(examPromises);

      console.log(exams)

      // Filtrar exames válidos
      const validExams = exams.filter(exam => exam !== null);

      if (validExams.length === 0) {
        console.error('Nenhum exame válido encontrado');
        return;
      }

      // Adicionar cada exame ao carrinho
      setItems(prev => {
        const newItems = [...prev];
        
        validExams.forEach(exam => {
          // Verificar se o exame já existe no carrinho
          const existingIndex = newItems.findIndex(
            item => item.id === exam.id && item.type === 'exam'
          );

          if (existingIndex >= 0) {
            // Incrementa quantidade se já existe
            newItems[existingIndex].quantity += 1;
          } else {
            // Adiciona novo item
            newItems.push({
              id: exam.id,
              type: 'exam',
              name: exam.name,
              price: exam.price,
              quantity: 1,
              image: exam.image || ''
            });
          }
        });

        return newItems;
      });

      // Abre o carrinho automaticamente
      setIsOpen(true);
    } catch (error) {
      console.error('Erro ao adicionar exames do pacote:', error);
    }
  };

  // Adicionar exames ao carrinho pelo nome (retornado pela IA)
  const addItemsByName = async (examNames: string[]): Promise<{ found: number; notFound: string[] }> => {
    if (!examNames || examNames.length === 0) return { found: 0, notFound: [] };

    const allExams = await getAllExamsFromAPI();
    const notFound: string[] = [];
    const toAdd: any[] = [];

    for (const name of examNames) {
      const normalizedName = normalizeStr(name);
      const match = allExams.find((exam: any) =>
        normalizeStr(exam.name).includes(normalizedName) ||
        normalizedName.includes(normalizeStr(exam.name))
      );

      if (match) {
        toAdd.push(match);
      } else {
        notFound.push(name);
      }
    }

    if (toAdd.length > 0) {
      setItems(prev => {
        const newItems = [...prev];
        toAdd.forEach(exam => {
          const existingIndex = newItems.findIndex(
            item => item.id === String(exam.id) && item.type === 'exam'
          );
          if (existingIndex >= 0) {
            newItems[existingIndex].quantity += 1;
          } else {
            newItems.push({
              id: String(exam.id),
              type: 'exam',
              name: exam.name,
              price: exam.price,
              quantity: 1,
              image: exam.image || '',
            });
          }
        });
        return newItems;
      });
      setIsOpen(true);
    }

    return { found: toAdd.length, notFound };
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
    if (isClient) {
      localStorage.removeItem(STORAGE_KEY);
    }
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
        addPackageItems,
        addItemsByName,
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
  
  // Se não estamos no cliente, retorna valores padrão
  if (typeof window === 'undefined') {
    return {
      items: [],
      itemCount: 0,
      subtotal: 0,
      shipping: 0,
      total: 0,
      addItem: async () => {},
      addPackageItems: async () => {},
      addItemsByName: async () => ({ found: 0, notFound: [] }),
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      isOpen: false,
      openCart: () => {},
      closeCart: () => {},
    };
  }
  
  // Se o contexto não está disponível no cliente, também retorna valores padrão
  if (!context) {
    return {
      items: [],
      itemCount: 0,
      subtotal: 0,
      shipping: 0,
      total: 0,
      addItem: async () => {},
      addPackageItems: async () => {},
      addItemsByName: async () => ({ found: 0, notFound: [] }),
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      isOpen: false,
      openCart: () => {},
      closeCart: () => {},
    };
  }
  
  return context;
}

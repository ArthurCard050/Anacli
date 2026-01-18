# 🚀 Guia de Integração - Loja Anacli

## ✅ O que foi criado (Fase 1)

### Estrutura de Arquivos
```
/loja-anacli/
├── page.tsx                          # Página principal
├── components/
│   ├── ShopHeader.tsx               # ✅ Header fixo com busca e carrinho
│   ├── HeroSection.tsx              # ✅ Hero split-screen
│   ├── AIBanner.tsx                 # ✅ Banner de IA
│   ├── PackageCard.tsx              # ✅ Card de pacote (pronto para Fase 2)
│   └── ExamCard.tsx                 # ✅ Card de exame (pronto para Fase 2)
├── data/
│   └── mock-products.ts             # ✅ Dados mock estruturados
├── types/
│   └── index.ts                     # ✅ Tipos TypeScript completos
├── styles/
│   └── shop.css                     # ✅ Estilos customizados
├── README.md                        # 📖 Documentação completa
├── COMO_VISUALIZAR.md               # 📖 Guia de visualização
└── INTEGRACAO.md                    # 📖 Este arquivo
```

## 🔧 Passo a Passo para Integração

### 1. Mover para a estrutura do Next.js

```bash
# Opção A: Mover para dentro de src/app (Recomendado)
mv loja-anacli src/app/loja

# Opção B: Criar link simbólico (se preferir manter separado)
# No Windows (CMD como Admin):
mklink /D src\app\loja loja-anacli
```

### 2. Adicionar link no site institucional

Edite o arquivo `src/components/Header.tsx` ou `src/components/ui/resizable-navbar.tsx`:

```tsx
// Adicione um item de menu para a loja
const menuItems = [
  // ... itens existentes
  {
    label: 'Loja de Exames',
    href: '/loja',
    icon: ShoppingBag // import { ShoppingBag } from 'lucide-react'
  }
];
```

### 3. Adicionar CTA na home institucional

Edite `src/app/page.tsx` para adicionar um botão de destaque:

```tsx
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

// Dentro do componente, adicione:
<section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-4">
      Compre seus exames online
    </h2>
    <p className="text-lg text-gray-600 mb-8">
      Rápido, fácil e com resultados confiáveis
    </p>
    <Link href="/loja">
      <Button size="lg" className="bg-accent hover:bg-accent/90">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Acessar Loja
      </Button>
    </Link>
  </div>
</section>
```

### 4. Testar a integração

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Acessar no navegador
http://localhost:3000/loja
```

## 🎨 Customizações Opcionais

### Ajustar cores (se necessário)

As cores já estão alinhadas com o design system do Anacli, mas você pode ajustar em `src/app/globals.css`:

```css
:root {
  --primary: 68 68% 45%;      /* Verde Oliva #A6C022 */
  --accent: 335 100% 50%;     /* Magenta #FF0068 */
  --secondary: 65 53% 67%;    /* Soft Lime #D1D87F */
}
```

### Adicionar imagens reais dos produtos

Substitua os gradientes nos cards por imagens reais:

```tsx
// Em HeroSection.tsx ou nos cards
<Image
  src="/assets/produtos/checkup-completo.webp"
  alt={product.title}
  fill
  className="object-cover"
/>
```

### Configurar rotas dinâmicas (Fase 2)

Para páginas de detalhes de produtos:

```bash
# Criar estrutura de rotas dinâmicas
mkdir -p src/app/loja/produto/[slug]
touch src/app/loja/produto/[slug]/page.tsx
```

## 📦 Dependências Necessárias

Todas as dependências já estão instaladas no projeto:

- ✅ Next.js 14
- ✅ React 18
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Radix UI (componentes)
- ✅ Lucide React (ícones)

## 🔄 Estado Global (Próxima Fase)

Para gerenciar o carrinho de compras, recomendo:

### Opção 1: Context API (Simples)

```tsx
// src/app/loja/context/CartContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';
import type { CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
```

### Opção 2: Zustand (Recomendado para escala)

```bash
npm install zustand
```

```tsx
// src/app/loja/store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existing = state.items.find(i => i.id === item.id);
        if (existing) {
          return {
            items: state.items.map(i =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(i =>
          i.id === id ? { ...i, quantity } : i
        )
      })),
      clearCart: () => set({ items: [] }),
      get total() {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
    }),
    {
      name: 'anacli-cart-storage',
    }
  )
);
```

## 🎯 Próximos Passos (Fase 2)

1. **Catálogo de Produtos**
   - Criar página de listagem completa
   - Implementar filtros por categoria
   - Adicionar busca funcional
   - Paginação

2. **Página de Detalhes**
   - Layout de produto individual
   - Informações de preparo
   - Exames relacionados
   - Avaliações (futuro)

3. **Carrinho de Compras**
   - Sidebar/Modal do carrinho
   - Resumo de valores
   - Cupons de desconto
   - Cálculo de frete (se aplicável)

4. **Checkout**
   - Formulário de dados
   - Seleção de data/hora
   - Integração de pagamento
   - Confirmação de pedido

5. **Upload de Receituário (IA)**
   - Interface de upload
   - Preview de imagem
   - Integração com API de OCR/IA
   - Sugestão automática de exames

## 📱 SEO e Performance

### Meta tags recomendadas

```tsx
// Em src/app/loja/page.tsx
export const metadata = {
  title: 'Loja de Exames | Anacli - Compre Online',
  description: 'Compre seus exames laboratoriais online com a Anacli. Resultados rápidos, confiáveis e com a qualidade que você merece.',
  keywords: 'exames laboratoriais, comprar exames online, check-up, Anacli',
  openGraph: {
    title: 'Loja de Exames Anacli',
    description: 'Compre seus exames online de forma rápida e segura',
    images: ['/assets/og-loja.jpg'],
  }
};
```

### Otimizações de imagem

```tsx
// Usar Next.js Image com prioridade para hero
<Image
  src="/assets/hero-loja.webp"
  alt="Loja Anacli"
  width={1200}
  height={600}
  priority
  quality={85}
/>
```

## 🔒 Segurança

- ✅ Validação de formulários com Zod
- ✅ Sanitização de inputs
- ✅ HTTPS obrigatório em produção
- ✅ Rate limiting para APIs
- ✅ Proteção contra XSS

## 📊 Analytics (Recomendado)

```tsx
// Adicionar tracking de eventos
import { trackEvent } from '@/lib/analytics';

// Ao adicionar ao carrinho
trackEvent('add_to_cart', {
  item_id: exam.id,
  item_name: exam.name,
  price: exam.price,
  category: exam.category
});

// Ao finalizar compra
trackEvent('purchase', {
  transaction_id: orderId,
  value: total,
  items: cartItems
});
```

## 🎉 Pronto!

A estrutura base da loja está completa e pronta para ser integrada. Siga os passos acima e comece a testar!

**Dúvidas?** Consulte os outros arquivos de documentação:
- `README.md` - Visão geral do projeto
- `COMO_VISUALIZAR.md` - Como visualizar a loja
- `INTEGRACAO.md` - Este arquivo

---

**Desenvolvido para Anacli** 🧪💚

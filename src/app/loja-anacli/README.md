# Loja Anacli - E-commerce de Exames Laboratoriais

## 📋 Visão Geral

E-commerce moderno para venda de exames laboratoriais da marca Anacli, com foco em conversão e experiência do usuário.

## 🎨 Design System

### Cores (mantidas do site institucional)
- **Primary**: `#A6C022` (Olive Gold) - HSL: 68 68% 45%
- **Secondary**: `#D1D87F` (Soft Lime) - HSL: 65 53% 67%
- **Accent**: `#FF0068` (Magenta) - HSL: 335 100% 50%
- **Background**: Branco predominante (#FFFFFF)

### Tipografia
- **Fonte**: Plus Jakarta Sans (fallback: Inter, system-ui)
- **Hierarquia**: Títulos grandes e bold, textos limpos e legíveis

### Estilo Visual
- Fundo branco predominante
- Sombras suaves e elegantes
- Bordas arredondadas (0.75rem padrão)
- Foco em usabilidade e conversão

## 🏗️ Estrutura Atual (Fase 1)

```
/loja-anacli
├── page.tsx                    # Página principal
├── components/
│   ├── ShopHeader.tsx         # Header fixo com busca e carrinho
│   ├── HeroSection.tsx        # Hero split-screen (busca + vitrine)
│   └── AIBanner.tsx           # Banner de novidade (IA)
└── README.md                  # Este arquivo
```

## ✅ Fase 1 - Concluída

### Header Fixo
- [x] Logo Anacli
- [x] Busca rápida de exames (desktop e mobile)
- [x] Ícone de carrinho com contador
- [x] Ícone de login/usuário
- [x] Design responsivo e minimalista

### Hero Section (Split Screen)
- [x] **Coluna Esquerda**:
  - Título de destaque "Realize seu exame"
  - Input de busca de exames
  - CTA primário "Envie seu receituário" com ícone de upload
  - Badge "Leitura via IA"
  - Badges de confiança (Resultados 24h, ISO)

- [x] **Coluna Direita**:
  - Vitrine de produtos em destaque
  - Cards de pacotes promocionais
  - Preços e descontos visíveis
  - Hover effects e interatividade

### Banner de Novidade (IA)
- [x] Destaque visual com gradiente magenta
- [x] Título chamativo sobre funcionalidade IA
- [x] CTAs de ação (Experimentar / Saiba mais)
- [x] Features em grid (Leitura Inteligente, Rápido, Fácil)
- [x] Design moderno com backdrop blur e padrões

## 🚀 Próximas Fases

### Fase 2: Catálogo de Produtos
- [ ] Grid de exames individuais
- [ ] Filtros por categoria
- [ ] Ordenação (preço, popularidade)
- [ ] Paginação

### Fase 3: Página de Produto
- [ ] Detalhes do exame
- [ ] Informações de preparo
- [ ] Adicionar ao carrinho
- [ ] Exames relacionados

### Fase 4: Carrinho e Checkout
- [ ] Resumo do carrinho
- [ ] Cálculo de valores
- [ ] Formulário de agendamento
- [ ] Integração de pagamento

### Fase 5: Upload de Receituário (IA)
- [ ] Interface de upload
- [ ] Preview da imagem
- [ ] Processamento via IA
- [ ] Sugestão automática de exames

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Componentes**: Radix UI + shadcn/ui
- **Ícones**: Lucide React
- **Animações**: Framer Motion (quando necessário)

## 📱 Responsividade

Todos os componentes são mobile-first e totalmente responsivos:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Foco em Conversão

- CTAs destacados e claros
- Processo de compra simplificado
- Badges de confiança visíveis
- Destaque para diferenciais (IA, rapidez)
- Design limpo sem distrações

## 📝 Notas de Desenvolvimento

- Todo código isolado na pasta `/loja-anacli`
- Reutilização de assets da raiz (`/public/assets`)
- Componentes UI do shadcn/ui (`@/components/ui`)
- Mantém consistência com site institucional
- Foco em performance e SEO

## 🔗 Integração com Site Institucional

A loja pode ser acessada via:
- Link no header do site principal
- CTA específico na home institucional
- URL direta: `/loja-anacli`

---

**Desenvolvido para Anacli** | Versão 1.0 - Fase 1

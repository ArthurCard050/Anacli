# Como Visualizar a Loja Anacli

## 🚀 Opções de Visualização

### Opção 1: Integrar na Aplicação Next.js Existente (Recomendado)

A loja foi criada como uma página do Next.js e pode ser integrada facilmente:

1. **Mover a pasta para dentro de `src/app`:**
   ```bash
   mv loja-anacli src/app/loja
   ```

2. **Acessar no navegador:**
   ```
   http://localhost:3000/loja
   ```

3. **Iniciar o servidor de desenvolvimento (se não estiver rodando):**
   ```bash
   npm run dev
   ```

### Opção 2: Criar Rota Direta

Se preferir manter a estrutura atual, crie um link no `src/app/page.tsx`:

```tsx
// Adicione no arquivo src/app/page.tsx
import Link from 'next/link';

// Dentro do componente, adicione:
<Link href="/loja" className="btn-primary">
  Acessar Loja de Exames
</Link>
```

## 📁 Estrutura de Arquivos

```
/loja-anacli (ou /src/app/loja)
├── page.tsx                    # Página principal da loja
├── components/
│   ├── ShopHeader.tsx         # Header com busca e carrinho
│   ├── HeroSection.tsx        # Hero split-screen
│   └── AIBanner.tsx           # Banner de IA
├── data/
│   └── mock-products.ts       # Dados mock dos produtos
├── types/
│   └── index.ts               # Tipos TypeScript
└── README.md                  # Documentação
```

## 🎨 Preview da Interface

### Header
- Logo Anacli (esquerda)
- Busca de exames (centro)
- Ícones de Login e Carrinho (direita)
- Responsivo com busca mobile abaixo

### Hero Section (Split Screen)

**Coluna Esquerda:**
- Título grande: "Realize seu exame"
- Input de busca
- Botão CTA: "Envie seu receituário" (magenta)
- Badges de confiança

**Coluna Direita:**
- 3 cards de pacotes em destaque
- Preços com desconto
- Botão "Ver mais" em cada card

### Banner de IA
- Fundo gradiente magenta
- Título: "Envie a foto da sua receita"
- 2 CTAs: "Experimentar agora" e "Saiba mais"
- Grid com 3 features da IA

## 🎯 Funcionalidades Implementadas

✅ Header fixo e responsivo
✅ Busca de exames (UI pronta)
✅ Vitrine de produtos em destaque
✅ Banner promocional da IA
✅ Design system consistente com site institucional
✅ Totalmente responsivo (mobile, tablet, desktop)
✅ Hover effects e interatividade
✅ Tipos TypeScript completos
✅ Dados mock estruturados

## 🔧 Próximos Passos

1. **Testar a visualização:**
   - Mover para `src/app/loja`
   - Acessar `http://localhost:3000/loja`
   - Testar responsividade (mobile, tablet, desktop)

2. **Ajustes visuais (se necessário):**
   - Cores
   - Espaçamentos
   - Imagens dos produtos

3. **Implementar Fase 2:**
   - Catálogo completo de exames
   - Filtros e busca funcional
   - Página de detalhes do produto

## 📱 Responsividade

A interface foi desenvolvida mobile-first:

- **Mobile (< 768px):**
  - Header compacto
  - Busca abaixo do header
  - Hero em coluna única
  - Cards empilhados

- **Tablet (768px - 1024px):**
  - Layout intermediário
  - Hero começa a dividir

- **Desktop (> 1024px):**
  - Hero split-screen completo
  - Busca no header
  - Layout otimizado

## 🎨 Paleta de Cores Usada

- **Primary (Verde Oliva):** `#A6C022` - Botões secundários, destaques
- **Accent (Magenta):** `#FF0068` - CTAs principais, badges
- **Background:** `#FFFFFF` - Fundo predominante
- **Gray Scale:** Textos e bordas suaves

## 💡 Dicas

- Use o DevTools do navegador para testar diferentes tamanhos de tela
- Verifique o comportamento dos hover effects no desktop
- Teste a busca mobile (aparece/desaparece conforme viewport)
- Observe as animações suaves nos cards

---

**Pronto para visualizar!** 🚀

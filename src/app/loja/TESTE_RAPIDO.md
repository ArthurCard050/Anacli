# 🧪 Guia de Teste Rápido - Loja High-End

## 🚀 Como Testar as Novas Funcionalidades

### 1. Smart Sticky Header

**O que testar:**
- Role a página para baixo (mais de 100px)
- O header deve desaparecer suavemente
- Role um pouco para cima
- O header deve reaparecer instantaneamente

**Mega Menu:**
- Passe o mouse sobre "Exames" no menu
- Um painel largo deve abrir com 6 categorias
- Cada categoria tem ícone colorido e lista de itens
- Passe o mouse nos itens para ver o hover effect

---

### 2. Hero Section com Typewriter

**Typewriter Effect:**
- Observe o campo de busca
- O placeholder deve digitar automaticamente:
  - "Vitamina D..."
  - "Hemograma Completo..."
  - "Glicemia de Jejum..."
  - etc.
- Após digitar, ele apaga e começa outra frase
- Cursor piscante (|) deve estar visível

---

### 3. Dropzone Inteligente

**Drag & Drop:**
1. Abra uma imagem no seu computador
2. Arraste sobre a área de upload
3. A área deve mudar de cor (accent) e crescer levemente
4. Solte o arquivo
5. Deve mostrar o nome do arquivo e botão "Analisar com IA"

**Click to Upload:**
1. Clique na área de upload
2. Selecione uma imagem (JPG, PNG ou PDF)
3. Mesmo comportamento do drag & drop

---

### 4. Social Proof Ticker

**O que observar:**
- No canto inferior direito do hero
- Um card branco flutuante
- A cada 5 segundos, a mensagem muda:
  - "Mais de 150 exames agendados hoje"
  - "Nota 4.9 no Google Reviews"
  - "98% de satisfação dos clientes"
- Animação fade in/out suave

---

### 5. Micro-interações

**Teste todos os hovers:**
- Logo: deve crescer levemente (scale 1.05)
- Ícones de login/carrinho: devem crescer (scale 1.10)
- Cards de pacotes: devem subir (-8px) e mudar border
- Botões: devem ter transição suave

**Badge do Carrinho:**
- O número "0" deve ter pulse animation

---

### 6. Responsividade

**Desktop (> 1024px):**
- Hero em 2 colunas (60% / 40%)
- Mega menu visível
- Busca no header

**Tablet (768px - 1024px):**
- Hero começando a empilhar
- Layout intermediário

**Mobile (< 768px):**
- Hero empilhado verticalmente
- Mega menu escondido
- Busca abaixo do header
- Touch targets de 48px mínimo

---

## 🎨 Checklist Visual

### Header:
- [ ] Header esconde ao rolar para baixo
- [ ] Header aparece ao rolar para cima
- [ ] Mega menu abre ao hover em "Exames"
- [ ] Mega menu tem 6 categorias com ícones
- [ ] Logo tem hover effect
- [ ] Ícones têm hover effect
- [ ] Badge do carrinho pulsa

### Hero:
- [ ] Título com palavra "Saúde" em verde
- [ ] Underline SVG animado
- [ ] Typewriter effect funcionando
- [ ] Dropzone aceita drag & drop
- [ ] Dropzone aceita click
- [ ] Dropzone muda de cor ao arrastar
- [ ] Mostra nome do arquivo após upload
- [ ] Botão "Analisar com IA" aparece
- [ ] Badges de confiança visíveis
- [ ] Cards de pacotes com hover effect

### Social Proof:
- [ ] Ticker visível no canto inferior direito
- [ ] Mensagens mudam a cada 5s
- [ ] Animação fade in/out suave
- [ ] Ícones coloridos visíveis

### Responsividade:
- [ ] Layout adapta em diferentes tamanhos
- [ ] Textos legíveis em mobile
- [ ] Touch targets adequados
- [ ] Sem overflow horizontal

---

## 🐛 Problemas Comuns

### Typewriter não funciona:
- Verifique se o componente TypewriterPlaceholder está importado
- Verifique se não há valor no input (examSearch deve estar vazio)

### Dropzone não aceita arquivos:
- Verifique se o input file está presente
- Verifique os event handlers (onDrop, onDragOver, etc.)

### Header não esconde:
- Role mais de 100px para baixo
- Verifique se o useEffect está funcionando
- Verifique o console para erros

### Mega menu não abre:
- Passe o mouse sobre "Exames" (não clique)
- Verifique se está em desktop (lg breakpoint)

---

## 📱 Teste em Dispositivos Reais

### iOS (Safari):
- [ ] Typewriter funciona
- [ ] Dropzone funciona
- [ ] Animações suaves
- [ ] Touch targets adequados

### Android (Chrome):
- [ ] Typewriter funciona
- [ ] Dropzone funciona
- [ ] Animações suaves
- [ ] Touch targets adequados

### Desktop (Chrome/Firefox/Safari):
- [ ] Mega menu funciona
- [ ] Hover effects funcionam
- [ ] Dropzone drag & drop funciona
- [ ] Animações suaves

---

## ⚡ Performance

### Lighthouse Score Esperado:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

### Core Web Vitals:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

## 🎯 Próximos Testes (Fase 2)

Quando implementarmos:
- [ ] Modal de IA com progress bar
- [ ] Bento Grid com filtros
- [ ] Carrinho lateral (drawer)
- [ ] FAB do WhatsApp

---

**Boa sorte com os testes!** 🚀

Se encontrar algum problema, verifique:
1. Console do navegador (F12)
2. Erros TypeScript no editor
3. Warnings do Next.js no terminal

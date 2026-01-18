# ✅ Checklist de Desenvolvimento - Loja Anacli

## 🎯 Fase 1: Header e Hero Section (CONCLUÍDA)

### Header Fixo
- [x] Logo Anacli posicionada à esquerda
- [x] Background branco (#FFFFFF)
- [x] Busca rápida de exames (desktop)
- [x] Busca rápida de exames (mobile - abaixo do header)
- [x] Ícone de carrinho com contador
- [x] Ícone de login/usuário
- [x] Header fixo no topo (sticky)
- [x] Responsividade completa
- [x] Sombra suave para profundidade

### Hero Section - Coluna Esquerda
- [x] Título de destaque "Realize seu exame"
- [x] Subtítulo descritivo
- [x] Input de busca de exames visível
- [x] Placeholder adequado
- [x] Ícone de busca no input
- [x] CTA Primário "Envie seu receituário"
- [x] Ícone de upload no botão
- [x] Badge "Leitura via IA"
- [x] Ícone de Sparkles (IA)
- [x] Badges de confiança (Resultados 24h)
- [x] Badge de certificação (ISO)
- [x] Layout responsivo

### Hero Section - Coluna Direita
- [x] Título "Pacotes em Destaque"
- [x] Cards de produtos promocionais
- [x] Mínimo 3 pacotes visíveis
- [x] Badge de desconto em cada card
- [x] Nome do pacote
- [x] Descrição curta
- [x] Preço destacado
- [x] Preço original (riscado) quando houver desconto
- [x] Botão "Ver mais"
- [x] Hover effects nos cards
- [x] Gradiente de fundo nos cards
- [x] Layout responsivo (empilha no mobile)

### Banner de Novidade (IA)
- [x] Faixa/banner abaixo do Hero
- [x] Background gradiente magenta
- [x] Badge "Novidade no Anacli"
- [x] Título chamativo sobre IA
- [x] Descrição da funcionalidade
- [x] CTA "Experimentar agora"
- [x] CTA secundário "Saiba mais"
- [x] Ícones relevantes (Camera, Sparkles, Zap)
- [x] Grid de features (3 colunas)
- [x] Feature: Leitura Inteligente
- [x] Feature: Super Rápido
- [x] Feature: Fácil de Usar
- [x] Padrão de fundo decorativo
- [x] Responsividade completa

### Estrutura Técnica
- [x] TypeScript configurado
- [x] Componentes modulares
- [x] Tipos definidos (types/index.ts)
- [x] Dados mock estruturados
- [x] Estilos customizados (shop.css)
- [x] Sem erros de diagnóstico
- [x] Documentação completa

---

## 🚀 Fase 2: Catálogo de Produtos (PRÓXIMA)

### Página de Catálogo
- [ ] Rota `/loja/catalogo` ou `/loja/exames`
- [ ] Grid responsivo de produtos
- [ ] Componente ExamCard integrado
- [ ] Componente PackageCard integrado
- [ ] Skeleton loading durante carregamento
- [ ] Empty state quando sem resultados

### Filtros e Busca
- [ ] Barra lateral de filtros (desktop)
- [ ] Modal de filtros (mobile)
- [ ] Filtro por categoria
- [ ] Filtro por faixa de preço
- [ ] Filtro por tempo de entrega
- [ ] Busca em tempo real
- [ ] Debounce na busca (300ms)
- [ ] Contador de resultados
- [ ] Botão "Limpar filtros"

### Ordenação
- [ ] Dropdown de ordenação
- [ ] Ordenar por: Relevância
- [ ] Ordenar por: Menor preço
- [ ] Ordenar por: Maior preço
- [ ] Ordenar por: Mais populares
- [ ] Ordenar por: Nome (A-Z)

### Paginação
- [ ] Componente de paginação
- [ ] Navegação entre páginas
- [ ] Indicador de página atual
- [ ] Botões Anterior/Próximo
- [ ] Scroll to top ao mudar página
- [ ] URL params para página atual

---

## 📄 Fase 3: Página de Produto

### Layout
- [ ] Rota dinâmica `/loja/produto/[slug]`
- [ ] Breadcrumb de navegação
- [ ] Grid 2 colunas (imagem + info)
- [ ] Galeria de imagens (se aplicável)
- [ ] Título do exame
- [ ] Descrição completa
- [ ] Preço destacado
- [ ] Badge de desconto (se houver)

### Informações do Exame
- [ ] Seção "O que é este exame?"
- [ ] Seção "Para que serve?"
- [ ] Seção "Preparo necessário"
- [ ] Lista de preparação
- [ ] Tempo de entrega
- [ ] Categoria/Tags
- [ ] Botão "Adicionar ao carrinho"
- [ ] Seletor de quantidade

### Exames Relacionados
- [ ] Seção "Você também pode gostar"
- [ ] Carousel de produtos relacionados
- [ ] Mínimo 4 sugestões
- [ ] Baseado em categoria
- [ ] Link para cada produto

### SEO
- [ ] Meta tags dinâmicas
- [ ] Open Graph tags
- [ ] Schema.org markup (Product)
- [ ] Canonical URL
- [ ] Alt text em imagens

---

## 🛒 Fase 4: Carrinho e Checkout

### Carrinho (Sidebar/Modal)
- [ ] Componente CartDrawer
- [ ] Lista de itens no carrinho
- [ ] Imagem miniatura de cada item
- [ ] Nome e preço
- [ ] Seletor de quantidade (+/-)
- [ ] Botão remover item
- [ ] Subtotal por item
- [ ] Subtotal geral
- [ ] Desconto aplicado
- [ ] Total final
- [ ] Botão "Finalizar compra"
- [ ] Botão "Continuar comprando"
- [ ] Empty state (carrinho vazio)
- [ ] Animações de entrada/saída

### Estado do Carrinho
- [ ] Context API ou Zustand
- [ ] Persistência no localStorage
- [ ] Adicionar item
- [ ] Remover item
- [ ] Atualizar quantidade
- [ ] Limpar carrinho
- [ ] Calcular totais
- [ ] Aplicar cupom de desconto

### Página de Checkout
- [ ] Rota `/loja/checkout`
- [ ] Proteção de rota (requer itens no carrinho)
- [ ] Stepper de progresso (3 etapas)
- [ ] Etapa 1: Dados pessoais
- [ ] Etapa 2: Agendamento
- [ ] Etapa 3: Pagamento
- [ ] Resumo do pedido (sidebar)
- [ ] Validação de formulários (Zod)
- [ ] Mensagens de erro claras

### Formulário de Dados
- [ ] Nome completo
- [ ] CPF (com máscara)
- [ ] E-mail
- [ ] Telefone (com máscara)
- [ ] Data de nascimento
- [ ] Endereço (se necessário)
- [ ] Checkbox de termos
- [ ] Validação em tempo real

### Agendamento
- [ ] Seleção de unidade
- [ ] Calendário de datas disponíveis
- [ ] Horários disponíveis
- [ ] Indicador de lotação
- [ ] Confirmação visual da seleção

### Pagamento
- [ ] Opções de pagamento
- [ ] Cartão de crédito
- [ ] PIX
- [ ] Boleto
- [ ] Integração com gateway
- [ ] Formulário de cartão seguro
- [ ] QR Code para PIX
- [ ] Código de barras para boleto

### Confirmação
- [ ] Página de sucesso
- [ ] Número do pedido
- [ ] Resumo do agendamento
- [ ] Instruções de preparo
- [ ] Botão "Baixar comprovante"
- [ ] E-mail de confirmação
- [ ] WhatsApp de confirmação (opcional)

---

## 🤖 Fase 5: Upload de Receituário (IA)

### Interface de Upload
- [ ] Modal/Página de upload
- [ ] Drag & drop zone
- [ ] Botão "Selecionar arquivo"
- [ ] Preview da imagem
- [ ] Suporte a múltiplos formatos (JPG, PNG, PDF)
- [ ] Validação de tamanho (max 5MB)
- [ ] Validação de tipo de arquivo
- [ ] Barra de progresso do upload
- [ ] Mensagens de erro

### Processamento
- [ ] Integração com API de OCR/IA
- [ ] Loading state durante processamento
- [ ] Animação de "analisando"
- [ ] Timeout de 30s
- [ ] Retry automático em caso de erro
- [ ] Fallback manual

### Resultados
- [ ] Lista de exames detectados
- [ ] Checkbox para cada exame
- [ ] Opção de adicionar/remover exames
- [ ] Busca manual de exames não detectados
- [ ] Preço total calculado
- [ ] Botão "Adicionar ao carrinho"
- [ ] Opção de salvar receita

### Histórico
- [ ] Lista de receitas enviadas
- [ ] Data de upload
- [ ] Status (processada/erro)
- [ ] Opção de reprocessar
- [ ] Opção de deletar

---

## 🎨 Melhorias Visuais e UX

### Animações
- [ ] Fade in ao carregar página
- [ ] Slide in para cards
- [ ] Hover effects suaves
- [ ] Loading skeletons
- [ ] Transições de página
- [ ] Animação do carrinho
- [ ] Toast notifications

### Acessibilidade
- [ ] Navegação por teclado
- [ ] Focus visible em todos elementos
- [ ] ARIA labels adequados
- [ ] Alt text em imagens
- [ ] Contraste de cores adequado
- [ ] Tamanho de fonte legível
- [ ] Suporte a screen readers

### Performance
- [ ] Lazy loading de imagens
- [ ] Code splitting por rota
- [ ] Prefetch de links
- [ ] Otimização de bundle
- [ ] Cache de dados
- [ ] Service Worker (PWA)
- [ ] Lighthouse score > 90

---

## 🔧 Integrações e APIs

### Backend/APIs
- [ ] API de produtos
- [ ] API de busca
- [ ] API de carrinho
- [ ] API de checkout
- [ ] API de pagamento
- [ ] API de agendamento
- [ ] API de upload (IA)
- [ ] API de usuário

### Serviços Externos
- [ ] Gateway de pagamento
- [ ] Serviço de OCR/IA
- [ ] Serviço de e-mail
- [ ] Serviço de SMS/WhatsApp
- [ ] Google Analytics
- [ ] Facebook Pixel
- [ ] Hotjar/Clarity

---

## 📱 Responsividade

### Breakpoints Testados
- [ ] Mobile (320px - 480px)
- [ ] Mobile Large (481px - 767px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1025px - 1440px)
- [ ] Desktop Large (1441px+)

### Dispositivos Testados
- [ ] iPhone SE
- [ ] iPhone 12/13/14
- [ ] iPhone 14 Pro Max
- [ ] Samsung Galaxy S21
- [ ] iPad
- [ ] iPad Pro
- [ ] Desktop 1920x1080
- [ ] Desktop 2560x1440

---

## 🧪 Testes

### Testes Unitários
- [ ] Componentes de UI
- [ ] Funções utilitárias
- [ ] Hooks customizados
- [ ] Store/Context

### Testes de Integração
- [ ] Fluxo de compra completo
- [ ] Adicionar ao carrinho
- [ ] Aplicar cupom
- [ ] Finalizar checkout
- [ ] Upload de receita

### Testes E2E
- [ ] Jornada do usuário completa
- [ ] Diferentes cenários de pagamento
- [ ] Tratamento de erros
- [ ] Performance

---

## 🚀 Deploy e Produção

### Preparação
- [ ] Variáveis de ambiente configuradas
- [ ] Build de produção testado
- [ ] Otimização de assets
- [ ] Compressão de imagens
- [ ] Minificação de código
- [ ] Source maps configurados

### Deploy
- [ ] Deploy em staging
- [ ] Testes em staging
- [ ] Deploy em produção
- [ ] Smoke tests em produção
- [ ] Monitoramento ativo
- [ ] Rollback plan

### Monitoramento
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Analytics configurado
- [ ] Alertas configurados
- [ ] Logs centralizados

---

## 📊 Métricas de Sucesso

### KPIs
- [ ] Taxa de conversão
- [ ] Valor médio do pedido
- [ ] Taxa de abandono de carrinho
- [ ] Tempo médio de checkout
- [ ] Taxa de erro
- [ ] Core Web Vitals
- [ ] Satisfação do usuário (NPS)

---

**Última atualização:** Fase 1 Concluída ✅
**Próximo milestone:** Fase 2 - Catálogo de Produtos

# 🚀 Início Rápido - Loja Anacli

```
   ___                    ___   _     
  / _ \                  / __| | |    
 / /_\ \_ __   __ _  ___| |    | |    
 |  _  | '_ \ / _` |/ __| |    | |    
 | | | | | | | (_| | (__| |___ | |___ 
 \_| |_/_| |_|\__,_|\___|\____/ \_____/
                                       
 E-commerce de Exames Laboratoriais
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## ⚡ 3 Passos para Ver Funcionando

### 1️⃣ Mover para o Next.js (5 segundos)

```bash
# Windows (CMD)
move loja-anacli src\app\loja

# Windows (PowerShell)
Move-Item loja-anacli src/app/loja

# Linux/Mac
mv loja-anacli src/app/loja
```

### 2️⃣ Iniciar o servidor (se não estiver rodando)

```bash
npm run dev
```

### 3️⃣ Abrir no navegador

```
http://localhost:3000/loja
```

**Pronto! 🎉** A loja está funcionando!

---

## 📱 O que você vai ver

### Header (Topo)
```
┌─────────────────────────────────────────────────────┐
│  [Logo]    [🔍 Buscar exames...]    [👤] [🛒 0]    │
└─────────────────────────────────────────────────────┘
```

### Hero Section
```
┌──────────────────────┬──────────────────────┐
│                      │                      │
│  Realize seu exame   │  Pacotes em Destaque │
│                      │                      │
│  [🔍 Buscar...]      │  ┌─────────────────┐ │
│                      │  │ Check-up        │ │
│  [📤 Envie seu       │  │ R$ 189,90       │ │
│      receituário]    │  └─────────────────┘ │
│                      │                      │
│  ✓ Resultados 24h    │  ┌─────────────────┐ │
│  ✓ Certificado ISO   │  │ Perfil Hormonal │ │
│                      │  │ R$ 249,90       │ │
└──────────────────────┴──────────────────────┘
```

### Banner de IA
```
┌─────────────────────────────────────────────────────┐
│  ✨ Novidade no Anacli                              │
│                                                     │
│  Envie a foto da sua receita                       │
│  Nossa IA lê automaticamente e agenda em segundos  │
│                                                     │
│  [📷 Experimentar]  [⚡ Saiba mais]                │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 Testando Responsividade

### Desktop (> 1024px)
- Hero em 2 colunas lado a lado
- Busca no header
- Layout completo

### Tablet (768px - 1024px)
- Hero começando a empilhar
- Layout intermediário

### Mobile (< 768px)
- Hero empilhado verticalmente
- Busca abaixo do header
- Cards em coluna única

**Teste:** Redimensione a janela do navegador para ver as mudanças!

---

## 🔧 Personalizações Rápidas

### Mudar Cores

Edite `src/app/globals.css`:

```css
:root {
  --primary: 68 68% 45%;    /* Verde Oliva */
  --accent: 335 100% 50%;   /* Magenta */
}
```

### Adicionar Imagens Reais

Substitua os gradientes em `loja-anacli/components/HeroSection.tsx`:

```tsx
<Image
  src="/assets/produtos/checkup.webp"
  alt="Check-up Completo"
  fill
  className="object-cover"
/>
```

### Mudar Textos

Edite diretamente os componentes:
- `ShopHeader.tsx` - Textos do header
- `HeroSection.tsx` - Título e descrições
- `AIBanner.tsx` - Textos do banner

---

## 📚 Documentação Completa

| Arquivo | Para que serve |
|---------|----------------|
| 📄 **README.md** | Visão geral do projeto |
| 🎯 **CHECKLIST.md** | Lista completa de tarefas |
| 🔗 **INTEGRACAO.md** | Guia técnico detalhado |
| 👀 **COMO_VISUALIZAR.md** | Opções de visualização |
| 📊 **RESUMO_EXECUTIVO.md** | Resumo para gestão |
| ⚡ **INICIO_RAPIDO.md** | Este arquivo |

---

## 🎯 Próximos Passos

Depois de visualizar e testar:

1. **Ajustar visuais** (se necessário)
   - Cores
   - Espaçamentos
   - Textos

2. **Adicionar ao menu principal**
   ```tsx
   // src/components/Header.tsx
   <Link href="/loja">Loja de Exames</Link>
   ```

3. **Iniciar Fase 2** (Catálogo)
   - Grid de produtos
   - Filtros
   - Busca funcional

---

## 💡 Dicas Úteis

### DevTools do Navegador
- **F12** - Abrir DevTools
- **Ctrl + Shift + M** - Toggle device toolbar (testar mobile)
- **Ctrl + Shift + C** - Inspecionar elemento

### Atalhos do Next.js
- **Ctrl + C** - Parar servidor
- **npm run dev** - Iniciar servidor
- **npm run build** - Build de produção

### Testar Performance
```bash
npm run build
npm run start
```

Depois acesse: https://pagespeed.web.dev/

---

## ❓ Problemas Comuns

### Erro: "Cannot find module"
```bash
# Instalar dependências
npm install
```

### Erro: "Port 3000 already in use"
```bash
# Usar outra porta
npm run dev -- -p 3001
```

### Estilos não aparecem
```bash
# Limpar cache do Next.js
npm run clean
npm run dev
```

---

## 🎉 Tudo Pronto!

Você agora tem:

✅ E-commerce funcional
✅ Design moderno e profissional
✅ Código limpo e escalável
✅ Documentação completa
✅ Pronto para próximas fases

---

## 📞 Precisa de Ajuda?

1. Consulte a documentação completa
2. Verifique o CHECKLIST.md
3. Revise o INTEGRACAO.md

---

**Desenvolvido para Anacli** 🧪💚

```
┌─────────────────────────────────────┐
│                                     │
│  Fase 1: ✅ CONCLUÍDA               │
│  Fase 2: ⏳ Próxima                 │
│                                     │
│  Boa sorte com o projeto! 🚀       │
│                                     │
└─────────────────────────────────────┘
```

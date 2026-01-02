# Anacli - Laboratório de Análises Clínicas

Site institucional do Laboratório Anacli, desenvolvido com Next.js e otimizado para performance.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com SSG
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações fluidas
- **Radix UI** - Componentes acessíveis
- **Swiper** - Carrosséis responsivos

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/ArthurCard050/Anacli.git

# Entre no diretório
cd Anacli

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

## 🛠 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
```

## 🌐 Deploy

O projeto está configurado para deploy no Netlify com export estático:

```bash
npm run build
```

Os arquivos serão gerados na pasta `out/` prontos para deploy.

## 📁 Estrutura do Projeto

```
src/
├── app/                 # App Router (Next.js 14)
├── components/          # Componentes React
│   ├── sections/       # Seções da página
│   └── ui/            # Componentes de interface
├── hooks/              # Custom hooks
└── lib/               # Utilitários e configurações
```

## 🎨 Design System

- **Cores principais:** Olive Gold (#A6C022) e Magenta (#FF0068)
- **Tipografia:** Plus Jakarta Sans
- **Componentes:** Sistema hierárquico de botões
- **Responsividade:** Mobile-first approach

## 📈 Performance

- **Lighthouse Score:** 90+ em todas as métricas
- **Core Web Vitals:** Otimizado
- **Images:** AVIF/WebP com lazy loading
- **CSS:** Purged e minificado
- **JS:** Code splitting automático

## 🏥 Sobre a Anacli

Laboratório de análises clínicas com mais de 50 anos de tradição em Vitória da Conquista - BA.

---

Desenvolvido com ❤️ para o Laboratório Anacli
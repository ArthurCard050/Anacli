# Plano de Refatoração de UI - Estilo "Clean Card" (Inspirado no Mercado Livre)

## Objetivo
Transformar a interface atual do e-commerce em um design limpo, minimalista e focado em conversão. A cor da marca deve ser rebaixada a uma cor de "acento" (usada apenas em botões primários e links importantes), enquanto a estrutura principal utilizará fundos neutros e blocos brancos (cards) para separar as sessões.

## 1. Design Tokens (Variáveis Globais)
A IA deve declarar e utilizar estritamente este padrão de cores, espaçamentos e tipografia em todo o CSS/Tailwind:

* **Background Principal da Página:** `#EBEBEB` (Cinza muito claro, padrão do fundo da tela).
* **Background dos Cards/Sessões:** `#FFFFFF` (Branco puro).
* **Cor da Marca (Accent):** (Utilizar o Ciano/Cor da marca atual). Aplicar APENAS em botões de ação principal (ex: "Comprar agora") e ícones de destaque.
* **Texto Principal:** `#333333` (Para títulos e textos de destaque).
* **Texto Secundário:** `#666666` (Para descrições, preços antigos riscadinhos, textos de apoio).
* **Bordas:** `1px solid #E0E0E0` (Usar no lugar de sombras pesadas).
* **Border Radius (Arredondamento):** * Cards e Containers principais: `6px` a `8px`.
    * Botões e Inputs: `4px`.
* **Sombras (Box Shadow):** Remover todas as sombras pesadas. Se necessário para elevação (ex: menu fixo), usar um micro-shadow muito sutil: `0 1px 2px 0 rgba(0,0,0,0.05)`.

## 2. Padrões de Componentes

### A. Cards de Produto e Sessões (Frames)
* **Regra:** Nenhuma sessão flutua solta no fundo. Todo agrupamento de informação (carrossel, lista de produtos, detalhes do usuário) deve estar dentro de um container com fundo `#FFFFFF`, bordas arredondadas (`8px`) e um padding interno confortável (ex: `16px` ou `24px`).
* **Separação:** Garantir uma margem externa (gap) de no mínimo `16px` entre um card/sessão e outro, deixando o fundo cinza (`#EBEBEB`) vazar e criar a separação visual.

### B. Header / Topbar
* **Regra:** O header não deve ser um bloco gigante com a cor da marca. Ele deve ter fundo Branco (`#FFFFFF`) ou um fundo neutro suave. A logomarca e uma barra de pesquisa limpa (fundo cinza muito claro, borda sutil) devem ser o destaque.

### C. Botões
* **Primário:** Cor de fundo (Ciano/Cor da marca), texto branco, sem borda, arredondamento `4px`. Font-weight bold ou semi-bold.
* **Secundário/Fantasma:** Fundo transparente, texto azul (estilo link do ML) ou texto na cor neutra.

## 3. Plano de Execução Passo a Passo (Instrução para a IA)

A IA deve executar as tarefas abaixo ESTRITAMENTE na ordem, uma de cada vez. Ao finalizar um passo, a IA deve revisar seu próprio código, garantir que não quebrou a responsividade e aguardar a confirmação do usuário antes de passar para o próximo passo.

* **[ Passo 1 ] Configuração Global:** Criar/atualizar o arquivo de variáveis CSS ou configuração do framework (Tailwind/Styled Components) com as cores e espaçamentos do item 1.
* **[ Passo 2 ] Fundo e Header:** Mudar o `background-color` do `body`/`main` para o cinza claro (`#EBEBEB`). Refatorar o Header principal para fundo branco, removendo o excesso da cor da marca e ajustando a barra de pesquisa para um padrão clean.
* **[ Passo 3 ] Refatoração das Sessões de Banner/Topo:** Transformar a área de banners principais em um layout contido, com cantos arredondados, margens laterais e sem poluição visual no fundo.
* **[ Passo 4 ] Componentização de Cards (Vitrine/Produtos):** Padronizar a listagem de produtos. Cada produto deve ser um card branco, com borda muito sutil ou sem borda, imagem com padding, título e preço padronizados.
* **[ Passo 5 ] Banners Promocionais e Áreas de Ação (ex: "Envie a foto da sua receita"):** Remover o fundo vibrante gigante. Colocar o conteúdo dentro de um card branco enorme. Se for necessário destaque, usar um background pastel (versão super clara da cor da marca) apenas dentro do card, mantendo textos escuros para legibilidade.
* **[ Passo 6 ] Ajuste Fino e Tipografia:** Revisar a hierarquia de fontes de todo o site. Padronizar títulos e preços para que fiquem consistentes, usando `font-weight` para dar destaque ao invés de cores gritantes.
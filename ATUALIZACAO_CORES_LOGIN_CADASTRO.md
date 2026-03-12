# Atualização das Cores - Login e Cadastro

## Alterações Realizadas

### Problema
As telas de login e cadastro estavam usando cores roxas (`violet-400`) em elementos como:
- Links "Esqueci minha senha"
- Links "Criar Conta" / "Fazer Login"
- Links "Termos de Uso" e "Política de Privacidade"
- Bordas dos inputs em foco

### Solução
Substituição das cores roxas pelo magenta da marca (`--brand-accent: #FF0068`).

### Arquivos Alterados

#### 1. `src/components/ui/sign-in.tsx`
- **GlassInputWrapper**: `focus-within:border-violet-400/70` → `focus-within:border-primary/70`
- **GlassInputWrapper**: `focus-within:bg-violet-500/10` → `focus-within:bg-primary/10`
- **Link "Esqueci minha senha"**: `text-violet-400` → `text-primary`
- **Link "Criar Conta"**: `text-violet-400` → `text-primary`

#### 2. `src/components/ui/sign-up.tsx`
- **GlassInputWrapper**: `focus-within:border-violet-400/70` → `focus-within:border-primary/70`
- **GlassInputWrapper**: `focus-within:bg-violet-500/10` → `focus-within:bg-primary/10`
- **Links "Termos de Uso" e "Política de Privacidade"**: `text-violet-400` → `text-primary`
- **Link "Fazer Login"**: `text-violet-400` → `text-primary`

### Cores Utilizadas
- **Magenta da marca**: `hsl(335 100% 50%)` (#FF0068)
- **Variável CSS**: `--brand-accent` / `--primary`

### Resultado
- Consistência visual com a identidade da marca Anacli
- Inputs com bordas magenta quando em foco
- Links e elementos interativos em magenta
- Checkboxes já estavam corretos (usando `--primary`)

## Status
✅ **Concluído** - Todas as cores roxas foram substituídas pelo magenta da marca.
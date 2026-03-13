# Integração com API de Autenticação

## Visão Geral

O sistema de login e pedidos está integrado com a API backend em `http://localhost:3001`.

## Rotas Integradas

### 1. Autenticação - `/auth/login`

#### Credenciais de Teste

```json
{
  "login": "teste@example.com",
  "password": "senha123"
}
```

#### Resposta da API

```json
{
  "msg": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": 2,
    "username": "usuario_teste",
    "email": "teste@example.com"
  }
}
```

### 2. Pedidos - `/orders`

#### Requisição

```typescript
GET /orders
Headers: {
  "Authorization": "Bearer {token}"
}
```

#### Resposta da API

```json
[
  {
    "id": "123",
    "userId": 2,
    "total": 197.55,
    "status": "completed",
    "paymentStatus": "paid",
    "paymentMethod": "credit_card",
    "shippingAddressId": null,
    "createdAt": "2026-03-13T00:07:21.999Z",
    "updatedAt": "2026-03-13T00:07:21.999Z",
    "items": [
      {
        "id": 5,
        "orderId": "3b7d6c1a-be78-4a2f-ab77-187cb9a6dfb5",
        "examId": 3,
        "quantity": 1,
        "price": 48,
        "exam": {
          "id": 3,
          "rotulo": "17  ALFA HIDROXI PG",
          "descricao_completa": "17 - ALFA - HIDROXI PROGESTERONA",
          "preco": 48,
          "userId": 1,
          "created_at": "2026-01-24T16:16:29.171Z",
          "preparationInfo": "JEJUM DE 8 HORAS;Evitar exercício físico.",
          "shortDescription": "17-OH Progesterona",
          "longDescription": "Hormônio esteroide precursor do cortisol",
          "slug": null,
          "category": "HORMÔNIOS"
        }
      }
    ]
  }
]
```

## Armazenamento

- **Token JWT**: Armazenado em `localStorage` com a chave `anacli-token`
- **Dados do Usuário**: Armazenados em `localStorage` com a chave `anacli-user`

## Fluxo de Autenticação

1. Usuário preenche email e senha
2. Sistema faz POST para `/auth/login` com `{ login, password }`
3. Se sucesso (status 200):
   - Token é armazenado no localStorage
   - Dados do usuário são armazenados no localStorage
   - Usuário é redirecionado para `/usuario/minha-conta/pedidos`
4. Se falha (status 4xx/5xx):
   - Mensagem de erro é exibida: "Email ou senha incorretos"

## Fluxo de Pedidos

1. Após login, o sistema busca os pedidos do usuário
2. Faz GET para `/orders` com token JWT no header
3. Transforma os dados da API para o formato do frontend:
   - `paymentMethod`: Converte códigos para nomes legíveis
   - `items`: Extrai informações dos exames
   - `total`: Converte para número
4. Exibe os pedidos ordenados por data (mais recentes primeiro)

## Mapeamento de Status

### Status do Pedido
- `pending`: Aguardando pagamento
- `confirmed`: Pagamento confirmado
- `processing`: Em andamento
- `completed`: Concluído
- `cancelled`: Cancelado

### Status de Pagamento
- `pending`: Aguardando
- `paid`: Pago
- `failed`: Falhou
- `refunded`: Reembolsado

### Métodos de Pagamento
- `credit_card`: Cartão de Crédito
- `debit_card`: Cartão de Débito
- `pix`: PIX
- `boleto`: Boleto
- `cash`: Dinheiro

## Uso do Token em Requisições

Para fazer requisições autenticadas, use os utilitários em `src/app/usuario/utils/api.ts`:

```typescript
import { apiGet, apiPost, getAuthToken } from '@/app/usuario/utils/api';

// GET autenticado
const pedidos = await apiGet('/orders');

// POST autenticado
const novoPedido = await apiPost('/orders', { items: [...] });

// Obter token manualmente
const token = getAuthToken();
```

## Logout

O logout remove tanto o token quanto os dados do usuário do localStorage:

```typescript
const { logout } = useAuth();
logout(); // Remove 'anacli-token' e 'anacli-user'
```

## Variáveis de Ambiente

A URL da API é configurada no arquivo `.env`:

```env
NEXT_PUBLIC_VARIAVEL_API_URL="http://localhost:3001"
```

## Estrutura de Arquivos

```
src/app/usuario/
├── context/
│   └── AuthContext.tsx          # Contexto de autenticação com integração API
├── login/
│   └── LoginPageContent.tsx     # Componente de login
├── minha-conta/
│   └── pedidos/
│       └── MeusPedidosContent.tsx  # Componente de pedidos integrado
├── utils/
│   └── api.ts                   # Utilitários para requisições autenticadas
└── types/
    └── index.ts                 # Tipos TypeScript
```

# 🏗️ Arquitetura da API

## Diagrama Visual

```
┌─────────────────────────────────────────────────────────────┐
│                     SUA APLICAÇÃO                           │
│                (Web, Mobile, Desktop)                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Requests (JSON)
                         │
    ┌────────────────────▼────────────────────┐
    │   SERVIDOR EXPRESS (Node.js)             │
    │   🖥️ http://localhost:3000               │
    └──┬──────────────────────────────────┬───┘
       │                                  │
   ┌───▼────────┐              ┌─────────▼──────┐
   │  /api/     │              │   /api/        │
   │  chatgpt   │              │   perplexity   │
   │            │              │                │
   └───┬────────┘              └────────┬───────┘
       │                               │
   ┌───▼──────────────────────┐   ┌────▼──────────────────┐
   │  OpenAI API              │   │  Perplexity API       │
   │  📡 api.openai.com       │   │  📡 api.perplexity.ai │
   │                          │   │                       │
   │  • GPT-3.5-turbo         │   │  • PPLX-7B            │
   │  • GPT-4                 │   │  • PPLX-70B           │
   │  • GPT-4-turbo           │   │  • Llama-2-70B        │
   └──────────────────────────┘   └───────────────────────┘
```

## Fluxo de Requisição

```
1. Cliente envia POST request
   ↓
2. Express middleware valida
   ↓
3. Busca chave de API em .env
   ↓
4. Faz requisição para ChatGPT ou Perplexity
   ↓
5. Recebe resposta da IA
   ↓
6. Formata resposta JSON
   ↓
7. Retorna ao cliente
```

## Estrutura de Pasta

```
api-integracao/
│
├── 📄 server.js                 (Servidor principal)
├── 📄 package.json              (Dependências)
├── 📄 .env                      (Variáveis de ambiente) 🔐
├── 📄 .gitignore                (Git ignore)
│
├── 📚 Documentação
│   ├── README.md                (Documentação completa)
│   ├── QUICK-REFERENCE.md       (Referência rápida)
│   ├── ARQUITETURA.md           (Este arquivo)
│   ├── INTEGRACAO-EXTERNOS.md   (Deploy + integrações)
│   └── exemplo-uso.js           (Exemplos de código)
│
├── 🧪 Testes
│   ├── teste.js                 (Script de teste)
│   └── postman-collection.json  (Collection Postman)
│
└── 📦 node_modules/            (Dependências instaladas)
```

## Endpoints Disponíveis

### 1️⃣ GET /
```
Health Check
├─ Resposta: Status da API
└─ Uso: Verificar se servidor está online
```

### 2️⃣ POST /api/chatgpt
```
ChatGPT
├─ Input: { message, model }
├─ Output: { source, message, usage }
└─ Modelos: gpt-3.5-turbo, gpt-4, gpt-4-turbo
```

### 3️⃣ POST /api/perplexity
```
Perplexity
├─ Input: { message, model }
├─ Output: { source, message, usage }
└─ Modelos: pplx-7b-chat, pplx-70b-chat, llama-2-70b-chat
```

### 4️⃣ POST /api/combine
```
Ambas as IAs (Paralelo)
├─ Input: { message }
├─ Output: { results: { chatgpt, perplexity } }
└─ Benefício: Comparar respostas
```

## Tecnologias Utilizadas

```
🟢 Node.js          - Runtime JavaScript
⚡ Express.js       - Framework web
📡 Axios            - HTTP client
🔐 dotenv           - Variáveis de ambiente
🌐 CORS             - Cross-Origin Resource Sharing
```

## Fluxo de Dados Detalhado

```
Cliente HTTP
    │
    ├─ POST /api/chatgpt
    │  │
    │  ├─ Valida JSON
    │  ├─ Busca OPENAI_API_KEY em .env
    │  ├─ Faz POST para https://api.openai.com/v1/chat/completions
    │  ├─ Recebe resposta JSON
    │  ├─ Formata: { source, model, message, usage }
    │  └─ Retorna 200 OK
    │
    ├─ POST /api/perplexity
    │  │
    │  ├─ Valida JSON
    │  ├─ Busca PERPLEXITY_API_KEY em .env
    │  ├─ Faz POST para https://api.perplexity.ai/chat/completions
    │  ├─ Recebe resposta JSON
    │  ├─ Formata: { source, model, message, usage }
    │  └─ Retorna 200 OK
    │
    └─ POST /api/combine
       │
       ├─ Valida JSON
       ├─ Promise.allSettled para ambas as APIs (paralelo)
       ├─ Aguarda respostas
       ├─ Formata: { results: { chatgpt, perplexity } }
       └─ Retorna 200 OK
```

## Tratamento de Erros

```
Erro                    → Código HTTP    → Resposta
─────────────────────────────────────────────────────
Message vazio           → 400 Bad Request
Chave não configurada   → 500 Server Error
API indisponível        → 500 Server Error
Endpoint não existe     → 404 Not Found
Request inválida        → 400 Bad Request
Timeout na API externa  → 500 Server Error
```

## Segurança

```
🔒 Camadas de Segurança
├─ Variáveis de ambiente (.env)
├─ Validação de entrada
├─ CORS configurável
├─ Rate limiting (recomendado)
├─ HTTPS em produção
├─ Autenticação JWT (opcional)
└─ Logging de requisições
```

## Performance

```
Métrica              Esperado
──────────────────────────────
Latência             < 2s
Throughput           50+ req/min
Disponibilidade      99%+
Timeout              30s (APIs externas)
```

## Ambiente de Desenvolvimento vs Produção

```
┌─────────────────────┬──────────────────────┐
│   Desenvolvimento   │      Produção        │
├─────────────────────┼──────────────────────┤
│ PORT: 3000          │ PORT: 80/443         │
│ NODE_ENV: dev       │ NODE_ENV: production │
│ No rate limit       │ Rate limiting ativo  │
│ Logs no console     │ Logs em arquivo      │
│ CORS: *             │ CORS: específico     │
│ Sem autenticação    │ JWT ativo            │
│ Sem HTTPS           │ HTTPS obrigatório    │
└─────────────────────┴──────────────────────┘
```

## Integrações Possíveis

```
Sua API pode ser integrada com:

📱 Frontend
├─ React
├─ Vue
└─ Angular

💻 Backend
├─ Python (FastAPI, Flask)
├─ Java (Spring)
├─ C# (.NET)
└─ Go (Gin)

☁️ Cloud
├─ Railway
├─ Vercel
├─ Heroku
├─ AWS
└─ Google Cloud

🤖 Plataformas IA
├─ Codex
├─ Make/Zapier
├─ Perplexity (direto)
└─ ChatGPT (plugins)

📊 Dados
├─ MongoDB
├─ PostgreSQL
├─ Firebase
└─ Firestore
```

## Exemplos de Uso

```javascript
// Frontend React
const [response, setResponse] = useState('');

const callAPI = async (message) => {
  const res = await fetch('http://localhost:3000/api/combine', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  const data = await res.json();
  setResponse(data);
};
```

```python
# Backend Python
import requests

response = requests.post(
  'http://localhost:3000/api/chatgpt',
  json={'message': 'Olá'}
)
print(response.json()['message'])
```

## Roadmap Futuro

```
v1.0 (Atual)
├─ Endpoints básicos
├─ ChatGPT + Perplexity
└─ Deploy simples

v1.1 (Próximo)
├─ Autenticação JWT
├─ Rate limiting
└─ Logging

v1.2
├─ Banco de dados
├─ Histórico de conversas
└─ WebSocket para real-time

v2.0
├─ Múltiplas IAs
├─ Streaming de respostas
└─ Dashboard de uso
```

---

Arquitetura simples, escalável e pronta para produção! 🚀

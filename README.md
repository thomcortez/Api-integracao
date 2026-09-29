# API de Integração ChatGPT + Perplexity

Uma API REST completa para integrar ChatGPT e Perplexity em suas aplicações.

## 🚀 Quick Start

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar chaves de API

Edite o arquivo `.env` e adicione suas chaves:
```env
OPENAI_API_KEY=sua_chave_openai
PERPLEXITY_API_KEY=sua_chave_perplexity
PORT=3000
```

**Como obter as chaves:**
- **ChatGPT/OpenAI**: https://platform.openai.com/api-keys
- **Perplexity**: https://www.perplexity.ai/api

### 3. Iniciar a API
```bash
npm start
```

Ou em modo desenvolvimento com auto-reload:
```bash
npm run dev
```

A API estará disponível em: `http://localhost:3000`

## 📝 Endpoints

### 1. Health Check
```
GET http://localhost:3000/
```
**Resposta:**
```json
{
  "status": "API rodando ✅",
  "message": "Integração ChatGPT + Perplexity",
  "endpoints": { ... }
}
```

### 2. ChatGPT
```
POST http://localhost:3000/api/chatgpt
```

**Body (JSON):**
```json
{
  "message": "Sua pergunta aqui",
  "model": "gpt-3.5-turbo"
}
```

**Resposta:**
```json
{
  "source": "ChatGPT",
  "model": "gpt-3.5-turbo",
  "message": "Resposta do ChatGPT...",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 50,
    "total_tokens": 60
  }
}
```

### 3. Perplexity
```
POST http://localhost:3000/api/perplexity
```

**Body (JSON):**
```json
{
  "message": "Sua pergunta aqui",
  "model": "pplx-7b-chat"
}
```

**Resposta:**
```json
{
  "source": "Perplexity",
  "model": "pplx-7b-chat",
  "message": "Resposta do Perplexity...",
  "usage": { ... }
}
```

### 4. API Combinada (ambas as respostas)
```
POST http://localhost:3000/api/combine
```

**Body (JSON):**
```json
{
  "message": "Sua pergunta aqui"
}
```

**Resposta:**
```json
{
  "source": "Combinado",
  "message": "Sua pergunta aqui",
  "results": {
    "chatgpt": "Resposta do ChatGPT...",
    "perplexity": "Resposta do Perplexity..."
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🧪 Testando a API

Use o arquivo de teste incluído:
```bash
npm install axios  # Se ainda não está instalado
node teste.js
```

## 📚 Exemplos com cURL

### ChatGPT
```bash
curl -X POST http://localhost:3000/api/chatgpt \
  -H "Content-Type: application/json" \
  -d '{"message":"Olá, como você está?"}'
```

### Perplexity
```bash
curl -X POST http://localhost:3000/api/perplexity \
  -H "Content-Type: application/json" \
  -d '{"message":"Qual é a capital da Itália?"}'
```

### Combinado
```bash
curl -X POST http://localhost:3000/api/combine \
  -H "Content-Type: application/json" \
  -d '{"message":"Explique IA em uma frase"}'
```

## 🔧 Configuração Avançada

### Variáveis de Ambiente
```env
PORT=3000                    # Porta da API
NODE_ENV=development        # development ou production
OPENAI_API_KEY=...          # Chave OpenAI
PERPLEXITY_API_KEY=...      # Chave Perplexity
```

### Modelos Suportados

**ChatGPT:**
- `gpt-4`
- `gpt-3.5-turbo` (padrão)
- `gpt-4-turbo`

**Perplexity:**
- `pplx-7b-chat` (padrão)
- `pplx-70b-chat`
- `llama-2-70b-chat`

## 🌐 Deploy

### Heroku
```bash
git init
git add .
git commit -m "Initial commit"
heroku create seu-app-name
git push heroku main
```

### Docker
```bash
docker build -t api-ia .
docker run -p 3000:3000 --env-file .env api-ia
```

### Railway / Render
1. Push para GitHub
2. Conecte seu repositório na plataforma
3. Defina as variáveis de ambiente
4. Deploy automático

## ⚠️ Segurança

- **Nunca** commit do arquivo `.env` com chaves reais
- Use variáveis de ambiente em produção
- Implemente rate limiting em produção
- Valide todas as entradas do usuário

## 📦 Estrutura de Pastas

```
api-integracao/
├── server.js          # Servidor principal
├── teste.js           # Script de teste
├── package.json       # Dependências
├── .env               # Variáveis de ambiente
├── .gitignore        # Git ignore
└── README.md         # Este arquivo
```

## 🐛 Troubleshooting

### "OPENAI_API_KEY não configurada"
- Verifique se o arquivo `.env` existe
- Confirme que a chave está correta
- Reinicie o servidor

### "Erro ao comunicar com ChatGPT"
- Verifique sua internet
- Confirme que a chave OpenAI é válida
- Verifique cotas de API na dashboard OpenAI

### Porta 3000 já está em uso
- Mude a porta no `.env`: `PORT=3001`
- Ou mate o processo: `lsof -ti:3000 | xargs kill -9`

## 📄 Licença

MIT

## 💡 Próximos Passos

- [ ] Adicionar autenticação
- [ ] Implementar rate limiting
- [ ] Adicionar banco de dados para histórico
- [ ] Webhook support
- [ ] Streaming de respostas
- [ ] Multi-language support

---

Desenvolvido com ❤️ para integração de IAs

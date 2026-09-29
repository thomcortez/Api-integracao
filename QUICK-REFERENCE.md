# 🚀 Quick Reference - API ChatGPT + Perplexity

## Status Atual ✅
- **Servidor:** Rodando em `http://localhost:3000`
- **Status:** `API rodando ✅`
- **Ambiente:** Development

---

## 📍 Endpoints Rápidos

### 1️⃣ Health Check
```bash
curl http://localhost:3000
```

### 2️⃣ ChatGPT
```bash
curl -X POST http://localhost:3000/api/chatgpt \
  -H "Content-Type: application/json" \
  -d '{"message":"Olá!"}'
```

### 3️⃣ Perplexity
```bash
curl -X POST http://localhost:3000/api/perplexity \
  -H "Content-Type: application/json" \
  -d '{"message":"Qual é a capital da França?"}'
```

### 4️⃣ Combinado (ambas as IAs)
```bash
curl -X POST http://localhost:3000/api/combine \
  -H "Content-Type: application/json" \
  -d '{"message":"Explique machine learning"}'
```

---

## 🔑 Configuração de Chaves

**Arquivo:** `.env`

```env
PORT=3000
OPENAI_API_KEY=sk-...seu-codigo-openai...
PERPLEXITY_API_KEY=pplx-...seu-codigo-perplexity...
NODE_ENV=development
```

**Obter chaves:**
- OpenAI: https://platform.openai.com/api-keys
- Perplexity: https://www.perplexity.ai/api

---

## 📦 Comandos Úteis

| Comando | O que faz |
|---------|-----------|
| `npm start` | Inicia a API |
| `npm run dev` | Inicia com auto-reload (watch) |
| `npm install` | Instala dependências |
| `node teste.js` | Executa testes |
| `ps aux \| grep node` | Lista processos Node |
| `lsof -i :3000` | Vê o que está usando porta 3000 |

---

## 🧪 Exemplos JavaScript

### Fetch Simple
```javascript
const response = await fetch('http://localhost:3000/api/chatgpt', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Olá!' })
});
const data = await response.json();
console.log(data.message);
```

### Axios
```javascript
import axios from 'axios';

const response = await axios.post('http://localhost:3000/api/combine', {
  message: 'Sua pergunta'
});

console.log('ChatGPT:', response.data.results.chatgpt);
console.log('Perplexity:', response.data.results.perplexity);
```

---

## 🌐 Deploy Rápido (Railway)

```bash
# 1. Instale Railway CLI
npm install -g railway

# 2. Login
railway login

# 3. Deploy
railway up

# 4. Configure variáveis
railway variables set OPENAI_API_KEY=sua_chave
railway variables set PERPLEXITY_API_KEY=sua_chave

# 5. URL será gerada automaticamente
# Exemplo: https://meu-projeto.up.railway.app
```

---

## 📊 Resposta Típica

```json
{
  "source": "ChatGPT",
  "model": "gpt-3.5-turbo",
  "message": "Olá! Sou um assistente IA...",
  "usage": {
    "prompt_tokens": 5,
    "completion_tokens": 50,
    "total_tokens": 55
  }
}
```

---

## 🐛 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Porta 3000 em uso | `lsof -ti:3000 \| xargs kill -9` |
| Chave não funciona | Verifique em `.env` se está correta |
| Erro de conexão | Revise firewall/proxy |
| API retorna 500 | Verifique logs e variáveis de ambiente |

---

## 🎯 Próximas Etapas

1. **✅ Configurar chaves** no `.env`
2. **✅ Testar endpoints** com curl ou Postman
3. **✅ Integrar** em sua aplicação
4. **✅ Deploy** em cloud (Railway, Heroku, etc)
5. **✅ Monitorar** performance e erros

---

## 📚 Arquivos Importantes

- `server.js` - Servidor principal
- `.env` - Variáveis de ambiente
- `package.json` - Dependências
- `README.md` - Documentação completa
- `teste.js` - Script de testes
- `INTEGRACAO-EXTERNOS.md` - Guia de deploy e integrações

---

## 💡 Dicas Pro

- Use `/api/combine` para comparar respostas
- ChatGPT é melhor para criatividade
- Perplexity é melhor para pesquisa
- Implemente rate limiting em produção
- Log todas as requisições importantes
- Use JWT para autenticação

---

**API Ativa e Pronta! 🎉**

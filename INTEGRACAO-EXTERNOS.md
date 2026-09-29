# Integrações Externas - Cloud, Codex, Perplexity e Outros

## 📌 Visão Geral

Seu projeto de API pode ser integrado com múltiplas plataformas e serviços. Aqui estão as opções:

---

## 🌐 Deploy em Cloud

### 1. **Railway** (Recomendado - Fácil e Gratuito)

```bash
# 1. Instale CLI do Railway
npm install -g railway

# 2. Login
railway login

# 3. Link seu projeto
railway link

# 4. Deploy
railway up

# 5. Configure variáveis de ambiente
railway variables set OPENAI_API_KEY=sua_chave
railway variables set PERPLEXITY_API_KEY=sua_chave
```

**URL:** `https://seu-projeto.up.railway.app`

### 2. **Vercel**

```bash
# Instale Vercel CLI
npm install -g vercel

# Deploy
vercel
```

**Nota:** Vercel é melhor para serverless. Crie arquivo `vercel.json`:
```json
{
  "buildCommand": "npm install",
  "outputDirectory": ".",
  "functions": {
    "server.js": {
      "runtime": "nodejs-18.x"
    }
  }
}
```

### 3. **Heroku**

```bash
# Instale Heroku CLI
brew tap heroku/brew && brew install heroku

# Login
heroku login

# Crie app
heroku create seu-app-name

# Configure variáveis
heroku config:set OPENAI_API_KEY=sua_chave
heroku config:set PERPLEXITY_API_KEY=sua_chave

# Deploy
git push heroku main
```

### 4. **Google Cloud Run** (Containerizado)

```bash
# Crie Dockerfile
cat > Dockerfile << 'EOF'
FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
EOF

# Build e deploy
gcloud run deploy api-ia --source . --platform managed
```

### 5. **AWS (EC2 + PM2)**

```bash
# SSH na instância
ssh -i sua-chave.pem ec2-user@seu-ec2-url

# Instale Node
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Clone repo
git clone seu-repositorio
cd api-integracao

# Instale dependências
npm install
npm install -g pm2

# Configure .env
nano .env

# Inicie com PM2
pm2 start server.js --name "api-ia"
pm2 startup
pm2 save
```

---

## 🤖 Integração com Codex (GitHub Copilot)

### Usar sua API no Codex

Crie um `.github/copilot-suggestions.json`:

```json
{
  "suggestions": [
    {
      "name": "Gerar com ChatGPT",
      "api_endpoint": "https://seu-dominio.com/api/chatgpt",
      "method": "POST",
      "description": "Usa ChatGPT para gerar código"
    },
    {
      "name": "Pesquisar com Perplexity",
      "api_endpoint": "https://seu-dominio.com/api/perplexity",
      "method": "POST",
      "description": "Usa Perplexity para pesquisar"
    }
  ]
}
```

### Plugin do VSCode com sua API

Crie `vscode-extension/extension.js`:

```javascript
const vscode = require('vscode');
const axios = require('axios');

exports.activate = function(context) {
  let disposable = vscode.commands.registerCommand('extension.callApi', async () => {
    const query = await vscode.window.showInputBox({
      prompt: 'Qual é sua pergunta?'
    });

    try {
      const response = await axios.post(
        'https://seu-dominio.com/api/combine',
        { message: query }
      );

      vscode.window.showInformationMessage(
        `ChatGPT: ${response.data.results.chatgpt}\n\nPerplexity: ${response.data.results.perplexity}`
      );
    } catch (error) {
      vscode.window.showErrorMessage('Erro ao chamar API');
    }
  });

  context.subscriptions.push(disposable);
};
```

---

## 🔍 Integração com Perplexity

### API Wrapper para Perplexity

Sua API já integra Perplexity! Use assim:

```javascript
// Em qualquer aplicação
const response = await fetch('https://seu-dominio.com/api/perplexity', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Sua pergunta aqui'
  })
});

const data = await response.json();
console.log(data.message);
```

### Chamar Perplexity Diretamente (Alternativa)

```javascript
// Direto da API Perplexity
const response = await fetch('https://api.perplexity.ai/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'pplx-7b-chat',
    messages: [{ role: 'user', content: 'Sua pergunta' }]
  })
});
```

---

## 📱 Integração com Aplicações Mobile

### React Native
```javascript
import axios from 'axios';

const fetchResponse = async (message) => {
  try {
    const { data } = await axios.post(
      'https://seu-dominio.com/api/combine',
      { message }
    );
    return data.results;
  } catch (error) {
    console.error(error);
  }
};
```

### Flutter/Dart
```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<Map> fetchResponse(String message) async {
  final response = await http.post(
    Uri.parse('https://seu-dominio.com/api/combine'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({'message': message}),
  );
  
  if (response.statusCode == 200) {
    return jsonDecode(response.body);
  } else {
    throw Exception('Erro');
  }
}
```

---

## 🔐 Segurança para Produção

### 1. Adicione Autenticação (JWT)

```javascript
import jwt from 'jsonwebtoken';

app.post('/api/chatgpt', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Sem token' });
  
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    // Continuar com a lógica
  } catch (error) {
    res.status(403).json({ error: 'Token inválido' });
  }
});
```

### 2. Rate Limiting

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // 100 requisições por IP
});

app.use('/api/', limiter);
```

### 3. CORS Restritivo

```javascript
app.use(cors({
  origin: ['https://seu-dominio.com'],
  credentials: true
}));
```

---

## 📊 Monitoramento

### Sentry (Rastreamento de Erros)

```javascript
import Sentry from "@sentry/node";

Sentry.init({ dsn: "sua-chave-sentry" });

app.get('/', (req, res) => {
  try {
    // sua lógica
  } catch (error) {
    Sentry.captureException(error);
  }
});
```

### LogRocket (Session Replay)

```javascript
import LogRocket from 'logrocket';
LogRocket.init('seu-app-id');
```

---

## 🚀 Checklist de Deploy

- [ ] Arquivo `.env` com todas as chaves
- [ ] `.gitignore` configurado
- [ ] Testes locais funcionando
- [ ] README atualizado
- [ ] Variáveis de ambiente no serviço de cloud
- [ ] CORS configurado
- [ ] Rate limiting ativado
- [ ] Logging configurado
- [ ] HTTPS/SSL ativado
- [ ] Backup automático

---

## 📝 Comando Rápido para Deploy

```bash
# 1. Commit e push
git add .
git commit -m "API ready for production"
git push

# 2. Railway (mais fácil)
railway up

# 3. Acesse
curl https://seu-projeto.up.railway.app
```

Pronto! Sua API está online! 🎉

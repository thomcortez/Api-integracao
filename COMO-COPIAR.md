# 📋 Como Copiar Sua API para Outros Locais/Serviços

## 🖥️ Copiar para Outro Computador

### Opção 1: Via GitHub (Recomendado)

```bash
# 1. Crie repositório no GitHub
git init
git add .
git commit -m "Initial API commit"
git remote add origin https://github.com/seu-usuario/api-integracao.git
git branch -M main
git push -u origin main

# 2. No outro computador
git clone https://github.com/seu-usuario/api-integracao.git
cd api-integracao
npm install
# Edite .env com suas chaves
npm start
```

### Opção 2: Via USB/Compartilhamento

```bash
# Comprimir projeto
zip -r api-integracao.zip api-integracao/ --exclude "node_modules/*" ".git/*"

# Copiar para USB
cp api-integracao.zip /media/seu-usb/

# No outro computador
unzip api-integracao.zip
cd api-integracao
npm install
npm start
```

### Opção 3: Via SSH/SCP

```bash
# De um computador para outro via SSH
scp -r /home/user/api-integracao usuario@outro-pc:/home/usuario/

# SSH no outro PC
ssh usuario@outro-pc
cd /home/usuario/api-integracao
npm install
npm start
```

---

## ☁️ Copiar para Cloud

### Railway (Mais Fácil)

```bash
# 1. Push para GitHub
git push origin main

# 2. Conecte Railway ao repositório
# - Vá para railway.app
# - Clique "Create new project"
# - Selecione seu repositório GitHub
# - Railway detecta automaticamente Node.js

# 3. Configure variáveis de ambiente
# No painel Railway:
# Add Variable: OPENAI_API_KEY = sua_chave
# Add Variable: PERPLEXITY_API_KEY = sua_chave

# 4. Deploy automático ao fazer push
git push origin main  # Pronto!
```

### Vercel

```bash
# 1. Instale Vercel CLI
npm install -g vercel

# 2. Deploy
cd /home/user/api-integracao
vercel

# 3. Responda às perguntas
# Project: api-integracao
# Framework: Other
# Output: .

# 4. Configure variáveis
vercel env add OPENAI_API_KEY
vercel env add PERPLEXITY_API_KEY
vercel --prod
```

### Heroku

```bash
# 1. Instale Heroku CLI
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh

# 2. Login
heroku login

# 3. Crie app
heroku create seu-app-name

# 4. Configure variáveis
heroku config:set OPENAI_API_KEY=sua_chave
heroku config:set PERPLEXITY_API_KEY=sua_chave

# 5. Deploy via Git
git push heroku main
```

### Google Cloud Run

```bash
# 1. Instale Google Cloud SDK
curl https://sdk.cloud.google.com | bash

# 2. Faça login
gcloud auth login

# 3. Configure projeto
gcloud config set project seu-projeto-id

# 4. Deploy
gcloud run deploy api-integracao \
  --source . \
  --platform managed \
  --region us-central1

# 5. Quando pedir variáveis de ambiente
gcloud run services update api-integracao \
  --set-env-vars OPENAI_API_KEY=sua_chave
```

### AWS EC2

```bash
# 1. Conecte à instância
ssh -i sua-chave.pem ec2-user@seu-ip

# 2. Instale Node
sudo yum update -y
sudo yum install -y nodejs npm

# 3. Clone repositório
git clone https://github.com/seu-usuario/api-integracao.git
cd api-integracao

# 4. Instale dependências
npm install

# 5. Configure .env
echo "OPENAI_API_KEY=sua_chave" > .env
echo "PERPLEXITY_API_KEY=sua_chave" >> .env

# 6. Instale PM2 (gerenciador)
npm install -g pm2

# 7. Inicie
pm2 start server.js --name "api"
pm2 startup
pm2 save

# 8. Acesse via: http://seu-ip:3000
```

---

## 📱 Copiar para Aplicação Mobile

### React Native

```bash
# 1. Copie URL da API (após deploy)
const API_URL = "https://seu-app.railway.app";

# 2. No projeto React Native
npm install axios

# 3. Use em um componente
import axios from 'axios';

const queryAPI = async (message) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/combine`,
      { message }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
```

### Flutter/Dart

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

const apiUrl = "https://seu-app.railway.app";

Future<Map> queryAPI(String message) async {
  final response = await http.post(
    Uri.parse('$apiUrl/api/combine'),
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

### Swift (iOS)

```swift
import Foundation

let apiURL = "https://seu-app.railway.app"

func queryAPI(message: String, completion: @escaping (String) -> Void) {
    let url = URL(string: "\(apiURL)/api/combine")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    
    let body = ["message": message]
    request.httpBody = try? JSONSerialization.data(withJSONObject: body)
    
    URLSession.shared.dataTask(with: request) { data, response, error in
        if let data = data {
            let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
            completion(json?["message"] as? String ?? "Erro")
        }
    }.resume()
}
```

---

## 🐍 Copiar para Projetos Python

### Django Integration

```python
# api_integration/views.py
import requests
from django.http import JsonResponse

API_URL = "http://localhost:3000"

def query_api(request):
    message = request.POST.get('message')
    
    response = requests.post(
        f'{API_URL}/api/combine',
        json={'message': message}
    )
    
    return JsonResponse(response.json())
```

### FastAPI Integration

```python
# main.py
from fastapi import FastAPI
import httpx

app = FastAPI()
API_URL = "http://localhost:3000"

@app.post("/query")
async def query(message: str):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f'{API_URL}/api/combine',
            json={'message': message}
        )
    return response.json()
```

---

## 🔧 Copiar para Docker

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - PERPLEXITY_API_KEY=${PERPLEXITY_API_KEY}
      - NODE_ENV=production
```

### Usar

```bash
# Build
docker build -t api-integracao .

# Run
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sua_chave \
  -e PERPLEXITY_API_KEY=sua_chave \
  api-integracao

# Ou com docker-compose
docker-compose up -d
```

---

## 📦 Copiar para NPM Package

Publique sua API como pacote NPM para reutilização:

### Arquivo: `package.json`

```json
{
  "name": "@seu-usuario/api-integracao",
  "version": "1.0.0",
  "main": "server.js",
  "exports": {
    ".": "./server.js"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

### Publicar

```bash
# 1. Login no NPM
npm login

# 2. Publish
npm publish

# 3. Usar em outro projeto
npm install @seu-usuario/api-integracao

# No código
const apiServer = require('@seu-usuario/api-integracao');
```

---

## 🎁 Template para Copiar Fácil

```bash
# Script: copy-api.sh
#!/bin/bash

API_PATH="/home/user/api-integracao"
DEST=$1

cp -r $API_PATH $DEST/
cd $DEST/api-integracao

# Remove node_modules (volta a baixar)
rm -rf node_modules

echo "✅ API copiada para: $DEST"
echo "📦 Instale dependências: cd $DEST/api-integracao && npm install"
```

Use:
```bash
chmod +x copy-api.sh
./copy-api.sh /caminho/destino
```

---

## ✅ Checklist de Cópia

- [ ] Copiar todos os arquivos (exceto node_modules)
- [ ] Garantir .env está preenchido
- [ ] Instalar npm install
- [ ] Testar localmente
- [ ] Fazer push para GitHub
- [ ] Deploy em Cloud (Railway/Heroku/etc)
- [ ] Testar endpoint remoto
- [ ] Configurar variáveis no Cloud
- [ ] Validar CORS para produção

---

**Escolha o método que melhor se adequa ao seu caso! 🎯**

# 🚀 Deploy na Railway (Passo a Passo)

## ⚡ Por que Railway?

✅ Grátis (até $5/mês)  
✅ Deploy em 2 minutos  
✅ Suporta Node.js automaticamente  
✅ Variáveis de ambiente fáceis  
✅ URL pública permanente  
✅ Deploy automático ao fazer push

---

## 📋 PRÉ-REQUISITOS

- [ ] Conta GitHub (ou criar uma grátis)
- [ ] Conta Railway (grátis em railway.app)
- [ ] Suas chaves de API (OpenAI + Perplexity)

---

## 🎯 PASSO 1: Enviar para GitHub

### 1.1 Criar repositório no GitHub

```bash
# Já fizemos git init e commit, agora:

# 1. Vá para https://github.com/new
# 2. Crie um repositório chamado: api-integracao
# 3. Copie o URL (ex: https://github.com/seu-usuario/api-integracao.git)
```

### 1.2 Push para GitHub

```bash
cd /home/user/api-integracao

# Configure Git (primeira vez apenas)
git config --global user.email "seu-email@gmail.com"
git config --global user.name "Seu Nome"

# Conecte ao repositório GitHub
git remote add origin https://github.com/seu-usuario/api-integracao.git
git branch -M main
git push -u origin main

# Resultado esperado: "✅ Branch 'main' set up to track 'origin/main'"
```

**Verificar:** Vá a github.com/seu-usuario/api-integracao - seus arquivos devem estar lá! ✅

---

## 🌐 PASSO 2: Deploy na Railway

### 2.1 Conectar Railway ao GitHub

1. Vá para **https://railway.app**
2. Clique em **"Create New Project"**
3. Escolha **"Deploy from GitHub"**
4. Autorize Railway a acessar seu GitHub
5. Selecione o repositório: **api-integracao**
6. Railway vai detectar automaticamente que é Node.js

### 2.2 Configurar Variáveis de Ambiente

Railway vai abrir um painel. Você precisa adicionar suas chaves:

```
1. Clique em "Variables"
2. Clique em "New Variable"

Adicione:
  • PORT = 3000
  • OPENAI_API_KEY = sk-...sua-chave-openai...
  • PERPLEXITY_API_KEY = pplx-...sua-chave-perplexity...
  • NODE_ENV = production

3. Clique "Deploy"
```

### 2.3 Aguarde o Deploy

- Você verá um log em tempo real
- Procure por: `✅ Deployment successful`
- Quando aparecer, clique em "View Logs" para ver detalhes

---

## 🔗 PASSO 3: Obter URL Pública

Após o deploy:

1. Vá para a aba **"Deployments"**
2. Clique no deploy bem-sucedido
3. Você verá um URL como:
   ```
   https://api-integracao-production.up.railway.app
   ```

**SALVE ESTE URL! ⭐** É sua API pública!

---

## ✅ TESTAR A API PÚBLICA

### Teste 1: Health Check
```bash
curl https://seu-url-railway.app
```

### Teste 2: ChatGPT
```bash
curl -X POST https://seu-url-railway.app/api/chatgpt \
  -H "Content-Type: application/json" \
  -d '{"message":"Olá!"}'
```

### Teste 3: Perplexity
```bash
curl -X POST https://seu-url-railway.app/api/perplexity \
  -H "Content-Type: application/json" \
  -d '{"message":"Qual é a capital da França?"}'
```

### Teste 4: Combinado
```bash
curl -X POST https://seu-url-railway.app/api/combine \
  -H "Content-Type: application/json" \
  -d '{"message":"Explique IA em uma frase"}'
```

---

## 📱 USAR EM SEUS APPS

Agora que sua API está pública, você pode usar em:

### MacBook / iPhone
```javascript
const API_URL = "https://seu-url-railway.app";

// Chamar a API de qualquer lugar
const response = await fetch(`${API_URL}/api/combine`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Sua pergunta' })
});
```

### Perplexity / Codex
Use o URL no arquivo de integração:
```
https://seu-url-railway.app/api/perplexity
```

### Postman
Importe `postman-collection.json` e mude:
- `{{base_url}}` para `https://seu-url-railway.app`

---

## 🔄 ATUALIZAR CÓDIGO

Sempre que fizer mudanças:

```bash
cd /home/user/api-integracao

git add .
git commit -m "Sua mensagem aqui"
git push origin main

# Railway faz deploy automaticamente! 🚀
```

---

## 🐛 TROUBLESHOOTING

### "Deployment failed"
- Verifique as variáveis de ambiente
- Confirme que as chaves são válidas
- Veja os logs em "View Logs"

### "404 Not Found"
- URL está incorreta?
- Railway ainda está fazendo deploy? Aguarde 2 min
- Tente: `curl https://seu-url-railway.app` (sem /api)

### "Cannot find module"
- Clique "Redeploy" no painel Railway
- Se persistir, faça `npm install` localmente e push

### API responde mas sem resultado
- Verifique variáveis de ambiente no Railway
- Confirme OPENAI_API_KEY e PERPLEXITY_API_KEY
- Teste localmente: `npm start`

---

## 💡 DICAS

1. **Compartilhar com outros:** Basta dar seu URL!
2. **Monitorar:** Railway mostra logs em tempo real
3. **Escalar:** Se tiver muito uso, Railway cobra conforme uso
4. **Domínio customizado:** Railway permite adicionar domínio próprio (pago)
5. **Backups:** GitHub é seu backup automático

---

## 🎯 CHECKLIST FINAL

- [ ] Repositório criado no GitHub
- [ ] Push feito (`git push origin main`)
- [ ] Railway conectado ao GitHub
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy concluído com sucesso
- [ ] URL pública obtida
- [ ] Testes com curl funcionando
- [ ] Integração com apps configurada
- [ ] Bookmark o URL da API! ⭐

---

## 📝 EXEMPLO DE URL FINAL

Quando tudo estiver pronto, você terá algo como:

```
🌐 https://api-integracao-production.up.railway.app

Endpoints:
  GET  https://api-integracao-production.up.railway.app/
  POST https://api-integracao-production.up.railway.app/api/chatgpt
  POST https://api-integracao-production.up.railway.app/api/perplexity
  POST https://api-integracao-production.up.railway.app/api/combine
```

Use este URL em:
- ✅ iPhone/MacBook
- ✅ Perplexity
- ✅ GitHub Codex
- ✅ Postman
- ✅ Aplicações mobile
- ✅ Qualquer lugar do mundo!

---

**Pronto! Sua API estará online e acessível de qualquer lugar! 🚀**

Se tiver dúvidas durante o deploy, verifique os logs no painel Railway.

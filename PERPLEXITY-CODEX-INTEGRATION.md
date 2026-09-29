# 🔗 Integração Perplexity, Codex e Plataformas Externas

## ✅ Compatibilidade da API

Sua API é **100% compatível** com:
- ✅ Perplexity (via API de integração)
- ✅ GitHub Codex (via webhook)
- ✅ Make/Zapier (automações)
- ✅ Google Cloud Functions
- ✅ AWS Lambda
- ✅ Azure Functions

---

## 🔍 Perplexity - Usar SUA API

### Opção 1: Chamar Direto do Perplexity

O Perplexity **NÃO** tem sistema de plugins nativo como ChatGPT, mas você pode:

**1. Via Custom Instructions (Prompt)**
```
Use meu endpoint de API para pesquisar:
POST http://localhost:3000/api/perplexity
JSON: {"message": "sua pergunta"}

Se o usuário fizer uma pergunta, use este endpoint.
```

**2. Via Perplexity API**
```bash
curl -X POST https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "pplx-7b-chat",
    "messages": [
      {"role": "user", "content": "Use meu endpoint http://localhost:3000"}
    ]
  }'
```

### Opção 2: Webhook Direto para Sua API

Configure Perplexity para chamar sua API automaticamente:

```json
{
  "webhook": "http://localhost:3000/api/perplexity",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  "payload": {
    "message": "{user_input}"
  }
}
```

---

## 🤖 GitHub Codex - Usar SUA API

### Opção 1: VSCode Extension (Recomendado)

Crie `.vscode/extensions/codex-api/extension.js`:

```javascript
const vscode = require('vscode');
const axios = require('axios');

module.exports = {
  activate(context) {
    let disposable = vscode.commands.registerCommand('extension.queryAPI', async () => {
      const query = await vscode.window.showInputBox({ prompt: 'Pergunta:' });
      
      try {
        const response = await axios.post(
          'http://localhost:3000/api/combine',
          { message: query }
        );

        const output = `
ChatGPT: ${response.data.results.chatgpt}

Perplexity: ${response.data.results.perplexity}
        `;

        vscode.window.showInformationMessage(output);
      } catch (error) {
        vscode.window.showErrorMessage('Erro ao chamar API');
      }
    });

    context.subscriptions.push(disposable);
  }
};
```

Use com: `Ctrl+Shift+P` → "Query API"

### Opção 2: GitHub Copilot Integration

Adicione ao `.github/copilot.json`:

```json
{
  "custom_instructions": "Quando o usuário pedir ajuda, use a API em http://localhost:3000/api/chatgpt",
  "endpoints": [
    {
      "name": "ChatGPT Local",
      "url": "http://localhost:3000/api/chatgpt",
      "method": "POST"
    },
    {
      "name": "Perplexity Local",
      "url": "http://localhost:3000/api/perplexity",
      "method": "POST"
    }
  ]
}
```

### Opção 3: CLI Command

Crie `bin/query-api.js`:

```javascript
#!/usr/bin/env node

const axios = require('axios');

async function query(message) {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/combine',
      { message }
    );

    console.log('\n🤖 ChatGPT:');
    console.log(response.data.results.chatgpt);
    
    console.log('\n🔍 Perplexity:');
    console.log(response.data.results.perplexity);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

query(process.argv[2] || 'Olá');
```

Use com: `node bin/query-api.js "Sua pergunta"`

---

## 🔌 Make / Zapier - Automações

### Passo 1: Criar Automação no Make

```
1. Vá para make.com
2. Crie novo cenário (scenario)
3. Adicione trigger (ex: novo email)
4. Adicione ação: HTTP Request
5. Configure:
   URL: http://localhost:3000/api/combine
   Method: POST
   Headers: Content-Type: application/json
   Body: {"message": "{{trigger_data}}"}
```

### Passo 2: Usar no Zapier

```
1. Vá para zapier.com
2. Crie novo Zap
3. Trigger: escolha seu serviço (Gmail, Slack, etc)
4. Action: Webhooks by Zapier
5. Configure POST para http://localhost:3000/api/chatgpt
6. Mapeie os dados: {"message": "{{data}}"}
```

### Exemplo: Slack → Sua API → Resposta no Slack

```json
Trigger: Slack - New Direct Message

Action 1: Webhooks - POST
  URL: http://localhost:3000/api/combine
  Data: {
    "message": "{{slack_message}}"
  }

Action 2: Slack - Send Message
  Channel: {{slack_channel}}
  Message: "{{webhook_response.results.chatgpt}}"
```

---

## ☁️ Cloud Platforms

### Google Cloud Functions

Crie `main.py`:

```python
import requests

def query_api(request):
    message = request.json.get('message')
    
    response = requests.post(
        'http://localhost:3000/api/chatgpt',
        json={'message': message}
    )
    
    return response.json()
```

Deploy:
```bash
gcloud functions deploy query_api \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated
```

### AWS Lambda

Crie `lambda_function.py`:

```python
import requests
import json

def lambda_handler(event, context):
    message = event.get('message')
    
    response = requests.post(
        'http://localhost:3000/api/perplexity',
        json={'message': message}
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps(response.json())
    }
```

Deploy com SAM:
```bash
sam deploy --guided
```

### Azure Functions

Crie `HttpTrigger.cs`:

```csharp
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

public static class HttpTrigger
{
    [FunctionName("QueryAPI")]
    public static async Task<IActionResult> Run(
        [HttpTrigger("post", Route = null)] HttpRequest req,
        ILogger log)
    {
        var message = req.Query["message"];
        
        using var client = new HttpClient();
        var response = await client.PostAsJsonAsync(
            "http://localhost:3000/api/combine",
            new { message }
        );
        
        return new OkObjectResult(await response.Content.ReadAsAsync<dynamic>());
    }
}
```

---

## 🚀 Exemplo: Pipeline Automático

**Fluxo:** Usuário escreve → GitHub Issue → API → Resposta automática

### Arquivo: `.github/workflows/api-issue-resolver.yml`

```yaml
name: API Issue Resolver

on:
  issues:
    types: [opened]

jobs:
  resolve:
    runs-on: ubuntu-latest
    steps:
      - name: Query API
        uses: actions/http-client@v1.0.0
        with:
          url: http://localhost:3000/api/combine
          method: POST
          headers: '{"Content-Type": "application/json"}'
          data: '{"message": "${{ github.event.issue.title }}"}'
        id: api_response

      - name: Comment with Response
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: 'Resposta: ${{ steps.api_response.outputs.result }}'
            })
```

---

## 📋 Checklist de Integração

### Para Perplexity
- [ ] Configurar webhook em Perplexity settings
- [ ] Testar chamada POST simples
- [ ] Validar formato de resposta JSON
- [ ] Implementar retry logic

### Para Codex/GitHub
- [ ] Instalar extension no VSCode
- [ ] Configurar `.github/copilot.json`
- [ ] Testar comando `Ctrl+Shift+P`
- [ ] Adicionar ao workflow automático

### Para Make/Zapier
- [ ] Criar conta e cenário
- [ ] Mapear dados corretamente
- [ ] Testar trigger → action → API
- [ ] Validar resposta final

### Para Cloud
- [ ] Deploy em plataforma cloud
- [ ] Configurar variáveis de ambiente
- [ ] Testar endpoint remoto
- [ ] Monitorar logs

---

## 🔐 Segurança para Integração Externa

```javascript
// Adicione autenticação à sua API
const API_KEY = process.env.EXTERNAL_API_KEY;

app.use((req, res, next) => {
  if (req.headers['x-api-key'] !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

Chame com:
```bash
curl -H "X-API-Key: sua-chave-segura" \
  http://localhost:3000/api/chatgpt \
  -d '{"message":"Olá"}'
```

---

## 📊 Comparação de Integrações

| Plataforma | Dificuldade | Tempo Setup | Custo | Recomendação |
|-----------|-----------|-----------|-------|-----------|
| Perplexity Direct | Fácil | 5 min | Grátis | ✅ Rápido |
| Codex Extension | Média | 15 min | Grátis | ✅ Bom |
| Make/Zapier | Fácil | 10 min | $10-50 | ✅ Automação |
| Google Cloud | Média | 20 min | Free tier | ✅ Escalável |
| AWS Lambda | Difícil | 30 min | Free tier | Para produção |
| Azure Functions | Média | 20 min | Free tier | Alternativa AWS |

---

## 💡 Dica: Testar Integração

```bash
# Teste antes de usar em produção
echo '{"message":"teste"}' | curl -X POST \
  -H "Content-Type: application/json" \
  -d @- \
  http://localhost:3000/api/combine

# Resultado esperado: respostas de ambas as IAs
```

---

**Sua API agora está pronta para trabalhar com qualquer plataforma! 🎉**

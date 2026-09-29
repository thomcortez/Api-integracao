# 📱 Como Usar Sua API em Qualquer Lugar

## 🎯 Objetivo
Sua API está pronta. Este guia mostra como usá-la:
- ✅ No MacBook
- ✅ No iPhone
- ✅ No Perplexity
- ✅ No GitHub Codex
- ✅ Em qualquer dispositivo/app

---

## 🚀 PASSO 1: Deploy na Nuvem

**Escolha uma opção:**

### Opção A: Railway (MAIS FÁCIL) ⭐
```
1. Siga: DEPLOY-RAILWAY.md
2. Resultado: URL pública em ~5 minutos
3. Exemplo: https://api-integracao.up.railway.app
```

### Opção B: Heroku
```
1. Instale: heroku-cli
2. Crie app: heroku create seu-app
3. Deploy: git push heroku main
4. Resultado: https://seu-app.herokuapp.com
```

### Opção C: Vercel
```
1. Instale: npm install -g vercel
2. Deploy: vercel
3. Resultado: https://seu-projeto.vercel.app
```

**→ Recomendação: Railway é o mais rápido!**

---

## 📍 SEU URL SERÁ ALGO COMO:
```
https://api-integracao-production.up.railway.app
```
**Salve este URL! Você vai usar em todos os lugares.**

---

## 🍎 USAR NO MacBook

### JavaScript / Web
```javascript
const API_URL = "https://api-integracao-production.up.railway.app";

async function askAI(question) {
  const response = await fetch(`${API_URL}/api/combine`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: question })
  });
  
  const data = await response.json();
  console.log('ChatGPT:', data.results.chatgpt);
  console.log('Perplexity:', data.results.perplexity);
}

askAI('Explique machine learning');
```

### Python / macOS
```python
import requests

API_URL = "https://api-integracao-production.up.railway.app"

def ask_ai(question):
    response = requests.post(
        f'{API_URL}/api/combine',
        json={'message': question}
    )
    data = response.json()
    print('ChatGPT:', data['results']['chatgpt'])
    print('Perplexity:', data['results']['perplexity'])

ask_ai('Olá!')
```

### Swift / macOS App
```swift
import Foundation

let API_URL = "https://api-integracao-production.up.railway.app"

func askAI(question: String, completion: @escaping (String) -> Void) {
    let url = URL(string: "\(API_URL)/api/combine")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    
    let body = ["message": question]
    request.httpBody = try? JSONSerialization.data(withJSONObject: body)
    
    URLSession.shared.dataTask(with: request) { data, _, _ in
        if let data = data,
           let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
           let results = json["results"] as? [String: String] {
            let response = "ChatGPT: \(results["chatgpt"] ?? "")\n\nPerplexity: \(results["perplexity"] ?? "")"
            completion(response)
        }
    }.resume()
}

askAI(question: "Olá!") { response in
    print(response)
}
```

---

## 📱 USAR NO iPhone / iOS

### SwiftUI App
```swift
import SwiftUI

@main
struct AIApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    @State var question = ""
    @State var response = ""
    @State var loading = false
    
    var body: some View {
        VStack {
            TextField("Sua pergunta...", text: $question)
                .textFieldStyle(.roundedBorder)
                .padding()
            
            Button(action: sendQuestion) {
                if loading {
                    ProgressView()
                } else {
                    Text("Enviar")
                }
            }
            .padding()
            .disabled(question.isEmpty || loading)
            
            ScrollView {
                Text(response)
                    .padding()
            }
        }
    }
    
    func sendQuestion() {
        loading = true
        let api = "https://api-integracao-production.up.railway.app"
        let url = URL(string: "\(api)/api/combine")!
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try? JSONSerialization.data(
            withJSONObject: ["message": question]
        )
        
        URLSession.shared.dataTask(with: request) { data, _, _ in
            DispatchQueue.main.async {
                loading = false
                if let data = data,
                   let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let results = json["results"] as? [String: String] {
                    response = "ChatGPT:\n\(results["chatgpt"] ?? "")\n\nPerplexity:\n\(results["perplexity"] ?? "")"
                }
            }
        }.resume()
    }
}
```

---

## 🤖 USAR NO Perplexity

### Método 1: Custom Instruction
```
Quando o usuário fizer uma pergunta, você pode chamar este endpoint:
POST https://api-integracao-production.up.railway.app/api/perplexity
JSON: {"message": "a pergunta do usuário"}

Use quando precisar de pesquisa detalhada.
```

### Método 2: Webhook (se Perplexity suportar)
```json
{
  "webhook_url": "https://api-integracao-production.up.railway.app/api/perplexity",
  "method": "POST",
  "trigger": "on_search"
}
```

### Método 3: Chamada Manual
Em qualquer chat do Perplexity, você pode usar:
```
Faça uma requisição POST para:
https://api-integracao-production.up.railway.app/api/combine

Com {"message": "minha pergunta"}
```

---

## 💻 USAR NO GitHub Codex / Copilot

### Criar Extension no VSCode

Arquivo: `.vscode/extensions/ask-ai/extension.js`

```javascript
const vscode = require('vscode');
const http = require('https');

const API_URL = "https://api-integracao-production.up.railway.app";

exports.activate = function(context) {
    let disposable = vscode.commands.registerCommand(
        'extension.askAI', 
        async () => {
            const question = await vscode.window.showInputBox({
                prompt: "Qual é sua pergunta?"
            });
            
            if (!question) return;
            
            try {
                const data = await fetch(`${API_URL}/api/combine`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: question })
                }).then(r => r.json());
                
                vscode.window.showInformationMessage(
                    `ChatGPT: ${data.results.chatgpt}\n\nPerplexity: ${data.results.perplexity}`
                );
            } catch (error) {
                vscode.window.showErrorMessage('Erro ao chamar API');
            }
        }
    );
    
    context.subscriptions.push(disposable);
};
```

Use com: `Ctrl+Shift+P` → "Ask AI"

---

## 🌐 USAR EM QUALQUER SITE

### HTML/JavaScript
```html
<!DOCTYPE html>
<html>
<head>
    <title>Meu App com IA</title>
</head>
<body>
    <input id="question" placeholder="Sua pergunta..." />
    <button onclick="askAI()">Perguntar</button>
    <div id="response"></div>
    
    <script>
        const API_URL = "https://api-integracao-production.up.railway.app";
        
        async function askAI() {
            const question = document.getElementById('question').value;
            const response = await fetch(`${API_URL}/api/combine`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: question })
            });
            
            const data = await response.json();
            document.getElementById('response').innerHTML = `
                <p><strong>ChatGPT:</strong> ${data.results.chatgpt}</p>
                <p><strong>Perplexity:</strong> ${data.results.perplexity}</p>
            `;
        }
    </script>
</body>
</html>
```

### React Component
```jsx
import React, { useState } from 'react';

export default function AIChat() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    
    const API_URL = "https://api-integracao-production.up.railway.app";
    
    const askAI = async () => {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/combine`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: question })
        });
        const data = await res.json();
        setResponse(data.results);
        setLoading(false);
    };
    
    return (
        <div>
            <input 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Sua pergunta..."
            />
            <button onClick={askAI} disabled={loading}>
                {loading ? 'Carregando...' : 'Enviar'}
            </button>
            {response && (
                <>
                    <p><strong>ChatGPT:</strong> {response.chatgpt}</p>
                    <p><strong>Perplexity:</strong> {response.perplexity}</p>
                </>
            )}
        </div>
    );
}
```

---

## 📊 USAR NO Postman

1. Abra Postman
2. Importe: `postman-collection.json`
3. Em cada request, mude:
   - `{{base_url}}` → `https://api-integracao-production.up.railway.app`
4. Teste!

---

## 🎯 USAR VIA cURL (Terminal)

```bash
# Health Check
curl https://api-integracao-production.up.railway.app

# ChatGPT
curl -X POST https://api-integracao-production.up.railway.app/api/chatgpt \
  -H "Content-Type: application/json" \
  -d '{"message":"Olá!"}'

# Perplexity
curl -X POST https://api-integracao-production.up.railway.app/api/perplexity \
  -H "Content-Type: application/json" \
  -d '{"message":"Qual é a capital da França?"}'

# Combinado
curl -X POST https://api-integracao-production.up.railway.app/api/combine \
  -H "Content-Type: application/json" \
  -d '{"message":"Explique IA"}'
```

---

## 🔒 SEGURANÇA

Para produção, implemente autenticação:

```bash
# Adicione header em todas as requisições
curl -H "X-API-Key: sua-chave-segura" \
  https://api-integracao-production.up.railway.app/api/combine \
  -d '{"message":"..."}'
```

---

## ✅ CHECKLIST FINAL

- [ ] Deploy concluído na Railway/Heroku/Vercel
- [ ] URL pública obtida
- [ ] Testou com curl
- [ ] Testou no MacBook
- [ ] Testou no iPhone
- [ ] Configurou Perplexity
- [ ] Configurou GitHub Codex
- [ ] Integrou em sua app
- [ ] Salvou o URL em lugar seguro ⭐

---

**Sua API está agora acessível em QUALQUER lugar do mundo! 🌍🚀**

Compartilhe o URL apenas com quem precisar - é sua API privada!

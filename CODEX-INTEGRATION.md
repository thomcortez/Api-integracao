# 🤖 Integração com GitHub Codex/VSCode

Sua API agora tem uma extensão completa para VSCode e GitHub Copilot!

---

## 📦 O Que Foi Criado

### Pasta: `/codex-extension/`

Uma extensão VSCode completa com:
- ✅ Integração direta com sua API
- ✅ 3 atalhos de teclado (ChatGPT, Perplexity, Ambos)
- ✅ Interface dentro do VSCode
- ✅ Configurável
- ✅ 100% Open Source

---

## 🚀 Instalação Rápida

### Opção 1: Automática (Recomendado)

```bash
cd api-integracao/codex-extension
bash install.sh
# Reinicie VSCode
# Pronto!
```

### Opção 2: Manual

```bash
# Clone o repositório
git clone https://github.com/thomcortez/Api-integracao.git
cd Api-integracao/codex-extension

# Instale
npm install
npm run esbuild

# Copie para VSCode
cp -r . ~/.vscode/extensions/api-integracao-codex

# Reinicie VSCode
```

---

## ⌨️ Como Usar

### Atalhos de Teclado

| Windows/Linux | Mac | Função |
|---|---|---|
| `Ctrl+Shift+G` | `Cmd+Shift+G` | Pergunta ao ChatGPT |
| `Ctrl+Shift+P` | `Cmd+Shift+P` | Pergunta ao Perplexity |
| `Ctrl+Shift+A` | `Cmd+Shift+A` | Pergunta a Ambos |

### Exemplo

```javascript
// 1. Selecione código
function fibonacci(n) {
  return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2);
}

// 2. Pressione Ctrl+Shift+G
// 3. Veja explicação do ChatGPT em nova aba!
```

---

## ⚙️ Configuração

### VSCode Settings

**Atalho:** `Ctrl+Comma` (ou `Cmd+,` no Mac)

Procure por: `api-integracao`

```json
{
  "api-integracao.endpoint": "https://seu-app.railway.app",
  "api-integracao.timeout": 30000,
  "api-integracao.model-chatgpt": "gpt-3.5-turbo",
  "api-integracao.model-perplexity": "pplx-7b-chat"
}
```

**Importante:** Defina o `endpoint` com sua URL da API (Railway, Heroku, etc)

---

## 📁 Estrutura da Extensão

```
codex-extension/
├── extension.ts              # Código principal (TypeScript)
├── .vscode-extension.json    # Manifest (configuração)
├── package.json              # Dependências
├── tsconfig.json             # Config TypeScript
├── install.sh                # Script instalação automática
├── CODEX-README.md           # Documentação completa
├── QUICK-START.md            # Quick start
└── .gitignore
```

---

## 🔧 Troubleshooting

### "Extensão não aparece"

```bash
# Recarregue VSCode
Ctrl+Shift+P → Developer: Reload Window
```

### "Erro de conexão"

1. Verifique se a API está rodando
2. Verifique a URL em Settings
3. Se usa Railway: copie URL correta com `https://`

### "Timeout"

Aumente em Settings:
```json
"api-integracao.timeout": 60000
```

---

## 📚 Mais Informações

- **Documentação Completa:** `codex-extension/CODEX-README.md`
- **Quick Start:** `codex-extension/QUICK-START.md`
- **Código da API:** `server.js`
- **Deploy API:** `DEPLOY-RAILWAY.md`

---

## 🎯 Próximos Passos

1. ✅ Instale a extensão (bash install.sh)
2. ✅ Configure o endpoint em VSCode Settings
3. ✅ Use os atalhos (Ctrl+Shift+G, etc)
4. ✅ Veja as respostas em abas novas!

---

## 💡 Dicas

- **Seleção + Atalho:** Selecione código e pressione o atalho
- **Sem Seleção:** Pressione atalho, digite sua pergunta
- **Paleta de Comandos:** `Ctrl+Shift+P` → "API: Ask..."
- **Comparar:** Use `Ctrl+Shift+A` para comparar respostas

---

**Pronto para usar! Instale a extensão e comece a programar com ajuda de IA! 🚀**

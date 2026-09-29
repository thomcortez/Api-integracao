// Exemplos de uso da API

// ============================================
// 1. Com Fetch (JavaScript/Node.js)
// ============================================

async function usarChatGPT() {
  const response = await fetch('http://localhost:3000/api/chatgpt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Explique o que é machine learning'
    })
  });

  const data = await response.json();
  console.log('ChatGPT:', data.message);
}

async function usarPerplexity() {
  const response = await fetch('http://localhost:3000/api/perplexity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Qual é a data de hoje?'
    })
  });

  const data = await response.json();
  console.log('Perplexity:', data.message);
}

async function usarCombinado() {
  const response = await fetch('http://localhost:3000/api/combine', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Qual é a importância da inteligência artificial?'
    })
  });

  const data = await response.json();
  console.log('ChatGPT:', data.results.chatgpt);
  console.log('Perplexity:', data.results.perplexity);
}

// ============================================
// 2. Com Python/Requests
// ============================================

const pythonExample = `
import requests

url = 'http://localhost:3000/api/chatgpt'
payload = {'message': 'Olá!'}

response = requests.post(url, json=payload)
data = response.json()
print(data['message'])
`;

// ============================================
// 3. Com cURL
// ============================================

const curlExample = \`
# ChatGPT
curl -X POST http://localhost:3000/api/chatgpt \\
  -H "Content-Type: application/json" \\
  -d '{"message":"Olá, como você está?"}'

# Perplexity
curl -X POST http://localhost:3000/api/perplexity \\
  -H "Content-Type: application/json" \\
  -d '{"message":"Qual é a capital da França?"}'

# Combinado
curl -X POST http://localhost:3000/api/combine \\
  -H "Content-Type: application/json" \\
  -d '{"message":"Explique IA em uma frase"}'
\`;

console.log(pythonExample);
console.log(curlExample);

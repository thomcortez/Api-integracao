import axios from 'axios';

const API_URL = 'http://localhost:3000';

async function testarAPI() {
  try {
    console.log('🧪 Testando API...\n');

    // Teste 1: Health Check
    console.log('1️⃣ Health Check:');
    const healthCheck = await axios.get(API_URL);
    console.log(healthCheck.data);
    console.log('\n---\n');

    // Teste 2: ChatGPT
    console.log('2️⃣ Testando ChatGPT:');
    try {
      const chatgptResponse = await axios.post(`${API_URL}/api/chatgpt`, {
        message: 'O que é inteligência artificial?'
      });
      console.log('Resposta:', chatgptResponse.data.message);
    } catch (err) {
      console.log('❌', err.response?.data?.error || err.message);
    }
    console.log('\n---\n');

    // Teste 3: Perplexity
    console.log('3️⃣ Testando Perplexity:');
    try {
      const perplexityResponse = await axios.post(`${API_URL}/api/perplexity`, {
        message: 'Qual é a capital da França?'
      });
      console.log('Resposta:', perplexityResponse.data.message);
    } catch (err) {
      console.log('❌', err.response?.data?.error || err.message);
    }
    console.log('\n---\n');

    // Teste 4: Combinado
    console.log('4️⃣ Testando API Combinada:');
    try {
      const combineResponse = await axios.post(`${API_URL}/api/combine`, {
        message: 'Explique machine learning em uma frase'
      });
      console.log('ChatGPT:', combineResponse.data.results.chatgpt);
      console.log('Perplexity:', combineResponse.data.results.perplexity);
    } catch (err) {
      console.log('❌', err.response?.data?.error || err.message);
    }

  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
  }
}

testarAPI();

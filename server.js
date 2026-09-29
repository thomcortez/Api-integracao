import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.json({
    status: 'API rodando ✅',
    message: 'Integração ChatGPT + Perplexity',
    endpoints: {
      chatgpt: 'POST /api/chatgpt',
      perplexity: 'POST /api/perplexity',
      combine: 'POST /api/combine'
    }
  });
});

// Endpoint ChatGPT
app.post('/api/chatgpt', async (req, res) => {
  try {
    const { message, model = 'gpt-3.5-turbo' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message é obrigatório' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY não configurada' });
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      source: 'ChatGPT',
      model,
      message: response.data.choices[0].message.content,
      usage: response.data.usage
    });
  } catch (error) {
    console.error('Erro ChatGPT:', error.message);
    res.status(500).json({
      error: 'Erro ao comunicar com ChatGPT',
      details: error.response?.data || error.message
    });
  }
});

// Endpoint Perplexity
app.post('/api/perplexity', async (req, res) => {
  try {
    const { message, model = 'pplx-7b-chat' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message é obrigatório' });
    }

    if (!process.env.PERPLEXITY_API_KEY) {
      return res.status(500).json({ error: 'PERPLEXITY_API_KEY não configurada' });
    }

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model,
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      source: 'Perplexity',
      model,
      message: response.data.choices[0].message.content,
      usage: response.data.usage
    });
  } catch (error) {
    console.error('Erro Perplexity:', error.message);
    res.status(500).json({
      error: 'Erro ao comunicar com Perplexity',
      details: error.response?.data || error.message
    });
  }
});

// Endpoint Combinado (ambas as APIs)
app.post('/api/combine', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message é obrigatório' });
    }

    const [chatgptResponse, perplexityResponse] = await Promise.allSettled([
      axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
          temperature: 0.7,
          max_tokens: 800
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      ),
      axios.post(
        'https://api.perplexity.ai/chat/completions',
        {
          model: 'pplx-7b-chat',
          messages: [{ role: 'user', content: message }],
          temperature: 0.7,
          max_tokens: 800
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      )
    ]);

    const results = {
      chatgpt: chatgptResponse.status === 'fulfilled'
        ? chatgptResponse.value.data.choices[0].message.content
        : 'Erro ao comunicar com ChatGPT',
      perplexity: perplexityResponse.status === 'fulfilled'
        ? perplexityResponse.value.data.choices[0].message.content
        : 'Erro ao comunicar com Perplexity'
    };

    res.json({
      source: 'Combinado',
      message,
      results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro ao combinar respostas:', error.message);
    res.status(500).json({
      error: 'Erro ao processar requisição combinada',
      details: error.message
    });
  }
});

// Erro 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n✅ API rodando em http://localhost:${PORT}`);
  console.log(`📝 Endpoints disponíveis:`);
  console.log(`   POST http://localhost:${PORT}/api/chatgpt`);
  console.log(`   POST http://localhost:${PORT}/api/perplexity`);
  console.log(`   POST http://localhost:${PORT}/api/combine\n`);
});

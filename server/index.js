const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Document = require('./models/Document');
const Anthropic = require('@anthropic-ai/sdk');

dotenv.config();

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error('ANTHROPIC_API_KEY is not defined in the .env file');
  process.exit(1);
}
console.log("apiKey", apiKey);
const client = new Anthropic({
    apiKey: apiKey, // This is the default and can be omitted
});
// Charger les variables d'environnement
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('API en cours d\'exécution');
});
const axios = require('axios');

async function callClaudeAPI(prompt) {
    console.log('Using API Key:', client.apiKey); // Log the key being used (be careful with this in production)
    console.log('Prompt:', prompt);

    const anthropic = new Anthropic();

    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
        temperature: 0,
        system: "Vous êtes un assistant de recherche",
        messages: [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    }
                ]
            }
        ]
    });
    console.log("msg", msg.content[0].text);
    return msg.content[0].text;
}
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        console.log('Received message:', message);

        console.log('Fetching documents...');
        const documents = await Document.find();
        console.log('Fetched documents:', documents.length);

        const context = documents.map(doc => doc.content).join('\n');

        const prompt = `
        Question : ${message}
        Réponse :`;

        console.log('Calling Claude API...');
        const llmResponse = await callClaudeAPI(prompt);
        console.log('LLM Response:', llmResponse);

        if (llmResponse === null) {
            console.warn('Received null response from Claude API');
            res.status(500).json({ error: 'Réponse invalide de l\'API Claude' });
        } else {
            res.json({ response: llmResponse });
        }
    } catch (error) {
        console.error('Error in /api/chat route:', error.message);
        console.error('Full error object:', error);
        res.status(500).json({ error: 'Erreur lors du traitement de la demande' });
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });




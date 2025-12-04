const axios = require('axios');

/**
 * @param {string} text
 * @returns {number[]} 
 */
async function generateEmbedding(text) {
    const OLLAMA_API_URL = process.env.OLLAMA_API_URL; 
    const OLLAMA_EMBEDDING_MODEL = process.env.OLLAMA_EMBEDDING_MODEL; 

    if (!OLLAMA_API_URL) {
        throw new Error("OLLAMA_API_URL is not set in environment variables (.env).");
    }
    
    const cleanedText = text.replace(/\n/g, " ");

    try {
        const response = await axios.post(
            OLLAMA_API_URL, 
            {
                model: OLLAMA_EMBEDDING_MODEL,
                prompt: cleanedText, 
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        
        return response.data.embedding; 

    } catch (error) {
        console.error("Ollama Embedding API Error:", error.response ? error.response.data : error.message);
        throw new Error("Failed to generate embedding from Ollama.");
    }
}

module.exports = {
    generateEmbedding
};
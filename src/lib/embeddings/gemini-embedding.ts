import { GoogleGenerativeAI } from '@google/generative-ai';

const VECTOR_DIMENSION = 768; // Gemini text-embedding-004 standard dimension

/**
 * Deterministic pseudo-embedding vector generator for fallback / offline testing
 */
function generateFallbackEmbedding(text: string): number[] {
  const vector: number[] = new Array(VECTOR_DIMENSION).fill(0);
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  for (let i = 0; i < VECTOR_DIMENSION; i++) {
    const val = Math.sin(hash + i * 0.1);
    vector[i] = parseFloat(val.toFixed(6));
  }

  // Normalize vector to unit length
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return vector.map((val) => (magnitude > 0 ? val / magnitude : 0));
}

/**
 * Abstracted Vector Embedding Service
 * Generates 768-dimensional embeddings using Google Gemini text-embedding-004
 */
export async function generateEmbedding(textToEmbed: string): Promise<number[]> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'your-google-gemini-api-key') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const embeddingModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });

      const result = await embeddingModel.embedContent(textToEmbed);
      if (result.embedding?.values && result.embedding.values.length > 0) {
        return result.embedding.values;
      }
    } catch (error: any) {
      console.warn('Gemini API Embedding generation warning, using fallback:', error?.message || error);
    }
  }

  // Fallback if API key is unconfigured or call fails
  return generateFallbackEmbedding(textToEmbed);
}

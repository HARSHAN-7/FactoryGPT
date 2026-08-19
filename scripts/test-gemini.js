const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY || '';

async function testGeminiModels() {
  if (!apiKey) {
    console.log('GEMINI_API_KEY environment variable is required.');
    return;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
  const result = await model.generateContent('Explain LOTO safety procedure in 2 sentences.');
  console.log(result.response.text());
}

testGeminiModels();

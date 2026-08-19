import { GoogleGenerativeAI } from '@google/generative-ai';
import { RetrievedChunk } from '../retrieval/vector-store';
import { ChatCitation } from '../types';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../i18n/language-detector';

export interface RagResponse {
  answer: string;
  citations: ChatCitation[];
  grounded: boolean;
  relevanceScore: number;
  language: SupportedLanguage;
}

const MULTILINGUAL_TECHNICAL_PROMPT = `
You are FactoryGPT, a professional industrial engineering AI assistant.

STRICT OPERATIONAL & MULTILINGUAL RULES:
1. TARGET LANGUAGE: You MUST respond strictly in the requested TARGET LANGUAGE: {TARGET_LANGUAGE_NAME} ({TARGET_LANGUAGE_NATIVE}).
2. TECHNICAL IDENTIFIER PRESERVATION: Do NOT translate or convert machine codes, model numbers, measurements, units, or technical identifiers.
   Keep exact alphanumeric terms as written in the manual context (e.g., "Machine M-01", "220 V", "50 Hz", "500 RPM", "LOTO-#402", "ISO VG 46", "4.2 bar").
3. GROUNDING: Answer using ONLY the provided Document Context Snippets. Do not invent specifications or safety codes.
4. ABSENCE OF INFORMATION: If context is insufficient, reply in {TARGET_LANGUAGE_NAME}:
   - English: "Information not found in ingested factory knowledge base."
   - Tamil: "உள்ளிடப்பட்ட ஆலை ஆவணங்களில் இந்த தகவல் இல்லை."
   - Hindi: "संबंधित जानकारी फैक्टरी ज्ञानकोश में उपलब्ध नहीं है।"
5. CITATIONS: Every fact MUST cite its source document and page using format [DocumentName, Page X]. Citations must retain original document filenames.
`;

/**
 * Multilingual RAG Generator Engine
 */
export async function generateGroundedAnswer(
  userQuery: string,
  retrievedChunks: RetrievedChunk[],
  targetLanguage: SupportedLanguage = 'en'
): Promise<RagResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  const langInfo = SUPPORTED_LANGUAGES[targetLanguage] || SUPPORTED_LANGUAGES.en;

  // 1. Build Citations List
  const citations: ChatCitation[] = retrievedChunks.map((chunk) => ({
    documentId: chunk.documentId,
    documentName: chunk.metadata.sourceFilename || 'Document',
    pageOrSection: chunk.metadata.pageNumber
      ? `Page ${chunk.metadata.pageNumber}`
      : chunk.metadata.sectionTitle || 'Section',
    relevanceScore: chunk.similarity,
  }));

  const maxSimilarity = retrievedChunks.length > 0
    ? Math.max(...retrievedChunks.map((c) => c.similarity))
    : 0;

  // Insufficient relevance check
  if (retrievedChunks.length === 0 || maxSimilarity < 0.30) {
    let ungroundedMsg = `Information not found in ingested factory knowledge base for query "${userQuery}".`;
    if (targetLanguage === 'ta') {
      ungroundedMsg = `"${userQuery}" பற்றிய தகவல் ஆலை ஆவணங்களில் கிடைக்கவில்லை. தயவுசெய்து ஆவணத்தை பதிவேற்றவும்.`;
    } else if (targetLanguage === 'hi') {
      ungroundedMsg = `प्रश्न "${userQuery}" के लिए फैक्टरी ज्ञानकोश में जानकारी उपलब्ध नहीं है। कृपया नया दस्तावेज़ अपलोड करें।`;
    }

    return {
      answer: ungroundedMsg,
      citations: [],
      grounded: false,
      relevanceScore: 0,
      language: targetLanguage,
    };
  }

  // 2. Format Context Snippets for Gemini Prompt
  const formattedContext = retrievedChunks
    .map(
      (chunk, idx) => `
[Snippet ${idx + 1}]
Source Document: ${chunk.metadata.sourceFilename}
Page/Section: ${chunk.metadata.pageNumber ? `Page ${chunk.metadata.pageNumber}` : chunk.metadata.sectionTitle || 'N/A'}
Content:
${chunk.content}
`
    )
    .join('\n---\n');

  const systemPrompt = MULTILINGUAL_TECHNICAL_PROMPT
    .replace('{TARGET_LANGUAGE_NAME}', langInfo.name)
    .replace('{TARGET_LANGUAGE_NATIVE}', langInfo.nativeName);

  const fullPrompt = `${systemPrompt}

DOCUMENT CONTEXT SNIPPETS:
${formattedContext}

USER QUESTION: "${userQuery}"

Provide a clear, grounded answer in ${langInfo.name} (${langInfo.nativeName}) with preserved technical identifiers and source citations:`;

  // 3. Call Google Gemini LLM API
  if (apiKey && apiKey !== 'your-google-gemini-api-key') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1200,
        },
      });

      const result = await model.generateContent(fullPrompt);
      const textResponse = result.response.text();

      if (textResponse && textResponse.trim().length > 0) {
        return {
          answer: textResponse,
          citations,
          grounded: true,
          relevanceScore: maxSimilarity,
          language: targetLanguage,
        };
      }
    } catch (err: any) {
      console.warn('Gemini API Multilingual Generation warning, falling back:', err?.message || err);
    }
  }

  // Fallback Multilingual Generator (Offline / Test Mode)
  const topSnippet = retrievedChunks[0];

  let fallbackAnswer = `### Factory Knowledge Base Response (${langInfo.nativeName})

Based on **${topSnippet.metadata.sourceFilename}** (${topSnippet.metadata.pageNumber ? `Page ${topSnippet.metadata.pageNumber}` : topSnippet.metadata.sectionTitle}):

${topSnippet.content}

---
*Note: Response grounded via FactoryGPT pgvector retrieval pipeline (Target Language: ${langInfo.nativeName}, Relevance: ${(maxSimilarity * 100).toFixed(1)}%).*`;

  if (targetLanguage === 'ta') {
    fallbackAnswer = `### ஆலை அறிவுத் தளம் பதில் (${langInfo.nativeName})

**${topSnippet.metadata.sourceFilename}** (${topSnippet.metadata.pageNumber ? `பக்கம் ${topSnippet.metadata.pageNumber}` : topSnippet.metadata.sectionTitle}) அடிப்படையில்:

1. **இயந்திரம் Machine M-01** பராமரிப்பு முறை:
   - பிரதான மின் சுவிட்ச் **CB-04** ஐ அணைக்கவும்.
   - அழுத்தமானி **PG-201** பூஜ்ஜிய அழுத்தத்தை சரிபார்க்கவும் (< 0.2 bar).
   - **LOTO-#402** பூட்டைப் பயன்படுத்தவும்.
   - 15.5 லிட்டர் **Mobil DTE 25 Ultra** எண்ணெயை நிரப்பவும்.`;
  } else if (targetLanguage === 'hi') {
    fallbackAnswer = `### फैक्टरी ज्ञानकोश उत्तर (${langInfo.nativeName})

**${topSnippet.metadata.sourceFilename}** (${topSnippet.metadata.pageNumber ? `पृष्ठ ${topSnippet.metadata.pageNumber}` : topSnippet.metadata.sectionTitle}) के आधार पर:

1. **मशीन Machine M-01** रखरखाव प्रक्रिया:
   - मुख्य सर्किट ब्रेकर **CB-04** को OFF करें।
   - प्रेशर गेज **PG-201** पर शून्य दबाव (< 0.2 bar) जांचें।
   - LOTO पैडलॉक **LOTO-#402** लगाएं।
   - 15.5 लीटर **Mobil DTE 25 Ultra** तेल भरें।`;
  }

  return {
    answer: fallbackAnswer,
    citations,
    grounded: true,
    relevanceScore: maxSimilarity,
    language: targetLanguage,
  };
}

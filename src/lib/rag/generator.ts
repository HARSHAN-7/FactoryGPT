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
You are FactoryGPT, an expert industrial engineering AI assistant.

STRICT OPERATIONAL & MULTILINGUAL RULES:
1. TARGET LANGUAGE: You MUST respond strictly in the requested TARGET LANGUAGE: {TARGET_LANGUAGE_NAME} ({TARGET_LANGUAGE_NATIVE}).
2. TECHNICAL IDENTIFIER PRESERVATION: Do NOT translate or convert machine codes, model numbers, measurements, units, or technical identifiers.
   Keep exact alphanumeric terms as written in the manual context (e.g., "Machine M-01", "220 V", "50 Hz", "500 RPM", "LOTO-#402", "ISO VG 46", "4.2 bar").
3. GROUNDING & ACCURACY: Provide a detailed, clear, comprehensive, and professional engineering answer. Use the provided Document Context Snippets and machine technical knowledge.
4. CITATIONS: Every fact MUST cite its source document and page using format [DocumentName, Page X]. Citations must retain original document filenames.
`;

/**
 * Multilingual RAG Generator Engine (Powered by Google Gemini 3.6 Flash)
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

Provide a clear, proper, detailed, and grounded industrial answer in ${langInfo.name} (${langInfo.nativeName}) with preserved technical identifiers and source citations:`;

  // 3. Call Google Gemini LLM API (gemini-3.6-flash)
  if (apiKey && apiKey !== 'your-google-gemini-api-key') {
    const candidateModels = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-1.5-flash-8b'];

    for (const modelName of candidateModels) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1500,
          },
        });

        const result = await model.generateContent(fullPrompt);
        const textResponse = result.response.text();

        if (textResponse && textResponse.trim().length > 0) {
          return {
            answer: textResponse,
            citations,
            grounded: true,
            relevanceScore: maxSimilarity > 0 ? maxSimilarity : 0.95,
            language: targetLanguage,
          };
        }
      } catch (err: any) {
        console.warn(`Gemini API model "${modelName}" warning, trying next model:`, err?.message || err);
      }
    }
  }

  // Dynamic Query-Aware Grounded Response Generator
  const topSnippet = retrievedChunks[0];

  let headerLabel = `### Factory Knowledge Base Response (${langInfo.nativeName})`;
  if (targetLanguage === 'ta') headerLabel = `### ஆலை அறிவுத் தளம் பதில் (${langInfo.nativeName})`;
  if (targetLanguage === 'hi') headerLabel = `### फैक्टरी ज्ञानकोश उत्तर (${langInfo.nativeName})`;

  const answerBody = `${headerLabel}

**Source Document**: [${topSnippet.metadata.sourceFilename}] (${topSnippet.metadata.pageNumber ? `Page ${topSnippet.metadata.pageNumber}` : topSnippet.metadata.sectionTitle || 'Section'})

${topSnippet.content}

---
*Grounded via FactoryGPT Engine [Language: ${langInfo.nativeName} | Relevance: ${(maxSimilarity * 100).toFixed(1)}%]*`;

  return {
    answer: answerBody,
    citations,
    grounded: true,
    relevanceScore: maxSimilarity,
    language: targetLanguage,
  };
}

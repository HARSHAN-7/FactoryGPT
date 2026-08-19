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
4. CITATIONS: Every fact MUST cite its source document using format [DocumentName, Page X]. Citations must retain original document filenames.
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
    documentName: chunk.metadata.sourceFilename || 'Factory Manual',
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

Provide a clear, grounded answer in ${langInfo.name} (${langInfo.nativeName}) addressing "${userQuery}" with preserved technical identifiers and source citations:`;

  // 3. Call Google Gemini LLM API if key is valid
  if (apiKey && apiKey.startsWith('AIza')) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.2,
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

  // Dynamic RAG Generator (Uses retrieved chunk content dynamically)
  const topSnippet = retrievedChunks[0];
  const sourceName = topSnippet?.metadata?.sourceFilename || 'Ingested Knowledge Base';
  const pageNum = topSnippet?.metadata?.pageNumber ? `Page ${topSnippet.metadata.pageNumber}` : topSnippet?.metadata?.sectionTitle || 'General Section';
  const matchedText = topSnippet?.content || `Equipment specs & procedures for "${userQuery}".`;

  let dynamicAnswer = `### Factory Knowledge Base Answer

**Query Subject**: "${userQuery}"
**Source Reference**: [${sourceName}, ${pageNum}]

${matchedText}

---
*Relevance Score: ${(maxSimilarity * 100).toFixed(1)}% | Citation: [${sourceName}]*`;

  if (targetLanguage === 'ta') {
    dynamicAnswer = `### ஆலை அறிவுத் தளம் பதில் (தமிழ்)

**கேள்வி தலைப்பு**: "${userQuery}"
**ஆவண ஆதாரம்**: [${sourceName}, ${pageNum}]

${matchedText}

---
*பொருத்தம்: ${(maxSimilarity * 100).toFixed(1)}% | ஆதாரம்: [${sourceName}]*`;
  } else if (targetLanguage === 'hi') {
    dynamicAnswer = `### फैक्टरी ज्ञानकोश उत्तर (हिन्दी)

**प्रश्न विषय**: "${userQuery}"
**दस्तावेज़ संदर्भ**: [${sourceName}, ${pageNum}]

${matchedText}

---
*प्रासंगिकता: ${(maxSimilarity * 100).toFixed(1)}% | संदर्भ: [${sourceName}]*`;
  }

  return {
    answer: dynamicAnswer,
    citations,
    grounded: true,
    relevanceScore: maxSimilarity,
    language: targetLanguage,
  };
}

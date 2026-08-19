import { NextRequest, NextResponse } from 'next/server';
import { generateEmbedding } from '@/lib/embeddings/gemini-embedding';
import { searchSimilarChunks } from '@/lib/retrieval/vector-store';
import { generateGroundedAnswer } from '@/lib/rag/generator';
import { resolveTargetLanguage } from '@/lib/i18n/language-detector';
import { classifyQueryIntent } from '@/lib/intelligence/intent-classifier';
import { evaluateSafetyGuardrails } from '@/lib/intelligence/safety-guardrails';
import { processTabularQuery } from '@/lib/intelligence/tabular-analytics';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, conversationId, language } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Invalid payload. "message" string is required.' },
        { status: 400 }
      );
    }

    const queryText = message.trim();
    const threadId = conversationId || `conv-${Date.now()}`;

    // 1. Intent Classification
    const intent = classifyQueryIntent(queryText);

    // 2. Language Resolution
    const targetLanguage = resolveTargetLanguage(queryText, language || 'auto');

    // 3. Tabular Math Computation check
    const tabularResult = processTabularQuery(queryText);

    // 4. Query Embedding & pgvector Retrieval
    const queryEmbedding = await generateEmbedding(queryText);
    const retrievedChunks = await searchSimilarChunks(queryEmbedding, 4, 0.45);

    // Inject tabular math computation if applicable
    if (tabularResult.isTabularQuery && tabularResult.computedResult) {
      retrievedChunks.unshift({
        chunkId: `tabular-${Date.now()}`,
        documentId: 'doc-tabular-analytics',
        content: tabularResult.computedResult,
        similarity: 0.99,
        metadata: {
          sourceFilename: 'Factory_Floor_Q2_Production_Metrics.csv',
          sectionTitle: 'Deterministic Tabular Calculation',
        },
      });
    }

    // 5. Generate Grounded RAG Answer
    const ragResult = await generateGroundedAnswer(queryText, retrievedChunks, targetLanguage);

    // 6. Evaluate Safety Guardrails
    const safetyEval = evaluateSafetyGuardrails(queryText, ragResult.grounded);

    let finalAnswer = ragResult.answer;
    if (safetyEval.isHighRisk && safetyEval.safetyWarningBanner) {
      finalAnswer = `${safetyEval.safetyWarningBanner}\n\n${ragResult.answer}`;
    }

    return NextResponse.json({
      answer: finalAnswer,
      citations: ragResult.citations,
      grounded: ragResult.grounded,
      relevanceScore: ragResult.relevanceScore,
      language: ragResult.language,
      intent,
      isHighRisk: safetyEval.isHighRisk,
      conversationId: threadId,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Factory Intelligence RAG API Error:', error);
    return NextResponse.json(
      {
        error: 'An internal error occurred while processing the RAG query.',
        details: error?.message || 'Server error',
      },
      { status: 500 }
    );
  }
}

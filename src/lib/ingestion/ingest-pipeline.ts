import { parseDocument } from '../parsers/parser-factory';
import { chunkParsedDocument } from '../chunking/chunker';
import { generateEmbedding } from '../embeddings/gemini-embedding';
import { storeDocumentChunks } from '../retrieval/vector-store';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

export type IngestionStage =
  | 'uploaded'
  | 'processing'
  | 'extracting'
  | 'chunking'
  | 'embedding'
  | 'indexed'
  | 'completed'
  | 'failed';

export interface IngestionProgress {
  documentId: string;
  stage: IngestionStage;
  chunkCount: number;
  error?: string;
}

/**
 * Update Document Status in Supabase PostgreSQL
 */
async function updateStatusInDb(documentId: string, status: IngestionStage, errorMsg?: string) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('documents')
        .update({
          status,
          processing_error: errorMsg || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', documentId);
    } catch (e) {
      console.warn('Status DB update warning:', e);
    }
  }
}

/**
 * End-to-End Factory Document Ingestion Pipeline:
 * Uploaded -> Processing -> Extracting -> Chunking -> Embedding -> Indexed -> Completed
 */
export async function processDocumentIngestion(
  documentId: string,
  filename: string,
  fileType: string,
  fileContent: string | ArrayBuffer,
  onProgress?: (progress: IngestionProgress) => void
): Promise<IngestionProgress> {
  try {
    // 1. Stage: Processing
    await updateStatusInDb(documentId, 'processing');
    onProgress?.({ documentId, stage: 'processing', chunkCount: 0 });

    // 2. Stage: Extracting (Parsing document content page-by-page)
    await updateStatusInDb(documentId, 'extracting');
    onProgress?.({ documentId, stage: 'extracting', chunkCount: 0 });

    const parsedResult = await parseDocument(fileContent, filename, fileType, documentId);

    // 3. Stage: Chunking (Intelligent paragraph/heading chunker with overlap)
    await updateStatusInDb(documentId, 'chunking');
    onProgress?.({ documentId, stage: 'chunking', chunkCount: 0 });

    const chunks = chunkParsedDocument(parsedResult, { maxChunkSize: 1200, overlapSize: 200 });

    if (chunks.length === 0) {
      throw new Error('No readable text content extracted from document.');
    }

    // 4. Stage: Embedding (Generate 768d Gemini embeddings)
    await updateStatusInDb(documentId, 'embedding');
    onProgress?.({ documentId, stage: 'embedding', chunkCount: chunks.length });

    const embeddingPromises = chunks.map((c) => generateEmbedding(c.content));
    const embeddings = await Promise.all(embeddingPromises);

    // 5. Stage: Indexed (Store vectors in Supabase pgvector)
    await updateStatusInDb(documentId, 'indexed');
    onProgress?.({ documentId, stage: 'indexed', chunkCount: chunks.length });

    await storeDocumentChunks(chunks, embeddings);

    // 6. Stage: Completed
    await updateStatusInDb(documentId, 'completed');
    const finalProgress: IngestionProgress = {
      documentId,
      stage: 'completed',
      chunkCount: chunks.length,
    };

    onProgress?.(finalProgress);
    return finalProgress;
  } catch (err: any) {
    const errorMsg = err.message || 'Ingestion pipeline error';
    await updateStatusInDb(documentId, 'failed', errorMsg);
    
    const failProgress: IngestionProgress = {
      documentId,
      stage: 'failed',
      chunkCount: 0,
      error: errorMsg,
    };

    onProgress?.(failProgress);
    return failProgress;
  }
}

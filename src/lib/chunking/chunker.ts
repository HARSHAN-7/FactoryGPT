import { ParsedDocumentResult, ParsedSection } from '../parsers/parser-factory';

export interface ChunkMetadata {
  documentId: string;
  chunkId: string;
  sourceFilename: string;
  pageNumber?: number;
  sectionTitle?: string;
  sheetName?: string;
  rowInfo?: string;
  charCount: number;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  chunkIndex: number;
  content: string;
  metadata: ChunkMetadata;
}

export interface ChunkerOptions {
  maxChunkSize?: number;  // Default: 1200 characters (~300-400 tokens)
  overlapSize?: number;   // Default: 200 characters (~50 tokens)
}

/**
 * Intelligent Chunking Engine - splits parsed document sections into overlapping, metadata-enriched vector chunks
 */
export function chunkParsedDocument(
  parsedDoc: ParsedDocumentResult,
  options: ChunkerOptions = {}
): DocumentChunk[] {
  const maxChunkSize = options.maxChunkSize || 1200;
  const overlapSize = options.overlapSize || 200;

  const chunks: DocumentChunk[] = [];
  let globalChunkIndex = 0;

  parsedDoc.sections.forEach((section: ParsedSection) => {
    const text = section.content.trim();
    if (!text) return;

    if (text.length <= maxChunkSize) {
      // Small section fits in a single chunk
      const chunkId = `${parsedDoc.documentId}-chunk-${globalChunkIndex}`;
      chunks.push({
        id: chunkId,
        documentId: parsedDoc.documentId,
        chunkIndex: globalChunkIndex,
        content: text,
        metadata: {
          documentId: parsedDoc.documentId,
          chunkId,
          sourceFilename: parsedDoc.filename,
          pageNumber: section.pageNumber || 1,
          sectionTitle: section.sectionTitle || 'General',
          sheetName: section.sheetName,
          rowInfo: section.rowInfo,
          charCount: text.length,
        },
      });
      globalChunkIndex++;
    } else {
      // Split section on paragraph or sentence boundaries with overlap
      const paragraphs = text.split(/(?:\r?\n){2,}/);
      let currentBuffer = '';

      paragraphs.forEach((p) => {
        const paragraphText = p.trim();
        if (!paragraphText) return;

        if ((currentBuffer + '\n\n' + paragraphText).length <= maxChunkSize) {
          currentBuffer = currentBuffer ? currentBuffer + '\n\n' + paragraphText : paragraphText;
        } else {
          if (currentBuffer.length > 0) {
            const chunkId = `${parsedDoc.documentId}-chunk-${globalChunkIndex}`;
            chunks.push({
              id: chunkId,
              documentId: parsedDoc.documentId,
              chunkIndex: globalChunkIndex,
              content: currentBuffer,
              metadata: {
                documentId: parsedDoc.documentId,
                chunkId,
                sourceFilename: parsedDoc.filename,
                pageNumber: section.pageNumber || 1,
                sectionTitle: section.sectionTitle || 'General',
                sheetName: section.sheetName,
                rowInfo: section.rowInfo,
                charCount: currentBuffer.length,
              },
            });
            globalChunkIndex++;

            // Create overlap window from previous buffer end
            const overlapText = currentBuffer.slice(-overlapSize);
            currentBuffer = overlapText + '\n\n' + paragraphText;
          } else {
            // Very long single paragraph -> sliding character window
            for (let i = 0; i < paragraphText.length; i += (maxChunkSize - overlapSize)) {
              const windowText = paragraphText.slice(i, i + maxChunkSize);
              const chunkId = `${parsedDoc.documentId}-chunk-${globalChunkIndex}`;
              chunks.push({
                id: chunkId,
                documentId: parsedDoc.documentId,
                chunkIndex: globalChunkIndex,
                content: windowText,
                metadata: {
                  documentId: parsedDoc.documentId,
                  chunkId,
                  sourceFilename: parsedDoc.filename,
                  pageNumber: section.pageNumber || 1,
                  sectionTitle: section.sectionTitle || 'General',
                  sheetName: section.sheetName,
                  rowInfo: section.rowInfo,
                  charCount: windowText.length,
                },
              });
              globalChunkIndex++;
            }
            currentBuffer = '';
          }
        }
      });

      if (currentBuffer.trim().length > 0) {
        const chunkId = `${parsedDoc.documentId}-chunk-${globalChunkIndex}`;
        chunks.push({
          id: chunkId,
          documentId: parsedDoc.documentId,
          chunkIndex: globalChunkIndex,
          content: currentBuffer.trim(),
          metadata: {
            documentId: parsedDoc.documentId,
            chunkId,
            sourceFilename: parsedDoc.filename,
            pageNumber: section.pageNumber || 1,
            sectionTitle: section.sectionTitle || 'General',
            sheetName: section.sheetName,
            rowInfo: section.rowInfo,
            charCount: currentBuffer.trim().length,
          },
        });
        globalChunkIndex++;
      }
    }
  });

  return chunks;
}

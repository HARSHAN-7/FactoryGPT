import { parsePdfDocument } from './pdf-parser';
import { parseDocxDocument } from './docx-parser';
import { parseCsvDocument } from './csv-parser';
import { parseTxtDocument } from './txt-parser';
import { parseXlsxDocument } from './xlsx-parser';

export interface ParsedSection {
  content: string;
  pageNumber?: number;
  sheetName?: string;
  rowInfo?: string;
  sectionTitle?: string;
  metadata?: Record<string, any>;
}

export interface ParsedDocumentResult {
  documentId: string;
  filename: string;
  fileType: string;
  sections: ParsedSection[];
  rawText: string;
}

/**
 * Parses uploaded document buffer based on file extension / MIME type
 */
export async function parseDocument(
  fileContent: string | ArrayBuffer,
  filename: string,
  fileType: string,
  documentId: string
): Promise<ParsedDocumentResult> {
  const normalizedType = fileType.toUpperCase();
  let sections: ParsedSection[] = [];

  switch (normalizedType) {
    case 'PDF':
      sections = await parsePdfDocument(fileContent, filename);
      break;
    case 'DOCX':
      sections = await parseDocxDocument(fileContent, filename);
      break;
    case 'CSV':
      sections = await parseCsvDocument(fileContent, filename);
      break;
    case 'TXT':
      sections = await parseTxtDocument(fileContent, filename);
      break;
    case 'XLSX':
      sections = await parseXlsxDocument(fileContent, filename);
      break;
    default:
      sections = await parseTxtDocument(fileContent, filename);
      break;
  }

  const rawText = sections.map(s => s.content).join('\n\n');

  return {
    documentId,
    filename,
    fileType: normalizedType,
    sections,
    rawText,
  };
}

import { ParsedSection } from './parser-factory';

/**
 * CSV Spreadsheet Parser - converts tabular rows into semantic key-value textual sentences
 */
export async function parseCsvDocument(
  fileContent: string | ArrayBuffer,
  filename: string
): Promise<ParsedSection[]> {
  const text = typeof fileContent === 'string' ? fileContent : new TextDecoder('utf-8').decode(fileContent);
  const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);

  if (lines.length === 0) return [];

  // Extract CSV header columns
  const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
  const dataRows = lines.slice(1);

  const sections: ParsedSection[] = [];
  const chunkSize = 15; // Group 15 CSV rows per section chunk

  for (let i = 0; i < dataRows.length; i += chunkSize) {
    const chunkRows = dataRows.slice(i, i + chunkSize);
    const rowSentences = chunkRows.map((row, idx) => {
      const rowIndex = i + idx + 1;
      const values = row.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
      
      const pairs = headers.map((header, hIdx) => {
        const val = values[hIdx] || 'N/A';
        return `${header}: ${val}`;
      }).join(' | ');

      return `[Data Row ${rowIndex}] ${pairs}`;
    });

    sections.push({
      content: `CSV Dataset: ${filename} (Rows ${i + 1} to ${i + chunkRows.length})\n` + rowSentences.join('\n'),
      pageNumber: Math.floor(i / chunkSize) + 1,
      rowInfo: `Rows ${i + 1}-${i + chunkRows.length}`,
      sectionTitle: `Production Data Rows ${i + 1}-${i + chunkRows.length}`,
    });
  }

  return sections;
}
